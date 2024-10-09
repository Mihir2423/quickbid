import { getAllAuctions, getMyAuctions } from "@/data-access/auctions";
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
