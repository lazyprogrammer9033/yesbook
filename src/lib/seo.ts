import type { Metadata } from "next";
import { site, absoluteUrl } from "./site";

type PageMeta = { title: string; description: string; path: string; ogImage?: string; keywords?: string[] };

const baseKeywords = [
  "booking app for salons",
  "salon booking app Toronto",
  "salon booking software GTA",
  "barbershop booking app Ontario",
  "spa booking system Canada",
  "clinic appointment booking app",
  "custom booking app",
  "badminton court booking",
  "pickleball court booking Toronto",
  "AI receptionist for salons",
  "online booking Mississauga",
  "online booking Brampton",
  "appointment app Hamilton",
];

/** Builds per-page metadata with canonical URL and Open Graph / Twitter cards. */
export function pageMeta({ title, description, path, ogImage, keywords = [] }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const image = ogImage ?? `/og/${path === "/" ? "home" : path.replaceAll("/", "")}.png`;
  return {
    title,
    description,
    keywords: [...keywords, ...baseKeywords],
    alternates: { canonical: url, languages: { "en-CA": url } },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      locale: "en_CA",
      images: [{ url: image, width: 1200, height: 630, alt: `${site.name}: ${title}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#org`,
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/brand/yesbook-logo.png"),
  email: site.email,
  slogan: site.tagline,
  description: site.description,
  sameAs: [...site.altDomains, ...Object.values(site.social).filter(Boolean)],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.region.city,
    addressRegion: site.region.province,
    addressCountry: site.region.country,
  },
  areaServed: site.region.areaServed.map((name) => ({ "@type": "City", name, containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } })),
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: "en-CA",
  publisher: { "@id": `${site.url}/#org` },
};

export const productLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Yesbook booking app",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description:
    "A custom, branded booking and business app for salons, sports courts, clinics and studios: online and in-store booking, client records, staff and services, reminders, reports, automatic secure backups and a premium AI phone agent.",
  provider: { "@id": `${site.url}/#org` },
  areaServed: "Greater Toronto Area, Ontario, Canada",
  offers: { "@type": "Offer", priceCurrency: "CAD", availability: "https://schema.org/InStock", url: absoluteUrl("/pricing/") },
};

export function faqLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}
