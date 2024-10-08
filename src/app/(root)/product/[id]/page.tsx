import { ComponentWrapper } from "@/components/component-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { BiddingForm } from "./_components/bid-form";
import { BiddingSection } from "./_components/bidding";
import { BreadCrumb } from "@/components/globals/breadcrumb";
const BiddingPage = () => {
  return (
    <ComponentWrapper>
      <div className="p-6">
        <BreadCrumb
          links={[{ name: "Auctions", path: "/auction" }]}
          page="Details"
        />
      </div>
      <div className="p-4 md:p-8 min-h-screen text-black">
        <div className="gap-8 grid md:grid-cols-2 mx-auto max-w-6xl">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Vintage Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src="/images/placeholder.avif"
                  alt="Vintage Phone"
                  width={500}
                  height={256}
                  className="mb-4 rounded-md w-full h-auto object-cover"
                />
                <p className="mb-4 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat, at nobis aspernatur quod, neque aliquam quis aliquid
                  vitae et ducimus deserunt vero explicabo molestiae.
                </p>
                <div className="gap-4 grid grid-cols-2 text-sm">
                  <div>
                    <strong>Current Bid:</strong> $500
                  </div>
                  <div>
                    <strong>Starting Bid:</strong> $500
                  </div>
                  <div>
                    <strong>Bid Interval:</strong> $25
                  </div>
                </div>
              </CardContent>
            </Card>
            <BiddingForm />
          </div>
          <BiddingSection />
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default BiddingPage;
