declare type Auction = {
  id: number;
  title: string;
  description: string;
  currentBid: number;
  startingBid: number;
  bidInterval: number;
  timeLeft: string;
  image: string;
  endDate?: string
};
