"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Order } from "@/types";
import { setDoc } from "@junobuild/core-peer";
import { Check, X } from "lucide-react";
import { useState } from "react";

export default function ActionButton({
  doc,
  getOrdersData,
}: {
  doc: Order;
  getOrdersData: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleAccept = async (doc: Order) => {
    setIsLoading(true);

    try {
      await setDoc({
        collection: "orders",
        doc: {
          ...doc,
          data: {
            ...doc.data,
            status: "Shipped",
          },
        },
      });

      toast({
        title: "Success!",
        description: `Order ${doc.data.order_id} has been successfully shipped.`,
      });

      await getOrdersData();
    } catch (error) {
      console.error(error);

      toast({
        title: "Failed to ship.",
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (doc: Order) => {
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

      await getOrdersData();
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

  return (
    <div className="w-fit rounded border">
      <Button
        onClick={async () => await handleAccept(doc)}
        title="Accept"
        disabled={isLoading || doc.data.status !== "To Pack"}
        size="icon"
        variant="ghost"
        className={`${doc.data.status !== "To Pack" && "cursor-not-allowed border-r-gray-300 bg-gray-200"} h-8 overflow-hidden rounded-none border-r text-green-500 hover:bg-farm/10 hover:text-green-500`}
      >
        <Check size={14} />
      </Button>

      <Button
        onClick={async () => await handleCancel(doc)}
        title="Cancel"
        disabled={isLoading || doc.data.status !== "To Pack"}
        size="icon"
        variant="ghost"
        className={`${doc.data.status !== "To Pack" && "cursor-not-allowed border-r-gray-300 bg-gray-200"} h-8 overflow-hidden rounded-none text-red-500 hover:bg-farm/10 hover:text-red-500`}
      >
        <X size={14} />
      </Button>
    </div>
  );
}
