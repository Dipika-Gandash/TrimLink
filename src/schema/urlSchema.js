import { z } from "zod";

export const createUrlSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(60, "Title must be under 60 characters"),

  original_url: z
    .string()
    .min(1, "Original URL is required")
    .url("Please enter a valid URL including https://"),

  custom_alias: z
    .string()
    .max(20, "Alias must be under 20 characters")
    .regex(/^[a-zA-Z0-9-_]*$/, "Only letters, numbers, - and _ are allowed")

    .optional()
    .or(z.literal("")),
});
