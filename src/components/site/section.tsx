import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { t } from "@/content/en";
import { cn } from "@/lib/utils";

export function Section({ className, children, id, ...props }: React.ComponentProps<"section">) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)} {...props}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  as: H = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  // Page titles (h1) animate with CSS so they paint instantly; section titles reveal on scroll.
  const Wrap = H === "h1" ? "div" : Reveal;
  return (
    <Wrap className={cn("mb-12 grid max-w-3xl gap-4", H === "h1" && "rise", align === "center" && "mx-auto justify-items-center text-center", className)}>
      {eyebrow && <p className="eyebrow text-brand-ink">{eyebrow}</p>}
      <H
        className={cn(
          "font-bold leading-[1.02]",
          H === "h1" ? "text-[clamp(2.5rem,6vw,4.5rem)]" : "text-[clamp(2rem,4.4vw,3.25rem)]",
        )}
      >
        {title}
      </H>
      {lede && <p className="max-w-2xl text-lg text-muted sm:text-xl">{lede}</p>}
    </Wrap>
  );
}

/** Highlighted word, like a marker stroke in Sunny Yellow (or another brand colour). */
export function Mark({ children, color = "yellow" }: { children: React.ReactNode; color?: "yellow" | "blue" | "pink" | "green" }) {
  const bg = { yellow: "bg-yellow", blue: "bg-blue", pink: "bg-pink", green: "bg-green" }[color];
  return (
    <span className="relative isolate inline-block whitespace-nowrap">
      <span aria-hidden className={cn("absolute inset-x-[-0.12em] bottom-[0.06em] top-[0.18em] -z-10 -rotate-1 rounded-[0.3em]", bg)} />
      <span className={cn(color !== "yellow" && "text-pine")}>{children}</span>
    </span>
  );
}

/** Page header used on inner pages. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  blobs = ["yellow", "blue"],
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  children?: React.ReactNode;
  blobs?: [string, string];
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20">
      <Blobs a={blobs[0]} b={blobs[1]} />
      <div className="container-x">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} lede={lede} className="mb-0" />
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

export function Blobs({ a = "yellow", b = "blue" }: { a?: string; b?: string }) {
  const map: Record<string, string> = {
    yellow: "bg-yellow",
    blue: "bg-blue",
    pink: "bg-pink",
    green: "bg-green",
    orange: "bg-orange",
    red: "bg-red",
  };
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className={cn("absolute -right-24 -top-24 size-[26rem] rounded-full opacity-35 blur-3xl dark:opacity-25", map[a])} />
      <div className={cn("absolute -bottom-40 -left-32 size-[22rem] rounded-full opacity-25 blur-3xl dark:opacity-20", map[b])} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--fg)_9%,transparent)_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
    </div>
  );
}

/** The closing "Book a free demo" band that ends most pages. */
export function CtaBand({ title, body }: { title?: string; body?: string }) {
  return (
    <section className="py-8 sm:py-12">
      <div className="container-x">
        <Reveal className="relative isolate overflow-hidden rounded-[2.5rem] bg-brand-ink px-6 py-14 text-center text-white sm:px-12 sm:py-20 dark:bg-[#12306a]">
          <div aria-hidden className="absolute -left-10 -top-10 -z-10 size-48 rounded-full bg-yellow opacity-90" />
          <div aria-hidden className="absolute -bottom-16 right-10 -z-10 size-56 rounded-full bg-blue opacity-80" />
          <div aria-hidden className="absolute right-[-3rem] top-8 -z-10 size-28 rounded-[2rem] bg-pink opacity-90 rotate-12" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[rgb(0_0_0/0.18)]" />
          <h2 className="mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] text-white">
            {title ?? t.home.finalTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">{body ?? t.home.finalBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="cta" size="lg">
              <Link href="/contact/">
                {t.cta.demo} <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
