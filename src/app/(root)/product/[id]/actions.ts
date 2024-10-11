"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { authenticatedAction } from "@/lib/safe-action";
import { AuthenticationError } from "@/lib/utils";
import { z } from "zod";
import { formSchema } from "@/schema/bid-schema";
import { revalidatePath } from "next/cache";
import { Knock } from "@knocklabs/node";
import { redirect } from "next/navigation";

const knock = new Knock(process.env.KNOCK_SECRET_KEY);

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
    // check if the product exists
    const productExists = await prisma.products.findUnique({
      where: { id: input.productId },
    });
    if (!productExists) {
     throw new Error("Product not found.");
    }
    // check if the auction is closed
    const product = await prisma.products.findUnique({
      where: { id: input.productId },
      select: { status: true, timeLeft: true },
    });

    // check if the last date has passed
    if (!product?.timeLeft || (product?.timeLeft < new Date())) {
      throw new Error("The auction has ended.");
    }
    if (product?.status === "closed") {
      throw new Error("The auction is closed.");
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
      })
    });

    revalidatePath(`/auction/${input.productId}`);

    // Send a notification to all the users who have bid on this product
    const users = await prisma.bid.findMany({
      where: { productId: input.productId },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const bidders = users.map((user) => {
      return {
        id: user.user.id,
        email: user.user.email ?? "anonymous@email.com",
        name: user.user.name ?? "Anonymous",
      };
    });

    const recipients = bidders.filter((user) => user.id !== input.userId);
    // filter out user with duplicate ids
    const uniqueRecipients = recipients.filter(
      (user, index, self) => index === self.findIndex((t) => t.id === user.id)
    );

    if (recipients.length > 0) {
      await knock.workflows.trigger("user-placed-bid", {
        actor: {
          id: session.user.id,
          name: session.user.name ?? "Anonymous",
          email: session.user.email ?? "anonymouse@gmail.com",
        },
        recipients: uniqueRecipients,
        data: {
          productId: input.productId,
          bidAmount: input.amount,
          productName: input.productName,
        },
      });
    }
  });

export const closeAuctionAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
      userId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const session = await auth();
    if (!session || !session.user || session.user.id !== input.userId) {
      throw new AuthenticationError();
    }
    const highestBidder = await prisma.bid.findFirst({
      where: { productId: input.id },
      orderBy: { amount: "desc" },
      select: { userId: true },
    });
    await prisma.products.update({
      where: { id: input.id },
      data: { status: "closed", bidWinnerId: highestBidder?.userId ?? null },
    });
    revalidatePath(`/auction/${input.id}`);
  });

export const deleteAuctionAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
      userId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const session = await auth();
    if (!session || !session.user || session.user.id !== input.userId) {
      throw new AuthenticationError();
    }
    await prisma.products.delete({
      where: { id: input.id },
    });
    revalidatePath(`/auction/${input.id}`);
    redirect("/auction");
  });
