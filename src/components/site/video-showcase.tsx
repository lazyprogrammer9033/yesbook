"use client";

import { useEffect, useRef, useState } from "react";
import { IconTile } from "@/components/site/icon-tile";
import { t } from "@/content/en";
import { tone } from "@/lib/tone";
import { cn } from "@/lib/utils";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Demo videos with a picker. Plays muted while on screen (never for reduced-motion users), with full controls. */
export function VideoShowcase({ className }: { className?: string }) {
  const items = t.videos.items;
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);
  const v = items[active];

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [active]);

  return (
    <div className={cn("grid items-start gap-5 lg:grid-cols-[1fr_2fr] lg:gap-8", className)}>
      <div role="group" aria-label="Choose a demo video" className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "flex items-center gap-3 rounded-2xl border-2 border-transparent px-3 py-2.5 text-left lg:items-start lg:rounded-3xl lg:p-4 transition-colors hover:bg-soft",
              i === active && "border-ink bg-surface shadow-[5px_5px_0_var(--yellow)]",
            )}
          >
            <IconTile id={it.id} tone={it.tone} size="sm" />
            <span>
              <span className="block font-display font-bold sm:text-lg">{it.title}</span>
              <span className="mt-0.5 hidden text-sm text-muted lg:block">{it.body}</span>
            </span>
          </button>
        ))}
      </div>
      <figure className={cn("order-first overflow-hidden rounded-[1.25rem] border-2 border-ink bg-surface sm:rounded-[1.75rem] lg:order-none", "sticker", tone[v.tone].shadow)}>
        <video
          key={v.id}
          ref={ref}
          className="block aspect-video w-full bg-soft"
          src={`${base}/videos/${v.id}.mp4`}
          poster={`${base}/videos/${v.id}.jpg`}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label={`Demo video: ${v.title}. ${v.body}`}
        />
        <figcaption className="sr-only">
          {v.title}: {v.body}
        </figcaption>
      </figure>
    </div>
  );
}
