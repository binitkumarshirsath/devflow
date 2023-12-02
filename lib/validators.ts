// Import the necessary module
import * as z from "zod";

// Define the schema for a question
export const questionSchema = z.object({
  // Ensure the question is between 10 and 50 characters
  title: z
    .string()
    .min(10, {
      message: "Please enter a question with at least 10 characters.",
    })
    .max(100),

  // Ensure the description is between 100 and 1000 characters
  content: z
    .string()
    .min(100, {
      message:
        "Please provide a more detailed description with at least 100 characters.",
    })
    .max(4000, {
      message: "Description exceeds the maximum limit of 4000 characters.",
    }),

  // Ensure the tags are between 3 and 20 characters, and there should be at least 1 but no more than 5 tags
  tags: z
    .array(
      z
        .string()
        .min(3, { message: "Each tag must be at least 3 characters." })
        .max(20, { message: "Each tag cannot exceed 20 characters." })
    )
    .min(1, { message: "Please add at least one tag." })
    .max(5, { message: "You can add a maximum of 5 tags." }),
});

export const answerSchema = z.object({
  answer: z.string().min(10),
});
