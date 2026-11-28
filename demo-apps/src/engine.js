/* Shared booking-app engine. Each sample business supplies window.CFG; this file renders the whole app. */
(function () {
  const C = window.CFG;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => "$" + (Math.round(n * 100) / 100).toFixed(n % 1 ? 2 : 0);
  const DAY = 864e5;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const addDays = (d, n) => new Date(d.getTime() + n * DAY);
  const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const fromIso = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const fmtDay = (d, o = { weekday: "short", month: "short", day: "numeric" }) => d.toLocaleDateString("en-CA", o);
  const fmtTime = (m) => { const h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? "PM" : "AM"; return ((h + 11) % 12 + 1) + ":" + String(mm).padStart(2, "0") + " " + ap; };
  const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const allServices = () => C.categories.flatMap((c) => c.services.map((s) => ({ ...s, cat: c.id })));
  const svcById = (id) => allServices().find((s) => s.id === id);
  const staffById = (id) => C.staff && C.staff.find((s) => s.id === id);
  const store = { get(k, d) { try { const v = localStorage.getItem(C.id + ":" + k); return v ? JSON.parse(v) : d; } catch { return d; } }, set(k, v) { try { localStorage.setItem(C.id + ":" + k, JSON.stringify(v)); } catch {} } };

  // ---------- state ----------
  const seed = () => C.seedBookings.map((b, i) => ({ id: "seed" + i, ...b, date: iso(addDays(today, b.inDays)) }));
  const S = { tab: "home", flow: null, done: null, bookings: store.get("bookings", null) || seed(), chat: null, ownerExtra: [] };
  const save = () => store.set("bookings", S.bookings);

  // ---------- slots ----------
  function slotsFor(dateIso, key) {
    const out = [];
    const d = fromIso(dateIso);
    const closed = C.closedDays && C.closedDays.includes(d.getDay());
    const now = new Date(); const nowMin = now.getHours() * 60 + now.getMinutes();
    for (let m = C.hours.open; m <= C.hours.close - C.hours.step; m += C.hours.step) {
      const taken = closed || hash(dateIso + key + m) % 100 < (C.busy || 42) || (dateIso === iso(today) && m < nowMin + 60);
      const mine = S.bookings.some((b) => b.date === dateIso && b.start === m && (b.key || "") === key);
      out.push({ m, taken: taken || mine });
    }
    return out;
  }
  function firstFree(key, filter, n = 3, fromDay = 0) {
    const res = [];
    for (let i = fromDay; i < fromDay + 14 && res.length < n; i++) {
      const di = iso(addDays(today, i));
      for (const s of slotsFor(di, key)) if (!s.taken && (!filter || filter(s.m)) && res.length < n) res.push({ date: di, m: s.m });
      if (filter && filter.oneDay && res.length) break;
    }
    return res;
  }

  // ---------- price ----------
  function flowPrice(f) {
    let p = 0;
    if (C.mode === "court") { const sp = svcById(f.service); p = sp ? sp.price * (f.hours || 0) : 0; }
    else { const s = svcById(f.service); if (s) p = s.price + (f.pet && s.bySize ? s.bySize[petById(f.pet).size] || 0 : 0); }
    for (const a of f.addons || []) { const ad = C.addons.find((x) => x.id === a); if (ad) p += ad.per === "player" ? ad.price * (f.players || 1) : ad.price; }
    if (f.member) p = p * (1 - C.memberDiscount);
    return p;
  }
  const petById = (id) => C.pets.find((p) => p.id === id);

  // ---------- render root ----------
  const app = $("#app");
  function render() {
    const scr = $(".screen", app);
    const keep = scr && S._keepScroll ? scr.scrollTop : 0;
    let body = "";
    if (S.done) body = viewDone();
    else if (S.tab === "home") body = viewHome();
    else if (S.tab === "book") body = S.flow ? viewFlow() : (startFlow(), viewFlow());
    else if (S.tab === "ai") body = viewChat();
    else if (S.tab === "mine") body = viewMine();
    else if (S.tab === "owner") body = viewOwner();
    app.innerHTML = body + tabbar() + '<div class="toast" id="toast" role="status" aria-live="polite"></div>';
    const s2 = $(".screen", app);
    if (s2) s2.scrollTop = keep;
    S._keepScroll = false;
    if (S.tab === "ai" && !S.done) { const m = $(".msgs", app); if (m) m.scrollTop = m.scrollHeight; }
  }
  function tabbar() {
    const t = [["home", "🏠", "Home"], ["book", "📅", "Book"], ["ai", "✦", C.ai.short], ["mine", "🧾", "My visits"]];
    return '<nav class="tabbar" aria-label="App sections">' + t.map(([id, ic, l]) => `<button data-tab="${id}" class="${id === "ai" ? "ai" : ""}" ${S.tab === id && !S.done ? 'aria-current="page"' : ""}><span aria-hidden="true">${ic}</span>${esc(l)}</button>`).join("") + "</nav>";
  }
  let toastT;
  function toast(msg) { const t = $("#toast"); if (!t) return; t.textContent = msg; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 2600); }

  // ---------- home ----------
  function heroHtml() {
    const book = `<button class="btn alt" data-act="book">${esc(C.bookLabel)}</button>`;
    const ask = `<button class="btn glass" data-tab="ai">✦ Ask ${esc(C.ai.short)}</button>`;
    const sk = C.skin;
    if (sk === "spa") return `<section class="hero hero-arch"><div class="arch" aria-hidden="true"><span class="sun"></span><span class="leaf l1"></span><span class="leaf l2"></span><span class="stone s1"></span><span class="stone s2"></span><span class="stone s3"></span></div>
        <div class="htxt"><div class="rating">${esc(C.city)} · ★ ${C.rating} · ${esc(C.reviews)}</div><h2>${esc(C.heroTitle)}</h2><p>${esc(C.heroSub)}</p><div class="btns">${book}${ask}</div></div></section>`;
    if (sk === "courts") {
      const now = new Date(); const m0 = Math.max(C.hours.open, Math.ceil((now.getHours() * 60 + now.getMinutes()) / 60) * 60);
      const sb = C.categories[0].services.map((sp) => { const cs = C.courts.filter((c) => !c.closed && c.sports.includes(sp.id)); const free = cs.filter((c) => !(hash(iso(today) + c.id + sp.id + m0) % 100 < (C.busy || 45))).length; return `<div class="sbx"><small>${esc(sp.name)}</small><b>${free}<i>/${cs.length}</i></b><small>courts free ${m0 < C.hours.close ? "at " + fmtTime(m0) : "tomorrow"}</small></div>`; }).join("");
      return `<section class="hero hero-score"><div class="stripes" aria-hidden="true"></div><div class="rating">● LIVE · ${esc(C.city)} · ★ ${C.rating}</div><h2>${esc(C.heroTitle)}</h2><div class="board">${sb}</div><p>${esc(C.heroSub)}</p><div class="btns">${book}${ask}</div></section>`;
    }
    if (sk === "physio") {
      const nx = firstFree("any", null, 1)[0];
      return `<section class="hero hero-split"><div class="rating">★ ${C.rating} · ${esc(C.reviews)} · ${esc(C.city)}</div><h2>${esc(C.heroTitle)}</h2><p>${esc(C.heroSub)}</p>
        <div class="trust"><span>✓ Direct billing</span><span>✓ No referral needed</span><span>✓ Same-week visits</span></div>
        ${nx ? `<button class="nextfree" data-act="book"><span><small>Next available</small><b>${nx.date === iso(today) ? "Today" : fmtDay(fromIso(nx.date), { weekday: "long" })} · ${fmtTime(nx.m)}</b></span><span class="go">Book ›</span></button>` : ""}
        <div class="btns">${book}${ask}</div></section>`;
    }
    if (sk === "pets") return `<section class="hero hero-sticker"><div class="stk" aria-hidden="true">${C.heroArt}</div><div class="burst" aria-hidden="true">Photo<br>when<br>ready!</div><div class="rating">★ ${C.rating} · ${esc(C.reviews)}</div><h2>${esc(C.heroTitle)}</h2><p>${esc(C.heroSub)}</p><div class="btns">${book}${ask}</div></section>`;
    return `<section class="hero"><div class="art" aria-hidden="true">${C.heroArt}</div><div class="rating">★ ${C.rating} · ${esc(C.reviews)} · ${esc(C.city)}</div><h2>${esc(C.heroTitle)}</h2><p>${esc(C.heroSub)}</p><div class="btns">${book}${ask}</div></section>`;
  }

  function viewHome() {
    const pop = allServices().filter((s) => s.popular && !s.hidden);
    const up = upcoming()[0];
    return `<div class="screen">
      <div class="topbar"><div class="logo"><i aria-hidden="true">${C.logoMark}</i>${esc(C.name)}</div><button class="iconbtn" data-tab="ai" aria-label="Open the ${esc(C.ai.name)}">💬</button></div>
      ${heroHtml()}
      ${up ? `<div class="sec"><h3>Your next visit</h3>${bookingCard(up)}</div>` : ""}
      <div class="sec"><div class="pack"><div class="lbl">${esc(C.pack.label)}</div><h4>${esc(C.pack.title)}</h4><p>${esc(C.pack.body)}</p>
        <div class="row2"><div class="price">${money(C.pack.price)}<s>${money(C.pack.was)}</s></div><button class="btn" data-act="pack">${esc(C.pack.cta)}</button></div></div></div>
      <div class="sec"><h3>${esc(C.popularTitle)} <small>${esc(C.popularHint || "")}</small></h3><div class="hscroll">
        ${pop.map((s) => `<button class="tile" data-act="book" data-svc="${s.id}"><div class="sw" style="background:${s.sw}" aria-hidden="true">${s.em}</div><b>${esc(s.name)}</b><span>${s.from ? "from " : ""}${money(s.price)}${s.dur ? " · " + esc(s.dur) : ""}</span></button>`).join("")}
      </div></div>
      ${C.staff ? `<div class="sec"><h3>${esc(C.teamTitle)}</h3><div class="team">${C.staff.map((p) => `<div class="person"><div class="av" style="background:${p.grad}">${esc(p.name[0])}</div>${esc(p.name)}<small>${esc(p.role)}</small></div>`).join("")}</div></div>` : ""}
      ${C.extraHome || ""}
      <div class="sec"><h3>What clients say</h3><div class="review"><span class="st" aria-label="5 stars">★★★★★</span><br>${esc(C.review.text)}<small>${esc(C.review.who)}</small></div></div>
      <div class="sec" style="padding-bottom:24px"><h3>Visit us</h3><div class="info">${C.info.map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join("")}</div></div>
    </div>`;
  }

  // ---------- booking flow ----------
  function startFlow(pre = {}) {
    S.flow = { i: 0, service: null, addons: [], staff: null, date: null, start: null, hours: 0, court: null, players: C.mode === "court" ? 2 : 1, pet: C.pets ? C.pets[0].id : null, name: C.demoClient.name, phone: C.demoClient.phone, email: C.demoClient.email, reason: "", areas: [], billing: true, member: false, ...pre };
    if (pre.service && C.steps[0] === "service") S.flow.i = 1;
    if (pre.service && C.steps[0] === "pet" && C.steps[1] === "service") S.flow.i = 0;
  }
  const STEPS = {
    pet: { title: "Who's coming in?", ok: (f) => f.pet },
    service: { title: C.serviceTitle || "Choose a service", ok: (f) => f.service },
    addons: { title: C.addonTitle || "Add something extra?", ok: () => true },
    staff: { title: C.staffTitle || "Who would you like?", ok: (f) => f.staff },
    time: { title: "Pick a time", ok: (f) => f.date && f.start != null },
    court: { title: "Grab a court", ok: (f) => f.court && f.hours > 0 },
    players: { title: "Players & extras", ok: () => true },
    intake: { title: "Tell us a little", ok: () => true },
    details: { title: "Your details", ok: (f) => f.name.trim() && f.phone.trim() },
  };
  function viewFlow() {
    const f = S.flow, id = C.steps[f.i], st = STEPS[id];
    const last = f.i === C.steps.length - 1;
    const pct = Math.round(((f.i + 1) / C.steps.length) * 100);
    const price = flowPrice(f);
    const label = last ? (C.payOnline ? `Book & pay ${money(price)}` : "Confirm booking") : "Continue";
    return `<div class="screen"><div class="flowhead"><div class="t">${f.i > 0 ? `<button class="iconbtn" data-act="back" aria-label="Back">‹</button>` : `<button class="iconbtn" data-tab="home" aria-label="Close">✕</button>`}<h2>${esc(st.title)}</h2></div>
      <div class="prog" aria-hidden="true"><i style="width:${pct}%"></i></div><div class="stepno">Step ${f.i + 1} of ${C.steps.length}</div></div>
      <div class="pad" style="padding-top:6px">${STEP_VIEWS[id](f)}</div>
      <div class="foot"><div class="sm">${flowSummaryLine(f)}</div><button class="btn" data-act="next" ${st.ok(f) ? "" : "disabled"}>${label}</button></div></div>`;
  }
  function flowSummaryLine(f) {
    const s = svcById(f.service);
    if (!s) return "Nothing picked yet";
    let when = "";
    if (f.date && f.start != null) when = fmtDay(fromIso(f.date)) + " · " + fmtTime(f.start);
    return `<b>${money(flowPrice(f))}</b>${esc(s.name)}${when ? " · " + when : ""}`;
  }
  const STEP_VIEWS = {
    pet(f) {
      return `<div class="list">${C.pets.map((p) => `<button class="opt" data-set="pet" data-v="${p.id}" aria-pressed="${f.pet === p.id}"><span class="em" style="background:${p.sw}">${p.em}</span><span class="tx"><b>${esc(p.name)}</b><small>${esc(p.breed)} · ${esc(p.sizeLabel)}</small>${p.note ? `<div class="tags"><span>${esc(p.note)}</span></div>` : ""}</span><span class="chk">✓</span></button>`).join("")}
        <button class="opt" data-act="toast" data-msg="New pets get a quick profile: name, breed, size and any notes."><span class="em">➕</span><span class="tx"><b>Add another pet</b><small>Takes 20 seconds</small></span></button></div>
        <p class="note">Saved pet profiles keep breed, size, coat notes and vaccine dates, so you never repeat yourself.</p>`;
    },
    service(f) {
      const cat = f.cat || (svcById(f.service) ? svcById(f.service).cat : C.categories[0].id);
      const c = C.categories.find((x) => x.id === cat);
      const pet = f.pet && petById(f.pet);
      return `${C.categories.length > 1 ? `<div class="tabs" role="group" aria-label="Categories">${C.categories.map((x) => `<button data-set="cat" data-v="${x.id}" aria-pressed="${x.id === cat}">${esc(x.name)}</button>`).join("")}</div>` : ""}
        <div class="list">${c.services.filter((s) => !s.hidden).map((s) => { const p = s.price + (pet && s.bySize ? s.bySize[pet.size] || 0 : 0); return `<button class="opt" data-set="service" data-v="${s.id}" aria-pressed="${f.service === s.id}"><span class="em" style="background:${s.sw}">${s.em}</span><span class="tx"><b>${esc(s.name)}${s.popular ? '<span class="pill">Popular</span>' : ""}</b><small>${esc(s.desc)}</small></span><span class="pr">${money(p)}<small>${esc(s.dur || (C.mode === "court" ? "per hour" : ""))}</small></span></button>`; }).join("")}</div>
        ${pet && C.sizeNote ? `<p class="note">${esc(C.sizeNote.replace("{pet}", pet.name).replace("{size}", pet.sizeLabel.toLowerCase()))}</p>` : ""}`;
    },
    addons(f) {
      const s = svcById(f.service);
      const tip = s && s.upsell ? C.addons.find((a) => a.id === s.upsell) : null;
      return `${tip ? `<div class="pack" style="margin-bottom:12px"><div class="lbl">Clients who book ${esc(s.name.toLowerCase())} love this</div><h4>${esc(tip.name)}</h4><p>${esc(tip.why)}</p></div>` : ""}
        <div class="list">${C.addons.filter((a) => !a.court).map((a) => `<button class="opt" data-tog="addons" data-v="${a.id}" aria-pressed="${f.addons.includes(a.id)}"><span class="em">${a.em}</span><span class="tx"><b>${esc(a.name)}</b><small>${esc(a.desc)}</small></span><span class="pr">+${money(a.price)}</span><span class="chk">✓</span></button>`).join("")}</div>`;
    },
    staff(f) {
      const s = svcById(f.service);
      const who = C.staff.filter((p) => !p.off && (!p.does || p.does.includes(s.cat)));
      return `<div class="list">${who.map((p) => `<button class="opt" data-set="staff" data-v="${p.id}" aria-pressed="${f.staff === p.id}"><span class="av" style="width:50px;height:50px;margin:0;font-size:19px;background:${p.grad}">${esc(p.name[0])}</span><span class="tx"><b>${esc(p.name)}</b><small>${esc(p.role)} · next free ${nextFreeLabel(p.id)}</small>${p.tags ? `<div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}</span><span class="chk">✓</span></button>`).join("")}
        <button class="opt" data-set="staff" data-v="any" aria-pressed="${f.staff === "any"}"><span class="em">⚡</span><span class="tx"><b>Anyone available</b><small>Fastest way in · next free ${nextFreeLabel("any")}</small></span><span class="chk">✓</span></button></div>`;
    },
    time(f) {
      const key = f.staff || "any";
      if (!f.date) { const ff = firstFree(key, null, 1); f.date = ff.length ? ff[0].date : iso(today); }
      const days = Array.from({ length: 14 }, (_, i) => addDays(today, i));
      const sl = slotsFor(f.date, key);
      const groups = [["Morning", (m) => m < 720], ["Afternoon", (m) => m >= 720 && m < 1020], ["Evening", (m) => m >= 1020]];
      const who = f.staff && f.staff !== "any" ? staffById(f.staff).name : "anyone";
      const body = sl.every((s) => s.taken) ? `<div class="empty">Fully booked this day. Try another day, or ask ${esc(C.ai.short)} to watch for a cancellation.</div>`
        : groups.map(([g, fn]) => { const x = sl.filter((s) => fn(s.m)); return x.length ? `<div class="slotlbl">${g}</div><div class="slots">${x.map((s) => `<button class="slot" data-set="start" data-v="${s.m}" ${s.taken ? "disabled" : ""} aria-pressed="${f.start === s.m}">${fmtTime(s.m).replace(" AM", "").replace(" PM", "")}<span style="font-size:10px;margin-left:2px">${s.m >= 720 ? "PM" : "AM"}</span></button>`).join("")}</div>` : ""; }).join("");
      return `<div class="dates" role="group" aria-label="Day">${days.map((d) => `<button class="date" data-set="date" data-v="${iso(d)}" aria-pressed="${iso(d) === f.date}">${d.toLocaleDateString("en-CA", { weekday: "short" })}<b>${d.getDate()}</b></button>`).join("")}</div>
        <p class="note" style="margin:0 0 12px">Live times for ${esc(who)} on ${fmtDay(fromIso(f.date), { weekday: "long", month: "long", day: "numeric" })}.</p>${body}`;
    },
    court(f) {
      const sport = f.service || C.categories[0].services[0].id;
      f.service = sport;
      if (!f.date) f.date = iso(today);
      const days = Array.from({ length: 10 }, (_, i) => addDays(today, i));
      const cs = C.courts.filter((c) => !c.closed && c.sports.includes(sport));
      const hrs = []; for (let m = C.hours.open; m < C.hours.close; m += 60) hrs.push(m);
      const sv = svcById(sport);
      const sel = (c, m) => f.court === c && m >= f.start && m < f.start + f.hours * 60;
      let g = `<span></span>` + cs.map((c) => `<span class="hd">${esc(c.name)}</span>`).join("");
      const now = new Date(); const nowMin = now.getHours() * 60 + now.getMinutes();
      for (const m of hrs) {
        g += `<span class="hr">${fmtTime(m).replace(":00", "")}</span>`;
        for (const c of cs) {
          const taken = (hash(f.date + c.id + sport + m) % 100 < (C.busy || 45) || (f.date === iso(today) && m < nowMin)) && !sel(c.id, m) || S.bookings.some((b) => b.date === f.date && b.key === c.id && m >= b.start && m < b.start + (b.hours || 1) * 60);
          g += `<button class="cell" data-court="${c.id}" data-m="${m}" ${taken ? "disabled" : ""} aria-pressed="${sel(c.id, m)}" aria-label="${esc(c.name)} ${fmtTime(m)}">${taken ? "Booked" : sel(c.id, m) ? "✓" : money(sv.price)}</button>`;
        }
      }
      return `<div class="tabs" role="group" aria-label="Sport">${C.categories[0].services.map((s) => `<button data-set="sport" data-v="${s.id}" aria-pressed="${s.id === sport}">${s.em} ${esc(s.name)}</button>`).join("")}</div>
        <div class="dates" role="group" aria-label="Day">${days.map((d) => `<button class="date" data-set="cdate" data-v="${iso(d)}" aria-pressed="${iso(d) === f.date}">${i0(d)}<b>${d.getDate()}</b></button>`).join("")}</div>
        <div class="cgrid" style="grid-template-columns:52px repeat(${cs.length},1fr)">${g}</div>
        <div class="legend"><span><i style="background:var(--cell-bg);border:2px solid var(--cell-line)"></i>Free</span><span><i style="background:var(--a)"></i>Yours</span><span><i style="background:var(--line)"></i>Booked</span></div>
        <p class="note">Tap a free hour, then tap the hour below it to play longer. ${esc(sv.desc)}</p>`;
      function i0(d) { return iso(d) === iso(today) ? "Today" : d.toLocaleDateString("en-CA", { weekday: "short" }); }
    },
    players(f) {
      return `<div class="toggle" style="margin-bottom:12px"><span><b>Players</b><br><small style="color:var(--mut)">Everyone gets the booking text</small></span><span class="stepper"><button data-act="pl-" aria-label="Fewer players">–</button><b>${f.players}</b><button data-act="pl+" aria-label="More players">+</button></span></div>
        <div class="list">${C.addons.filter((a) => a.court).map((a) => `<button class="opt" data-tog="addons" data-v="${a.id}" aria-pressed="${f.addons.includes(a.id)}"><span class="em">${a.em}</span><span class="tx"><b>${esc(a.name)}</b><small>${esc(a.desc)}</small></span><span class="pr">+${money(a.price)}${a.per === "player" ? "<small>each</small>" : ""}</span><span class="chk">✓</span></button>`).join("")}
        <button class="toggle" data-act="member" aria-pressed="${f.member}"><span><b>I'm a member</b><br><small style="color:var(--mut)">Members save ${Math.round(C.memberDiscount * 100)}% on every court</small></span><span class="sw2"></span></button></div>`;
    },
    intake(f) {
      return `<div class="field"><label for="reason">What brings you in?</label><textarea id="reason" data-in="reason" placeholder="${esc(C.intake.placeholder)}">${esc(f.reason)}</textarea></div>
        <div class="field"><label>Where does it bother you?</label><div class="chips">${C.intake.areas.map((a) => `<button class="chip" data-tog="areas" data-v="${esc(a)}" aria-pressed="${f.areas.includes(a)}">${esc(a)}</button>`).join("")}</div></div>
        <button class="toggle" data-act="billing" aria-pressed="${f.billing}"><span><b>${esc(C.intake.billingTitle)}</b><br><small style="color:var(--mut)">${esc(C.intake.billingBody)}</small></span><span class="sw2"></span></button>
        <p class="note">${esc(C.intake.privacy)}</p>`;
    },
    details(f) {
      const s = svcById(f.service);
      const lines = [];
      if (C.mode === "court") {
        const c = C.courts.find((x) => x.id === f.court);
        lines.push([`${s.name} · ${c.name}`, money(s.price * f.hours)], [`${fmtDay(fromIso(f.date))} · ${fmtTime(f.start)}–${fmtTime(f.start + f.hours * 60)}`, `${f.hours} h`], [`${f.players} players`, ""]);
      } else {
        const pet = f.pet && petById(f.pet);
        lines.push([s.name + (pet ? " for " + pet.name : ""), money(s.price + (pet && s.bySize ? s.bySize[pet.size] || 0 : 0))]);
        const who = f.staff && f.staff !== "any" ? staffById(f.staff).name : "first available";
        lines.push([`${fmtDay(fromIso(f.date))} · ${fmtTime(f.start)}`, "with " + who]);
      }
      for (const a of f.addons) { const ad = C.addons.find((x) => x.id === a); lines.push([ad.name + (ad.per === "player" ? " × " + f.players : ""), "+" + money(ad.per === "player" ? ad.price * f.players : ad.price)]); }
      if (f.member) lines.push(["Member discount", "−" + Math.round(C.memberDiscount * 100) + "%"]);
      if (f.billing && C.intake) lines.push(["Direct billing to your insurer", "✓"]);
      return `<div class="field"><label for="nm">Name</label><input id="nm" data-in="name" value="${esc(f.name)}" autocomplete="name"></div>
        <div class="field"><label for="ph">Mobile</label><input id="ph" data-in="phone" value="${esc(f.phone)}" inputmode="tel" autocomplete="tel"></div>
        <div class="field"><label for="em">Email</label><input id="em" data-in="email" value="${esc(f.email)}" inputmode="email" autocomplete="email"></div>
        <div class="summary">${lines.map(([a, b]) => `<div class="ln"><span>${esc(a)}</span><span>${esc(b)}</span></div>`).join("")}<div class="ln tot"><span>Total</span><span>${money(flowPrice(f))}</span></div></div>
        <p class="note">${esc(C.policy)}</p>`;
    },
  };
  function nextFreeLabel(key) {
    const n = firstFree(key, null, 1);
    if (!n.length) return "next week";
    const d = fromIso(n[0].date);
    const dd = n[0].date === iso(today) ? "today" : n[0].date === iso(addDays(today, 1)) ? "tomorrow" : d.toLocaleDateString("en-CA", { weekday: "short" });
    return dd + " " + fmtTime(n[0].m);
  }
  function confirmFlow() {
    const f = S.flow, s = svcById(f.service);
    const b = { id: "b" + Date.now(), service: s.id, title: s.name, date: f.date, start: f.start, price: flowPrice(f), addons: f.addons.slice(), src: "Online" };
    if (C.mode === "court") { const c = C.courts.find((x) => x.id === f.court); Object.assign(b, { key: c.id, hours: f.hours, who: c.name, players: f.players }); }
    else { b.key = f.staff || "any"; b.who = f.staff && f.staff !== "any" ? staffById(f.staff).name : "first available"; if (f.pet) b.pet = petById(f.pet).name; }
    S.bookings.push(b); save();
    S.flow = null; S.done = b;
    render(); confetti();
  }
  function confetti() {
    const box = document.createElement("div"); box.className = "confetti"; box.setAttribute("aria-hidden", "true");
    const cols = C.confetti;
    for (let i = 0; i < 36; i++) { const e = document.createElement("i"); e.style.left = Math.random() * 100 + "%"; e.style.background = cols[i % cols.length]; e.style.animationDelay = Math.random() * 0.5 + "s"; e.style.animationDuration = 1.2 + Math.random() + "s"; box.appendChild(e); }
    app.appendChild(box); setTimeout(() => box.remove(), 2600);
  }
  function viewDone() {
    const b = S.done;
    const when = `${fmtDay(fromIso(b.date), { weekday: "long", month: "long", day: "numeric" })} at ${fmtTime(b.start)}`;
    return `<div class="screen"><div class="done"><div class="tick"><svg viewBox="0 0 24 24" width="56" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>
      <h2>${esc(C.doneTitle.replace("{name}", (S.flow && S.flow.name) || C.demoClient.name.split(" ")[0]).replace("{pet}", b.pet || ""))}</h2>
      <p><b>${esc(b.title)}</b>${b.pet ? " for " + esc(b.pet) : ""} · ${esc(b.who)}<br>${when}${b.hours ? ` · ${b.hours} h` : ""}</p>
      ${C.mode === "court" ? '<div class="pass" aria-label="Check-in code"></div><p class="note">Show this code at the front desk to check in.</p>' : ""}
      <div class="perks">${C.donePerks.map((p) => `<div>${p}</div>`).join("")}</div>
      <div style="display:grid;gap:8px;margin-top:18px"><button class="btn block" data-act="see-mine">See my visits</button><button class="btn ghost block" data-act="home">Back to home</button></div></div></div>`;
  }

  // ---------- my bookings ----------
  const upcoming = () => S.bookings.filter((b) => fromIso(b.date) >= today && !b.cancelled).sort((a, b) => a.date.localeCompare(b.date) || a.start - b.start);
  function bookingCard(b, acts = true) {
    const d = fromIso(b.date);
    const rel = b.date === iso(today) ? "Today" : b.date === iso(addDays(today, 1)) ? "Tomorrow" : fmtDay(d, { weekday: "long" });
    return `<div class="bk${fromIso(b.date) < today ? " past" : ""}"><span class="when">${rel} · ${fmtDay(d, { month: "short", day: "numeric" })} · ${fmtTime(b.start)}</span><b>${esc(b.title)}${b.pet ? " for " + esc(b.pet) : ""}</b><small>${esc(b.who)}${b.hours ? " · " + b.hours + " h" : ""} · ${money(b.price)}</small>
      ${acts && fromIso(b.date) >= today ? `<div class="acts"><button data-act="resched" data-id="${b.id}">Move it</button><button data-act="cancel" data-id="${b.id}">Cancel</button>${C.mode === "court" ? `<button data-act="toast" data-msg="Invite link copied. Friends can split the cost.">Invite</button>` : ""}</div>` : ""}</div>`;
  }
  function viewMine() {
    const up = upcoming();
    const past = S.bookings.filter((b) => fromIso(b.date) < today).sort((a, b) => b.date.localeCompare(a.date));
    return `<div class="screen"><div class="flowhead"><h2>My visits</h2></div><div class="pad" style="padding-top:4px">
      <div class="list">${up.length ? up.map((b) => bookingCard(b)).join("") : `<div class="empty">No upcoming visits.<br><br><button class="btn" data-act="book">${esc(C.bookLabel)}</button></div>`}</div>
      <div class="sec" style="padding:22px 0 0"><div class="pack"><div class="lbl">${esc(C.loyalty.label)}</div><h4>${esc(C.loyalty.title)}</h4><p>${esc(C.loyalty.body)}</p>
        <div class="prog" style="margin-top:12px;height:10px"><i style="width:${C.loyalty.pct}%"></i></div></div></div>
      ${past.length ? `<div class="sec" style="padding:22px 0 0"><h3>Past visits</h3><div class="list">${past.map((b) => bookingCard(b, false) .replace("</small>", `</small><div class="acts"><button data-act="rebook" data-id="${b.id}">Book again</button></div>`)).join("")}</div></div>` : ""}
    </div></div>`;
  }

  // ---------- owner / front desk ----------
  function viewOwner() {
    const O = C.owner;
    const mineToday = S.bookings.filter((b) => b.date === iso(today) && !b.cancelled && !String(b.id).startsWith("seed"));
    const extra = S.ownerExtra;
    const rows = [...O.agenda.map((a) => ({ ...a })), ...extra, ...mineToday.map((b) => ({ t: b.start, title: b.title + (b.pet ? " · " + b.pet : ""), who: C.demoClient.name + " · " + b.who, src: b.src, c: "var(--a)", isNew: true }))].sort((a, b) => a.t - b.t);
    const count = rows.length, rev = O.revenue + extra.reduce((s, x) => s + (x.price || 0), 0) + mineToday.reduce((s, b) => s + b.price, 0);
    const online = Math.round((rows.filter((r) => r.src !== "Walk-in" && r.src !== "Phone").length / count) * 100);
    const max = Math.max(...O.top.map((t) => t[1]));
    return `<div class="screen"><div class="flowhead"><div class="t" style="justify-content:space-between"><h2>Front desk</h2><span class="premium" style="margin:0;background:var(--tint);color:var(--p-text,var(--p))">Owner view</span></div><div class="stepno">${fmtDay(today, { weekday: "long", month: "long", day: "numeric" })} · ${esc(O.place)}</div></div>
      <div class="pad" style="padding-top:4px">
      <div class="stats"><div class="stat"><b>${count}</b><small>${esc(O.unit)} today</small></div><div class="stat"><b>${money(rev)}</b><small>booked revenue</small></div><div class="stat"><b>${online}%</b><small>booked online</small></div></div>
      <div class="sec" style="padding:20px 0 0"><h3>Today <small><button data-act="sim" style="color:inherit;font-weight:800">+ Simulate online booking</button></small></h3><div class="agenda">
        ${rows.map((r) => `<div class="ag${r.isNew ? " new" : ""}" style="--c:${r.c}"><span class="tm">${fmtTime(r.t)}</span><span><b>${esc(r.title)}</b><small>${esc(r.who)}</small></span><span class="src">${esc(r.src)}</span></div>`).join("")}
      </div></div>
      <div class="sec" style="padding:20px 0 0"><h3>What clients buy most <small>last 90 days</small></h3><div class="bars">${O.top.map(([n, v]) => `<div class="bar"><b style="font-weight:600">${esc(n)}</b><span><i style="width:${Math.round((v / max) * 100)}%"></i></span><em>${v}</em></div>`).join("")}</div></div>
      <div class="sec" style="padding:20px 0 0"><div class="pack"><div class="lbl">Package idea from your data</div><h4>${esc(O.idea.title)}</h4><p>${esc(O.idea.body)}</p><div class="row2"><span class="price" style="font-size:15px">${esc(O.idea.stat)}</span><button class="btn" data-act="toast" data-msg="Package published to your booking app.">Publish package</button></div></div></div>
      <div class="sec" style="padding:20px 0 0"><h3>${esc(C.ai.short)} handled for you</h3><div class="info">${O.ai.map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join("")}</div></div>
      <div class="sec" style="padding:20px 0 0"><div class="info"><div><b>Your data</b><span>Every client, booking and payment belongs to you. Export it any time.</span></div></div></div>
    </div></div>`;
  }

  // ---------- AI assistant ----------
  function chatInit() {
    S.chat = { msgs: [], ctx: {}, quick: C.ai.quick, typing: false };
    S.chat.msgs.push({ ai: true, h: esc(C.ai.greeting) });
  }
  function viewChat() {
    if (!S.chat) chatInit();
    const ch = S.chat;
    return `<div class="screen" style="overflow:hidden"><div class="chat"><div class="chead"><div class="bot" aria-hidden="true">✦</div><div><b>${esc(C.ai.name)}</b><small>● Online 24/7 · replies in seconds</small></div><span class="premium">Premium AI</span></div>
      <div class="msgs" aria-live="polite">${ch.msgs.map((m) => `<div class="m ${m.ai ? "ai" : "me"}">${m.h}</div>`).join("")}${ch.typing ? '<div class="m ai"><span class="dots" aria-label="Typing"><i></i><i></i><i></i></span></div>' : ""}</div>
      ${!ch.typing && ch.quick && ch.quick.length ? `<div class="quick">${ch.quick.map((q) => `<button data-q="${esc(q)}">${esc(q)}</button>`).join("")}</div>` : ""}
      <form class="cin" id="cform"><input id="cmsg" placeholder="${esc(C.ai.placeholder)}" autocomplete="off" aria-label="Message the ${esc(C.ai.name)}"><button type="submit" aria-label="Send">↑</button></form></div></div>`;
  }
  function say(text) {
    const ch = S.chat;
    ch.msgs.push({ ai: false, h: esc(text) });
    ch.typing = true; ch.quick = [];
    render(); focusChat();
    setTimeout(() => { const r = brain(text); ch.typing = false; ch.msgs.push({ ai: true, h: r.h }); ch.quick = r.q || []; render(); focusChat(); if (r.after) r.after(); }, 750 + Math.random() * 400);
  }
  function focusChat() { const i = $("#cmsg"); if (i && window.matchMedia("(pointer:fine)").matches) i.focus(); }
  const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  function parseDay(t) {
    if (/\btoday|tonight\b/.test(t)) return 0;
    if (/\btomorrow\b/.test(t)) return 1;
    for (let i = 0; i < 7; i++) if (t.includes(DAYS[i]) || new RegExp("\\b" + DAYS[i].slice(0, 3) + "\\b").test(t)) { const diff = (i - today.getDay() + 7) % 7; return diff === 0 ? 7 : diff; }
    if (/weekend/.test(t)) { const diff = (6 - today.getDay() + 7) % 7; return diff; }
    return null;
  }
  function parsePart(t) {
    if (/morning|\bam\b/.test(t)) return (m) => m < 720;
    if (/afternoon|lunch/.test(t)) return (m) => m >= 720 && m < 1020;
    if (/evening|night|after work|\bpm\b/.test(t)) return (m) => m >= 1020;
    return null;
  }
  function findService(t) {
    let best = null, score = 0;
    for (const s of allServices()) {
      const keys = [s.name.toLowerCase(), ...(s.keys || [])];
      for (const k of keys) if (t.includes(k) && k.length > score) { best = s; score = k.length; }
    }
    return best;
  }
  function slotOffer(s, t) {
    const ctx = S.chat.ctx;
    const day = parseDay(t), part = parsePart(t);
    let key = "any", whoName = "";
    if (C.staff) { const p = C.staff.find((x) => t.includes(x.name.toLowerCase())); if (p) { key = p.id; whoName = p.name; } }
    let offers = [];
    if (C.mode === "court") {
      const cs = C.courts.filter((c) => c.sports.includes(s.id));
      const from = day ?? 0;
      for (let i = from; i < from + 7 && offers.length < 3; i++) {
        const di = iso(addDays(today, i));
        for (let m = C.hours.open; m < C.hours.close && offers.length < 3; m += 60) {
          if (part && !part(m)) continue;
          if (di === iso(today) && m < new Date().getHours() * 60 + 60) continue;
          const c = cs.find((c) => !(hash(di + c.id + s.id + m) % 100 < (C.busy || 45)) && !S.bookings.some((b) => b.date === di && b.key === c.id && b.start === m));
          if (c) offers.push({ date: di, m, court: c.id, label: `${c.name} · ${fmtTime(m)}` });
        }
        if (offers.length && day != null) break;
      }
    } else {
      const f = part || null;
      offers = firstFree(key, f, 3, day ?? 0).map((o) => ({ ...o, label: fmtTime(o.m) }));
      if (day != null) offers = offers.filter((o) => o.date === offers[0].date);
    }
    ctx.service = s.id; ctx.offers = offers; ctx.key = key; ctx.stage = "slot";
    if (!offers.length) return { h: `I couldn't find a free ${esc(s.name.toLowerCase())} then. Want me to put you on the cancellation list? I'll text you the second one opens.`, q: ["Yes, add me", "Try next week"] };
    const d0 = fromIso(offers[0].date);
    const dayLabel = offers[0].date === iso(today) ? "today" : offers[0].date === iso(addDays(today, 1)) ? "tomorrow" : fmtDay(d0, { weekday: "long", month: "short", day: "numeric" });
    const petP = C.pets ? C.pets.find((p) => t.includes(p.name.toLowerCase())) || C.pets[0] : null;
    ctx.pet = petP && petP.id;
    const pet = petP ? ` for ${petP.name}` : "";
    const who = C.mode === "court" ? "" : whoName ? ` with ${whoName}` : C.staff ? " with our team" : "";
    return { h: `${C.ai.yes} <b>${esc(s.name)}</b>${pet}${who} has these times ${dayLabel}:`, q: offers.map((o) => o.label).concat(["Other times"]) };
  }
  function makeBooking(ctx) {
    const s = svcById(ctx.service), o = ctx.slot;
    const b = { id: "b" + Date.now(), service: s.id, title: s.name, date: o.date, start: o.m, src: "AI assistant", addons: ctx.addon ? [ctx.addon] : [] };
    let price = s.price;
    if (C.mode === "court") { const c = C.courts.find((x) => x.id === o.court); Object.assign(b, { key: c.id, hours: 1, who: c.name, players: 2 }); }
    else {
      b.key = ctx.key; b.who = ctx.key !== "any" ? staffById(ctx.key).name : C.staff ? pickStaff(s) : "our team";
      if (C.pets) { const p = petById(ctx.pet) || C.pets[0]; b.pet = p.name; price += s.bySize ? s.bySize[p.size] || 0 : 0; }
    }
    if (ctx.addon) price += C.addons.find((a) => a.id === ctx.addon).price;
    b.price = price;
    S.bookings.push(b); save();
    return b;
  }
  function pickStaff(s) { const who = C.staff.filter((p) => !p.does || p.does.includes(s.cat)); return who[hash(s.id) % who.length].name; }
  function brain(raw) {
    const t = raw.toLowerCase().trim();
    const ctx = S.chat.ctx;
    // pending answers
    if (ctx.stage === "slot") {
      const o = (ctx.offers || []).find((x) => x.label.toLowerCase() === t);
      if (o) {
        ctx.slot = o;
        const s = svcById(ctx.service);
        const ad = s.upsell && C.addons.find((a) => a.id === s.upsell);
        if (ad) { ctx.stage = "upsell"; ctx.addonOffer = ad.id; return { h: `${esc(fmtTime(o.m))} is yours to grab. ${esc(ad.why)} Add <b>${esc(ad.name)}</b> for ${money(ad.price)}?`, q: ["Yes, add it", "No thanks"] }; }
        return finish(ctx);
      }
      if (/other|later|next week|different/.test(t)) { return slotOffer(svcById(ctx.service), /next week/.test(t) ? "in 7 days " + DAYS[(today.getDay()) % 7] : DAYS[(today.getDay() + 3) % 7]); }
    }
    if (ctx.stage === "upsell") {
      if (/^(yes|yeah|sure|ok|add)/.test(t)) { ctx.addon = ctx.addonOffer; return finish(ctx); }
      if (/^(no|nah|skip)/.test(t)) { ctx.addon = null; return finish(ctx); }
    }
    if (ctx.stage === "cancel") {
      ctx.stage = null;
      if (/^yes/.test(t)) { const b = S.bookings.find((x) => x.id === ctx.cancelId); b.cancelled = true; save(); return { h: `Done. Your ${esc(b.title.toLowerCase())} is cancelled and the slot is open for someone on the waitlist. No fee, since it's more than ${esc(C.cancelWindow)} away.`, q: ["Book something new", "Thanks!"] }; }
      return { h: "No problem, it's still booked. See you then!", q: C.ai.quick };
    }
    if (/yes, add me|waitlist|cancellation list/.test(t)) return { h: `You're on the list. The moment a spot opens I'll text ${esc(C.demoClient.phone)} and hold it for 15 minutes.`, q: ["Thanks!"] };
    if (/^(thanks|thank you|thx|great|perfect|awesome)/.test(t)) return { h: C.ai.bye, q: C.ai.quick };
    if (/cancel/.test(t)) {
      const up = upcoming()[0];
      if (!up) return { h: "You don't have anything booked right now. Want to book something?", q: C.ai.quick };
      ctx.stage = "cancel"; ctx.cancelId = up.id;
      return { h: `Your next visit is <b>${esc(up.title)}</b> on ${fmtDay(fromIso(up.date), { weekday: "long", month: "short", day: "numeric" })} at ${fmtTime(up.start)}. Cancel it?`, q: ["Yes, cancel it", "Keep it"] };
    }
    if (/move|reschedul|change my/.test(t)) {
      const up = upcoming()[0];
      if (!up) return { h: "You don't have anything booked to move. Want to book something?", q: C.ai.quick };
      up.cancelled = true; save();
      const r = slotOffer(svcById(up.service), t.includes("week") ? "next week" : DAYS[(today.getDay() + 2) % 7]);
      r.h = `Sure, I'll move your <b>${esc(up.title)}</b>. ` + r.h.replace(C.ai.yes + " ", "");
      return r;
    }
    for (const f of C.faq) if (f.keys.some((k) => t.includes(k))) return { h: f.a, q: f.q || C.ai.quick };
    const s = findService(t);
    if (s) return slotOffer(s, t);
    if (/book|appointment|available|opening|free|slot|spot|court|session/.test(t) || parseDay(t) != null) {
      ctx.stage = "svc"; ctx.pendingText = t;
      return { h: C.ai.askService, q: allServices().filter((x) => x.popular).map((x) => x.name) };
    }
    if (/price|cost|how much|\$/.test(t)) return { h: "Here are our most booked options:<br>" + allServices().filter((x) => x.popular).map((x) => `• ${esc(x.name)}: ${x.from ? "from " : ""}${money(x.price)}${C.mode === "court" ? "/hour" : ""}`).join("<br>"), q: ["Book one", "Packages"] };
    if (/^(hi|hello|hey|yo)\b/.test(t)) return { h: C.ai.hello, q: C.ai.quick };
    if (/book one|book something|book a/.test(t)) return { h: C.ai.askService, q: allServices().filter((x) => x.popular).map((x) => x.name) };
    return { h: `Good question. I'll pass that to the team and they'll text you back within the hour. Meanwhile I can book, move or cancel visits, or answer questions about prices, hours and parking.`, q: C.ai.quick };
  }
  function finish(ctx) {
    const b = makeBooking(ctx);
    ctx.stage = null;
    const s = svcById(b.service);
    const card = `<div class="card"><b style="color:var(--ok-ink)">✓ Booked</b><br><b>${esc(b.title)}${b.addons.length ? " + " + esc(C.addons.find((a) => a.id === b.addons[0]).name.toLowerCase()) : ""}</b>${b.pet ? " for " + esc(b.pet) : ""}<br>${fmtDay(fromIso(b.date), { weekday: "short", month: "short", day: "numeric" })} · ${fmtTime(b.start)} · ${esc(b.who)}<br>${money(b.price)} · ${esc(C.ai.remind)}</div>`;
    return { h: `${esc(C.ai.done)}${card}`, q: ["Add to my calendar", "Thanks!"], after: () => toast("New booking added to My visits") };
  }

  // ---------- events ----------
  app.addEventListener("click", (e) => {
    const el = e.target.closest("button"); if (!el) return;
    const d = el.dataset;
    if (d.tab) { S.done = null; S.tab = d.tab; if (d.tab === "book" && !S.flow) startFlow(); render(); return; }
    if (d.q) {
      if (d.q === "Add to my calendar") { S.chat.msgs.push({ ai: false, h: "Add to my calendar" }); S.chat.msgs.push({ ai: true, h: "Added 📅 You'll also get a reminder text the day before." }); S.chat.quick = ["Thanks!"]; render(); return; }
      if (S.chat.ctx.stage === "svc") { const s = allServices().find((x) => x.name === d.q); if (s) { S.chat.msgs.push({ ai: false, h: esc(d.q) }); S.chat.typing = true; S.chat.quick = []; render(); setTimeout(() => { const r = slotOffer(s, S.chat.ctx.pendingText || ""); S.chat.typing = false; S.chat.msgs.push({ ai: true, h: r.h }); S.chat.quick = r.q; render(); }, 700); return; } }
      say(d.q); return;
    }
    const f = S.flow;
    if (d.set && f) {
      const v = d.v;
      if (d.set === "cat") f.cat = v;
      else if (d.set === "service") { f.service = v; f.cat = svcById(v).cat; }
      else if (d.set === "staff") { f.staff = v; f.date = null; f.start = null; }
      else if (d.set === "date") { f.date = v; f.start = null; }
      else if (d.set === "start") f.start = +v;
      else if (d.set === "pet") f.pet = v;
      else if (d.set === "sport") { f.service = v; f.court = null; f.hours = 0; f.start = null; }
      else if (d.set === "cdate") { f.date = v; f.court = null; f.hours = 0; f.start = null; }
      S._keepScroll = true; render(); return;
    }
    if (d.court && f) {
      const m = +d.m;
      if (f.court === d.court && m === f.start + f.hours * 60 && f.hours < 3) f.hours++;
      else if (f.court === d.court && m >= f.start && m < f.start + f.hours * 60) { f.hours = m === f.start ? 0 : (m - f.start) / 60; if (!f.hours) f.court = null; }
      else { f.court = d.court; f.start = m; f.hours = 1; }
      S._keepScroll = true; render(); return;
    }
    if (d.tog && f) { const arr = f[d.tog]; const i = arr.indexOf(d.v); i < 0 ? arr.push(d.v) : arr.splice(i, 1); S._keepScroll = true; render(); return; }
    switch (d.act) {
      case "book": S.done = null; startFlow(d.svc ? { service: d.svc } : {}); S.tab = "book"; render(); break;
      case "pack": toast(C.pack.toast); break;
      case "back": f.i--; render(); break;
      case "next": if (f.i === C.steps.length - 1) confirmFlow(); else { f.i++; render(); $(".screen", app).scrollTop = 0; } break;
      case "pl-": f.players = Math.max(1, f.players - 1); S._keepScroll = true; render(); break;
      case "pl+": f.players = Math.min(C.maxPlayers || 8, f.players + 1); S._keepScroll = true; render(); break;
      case "member": f.member = !f.member; S._keepScroll = true; render(); break;
      case "billing": f.billing = !f.billing; S._keepScroll = true; render(); break;
      case "toast": toast(d.msg); break;
      case "see-mine": S.done = null; S.tab = "mine"; render(); break;
      case "home": S.done = null; S.tab = "home"; render(); break;
      case "cancel": { const b = S.bookings.find((x) => x.id === d.id); b.cancelled = true; save(); render(); toast("Cancelled. Your slot is open for the waitlist."); break; }
      case "resched": { const b = S.bookings.find((x) => x.id === d.id); b.cancelled = true; save(); startFlow({ service: b.service }); if (C.mode !== "court") { S.flow.staff = b.key; S.flow.i = C.steps.indexOf("time"); } else S.flow.i = C.steps.indexOf("court"); S.tab = "book"; render(); toast("Pick a new time. Your old one is released."); break; }
      case "rebook": { const b = S.bookings.find((x) => x.id === d.id); startFlow({ service: b.service, addons: (b.addons || []).slice() }); if (C.mode !== "court") { S.flow.staff = b.key; S.flow.i = C.steps.indexOf("time"); } else S.flow.i = C.steps.indexOf("court"); S.tab = "book"; render(); break; }
      case "sim": { const x = C.owner.sim[S.ownerExtra.length % C.owner.sim.length]; S.ownerExtra.push({ ...x, isNew: true }); S._keepScroll = true; render(); toast("🔔 New online booking: " + x.who.split(" · ")[0]); break; }
    }
  });
  app.addEventListener("input", (e) => { const d = e.target.dataset; if (d.in && S.flow) { S.flow[d.in] = e.target.value; const b = $('[data-act="next"]', app); if (b) b.disabled = !STEPS[C.steps[S.flow.i]].ok(S.flow); } });
  app.addEventListener("submit", (e) => { e.preventDefault(); const i = $("#cmsg"); const v = i.value.trim(); if (v) say(v); });

  if (location.hash === "#assistant") S.tab = "ai";
  if (location.hash === "#book") { S.tab = "book"; startFlow(); }
  if (C.skin) document.body.classList.add("skin-" + C.skin);
  window.YB = { C, S, render, toast, esc, money, iso, fromIso, addDays, today, fmtDay, fmtTime, hash, allServices, svcById, staffById, save, upcoming, slotsFor, petById };
  render();
})();
