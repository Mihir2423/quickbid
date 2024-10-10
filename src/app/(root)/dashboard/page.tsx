import { ComponentWrapper } from "@/components/component-wrapper";
import { PageHeader } from "@/components/globals/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Package,
} from "lucide-react";

const recentAuctions = [
  { id: 1, name: "Vintage Camera", currentBid: 150, endTime: "2h 30m" },
  { id: 2, name: "Antique Watch", currentBid: 300, endTime: "4h 15m" },
  { id: 3, name: "Rare Coin", currentBid: 500, endTime: "1d 2h" },
];

const DashboardPage = () => {
  return (
    <ComponentWrapper>
      <div className="mx-auto container">
        <PageHeader title="Dashboard" />
        <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 p-4">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">$45,231.89</div>
              <p className="text-muted-foreground text-xs">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">
                Active Auctions
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">23</div>
              <p className="text-muted-foreground text-xs">
                +4 new since last login
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">Win Rate</CardTitle>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">32%</div>
              <p className="text-muted-foreground text-xs">
                +2% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">
                Avg. Bid Increase
              </CardTitle>
              <ArrowDownRight className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">12%</div>
              <p className="text-muted-foreground text-xs">
                -4% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="gap-6 grid lg:grid-cols-2 p-4">
          <Card className="col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Recent Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAuctions.map((auction) => (
                  <div key={auction.id} className="flex items-center">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{auction.name}</p>
                      <p className="text-muted-foreground text-xs">
                        Ends in {auction.endTime}
                      </p>
                    </div>
                    <div className="font-medium text-sm">
                      ${auction.currentBid}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>My Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" className="w-full">
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="won">Won</TabsTrigger>
                  <TabsTrigger value="lost">Lost</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                  <p className="text-muted-foreground text-sm">
                    You have 3 active auctions.
                  </p>
                </TabsContent>
                <TabsContent value="won">
                  <p className="text-muted-foreground text-sm">
                    You have won 7 auctions this month.
                  </p>
                </TabsContent>
                <TabsContent value="lost">
                  <p className="text-muted-foreground text-sm">
                    You have lost 2 auctions this month.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default DashboardPage;
