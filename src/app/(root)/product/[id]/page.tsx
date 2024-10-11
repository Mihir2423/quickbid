import { ComponentWrapper } from "@/components/component-wrapper";
import { BreadCrumb } from "@/components/globals/breadcrumb";
import { PageHeader } from "@/components/globals/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { assertAuthenticated } from "@/lib/session";
import { getTimeLeft } from "@/lib/utils";
import { getProductDetailUseCase } from "@/use-cases/auctions";
import { Clock } from "lucide-react";
import Image from "next/image";
import { BiddingForm } from "./_components/bid-form";
import { BiddingSection } from "./_components/bidding";
import { CloseAuction } from "./_components/close";
import { DeleteAuction } from "./_components/delete";
import { CurrentBid } from "./_components/current-bid";
import { WinnerCard } from "./_components/auction-winner";
const BiddingPage = async ({ params }: { params: { id: string } }) => {
  const session = await assertAuthenticated();
  const product: Product | null = await getProductDetailUseCase(
    session,
    params.id
  );
  console.log(product?.bidWinner, "PRODUCTS");
  return (
    <ComponentWrapper>
      <PageHeader title="Auctions"></PageHeader>
      <div className="pl-4">
        <BreadCrumb
          links={[{ name: "Auctions", path: "/auction" }]}
          page="Details"
        />
      </div>
      <div className="p-4 md:p-8 text-black">
        <div className="gap-8 grid md:grid-cols-2 mx-auto max-w-6xl">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{product?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={product?.image || ""}
                  alt="Vintage Phone"
                  width={500}
                  height={256}
                  className="mb-4 rounded-md w-full h-auto max-h-[400px] object-center object-cover"
                />
                <p className="mb-4 text-sm">
                  {product?.description || "No description available"}
                </p>
                <div className="gap-4 grid grid-cols-2 text-sm">
                  <CurrentBid
                    bidAmount={
                      product?.bid[0]?.amount.toString() ||
                      product?.startingPrice
                    }
                  />
                  <div>
                    <strong>Starting Bid:</strong> $
                    {product?.startingPrice.toString()}
                  </div>
                  <div>
                    <strong>Bid Interval:</strong> $
                    {product?.bidInterval.toString()}
                  </div>
                  <div className="flex items-center">
                    <strong>Time Left:</strong>{" "}
                    <span>
                      <Clock className="mr-1 ml-2 w-[14px] h-[14px]" />
                    </span>
                    {product?.status !== "active"
                      ? "Ended"
                      : getTimeLeft(`${product?.timeLeft}`)}
                  </div>
                </div>
              </CardContent>
            </Card>
            {product?.userId !== session.id && product?.status === "active" && (
              <BiddingForm
                productId={product?.id}
                bids={product?.bid}
                userId={session.id}
                bidInterval={Number(product?.bidInterval)}
                currentBid={Number(product?.currentBid)}
                productUserId={product?.userId}
                productName={product?.name}
              />
            )}
            {product?.status !== "active" &&
              (product?.bidWinnerId !== null ||
                product?.bidWinnerId !== "") && (
                <WinnerCard
                  winnerName={product?.bidWinner?.name ?? ""}
                  winnerEmail={product?.bidWinner?.email ?? ""}
                />
              )}
            {product?.userId === session.id && (
              <div className="flex items-center gap-4">
                {product?.status === "active" && (
                  <CloseAuction
                    productId={product?.id}
                    productUserId={product?.userId}
                  />
                )}
                <DeleteAuction
                  productId={product?.id}
                  productUserId={product?.userId}
                />
              </div>
            )}
          </div>
          <BiddingSection bids={product?.bid} />
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default BiddingPage;
