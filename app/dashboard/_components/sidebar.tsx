"use client";

import {
  LayoutDashboard,
  ScrollText,
  ShoppingBasket,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    path: "/dashboard",
    icon: <LayoutDashboard />,
    name: "Dashboard",
  },
  {
    path: "/dashboard/products",
    icon: <ShoppingBasket />,
    name: "Products",
  },
  {
    path: "/dashboard/orders",
    icon: <ScrollText />,
    name: "Orders",
  },
  {
    path: "/dashboard/wallet",
    icon: <Wallet />,
    name: "Wallet",
  },
];

export default function SideBar() {
  const currentPath = usePathname();

  return (
    <aside className="col-span-1 flex flex-col items-start justify-start gap-4 border-r py-4 pr-8 text-sm">
      {links.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`${item.path === currentPath && "bg-farm text-white"} flex w-full items-center gap-3 rounded px-4 py-2 font-medium`}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </aside>
  );
}
