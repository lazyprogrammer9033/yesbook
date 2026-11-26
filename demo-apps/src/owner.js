/* Owner app: the business side of each sample. Reads and writes the same bookings, services and packages as the client app. */
(function () {
  const Y = window.YB, C = Y.C, S = Y.S;
  const { esc, money, iso, fromIso, addDays, today, fmtDay, fmtTime, hash, allServices, svcById } = Y;
  const root = document.getElementById("owner");
  const O = { sec: "dash", date: iso(today), days: {}, q: "", seen: 0, ai: { book: true, upsell: true, faq: true, after: false, handoff: true }, rules: { lead: "1 hour", cancel: C.cancelWindow, remind: true, remind2: false, review: true }, brand: null, extraPacks: [] };
  const court = C.mode === "court";
  const COLORS = C.confetti;

  // ---------- data ----------
  const cols = () => (court ? C.courts.map((c) => ({ id: c.id, name: c.name, sub: c.sports.map((s) => svcById(s).name).join(" · "), off: c.closed, em: "🏟️" })) : C.staff.map((p) => ({ id: p.id, name: p.name, sub: p.role, off: p.off, grad: p.grad, does: p.does })));
  const durOf = (s) => { if (court) return 60; const d = s.dur || ""; let m = d.match(/(\d+)\s*min/); if (m) return +m[1]; m = d.match(/(\d+)(?:–\d+)?\s*h(?:\s*(\d+))?/); if (m) return Math.min(+m[1] * 60 + (+m[2] || 0), 180); return C.hours.step; };
  const FIRST = ["Hannah", "Omar", "Grace", "Daniel", "Leila", "Nina", "Kevin", "Rosa", "Aisha", "Tom", "Maria", "Wei", "Jason", "Priya", "Liam", "Fatima", "Chris", "Olivia", "Ben", "Sana", "Mark", "Lisa", "Ken", "Zoe"];
  const LAST = ["L.", "R.", "T.", "K.", "S.", "P.", "M.", "D.", "N.", "B.", "G.", "C."];
  const PETS = ["Bailey · Doodle", "Coco · Pug", "Oreo · Cat", "Rocky · Terrier", "Maple · Cockapoo", "Thor · Husky", "Teddy · Cavapoo", "Max · Lab"];
  const nameAt = (n) => FIRST[n % FIRST.length] + " " + LAST[(n * 7) % LAST.length];
  const svcsFor = (col) => allServices().filter((s) => !s.hidden && (court ? C.courts.find((c) => c.id === col).sports.includes(s.id) : !staffDoes(col) || staffDoes(col).includes(s.cat)));
  const staffDoes = (id) => { const p = C.staff && C.staff.find((x) => x.id === id); return p && p.does; };
  const srcs = ["Online", "Online", "AI assistant", "Online", "Phone", "Walk-in", "AI assistant"];

  function genDay(d) {
    if (O.days[d]) return O.days[d];
    const out = [];
    const isToday = d === iso(today);
    const cs = cols();
    if (isToday) {
      C.owner.agenda.forEach((a, i) => {
        let col = cs.find((c) => a.title.includes(c.name) || a.who.includes(c.name.split(" ")[0]) || a.who.includes(c.name));
        if (!col) col = cs[hash(a.title + i) % cs.length];
        const s = allServices().find((x) => a.title.toLowerCase().includes(x.name.toLowerCase().split(" ")[0])) || allServices()[0];
        out.push({ id: "a" + i, col: col.id, t: a.t, dur: durOf(s), title: a.title, client: a.who.split(" · ")[0], src: a.src, c: a.c, price: s.price, status: a.t < nowMin() - 30 ? "done" : "booked" });
      });
    }
    {
      const closed = C.closedDays && C.closedDays.includes(fromIso(d).getDay());
      if (!closed) for (const c of cs) {
        const list = svcsFor(c.id);
        for (let m = C.hours.open; m < C.hours.close; ) {
          const h = hash(d + c.id + m);
          if (h % 100 < (C.busy || 45) - 6 && list.length) {
            const s = list[h % list.length], du = durOf(s);
            if (m + du > C.hours.close) break;
            const n = h % 97;
            if (out.some((o) => o.col === c.id && o.t < m + du && m < o.t + o.dur)) { m += court ? 60 : C.hours.step; continue; }
            if (isToday && h % 3) { m += du; continue; }
            out.push({ id: "g" + d + c.id + m, col: c.id, t: m, dur: du, title: court ? s.name + (h % 5 ? "" : " · league") : s.name, client: nameAt(n), pet: C.pets ? PETS[n % PETS.length] : null, src: srcs[h % srcs.length], c: COLORS[h % COLORS.length], price: s.price, status: d < iso(today) || (isToday && m < nowMin() - 30) ? (h % 23 === 0 ? "noshow" : "done") : "booked" });
            m += du + (court ? 0 : 15);
          } else m += court ? 60 : C.hours.step;
        }
      }
    }
    return (O.days[d] = out);
  }
  function nowMin() { const n = new Date(); return n.getHours() * 60 + n.getMinutes(); }
  function liveFor(d) {
    const cs = cols();
    return S.bookings.filter((b) => b.date === d && !b.cancelled && !String(b.id).startsWith("seed")).map((b) => ({
      id: b.id, live: b, col: cs.find((c) => c.id === b.key) ? b.key : cs[hash(b.id) % cs.length].id, t: b.start, dur: court ? 60 * (b.hours || 1) : durOf(svcById(b.service)),
      title: b.title + (b.pet ? " · " + b.pet : ""), client: C.demoClient.name, src: b.src || "Online", c: "var(--a)", price: b.price, status: b.status || "booked", isNew: true,
    }));
  }
  const dayAll = (d) => [...genDay(d), ...liveFor(d)].filter((x) => x.status !== "cancelled").sort((a, b) => a.t - b.t);

  let CLIENTS = null;
  function clients() {
    if (CLIENTS) return CLIENTS;
    const names = new Set(); const list = [];
    C.owner.agenda.forEach((a) => names.add(a.who.split(" · ")[0]));
    for (let i = 0; names.size < 16; i++) names.add(nameAt(i * 5 + 3));
    [...names].filter((n) => !/group|walk-in|courts|&/i.test(n) || n.includes("&")).slice(0, 16).forEach((n, i) => {
      const h = hash(n), s = allServices()[h % allServices().length];
      const visits = 1 + (h % 23), last = h % 70;
      const tags = []; if (visits > 15) tags.push("vip"); if (visits < 3) tags.push("new"); if (last > 50 && visits > 3) tags.push("risk");
      list.push({ id: "c" + i, name: n, phone: `(${["416", "647", "905", "289"][h % 4]}) 555-0${String(100 + (h % 899)).slice(0, 3)}`, visits, spent: Math.round(visits * s.price * (1.05 + (h % 30) / 100)), last, fav: s.name, staff: C.staff ? C.staff[h % C.staff.length].name : C.courts[h % C.courts.length].name, tags, pet: C.pets ? PETS[h % PETS.length] : null, note: C.owner.notes[h % C.owner.notes.length] });
    });
    const me = S.bookings.filter((b) => !b.cancelled);
    list.unshift({ id: "me", name: C.demoClient.name, phone: C.demoClient.phone, visits: me.length + 6, spent: me.reduce((s, b) => s + b.price, 0) + 640, last: 0, fav: me[0] ? me[0].title : allServices()[0].name, staff: me[0] ? me[0].who : "", tags: ["vip"], pet: C.pets ? C.pets.map((p) => p.name + " · " + p.breed).join(", ") : null, note: C.owner.notes[0], live: true });
    return (CLIENTS = list);
  }

  // ---------- shell ----------
  const NAV = [["dash", "🏠", "Dashboard"], ["cal", "📅", court ? "Court sheet" : "Calendar"], ["clients", "👥", C.pets ? "Clients & pets" : court ? "Players" : C.intake ? "Patients" : "Clients"], ["services", "🏷️", court ? "Courts & prices" : "Services & prices"], ["team", court ? "🏟️" : "🧑‍💼", court ? "Courts" : "Team"], ["packs", "🎁", "Packages & offers"], ["ai", "✦", "AI assistant"], ["reports", "📈", "Reports"], ["settings", "⚙️", "Settings"]];
  function newCount() { return S.bookings.filter((b) => !String(b.id).startsWith("seed") && !b.cancelled).length; }
  function render() {
    const nav = NAV.map(([id, ic, l]) => `<button data-o-sec="${id}" ${O.sec === id ? 'aria-current="page"' : ""}><span aria-hidden="true">${ic}</span>${esc(l)}${id === "cal" && newCount() > O.seen ? `<span class="cnt">${newCount() - O.seen}</span>` : ""}</button>`).join("");
    const title = NAV.find((n) => n[0] === O.sec)[2];
    const main = VIEWS[O.sec]();
    root.innerHTML = `<div class="o-shell"><aside class="o-side"><div class="logo"><i aria-hidden="true">${C.logoMark}</i>${esc(C.name)}</div><nav class="o-nav" aria-label="Owner sections">${nav}</nav>
      <div class="own"><b>🔒 Your data</b>Every client, booking and payment belongs to you. Export it any time.</div></aside>
      <section class="o-main"><header class="o-top"><div class="grow"><h1>${esc(title)}</h1><div class="sub">${fmtDay(today, { weekday: "long", month: "long", day: "numeric" })} · ${esc(C.owner.place)}</div></div>
        <button class="iconbtn bell" data-o-act="bell" aria-label="Notifications">🔔${newCount() > O.seen ? `<em>${newCount() - O.seen}</em>` : ""}</button>
        <button class="btn" data-o-act="new">+ New booking</button></header>${main}</section></div>
      <div class="o-scrim" data-o-act="close"></div><aside class="o-drawer" id="o-drawer" aria-label="Details"></aside><div class="o-modal" id="o-modal" role="dialog" aria-modal="true" aria-label="New booking"></div><div class="o-toast" id="o-toast" role="status" aria-live="polite"></div>`;
  }
  let tt;
  function toast(m) { const t = document.getElementById("o-toast"); t.textContent = m; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 2600); }
  function openDrawer(html) { const d = document.getElementById("o-drawer"); d.innerHTML = `<button class="iconbtn x" data-o-act="close" aria-label="Close">✕</button>` + html; d.classList.add("on"); root.querySelector(".o-scrim").classList.add("on"); }
  function openModal(html) { const d = document.getElementById("o-modal"); d.innerHTML = html; d.classList.add("on"); root.querySelector(".o-scrim").classList.add("on"); const f = d.querySelector("input,select"); if (f) f.focus(); }
  function closeAll() { root.querySelectorAll(".o-drawer,.o-modal,.o-scrim").forEach((e) => e.classList.remove("on")); }

  const series = () => Array.from({ length: 14 }, (_, i) => { const d = addDays(today, i - 13); const wk = d.getDay() === 0 || d.getDay() === 6; const closed = C.closedDays && C.closedDays.includes(d.getDay()); return { d, wk, v: closed ? 0 : Math.round(C.owner.revenue * (0.62 + (hash(iso(d) + C.id) % 45) / 100) * (wk ? 1.25 : 1)) }; });
  function chart(data) {
    const W = 640, H = 200, pad = 28, max = Math.max(...data.map((x) => x.v)) * 1.1 || 1, bw = (W - pad) / data.length;
    const ticks = [0, 0.5, 1].map((f) => Math.round((max * f) / 100) * 100);
    let g = ticks.map((t) => { const y = H - 22 - (t / max) * (H - 40); return `<line class="gl" x1="${pad}" x2="${W}" y1="${y}" y2="${y}"/><text x="${pad - 6}" y="${y + 4}" text-anchor="end">${t >= 1000 ? (t / 1000).toFixed(1) + "k" : t}</text>`; }).join("");
    data.forEach((x, i) => { const h = (x.v / max) * (H - 40), X = pad + i * bw + 4, Y = H - 22 - h; g += `<rect class="bar${i === data.length - 1 ? " now" : x.wk ? " wk" : ""}" x="${X}" y="${Y}" width="${bw - 8}" height="${Math.max(h, 1)}" rx="5"><title>${fmtDay(x.d)}: ${money(x.v)}</title></rect><text x="${X + (bw - 8) / 2}" y="${H - 6}" text-anchor="middle">${x.d.getDate()}</text>`; });
    return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Revenue for the last 14 days">${g}</svg></div><div class="legend"><span><i style="background:var(--p)"></i>Weekday</span><span><i style="background:var(--a)"></i>Weekend</span><span><i style="background:var(--ok)"></i>Today so far</span></div>`;
  }
  const apptRow = (r) => `<button class="ag${r.isNew ? " new" : ""}" style="--c:${r.c};width:100%;text-align:left" data-o-appt="${r.id}" data-o-date="${iso(today)}"><span class="tm">${fmtTime(r.t)}</span><span><b>${esc(r.title)}</b><small>${esc(r.client)} · ${esc(colName(r.col))}</small></span><span class="src">${esc(r.src)}</span></button>`;
  const colName = (id) => (cols().find((c) => c.id === id) || { name: "" }).name;

  // ---------- views ----------
  const VIEWS = {
    dash() {
      const t = dayAll(iso(today)), rev = t.reduce((s, x) => s + x.price, 0);
      const wk = series().slice(-7).reduce((s, x) => s + x.v, 0);
      const ai = t.filter((x) => x.src === "AI assistant").length;
      const next = t.filter((x) => x.t >= nowMin() - 15).slice(0, 5);
      const risk = clients().filter((c) => c.tags.includes("risk")).length || 3;
      const feed = [...S.bookings.filter((b) => !String(b.id).startsWith("seed")).slice(-3).reverse().map((b) => ["🆕", `<b>${esc(C.demoClient.name)}</b> booked ${esc(b.title)}${b.pet ? " for " + esc(b.pet) : ""}`, `${b.src || "Online"} · just now`]),
        ["✦", `AI assistant booked <b>${esc(C.owner.agenda[1].title)}</b> for ${esc(C.owner.agenda[1].who.split(" · ")[0])}`, "11:42 PM last night"], ["♻️", "A cancelled 3 PM slot was filled from the waitlist in 4 minutes", "Yesterday"], ["⭐", "New 5-star Google review from a client who booked online", "Yesterday"], ["💬", `${C.owner.agenda.length * 2 + 4} reminder texts sent for tomorrow`, "This morning"]];
      return `<div class="o-grid">
        <div class="o-card kpi hot s3"><i>📅</i><small>${esc(C.owner.unit)} today</small><b>${t.length}</b><span class="d">${newCount() ? "+" + newCount() + " new since you opened" : "▲ 3 vs last " + fmtDay(today, { weekday: "long" })}</span></div>
        <div class="o-card kpi s3"><i>💰</i><small>Booked revenue today</small><b>${money(rev)}</b><span class="d">▲ 12% vs last week</span></div>
        <div class="o-card kpi s3"><i>📈</i><small>Revenue, last 7 days</small><b>${money(wk)}</b><span class="d">▲ 8% vs previous 7</span></div>
        <div class="o-card kpi s3"><i>✦</i><small>Booked by AI today</small><b>${ai}</b><span class="d">${esc(C.owner.ai[0][1].split(",")[0])} this week</span></div>
        <div class="o-card s8"><h2>Revenue <small>last 14 days</small></h2>${chart(series())}</div>
        <div class="o-card s4"><h2>Needs attention</h2><div class="attn">
          <div><span>⏰</span><p><b>${risk} regulars</b> are overdue for their usual visit.</p><button data-o-act="rebook">Send rebook text</button></div>
          <div><span>🕳️</span><p>Tomorrow has <b>3 open slots</b> after 4 PM.</p><button data-o-act="fill">Offer to waitlist</button></div>
          <div><span>⭐</span><p><b>5 clients</b> from yesterday haven't left a review.</p><button data-o-act="review">Ask for reviews</button></div></div></div>
        <div class="o-card s7"><h2>Up next today <button data-o-sec="cal">Open ${court ? "court sheet" : "calendar"} ›</button></h2><div class="upnext agenda">${next.length ? next.map(apptRow).join("") : '<p class="note">No more bookings today. Nice work.</p>'}</div></div>
        <div class="o-card s5"><h2>Activity</h2><div class="feed">${feed.slice(0, 5).map(([i, a, b]) => `<div><i>${i}</i><span>${a}<small>${esc(b)}</small></span></div>`).join("")}</div></div>
        <div class="o-card s12"><div class="pk"><span class="lbl" style="font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--pack-lbl)">Package idea from your data</span><h3>${esc(C.owner.idea.title)}</h3><p>${esc(C.owner.idea.body)}</p><div class="row2"><b>${esc(C.owner.idea.stat)}</b><button class="btn" data-o-act="publish-idea">Publish to client app</button></div></div></div>
      </div>`;
    },
    cal() {
      O.seen = newCount();
      const d = O.date, cs = cols(), PX = 1.05, top = 52;
      const items = dayAll(d);
      const H = (C.hours.close - C.hours.open) * PX;
      let hours = "", lines = "";
      for (let m = C.hours.open; m <= C.hours.close; m += 60) { const y = (m - C.hours.open) * PX; hours += `<span style="top:${y + top}px">${fmtTime(m).replace(":00", "")}</span>`; lines += `<div class="hl" style="top:${y}px"></div>`; }
      const nowLine = d === iso(today) && nowMin() > C.hours.open && nowMin() < C.hours.close ? `<div class="now" style="top:${(nowMin() - C.hours.open) * PX}px"></div>` : "";
      const colsHtml = cs.map((c) => `<div><div class="ch">${court ? `<span class="em" style="width:30px;height:30px;border-radius:10px;font-size:15px;display:grid;place-items:center;background:var(--tint)">🏟️</span>` : `<span class="av" style="background:${c.grad}">${esc(c.name[0])}</span>`}<span>${esc(c.name)}<small>${esc(c.off ? (court ? "Closed today" : "Off today") : c.sub)}</small></span></div>
        <div class="col${c.off ? " off" : ""}" data-o-col="${c.id}" style="height:${H}px">${lines}${nowLine}${items.filter((x) => x.col === c.id).map((x) => `<button class="appt ${x.status}${x.isNew ? " isnew" : ""}" style="--c:${x.c};top:${(x.t - C.hours.open) * PX}px;height:${Math.max(x.dur * PX - 3, 26)}px" data-o-appt="${x.id}" data-o-date="${d}"><span class="src" aria-hidden="true">${x.src === "AI assistant" ? "✦" : x.src === "Online" ? "🌐" : x.src === "Phone" ? "📞" : "🚶"}</span><b>${esc(x.title)}</b><small>${fmtTime(x.t)} · ${esc(x.client)}</small></button>`).join("")}</div></div>`).join("");
      const rev = items.reduce((s, x) => s + x.price, 0);
      return `<div class="calbar"><button class="btn ghost" data-o-day="-1" aria-label="Previous day">‹</button><button class="btn ghost" data-o-day="0">Today</button><button class="btn ghost" data-o-day="1" aria-label="Next day">›</button>
        <h2>${fmtDay(fromIso(d), { weekday: "long", month: "long", day: "numeric" })}</h2><span class="tag">${items.length} ${esc(C.owner.unit)} · ${money(rev)}</span>
        <div class="legend"><span>🌐 Online</span><span>✦ AI assistant</span><span>📞 Phone</span><span>🚶 Walk-in</span></div></div>
        <div class="calwrap"><div class="cal" style="grid-template-columns:64px repeat(${cs.length}, minmax(140px, 1fr))"><div class="tcol"><div class="ch" style="border-left:0"></div>${hours}</div>${colsHtml}</div></div>
        <p class="note">Tap an empty spot to add a ${court ? "booking" : "walk-in or phone booking"}. Tap a booking to check in, mark a no-show or cancel. Bookings made in the client app show up here with a yellow ring.</p>`;
    },
    clients() {
      const q = O.q.toLowerCase();
      const list = clients().filter((c) => !q || c.name.toLowerCase().includes(q) || c.phone.includes(q) || (c.pet || "").toLowerCase().includes(q));
      const label = { vip: "VIP", new: "New", risk: "Due back" };
      return `<div class="o-card"><h2><input class="search" id="o-q" placeholder="Search name, phone${C.pets ? " or pet" : ""}" value="${esc(O.q)}" aria-label="Search clients"><small>${clients().length} of 1,284 shown</small></h2>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Name</th>${C.pets ? "<th>Pets</th>" : ""}<th>Favourite</th><th class="num">Visits</th><th class="num">Spent</th><th>Last visit</th><th>Tags</th></tr></thead><tbody>
        ${list.map((c) => `<tr data-o-client="${c.id}" tabindex="0"><td><span class="who"><span class="av" style="background:${COLORS[hash(c.name) % COLORS.length]}">${esc(c.name[0])}</span>${esc(c.name)}</span></td>${C.pets ? `<td>${esc(c.pet)}</td>` : ""}<td>${esc(c.fav)}</td><td class="num">${c.visits}</td><td class="num">${money(c.spent)}</td><td>${c.last === 0 ? "Today" : c.last + " days ago"}</td><td>${c.tags.map((t) => `<span class="tag ${t}">${label[t]}</span>`).join("")}</td></tr>`).join("")}
        </tbody></table></div></div>`;
    },
    services() {
      const rows = (court ? C.categories[0].services : allServices()).map((s) => `<tr><td><span class="who"><span class="em" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:${s.sw}">${s.em}</span><input class="wide" value="${esc(s.name)}" data-o-svc="${s.id}" data-o-f="name" aria-label="Name"></span></td><td>${esc(C.categories.find((c) => c.services.some((y) => y.id === s.id)).name)}</td><td>${esc(s.dur || "per hour")}</td><td class="num">$ <input type="number" min="0" value="${s.price}" data-o-svc="${s.id}" data-o-f="price" aria-label="Price for ${esc(s.name)}"></td><td class="num">${100 + (hash(s.id) % 160)}</td><td><button class="sw2wrap" data-o-hide="${s.id}" aria-pressed="${!s.hidden}" aria-label="Show ${esc(s.name)} in the app"><span class="mini"></span></button></td></tr>`).join("");
      const ad = C.addons.length ? `<div class="o-card" style="margin-top:14px"><h2>Add-ons <small>offered during booking and by the AI assistant</small></h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Add-on</th><th>Description</th><th class="num">Price</th><th class="num">Taken</th></tr></thead><tbody>${C.addons.map((a) => `<tr><td><span class="who"><span>${a.em}</span>${esc(a.name)}</span></td><td>${esc(a.desc)}</td><td class="num">$ <input type="number" min="0" value="${a.price}" data-o-add="${a.id}" aria-label="Price"></td><td class="num">${20 + (hash(a.id) % 50)}%</td></tr>`).join("")}</tbody></table></div></div>` : "";
      return `<div class="o-card"><h2>${court ? "Court prices" : "Services"} <small>changes show in the client app straight away</small> ${court ? "" : `<button data-o-act="add-svc">+ Add service</button>`}</h2>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Name</th><th>Category</th><th>Length</th><th class="num">Price</th><th class="num">Booked (90 d)</th><th>In app</th></tr></thead><tbody>${rows}</tbody></table></div></div>${ad}
        ${court ? `<div class="o-card" style="margin-top:14px"><h2>Pricing rules</h2>${setRow("Member discount", "Members save on every court", `<select data-o-rule="member"><option>${Math.round(C.memberDiscount * 100)}%</option><option>10%</option><option>25%</option></select>`)}${setRow("Peak hours", "Weekdays 5–10 PM and weekends", `<select><option>+ $6 / hour</option><option>No surcharge</option><option>+ $10 / hour</option></select>`)}${setRow("Book ahead", "How far ahead players can book", `<select><option>7 days (members 14)</option><option>14 days</option><option>30 days</option></select>`)}</div>` : ""}`;
    },
    team() {
      const items = dayAll(iso(today));
      const open = C.hours.close - C.hours.open;
      return `<div class="o-card"><h2>${court ? "Courts today" : "Your team today"} <small>toggle to block ${court ? "a court" : "someone"} in the client app</small></h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${court ? "Court" : "Name"}</th><th>${court ? "Sports" : "Role"}</th><th>Hours</th><th>Booked today</th><th>Busy</th><th>${court ? "Open" : "Working"}</th></tr></thead><tbody>
        ${cols().map((c) => { const mine = items.filter((x) => x.col === c.id); const used = Math.min(100, Math.round((mine.reduce((s, x) => s + x.dur, 0) / open) * 100)); return `<tr><td><span class="who">${court ? "🏟️" : `<span class="av" style="background:${c.grad}">${esc(c.name[0])}</span>`}${esc(c.name)}</span></td><td>${esc(c.sub)}</td><td>${fmtTime(C.hours.open)} – ${fmtTime(C.hours.close)}</td><td>${mine.length}</td><td><div class="util"><i style="width:${c.off ? 0 : used}%"></i></div><small>${c.off ? "—" : used + "%"}</small></td><td><button class="sw2wrap" data-o-off="${c.id}" aria-pressed="${!c.off}" aria-label="${esc(c.name)} available"><span class="mini"></span></button></td></tr>`; }).join("")}
        </tbody></table></div></div>
        ${court ? "" : `<div class="o-grid" style="margin-top:14px">${C.staff.map((p) => `<div class="o-card s4"><h2><span class="who"><span class="av" style="background:${p.grad}">${esc(p.name[0])}</span>${esc(p.name)}</span><small>${esc(p.role)}</small></h2><div class="tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div><p class="note">Rebook rate ${60 + (hash(p.id) % 30)}% · Avg rating ${(4.7 + (hash(p.id) % 4) / 10).toFixed(1)} ★ · ${12 + (hash(p.id) % 20)} clients this month</p></div>`).join("")}</div>`}`;
    },
    packs() {
      const top = C.owner.top;
      const ideas = [
        { title: C.owner.idea.title, body: C.owner.idea.body, stat: C.owner.idea.stat, price: C.pack.price, was: C.pack.was },
        { title: `${top[0][0]} 5-pack`, body: `${top[0][0]} is your best seller (${top[0][1]} in 90 days). A 5-pack at 10% off brings those clients back sooner.`, stat: "Most likely to sell", price: Math.round(svcPrice(top[0][0]) * 5 * 0.9), was: svcPrice(top[0][0]) * 5 },
        { title: "Bring a friend", body: "Second person books the same time and both save 15%. Good for quiet weekday slots.", stat: "Fills quiet hours", price: Math.round(svcPrice(top[1][0]) * 2 * 0.85), was: svcPrice(top[1][0]) * 2 },
      ];
      O._ideas = ideas;
      return `<div class="o-grid"><div class="o-card s5"><h2>Live in your client app</h2><div class="pk live"><span class="tag new" style="justify-self:start">● Live</span><h3>${esc(C.pack.title)}</h3><p>${esc(C.pack.body)}</p><div class="row2"><b>${money(C.pack.price)} <s style="color:var(--mut);font-weight:600">${money(C.pack.was)}</s></b><button class="btn ghost" data-o-act="see-client">See it in the app</button></div></div>
        <p class="note">Sold this month: ${8 + (hash(C.id) % 14)} · Revenue locked in: ${money(C.pack.price * (8 + (hash(C.id) % 14)))}</p></div>
        <div class="o-card s7"><h2>Suggested from what clients buy most <small>last 90 days</small></h2><div style="display:grid;gap:10px">${ideas.map((x, i) => `<div class="pk"><h3>${esc(x.title)}</h3><p>${esc(x.body)}</p><div class="row2"><span class="tag">${esc(x.stat)}</span><b>${money(x.price)} <s style="color:var(--mut);font-weight:600">${money(x.was)}</s></b><button class="btn" data-o-pub="${i}">Publish</button></div></div>`).join("")}</div></div>
        <div class="o-card s12"><h2>Offers you can send</h2><div class="attn">
          <div><span>🎂</span><p><b>Birthday treat</b>: 15% off in their birthday month. 23 clients have a birthday in the next 30 days.</p><button data-o-act="sent">Turn on</button></div>
          <div><span>💌</span><p><b>We miss you</b>: text clients who haven't been back in 60 days with a one-tap rebook link.</p><button data-o-act="sent">Send to 41</button></div>
          <div><span>🎁</span><p><b>Gift cards</b>: sell digital gift cards from your app. Popular for the holidays.</p><button data-o-act="sent">Turn on</button></div></div></div></div>`;
    },
    ai() {
      const togg = [["book", "Book, move and cancel visits", "Uses your live calendar, so it never double-books"], ["upsell", "Suggest add-ons and packages", "Based on what clients buy most"], ["faq", "Answer common questions", "Prices, hours, parking and policies below"], ["handoff", "Hand off to staff when unsure", "Texts you the question and the client's number"], ["after", "After-hours only", "Let the team handle chats during opening hours"]];
      const convs = [
        [["Client", C.ai.quick[0]], ["AI", "Offered 3 free times, client picked one, suggested an add-on"]], "✓ Booked · 11:42 PM",
        [["Client", C.ai.quick[2]], ["AI", C.faq[0].a]], "✓ Answered · 8:15 AM",
        [["Client", "Can I move my booking to next week?"], ["AI", "Released the old slot and booked the new one"]], "✓ Moved · Yesterday",
      ];
      const live = S.chat && S.chat.msgs.length > 1 ? `<div class="conv"><span class="tag new" style="justify-self:start">● Just now</span>${S.chat.msgs.slice(-6).map((m) => `<div class="l"><b>${m.ai ? "AI" : "Client"}</b><span>${m.h}</span></div>`).join("")}</div>` : "";
      return `<div class="o-grid">${C.owner.ai.map(([k, v], i) => `<div class="o-card kpi s4${i === 0 ? " hot" : ""}"><i>${["✦", "💬", "⏱️"][i]}</i><small>${esc(k)} this week</small><b>${esc(v.split(" ")[0])}</b><span class="d">${esc(v.split(" ").slice(1).join(" "))}</span></div>`).join("")}
        <div class="o-card s5"><h2>What it's allowed to do <span class="premium" style="margin:0">Premium</span></h2>${togg.map(([k, a, b]) => `<button class="setrow" data-o-ai="${k}" aria-pressed="${O.ai[k]}"><span><b>${esc(a)}</b><small>${esc(b)}</small></span><span class="mini"></span></button>`).join("")}</div>
        <div class="o-card s7"><h2>Recent conversations</h2><div style="display:grid;gap:10px">${live}${[0, 2, 4].map((i) => `<div class="conv">${convs[i].map(([w, t]) => `<div class="l"><b>${w}</b><span>${esc(t)}</span></div>`).join("")}<div class="res">${convs[i + 1]}</div></div>`).join("")}</div></div>
        <div class="o-card s12"><h2>Answers it gives <small>edit and the assistant uses the new answer straight away</small></h2>${C.faq.map((f, i) => `<div class="faqed"><label for="faq${i}">When clients ask about ${esc(f.keys[0])}</label><textarea id="faq${i}" data-o-faq="${i}">${esc(f.a)}</textarea></div>`).join("")}</div></div>`;
    },
    reports() {
      const top = C.owner.top, max = Math.max(...top.map((t) => t[1]));
      const srcMix = [["Online", 46], ["AI assistant", 24], ["Phone", 18], ["Walk-in", 12]];
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const hrs = []; for (let m = C.hours.open; m < C.hours.close; m += 120) hrs.push(m);
      let heat = `<span class="lb"></span>` + hrs.map((m) => `<span class="lb" style="justify-content:center">${fmtTime(m).replace(":00", "")}</span>`).join("");
      days.forEach((d, i) => { heat += `<span class="lb">${d}</span>` + hrs.map((m) => { const v = (hash(d + m + C.id) % 70) + (i >= 4 ? 25 : 0) + (m >= 1020 ? 15 : 0); return `<span style="opacity:${Math.min(1, 0.12 + v / 110).toFixed(2)}" title="${d} ${fmtTime(m)}: ${Math.round(v)}% full"></span>`; }).join(""); });
      const s = series(), tot = s.reduce((a, x) => a + x.v, 0);
      return `<div class="o-grid">
        <div class="o-card kpi s3"><i>💰</i><small>Revenue, 14 days</small><b>${money(tot)}</b><span class="d">▲ 9%</span></div>
        <div class="o-card kpi s3"><i>🔁</i><small>Clients who rebook</small><b>68%</b><span class="d">▲ 11 pts since reminders</span></div>
        <div class="o-card kpi s3"><i>🚫</i><small>No-shows</small><b>2.1%</b><span class="d">▼ from 9% before text reminders</span></div>
        <div class="o-card kpi s3"><i>🧾</i><small>Average ticket</small><b>${money(Math.round(tot / Math.max(1, s.length * C.owner.agenda.length)))}</b><span class="d">▲ add-ons up 18%</span></div>
        <div class="o-card s6"><h2>What clients buy most <small>last 90 days</small></h2><div class="bars">${top.map(([n, v]) => `<div class="bar"><b style="font-weight:600">${esc(n)}</b><span><i style="width:${Math.round((v / max) * 100)}%"></i></span><em>${v}</em></div>`).join("")}</div></div>
        <div class="o-card s6"><h2>Where bookings come from</h2><div class="bars">${srcMix.map(([n, v]) => `<div class="bar"><b style="font-weight:600">${n}</b><span><i style="width:${v * 2}%"></i></span><em>${v}%</em></div>`).join("")}</div><p class="note">70% of bookings now happen without a phone call. 31% arrive after closing time.</p></div>
        <div class="o-card s12"><h2>Busiest times <small>how full you are, by day and time</small></h2><div style="overflow-x:auto"><div class="heat" style="grid-template-columns:40px repeat(${hrs.length}, minmax(44px,1fr));min-width:420px">${heat}</div></div></div>
        <div class="o-card s12"><h2>Revenue <small>last 14 days</small></h2>${chart(s)}</div></div>`;
    },
    settings() {
      const sw = [C.confetti[0], C.confetti[1], C.confetti[2], C.confetti[3], "#12a150", "#0b1440"];
      return `<div class="o-grid"><div class="o-card s6"><h2>Business profile</h2>
        ${setRow("Business name", "Shown on your app and texts", `<input type="text" value="${esc(C.name)}" data-o-name aria-label="Business name">`)}
        ${C.info.map(([k, v]) => setRow(k, "", `<input type="text" value="${esc(v)}" aria-label="${esc(k)}">`)).join("")}
        ${setRow("Your web address", "Your own domain, not ours", `<input type="text" value="book.${C.name.toLowerCase().replace(/[^a-z]/g, "")}.ca" aria-label="Web address">`)}</div>
        <div class="o-card s6"><h2>Brand colour <small>try one, the whole app updates</small></h2><div class="swatches">${sw.map((c) => `<button data-o-brand="${c}" aria-pressed="${(O.brand || "") === c}" style="background:${c}" aria-label="Use colour ${c}"></button>`).join("")}<button data-o-brand="" aria-pressed="${!O.brand}" style="background:var(--hero)" aria-label="Original colours"></button></div>
        <h2 style="margin-top:20px">Booking rules</h2>
        ${setRow("Book ahead at least", "", `<select aria-label="Lead time"><option>1 hour</option><option>3 hours</option><option>Same day not allowed</option></select>`)}
        ${setRow("Free changes up to", "Later changes need a call", `<select aria-label="Cancellation window"><option>${esc(C.cancelWindow)}</option><option>48 hours</option><option>2 hours</option></select>`)}
        ${setRow("Deposit for new clients", "Cuts no-shows", `<select aria-label="Deposit"><option>None</option><option>$20</option><option>25%</option></select>`)}</div>
        <div class="o-card s6"><h2>Texts & reminders</h2>${[["remind", "Reminder the day before", "With a one-tap confirm or move link"], ["remind2", "Second reminder 2 hours before", ""], ["review", "Ask for a Google review after the visit", "Only sent to happy clients"]].map(([k, a, b]) => `<button class="setrow" data-o-rule="${k}" aria-pressed="${O.rules[k]}"><span><b>${a}</b><small>${b}</small></span><span class="mini"></span></button>`).join("")}</div>
        <div class="o-card s6"><h2>Your data</h2><p class="note" style="margin-top:0">Every client record, booking and payment belongs to ${esc(C.name)}. Export it any time, or take it with you.</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn ghost" data-o-act="export">Export clients (CSV)</button><button class="btn ghost" data-o-act="export">Export bookings (CSV)</button></div>
        <p class="note">Backed up every night · Last backup 2:00 AM</p></div></div>`;
    },
  };
  const setRow = (a, b, ctl) => `<div class="setrow"><span><b>${esc(a)}</b>${b ? `<small>${esc(b)}</small>` : ""}</span>${ctl}</div>`;
  const svcPrice = (name) => { const s = allServices().find((x) => name.toLowerCase().includes(x.name.toLowerCase().split(" ")[0])) || allServices()[0]; return s.price; };

  // ---------- details ----------
  function findAppt(id, d) { return dayAll(d).find((x) => x.id === id) || [...genDay(d), ...liveFor(d)].find((x) => x.id === id); }
  function apptDrawer(id, d) {
    const x = findAppt(id, d); if (!x) return;
    const c = clients().find((k) => k.name === x.client) || null;
    openDrawer(`<span class="tag" style="margin-bottom:8px">${esc(x.src)}</span><h2>${esc(x.title)}</h2><p class="note" style="font-size:14px">${fmtDay(fromIso(d), { weekday: "long", month: "long", day: "numeric" })} · ${fmtTime(x.t)}–${fmtTime(x.t + x.dur)} · ${esc(colName(x.col))}</p>
      <div class="summary blk"><div class="ln"><span>Client</span><b>${esc(x.client)}</b></div>${x.pet ? `<div class="ln"><span>Pet</span><b>${esc(x.pet)}</b></div>` : ""}<div class="ln"><span>Price</span><b>${money(x.price)}</b></div><div class="ln"><span>Status</span><b>${{ booked: "Booked", done: "Checked in", noshow: "No-show" }[x.status] || x.status}</b></div></div>
      ${c ? `<div class="blk note" style="font-size:13.5px">📝 ${esc(c.note)}<br>${c.visits} visit${c.visits === 1 ? "" : "s"} · ${money(c.spent)} spent · usually ${esc(c.fav)}</div>` : ""}
      <div class="acts"><button class="btn" data-o-st="done" data-o-id="${x.id}" data-o-d="${d}">Check in</button><button class="btn ghost" data-o-st="noshow" data-o-id="${x.id}" data-o-d="${d}">No-show</button><button class="btn ghost" data-o-act="toast" data-o-msg="Reminder text sent to ${esc(x.client)}">Text client</button><button class="btn ghost" data-o-st="cancelled" data-o-id="${x.id}" data-o-d="${d}">Cancel</button></div>`);
  }
  function clientDrawer(id) {
    const c = clients().find((k) => k.id === id); if (!c) return;
    const hist = c.live ? S.bookings.slice().sort((a, b) => b.date.localeCompare(a.date)).map((b) => [fmtDay(fromIso(b.date)), b.title + (b.pet ? " · " + b.pet : ""), money(b.price), b.cancelled ? "Cancelled" : fromIso(b.date) >= today ? "Upcoming" : "Done"]) : [0, 1, 2, 3].map((i) => [fmtDay(addDays(today, -c.last - i * 35)), i % 2 ? c.fav : allServices()[(hash(c.name) + i) % allServices().length].name, money(allServices()[0].price), "Done"]);
    openDrawer(`<div class="who" style="margin-bottom:10px"><span class="av" style="width:54px;height:54px;font-size:22px;background:${COLORS[hash(c.name) % COLORS.length]}">${esc(c.name[0])}</span><span><h2>${esc(c.name)}</h2><small style="color:var(--mut)">${esc(c.phone)}</small></span></div>
      <div class="stats blk"><div class="stat"><b>${c.visits}</b><small>visits</small></div><div class="stat"><b>${money(c.spent)}</b><small>spent</small></div><div class="stat"><b>${c.last === 0 ? "Today" : c.last + "d"}</b><small>last visit</small></div></div>
      ${c.pet ? `<div class="summary blk"><div class="ln"><span>${C.pets ? "Pets" : ""}</span><b>${esc(c.pet)}</b></div></div>` : ""}
      <div class="summary blk"><div class="ln"><span>Usually books</span><b>${esc(c.fav)}</b></div><div class="ln"><span>Prefers</span><b>${esc(c.staff)}</b></div></div>
      <div class="field blk"><label for="cnote">Private notes</label><textarea id="cnote">${esc(c.note)}</textarea></div>
      <h3 style="font-family:var(--fd);margin:16px 0 8px">History</h3><div class="info">${hist.map(([a, b, p, s]) => `<div><b style="min-width:92px">${a}</b><span style="flex:1">${esc(b)}</span><span>${p}</span><span class="tag">${s}</span></div>`).join("")}</div>
      <div class="acts"><button class="btn" data-o-act="toast" data-o-msg="Rebook link texted to ${esc(c.name)}">Text rebook link</button><button class="btn ghost" data-o-act="toast" data-o-msg="Offer sent: 15% off ${esc(c.fav)}">Send an offer</button></div>`);
  }
  function newModal(col, t) {
    const cs = cols().filter((c) => !c.off);
    col = col || cs[0].id;
    if (t == null) { t = Math.max(C.hours.open, Math.ceil((nowMin() + 15) / 15) * 15); if (t >= C.hours.close - 60) t = C.hours.open; }
    const times = []; for (let m = C.hours.open; m < C.hours.close; m += 15) times.push(m);
    openModal(`<h2>New booking</h2><div class="field"><label for="nb-c">Client</label><input id="nb-c" list="nb-list" placeholder="Name or phone" value=""><datalist id="nb-list">${clients().map((c) => `<option value="${esc(c.name)}">`).join("")}</datalist></div>
      <div class="field"><label for="nb-s">${court ? "Sport" : "Service"}</label><select id="nb-s">${allServices().filter((s) => !s.hidden).map((s) => `<option value="${s.id}">${esc(s.name)} · ${money(s.price)}</option>`).join("")}</select></div>
      <div class="field"><label for="nb-w">${court ? "Court" : "With"}</label><select id="nb-w">${cs.map((c) => `<option value="${c.id}" ${c.id === col ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></div>
      <div class="field"><label for="nb-t">Time on ${fmtDay(fromIso(O.date))}</label><select id="nb-t">${times.map((m) => `<option value="${m}" ${m === t ? "selected" : ""}>${fmtTime(m)}</option>`).join("")}</select></div>
      <div class="field"><label>Booked by</label><div class="chips" id="nb-src"><button class="chip" aria-pressed="true" data-o-src="Walk-in">🚶 Walk-in</button><button class="chip" aria-pressed="false" data-o-src="Phone">📞 Phone</button></div></div>
      <div class="acts" style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button class="btn ghost" data-o-act="close">Cancel</button><button class="btn" data-o-act="save-new">Save booking</button></div>`);
  }

  // ---------- events ----------
  root.addEventListener("click", (e) => {
    if (e.target.classList.contains("o-scrim")) { closeAll(); return; }
    const el = e.target.closest("button, tr[data-o-client]");
    if (!el) { const col = e.target.closest("[data-o-col]"); if (col && !col.classList.contains("off")) { const r = col.getBoundingClientRect(); const m = C.hours.open + Math.floor((e.clientY - r.top) / 1.05 / 15) * 15; newModal(col.dataset.oCol, m); } return; }
    const d = el.dataset;
    if (d.oSec) { O.sec = d.oSec; closeAll(); render(); window.scrollTo(0, 0); return; }
    if (d.oClient) return clientDrawer(d.oClient);
    if (d.oAppt) return apptDrawer(d.oAppt, d.oDate);
    if (d.oDay != null) { O.date = d.oDay === "0" ? iso(today) : iso(addDays(fromIso(O.date), +d.oDay)); render(); return; }
    if (d.oSt) {
      const x = [...genDay(d.oD), ...liveFor(d.oD)].find((k) => k.id === d.oId);
      if (x && x.live) { if (d.oSt === "cancelled") x.live.cancelled = true; else x.live.status = d.oSt; Y.save(); Y.render(); }
      else { const g = genDay(d.oD).find((k) => k.id === d.oId); if (g) g.status = d.oSt; }
      closeAll(); render(); toast({ done: "Checked in ✓", noshow: "Marked as no-show. A follow-up text is queued.", cancelled: "Cancelled. The slot is open in the client app again." }[d.oSt]); return;
    }
    if (d.oSrc) { el.parentElement.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === el)); return; }
    if (d.oHide) { const s = svcById(d.oHide); const real = Y.C.categories.flatMap((c) => c.services).find((x) => x.id === s.id); real.hidden = !real.hidden; Y.render(); render(); toast(real.hidden ? `${real.name} hidden from the client app` : `${real.name} is bookable again`); return; }
    if (d.oOff) { const list = court ? C.courts : C.staff; const p = list.find((x) => x.id === d.oOff); p.off = !p.off; if (court) p.closed = p.off; Y.render(); render(); toast(p.off ? `${p.name} blocked in the client app today` : `${p.name} is bookable again`); return; }
    if (d.oPub) { const x = O._ideas[+d.oPub]; Object.assign(C.pack, { label: "New package", title: x.title, body: x.body, price: x.price, was: x.was, toast: `${x.title} added to your account.` }); Y.render(); render(); toast("Published. It's now on the client app's home screen."); return; }
    if (d.oAi) { O.ai[d.oAi] = !O.ai[d.oAi]; el.setAttribute("aria-pressed", O.ai[d.oAi]); return; }
    if (d.oRule) { O.rules[d.oRule] = !O.rules[d.oRule]; el.setAttribute("aria-pressed", O.rules[d.oRule]); return; }
    if (d.oBrand != null) { O.brand = d.oBrand || null; const r = document.documentElement.style; if (O.brand) { r.setProperty("--p", O.brand); r.setProperty("--hero", `linear-gradient(135deg, ${O.brand}, color-mix(in srgb, ${O.brand} 60%, #ffffff))`); r.setProperty("--p-text", `color-mix(in srgb, ${O.brand} 80%, #000)`); } else { r.removeProperty("--p"); r.removeProperty("--hero"); r.removeProperty("--p-text"); } render(); return; }
    switch (d.oAct) {
      case "close": closeAll(); break;
      case "new": newModal(); break;
      case "bell": O.sec = "cal"; O.date = iso(today); render(); break;
      case "save-new": {
        const name = document.getElementById("nb-c").value.trim() || "Walk-in client";
        const s = svcById(document.getElementById("nb-s").value), col = document.getElementById("nb-w").value, t = +document.getElementById("nb-t").value;
        const src = (root.querySelector('#nb-src [aria-pressed="true"]') || {}).dataset?.oSrc || "Walk-in";
        genDay(O.date).push({ id: "n" + Date.now(), col, t, dur: durOf(s), title: s.name, client: name, src, c: COLORS[hash(name) % COLORS.length], price: s.price, status: "booked" });
        closeAll(); render(); toast(`Saved. ${name} gets a confirmation text.`); break;
      }
      case "toast": toast(d.oMsg); break;
      case "rebook": toast("Rebook texts sent. Clients get a one-tap link to their usual time."); break;
      case "fill": toast("Waitlist notified. First to tap gets the slot."); break;
      case "review": toast("Review requests sent to 5 happy clients."); break;
      case "sent": toast("Done. You'll see results in Reports."); el.textContent = "✓ On"; break;
      case "export": toast("Your CSV is ready. In the real app it downloads straight away."); break;
      case "publish-idea": O.sec = "packs"; render(); break;
      case "add-svc": { const cat = C.categories[0]; const n = cat.services.length + 1; cat.services.push({ id: "new" + Date.now(), name: "New service " + n, em: "⭐", sw: "var(--tint)", price: 50, dur: "45 min", desc: "Describe it for clients." }); Y.render(); render(); toast("Added. Rename it and set a price."); break; }
      case "see-client": setMode("client"); break;
    }
  });
  root.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); if (e.key === "Enter" && e.target.matches("tr[data-o-client]")) clientDrawer(e.target.dataset.oClient); });
  root.addEventListener("input", (e) => {
    const t = e.target, d = t.dataset;
    if (t.id === "o-q") { O.q = t.value; const pos = t.selectionStart; render(); const n = document.getElementById("o-q"); n.focus(); n.setSelectionRange(pos, pos); return; }
    if (d.oSvc) { const s = C.categories.flatMap((c) => c.services).find((x) => x.id === d.oSvc); if (d.oF === "price") s.price = Math.max(0, +t.value || 0); else s.name = t.value; Y.render(); return; }
    if (d.oAdd) { const a = C.addons.find((x) => x.id === d.oAdd); a.price = Math.max(0, +t.value || 0); Y.render(); return; }
    if (d.oFaq != null) { C.faq[+d.oFaq].a = t.value; return; }
    if (d.oName != null) { C.name = t.value || " "; Y.render(); root.querySelector(".o-side .logo").lastChild.textContent = C.name; }
  });

  // ---------- mode switch ----------
  const bar = document.getElementById("modebar"), wrap = document.querySelector(".wrap");
  function setMode(m) {
    const own = m === "owner";
    document.body.classList.toggle("is-owner", own);
    wrap.hidden = own; root.hidden = !own;
    bar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.mode === m));
    if (own) { CLIENTS = null; render(); } else Y.render();
    window.scrollTo(0, 0);
  }
  bar.addEventListener("click", (e) => { const b = e.target.closest("button[data-mode]"); if (b) setMode(b.dataset.mode); });
  if (location.hash === "#owner") setMode("owner");
  window.YBO = { setMode };
})();
