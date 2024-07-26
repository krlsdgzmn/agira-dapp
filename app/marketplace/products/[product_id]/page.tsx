import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/dummy-data";
import { ProductData } from "@/types";
import { ShoppingCart, Tractor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MarketplaceSection from "../../_components/whole-sale-section";
import ProductAction from "./_components/product-action";

const filterData = (id: string): ProductData | undefined => {
  return products.find((item) => item.product_id === id);
};

export async function generateStaticParams() {
  return products.map((product) => ({
    product_id: product.product_id,
  }));
}

export default function ProductPage({
  params,
}: {
  params: { product_id: string };
}) {
  const product = filterData(params.product_id);

  if (!product) {
    return (
      <Container className="flex min-h-[85vh] flex-col items-center justify-center">
        <main className="flex max-w-56 flex-col gap-2.5">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="text-sm text-muted-foreground">
            We&apos;re sorry, but the product you&apos;re looking for does not
            exist.
          </p>
          <Link href="/marketplace">
            <Button size="sm" className="w-full bg-farm hover:bg-farm/90">
              Go Back
            </Button>
          </Link>
        </main>
      </Container>
    );
  }

  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center py-8">
      <main className="flex h-full w-full flex-col items-center gap-4 sm:flex-row">
        <div className="flex h-full max-h-[250px] items-center justify-center overflow-hidden rounded-lg sm:max-h-[500px] sm:w-1/2">
          <Image
            src={product.image}
            alt={product.product_name}
            className="h-full w-full object-contain"
            width={500}
            height={500}
            priority
            quality={100}
            unoptimized
          />
        </div>

        <div className="h-full sm:w-1/2 sm:p-8">
          <h1 className="flex gap-2 text-2xl font-bold sm:pb-2 sm:text-4xl">
            {product.product_name}
            <span>
              <Image
                src={
                  product.category === "Fruits"
                    ? "/fruits.svg"
                    : product.category === "Vegetables"
                      ? "/vegetables.svg"
                      : "/meat.svg"
                }
                className="h-5 w-5 sm:h-6 sm:w-6"
                alt={product.category}
                width={15}
                height={15}
                title={product.category}
              />
            </span>
          </h1>

          <p className="text-lg font-bold text-farm sm:text-2xl">
            <span className="pr-2 text-base font-light text-muted-foreground line-through sm:text-lg">
              ₱{(product.price + 20).toFixed(2)}
            </span>
            ₱{product.price.toFixed(2)}
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
              unoptimized
            />

            <p className="text-sm font-light text-muted-foreground">
              Consumer Reviews
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 pt-4 text-xs font-medium text-muted-foreground">
            <p className="rounded-2xl border-2 border-farm p-1">
              Category: {product.category}
            </p>
            <p className="rounded-2xl border-2 border-farm p-1 px-2">
              Item ID: {product.product_id}8121293
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
            href="#"
            className="flex items-center gap-2 border-t border-border py-4 text-sm font-medium text-farm hover:underline"
          >
            <Tractor className="h-[36px] w-[36px] rounded-full border-2 border-farm p-2 text-farm" />
            <p>{product.farm_name}</p>
          </Link>
        </div>
      </main>

      <div className="container px-0">
        <MarketplaceSection
          title="Suggested Products"
          description="Just for You"
          delayCount={3000}
          carousels={products}
          isDiscounted
        />
      </div>
    </Container>
  );
}
