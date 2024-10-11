import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Trophy, User } from "lucide-react";

interface WinnerCardProps {
  winnerName: string | null;
  winnerEmail: string | null;
}

export const WinnerCard = ({ winnerName, winnerEmail }: WinnerCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-yellow-100">
        <CardTitle className="flex items-center text-yellow-800">
          <Trophy className="mr-2 w-5 h-5" />
          Auction Ended
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-6 font-medium text-gray-600 text-sm">
          This auction has ended.{" "}
          {winnerName && winnerEmail && winnerName !== "" && winnerEmail !== ""
            ? "Congratulations to the winner!"
            : "Unfortunately, no one placed a bid."}
        </p>
        {winnerName &&
          winnerEmail &&
          winnerName !== "" &&
          winnerEmail !== "" && (
            <div className="space-y-4 text-sm">
              <div className="flex items-center">
                <User className="mr-2 w-4 h-4 text-gray-400" />
                <strong className="mr-2">Winner:</strong>
                <span className="text-blue-600">{winnerName}</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 w-4 h-4 text-gray-400" />
                <strong className="mr-2">Email:</strong>
                <span className="text-blue-600">{winnerEmail}</span>
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
};
