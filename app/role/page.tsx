"use client";

import { AuthContext } from "@/app/providers";
import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function RolePage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (!user) router.push("/");

  return (
    <Container className="flex min-h-[85vh] items-center justify-center py-8">
      <main>
        <section className="mx-auto grid gap-8 py-4 sm:grid-cols-2 md:py-8 lg:min-w-[1024px] xl:gap-16">
          <Link
            href="/marketplace"
            className="flex min-w-[300px] flex-col justify-center overflow-hidden rounded-lg border border-border bg-gradient-to-br from-orange-500/80 to-yellow-500/80 p-8 text-white transition-all duration-300 ease-in-out hover:bg-farm/90 md:p-16"
          >
            <Image src="/consumer.svg" alt="Consumer" width={75} height={75} />
            <h1 className="pt-8 text-2xl font-bold lg:text-5xl">Consumer</h1>
            <h2 className="font-medium lg:text-2xl">Use Agira to buy goods</h2>
            <div className="pt-4 text-right text-5xl">&rarr;</div>
          </Link>

          <Link
            href="/dashboard"
            className="flex min-w-[300px] flex-col justify-center overflow-hidden rounded-lg border border-border bg-gradient-to-br from-farm/80 to-yellow-500 p-8 text-white transition-all duration-300 ease-in-out hover:bg-farm/90 md:p-16"
          >
            <Image src="/farmer.svg" alt="Consumer" width={75} height={75} />
            <h1 className="pt-8 text-2xl font-bold lg:text-5xl">Farmer</h1>
            <h2 className="font-medium lg:text-2xl">Use Agira to sell goods</h2>
            <div className="pt-4 text-right text-5xl">&rarr;</div>
          </Link>
        </section>
      </main>
    </Container>
  );
}
