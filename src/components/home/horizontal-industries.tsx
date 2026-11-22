"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IconTile } from "@/components/site/icon-tile";
import { useMotionOK } from "@/components/motion/use-motion-ok";
import { t } from "@/content/en";
import { tone } from "@/lib/tone";
import { cn } from "@/lib/utils";

/** Vertical scroll drives a sideways ride through the industries we serve. */
export function HorizontalIndustries() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const ok = useMotionOK();
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 32));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ok]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const cards = (
    <>
      {t.industries.map((i, k) => (
        <Link
          key={i.id}
          href={`/industries/#${i.id}`}
          className={cn(
            "sticker group grid w-[78vw] shrink-0 content-between gap-6 rounded-[2.25rem] p-7 transition-transform duration-300 hover:-translate-y-2 sm:w-[24rem] sm:p-9",
            tone[i.tone].tint,
            tone[i.tone].shadow,
            k % 2 ? "rotate-1" : "-rotate-1",
          )}
        >
          <div className="grid gap-4">
            <IconTile id={i.id} tone={i.tone} size="lg" className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            <h3 className="text-3xl font-bold">{i.title}</h3>
            <p className="text-muted">{i.body}</p>
          </div>
          <span className="inline-flex items-center gap-1 font-semibold">
            See how <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </>
  );

  const heading = (
    <div className="container-x mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="grid gap-3">
        <p className="eyebrow text-green-ink">Industries</p>
        <h2 className="max-w-2xl text-[clamp(2rem,4.4vw,3.25rem)] font-bold leading-[1.02]">{t.home.industriesTitle}</h2>
      </div>
      <p className="font-hand text-2xl text-muted">keep scrolling →</p>
    </div>
  );

  if (!ok) {
    return (
      <section className="py-20">
        {heading}
        <div className="container-x flex gap-5 overflow-x-auto pb-6">{cards}</div>
      </section>
    );
  }

  return (
    <section ref={section} className="relative bg-soft" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {heading}
        <m.div ref={track} style={{ x }} className="flex w-max gap-6 py-4 pl-[max(1.25rem,calc((100vw-76rem)/2+1.25rem))] pr-10">
          {cards}
          <Link
            href="/contact/"
            className="grid w-[70vw] shrink-0 place-content-center justify-items-center gap-3 rounded-[2.25rem] border-2 border-dashed border-muted/50 p-8 text-center sm:w-[20rem]"
          >
            <span className="font-hand text-4xl">and yours?</span>
            <span className="text-muted">If you take appointments, we can build your booking website.</span>
          </Link>
        </m.div>
        <div className="container-x mt-8">
          <div className="h-2 overflow-hidden rounded-full bg-line">
            <m.div style={{ width: bar }} className="h-full rounded-full bg-[linear-gradient(90deg,#12a150,#ffc928,#2ea8ff,#ff5a4e,#ff9a1f,#ff5fa2)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
