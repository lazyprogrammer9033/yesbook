"use client";

import { m, useScroll, useSpring } from "framer-motion";

/** Rainbow reading-progress bar along the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1.5 origin-left bg-[linear-gradient(90deg,#12a150,#ffc928,#2ea8ff,#ff5a4e,#ff9a1f,#ff5fa2)]"
    />
  );
}
