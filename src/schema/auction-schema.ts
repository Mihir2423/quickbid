import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startingBid: z.number().min(0, "Starting bid must be a positive number"),
  bidInterval: z.number().min(0, "Bid interval must be a positive number"),
  imageUrl: z.string().url("Invalid image URL"),
});

export type FormSchema = z.infer<typeof formSchema>;
