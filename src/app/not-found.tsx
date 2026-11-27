import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Blobs } from "@/components/site/section";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <Blobs a="pink" b="yellow" />
      <div className="container-x grid justify-items-center gap-5 text-center">
        <p className="font-display text-[clamp(5rem,18vw,10rem)] font-bold leading-none">
          4<span className="text-green">0</span>4
        </p>
        <h1 className="text-3xl font-bold">We couldn&apos;t book that page.</h1>
        <p className="max-w-md text-muted">The link may be old or mistyped. Let&apos;s get you back on track.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="cta" size="lg">
            <Link href="/">Go to the home page</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact/">Book a demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
