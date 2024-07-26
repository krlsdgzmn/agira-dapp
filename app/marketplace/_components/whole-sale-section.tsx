"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CarouselCard from "./carousel-card";

export default function MarketplaceSection({
  title,
  description,
  delayCount,
  carousels,
  isDiscounted,
}: {
  title: string;
  description: string;
  delayCount: number;
  carousels: {
    farm_id?: string;
    product_id?: string;
    product_name?: string;
    price?: number;
    unit?: string;
    farm_name: string;
    image: string;
    location?: string;
  }[];
  isDiscounted?: boolean;
}) {
  return (
    <section className="pt-8">
      <h1 className="text-lg font-bold md:text-xl">{title}</h1>
      <p className="text-muted-foreground">{description}</p>

      <Carousel
        className="mx-auto w-full"
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: delayCount })]}
      >
        <CarouselContent className="gap-4 p-4">
          {carousels.map((item) => (
            <CarouselItem
              key={item.product_id || item.farm_id}
              className="min-w-[200px] max-w-[200px] basis-1/2 overflow-hidden rounded-lg border border-border bg-card pl-0 shadow sm:basis-1/3"
            >
              <CarouselCard
                id={item.product_id || item.farm_id}
                product_name={item.product_name}
                price={item.price}
                unit={item.unit}
                farm_name={item.farm_name}
                image={item.image}
                location={item.location}
                isDiscounted={isDiscounted}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-1rem] top-1/2 z-10 -translate-y-1/2 transform" />
        <CarouselNext className="absolute right-[-1rem] top-1/2 z-10 -translate-y-1/2 transform" />
      </Carousel>
    </section>
  );
}
