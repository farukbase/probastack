import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-6 text-sm text-muted sm:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/proby/face.webp"
            alt="Proby"
            width={68}
            height={59}
            className="h-9 w-auto opacity-90"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-medium text-foreground">
              proba<span className="text-accent">stack</span>
            </span>
            <span>Explore. Simulate. Understand.</span>
          </div>
        </div>
        <p className="flex items-center gap-1.5">
          Made with <span className="text-danger">❤</span> for curious minds
        </p>
      </div>
    </footer>
  );
}
