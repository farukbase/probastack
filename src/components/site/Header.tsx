import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2 font-semibold tracking-tight">
          <Image
            src="/proby/face.webp"
            alt="Proby, the Probastack mascot"
            width={68}
            height={59}
            priority
            className="h-8 w-auto transition group-hover:-translate-y-0.5"
          />
          <span>
            proba<span className="text-accent">stack</span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href="/#categories" className="transition hover:text-foreground">
            Categories
          </Link>
          <Link href="/#stories" className="transition hover:text-foreground">
            Stories
          </Link>
        </nav>
      </div>
    </header>
  );
}
