import { ReactNode } from "react";

export default function KPICard({
  title,
  value,
  description,
  icon,
  isPeso,
}: {
  title: string;
  value: number;
  description: string;
  icon: ReactNode;
  isPeso?: boolean;
}) {
  return (
    <div className="col-span-3 grid grid-cols-6 rounded-md border border-border bg-card p-4 pr-0 md:col-span-1">
      <div className="col-span-4 border-r border-border pr-1.5">
        <h1 className="text-xl font-bold sm:text-2xl">
          {isPeso ? `₱${value}` : value}
        </h1>
        <h2 className="text-xs font-semibold sm:text-sm 2xl:text-base">
          {title}
        </h2>
        <p className="text-[10.5px] text-muted-foreground 2xl:text-xs">
          {description}
        </p>
      </div>
      <div className="col-span-2 flex w-full items-center justify-center">
        <div className="rounded-full border-2 border-dotted p-4">{icon}</div>
      </div>
    </div>
  );
}
