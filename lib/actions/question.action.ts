"use server";
import connectDB from "@/database/connection";

export const createQuestion = async () => {
  connectDB();
};
