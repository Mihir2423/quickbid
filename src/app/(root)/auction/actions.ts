"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { authenticatedAction } from "@/lib/safe-action";
import { AuthenticationError } from "@/lib/utils";
import { formSchema } from "@/schema/auction-schema";
import { revalidatePath } from "next/cache";

export const createAuctionAction = authenticatedAction
  .createServerAction()
  .input(formSchema)
  .handler(async ({ input }) => {
    const session = await auth();
    console.log(session);

    if (!session || !session.user || !session.user.id) {
      throw new AuthenticationError();
    }
    const payload = {
      userId: session.user?.id,
      name: input.title,
      description: input.description,
      image: input.imageUrl,
      startingPrice: input.startingBid,
      bidInterval: input.bidInterval,
      currentBid: input.startingBid, 
    };
    // Create auction
    await prisma.products.create({
      data: payload,
    });
    revalidatePath("/auction");
  });
