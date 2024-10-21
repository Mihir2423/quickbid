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
import { useCallback, useState, useEffect } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { placeBidAction } from "../actions";
import { Loader2 } from "lucide-react";
import { useStore } from "@/store";
import { supabase } from "@/lib/supabase";

type Props = {
  currentBid: number;
  userId: string | undefined;
  productId: string | undefined;
  bidInterval: number;
  productUserId: string | undefined;
  bids: Bid[] | undefined;
  productName: string | undefined;
};

export const BiddingForm = ({
  currentBid: initialCurrentBid,
  bidInterval,
  productId,
  userId,
  productUserId,
  bids: initialBids,
  productName,
}: Props) => {
  const [customBid, setCustomBid] = useState<number | null>(null);
  const { currentBid: storeBid, setCurrentBid } = useStore();
  const [highestBidderId, setHighestBidderId] = useState<string | undefined>(
   initialBids?.[0]?.userId
  );

  useEffect(() => {
    const channel = supabase
      .channel("realtime-bids")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bids",
        },
        async (payload) => {
          if (payload.new) {
            const { data: userData, error } = await supabase
              .from("users")
              .select("id, name, email")
              .eq("id", payload.new.userId)
              .single();

            if (!error && userData) {
              const newBid: Bid = {
                ...payload.new,
                id: payload.new.id,
                productId: payload.new.productId,
                userId: payload.new.userId,
                amount: payload.new.amount,
                createdAt: new Date(payload.commit_timestamp),
                updatedAt: payload.new.updatedAt,
                user: {
                  id: userData.id,
                  name: userData.name,
                  email: userData.email,
                },
              };
              
              setCurrentBid(newBid.amount.toString());
              setHighestBidderId(newBid.userId);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setCurrentBid]);

  const getNextBidAmount = useCallback(
    (increment: number) => {
      const highestBid = Number(storeBid || initialCurrentBid);
      return highestBid + increment;
    },
    [initialCurrentBid, storeBid]
  );

  const { execute, isPending } = useServerAction(placeBidAction, {
    onError({ err }) {
      console.log(err);
      toast.message(err.message ?? "Something went wrong");
    },
    onSuccess() {
      toast.success("Bid Created successfully");
      setCustomBid(0);
    },
  });

  const handleBid = (amount: number) => {
    const currentHighestBid = Number(storeBid || initialCurrentBid);
    if (amount <= currentHighestBid) {
      toast.error("Invalid Bid Amount");
      return;
    }
    if (highestBidderId === userId) {
      toast.error("You are already the highest bidder");
      return;
    }
    if (
      !userId ||
      !productId ||
      !currentHighestBid ||
      !productUserId ||
      !productName
    ) {
      toast.error("All Fields are required");
      return;
    }
    execute({
      productId,
      currentBid: currentHighestBid,
      userId,
      amount,
      productUserId,
      productName,
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
          Bid ${getNextBidAmount(bidInterval)}
        </Button>
        <Button
          variant="outline"
          disabled={isPending}
          onClick={() => handleBid(getNextBidAmount(bidInterval * 2))}
        >
          Bid ${getNextBidAmount(bidInterval * 2)}
        </Button>
      </CardFooter>
    </Card>
  );
};
