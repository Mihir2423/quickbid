import { ErrorImage } from "@/components/error-image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTimeLeft } from "@/lib/utils";
import { Clock, CreditCard } from "lucide-react";
import Link from "next/link";

export const AuctionCard = ({ auction }: { auction: Auction }) => {
  return (
    <Card className="flex flex-col justify-between h-full overflow-hidden">
      <div>
        <CardHeader className="p-0">
          <ErrorImage
            src={auction.image}
            alt={auction.name}
            width={400}
            height={200}
            className="w-full h-48 object-center object-cover"
          />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="mb-2 text-lg">{auction.name}</CardTitle>
          <p className="mb-4 line-clamp-2 text-gray-600 text-sm">
            {auction.description}
          </p>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <CreditCard className="mr-1 w-4 h-4" />
              <span>${auction.currentBid.toString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 w-4 h-4" />
              <span>
                {auction?.status !== "active"
                  ? "Ended"
                  : getTimeLeft(`${auction.timeLeft}`)}
              </span>
            </div>
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-3 pt-0">
        <Button asChild className="w-full">
          <Link href={`/product/${auction.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
