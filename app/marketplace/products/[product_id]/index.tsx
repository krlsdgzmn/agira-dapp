"use client";

import { toast } from "@/components/ui/use-toast";
import { Farmer, FarmerData, Product, ProductData } from "@/types";
import { getDoc, listDocs } from "@junobuild/core-peer";
import { Loader2, Tractor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MarketplaceSection from "../../_components/whole-sale-section";
import ProductAction from "./_components/product-action";

const getCategoryImageSrc = (category: string) => {
  switch (category) {
    case "Fruits":
      return "/fruits.svg";
    case "Vegetables":
      return "/vegetables.svg";
    default:
      return "/meat.svg";
  }
};

export default function ProductItem({
  params,
}: {
  params: { product_id: string };
}) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [farmers, setFarmers] = useState<Farmer[]>([]);

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

  // TODO: here I hardcoded the satellite ID to fetch the document regardless if the Juno library is loaded or not.
  // Currently this useEffect is run at runtime before initSatellite is performed
  // Therefore, without this workaround it throws "No satellite ID defined. Did you initialize Juno?"
  // This can remain as it is, but another way to solve it would be to run this effect only once initSatellite has been executed.
  useEffect(() => {
    (async () => {
      const doc = await getDoc<ProductData>({
        collection: "products",
        key: params.product_id,
        satellite: {
          satelliteId: "mdw7w-piaaa-aaaal-ajoma-cai",
        },
      });

      (async () => {
        getFarmersData();
      })();

      setProduct(doc);
    })();
  }, [params.product_id]);

  if (!product) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <>
      <main className="flex h-full w-full flex-col items-center gap-4 sm:flex-row">
        <div className="flex h-full max-h-[250px] items-center justify-center overflow-hidden rounded-lg sm:max-h-[500px] sm:w-1/2">
          <Image
            src={product.data.image}
            alt={product.data.product_name}
            className="h-full w-full object-contain"
            width={500}
            height={500}
            priority
            quality={100}
          />
        </div>

        <div className="h-full sm:w-1/2 sm:p-8">
          <h1 className="flex gap-2 text-2xl font-bold sm:pb-2 sm:text-4xl">
            {product.data.product_name}
            <span>
              <Image
                src={getCategoryImageSrc(product.data.category)}
                className="h-5 w-5 sm:h-6 sm:w-6"
                alt={product.data.category}
                width={15}
                height={15}
                title={product.data.category}
              />
            </span>
          </h1>

          <p className="text-lg font-bold text-farm sm:text-2xl">
            <span className="pr-2 text-base font-light text-muted-foreground line-through sm:text-lg">
              ₱{(product.data.price + 20).toFixed(2)}
            </span>
            ₱{product.data.price.toFixed(2)}
          </p>

          <div className="flex w-full items-center gap-2 border-b border-border py-2">
            <Image
              src="/stars.png"
              alt="Ratings"
              className="w-full max-w-[130px]"
              width={100}
              height={20}
              priority
              quality={100}
            />
            <p className="text-sm font-light text-muted-foreground">
              Consumer Reviews
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 pt-4 text-xs font-medium text-muted-foreground">
            <p className="rounded-2xl border-2 border-farm p-1">
              Category: {product.data.category}
            </p>
            <p className="rounded-2xl border-2 border-farm p-1 px-2">
              Item ID: {product.data.product_id}
            </p>
          </div>

          <p className="pt-4 text-sm text-muted-foreground">
            Welcome to our farm-to-table marketplace! We proudly offer a diverse
            selection of fresh vegetables, juicy fruits, and high-quality meats.
            Our products are sourced directly from local farms, ensuring you
            receive the freshest and most nutritious produce available.
          </p>

          <ProductAction product={product} />

          <Link
            // href={`/marketplace/farmers/${product.data.farmer_id}`}
            href="#"
            className="flex items-center gap-2 border-t border-border py-4 text-sm font-medium text-farm hover:underline"
          >
            <Tractor className="h-[36px] w-[36px] rounded-full border-2 border-farm p-2 text-farm" />
            <p>
              {
                farmers.find(
                  (item) => item.data.farmer_id === product.data.farmer_id,
                )?.data.farm_name
              }
            </p>
          </Link>
        </div>
      </main>

      <div className="container px-0">
        <MarketplaceSection
          title="Suggested Products"
          description="Just for You"
          delayCount={3000}
          isDiscounted
        />
      </div>
    </>
  );
}
