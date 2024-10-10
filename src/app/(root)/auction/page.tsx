import { ComponentWrapper } from "@/components/component-wrapper";
import { PageHeader } from "@/components/globals/page-header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { assertAuthenticated } from "@/lib/session";
import {
 getAllAuctionsUseCase,
 getMyAuctionsUseCase,
} from "@/use-cases/auctions";
import Image from "next/image";
import { AuctionCard } from "./_components/auction-card";
import { CreateAuctionModal } from "./_components/create-auction";
const AuctionPage = async () => {
  const session = await assertAuthenticated();
  const allAuctions: Auction[] | null = await getAllAuctionsUseCase(session.id);
  const myAuctions: Auction[] | null = await getMyAuctionsUseCase(session.id);

  return (
    <ComponentWrapper>
      <div className="mx-auto container">
        <PageHeader title="Auctions">
          <CreateAuctionModal />
        </PageHeader>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="place-content-center grid grid-cols-2 mb-6 p-4 w-fit">
            <TabsTrigger value="all">All Auctions</TabsTrigger>
            <TabsTrigger value="my">My Auctions</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
              {!Array.isArray(allAuctions) || allAuctions.length === 0 ? (
                <div className="flex justify-center items-center md:col-span-2 lg:col-span-3 xl:col-span-4 w-full h-[70vh]">
                  <Card className="flex flex-col justify-center items-center p-8 w-fit">
                    <p className="text-gray-500">No Auctions Available</p>
                    <Image
                      src="/images/auction.jpeg"
                      alt="work"
                      width={300}
                      height={250}
                    />
                  </Card>
                </div>
              ) : (
                allAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="my">
            <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
              {!Array.isArray(myAuctions) || myAuctions.length === 0 ? (
                <div className="flex justify-center items-center md:col-span-2 lg:col-span-3 xl:col-span-4 w-full h-[70vh]">
                  <Card className="flex flex-col justify-center items-center p-8 w-fit">
                    <p className="text-gray-500">No Auctions Available</p>
                    <Image
                      src="/images/auction.jpeg"
                      alt="work"
                      width={300}
                      height={250}
                    />
                  </Card>
                </div>
              ) : (
                myAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ComponentWrapper>
  );
};

export default AuctionPage;
