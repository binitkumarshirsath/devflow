"use server";
import { connectDB } from "@/database/connection";
import User from "@/database/models/user.model";
import console from "console";

export const getUserById = async (userId: string) => {
  try {
    connectDB();
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (err) {
    console.log("Something went wrong while fetching user", err);
  }
};
