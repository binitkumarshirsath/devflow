"use server";
import { connectDB } from "@/database/connection";
import User from "@/database/models/user.model";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserStatsParams,
  UpdateUserParams,
} from "./types/shared.types";
import Question from "@/database/models/question.model";
import Answer from "@/database/models/answer.model";

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
    // const clerkId = JSON.parse(userId);

    const user = await User.findOne({ clerkId: userId });
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

export const getAllUsers = async (data: GetAllUsersParams) => {
  try {
    connectDB();
    const users = await User.find({}).sort({ createdAt: -1 });
    return users;
  } catch (err) {
    console.error("Error while fetching users", err);
    throw err;
  }
};

export const getUserInfo = async (params: GetUserStatsParams) => {
  try {
    await connectDB();
    const { userId } = params;
    const user = await User.findById(userId);
    const questionCount = await Question.countDocuments({ author: userId });
    const answerCount = await Answer.countDocuments({ author: userId });
    return { questionCount, answerCount, user };
  } catch (err) {
    console.error("Error while fetching user info", err);
    throw err;
  }
};
