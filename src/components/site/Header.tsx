import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-sm text-white">
            P
          </span>
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
