import ProductItem from "@/app/marketplace/products/[product_id]/index";
import Container from "@/components/container";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamicParams = true;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const data = join(process.cwd(), "app", "data", "products.json");
  const products = JSON.parse((await readFile(data)).toString());

  return products.map((product_id: string) => ({ product_id }));
}

export default function ProductPage({
  params,
}: {
  params: { product_id: string };
}) {
  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center py-8">
      <ProductItem params={params} />
    </Container>
  );
}
