"use client";

import { AuthContext } from "@/app/providers";
import { signIn, signOut } from "@junobuild/core-peer";
import {
  LogIn,
  LogOut,
  MessageCircleMore,
  Package,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import SearchInput from "./search-input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const links = [
  { name: "Marketplace", href: "/marketplace" },
  { name: "About", href: "#" },
  { name: "Terms & Conditions", href: "#" },
  { name: "Privacy", href: "#" },
];

export default function Header() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const { toast } = useToast();

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
                  try {
                    await signIn();
                    router.push("/role");
                    toast({
                      title: "Success!",
                      description: "You have been successfully signed in.",
                    });
                  } catch (error) {
                    toast({
                      title: "Failed to sign in.",
                      description: "Please try again",
                    });
                  }
                }}
                className="flex items-center gap-1"
                variant="outline"
                title="Sign In"
              >
                Sign In
                <LogIn size={18} />
              </Button>
            </div>
          )}
          {user && (
            <div className="flex gap-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/orders")}
                title="Order Purchases"
              >
                <Package className="text-farm" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/cart")}
                title="Cart"
              >
                <ShoppingCart className="text-farm" />
              </Button>

              <Button variant="ghost" size="icon" title="Messages" disabled>
                <MessageCircleMore className="text-farm" />
              </Button>

              <Button
                onClick={async () => {
                  try {
                    await signOut();
                    router.push("/role");
                    toast({
                      title: "Success!",
                      description: "You have been successfully signed out.",
                    });
                  } catch (error) {
                    toast({
                      title: "Failed to sign out.",
                      description: "Please try again",
                    });
                  }
                }}
                variant="ghost"
                size="icon"
                title="Sign Out"
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
