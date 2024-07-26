import Image from "next/image";

export default function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="mx-auto flex max-w-[400px] flex-col items-center justify-start gap-2 px-8 py-6 text-center">
      <Image
        src={icon}
        alt={title}
        className="h-[50px] w-[50px] lg:h-[75px] lg:w-[75px]"
        width={100}
        height={100}
      />
      <h1 className="pt-2 font-bold md:text-lg lg:text-2xl">{title}</h1>
      <p className="text-sm lg:text-base">{description}</p>
    </div>
  );
}
