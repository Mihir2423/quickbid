import { create } from "zustand";

type Store = {
  currentBid: string | null;
  setCurrentBid: (amount: string | null) => void;
};

export const useStore = create<Store>()((set) => ({
  currentBid: null,
  setCurrentBid: (amount: string | null) => set(() => ({ currentBid: amount })),
}));
