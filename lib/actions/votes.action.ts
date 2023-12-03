"use server";

import Question from "@/database/models/question.model";
import { QuestionVoteParams } from "./types/shared.types";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/database/connection";

export const upvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    await connectDB();
    const { hasdownVoted, hasupVoted, path, questionId, userId } = params;
    let query = {};
    /*
    When user taps to upvote question
        1. He might have already upvotes(hasUpvoted)
            --> remove the upvote
        2. Might have earlies downvotes(hasDownVotes)
            --> remove the downvote 
            --> add the upvote
        3. Add the upvote -> first time    
    */
    if (hasupVoted) {
      query = {
        $pull: {
          upvotes: userId,
        },
      };
    } else if (hasdownVoted) {
      query = {
        $pull: {
          downvotes: userId,
        },
        $addToSet: {
          upvotes: userId,
        },
      };
    } else {
      query = {
        $addToSet: {
          upvotes: userId,
        },
      };
    }

    const question = await Question.findOneAndUpdate(
      { _id: questionId },
      query,
      { new: true }
    );

    revalidatePath(path);

    return question;
  } catch (err) {
    console.error("Error while upvoting the question", err);
    throw err;
  }
};

export const downvoteQuestion = async (params: QuestionVoteParams) => {
  try {
    const { hasdownVoted, hasupVoted, questionId, path, userId } = params;
    await connectDB();
    console.log(typeof questionId, typeof userId);

    let query = {};
    if (hasdownVoted) {
      query = {
        $pull: {
          downvotes: userId,
        },
      };
    } else if (hasupVoted) {
      query = {
        $pull: {
          upvotes: userId,
        },
        $addToSet: {
          downvotes: userId,
        },
      };
    } else {
      query = {
        $addToSet: {
          downvotes: userId,
        },
      };
    }

    const question = await Question.findOneAndUpdate(
      {
        _id: questionId,
      },
      query,
      { new: true }
    );
    revalidatePath(path);
    return question;
  } catch (err) {
    console.error("Error while downvoting the question", err);
    throw err;
  }
};
