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
