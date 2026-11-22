import type { Metadata, Viewport } from "next";
import { Caveat, Fredoka, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { organizationLd, websiteLd } from "@/lib/seo";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { CookieNotice } from "@/components/site/cookie-notice";
import { Analytics } from "@/components/site/analytics";
import { JsonLd } from "@/components/site/json-ld";
import { themeScript, cookieScript } from "@/lib/inline-scripts";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
// Caveat: handwriting for the sticky notes (not preloaded, it is below the fold).
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["600", "700"], display: "swap", preload: false });
// Fredoka: the soft, rounded face from the Yesbook wordmark, used for headings.
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Booking websites for salons, courts & local businesses in the GTA`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  formatDetection: { telephone: false },
  // Preview builds (GitHub Pages) are hidden from search engines.
  robots: process.env.NEXT_PUBLIC_PREVIEW ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1530" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${fredoka.variable} ${caveat.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript + cookieScript }} />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieNotice />
        </MotionProvider>
        <Analytics />
        <JsonLd data={[organizationLd, websiteLd]} />
      </body>
    </html>
  );
}
