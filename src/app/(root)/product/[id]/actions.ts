"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { authenticatedAction } from "@/lib/safe-action";
import { AuthenticationError } from "@/lib/utils";
import { formSchema } from "@/schema/bid-schema";
import { revalidatePath } from "next/cache";

export const placeBidAction = authenticatedAction
  .createServerAction()
  .input(formSchema)
  .handler(async ({ input }) => {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      throw new AuthenticationError();
    }
    if (session.user.id === input.productUserId) {
      throw new Error("You cannot bid on your own product");
    }
    if (!input.currentBid) {
      throw new Error("Current bid amount is required");
    }
    if (input.amount <= input.currentBid) {
      throw new Error(
        "Bid amount must be greater than the current highest bid."
      );
    }
    await prisma.$transaction(async (prisma) => {
      await prisma.bid.create({
        data: {
          userId: input.userId,
          productId: input.productId,
          amount: input.amount,
        },
      });

      await prisma.products.update({
        where: { id: input.productId },
        data: { currentBid: input.amount },
      });
    });
    revalidatePath(`/auction/${input.productId}`);
  });
