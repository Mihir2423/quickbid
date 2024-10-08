import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export const CreateAuctionModal = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>
        <Plus className="mr-2 w-4 h-4" /> Create Auction
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create New Auction</DialogTitle>
      </DialogHeader>
      <form className="gap-4 grid py-4">
        <div className="gap-2 grid">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter auction title" />
        </div>
        <div className="gap-2 grid">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            className="resize-none"
            placeholder="Enter item description"
          />
        </div>
        <div className="gap-4 grid grid-cols-2">
          <div className="gap-2 grid">
            <Label htmlFor="startingBid">Starting Bid ($)</Label>
            <Input id="startingBid" type="number" placeholder="0" />
          </div>
          <div className="gap-2 grid">
            <Label htmlFor="bidInterval">Bid Interval ($)</Label>
            <Input id="bidInterval" type="number" placeholder="0" />
          </div>
        </div>
        <div className="gap-2 grid">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="url"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <Button type="submit">Create Auction</Button>
      </form>
    </DialogContent>
  </Dialog>
);
