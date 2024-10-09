"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { placeBidAction } from "../actions";
import { Loader2 } from "lucide-react";

export const BiddingForm = ({
  currentBid,
  bidInterval,
  productId,
  userId,
  productUserId,
}: {
  currentBid: number;
  userId: string | undefined;
  productId: string | undefined;
  bidInterval: number;
  productUserId: string | undefined;
}) => {
  const [customBid, setCustomBid] = useState<number | null>(null);
  const getNextBidAmount = useCallback(
    (increment: number) => {
      const highestBid = Number(currentBid);
      return highestBid + increment;
    },
    [currentBid]
  );

  const { execute, isPending } = useServerAction(placeBidAction, {
    onError({ err }) {
      console.log(err);
      toast.message("Something went wrong");
    },
    onSuccess() {
      toast.success("Bid Created successfully");
      setCustomBid(0);
    },
  });

  const handleBid = (amount: number) => {
    if (amount <= Number(currentBid)) {
      toast.error("Invalid Bid Amount");
      return;
    }
    console.log("Placing bid for", amount);
    if (!userId || !productId || !currentBid || !productUserId) {
      toast.error("All Fields are required");
      return;
    }
    execute({
      productId,
      currentBid,
      userId,
      amount,
      productUserId,
    });
    setCustomBid(0);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Your Bid</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Enter bid amount"
            value={customBid || 0}
            disabled={isPending && customBid === 0}
            onChange={(e) => setCustomBid(Number(e.target.value))}
            className="flex-grow"
          />
          <Button
            disabled={isPending}
            onClick={() => handleBid(Number(customBid))}
          >
            Place Bid
            {isPending && <Loader2 className="ml-2 animate-spin" size={16} />}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button
          variant="outline"
          disabled={isPending}
          onClick={() => handleBid(getNextBidAmount(bidInterval))}
        >
          Bid ${getNextBidAmount(25)}
        </Button>
        <Button
          variant="outline"
          disabled={isPending}
          onClick={() => handleBid(getNextBidAmount(bidInterval * 2))}
        >
          Bid ${getNextBidAmount(50)}
        </Button>
      </CardFooter>
    </Card>
  );
};
