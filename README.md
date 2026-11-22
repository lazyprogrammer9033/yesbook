# Yesbook website

The marketing site for **Yesbook** (yesbook.ca): custom booking apps for salons, barbers, spas, clinics, trainers and tutors across the GTA.

Built with Next.js 16 (static export), TypeScript, Tailwind CSS 4, Framer Motion and shadcn/ui-style components. The build is plain HTML/CSS/JS, so it runs on any IONOS web hosting plan.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the finished site to out/
```

## Where to change things

| What | File |
| --- | --- |
| Contact email, domain, calendar link, analytics, service area | `src/lib/site.ts` |
| All page text (ready for a French copy later) | `src/content/en.ts` |
| Prices (set numbers to show them; `null` shows "Contact us") | `src/content/en.ts` → `pricing.plans` |
| About story | `src/content/en.ts` → `about.story` |
| Colours and fonts (brand tokens) | `src/app/globals.css` |
| Logo (site) | `src/components/site/logo.tsx` · master files in `brand/logo/` |
| Contact form email settings | `public/api/config.php` |
| Share images (Open Graph) | `node scripts/og-images.mjs` regenerates `public/og/` |

## Pages

Home · Product · Industries · AI Agent · Pricing · About · Book a demo · Privacy · Terms · 404

## Brand

Direction **A+ "Fresh Confirm, Bright"**: Yes Green `#12A150`, Sunny Yellow `#FFC928` (calls to action), Sky Blue `#2EA8FF`, Cherry Red `#FF5A4E`, Tangerine `#FF9A1F`, Bubblegum `#FF5FA2`, Deep Pine `#0B2A22` text, Night Sky `#0F1530` dark mode. Headings in Fredoka, body in Inter. Logo: the "Open Book" (book + yes tick).

## Deploying to IONOS

See [docs/DEPLOY-IONOS.md](docs/DEPLOY-IONOS.md).

## Adding French later

1. Copy `src/content/en.ts` to `src/content/fr.ts` and translate the strings.
2. Add `"fr-CA"` to `locales` in `src/lib/site.ts`.
3. Add a `src/app/fr/` route group that renders the same pages with the French content, and `hreflang` links in `src/lib/seo.ts`.

## Demo videos

The demo videos in `public/videos/` are recorded from the scripted sample sites in `scripts/demo-videos/` (a salon booking site, a badminton/pickleball court booking site and a front desk calendar). Edit an HTML file there, then re-record with `node scripts/demo-videos/record.mjs [name]` (needs Playwright and ffmpeg). Each run writes `name.mp4` and a `name.jpg` poster.
