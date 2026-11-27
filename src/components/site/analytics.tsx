import Script from "next/script";
import { site } from "@/lib/site";

/** Cookie-free analytics (Plausible or Umami). Renders nothing until configured in src/lib/site.ts. */
export function Analytics() {
  const a = site.analytics;
  if (a.provider === "plausible") {
    return (
      <Script
        defer
        data-domain={a.domain}
        src={a.src || "https://plausible.io/js/script.js"}
        strategy="afterInteractive"
      />
    );
  }
  if (a.provider === "umami" && a.src && a.websiteId) {
    return <Script defer src={a.src} data-website-id={a.websiteId} strategy="afterInteractive" />;
  }
  return null;
}
