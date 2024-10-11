import "server-only"

import prisma from "@/lib/db";

async function checkExpiredAuctions() {
  const now = new Date();
  const expiredAuctions = await prisma.products.findMany({
    where: {
      timeLeft: {
        lt: now,
      },
      status: "active",
    },
    include: {
      bid: {
        orderBy: {
          amount: "desc",
        },
        take: 1,
        include: {
          user: true,
        },
      },
      user: true,
    },
  });
  console.log("Expired auctions: ", expiredAuctions);
  for (const auction of expiredAuctions) {
    if (auction.bid.length > 0) {
      const winningBid = auction.bid[0];
      await prisma.products.update({
        where: {
          id: auction.id,
        },
        data: { status: "sold", bidWinnerId: winningBid?.userId ?? null },
      });
    } else {
      await prisma.products.update({
        where: {
          id: auction.id,
        },
        data: { status: "expired" },
      });
    }
  }
}

export { checkExpiredAuctions };
