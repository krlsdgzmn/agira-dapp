"use client";

import { AuthContext } from "@/app/providers";
import { initSatellite, signIn, signOut } from "@junobuild/core-peer";
import { Bell, LogOut, MessageCircleMore, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import SearchInput from "./search-input";
import { Button } from "./ui/button";

const links = [
  { name: "Marketplace", href: "/marketplace" },
  { name: "About", href: "#" },
  { name: "Terms & Conditions", href: "#" },
  { name: "Privacy", href: "#" },
];

export default function Header() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    (async () =>
      await initSatellite({
        workers: {
          auth: true,
        },
      }))();
  }, []);

  return (
    <header className="top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 md:sticky">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center justify-center gap-3">
            <Image
              src="/logo.svg"
              alt="Logo"
              className="h-10 w-10"
              width={10}
              height={10}
            />
            <h1 className="text-lg font-bold text-farm">Agira</h1>
          </Link>
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className="hidden text-sm text-muted-foreground hover:text-black lg:block"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SearchInput />
          {!user && (
            <div className="flex items-center gap-2">
              <Button
                onClick={async () => {
                  await signIn();
                  router.push("/role");
                }}
                variant="outline"
              >
                Sign In
              </Button>
            </div>
          )}
          {user && (
            <div className="flex gap-0">
              <Button variant="ghost" size="icon" disabled>
                <Bell className="text-farm" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="text-farm" />
              </Button>

              <Button variant="ghost" size="icon" disabled>
                <MessageCircleMore className="text-farm" />
              </Button>

              <Button
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
                variant="ghost"
                size="icon"
              >
                <LogOut className="text-farm" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
