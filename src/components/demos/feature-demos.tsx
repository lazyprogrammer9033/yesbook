"use client";

/**
 * Animated product mockups that stand in for demo videos.
 * Each scene loops while it is on screen and freezes on its final frame
 * for visitors who prefer reduced motion. Swap any scene for a <video> later.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import {
  Bell,
  Check,
  CloudUpload,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  MessageSquareText,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";

function useLoop(steps: number, ms = 1400) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => setI(steps - 1), 0); // freeze on the finished frame
      return () => clearTimeout(t);
    }
    if (!inView) return;
    const id = setInterval(() => setI((v) => (v + 1) % steps), ms);
    return () => clearInterval(id);
  }, [inView, reduce, steps, ms]);
  return { ref, step: i };
}

const spring = { type: "spring", stiffness: 320, damping: 26 } as const;

/** Device frame shared by all scenes. */
export function DemoFrame({
  label,
  children,
  className,
  tone = "blue",
  device = "browser",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  tone?: string;
  device?: "browser" | "phone";
}) {
  const shadow: Record<string, string> = {
    blue: "shadow-[8px_8px_0_var(--blue)]",
    green: "shadow-[8px_8px_0_var(--green)]",
    yellow: "shadow-[8px_8px_0_var(--yellow)]",
    pink: "shadow-[8px_8px_0_var(--pink)]",
    orange: "shadow-[8px_8px_0_var(--orange)]",
    red: "shadow-[8px_8px_0_var(--red)]",
  };
  return (
    <figure role="img" aria-label={label} className={cn("relative", className)}>
      <div
        className={cn(
          "overflow-hidden border-2 border-ink bg-surface",
          device === "phone" ? "mx-auto max-w-[18rem] rounded-[2.2rem] p-2" : "rounded-3xl",
          shadow[tone] ?? shadow.blue,
        )}
      >
        {device === "browser" ? (
          <div className="flex items-center gap-1.5 border-b-2 border-ink/10 bg-soft px-4 py-2.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-red" />
            <span className="size-2.5 rounded-full bg-yellow" />
            <span className="size-2.5 rounded-full bg-green" />
            <span className="ml-3 h-5 flex-1 rounded-full bg-surface px-3 text-[10px] leading-5 text-muted">book.yoursalon.ca</span>
          </div>
        ) : (
          <div aria-hidden className="mx-auto mb-2 mt-1 h-5 w-24 rounded-full bg-ink/90" />
        )}
        <div aria-hidden className="relative">
          {children}
        </div>
      </div>
    </figure>
  );
}

