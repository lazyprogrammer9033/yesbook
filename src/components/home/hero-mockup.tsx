"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { BellRing, CalendarCheck, Check, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const slots = [
  { time: "9:30", name: "Cut & style", who: "Jess · with Priya", tone: "bg-tint-pink", badge: "Booked", badgeTone: "bg-pink" },
  { time: "10:30", name: "Balayage", who: "Sara · with Priya", tone: "bg-tint-green", badge: "Booked", badgeTone: "bg-green" },
  { time: "11:45", name: "Beard trim", who: "Dev · with Marco", tone: "bg-tint-red", badge: "Online", badgeTone: "bg-red" },
  { time: "1:00", name: "Gel nails", who: "Maya · with Ana", tone: "bg-tint-blue", badge: "Walk-in", badgeTone: "bg-blue" },
];

/** Animated phone mockup for the home hero. Builds up a booked-out day, then loops. */
export function HeroMockup() {
  const reduce = useReducedMotion();
  const [n, setN] = useState(1);
  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => setN(slots.length), 0);
      return () => clearTimeout(t);
    }
    const id = setInterval(() => setN((v) => (v >= slots.length + 2 ? 1 : v + 1)), 1300);
    return () => clearInterval(id);
  }, [reduce]);
  const shown = Math.min(n, slots.length);

  return (
    <div
      role="img"
      aria-label="Animated preview of a Yesbook salon booking website: a day of appointments fills up from online bookings and walk-ins, and reminders are sent."
      className="relative mx-auto w-full max-w-[30rem] py-6"
    >
      <div aria-hidden>
        {/* soft colour shapes behind the phone */}
        <div className="absolute left-1/2 top-1/2 -z-10 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow/70 blur-[2px] dark:bg-yellow/30" />
        <div className="absolute right-0 top-4 -z-10 size-24 rotate-12 rounded-[1.75rem] bg-blue/80 motion-safe:animate-[float-y_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-10 left-0 -z-10 size-16 rounded-full bg-pink motion-safe:animate-[float-y_5s_ease-in-out_infinite_0.6s]" />

        {/* phone */}
        <div className="relative mx-auto w-[17.5rem] rounded-[2.75rem] border-[3px] border-ink bg-surface p-3 shadow-[10px_10px_0_var(--green)]">
          <div className="mx-auto mb-3 h-6 w-24 rounded-full bg-ink" />
          <div className="mb-3 flex items-center justify-between px-1">
            <div>
              <p className="text-[11px] font-semibold text-muted">Saturday</p>
              <p className="font-display text-lg font-bold leading-tight">Glow Studio</p>
            </div>
            <span className="grid size-9 place-items-center rounded-full bg-tint-yellow">
              <Star aria-hidden className="size-4 fill-yellow text-yellow-deep" />
            </span>
          </div>
          <div className="grid min-h-[17.5rem] content-start gap-2">
            <AnimatePresence initial={false}>
              {slots.slice(0, shown).map((s) => (
                <m.div
                  key={s.time}
                  initial={{ opacity: 0, y: 16, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={cn("flex items-center gap-3 rounded-2xl p-2.5", s.tone)}
                >
                  <span className="w-10 text-[12px] font-bold tabular-nums">{s.time}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold">{s.name}</span>
                    <span className="block truncate text-[11px] text-muted">{s.who}</span>
                  </span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold text-pine", s.badgeTone)}>{s.badge}</span>
                </m.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-2 flex h-11 items-center justify-center gap-2 rounded-2xl bg-yellow text-[13px] font-bold text-pine">
            <Check className="size-4" strokeWidth={3} /> {shown} of 4 booked today
          </div>
        </div>

        {/* floating glass cards */}
        <m.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="glass absolute -left-2 top-[9.5rem] hidden sm:flex items-center gap-2.5 rounded-2xl px-3 py-2.5 shadow-soft sm:-left-12"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-red text-pine">
            <CalendarCheck className="size-4" />
          </span>
          <span className="text-[12px] leading-tight">
            <b className="block">New online booking</b>
            <span className="text-muted">11:45 beard trim, 11:04 PM</span>
          </span>
        </m.div>
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="glass absolute -right-1 top-[58%] hidden sm:flex items-center gap-2.5 rounded-2xl px-3 py-2.5 shadow-soft sm:-right-10"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-yellow text-pine">
            <BellRing className="size-4" />
          </span>
          <span className="text-[12px] leading-tight">
            <b className="block">Reminder sent</b>
            <span className="text-muted">Sara confirmed</span>
          </span>
        </m.div>
        <m.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          className="glass absolute bottom-4 left-2 hidden sm:flex items-center gap-2.5 rounded-2xl px-3 py-2.5 shadow-soft sm:-left-4"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-green text-pine">
            <ShieldCheck className="size-4" />
          </span>
          <span className="text-[12px] leading-tight">
            <b className="block">Backup complete</b>
            <span className="text-muted">Tonight, 3:00 AM</span>
          </span>
        </m.div>
      </div>
    </div>
  );
}
