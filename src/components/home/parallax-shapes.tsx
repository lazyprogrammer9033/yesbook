"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useMotionOK } from "@/components/motion/use-motion-ok";

/** Playful shapes behind the hero that drift at different speeds as you scroll. */
export function ParallaxShapes() {
  const ok = useMotionOK();
  const { scrollY } = useScroll();
  const a = useTransform(scrollY, [0, 800], [0, -220]);
  const b = useTransform(scrollY, [0, 800], [0, 160]);
  const c = useTransform(scrollY, [0, 800], [0, -90]);
  const r = useTransform(scrollY, [0, 800], [0, 120]);
  const s = (v: object) => (ok ? v : undefined);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <m.div style={s({ y: a, rotate: r })} className="absolute -right-10 top-10 size-40 rounded-[2.5rem] bg-blue/70 sm:size-56" />
      <m.div style={s({ y: b })} className="absolute -left-16 top-[60%] size-44 rounded-full bg-pink/60" />
      <m.div style={s({ y: c, rotate: r })} className="absolute left-[38%] top-4 size-16 rounded-2xl bg-green/70" />
      <m.div style={s({ y: b })} className="absolute right-[30%] top-[75%] size-10 rounded-full bg-orange" />
      <m.svg style={s({ y: a, rotate: r })} viewBox="0 0 100 100" className="absolute left-[8%] top-[14%] size-14 text-yellow">
        <path d="M50 5 L61 39 L95 39 L67 60 L78 95 L50 73 L22 95 L33 60 L5 39 L39 39 Z" fill="currentColor" />
      </m.svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--fg)_9%,transparent)_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="absolute -right-32 -top-32 size-[30rem] rounded-full bg-yellow opacity-40 blur-3xl dark:opacity-20" />
    </div>
  );
}
