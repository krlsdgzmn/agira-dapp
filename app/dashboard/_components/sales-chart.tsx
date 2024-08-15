"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Order } from "@/types";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--completed))",
  },
} satisfies ChartConfig;

export default function SalesChart({ orders }: { orders: Order[] }) {
  // Calculate monthly sales data from orders
  const chartData = useMemo(() => {
    const salesByMonth: Record<string, number> = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    orders.forEach((order) => {
      // Check if order and order.created_at are defined
      if (order && order.created_at) {
        const month = new Date(
          parseInt(order.created_at.toString().slice(0, -6)),
        ).toLocaleString("en-US", {
          month: "long",
        });

        // Check if salesByMonth[month] exists to avoid undefined issues
        if (salesByMonth[month] !== undefined) {
          salesByMonth[month] += order.data.amount;
        } else {
          salesByMonth[month] = order.data.amount;
        }
      }
    });

    return Object.entries(salesByMonth).map(([month, sales]) => ({
      month,
      sales,
    }));
  }, [orders]);

  return (
    <div className="grid h-full grid-cols-6 items-center px-4 py-6 pr-0">
      {/* Left side */}
      <div className="col-span-1 h-full border-r border-border">
        <h1 className="pt-3 text-xs text-muted-foreground sm:text-sm">
          Overview
        </h1>

        <h2 className="text-base font-semibold sm:text-xl">Sales Chart</h2>

        <hr className="pb-4" />
      </div>

      {/* Right side */}
      <div className="col-span-5">
        <ChartContainer
          config={chartConfig}
          className="col-span-4 max-h-[300px] w-full min-w-[300px] px-4"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
