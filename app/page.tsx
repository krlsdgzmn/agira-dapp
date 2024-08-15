"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "@junobuild/core-peer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import FarmCard from "./_components/farm-card";
import FeatureCard from "./_components/feature-card";
import RoadmapSection from "./_components/roadmap-section";
import { AuthContext } from "./providers";

export default function HomePage() {
  const router = useRouter();
  const { toast } = useToast();

  const { user } = useContext(AuthContext);
  if (user) router.push("/role");

  return (
    <Container className="overflow-hidden">
      {/* Hero Section */}
      <section className="grid justify-center pt-6 text-center md:grid-cols-2 md:justify-start md:text-left xl:px-10">
        <div className="mx-auto flex flex-col md:justify-end md:pb-16 lg:justify-center lg:pt-16">
          <Image
            src="/logo.svg"
            alt="Agira Logo"
            className="hidden aspect-square h-20 w-20 lg:block lg:h-[100px] lg:w-[100px]"
            width={100}
            height={100}
          />

          <h1 className="pt-8 text-5xl font-bold sm:max-w-[450px] md:text-5xl xl:max-w-[800px] xl:text-7xl">
            Nature&apos;s fresh right at your doorstep.
          </h1>

          <p className="py-6 text-base font-medium text-muted-foreground sm:max-w-[450px] sm:text-lg lg:max-w-max lg:text-xl">
            Discover the freshest picks of the day, straight from our local
            farms. Don&apos;t miss out on seasonal favorites and specialty
            items!
          </p>

          <div className="flex justify-center gap-2 md:justify-start">
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
              className="flex animate-buttonheartbeat items-center gap-1 bg-farm pl-6 pr-8 text-base text-white hover:bg-farm/80 xl:py-6 xl:text-xl"
            >
              <Image
                src="/icp.png"
                alt="ICP"
                className="h-10 w-10"
                width={10}
                height={10}
              />
              Get Started with ICP
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-4 text-base text-farm hover:text-farm xl:py-6"
                >
                  <Image
                    src="/play.svg"
                    alt="Play"
                    width={15}
                    height={15}
                    priority
                  />
                  <span className="pl-4">Watch Video</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="flex justify-center overflow-hidden rounded-2xl border-white/10 bg-transparent p-0 text-white backdrop-blur sm:min-h-[450px] sm:min-w-[720px] xl:min-h-[650] xl:min-w-[1080px]">
                <iframe
                  src="https://drive.google.com/file/d/1Os4k1JXVrFNdYu59lcHFIarooiPegJwv/preview"
                  height="650"
                  className="h-[200px] w-full sm:h-[450px] xl:h-[650px]"
                  title="AGIRA Promotional Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-end justify-center md:justify-end">
          <Image
            src="/jeo.png"
            alt="Jeo the Farmer"
            width={553}
            height={616}
            quality={100}
            unoptimized
            priority
          />
        </div>
      </section>

      <section className="relative grid min-h-[300px] rounded-t-3xl py-8 md:grid-cols-3 md:py-16">
        <div className="absolute left-[-2rem] top-0 -z-10 h-full w-[1536px] bg-gradient-to-b from-slate-200/70 to-white" />
        <FeatureCard
          title="Local Farms Guaranteed"
          description="Support our local farmers, fresh goods come from your local community!"
          icon="/red-icon.svg"
        />

        <FeatureCard
          title="100% Fresh Everyday"
          description="Enjoy the freshest produce available now. Our seasonal selection ensures you get the best taste and nutritional value."
          icon="/yellow-icon.svg"
        />

        <FeatureCard
          title="Grab Amazing Deals"
          description="Check out our current promotions and save on your favorite fruits and vegetables."
          icon="/green-icon.svg"
        />
      </section>

      <section className="mx-auto min-h-[300px] max-w-screen-xl pb-20">
        <div className="flex flex-col px-2 text-center md:flex-row md:items-end md:justify-between">
          <h1 className="text-2xl font-bold md:text-left">Trusted Farms</h1>
          <Link
            href="/marketplace"
            className="font-medium text-farm hover:underline"
          >
            View all farms &rarr;
          </Link>
        </div>

        <div className="grid justify-center gap-4 pt-2 md:grid-cols-3 xl:gap-8 xl:pt-4">
          <FarmCard
            title="Kamalig Farm"
            location="Tarlac"
            image="/farm-1.png"
          />
          <FarmCard title="Haven Farm" location="Bulacan" image="/farm-2.png" />
          <FarmCard
            title="Westija Farm"
            location="Nueva Ecija"
            image="/farm-3.png"
          />
        </div>
      </section>

      {/* Roadmap Section */}
      <RoadmapSection />

      {/* SDG Section */}
      <section className="grid px-8 py-[5rem] lg:grid-cols-2 xl:py-[8rem]">
        <div className="relative">
          <Image
            src="/sdg-1-bg.png"
            alt="Agira Platform"
            className="absolute left-[-15rem] top-32 -z-10 hidden scale-150 lg:left-[-20rem] lg:block xl:top-24"
            height={1698}
            width={1462}
            quality={100}
            unoptimized
            priority
          />
        </div>

        <div>
          <h1 className="pb-2 font-medium text-orange-500">
            Social Development Goals
          </h1>
          <h2 className="text-3xl font-bold md:text-5xl">
            Shaping the world, one goal at a time.
          </h2>
          <p className="pb-8 pt-4 text-sm text-muted-foreground xl:pb-16 xl:text-base">
            Through innovation, transparency, and community empowerment, we aim
            to create a resilient and sustainable food system that benefits both
            producers and consumers.
          </p>

          <div className="grid gap-8 md:grid-cols-2 xl:gap-16">
            <div className="text-sm xl:text-base">
              <Image src="/sdg2.png" alt="SDG 2" width={48} height={48} />
              <h1 className="py-2 text-lg font-bold lg:text-xl">
                SDG 2: <br /> Zero Hunger
              </h1>
              <p className="text-muted-foreground">
                Agira supports sustainable agricultural practices to improve
                food production and distribution, increasing food security and
                helping eradicate hunger.
              </p>
            </div>

            <div className="text-sm xl:text-base">
              <Image src="/sdg8.png" alt="SDG 8" width={48} height={48} />
              <h1 className="py-2 text-lg font-bold lg:text-xl">
                SDG 8: Decent Work and Economic Growth
              </h1>
              <p className="text-muted-foreground">
                Agira promotes inclusive and sustainable economic growth by
                facilitating access to financial resources and new market
                opportunities for farmers.
              </p>
            </div>

            <div className="text-sm xl:text-base">
              <Image src="/sdg12.png" alt="SDG 2" width={48} height={48} />
              <h1 className="py-2 text-lg font-bold lg:text-xl">
                SDG 12: Responsible Consumption and Production
              </h1>
              <p className="text-muted-foreground">
                Agira fosters a sustainable and transparent food production
                system by promoting sustainable farming practices and supply
                chain transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex h-[400px] items-center px-8 lg:h-[700px]">
        <div className="absolute left-[-2rem] top-0 -z-10 h-full w-[1536px] bg-gradient-to-br from-white from-40% to-farm/50" />
        <div className="to-muted-foreground/10 lg:max-w-[40%]">
          <h1 className="text-3xl font-bold lg:text-5xl">
            Maximize your produce today
          </h1>
          <p className="pb-8 pt-4 text-sm xl:text-base">
            Maximize your farm&apos;s potential by partnering with Agira! Gain
            access to a wider market, receive timely financial support through
            microloans, and benefit from our comprehensive resources and tools.
          </p>
          <Link
            href="#"
            className="text-lg font-bold text-farm hover:underline"
          >
            Sign up &rarr;
          </Link>
        </div>

        <Image
          src="/bottom-bg.png"
          alt="Agira Platform"
          className="absolute right-[-22rem] top-[-1rem] hidden scale-75 lg:right-[-25rem] lg:block xl:right-[-30rem] xl:top-[-10rem]"
          height={1568}
          width={1797}
          quality={100}
          unoptimized
          priority
        />
      </section>
    </Container>
  );
}
