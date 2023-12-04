"use server";
import Answer from "@/database/models/answer.model";
import { CreateAnswerParams, GetAnswersParams } from "./types/shared.types";
import { connectDB } from "@/database/connection";
import { revalidatePath } from "next/cache";
import Question from "@/database/models/question.model";

export const postAnswer = async ({
  author,
  content,
  path,
  question,
}: CreateAnswerParams) => {
  try {
    connectDB();

    const answer = await Answer.create({
      author: JSON.parse(author),
      content,
      question: JSON.parse(question),
    });

    revalidatePath(path);

    await Question.findByIdAndUpdate(
      {
        _id: JSON.parse(question),
      },
      {
        $addToSet: {
          answers: answer._id,
        },
      },
      {
        new: true,
      }
    );

    return answer;
  } catch (error) {
    console.error("Error while posting the answer", error);
    throw error;
  }
};

export const getAnswers = async ({ questionId }: GetAnswersParams) => {
  try {
    await connectDB();

    const answers = await Answer.find({
      question: questionId,
    }).populate("author");

    return answers;
  } catch (error) {
    console.error("Error while fetching answers", error);
    throw error;
  }
};