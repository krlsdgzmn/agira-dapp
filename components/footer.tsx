import Image from "next/image";

export default function Footer() {
  return (
    <footer className="top-0 z-50 w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:sticky">
      <div className="container grid h-14 max-w-screen-2xl grid-cols-2 items-center sm:grid-cols-3">
        <div className="text-lg font-bold text-farm">Agira</div>
        <div className="hidden text-center text-sm text-foreground/40 sm:block">
          &copy; 2024 All rights reserved.
        </div>
        <div className="flex justify-end">
          <Image src="/socials.svg" alt="Socials" width={184} height={24} />
        </div>
      </div>
    </footer>
  );
}
