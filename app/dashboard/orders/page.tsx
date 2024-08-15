"use client";

import { AuthContext } from "@/app/providers";
import Container from "@/components/container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Order, OrderData, Product, ProductData } from "@/types";
import { listDocs } from "@junobuild/core-peer";
import { useContext, useEffect, useState } from "react";
import SideBar from "../_components/sidebar";
import ActionButton from "./_components/action-button";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  const getOrdersData = async () => {
    try {
      const { items } = await listDocs<OrderData>({
        collection: "orders",
        filter: {
          order: {
            desc: true,
            field: "created_at",
          },
        },
      });

      const ownedOrders = items.filter(
        (item) => item.data.farmer_id === user?.key,
      );

      setOrders(ownedOrders);
    } catch (error) {
      toast({
        title: "Failed to fetch orders",
        description: "Please refresh.",
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

  useEffect(() => {
    if (user) {
      getOrdersData();
      getProductsData();
    }
  }, [user]);

  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center">
      <main className="grid max-h-[85vh] min-h-[85vh] w-full lg:grid-cols-7">
        <SideBar />

        <section className="col-span-6 p-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-xl font-bold">Orders</h1>
              <p className="text-sm text-muted-foreground md:text-base">
                Manage your orders list here.
              </p>
            </div>
          </div>

          <div className="mt-4 max-h-[70vh] overflow-auto">
            <Table className="bg-card">
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((item) => (
                  <TableRow key={item.data.order_id}>
                    <TableCell>{item.data.order_id}</TableCell>
                    <TableCell>
                      {item.data.products.map((item) => (
                        <div key={item.product_id}>
                          <p>
                            {
                              products.find(
                                (product) =>
                                  product.data.product_id === item.product_id,
                              )?.data.product_name
                            }{" "}
                            x {item.quantity}{" "}
                            {
                              products.find(
                                (product) =>
                                  product.data.product_id === item.product_id,
                              )?.data.unit
                            }
                          </p>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {item.created_at &&
                        new Date(
                          parseInt(item.created_at.toString().slice(0, -6)),
                        )
                          .toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })
                          .replace(",", "")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`${
                          item.data.status === "To Pack"
                            ? "bg-yellow-500"
                            : item.data.status === "Shipped"
                              ? "bg-blue-500"
                              : item.data.status === "Cancelled"
                                ? "bg-red-500"
                                : "bg-green-500"
                        } rounded-xl p-1 px-2 text-xs font-bold text-white`}
                      >
                        {item.data.status}
                      </span>
                    </TableCell>
                    <TableCell>₱{item.data.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <ActionButton doc={item} getOrdersData={getOrdersData} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {orders.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">
                You have no orders yet.
              </p>
            )}
          </div>
        </section>
      </main>
    </Container>
  );
}
