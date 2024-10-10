import { ComponentWrapper } from "@/components/component-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { BiddingForm } from "./_components/bid-form";
import { BiddingSection } from "./_components/bidding";
import { BreadCrumb } from "@/components/globals/breadcrumb";
import { assertAuthenticated } from "@/lib/session";
import { getProductDetailUseCase } from "@/use-cases/auctions";
import { PageHeader } from "@/components/globals/page-header";
const BiddingPage = async ({ params }: { params: { id: string } }) => {
  const session = await assertAuthenticated();
  const product: Product | null = await getProductDetailUseCase(
    session,
    params.id
  );
  return (
    <ComponentWrapper>
      <PageHeader title="Auctions">
      </PageHeader>
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
                  <div>
                    <strong>Current Bid:</strong> $
                    {product?.bid[0]?.amount.toString() || product?.startingPrice}
                  </div>
                  <div>
                    <strong>Starting Bid:</strong> $
                    {product?.startingPrice.toString()}
                  </div>
                  <div>
                    <strong>Bid Interval:</strong> $
                    {product?.bidInterval.toString()}
                  </div>
                </div>
              </CardContent>
            </Card>
            <BiddingForm
              productId={product?.id}
              bids={product?.bid}
              userId={session.id}
              bidInterval={Number(product?.bidInterval)}
              currentBid={Number(product?.currentBid)}
              productUserId={product?.userId}
              productName={product?.name}
            />
          </div>
          <BiddingSection bids={product?.bid} />
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default BiddingPage;
