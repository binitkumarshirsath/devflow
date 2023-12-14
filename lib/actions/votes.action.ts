"use server";

import Question from "@/database/models/question.model";
import { AnswerVoteParams, QuestionVoteParams } from "./types/shared.types";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/database/connection";
import Answer from "@/database/models/answer.model";
import User from "@/database/models/user.model";
import Interaction from "@/database/models/interaction.model";

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

    // add +1 or remove 1 from the upvoters reputation
    // add +10 or remove 10 from authors repu

    await Interaction.findOneAndUpdate(
      {
        user: userId,
        action: hasupVoted ? "upvote" : "downvote",
        question: questionId,
      },
      {
        user: userId,
        action: hasupVoted ? "upvote" : "downvote",
        question: questionId,
      },
      {
        upsert: true,
      }
    );

    await User.findByIdAndUpdate(userId, {
      $inc: {
        reputation: hasupVoted ? -1 : 1,
      },
    });
    await User.findByIdAndUpdate(question.author, {
      $inc: {
        reputation: hasupVoted ? -2 : 2,
      },
    });
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

export const upvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    const { answerId, hasdownVoted, hasupVoted, path, userId } = params;
    await connectDB();
    let query = {};
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

    const answer = await Answer.findOneAndUpdate({ _id: answerId }, query, {
      new: true,
    });

    revalidatePath(path);
    return answer;
  } catch (err) {
    console.error("Error while upvoting the answer", err);
    throw err;
  }
};

export const downvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    await connectDB();
    const { answerId, hasdownVoted, hasupVoted, path, userId } = params;

    let query = {};

    if (hasupVoted) {
      query = {
        $pull: {
          upvotes: userId,
        },
        $addToSet: {
          downvotes: userId,
        },
      };
    } else if (hasdownVoted) {
      query = {
        $pull: {
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

    const answer = await Answer.findOneAndUpdate(
      {
        _id: answerId,
      },
      query,
      {
        new: true,
      }
    );

    revalidatePath(path);

    return answer;
  } catch (err) {
    console.error("Error while downvoting answer", err);
    throw err;
  }
};
