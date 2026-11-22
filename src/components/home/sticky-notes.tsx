"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { Hand } from "lucide-react";
import { IconTile } from "@/components/site/icon-tile";
import { useMotionOK } from "@/components/motion/use-motion-ok";
import { t, type Tone } from "@/content/en";
import { cn } from "@/lib/utils";

// Fixed (not random) so the static HTML and the browser agree.
const layout = [
  { rot: -4, from: { x: -160, y: 120, r: -24 } },
  { rot: 3, from: { x: 80, y: 180, r: 18 } },
  { rot: -2, from: { x: -60, y: 220, r: -12 } },
  { rot: 5, from: { x: 160, y: 140, r: 26 } },
  { rot: 2, from: { x: -140, y: 160, r: 20 } },
  { rot: -5, from: { x: 120, y: 200, r: -22 } },
  { rot: 4, from: { x: -80, y: 240, r: 14 } },
  { rot: -3, from: { x: 150, y: 170, r: -18 } },
];

const paper: Record<Tone, string> = {
  green: "bg-[#c9f2d9] dark:bg-[#1f6b45]",
  yellow: "bg-[#ffe98a] dark:bg-[#7a6413]",
  blue: "bg-[#c7e7ff] dark:bg-[#1d5a8c]",
  red: "bg-[#ffd0cb] dark:bg-[#8a2f2a]",
  orange: "bg-[#ffdcb0] dark:bg-[#8a531a]",
  pink: "bg-[#ffd1e6] dark:bg-[#8a2d5a]",
  brand: "bg-[#c9f2d9] dark:bg-[#1f6b45]",
};
const tape = ["bg-yellow/70", "bg-blue/60", "bg-pink/60", "bg-green/60"];

/**
 * Features as a wall of sticky notes. Each note flies onto the wall as it scrolls into view,
 * tilted like a real note, and can be dragged around just for fun.
 */
export function StickyNotesWall() {
  const constraints = useRef<HTMLDivElement>(null);
  return (
    <div ref={constraints} className="relative">
      <p className="mb-6 flex items-center gap-2 font-hand text-2xl text-muted">
        <Hand aria-hidden className="size-5 -rotate-12" /> psst… you can drag the notes around
      </p>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
        {t.features.map((f, i) => (
          <Note key={f.id} i={i} id={f.id} tone={f.tone} title={f.title.replace(" (optional)", "")} body={f.short} constraints={constraints} />
        ))}
      </ul>
    </div>
  );
}

function Note({
  i,
  id,
  tone,
  title,
  body,
  constraints,
}: {
  i: number;
  id: string;
  tone: Tone;
  title: string;
  body: string;
  constraints: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const ok = useMotionOK();
  const l = layout[i % layout.length];
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 55%"] });
  const x = useTransform(scrollYProgress, [0, 1], [l.from.x, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [l.from.y, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [l.from.r, l.rot]);
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [0.7, 1.06, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <li ref={ref} className="relative">
      <m.div style={ok ? { x, y, rotate, scale, opacity } : { rotate: l.rot }}>
        <m.div
          drag={ok}
          dragConstraints={constraints}
          dragElastic={0.15}
          whileHover={ok ? { scale: 1.04, rotate: 0, zIndex: 20 } : undefined}
          whileDrag={{ scale: 1.08, zIndex: 30, boxShadow: "0 30px 50px -20px rgb(0 0 0 / 0.45)" }}
          className={cn(
            "relative grid aspect-square cursor-grab touch-pan-y content-start gap-2 rounded-sm p-4 pt-7 shadow-[0_18px_30px_-18px_rgb(0_0_0/0.45),0_2px_0_rgb(0_0_0/0.06)] active:cursor-grabbing sm:p-5 sm:pt-8",
            paper[tone],
          )}
        >
          <span aria-hidden className={cn("absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-3deg] rounded-[2px] shadow-sm backdrop-blur-[1px]", tape[i % tape.length])} />
          <span aria-hidden className="absolute bottom-0 right-0 size-6 bg-[linear-gradient(135deg,transparent_50%,rgb(0_0_0/0.1)_50%)]" />
          <IconTile id={id} tone={tone} size="sm" />
          <h3 className="font-hand text-[1.7rem] leading-[1] font-bold text-fg sm:text-[2rem]">{title}</h3>
          <p className="text-[13px] leading-snug text-fg/80 sm:text-sm">{body}</p>
        </m.div>
      </m.div>
    </li>
  );
}
