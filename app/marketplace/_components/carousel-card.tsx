import Image from "next/image";
import Link from "next/link";

export default function CarouselCard({
  id,
  product_name,
  price,
  unit,
  farm_name,
  image,
  location,
  isDiscounted,
}: {
  id: string | undefined;
  product_name?: string;
  price?: number;
  unit?: string;
  farm_name: string;
  image: string;
  location?: string;
  isDiscounted?: boolean;
}) {
  return (
    <Link href={location ? `#` : `/marketplace/products/${id}`}>
      <Image
        src={image}
        alt={farm_name}
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
        <h1 className="text-sm font-semibold">
          {product_name ? product_name : farm_name}
        </h1>
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
          {location ? location : farm_name}
        </p>
      </div>
    </Link>
  );
}
