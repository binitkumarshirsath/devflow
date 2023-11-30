"use server";
import { connectDB } from "@/database/connection";
import Question from "@/database/models/question.model";
import Tag from "@/database/models/tag.model";

interface Props {
  title: string;
  content: string;
  authorId: string;
  tags: string[];
}

export const createQuestion = async ({
  authorId,
  content,
  tags,
  title,
}: Props) => {
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
};
