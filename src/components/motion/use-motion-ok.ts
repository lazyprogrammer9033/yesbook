"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * true when scroll-linked motion is welcome. Visitors who ask their device to
 * reduce motion get calm, static layouts instead. Safe for static HTML (no hydration mismatch).
 */
export function useMotionOK() {
  return useSyncExternalStore(
    subscribe,
    () => !window.matchMedia(query).matches,
    () => true,
  );
}
