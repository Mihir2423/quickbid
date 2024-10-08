import { ComponentWrapper } from "@/components/component-wrapper";
import React from "react";
import { CreateAuctionModal } from "./_components/create-auction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allAuctions, myAuctions } from "./constants";
import { AuctionCard } from "./_components/auction-card";
const AuctionPage = () => {
  return (
    <ComponentWrapper>
      <div className="mx-auto p-4 min-h-screen container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-3xl text-gray-800">Auctions</h1>
          <CreateAuctionModal />
        </div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="place-content-center grid grid-cols-2 mb-6 w-fit">
            <TabsTrigger value="all">All Auctions</TabsTrigger>
            <TabsTrigger value="my">My Auctions</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="my">
            <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {myAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ComponentWrapper>
  );
};

export default AuctionPage;
