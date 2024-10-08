import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign } from "lucide-react";

export const BiddingSection = () => {
  const bids = [
    { price: 550, bidder: "Alice", time: "2 minutes ago" },
    { price: 525, bidder: "Bob", time: "5 minutes ago" },
    { price: 500, bidder: "Charlie", time: "10 minutes ago" },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Bid History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {bids.map((bid, index) => (
            <li
              key={index}
              className="flex justify-between items-center pb-2 border-b"
            >
              <div>
                <div className="font-semibold">{bid.bidder}</div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="mr-1 w-4 h-4" />
                  {bid.time}
                </div>
              </div>
              <div className="flex items-center font-bold">
                <DollarSign className="mr-1 w-4 h-4" />
                {bid.price}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
