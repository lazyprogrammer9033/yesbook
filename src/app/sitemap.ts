import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const pages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/product/", priority: 0.9, freq: "monthly" },
  { path: "/ai-agent/", priority: 0.9, freq: "monthly" },
  { path: "/industries/", priority: 0.8, freq: "monthly" },
  { path: "/pricing/", priority: 0.8, freq: "monthly" },
  { path: "/contact/", priority: 0.8, freq: "yearly" },
  { path: "/about/", priority: 0.6, freq: "yearly" },
  { path: "/privacy/", priority: 0.3, freq: "yearly" },
  { path: "/terms/", priority: 0.3, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((p) => ({ url: absoluteUrl(p.path), lastModified, changeFrequency: p.freq, priority: p.priority }));
}
