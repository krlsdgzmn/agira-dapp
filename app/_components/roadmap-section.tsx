import React from "react";
import Image from "next/image";

export default function RoadmapSection() {
  return (
    <section className="px-8 md:pb-20 xl:pb-32">
      <div className="relative mx-auto w-fit">
        <h1 className="mx-auto w-fit bg-gradient-to-r from-farm to-yellow-400 bg-clip-text py-2 text-3xl font-bold text-transparent md:text-5xl">
          The Future&apos;s Bright
        </h1>
        <p className="text-center font-medium text-muted-foreground md:text-lg">
          Take a peek on how Agira will evolve throughout its development.
        </p>
      </div>

      <div className="grid pt-8 md:pt-16 lg:grid-cols-2">
        <div className="grid gap-8 md:grid-cols-2 xl:gap-16">
          <div className="text-sm xl:text-base">
            <Image src="/q2-icon.svg" alt="Q2" width={48} height={48} />
            <h1 className="py-2 text-lg font-bold lg:text-xl">Q2 2024</h1>
            <p className="text-muted-foreground">
              In June 2024, Agira established the platform&apos;s{" "}
              <span className="font-semibold">core online backbone</span> and
              launched initiatives for decentralized financing, tokenization,
              and accessibility. <br /> <br /> Comprehensive{" "}
              <span className="font-semibold">partnership propositions</span>{" "}
              were also introduced to enhance user engagement.
            </p>
          </div>

          <div className="text-sm xl:text-base">
            <Image src="/q3-icon.svg" alt="Q3" width={48} height={48} />
            <h1 className="py-2 text-lg font-bold lg:text-xl">Q3 2024</h1>
            <p className="text-muted-foreground">
              From July to December 2024, Agira will conduct a{" "}
              <span className="font-semibold">pilot launch</span> to gather user
              data and feedback, onboarding initial producers and consumers.{" "}
              <br /> <br /> <span className="font-semibold">Partnerships</span>{" "}
              with local agricultural organizations and{" "}
              <span className="font-semibold">sponsorships</span> from
              cooperative associations and governmental institutions will be
              established.
            </p>
          </div>

          <div className="text-sm xl:text-base">
            <Image src="/q4-icon.svg" alt="Q4" width={48} height={48} />
            <h1 className="py-2 text-lg font-bold lg:text-xl">Q4 2024</h1>
            <p className="text-muted-foreground">
              The introduction of <span className="font-semibold">$GIRA</span>
              will include the Agira Wallet,{" "}
              <span className="font-semibold">Web3.0</span> decentralization,
              smart contracts, and financial tools like microloan options and
              grant applications.
            </p>
          </div>

          <div className="text-sm xl:text-base">
            <Image src="/2025-icon.svg" alt="Q4" width={48} height={48} />
            <h1 className="py-2 text-lg font-bold lg:text-xl">
              2025 and Beyond
            </h1>
            <p className="text-muted-foreground">
              Starting in 2025, Agira will integrate AI for{" "}
              <span className="font-semibold">predictive analytics</span> ,
              supply chain optimization, blockchain-based traceability, and
              automated financial advising.
            </p>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/map-1-bg.png"
            alt="Agira Platform"
            className="absolute right-[-17rem] top-5 -z-10 hidden scale-150 lg:block"
            height={1568}
            width={1797}
            quality={100}
            unoptimized
            priority
          />
        </div>
      </div>
    </section>
  );
}
