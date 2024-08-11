import Container from "@/components/container";
import React from "react";
import SideBar from "../_components/sidebar";

export default function OrdersDashboard() {
  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center">
      <main className="grid min-h-[85vh] w-full lg:grid-cols-7">
        <SideBar />

        <section className="col-span-6 p-6">
          <h1 className="text-xl font-bold"></h1>
          <p className="mb-2 text-sm text-muted-foreground md:text-base">
            You can manage your farm profile here.
          </p>
        </section>
      </main>
    </Container>
  );
}
