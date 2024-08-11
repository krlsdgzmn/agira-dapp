"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Farmer, FarmerData, Product, ProductData } from "@/types";
import { listDocs } from "@junobuild/core-peer";
import Autoplay from "embla-carousel-autoplay";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "./product-card";

export default function MarketplaceSection({
  title,
  description,
  delayCount,
  isDiscounted = false,
}: {
  title: string;
  description: string;
  delayCount: number;
  isDiscounted?: boolean;
}) {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const getFarmersData = async () => {
    try {
      const { items } = await listDocs<FarmerData>({
        collection: "farmers",
        filter: {
          order: {
            desc: true,
            field: "updated_at",
          },
        },
      });

      setFarmers(items);
    } catch (error) {
      console.error(error);
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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getFarmersData();
      await getProductsData();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="pt-8">
      <h1 className="text-lg font-bold md:text-xl">{title}</h1>
      <p className="text-muted-foreground">{description}</p>

      {isLoading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <Carousel
          className="mx-auto w-full"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: delayCount })]}
        >
          <CarouselContent className="gap-4 p-4">
            {products.map((item) => (
              <CarouselItem
                key={item.data.product_id}
                className="min-w-[200px] max-w-[200px] basis-1/2 overflow-hidden rounded-lg border border-border bg-card pl-0 shadow sm:basis-1/3"
              >
                <ProductCard
                  product_id={item.data.product_id}
                  farmer_id={item.data.farmer_id}
                  product_name={item.data.product_name}
                  price={item.data.price}
                  unit={item.data.unit}
                  image={item.data.image}
                  isDiscounted={isDiscounted}
                  farmers={farmers}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-1rem] top-1/2 z-10 -translate-y-1/2 transform" />
          <CarouselNext className="absolute right-[-1rem] top-1/2 z-10 -translate-y-1/2 transform" />
        </Carousel>
      )}
    </section>
  );
}
