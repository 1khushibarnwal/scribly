import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  content: z.string().trim().min(1, "Content is required").max(10000),
  tags: z
    .array(z.string().trim().min(1).max(30))
    .max(10, "Maximum 10 tags per note")
    .optional()
    .default([]),
});
