"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { useMotionOK } from "./use-motion-ok";

/** Tilts and lifts its child as it travels through the screen, like a card being picked up. */
export function ScrollTilt({ children, className, flip = false }: { children: React.ReactNode; className?: string; flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const ok = useMotionOK();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [flip ? 8 : -8, 0, flip ? -4 : 4]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.86, 1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  return (
    <m.div ref={ref} style={ok ? { rotate, scale, y } : undefined} className={className}>
      {children}
    </m.div>
  );
}
