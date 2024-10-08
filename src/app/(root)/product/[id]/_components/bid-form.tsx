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

export const BiddingForm = () => {
  const [customBid, setCustomBid] = useState("");
  const [bids, setBids] = useState([
    { price: 550, bidder: "Alice", time: "2 minutes ago" },
    { price: 525, bidder: "Bob", time: "5 minutes ago" },
    { price: 500, bidder: "Charlie", time: "10 minutes ago" },
  ]);

  const getNextBidAmount = useCallback(
    (increment: number) => {
      const highestBid = bids[0]?.price || 475;
      return highestBid + increment;
    },
    [bids]
  );

  const handleBid = (amount: number) => {
    if (amount <= bids[0]?.price) {
      alert("Bid amount must be greater than the current highest bid.");
      return;
    }
    const newBid = {
      price: amount,
      bidder: "You",
      time: "Just now",
    };
    setBids([newBid, ...bids]);
    setCustomBid("");
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
            value={customBid}
            onChange={(e) => setCustomBid(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={() => handleBid(Number(customBid))}>
            Place Bid
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => handleBid(getNextBidAmount(25))}
        >
          Bid ${getNextBidAmount(25)}
        </Button>
        <Button
          variant="outline"
          onClick={() => handleBid(getNextBidAmount(50))}
        >
          Bid ${getNextBidAmount(50)}
        </Button>
      </CardFooter>
    </Card>
  );
};
