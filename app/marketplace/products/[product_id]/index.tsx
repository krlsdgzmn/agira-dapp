"use client";

import { useEffect, useState } from "react";
import { Product, ProductData } from "@/types";
import { getDoc } from "@junobuild/core-peer";

export default function ProductItem({
  params,
}: {
  params: { product_id: string };
}) {const [product, setProduct] = useState<Product | undefined>(undefined);

  // TODO: here I hardcoded the satellite ID to fetch the document regardless if the Juno library is loaded or not.
  // Currently this useEffect is run at runtime before initSatellite is performed
  // Therefore, without this workaround it throws "No satellite ID defined. Did you initialize Juno?"
  // This can remains as it but, another way to solve it would be to run this effect only once initSatellite has been executed
  useEffect(() => {
    (async () => {
      const doc = await getDoc<ProductData>({
        collection: "products",
        key: params.product_id,
        satellite: {
          satelliteId: "mdw7w-piaaa-aaaal-ajoma-cai",
        },
      });

      setProduct(doc);
    })();
  }, [])

  return <>
    <p>{params.product_id}</p>

    <p>{product !== undefined && product.data.product_name}</p>
  </>
}