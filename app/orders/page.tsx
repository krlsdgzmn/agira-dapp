"use client";

import Container from "@/components/container";
import { useToast } from "@/components/ui/use-toast";
import { Order, OrderData, Product, ProductData } from "@/types";
import { listDocs } from "@junobuild/core-peer";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers";
import { products } from "@/lib/dummy-data"; // Assuming this is your product data source

// Create a map for quick product lookup
const productMap = new Map<string, ProductData>(
  products.map((product) => [product.product_id, product]),
);

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();
  const { user } = useContext(AuthContext);

  const router = useRouter();
  if (!user) router.push("/");

  const getOrders = async () => {
    try {
      const response = await listDocs<OrderData>({
        collection: "orders",
      });

      const { items } = response;
      setOrders(items);
    } catch (error) {
      toast({
        title: "Failed to fetch data.",
        description: "Please try again.",
      });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center py-8">
      <main className="min-h-[80vh] w-full">
        <h1 className="text-xl font-bold sm:text-2xl">Order Purchases</h1>
        <p className="pb-4 text-muted-foreground">
          Here, you can review and manage all your current and past orders.
        </p>
        {/* Display orders */}
        {orders.length === 0 ? (
          <p className="font-medium text-muted-foreground">No orders found.</p>
        ) : (
          <div>
            <ul className="flex flex-col gap-4 text-sm">
              {orders.map((order) => (
                <li key={order.key} className="rounded-md border p-4 shadow">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Order ID: {order.data.order_id}</p>
                    <p
                      className={`${
                        order.data.status === "To Pack"
                          ? "border-yellow-500"
                          : order.data.status === "Shipped"
                            ? "border-blue-500"
                            : order.data.status === "Cancelled"
                              ? "border-red-500"
                              : "border-green-500"
                      } rounded-xl border-2 p-1 px-2 text-xs font-bold`}
                    >
                      {order.data.status}
                    </p>
                  </div>

                  <p>₱{order.data.amount.toFixed(2)}</p>
                  <p>
                    <strong>Products:</strong>
                  </p>
                  <ul>
                    {order.data.products.map((product, index) => {
                      const productDetails = productMap.get(product.product_id);
                      return (
                        <li key={index}>
                          {productDetails?.product_name || "Unknown"} x {""}
                          {product.quantity || 1} {productDetails?.unit}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </Container>
  );
}
