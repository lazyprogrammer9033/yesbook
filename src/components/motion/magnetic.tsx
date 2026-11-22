"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { useMotionOK } from "./use-motion-ok";

/** Gently pulls its child toward the mouse pointer. Mouse only; touch and reduced motion are untouched. */
export function Magnetic({ children, strength = 0.3, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const ok = useMotionOK();
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  function move(e: React.PointerEvent) {
    if (!ok || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function leave() {
    x.set(0);
    y.set(0);
  }
  return (
    <m.div ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ x, y }} className={className ?? "inline-block"}>
      {children}
    </m.div>
  );
}
