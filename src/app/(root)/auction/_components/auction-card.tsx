import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Auction = {
  id: number;
  title: string;
  description: string;
  currentBid: number;
  startingBid: number;
  bidInterval: number;
  timeLeft: string;
  image: string;
};

export const AuctionCard = ({ auction }: { auction: Auction }) => (
  <Card className="flex flex-col justify-between h-full overflow-hidden">
    <div>
      <CardHeader className="p-0">
        <Image
          src={auction.image}
          alt={auction.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="mb-2 text-lg">{auction.title}</CardTitle>
        <p className="mb-4 line-clamp-2 text-gray-600 text-sm">
          {auction.description}
        </p>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
            <CreditCard className="mr-1 w-4 h-4" />
            <span>${auction.currentBid}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 w-4 h-4" />
            <span>{auction.timeLeft}</span>
          </div>
        </div>
      </CardContent>
    </div>
    <CardFooter>
      <Button asChild className="w-full">
        <Link href={`/product/${auction.id}`}>Place Bid</Link>
      </Button>
    </CardFooter>
  </Card>
);
