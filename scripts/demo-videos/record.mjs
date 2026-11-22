// Records the scripted demo pages in this folder to MP4 + poster JPG in public/videos/.
// Run: node scripts/demo-videos/record.mjs [name ...]   (needs Playwright + ffmpeg)
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "../../public/videos");
fs.mkdirSync(outDir, { recursive: true });

const all = fs.readdirSync(here).filter((f) => f.endsWith(".html")).map((f) => f.replace(".html", ""));
const names = process.argv.slice(2).length ? process.argv.slice(2) : all;

const browser = await chromium.launch();
for (const name of names) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.join(here, name + ".html") + "?record");
  await page.waitForFunction(() => window.__ready);
  await page.evaluate(() => document.fonts.ready);
  const tmp = fs.mkdtempSync(path.join(fs.realpathSync(require("node:os").tmpdir()), "yb-" + name + "-"));
  const cdp = await page.context().newCDPSession(page);
  const frames = [];
  cdp.on("Page.screencastFrame", async (f) => {
    const file = path.join(tmp, String(frames.length).padStart(5, "0") + ".jpg");
    fs.writeFileSync(file, Buffer.from(f.data, "base64"));
    frames.push({ file, t: f.metadata.timestamp });
    cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 95, everyNthFrame: 1, maxWidth: 1280, maxHeight: 720 });
  await page.waitForTimeout(300);
  await page.evaluate(() => window.__start());
  await page.waitForFunction(() => window.__done, null, { timeout: 120000, polling: 100 });
  await cdp.send("Page.stopScreencast");
  await page.close();

  // Variable frame timing -> ffconcat with real durations, then constant 30 fps H.264.
  let list = "ffconcat version 1.0\n";
  for (let i = 0; i < frames.length; i++) {
    const dur = i + 1 < frames.length ? frames[i + 1].t - frames[i].t : 0.5;
    list += `file '${frames[i].file}'\nduration ${Math.max(dur, 0.001).toFixed(4)}\n`;
  }
  list += `file '${frames[frames.length - 1].file}'\n`;
  const listFile = path.join(tmp, "list.txt");
  fs.writeFileSync(listFile, list);
  const mp4 = path.join(outDir, name + ".mp4");
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile,
    "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-tune", "animation",
    "-movflags", "+faststart", "-an", mp4]);
  // Poster: the last frame (finished state) reads best as a still.
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-sseof", "-1.2", "-i", mp4, "-frames:v", "1", "-q:v", "4", path.join(outDir, name + ".jpg")]);
  fs.rmSync(tmp, { recursive: true, force: true });
  const kb = Math.round(fs.statSync(mp4).size / 1024);
  console.log(`${name}: ${frames.length} frames, ${(frames.at(-1).t - frames[0].t).toFixed(1)}s, ${kb} KB`);
}
await browser.close();
