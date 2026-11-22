import { icons } from "@/content/icons";
import type { Tone } from "@/content/en";
import { tone as tones } from "@/lib/tone";
import { cn } from "@/lib/utils";

/** Rounded tile with a bright icon: the Yesbook icon style. */
export function IconTile({ id, tone, size = "md", className }: { id: string; tone: Tone; size?: "sm" | "md" | "lg"; className?: string }) {
  const Icon = icons[id] ?? icons.sparkles;
  const s = size === "lg" ? "size-16 rounded-3xl [&_svg]:size-8" : size === "sm" ? "size-10 rounded-xl [&_svg]:size-5" : "size-12 rounded-2xl [&_svg]:size-6";
  return (
    <span className={cn("grid shrink-0 place-items-center text-pine shadow-[inset_0_-3px_0_rgb(0_0_0/0.12)]", tones[tone].bg, s, className)}>
      <Icon aria-hidden strokeWidth={2.5} />
    </span>
  );
}
