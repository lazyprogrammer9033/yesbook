"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMotionOK } from "@/components/motion/use-motion-ok";
import { t } from "@/content/en";
import { cn } from "@/lib/utils";

const colors = ["bg-yellow", "bg-blue", "bg-green"];

/** "How it works": a dashed road draws itself as you scroll and each step pops onto it. */
export function StepsPath() {
  const ref = useRef<HTMLDivElement>(null);
  const ok = useMotionOK();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const draw = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  return (
    <div ref={ref} className="relative">
      <svg aria-hidden viewBox="0 0 1000 300" preserveAspectRatio="none" className="absolute inset-x-0 top-6 hidden h-[18rem] w-full md:block">
        <path d="M60 60 C 260 60, 260 240, 500 200 S 760 40, 940 120" fill="none" stroke="var(--line)" strokeWidth="10" strokeLinecap="round" />
        <m.path
          d="M60 60 C 260 60, 260 240, 500 200 S 760 40, 940 120"
          fill="none"
          stroke="url(#stepsGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          style={ok ? { pathLength: draw } : undefined}
        />
        <defs>
          <linearGradient id="stepsGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#ffc928" />
            <stop offset=".5" stopColor="#2ea8ff" />
            <stop offset="1" stopColor="#12a150" />
          </linearGradient>
        </defs>
      </svg>
      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
        {t.home.steps.map((s, i) => (
          <Step key={s.title} i={i} title={s.title} body={s.body} progress={scrollYProgress} ok={ok} />
        ))}
      </ol>
    </div>
  );
}

function Step({ i, title, body, progress, ok }: { i: number; title: string; body: string; progress: MotionValue<number>; ok: boolean }) {
  const start = i * 0.28;
  const scale = useTransform(progress, [start, start + 0.15], [0.4, 1]);
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  const rotate = useTransform(progress, [start, start + 0.15], [-30, i % 2 ? 6 : -6]);
  const offset = ["md:mt-0", "md:mt-40", "md:mt-14"][i];
  return (
    <li className={cn("grid justify-items-center gap-4 text-center", offset)}>
      <m.span
        style={ok ? { scale, opacity, rotate } : undefined}
        className={cn("grid size-24 place-items-center rounded-[2rem] border-2 border-ink font-display text-4xl font-bold text-pine shadow-[5px_5px_0_var(--ink)]", colors[i])}
      >
        {i + 1}
      </m.span>
      <m.div style={ok ? { opacity } : undefined} className="grid gap-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mx-auto max-w-xs text-muted">{body}</p>
      </m.div>
    </li>
  );
}
