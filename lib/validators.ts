"use client";

import * as z from "zod";

export const questionSchema = z.object({
  question: z
    .string()
    .min(10, { message: "Question must consist of atleast 10 character." })
    .max(50),
  // description: z.string().min(100).max(500),
  tags: z.array(z.string().min(3).max(8)).min(1).max(5),
});
