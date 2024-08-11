#!/usr/bin/env node

import { listDocs } from "@junobuild/core-peer";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const buildProducts = async () => {
  try {
    const { items } = await listDocs({
      collection: "products",
      satellite: {
        satelliteId: "mdw7w-piaaa-aaaal-ajoma-cai",
      },
    });

    const destination = join(process.cwd(), "app", "data", "products.json");

    await writeFile(
      destination,
      JSON.stringify(
        items.map(({ data: { product_id } }) => product_id),
        null,
        2,
      ),
    );

    console.log("Products file created successfully at", destination);
  } catch (error) {
    console.error("Error building products:", error);
  }
};

await buildProducts();

