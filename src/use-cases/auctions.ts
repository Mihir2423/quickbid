import { getAllAuctions, getMyAuctions, getProductDataById } from "@/data-access/auctions";
import { User } from "next-auth";
import "server-only";

export const getAllAuctionsUseCase = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  const res = await getAllAuctions(id);
  return res;
};

export const getMyAuctionsUseCase = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  const res = await getMyAuctions(id);
  return res;
};

export const getProductDetailUseCase = async (session: User, id: string) => {
  if (!session || !session.id || !id) {
    return null;
  }
  const res = await getProductDataById(id);
  console.log(res);
  
  return res;
};
