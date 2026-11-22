// Generates the Open Graph share images in public/og/ (1200x630).
// Run: node scripts/og-images.mjs   (needs Playwright: npx playwright install chromium)
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import { readFileSync, mkdirSync } from "node:fs";

const logo = readFileSync(new URL("../brand/logo/yesbook-logo.svg", import.meta.url), "utf8");
const pages = [
  { slug: "home", title: "Say yes to every booking.", sub: "Custom booking apps for salons, clinics and studios across the GTA", c: "#FFC928" },
  { slug: "product", title: "The Salon App", sub: "Online and in-store booking, reminders, client records, reports and backups", c: "#12A150" },
  { slug: "industries", title: "Built for appointment businesses", sub: "Salons, barbers, spas, clinics, trainers and tutors", c: "#FF5FA2" },
  { slug: "ai-agent", title: "An AI receptionist that never misses a call", sub: "Answers 24/7 and books straight into your calendar", c: "#FF5A4E" },
  { slug: "pricing", title: "Simple pricing", sub: "Monthly or yearly plans in CAD, setup included", c: "#2EA8FF" },
  { slug: "about", title: "Made in Ontario", sub: "Booking apps for local businesses, from Hamilton to Ajax", c: "#12A150" },
  { slug: "contact", title: "Book a free demo", sub: "See how Yesbook would work for your business", c: "#FFC928" },
  { slug: "privacy", title: "Privacy policy", sub: "How we protect your information (PIPEDA)", c: "#2EA8FF" },
  { slug: "terms", title: "Terms of service", sub: "yesbook.ca", c: "#FF9A1F" },
];

const fontCss = "https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Inter:wght@500&display=block";

mkdirSync(new URL("../public/og/", import.meta.url), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of pages) {
  await page.setContent(`<!doctype html><html><head><link rel="stylesheet" href="${fontCss}"><style>
    body{margin:0;width:1200px;height:630px;overflow:hidden;background:#fff;font-family:Inter,sans-serif;position:relative}
    .b1{position:absolute;right:-120px;top:-140px;width:520px;height:520px;border-radius:50%;background:${p.c};opacity:.9}
    .b2{position:absolute;right:220px;bottom:-90px;width:200px;height:200px;border-radius:50%;background:#2EA8FF;opacity:.85}
    .b3{position:absolute;right:60px;bottom:70px;width:130px;height:130px;border-radius:36px;background:#FF5FA2;transform:rotate(12deg)}
    .stripe{position:absolute;left:0;right:0;bottom:0;height:14px;display:flex}.stripe i{flex:1}
    .logo{position:absolute;left:72px;top:64px;height:86px}.logo svg{height:86px;width:auto}
    h1{position:absolute;left:72px;top:200px;width:760px;margin:0;font:700 76px/1.02 Fredoka,sans-serif;color:#0B2A22;letter-spacing:-.01em}
    p{position:absolute;left:72px;bottom:84px;width:720px;margin:0;font-size:30px;color:#43574F}
  </style></head><body><div class="b1"></div><div class="b2"></div><div class="b3"></div>
  <div class="logo">${logo}</div><h1>${p.title}</h1><p>${p.sub}</p>
  <div class="stripe"><i style="background:#12A150"></i><i style="background:#FFC928"></i><i style="background:#2EA8FF"></i><i style="background:#FF5A4E"></i><i style="background:#FF9A1F"></i><i style="background:#FF5FA2"></i></div>
  </body></html>`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: new URL(`../public/og/${p.slug}.png`, import.meta.url).pathname });
  console.log("og", p.slug);
}
await browser.close();
