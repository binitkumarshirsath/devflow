/* eslint-disable camelcase */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import {
  createUser,
  deleteUserById,
  updateUserById,
} from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const {
      first_name,
      id,
      last_name,
      primary_email_address_id,
      username,
      image_url,
    } = evt.data;

    const data = {
      clerkId: id,
      name: `${first_name} ${last_name || ""}`,
      email: primary_email_address_id,
      picture: image_url,
      username: username || "",
    };

    const user = await createUser(data);

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  }

  if (eventType === "user.updated") {
    const {
      first_name,
      id,
      last_name,
      primary_email_address_id,
      username,
      image_url,
    } = evt.data;

    const updateData = {
      name: `${first_name} ${last_name || ""}`,
      email: primary_email_address_id,
      picture: image_url,
      username: username || "",
    };

    const data = {
      clerkId: id,
      updateData,
      path: `/profile/${id}`,
    };

    const updatedUser = await updateUserById(data);
    return NextResponse.json(
      {
        message: "User updated successfully.",
        user: updatedUser,
      },
      { status: 200 }
    );
  }
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const data = {
      clerkId: id!,
    };

    const deletedUser = await deleteUserById(data);
    return NextResponse.json(
      {
        message: "User deleted successfully.",
        user: deletedUser,
      },
      { status: 200 }
    );
  }

  return new Response("", { status: 200 });
}