/* ---------- Online booking: pick service, time, confirmed ---------- */
function OnlineBooking() {
  const { ref, step } = useLoop(4, 1500);
  const times = ["9:30", "10:30", "11:15", "1:00", "2:30", "4:00"];
  return (
    <div ref={ref} className="grid gap-3 p-4 text-[13px]">
      <p className="font-display text-base font-bold">Book with Glow Studio</p>
      <div className="flex flex-wrap gap-1.5">
        {["Cut & style", "Balayage", "Blow-dry"].map((s, i) => (
          <span key={s} className={cn("rounded-full border-2 px-3 py-1 font-semibold transition-colors", step >= 1 && i === 1 ? "border-green bg-tint-green" : "border-line")}>
            {s}
          </span>
        ))}
      </div>
      <p className="text-muted">Saturday, 10:30 with Priya</p>
      <div className="grid grid-cols-3 gap-1.5">
        {times.map((tm, i) => (
          <m.span
            key={tm}
            animate={step >= 2 && i === 1 ? { scale: [1, 1.08, 1] } : {}}
            className={cn("rounded-xl border-2 py-1.5 text-center font-semibold", step >= 2 && i === 1 ? "border-blue bg-blue text-pine" : "border-line")}
          >
            {tm}
          </m.span>
        ))}
      </div>
      <div className="relative h-12">
        <AnimatePresence mode="wait">
          {step >= 3 ? (
            <m.div key="ok" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={spring} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-green font-bold text-pine">
              <span className="grid size-6 place-items-center rounded-full bg-white"><Check className="size-4 text-green-ink" strokeWidth={3} /></span>
              You&apos;re booked!
            </m.div>
          ) : (
            <m.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-12 items-center justify-center rounded-2xl bg-yellow font-bold text-pine">
              Confirm booking
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- In-store booking: staff calendar filling up ---------- */
function InStore() {
  const { ref, step } = useLoop(5, 1100);
  const staff = ["Priya", "Marco", "Ana"];
  const blocks = [
    { c: 0, r: 0, h: 2, label: "Balayage", tone: "bg-pink" },
    { c: 1, r: 0, h: 1, label: "Fade", tone: "bg-blue" },
    { c: 2, r: 1, h: 2, label: "Gel nails", tone: "bg-orange" },
    { c: 1, r: 2, h: 1, label: "Walk-in", tone: "bg-yellow" },
    { c: 0, r: 3, h: 1, label: "Trim", tone: "bg-green" },
  ];
  return (
    <div ref={ref} className="p-4 text-[12px]">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-display text-base font-bold">Today</p>
        <span className="rounded-full bg-tint-blue px-2.5 py-0.5 font-semibold">Sat, Mar 14</span>
      </div>
      <div className="grid grid-cols-[2.6rem_repeat(3,1fr)] gap-1.5">
        <span />
        {staff.map((s) => (
          <span key={s} className="text-center font-semibold">{s}</span>
        ))}
        {["10", "11", "12", "1"].map((h, r) => (
          <div key={h} className="contents">
            <span className="pt-1 text-right text-muted">{h}:00</span>
            {staff.map((s, c) => (
              <div key={s + h} className="relative h-9 rounded-lg bg-soft">
                {blocks.map((b, bi) =>
                  b.c === c && b.r === r && step >= bi ? (
                    <m.div
                      key={b.label}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={spring}
                      style={{ height: `calc(${b.h * 100}% + ${(b.h - 1) * 6}px)` }}
                      className={cn("absolute inset-x-0 top-0 z-10 rounded-lg p-1 font-semibold text-pine", b.tone)}
                    >
                      {b.label}
                    </m.div>
                  ) : null,
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Client records ---------- */
function ClientRecords() {
  const { ref, step } = useLoop(4, 1300);
  const rows = [
    { k: "Last visit", v: "Feb 28 · Balayage" },
    { k: "Colour formula", v: "7N + 20 vol, 35 min" },
    { k: "Note", v: "Allergic to latex" },
  ];
  return (
    <div ref={ref} className="grid gap-3 p-4 text-[13px]">
      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-pink font-display text-lg font-bold text-pine">SK</span>
        <div>
          <p className="font-display text-base font-bold">Sara K.</p>
          <p className="flex items-center gap-1 text-muted">
            <Star className="size-3.5 fill-yellow text-yellow" /> Regular · 14 visits
          </p>
        </div>
      </div>
      {rows.map((r, i) => (
        <m.div
          key={r.k}
          initial={false}
          animate={{ opacity: step >= i ? 1 : 0.25, x: step >= i ? 0 : 8 }}
          className="flex justify-between gap-3 rounded-xl bg-soft px-3 py-2"
        >
          <span className="text-muted">{r.k}</span>
          <span className="font-semibold">{r.v}</span>
        </m.div>
      ))}
      <m.div animate={{ opacity: step >= 3 ? 1 : 0 }} className="flex items-center gap-2 rounded-xl bg-tint-yellow px-3 py-2 font-semibold">
        <Sparkles className="size-4" /> Birthday next week. Send a treat?
      </m.div>
    </div>
  );
}

/* ---------- Staff & services ---------- */
function StaffServices() {
  const { ref, step } = useLoop(3, 1500);
  const staff = [
    { n: "Priya", c: "bg-pink", w: ["70%", "80%", "60%"] },
    { n: "Marco", c: "bg-blue", w: ["55%", "90%", "75%"] },
    { n: "Ana", c: "bg-orange", w: ["85%", "50%", "70%"] },
  ];
  return (
    <div ref={ref} className="grid gap-3 p-4 text-[13px]">
      <p className="font-display text-base font-bold">This week&apos;s hours</p>
      {staff.map((s) => (
        <div key={s.n} className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
          <span className="font-semibold">{s.n}</span>
          <div className="h-6 rounded-full bg-soft">
            <m.div animate={{ width: s.w[step] }} transition={{ type: "spring", stiffness: 120, damping: 18 }} className={cn("h-6 rounded-full", s.c)} />
          </div>
        </div>
      ))}
      <div className="mt-1 grid grid-cols-2 gap-2">
        {[
          ["Cut & style", "$65 · 45 min"],
          ["Balayage", "$180 · 2 h"],
          ["Beard trim", "$25 · 20 min"],
          ["Gel nails", "$55 · 1 h"],
        ].map(([a, b]) => (
          <div key={a} className="rounded-xl border-2 border-line px-3 py-2">
            <p className="font-semibold">{a}</p>
            <p className="text-muted">{b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Reminders: SMS thread ---------- */
function Reminders() {
  const { ref, step } = useLoop(4, 1500);
  const msgs = [
    { me: false, t: "Hi Sara! Reminder: Balayage with Priya tomorrow at 10:30. Reply C to confirm." },
    { me: true, t: "C" },
    { me: false, t: "Confirmed! See you tomorrow 💛" },
  ];
  return (
    <div ref={ref} className="grid min-h-[17rem] content-start gap-2 bg-soft p-4 text-[13px]">
      <p className="mb-1 flex items-center gap-2 font-semibold">
        <MessageSquareText className="size-4" /> Glow Studio
      </p>
      {msgs.map((msg, i) => (
        <AnimatePresence key={i}>
          {step >= i && (
            <m.p
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={spring}
              className={cn(
                "max-w-[80%] rounded-2xl px-3.5 py-2",
                msg.me ? "justify-self-end rounded-br-md bg-blue text-pine" : "rounded-bl-md bg-surface",
              )}
            >
              {msg.t}
            </m.p>
          )}
        </AnimatePresence>
      ))}
      {step >= 3 && (
        <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 flex items-center gap-1.5 justify-self-center rounded-full bg-tint-green px-3 py-1 text-xs font-semibold">
          <Check className="size-3.5" strokeWidth={3} /> No-show avoided
        </m.p>
      )}
    </div>
  );
}

/* ---------- Reports: bars growing ---------- */
function Reports() {
  const { ref, step } = useLoop(3, 1700);
  const sets = [
    [40, 55, 35, 70, 60, 85, 50],
    [50, 65, 45, 80, 72, 92, 66],
    [62, 72, 58, 88, 80, 98, 75],
  ];
  const totals = ["$8,420", "$9,610", "$10,980"];
  const colors = ["bg-blue", "bg-green", "bg-yellow", "bg-pink", "bg-orange", "bg-red", "bg-blue"];
  return (
    <div ref={ref} className="grid gap-3 p-4 text-[12px]">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-muted">Revenue this month</p>
          <m.p key={step} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-2xl font-bold tabular-nums">
            {totals[step]}
          </m.p>
        </div>
        <span className="rounded-full bg-tint-green px-2.5 py-1 font-bold text-green-ink">+18%</span>
      </div>
      <div className="flex h-32 items-end gap-2">
        {sets[step].map((h, i) => (
          <m.div key={i} animate={{ height: `${h}%` }} transition={{ type: "spring", stiffness: 140, damping: 18, delay: i * 0.03 }} className={cn("flex-1 rounded-t-lg", colors[i])} />
        ))}
      </div>
      <div className="flex justify-between text-muted">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="flex-1 text-center">{d}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Backups ---------- */
function Backups() {
  const { ref, step } = useLoop(4, 1200);
  const pct = [15, 55, 90, 100][step];
  return (
    <div ref={ref} className="grid justify-items-center gap-3 p-6 text-center text-[13px]">
      <div className="relative grid size-32 place-items-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--soft)" strokeWidth="10" />
          <m.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="var(--green)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="264"
            animate={{ strokeDashoffset: 264 - (264 * pct) / 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </svg>
        {step >= 3 ? <ShieldCheck className="size-12 text-green-ink" /> : <CloudUpload className="size-10 text-blue-ink" />}
      </div>
      <p className="font-display text-base font-bold">{step >= 3 ? "Backup complete" : "Backing up…"}</p>
      <p className="text-muted">Encrypted · Every night at 3:00 AM</p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {["Bookings", "Clients", "Staff", "Payments"].map((x, i) => (
          <span key={x} className={cn("rounded-full px-2.5 py-1 font-semibold transition-colors", step >= i ? "bg-tint-green" : "bg-soft text-muted")}>
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- AI agent: live call ---------- */
export function AiCall({ lines }: { lines?: readonly { who: string; text: string }[] }) {
  const convo = lines ?? [
    { who: "caller", text: "Hi, can I book a haircut for Saturday morning?" },
    { who: "agent", text: "Of course! Priya has 10:30 or 11:15. Which works better?" },
    { who: "caller", text: "10:30 please." },
    { who: "agent", text: "You're booked with Priya at 10:30. I'll text you a confirmation." },
  ];
  const { ref, step } = useLoop(convo.length + 1, 1700);
  return (
    <div ref={ref} className="grid min-h-[19rem] content-start gap-2 p-4 text-[13px]">
      <div className="mb-1 flex items-center justify-between rounded-2xl bg-ink px-3 py-2 text-bg">
        <span className="flex items-center gap-2 font-semibold">
          <span className="relative grid size-7 place-items-center rounded-full bg-green text-pine">
            <Phone className="size-3.5" />
            <span className="absolute inset-0 animate-ping rounded-full bg-green opacity-40" />
          </span>
          Incoming call
        </span>
        <span className="rounded-full bg-yellow px-2 py-0.5 text-[11px] font-bold text-pine">AI answering</span>
      </div>
      {convo.map((l, i) => (
        <AnimatePresence key={i}>
          {step >= i && (
            <m.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2",
                l.who === "agent" ? "justify-self-end rounded-br-md bg-tint-green" : "rounded-bl-md bg-soft",
              )}
            >
              {l.text}
            </m.p>
          )}
        </AnimatePresence>
      ))}
      {step >= convo.length && (
        <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={spring} className="mt-1 flex items-center gap-2 justify-self-center rounded-full bg-green px-3 py-1.5 text-xs font-bold text-pine">
          <CalendarDays className="size-4" /> Added to calendar · Sat 10:30
        </m.div>
      )}
    </div>
  );
}

export const demoScenes: Record<string, { el: () => React.ReactElement; label: string; device?: "browser" | "phone" }> = {
  "online-booking": { el: OnlineBooking, label: "Animated preview: a client picks a balayage at 10:30 and gets an instant booking confirmation.", device: "phone" },
  "in-store-booking": { el: InStore, label: "Animated preview: the front-desk calendar fills with bookings for three staff members." },
  "client-records": { el: ClientRecords, label: "Animated preview: a client profile with visit history, colour formula, notes and a birthday reminder." },
  "staff-services": { el: StaffServices, label: "Animated preview: weekly staff hours and a service menu with prices and durations." },
  reminders: { el: Reminders, label: "Animated preview: an SMS reminder, the client replies C, and the booking is confirmed.", device: "phone" },
  reports: { el: Reports, label: "Animated preview: a revenue report with daily bars growing to $10,980 for the month." },
  backups: { el: Backups, label: "Animated preview: a nightly encrypted backup runs to 100 percent and completes." },
  "ai-agent": { el: () => <AiCall />, label: "Animated preview: the AI agent answers a call and books a Saturday appointment.", device: "phone" },
};

export function FeatureDemo({ id, tone, className }: { id: string; tone?: string; className?: string }) {
  const scene = demoScenes[id];
  if (!scene) return null;
  const El = scene.el;
  return (
    <DemoFrame label={scene.label} tone={tone} device={scene.device} className={className}>
      <El />
    </DemoFrame>
  );
}

export { Bell };
