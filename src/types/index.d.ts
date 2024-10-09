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
