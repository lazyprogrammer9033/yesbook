# Sample booking apps

Clickable sample apps for the kinds of businesses Yesbook sells to. Each one is a fictional business with its own brand colours, a **client app** and an **owner app**.

| App | Industry | Download |
| --- | --- | --- |
| Lotus & Stone Spa | Massage & spa | [zips/lotus-stone-spa.zip](zips/lotus-stone-spa.zip) |
| Smash Club Courts | Pickleball & badminton courts | [zips/smash-club-courts.zip](zips/smash-club-courts.zip) |
| Peak Physio & Rehab | Physio clinic | [zips/peak-physio.zip](zips/peak-physio.zip) |
| Wag & Wash Grooming | Pet grooming | [zips/wag-and-wash.zip](zips/wag-and-wash.zip) |

Each zip holds one `index.html` you can open in a browser, plus a short README. The same files, unzipped, are in `apps/`.

## Editing or adding an industry

All four apps share one engine in `src/`:

- `engine.js` / `engine.css`: the client app (booking flow, AI assistant, My visits)
- `owner.js` / `owner.css`: the owner app (dashboard, calendar, clients, services, team, packages, AI assistant, reports, settings)
- `spa.mjs`, `courts.mjs`, `physio.mjs`, `pets.mjs`: one file per business with its name, colours, fonts, services, staff, FAQs and sample data

To add an industry, copy one of the business files, change its content, add its name to the list in `build.mjs`, then run:

```bash
node demo-apps/src/build.mjs demo-apps/build
```

The build writes one self-contained HTML file per business (wrap it in a normal `<!doctype html>` page as in `apps/*/index.html` to open it locally).
