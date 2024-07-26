import Container from "@/components/container";
import MarketplaceSection from "./_components/whole-sale-section";
import Image from "next/image";
import { products, farms } from "@/lib/dummy-data";

export default function MarketplacePage() {
  return (
    <Container>
      <main className="py-8">
        {/* Banners */}
        <section className="grid gap-4 xl:grid-cols-5">
          <div className="relative overflow-hidden border xl:col-span-3 xl:row-span-2 xl:h-72">
            <Image
              src="/agira-marketplace.png"
              alt="Agira Marketplace"
              className="h-full max-h-36 w-full sm:max-h-72"
              width={300}
              height={800}
              quality={100}
              unoptimized
              priority
            />

            <div className="absolute inset-0 flex max-w-[750px] items-center justify-start px-8">
              <Image
                src="/logo.svg"
                alt="Logo"
                className="h-16 w-16 sm:h-32 sm:w-32"
                width={128}
                height={128}
                quality={100}
                unoptimized
                priority
              />

              <h1 className="pl-4 text-xl font-extrabold text-white sm:pl-8 sm:text-4xl md:text-5xl">
                AGIRA MARKETPLACE
              </h1>
            </div>
          </div>

          <div className="hidden max-h-[8.5rem] overflow-hidden border xl:col-span-2 xl:block">
            <Image
              src="/agira-marketplace.png"
              alt="Agira Marketplace"
              className="w-full object-cover"
              width={300}
              height={800}
              quality={100}
              unoptimized
              priority
            />
          </div>

          <div className="hidden max-h-[8.5rem] overflow-hidden border xl:col-span-2 xl:block">
            <Image
              src="/agira-marketplace.png"
              alt="Agira Marketplace"
              className="w-full object-cover"
              width={300}
              height={800}
              quality={100}
              unoptimized
              priority
            />
          </div>
        </section>

        {/* Whole Sale Section */}
        <MarketplaceSection
          title="Whole Sale"
          description="Discover the Best Deals on Bulk Purchases"
          delayCount={4000}
          carousels={products}
        />

        {/* Amazing Deals Section */}
        <MarketplaceSection
          title="Amazing Deals"
          description="Unbeatable Prices on Top-Quality Products"
          delayCount={7000}
          carousels={products}
          isDiscounted
        />

        {/* Farms Near You */}
        <MarketplaceSection
          title="Farms Near You"
          description="Fresh, Local, and Sustainable"
          delayCount={5000}
          carousels={farms}
        />
      </main>
    </Container>
  );
}
