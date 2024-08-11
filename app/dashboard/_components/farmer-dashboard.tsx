import Container from "@/components/container";
import { Farmer } from "@/types";
import SideBar from "./sidebar";

export default function FarmerDashboard({
  currentFarmer,
}: {
  currentFarmer: Farmer;
}) {
  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center">
      <main className="grid min-h-[85vh] w-full lg:grid-cols-7">
        <SideBar />

        <section className="col-span-6 p-6">
          <h1 className="text-xl font-bold">
            Welcome back, {currentFarmer.data.name}!
          </h1>
          <p className="mb-2 text-sm text-muted-foreground md:text-base">
            You can manage your farm profile here.
          </p>
        </section>
      </main>
    </Container>
  );
}
