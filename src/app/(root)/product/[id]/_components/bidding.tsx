"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { getTimeAgo } from "@/lib/utils";
import { useStore } from "@/store";
import { Clock, DollarSign } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const BiddingSection = ({ bids }: { bids: Bid[] | undefined }) => {
  const session = useSession();
  const { setCurrentBid } = useStore();
  const isCurrentUser = (userId: string) => userId === session.data?.user?.id;
  const [allBids, setAllBids] = useState<Bid[] | undefined>(bids);
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
            // Fetch the user information for the new bid
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
              setAllBids((prevBids) => [newBid, ...(prevBids || [])]);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="relative h-full max-h-[835px] overflow-y-scroll">
      <CardHeader className="top-0 left-0 sticky bg-gray-200 mb-2 w-full">
        <CardTitle>Bid History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {!Array.isArray(allBids) || allBids.length === 0 ? (
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
            allBids.map((bid) => (
              <li
                key={bid.id}
                className="flex justify-between items-center pb-2 border-b"
              >
                <div>
                  <div className="font-semibold">
                    {isCurrentUser(bid.userId)
                      ? "You"
                      : bid.user.name || "Anonymous"}
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
