import Tag from "@/database/models/tag.model";
import { GetTopInteractedTagsParams } from "./types/shared.types";

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
