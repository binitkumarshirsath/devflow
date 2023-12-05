"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { userSchema } from "@/lib/validators";
import CTAButton from "@/components/shared/root/CTAButton";
import { updateUserById } from "@/lib/actions/user.action";

interface Props {
  data: string;
}

const EditProfile = ({ data }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(data);
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      location: user.location || "",
      portfolioWebsite: user.portfolioWebsite || "",
    },
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    setLoading(true);
    const updateData = {
      name: values.name,
      bio: values.bio,
      location: values.location,
      portfolioWebsite: values.portfolioWebsite,
    };
    const data = {
      clerkId: user.clerkId,
      updateData,
      path: "/",
    };
    await updateUserById(data);
    setLoading(false);
    router.back();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio site</FormLabel>
              <FormControl>
                <Input placeholder="Portfolio site link" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter your location" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="About yourself" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end ">
          <CTAButton
            disabled={loading}
            label={`${loading ? "Loading...." : "Submit"}`}
            type="submit"
            classList="py px-10 flex"
          />
        </div>
      </form>
    </Form>
  );
};

export default EditProfile;
