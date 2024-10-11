declare type Auction = {
  id: string;
  userId: string;
  name: string;
  description: string;
  image: string;
  currentBid: Decimal;
  startingPrice: Decimal;
  bidInterval: Decimal;
  status: string;
  createdAt: Date;
  timeLeft: Date;
  updatedAt: Date;
};

declare type Product = {
  id: string;
  userId: string;
  name: string;
  description: string;
  image: string;
  currentBid: Decimal;
  startingPrice: Decimal;
  bidInterval: Decimal;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  timeLeft: Date;
  bidWinnerId?: string | null;
  bidWinner?: {
    id: string;
    name: string | null;
    email?: string | null | undefined;
  } | null;
  bid: Bid[];
};

declare type Bid = {
  id: string;
  productId: string;
  userId: string;
  amount: Decimal;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
};
