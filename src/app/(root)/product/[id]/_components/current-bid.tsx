"use client";

import { useStore } from "@/store";
import React from "react";

type Props = {
  bidAmount: string;
};

export const CurrentBid = ({ bidAmount }: Props) => {
 const { currentBid } = useStore();
  return (
    <div>
      <strong>Current Bid:</strong> $ {currentBid || bidAmount}
    </div>
  );
};
