// Builds one self-contained HTML file per sample business: node build.mjs [outDir]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] || path.join(here, "../out");
fs.mkdirSync(out, { recursive: true });
const css = fs.readFileSync(path.join(here, "engine.css"), "utf8");
const js = fs.readFileSync(path.join(here, "engine.js"), "utf8");
const ocss = fs.readFileSync(path.join(here, "owner.css"), "utf8");
const ojs = fs.readFileSync(path.join(here, "owner.js"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
for (const name of ["spa", "courts", "physio", "pets"]) {
  const f = path.join(here, name + ".mjs");
  if (!fs.existsSync(f)) continue;
  const m = await import(f + "?t=" + Date.now());
  const html = `<title>${esc(m.title)}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${m.fonts}&display=swap">
<style>${m.theme}
${css}
${ocss}</style>
<div class="modebar" id="modebar"><div class="seg" role="group" aria-label="Switch app"><button data-mode="client" aria-pressed="true">📱 Client app</button><button data-mode="owner" aria-pressed="false">🧑‍💼 Owner app</button></div></div>
<div class="wrap">
  <aside class="pitch"><span class="tag">${esc(m.pitch.tag)}</span><h1>${esc(m.pitch.h)}</h1><p>${esc(m.pitch.p)}</p>
    <ul>${m.pitch.points.map((p) => `<li><b>✓</b>${esc(p)}</li>`).join("")}</ul></aside>
  <main class="app" id="app" aria-label="${esc(m.title)} booking app"></main>
</div>
<div class="owner" id="owner" hidden></div>
<script>window.CFG = ${JSON.stringify(m.cfg)};</script>
<script>${js}</script>
<script>${ojs}</script>
`;
  fs.writeFileSync(path.join(out, m.file + ".html"), html);
  console.log("built", m.file);
}
