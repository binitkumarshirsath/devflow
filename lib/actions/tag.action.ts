import Tag from "@/database/models/tag.model";
import {
  GetAllTagsParams,
  GetTopInteractedTagsParams,
} from "./types/shared.types";
import { connectDB } from "@/database/connection";

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
