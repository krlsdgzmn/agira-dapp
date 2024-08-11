import { Doc } from "@junobuild/core-peer";

export type ProductData = {
  product_id: string;
  farmer_id: string;
  product_name: string;
  price: number;
  unit: string;
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
  consumer_id: string;
  farmer_id: string;
  amount: number;
  status: string;
  products: {
    product_id: string;
    quantity: number;
  }[];
};

export type Order = Doc<OrderData>;

export type FarmerData = {
  farmer_id: string;
  name: string;
  farm_name: string;
  location: string;
  image: string;
};

export type Farmer = Doc<FarmerData>;
