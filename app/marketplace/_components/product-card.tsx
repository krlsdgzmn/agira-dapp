import { Farmer } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  product_id,
  farmer_id,
  product_name,
  price,
  unit,
  image,
  isDiscounted,
  farmers,
}: {
  product_id: string;
  farmer_id: string;
  product_name: string;
  price: number;
  unit: string;
  image: string;
  isDiscounted?: boolean;
  farmers: Farmer[];
}) {
  const farmer = farmers.find((farmer) => farmer.data.farmer_id === farmer_id);

  return (
    <Link href={`/marketplace/products/${product_id}`}>
      <Image
        src={image}
        alt={product_id}
        className="h-[125px] w-full object-cover"
        width={200}
        height={200}
      />

      <div className="w-full border-b px-14 py-2">
        <Image
          src="/stars.png"
          alt="Ratings"
          className="w-full"
          width={100}
          height={20}
        />
      </div>

      <div className="max-h-15 p-3">
        <h1 className="text-sm font-semibold">{product_name}</h1>
        {price && (
          <h2 className="text-xs text-orange-500">
            {isDiscounted && (
              <span className="pr-2 font-light text-muted-foreground line-through">
                ₱{(price + 20).toFixed(2)}
              </span>
            )}
            ₱{price.toFixed(2)}/{unit}
          </h2>
        )}
        <p className="text-xs text-muted-foreground">
          {farmer?.data.farm_name}
        </p>
      </div>
    </Link>
  );
}
