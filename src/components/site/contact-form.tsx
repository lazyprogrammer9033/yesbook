"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/field";
import { t } from "@/content/en";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "business" | "type" | "email" | "phone", string>>;

// The form posts to a tiny PHP script that IONOS runs (public/api/contact.php).
const ENDPOINT = "/api/contact.php";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const started = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  function validate(fd: FormData): Errors {
    const e: Errors = {};
    if (!String(fd.get("name") ?? "").trim()) e.name = "Please enter your name.";
    if (!String(fd.get("business") ?? "").trim()) e.business = "Please enter your business name.";
    if (!String(fd.get("type") ?? "")) e.type = "Please choose your type of business.";
    const email = String(fd.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email, like you@example.com.";
    const phone = String(fd.get("phone") ?? "").replace(/[^\d+]/g, "");
    if (phone && phone.replace("+", "").length < 10) e.phone = "Please enter a 10-digit phone number, or leave it blank.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    fd.append("elapsed", String(Date.now() - started.current));
    fd.append("plan", new URLSearchParams(window.location.search).get("plan") ?? "");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "send failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm font-semibold text-[color-mix(in_oklab,var(--red)_70%,var(--fg))]">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <m.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            role="status"
            className="grid min-h-[28rem] place-content-center justify-items-center gap-4 text-center"
          >
            <span className="grid size-20 place-items-center rounded-full bg-green text-pine">
              <CheckCircle2 aria-hidden className="size-10" />
            </span>
            <h2 className="text-3xl font-bold">Message sent</h2>
            <p className="max-w-sm text-muted">{t.contact.success}</p>
          </m.div>
        ) : (
          <m.form key="form" ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5" exit={{ opacity: 0 }}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Your name</Label>
                <Input id="name" name="name" autoComplete="name" required {...aria("name")} />
                {err("name")}
              </div>
              <div>
                <Label htmlFor="business">Business name</Label>
                <Input id="business" name="business" autoComplete="organization" required {...aria("business")} />
                {err("business")}
              </div>
            </div>
            <div>
              <Label htmlFor="type">Type of business</Label>
              <Select id="type" name="type" defaultValue="" required {...aria("type")}>
                <option value="" disabled>
                  Choose one
                </option>
                {t.contact.businessTypes.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </Select>
              {err("type")}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email" inputMode="email" required {...aria("email")} />
                {err("email")}
              </div>
              <div>
                <Label htmlFor="phone">
                  Phone <span className="font-normal text-muted">(optional)</span>
                </Label>
                <Input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" {...aria("phone")} />
                {err("phone")}
              </div>
            </div>
            <div>
              <Label htmlFor="message">
                Message <span className="font-normal text-muted">(optional)</span>
              </Label>
              <Textarea id="message" name="message" placeholder="How do you take bookings today? What would you like to improve?" />
            </div>
            {/* Spam trap: humans never see or fill this field */}
            <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <p className="text-sm text-muted">
              We only use your details to reply to you. See our{" "}
              <Link href="/privacy/" className="font-semibold text-fg underline decoration-green decoration-2 underline-offset-2">
                privacy policy
              </Link>
              .
            </p>
            {status === "error" && (
              <p role="alert" className="rounded-2xl bg-tint-red p-4 font-semibold">
                {t.contact.error}{" "}
                <a className="underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
            )}
            <Button type="submit" variant="cta" size="lg" disabled={status === "sending"} className="w-full sm:w-fit">
              {status === "sending" ? <Loader2 aria-hidden className="animate-spin" /> : <Send aria-hidden />}
              {status === "sending" ? "Sending…" : "Send message"}
            </Button>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
