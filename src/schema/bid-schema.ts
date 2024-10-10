import { z } from "zod";

export const formSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  productUserId: z.string().min(1, "Product User ID is required"),
  currentBid: z.number().positive("Current bid amount is required"),
  userId: z.string().min(1, "User ID is required"),
  amount: z.number().positive("Bid amount must be a positive number"),
  productName: z.string().min(1, "Product Name is required"),
});

export type FormSchema = z.infer<typeof formSchema>;
