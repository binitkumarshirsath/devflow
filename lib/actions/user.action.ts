"use server";
import { connectDB } from "@/database/connection";
import User from "@/database/models/user.model";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./types/shared.types";

export const createUser = async (data: CreateUserParams) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    console.error("Error while creating user", error);
  }
};

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

export const updateUserById = async (data: UpdateUserParams) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { clerkId: data.clerkId },
      data.updateData,
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error while updating user", error);
  }
};

export const deleteUserById = async (data: DeleteUserParams) => {
  try {
    const user = await User.findOneAndDelete({ clerkId: data.clerkId });
    return user;
  } catch (err) {
    console.error("User deletion failed.", err);
  }
};