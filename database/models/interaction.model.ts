import mongoose, { Schema, Document, model } from "mongoose";

interface IInteraction extends Document {
  user: Schema.Types.ObjectId;
  action: "view" | "upvote" | "downvote" | "comment";
  question: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
}

const interactionSchema = new Schema<IInteraction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    action: {
      type: String,
      enum: ["view", "upvote", "downvote", "comment", "ask_question"],
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

const Interaction =
  mongoose.models.Interaction || model("Interaction", interactionSchema);

export default Interaction;
