"use client";

import Container from "@/components/container";
import { useToast } from "@/components/ui/use-toast";
import {
  Farmer,
  FarmerData,
  Order,
  OrderData,
  Product,
  ProductData,
} from "@/types";
import { listDocs } from "@junobuild/core-peer";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const { toast } = useToast();
  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    const getOrders = async () => {
      try {
        const response = await listDocs<OrderData>({
          collection: "orders",
          filter: {
            order: {
              desc: true,
              field: "updated_at",
            },
          },
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

    const getProductsData = async () => {
      try {
        const { items } = await listDocs<ProductData>({
          collection: "products",
        });
        setProducts(items);
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed to fetch products.",
          description: "Please try again.",
        });
      }
    };

    const getFarmersData = async () => {
      try {
        const { items } = await listDocs<FarmerData>({
          collection: "farmers",
        });
        setFarmers(items);
      } catch (error) {
        console.error(error);
        toast({
          title: "Failed to fetch farmers.",
          description: "Please try again.",
        });
      }
    };

    getOrders();
    getProductsData();
    getFarmersData();
  }, [user, router, toast]);

  const productMap = new Map<string, ProductData>(
    products.map((product) => [product.data.product_id, product.data]),
  );

  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center py-8">
      <main className="min-h-[80vh] w-full">
        <h1 className="text-xl font-bold sm:text-2xl">Order Purchases</h1>
        <p className="pb-4 text-muted-foreground">
          Here, you can review and manage all your current and past orders.
        </p>
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
                          ? "bg-yellow-500"
                          : order.data.status === "Shipped"
                            ? "bg-blue-500"
                            : order.data.status === "Cancelled"
                              ? "bg-red-500"
                              : "bg-green-500"
                      } rounded-xl p-1 px-2 text-xs font-bold text-white`}
                    >
                      {order.data.status}
                    </p>
                  </div>

                  <p>
                    {farmers.find(
                      (item) => item.data.farmer_id === order.data.farmer_id,
                    )?.data.farm_name || "Unknown Farm"}
                  </p>
                  <p>₱{order.data.amount.toFixed(2)}</p>
                  <p>
                    <strong>Products:</strong>
                  </p>
                  <ul>
                    {order.data.products.map((product, index) => {
                      const productDetails = productMap.get(product.product_id);
                      return (
                        <li key={index}>
                          {productDetails?.product_name || "Unknown"} x{" "}
                          {product.quantity || 1} {productDetails?.unit || ""}
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
