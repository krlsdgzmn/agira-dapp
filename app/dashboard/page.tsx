import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  return (
    <Container className="flex min-h-[85vh] flex-col items-center justify-center">
      <main className="flex max-w-56 flex-col gap-2.5">
        <h1 className="text-2xl font-bold">Under Construction</h1>
        <p className="text-sm text-muted-foreground">
          We&apos;re sorry, but the page you&apos;re trying to access is
          currently on development :(
        </p>
        <Link href="/role">
          <Button size="sm" className="w-full bg-farm hover:bg-farm/90">
            Go Back
          </Button>
        </Link>
      </main>
    </Container>
  );
}
