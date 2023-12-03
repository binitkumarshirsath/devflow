"use server";

import { connectDB } from "@/database/connection";
import { ViewQuestionParams } from "./types/shared.types";
import Question from "@/database/models/question.model";
import Interaction from "@/database/models/interaction.model";
import { revalidatePath } from "next/cache";

/*
    @For Binit
  We increase the question views, even if user has already viewed it.
  User doesnt need to be logged in to increase view count
  We are not saving , how many times as user has viewed the question for now.[For future]  
*/

export const viewQuestion = async (params: ViewQuestionParams) => {
  try {
    await connectDB();
    const { questionId, userId, path } = params;
    // update question view
    await Question.findByIdAndUpdate(
      {
        _id: questionId,
      },
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      }
    );

    revalidatePath(path);
    // check if userid is passed / user is logged in

    if (userId) {
      const hasUserInteracted = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (hasUserInteracted)
        return console.log("User has already viewed the question");

      const interaction = await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });

      return interaction;
    }
  } catch (err) {
    console.error("Error while incrementing question view", err);
  }
};
