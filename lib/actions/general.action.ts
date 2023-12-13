"use server";

import { SearchParams } from "./types/shared.types";
import Question from "@/database/models/question.model";
import Tag from "@/database/models/tag.model";
import User from "@/database/models/user.model";
import Answer from "@/database/models/answer.model";

const validTypes = ["user", "question", "tag", "answer"];

export const getGlobalResults = async (params: SearchParams) => {
  try {
    const { query, type } = params;
    let results:
      | {
          title: string;
          type: string;
          id: string;
        }[]
      | undefined = [];
    // if type is present -> search for tha type only
    // no type present means, whole db search

    // mapping for model to search, fields and the type

    const ModelFieldsTypes = [
      {
        model: User,
        searhField: "name",
        type: "user", // same as isValid
      },
      {
        model: Question,
        searhField: "title",
        type: "question",
      },
      {
        model: Tag,
        searhField: "name",
        type: "tag",
      },
      {
        model: Answer,
        searhField: "content",
        type: "answer",
      },
    ];

    // search based on type on a specific model
    if (type) {
      // check if type is valid
      const isValid = validTypes.includes(type.toLowerCase());
      if (!isValid) {
        throw new Error("Invalid type");
      }

      //   find the model on which , we need to perform search and the field
      const modelToSearchOn = ModelFieldsTypes.find(
        (item) => item.type === type
      );

      //   perform search
      const data = await modelToSearchOn?.model
        .find({
          [modelToSearchOn.searhField]: { $regex: new RegExp(query!, "i") },
        })
        .limit(8);

      //   format the data , and add to result array ,
      results = data?.map((item) => ({
        title:
          type === "answer"
            ? `Answer containing ${query}`
            : type === "tag" || type === "user"
              ? item.name
              : item.title,
        type,
        id: type === "answer" ? item.question._id : item._id,
      }));
    } else {
      // no type provided , search on entire db and add to results
      for (const { model, searhField, type } of ModelFieldsTypes) {
        const queryResult = await model
          .find({
            [searhField]: {
              $regex: new RegExp(query!, "i"),
            },
          })
          .limit(2);
        const singleModelResult = queryResult?.map((item) => ({
          title:
            type === "answer"
              ? `Answer containing ${query}`
              : type === "tag" || type === "user"
                ? item.name
                : item.title,
          type,
          id: type === "answer" ? item.question._id : item._id,
        }));

        results.push(...singleModelResult);
      }
    }
    return results;
  } catch (err) {
    console.error("Error while fetching global results", err);
    throw err;
  }
};
