"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Order } from "@/types";
import { setDoc } from "@junobuild/core-peer";
import { useState } from "react";

export default function ActionButton({
  doc,
  getOrders,
}: {
  doc: Order;
  getOrders: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleCancel = async () => {
    setIsLoading(true);

    try {
      await setDoc({
        collection: "orders",
        doc: {
          ...doc,
          data: {
            ...doc.data,
            status: "Cancelled",
          },
        },
      });

      toast({
        title: "Success!",
        description: `Order ${doc.data.order_id} has been successfully cancelled.`,
      });

      await getOrders();
    } catch (error) {
      console.error(error);

      toast({
        title: "Failed to cancel.",
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);

    try {
      await setDoc({
        collection: "orders",
        doc: {
          ...doc,
          data: {
            ...doc.data,
            status: "Completed",
          },
        },
      });

      toast({
        title: "Success!",
        description: `Order ${doc.data.order_id} has been successfully completed.`,
      });

      await getOrders();
    } catch (error) {
      console.error(error);

      toast({
        title: "Failed to complete.",
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (doc.data.status === "To Pack")
    return (
      <Button
        onClick={handleCancel}
        title="Cancel Order"
        disabled={isLoading}
        size="icon"
        variant="ghost"
        className={`h-8 w-fit overflow-hidden px-2 text-xs text-muted-foreground`}
      >
        {isLoading ? "Cancelling..." : "Cancel Order"}
      </Button>
    );

  if (doc.data.status === "Shipped")
    return (
      <Button
        onClick={handleComplete}
        title="Order Received"
        disabled={isLoading}
        size="icon"
        variant="ghost"
        className={`h-8 w-fit overflow-hidden px-2 text-xs text-muted-foreground`}
      >
        {isLoading ? "Loading..." : "Order Received"}
      </Button>
    );
}
