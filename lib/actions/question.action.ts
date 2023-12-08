"use server";
import { connectDB } from "@/database/connection";
import Question from "@/database/models/question.model";
import Tag from "@/database/models/tag.model";
import {
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetSavedQuestionsParams,
  SaveQuestion,
  createQuestionProps,
  getQuestionsProps,
} from "./types/shared.types";
import { revalidatePath } from "next/cache";
import User from "@/database/models/user.model";
import Answer from "@/database/models/answer.model";
import Interaction from "@/database/models/interaction.model";
import { FilterQuery } from "mongoose";

export const createQuestion = async ({
  authorId,
  content,
  tags,
  title,
  path,
}: createQuestionProps) => {
  connectDB();

  const question = await Question.create({
    title,
    author: authorId,
    content,
  });

  const tagDocuments: string[] = [];

  for (const tag of tags) {
    /*
      upsert true => update doc if it exists .
                                if it doesnt exists => create one
      
      $setOnInsert => when creating the doc , from second case of upsert , set name of tag to tag
      @

    */
    const existingTag = await Tag.findOneAndUpdate(
      {
        name: {
          $regex: new RegExp(`^${tag}$`, "i"),
        },
      },
      {
        $setOnInsert: { name: tag },
        $addToSet: { questions: question._id },
      },
      {
        new: true,
        upsert: true,
      }
    );

    tagDocuments.push(existingTag._id);
  }

  await Question.findByIdAndUpdate(question._id, {
    $push: {
      tags: { $each: tagDocuments },
    },
  });

  revalidatePath(path);
};

export const getQuestion = async ({ questionId }: GetQuestionByIdParams) => {
  try {
    connectDB();
    if (!questionId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid object id");
    }
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    const question = await Question.findById({ _id: questionId })
      .populate("author")
      .populate("tags");
    return question;
  } catch (err) {
    console.error("Error while fetching question with id", err);
    throw err;
  }
};

export const getQuestions = async (params: getQuestionsProps) => {
  try {
    connectDB();
    const { filter, page, pageSize, searchQuery } = params;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        {
          title: { $regex: new RegExp(searchQuery, "i") },
        },
        {
          content: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    const questions = await Question.find(query)
      .populate(["tags", "author"])
      .sort({ createdAt: -1 });

    if (!questions) {
      console.error("No questions found");
      return { questions: [] };
    }

    return { questions };
  } catch (error) {
    console.error("Error while fetching questions", error);
  }
};

export const getUserSavedQuestions = async (
  params: GetSavedQuestionsParams
) => {
  try {
    await connectDB();
    const { clerkId, searchQuery } = params;
    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        {
          title: {
            $regex: new RegExp(searchQuery, "i"),
          },
        },
        {
          content: {
            $regex: new RegExp(searchQuery, "i"),
          },
        },
      ];
    }

    const questions = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      populate: {
        path: "tags author",
      },
    });

    return questions?.saved;
  } catch (err) {
    console.error("Error while fetching saved questions", err);
    throw err;
  }
};

export const saveQuestion = async (params: SaveQuestion) => {
  try {
    await connectDB();
    const { questionId, userId, path, hasSaved } = params;
    let query = {};

    if (hasSaved) {
      query = {
        $pull: {
          saved: questionId,
        },
      };
    } else {
      query = {
        $addToSet: {
          saved: questionId,
        },
      };
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, query, {
      new: true,
    });

    revalidatePath(path);

    return updatedUser;
  } catch (err) {
    console.error("Error while saving question", err);
    throw err;
  }
};

export const editQuestion = async (params: EditQuestionParams) => {
  try {
    await connectDB();
    const { questionId, title, content, path } = params;
    const editedQuestion = await Question.findByIdAndUpdate(
      questionId,
      {
        title,
        content,
      },
      {
        new: true,
      }
    );

    revalidatePath(path);
    return editedQuestion;
  } catch (err) {
    console.error("Error while editing question", err);
    throw err;
  }
};

export const deleteQuestion = async (params: DeleteQuestionParams) => {
  try {
    await connectDB();
    // delete from user saved
    // delete subsequent answers
    // delete interactions
    // remove from tags
    // delete question
    const { path, questionId } = params;
    await User.findOneAndUpdate(
      {
        saved: questionId,
      },
      {
        $pull: {
          saved: questionId,
        },
      },
      {
        new: true,
      }
    );

    await Answer.deleteMany({
      question: questionId,
    });

    await Interaction.deleteMany({
      question: questionId,
    });

    await Tag.updateMany(
      {
        questions: questionId,
      },
      {
        $pull: {
          questions: questionId,
        },
      }
    );

    await Question.findByIdAndDelete({
      _id: questionId,
    });

    revalidatePath(path);
  } catch (err) {
    console.error("Error while deleting question", err);
    throw err;
  }
};

export const getHotQuestions = async () => {
  try {
    await connectDB();
    const questions = await Question.find({}).sort({
      upvotes: -1,
      views: -1,
    });

    return questions;
  } catch (err) {
    console.error("Error while getting questions", err);
    throw err;
  }
};
