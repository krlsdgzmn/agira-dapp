import Image from "next/image";
import Link from "next/link";

export default function FarmCard({
  title,
  location,
  image,
}: {
  title: string;
  location: string;
  image: string;
}) {
  return (
    <Link
      href="#"
      className="mx-auto overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all duration-300 ease-in-out hover:scale-105 xl:min-w-[415px] xl:shadow-lg"
    >
      <Image
        src={image}
        alt={title}
        className="w-full"
        width={400}
        height={300}
      />
      <div className="flex flex-col justify-center p-3.5 xl:py-7">
        <h1 className="text-sm font-bold xl:text-xl">{title}</h1>
        <p className="text-sm text-muted-foreground xl:text-base">{location}</p>
      </div>
    </Link>
  );
}
