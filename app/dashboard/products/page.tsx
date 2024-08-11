"use client";

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
import { Product, ProductData } from "@/types";
import { listDocs } from "@junobuild/core-peer";
import { useContext, useEffect, useState } from "react";
import SideBar from "../_components/sidebar";
import ProductButton from "./_components/product-button";
import { AuthContext } from "@/app/providers";
import Image from "next/image";

export default function ProductsDashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  const getProductsData = async () => {
    try {
      const { items } = await listDocs<ProductData>({
        collection: "products",
        filter: {
          order: {
            desc: true,
            field: "updated_at",
          },
        },
      });

      const ownedProducts = items.filter(
        (item) => item.data.farmer_id === user?.key,
      );

      setProducts(ownedProducts);
    } catch (error) {
      toast({
        title: "Failed to fetch products",
        description: "Please refresh.",
      });
    }
  };

  useEffect(() => {
    if (user) {
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
              <h1 className="text-xl font-bold">Products</h1>
              <p className="text-sm text-muted-foreground md:text-base">
                Manage your products list here.
              </p>
            </div>

            <ProductButton getProductsData={getProductsData} />
          </div>

          <div className="mt-4 max-h-[70vh] overflow-auto">
            <Table className="bg-card">
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((item) => (
                  <TableRow key={item.data.product_id}>
                    <TableCell className="max-w-[50px]">
                      <Image
                        src={item.data.image}
                        alt={item.data.product_name}
                        className="h-[40px] object-contain"
                        width={200}
                        height={200}
                      />
                    </TableCell>
                    <TableCell>{item.data.product_name}</TableCell>
                    <TableCell>
                      <span
                        className={`${
                          item.data.category === "Fruits"
                            ? "bg-purple-500"
                            : item.data.category === "Vegetables"
                              ? "bg-green-500"
                              : "bg-orange-400"
                        } rounded-xl p-1 px-2 text-xs font-bold text-white`}
                      >
                        {item.data.category}
                      </span>
                    </TableCell>
                    <TableCell>{item.data.unit}</TableCell>
                    <TableCell>{item.data.price.toFixed(2)}</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </Container>
  );
}
