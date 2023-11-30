"use server";
import { connectDB } from "@/database/connection";
import Question from "@/database/models/question.model";
import Tag from "@/database/models/tag.model";
import { createQuestionProps, getQuestionsProps } from "./types/shared.types";
import { revalidatePath } from "next/cache";

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
    author: JSON.parse(authorId),
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

export const getQuestions = async (props: getQuestionsProps) => {
  try {
    connectDB();
    const questions = await Question.find({})
      .populate(["tags"])
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
