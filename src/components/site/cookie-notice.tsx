"use client";

import { useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const KEY = "yb-cookie-notice";

/**
 * Yesbook uses no tracking cookies (analytics are cookie-free), so this is a notice, not a consent wall.
 * It is rendered in the static HTML so it never delays the page. If you later add cookie-based tools
 * (ads, chat widgets), switch this to an opt-in banner.
 */
export function CookieNotice() {
  const [open, setOpen] = useState(true);
  function dismiss() {
    try {
      localStorage.setItem(KEY, "ok");
    } catch {}
    setOpen(false);
  }
  if (!open) return null;
  return (
    <div
      id="cookie-notice"
      role="region"
      aria-label="Cookie notice"
      className="rise glass fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 mx-auto flex max-w-lg items-center gap-3 rounded-3xl p-3 pl-4 shadow-soft [animation-delay:1s]"
    >
      <Cookie aria-hidden className="size-5 shrink-0 text-orange" />
      <p className="text-[13px] leading-snug text-fg">
        No tracking cookies here. Our analytics are anonymous.{" "}
        <Link href="/privacy/" className="font-semibold underline decoration-green decoration-2 underline-offset-2">
          Privacy
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="ml-auto h-10 shrink-0 rounded-full bg-fg px-4 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
      >
        Got it
      </button>
    </div>
  );
}
