import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  joinedAt: Date;
  saved: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  bio: String,
  picture: String,
  location: String,
  portfolioWebsite: String,
  reputation: {
    type: Number,
    default: 0,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
