// directory: app/…/[product_id]/page.tsx

import Container from "@/components/container";
import { ProductData } from "@/types";
import { listDocs } from "@junobuild/core-peer";

export async function generateStaticParams() {
  const { items } = await listDocs<ProductData>({
    collection: "products",
    satellite: {
      satelliteId: "mdw7w-piaaa-aaaal-ajoma-cai",
    },
  });

  return items.map((product) => ({
    product_id: product.data.product_id,
  }));
}

export default function ProductPage({
  params,
}: {
  params: { product_id: string };
}) {
  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center py-8">
      {params.product_id}
    </Container>
  );
}
