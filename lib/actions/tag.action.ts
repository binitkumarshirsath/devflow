import Tag from "@/database/models/tag.model";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./types/shared.types";
import { connectDB } from "@/database/connection";
import Question from "@/database/models/question.model";
import User from "@/database/models/user.model";

export const getAllTags = async (data: GetAllTagsParams) => {
  try {
    connectDB();
    const tags = await Tag.find({});
    return tags;
  } catch (err) {
    console.error("Error while fetching tags", err);
    throw err;
  }
};

export const getTopInteractedTags = async (
  data: GetTopInteractedTagsParams
) => {
  try {
    const tags = await Tag.find({});
    return tags;
  } catch (err) {
    console.error("Error while getting user interacted tags", err);
    throw err;
  }
};

export const getTagQuestions = async ({ tagId }: GetQuestionsByTagIdParams) => {
  try {
    await connectDB();
    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      model: Question,
      populate: [
        {
          path: "author",
          model: User,
        },
        {
          path: "tags",
          model: Tag,
        },
      ],
    });
    const tagName = tag?.name;
    const questions = tag?.questions;
    return { tagName, questions };
  } catch (err) {
    console.error("Error while fetching questions for a single tag", err);
    throw err;
  }
};

export const getHotTags = async () => {
  try {
    await connectDB();
    const tags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          questionCount: {
            $size: "$questions",
          },
        },
      },
      {
        $sort: {
          questionCount: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return tags;
  } catch (err) {
    console.error("Error while fetching top tags", err);
    throw err;
  }
};
