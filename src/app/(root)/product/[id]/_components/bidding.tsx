import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { assertAuthenticated } from "@/lib/session";
import { getTimeAgo } from "@/lib/utils";
import { Clock, DollarSign } from "lucide-react";
import Image from "next/image";

export const BiddingSection = async ({ bids }: { bids: Bid[] | undefined }) => {
  const session = await assertAuthenticated();
  const isCurrentUser = (userId: string) => userId === session.id;
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Bid History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {!Array.isArray(bids) || bids.length === 0 ? (
            <div className="flex justify-center items-center md:col-span-2 lg:col-span-3 xl:col-span-4 w-full h-[70vh]">
              <CardContent className="flex flex-col justify-center items-center p-8 w-fit">
                <p className="text-gray-500">No Bids Available</p>
                <Image
                  src="/images/auction.jpeg"
                  alt="work"
                  width={300}
                  height={250}
                />
              </CardContent>
            </div>
          ) : (
            bids.map((bid, index) => (
              <li
                key={index}
                className="flex justify-between items-center pb-2 border-b"
              >
                <div>
                  <div className="font-semibold">
                    {isCurrentUser(bid.userId) ? "You" : bid.user.name}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="mr-1 w-4 h-4" />
                    {getTimeAgo(`${bid.createdAt}`)}
                  </div>
                </div>
                <div className="flex items-center font-bold">
                  <DollarSign className="mr-1 w-4 h-4" />
                  {bid.amount.toString()}
                </div>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
};
