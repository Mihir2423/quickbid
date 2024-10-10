"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { closeAuctionAction } from "../actions";
import { Loader2 } from "lucide-react";

export const CloseAuction = ({
 productId,
 productUserId
}: {
 productId: string | undefined;
 productUserId: string | undefined;
}) => {
  const { execute, isPending } = useServerAction(closeAuctionAction, {
    onError({ err }) {
      console.log(err);
      toast.message("Something went wrong");
    },
    onSuccess() {
      toast.success("Auction Closed successfully");
    },
  });
  const handleCloseAuction = async () => {
    if (!productId) {
      toast.error("Product id is required");
    }
    execute({ id: productId as string, userId: productUserId as string });
  };
  return (
    <Button disabled={isPending} onClick={handleCloseAuction}>
      Close {isPending && <Loader2 className="ml-2 animate-spin" size={16} />}
    </Button>
  );
};
