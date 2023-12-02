import mongoose, { Schema, model, Document } from "mongoose";

interface IAnswer extends Document {
  content: string;
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
}

const answerSchema = new Schema<IAnswer>(
  {
    content: {
      type: String,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Answer = mongoose.models.Answer || model<IAnswer>("Answer", answerSchema);

export default Answer;
