"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMotionOK } from "./use-motion-ok";
import { cn } from "@/lib/utils";

/**
 * A big statement whose words light up one by one as you scroll.
 * Words wrapped in *asterisks* get a coloured highlight.
 */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const ok = useMotionOK();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={cn("flex flex-wrap gap-x-[0.28em] gap-y-1", className)}>
      {words.map((w, i) => {
        const hl = w.startsWith("*");
        const clean = w.replaceAll("*", "");
        return ok ? (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} hl={hl}>
            {clean}
          </Word>
        ) : (
          <span key={i} className={cn(hl && "text-green-ink")}>{clean}</span>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range, hl }: { children: string; progress: MotionValue<number>; range: [number, number]; hl: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <m.span style={{ opacity, y }} className={cn("inline-block", hl && "rounded-xl bg-yellow px-2 text-pine")}>
      {children}
    </m.span>
  );
}
