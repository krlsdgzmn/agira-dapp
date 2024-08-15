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
import { Farmer, Order, OrderData, Product, ProductData } from "@/types";
import { listDocs } from "@junobuild/core-peer";
import { PhilippinePeso, ScrollText, ShoppingBasket } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import KPICard from "./kpi-card";
import SideBar from "./sidebar";
import SalesChart from "./sales-chart";

export default function FarmerDashboard({
  currentFarmer,
}: {
  currentFarmer: Farmer;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  const getOrdersData = async () => {
    if (!user) return;

    try {
      const { items } = await listDocs<OrderData>({
        collection: "orders",
        filter: {
          order: {
            desc: true,
            field: "updated_at",
          },
        },
      });

      const ownedOrders = items.filter(
        (item) => item.data.farmer_id === user.key,
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

      const ownedProducts = items.filter(
        (item) => item.data.farmer_id === user?.key,
      );

      setProducts(ownedProducts);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to fetch products.",
        description: "Please try again.",
      });
    }
  };

  const totalSales = orders.reduce((acc, order) => acc + order.data.amount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  useEffect(() => {
    if (user) {
      getOrdersData();
      getProductsData();
    }
  }, [user]);

  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center">
      <main className="grid min-h-[85vh] w-full lg:grid-cols-7">
        <SideBar />

        <section className="col-span-6 p-6">
          <div className="pl-2">
            <h1 className="text-xl font-bold">
              Welcome back, {currentFarmer.data.name}!
            </h1>
            <p className="mb-2 text-sm text-muted-foreground md:text-base">
              You can manage your farm profile here.
            </p>
          </div>

          {/* KPI Section */}
          <div className="grid gap-4 xl:grid-cols-3">
            <KPICard
              title="Total Sales"
              description="Total number of sales"
              value={totalSales}
              icon={<PhilippinePeso className="text-yellow-500" />}
              isPeso={true}
            />

            <KPICard
              title="Total Products"
              description="Total number of products"
              value={totalProducts}
              icon={<ShoppingBasket className="text-green-500" />}
            />

            <KPICard
              title="Total Orders"
              description="Total number of orders"
              value={totalOrders}
              icon={<ScrollText className="text-blue-500" />}
            />
          </div>

          {/* Sales Chart */}
          <div className="mt-4 h-[350px] rounded-md border">
            <SalesChart orders={orders} />
          </div>

          <div className="mt-4 pl-2">
            <h1 className="text-base font-bold">Latest Orders</h1>
            <p className="mb-2 text-sm text-muted-foreground">
              View the most recent orders here.
            </p>
          </div>

          <div className="max-h-[70vh] overflow-auto rounded-md border">
            <Table className="bg-card">
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Amount</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((item) => (
                  <TableRow key={item.data.order_id}>
                    <TableCell>{item.data.order_id}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {orders.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">
                You have no recent orders.
              </p>
            )}
          </div>
        </section>
      </main>
    </Container>
  );
}
