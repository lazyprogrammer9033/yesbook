import Link from "next/link";
import { Logo } from "./logo";
import { site } from "@/lib/site";
import { t } from "@/content/en";

const groups = [
  {
    title: "Product",
    links: [
      { href: "/product/", label: "Features" },
      { href: "/ai-agent/", label: "AI phone agent" },
      { href: "/pricing/", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about/", label: "About" },
      { href: "/industries/", label: "Industries" },
      { href: "/contact/", label: "Book a demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy/", label: "Privacy policy" },
      { href: "/terms/", label: "Terms of service" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-[#0f1530] text-[#f4f7ff] [--fg:#f4f7ff] [--muted:#b7c0dd]">
      <div aria-hidden className="flex h-2">
        <span className="flex-1 bg-[#12a150]" />
        <span className="flex-1 bg-[#ffc928]" />
        <span className="flex-1 bg-[#2ea8ff]" />
        <span className="flex-1 bg-[#ff5a4e]" />
        <span className="flex-1 bg-[#ff9a1f]" />
        <span className="flex-1 bg-[#ff5fa2]" />
      </div>
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_2fr]">
        <div className="grid content-start gap-4">
          <Link href="/" aria-label="Yesbook home" className="w-fit rounded-xl">
            <Logo id="yb-f" className="h-11" />
          </Link>
          <p className="max-w-sm text-[#b7c0dd]">{t.footer.blurb}</p>
          <p className="text-sm text-[#b7c0dd]">{t.footer.serving}</p>
          <p className="text-sm">
            <a href={`mailto:${site.email}`} className="font-semibold text-[#ffc928] underline-offset-4 hover:underline">
              {site.email}
            </a>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="eyebrow mb-4 font-sans text-[#ffc928]">{g.title}</h2>
              <ul className="grid gap-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[#f4f7ff] underline-offset-4 hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-[#2a3463] py-6 text-sm text-[#b7c0dd] sm:flex-row sm:justify-between">
        <p>
          © {year} {site.legalName}. Made in Ontario, Canada.
        </p>
      </div>
    </footer>
  );
}
