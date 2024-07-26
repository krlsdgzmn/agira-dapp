"use client";

import Container from "@/components/container";
import Confetti, { ConfettiRef } from "@/components/magicui/confetti";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function OrderPlacedPage() {
  const confettiRef = useRef<ConfettiRef>(null);
  const end = Date.now() + 3 * 1000; // 3 seconds
  const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
  const router = useRouter();

  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center py-8">
      <main className="flex flex-col items-center justify-center text-center">
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-10 size-full w-full border"
          onMouseEnter={() => {
            if (Date.now() > end) return;

            confetti({
              particleCount: 2,
              angle: 60,
              spread: 55,
              startVelocity: 60,
              origin: { x: 0, y: 0.5 },
              colors: colors,
            });
            confetti({
              particleCount: 2,
              angle: 120,
              spread: 55,
              startVelocity: 60,
              origin: { x: 1, y: 0.5 },
              colors: colors,
            });
            confettiRef.current?.fire({});
          }}
        />

        <CheckCircle2
          size={72}
          className="rounded-full from-farm/90 to-yellow-500/90 text-white backdrop-blur supports-[backdrop-filter]:bg-gradient-to-br"
        />

        <h1 className="py-2 text-2xl font-bold md:py-4 md:text-3xl">
          Your <span className="text-farm">order request</span> has been <br />
          succesfully placed!
        </h1>

        <p className="pb-4 font-medium text-muted-foreground">
          We&apos;ll be in touch shortly to confirm.
        </p>

        <Button
          className="z-20 w-full max-w-[80%]"
          onClick={() => router.push("/orders")}
        >
          Go to Orders
        </Button>
      </main>
    </Container>
  );
}
