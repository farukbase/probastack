import Image from "next/image";
import { CoffeeLink } from "@/components/site/Support";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-5 py-8 text-center text-sm text-muted">
        <Image
          src="/proby/face.webp"
          alt="Proby"
          width={68}
          height={59}
          className="h-9 w-auto opacity-90"
        />
        <p className="font-medium text-foreground">
          proba<span className="text-accent">stack</span>
        </p>
        <p>Explore. Simulate. Understand.</p>
        <CoffeeLink className="mt-2" />
      </div>
    </footer>
  );
}
