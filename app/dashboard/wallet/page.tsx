import Container from "@/components/container";
import SideBar from "../_components/sidebar";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WalletDashboard() {
  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center">
      <main className="grid max-h-[85vh] min-h-[85vh] w-full lg:grid-cols-7">
        <SideBar />

        <section className="col-span-6 p-6">
          <h1 className="text-xl font-bold">Wallet</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Manage your wallet here.
          </p>

          <div className="mt-4 max-w-[300px] rounded-md border p-4 px-8 shadow">
            <div className="flex items-end gap-2">
              <h2 className="text-xl font-bold text-farm">$GIRA</h2>
              <p className="pb-2 text-xs text-muted-foreground">
                (1 $GIRA = ₱153.22)
              </p>
            </div>

            <h1 className="text-3xl font-bold">325.12</h1>

            <div className="flex items-center gap-2">
              <TrendingUp className="text-farm" size={14} />
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-farm">1.8%</span> from
                yesterday
              </p>
            </div>

            <Button className="mt-4 w-full bg-farm hover:bg-farm/90" size="sm">
              Withdraw $GIRA <span className="pl-4">&rarr;</span>
            </Button>
          </div>
        </section>
      </main>
    </Container>
  );
}
