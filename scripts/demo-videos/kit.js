/* Tiny "director" for scripted demo videos. Each demo page calls Demo.run(async (d) => { ... }).
   Everything happens in a 1280x720 stage so the recording is the same size every time. */
(function () {
  const stage = document.querySelector(".stage");
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.innerHTML =
    '<svg viewBox="0 0 24 24" width="30" height="30"><path d="M4 2l15 9-6.5 1.6L16.5 20l-3 1.4-3.6-7.4L5 18z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  stage.appendChild(cursor);
  const cap = document.createElement("div");
  cap.className = "caption";
  stage.appendChild(cap);

  let cx = 1100, cy = 650;
  cursor.style.transform = `translate(${cx}px, ${cy}px)`;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const $ = (sel) => (typeof sel === "string" ? stage.querySelector(sel) : sel);
  function center(el) {
    const s = stage.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 };
  }
  async function move(sel, ms = 750) {
    const el = $(sel);
    const p = center(el);
    cursor.style.transition = `transform ${ms}ms cubic-bezier(.45,.05,.25,1)`;
    cursor.style.transform = `translate(${p.x - 4}px, ${p.y - 2}px)`;
    cx = p.x; cy = p.y;
    await wait(ms + 60);
    return el;
  }
  async function moveXY(x, y, ms = 700) {
    cursor.style.transition = `transform ${ms}ms cubic-bezier(.45,.05,.25,1)`;
    cursor.style.transform = `translate(${x - 4}px, ${y - 2}px)`;
    cx = x; cy = y;
    await wait(ms + 60);
  }
  async function click(sel, ms) {
    const el = await move(sel, ms);
    const ring = document.createElement("span");
    ring.className = "ripple";
    ring.style.left = cx + "px";
    ring.style.top = cy + "px";
    stage.appendChild(ring);
    setTimeout(() => ring.remove(), 700);
    el.classList.add("pressed");
    await wait(160);
    el.classList.remove("pressed");
    await wait(120);
    return el;
  }
  async function type(sel, text, speed = 70) {
    const el = $(sel);
    el.classList.add("focus");
    for (const ch of text) {
      el.textContent += ch;
      await wait(speed);
    }
    el.classList.remove("focus");
  }
  async function caption(text, ms = 0) {
    cap.classList.remove("on");
    await wait(220);
    cap.innerHTML = text;
    cap.classList.add("on");
    if (ms) await wait(ms);
  }
  function show(sel) { $(sel).classList.add("on"); }
  function hide(sel) { $(sel).classList.remove("on"); }

  window.Demo = {
    run(script) {
      window.__ready = true;
      window.__start = async () => {
        await wait(400);
        await script({ wait, move, moveXY, click, type, caption, show, hide, $, stage });
        await wait(1400);
        window.__done = true;
      };
      if (!/record/.test(location.search)) window.__start();
    },
  };
})();
