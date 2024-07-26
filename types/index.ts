import { Doc } from "@junobuild/core-peer";

export type ProductData = {
  product_id: string;
  product_name: string;
  price: number;
  unit: string;
  farm_name: string;
  image: string;
  category: string;
};

export type Product = Doc<ProductData>;

export type CartData = {
  quantity: number;
  product_id: string;
};

export type Cart = Doc<CartData>;

export type OrderData = {
  order_id: string;
  products: {
    product_id: string;
    quantity: number;
  }[];
  amount: number;
  status: "To Pack" | "Shipped" | "Completed" | "Cancelled";
};

export type Order = Doc<OrderData>;
