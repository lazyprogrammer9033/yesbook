"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { demoScenes } from "@/components/demos/feature-demos";
import { IconTile } from "@/components/site/icon-tile";
import { useMotionOK } from "@/components/motion/use-motion-ok";
import { cn } from "@/lib/utils";
import type { Tone } from "@/content/en";

const chapters: { id: string; tone: Tone; time: string; title: string; body: string; tint: string }[] = [
  { id: "online-booking", tone: "green", time: "11:04 PM", title: "A client books from bed.", body: "Your salon is closed, but your app isn't. Sara picks a balayage with Priya and gets an instant confirmation.", tint: "bg-tint-green" },
  { id: "in-store-booking", tone: "blue", time: "10:15 AM", title: "A walk-in? Tap, booked.", body: "The front desk sees every chair at a glance and slots a walk-in between appointments in two taps.", tint: "bg-tint-blue" },
  { id: "ai-agent", tone: "red", time: "1:32 PM", title: "The phone rings. You're mid-cut.", body: "The AI receptionist answers, checks the calendar and books the caller. You never break your flow.", tint: "bg-tint-red" },
  { id: "reminders", tone: "yellow", time: "9:00 AM", title: "A friendly nudge, no no-show.", body: "The day before, clients get a text. One tap confirms. Empty chairs become a thing of the past.", tint: "bg-tint-yellow" },
];

/** Pinned scroll story: the phone stays put while a day in the salon plays out chapter by chapter. */
export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const ok = useMotionOK();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(chapters.length - 1, Math.floor(v * chapters.length));
    if (i !== active) setActive(i);
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  if (!ok) return <StaticStory />;

  const c = chapters[active];
  const Scene = demoScenes[c.id].el;
  return (
    <section ref={ref} aria-label="A day with Yesbook" className="relative" style={{ height: `${chapters.length * 90 + 40}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* colour wash that changes with each chapter */}
        {chapters.map((ch, i) => (
          <m.div
            key={ch.id}
            aria-hidden
            className={cn("absolute inset-0 -z-10", ch.tint)}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
        ))}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--fg)_10%,transparent)_1px,transparent_0)] [background-size:22px_22px]" />

        <div className="container-x grid items-center gap-4 pt-14 md:grid-cols-[1fr_auto] md:gap-16 md:pt-0">
          <div className="grid gap-4 md:gap-6">
            <p className="eyebrow text-green-ink">A day with Yesbook</p>
            <div className="relative min-h-[10.5rem] sm:min-h-[13rem]">
              <AnimatePresence mode="wait">
                <m.div
                  key={c.id}
                  initial={{ opacity: 0, y: 40, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -40, rotate: 2 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-3"
                >
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-surface px-3 py-1 font-display text-sm font-bold shadow-soft">
                    <IconTile id={c.id} tone={c.tone} size="sm" className="size-7 rounded-full [&_svg]:size-4" /> {c.time}
                  </span>
                  <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-bold leading-[1]">{c.title}</h2>
                  <p className="max-w-md text-[15px] text-muted sm:text-lg">{c.body}</p>
                </m.div>
              </AnimatePresence>
            </div>
            {/* progress rail */}
            <ol className="flex gap-2" aria-label="Story progress">
              {chapters.map((ch, i) => (
                <li key={ch.id} className="h-2 w-12 overflow-hidden rounded-full bg-surface">
                  <m.span
                    className={cn("block h-full rounded-full", ["bg-green", "bg-blue", "bg-red", "bg-yellow"][i])}
                    animate={{ width: i <= active ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="sr-only">{ch.title}</span>
                </li>
              ))}
            </ol>
          </div>

          <m.div style={{ rotate, y }} className="relative mx-auto w-[13.5rem] sm:w-[17.5rem]">
            <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-surface/60 blur-2xl" />
            <div className="rounded-[2.6rem] border-[3px] border-ink bg-surface p-2.5 shadow-[10px_10px_0_var(--ink)]">
              <div aria-hidden className="mx-auto mb-2 mt-1 h-5 w-24 rounded-full bg-ink" />
              <div className="h-[16.5rem] overflow-hidden rounded-[1.8rem] sm:h-[25rem]" aria-hidden>
                <AnimatePresence mode="wait">
                  <m.div
                    key={c.id}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Scene />
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
            <p className="sr-only">{demoScenes[c.id].label}</p>
          </m.div>
        </div>
      </div>
    </section>
  );
}

/** Reduced-motion version: the same story as simple cards. */
function StaticStory() {
  return (
    <section aria-label="A day with Yesbook" className="py-20">
      <div className="container-x grid gap-5 md:grid-cols-2">
        {chapters.map((c) => (
          <article key={c.id} className={cn("grid gap-3 rounded-[2rem] p-7", c.tint)}>
            <span className="inline-flex w-fit items-center gap-2 font-display font-bold">
              <IconTile id={c.id} tone={c.tone} size="sm" /> {c.time}
            </span>
            <h2 className="text-3xl font-bold">{c.title}</h2>
            <p className="text-muted">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
