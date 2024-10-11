import prisma from "@/lib/db";
import "server-only";

export const getAllAuctions = async (userId: string) => {
  const res = await prisma.products.findMany({
    where: {
      status: "active",
      userId: {
        not: userId,
      },
    },
  });
  return res;
};

export const getMyAuctions = async (userId: string) => {
  const res = await prisma.products.findMany({
    where: {
      userId,
    },
  });
  return res;
};

export const getProductDataById = async (id: string) => {
  const res = await prisma.products.findUnique({
    where: {
      id,
    },
    include: {
      bid: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              id: true,
            },
          },
        },
      },
      bidWinner: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
    },
  });
  return res;
};
