import { ComponentWrapper } from "@/components/component-wrapper";
import { PageHeader } from "@/components/globals/page-header";
import { Card } from "@/components/ui/card";
import { assertAuthenticated } from "@/lib/session";
import { getWinningAuctionsUseCase } from "@/use-cases/auctions";
import Image from "next/image";
import React from "react";
import { AuctionCard } from "../auction/_components/auction-card";

const WinsPage = async () => {
  const session = await assertAuthenticated();
  if (!session) {
    return (
      <div className="flex justify-center items-center w-full h-[40vh]">
        <Card className="p-8 rounded-md">
          <p>You are not authorized to view this page</p>
        </Card>
      </div>
    );
  }
  const winnings = await getWinningAuctionsUseCase(session);
  console.log(winnings);
  return (
    <ComponentWrapper>
      <div className="mx-auto container">
        <PageHeader title="Winnings"></PageHeader>
        <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
          {Array.isArray(winnings) && winnings.length > 0 ? (
            winnings.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))
          ) : (
            <div className="flex justify-center items-center md:col-span-2 lg:col-span-3 xl:col-span-4 w-full h-[70vh]">
              <Card className="flex flex-col justify-center items-center p-8 w-fit">
                <p className="text-gray-500">No Auctions Won</p>
                <Image
                  src="/images/auction.jpeg"
                  alt="work"
                  width={300}
                  height={250}
                />
              </Card>
            </div>
          )}
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default WinsPage;
