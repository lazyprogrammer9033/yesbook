"use client";

import { useRef } from "react";
import { m, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from "framer-motion";
import { useMotionOK } from "@/components/motion/use-motion-ok";

/** A ribbon of words that drifts on its own and speeds up (and flips direction) with your scrolling. */
export function VelocityMarquee({ items, baseVelocity = -2, className }: { items: string[]; baseVelocity?: number; className?: string }) {
  const ok = useMotionOK();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (!ok) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const row = items.map((w, i) => (
    <span key={i} className="flex items-center gap-6 pr-6">
      {w}
      <span aria-hidden className={["text-yellow", "text-blue", "text-pink", "text-green", "text-orange", "text-red"][i % 6]}>
        ✦
      </span>
    </span>
  ));
  return (
    <div className={className}>
      <p className="sr-only">{items.join(", ")}</p>
      <div className="overflow-hidden whitespace-nowrap" aria-hidden>
        <m.div style={{ x }} className="flex w-max">
          <div className="flex">{row}</div>
          <div className="flex">{row}</div>
        </m.div>
      </div>
    </div>
  );
}
