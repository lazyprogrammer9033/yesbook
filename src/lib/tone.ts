import type { Tone } from "@/content/en";

/** Tailwind classes for each brand colour. Written out in full so Tailwind can see them. */
export const tone: Record<Tone, { bg: string; tint: string; text: string; ring: string; shadow: string }> = {
  brand: { bg: "bg-brand", tint: "bg-tint-brand", text: "text-brand-ink", ring: "ring-brand", shadow: "[--shadow-color:var(--brand)]" },
  green: { bg: "bg-green", tint: "bg-tint-green", text: "text-green-ink", ring: "ring-green", shadow: "[--shadow-color:var(--green)]" },
  yellow: { bg: "bg-yellow", tint: "bg-tint-yellow", text: "text-fg", ring: "ring-yellow", shadow: "[--shadow-color:var(--yellow)]" },
  blue: { bg: "bg-blue", tint: "bg-tint-blue", text: "text-blue-ink", ring: "ring-blue", shadow: "[--shadow-color:var(--blue)]" },
  red: { bg: "bg-red", tint: "bg-tint-red", text: "text-fg", ring: "ring-red", shadow: "[--shadow-color:var(--red)]" },
  orange: { bg: "bg-orange", tint: "bg-tint-orange", text: "text-fg", ring: "ring-orange", shadow: "[--shadow-color:var(--orange)]" },
  pink: { bg: "bg-pink", tint: "bg-tint-pink", text: "text-fg", ring: "ring-pink", shadow: "[--shadow-color:var(--pink)]" },
};
