import Tag from "@/database/models/tag.model";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./types/shared.types";
import { connectDB } from "@/database/connection";
import Question from "@/database/models/question.model";
import User from "@/database/models/user.model";
import { FilterQuery } from "mongoose";

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    connectDB();
    let query: FilterQuery<typeof Tag> = {};
    const { searchQuery, filter } = params;
    if (searchQuery) {
      query = {
        name: {
          $regex: new RegExp(searchQuery, "i"),
        },
      };
    }

    let sortQuery: FilterQuery<typeof Tag> = {};

    if (filter) {
      switch (filter) {
        case "popular":
          sortQuery = {
            followers: -1,
          };
          break;
        case "recent":
          sortQuery = {
            createdAt: -1,
          };
          break;
        case "name":
          sortQuery = {
            name: 1,
          };
          break;
        case "old":
          sortQuery = {
            createdAt: 1,
          };
          break;

        default:
          break;
      }
    }

    const tags = await Tag.find(query).sort(sortQuery);
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
