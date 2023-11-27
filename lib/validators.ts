"use client";

import * as z from "zod";

export const questionSchema = z.object({
  question: z
    .string()
    .min(10, { message: "Question must consist of atleast 10 character." })
    .max(50),

  tags: z.array(z.string().min(3).max(5)).min(1).max(5),
});
