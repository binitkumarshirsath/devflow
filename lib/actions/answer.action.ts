"use server";

import Answer from "@/database/models/answer.model";
import {
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./types/shared.types";
import { connectDB } from "@/database/connection";
import { revalidatePath } from "next/cache";
import Question from "@/database/models/question.model";
import { FilterQuery } from "mongoose";

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

export const getAnswers = async ({ questionId, sortBy }: GetAnswersParams) => {
  try {
    await connectDB();

    let sortQuery: FilterQuery<typeof Answer> = {};
    if (sortBy) {
      switch (sortBy) {
        case "highestUpvotes":
          sortQuery = {
            upvotes: -1,
          };
          break;
        case "old":
          sortQuery = {
            createdAt: 1,
          };
          break;
        case "lowestUpvotes":
          sortQuery = {
            upvotes: 1,
          };
          break;
        case "recent":
          sortQuery = {
            createdAt: -1,
          };
          break;

        default:
          break;
      }
    }

    const answers = await Answer.find({
      question: questionId,
    })
      .populate("author")
      .sort(sortQuery);

    return answers;
  } catch (error) {
    console.error("Error while fetching answers", error);
    throw error;
  }
};

export const deleteAnswer = async (params: DeleteAnswerParams) => {
  try {
    const { answerId, path } = params;
    // remove the user id from questions , asnwers field
    await Question.findOneAndUpdate(
      {
        answers: answerId,
      },
      {
        $pull: {
          answers: answerId,
        },
      },
      {
        new: true,
      }
    );

    await Answer.findByIdAndDelete(answerId);
    revalidatePath(path);
  } catch (err) {
    console.error("Error while deleting the answer", err);
    throw err;
  }
};
