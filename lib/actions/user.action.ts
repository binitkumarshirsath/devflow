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
    connectDB();
    const user = await User.create(data);
    return user;
  } catch (error) {
    console.error("Error while creating user", error);
    throw error;
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
    throw err;
  }
};

export const updateUserById = async (data: UpdateUserParams) => {
  try {
    connectDB();
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: data.clerkId },
      data.updateData,
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error while updating user", error);
    throw error;
  }
};

export const deleteUserById = async (data: DeleteUserParams) => {
  try {
    connectDB();
    const user = await User.findOneAndDelete({ clerkId: data.clerkId });
    return user;
  } catch (err) {
    console.error("User deletion failed.", err);
    throw err;
  }
};
