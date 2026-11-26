export const file = "smash-club-courts";
export const title = "Smash Club Courts";
export const fonts = "family=Unbounded:wght@600;800&family=Manrope:wght@400;500;600;700;800";
export const theme = `
:root {
  --p: #1d3bd1; --p-ink: #ffffff; --p-text: #1d3bd1;
  --a: #c6f432; --a-ink: #0b1440;
  --bg: #f4f7ff; --sf: #ffffff; --ink: #0b1440; --mut: #58627f; --line: #dfe5f5; --tint: #e8eeff;
  --ok: #12a150; --ok-ink: #0d7a3c;
  --hero: linear-gradient(135deg, #1d3bd1 0%, #2563eb 45%, #00b4d8 100%);
  --cta: #c6f432; --cta-ink: #0b1440;
  --pack-bg: linear-gradient(135deg, #fff3d6, #ffe1d1); --pack-line: #ffcf9e; --pack-lbl: #d9480f;
  --backdrop: radial-gradient(circle at 10% 85%, #c6f432 0, transparent 28%), radial-gradient(circle at 90% 10%, #ff6b1a 0, transparent 28%), radial-gradient(circle at 80% 95%, #00b4d8 0, transparent 30%), linear-gradient(135deg, #0b1440, #1d3bd1);
  --pitch-ink: #ffffff;
  --fd: "Unbounded", system-ui, sans-serif; --fb: "Manrope", system-ui, sans-serif;
  --cell-bg: #ecfccb; --cell-line: #a3e635; --cell-ink: #3f6212;
}
.hero h2 { font-size: 25px; }
.logo { font-size: 17px; }
.flowhead h2 { font-size: 19px; }
.done h2 { font-size: 23px; }
.pitch h1 { font-size: 38px; }`;
export const pitch = {
  tag: "Sample app · Courts & sports",
  h: "Smash Club Courts",
  p: "A court booking app for a pickleball and badminton club: live court grid, online payment, member pricing and an AI assistant that fills empty courts.",
  points: ["Live court grid: tap a free hour, play longer with one more tap", "Pay online, members save automatically", "Premium AI assistant finds a court in a sentence", "Front desk view with today's courts and package ideas"],
};
export const cfg = {
  id: "smash", name: "Smash Club", logoMark: "🏓", city: "Mississauga", rating: "4.8", reviews: "286 reviews",
  mode: "court", payOnline: true, memberDiscount: 0.2, maxPlayers: 8,
  heroArt: "🏸", heroTitle: "Your court is waiting.", heroSub: "8 indoor courts for pickleball and badminton. See what's free and book in 30 seconds.",
  bookLabel: "Book a court", popularTitle: "Play today", popularHint: "per court, per hour", teamTitle: "",
  categories: [
    { id: "sport", name: "Sport", services: [
      { id: "pickle", name: "Pickleball", em: "🏓", sw: "#ecfccb", price: 32, desc: "Indoor cushioned courts, nets and lines set up.", popular: true, keys: ["pickleball", "pickle"] },
      { id: "badminton", name: "Badminton", em: "🏸", sw: "#dbeafe", price: 24, desc: "BWF-spec mats, 9 m ceilings, no glare lighting.", popular: true, keys: ["badminton", "birdie", "shuttle"] },
    ] },
  ],
  courts: [
    { id: "c1", name: "Court 1", sports: ["pickle"] }, { id: "c2", name: "Court 2", sports: ["pickle"] }, { id: "c3", name: "Court 3", sports: ["pickle", "badminton"] },
    { id: "c4", name: "Court 4", sports: ["badminton"] }, { id: "c5", name: "Court 5", sports: ["badminton"] },
  ],
  addons: [
    { id: "paddles", court: true, per: "player", em: "🏓", name: "Rental paddles or racquets", price: 4, desc: "Fresh grips, returned at the desk." },
    { id: "balls", court: true, em: "🟡", name: "New balls or shuttles", price: 8, desc: "A sealed tube for your game." },
    { id: "coach", court: true, em: "🧢", name: "30 min with a coach", price: 35, desc: "Fix your serve or third shot drop." },
  ],
  steps: ["court", "players", "details"],
  hours: { open: 420, close: 1380, step: 60 }, busy: 48,
  demoClient: { name: "Arjun Mehta", phone: "(647) 555-0198", email: "arjun@example.com" },
  policy: "Paid online by card. Free cancellation up to 12 hours before. Everyone on the booking gets the court number by text.",
  cancelWindow: "12 hours",
  doneTitle: "Game on, {name}!",
  donePerks: ["💳 Paid. Receipt sent by email", "💬 Court number texted 2 hours before", "👥 Invite link ready to split the cost"],
  confetti: ["#c6f432", "#1d3bd1", "#ff6b1a", "#00b4d8", "#ffc928"],
  pack: { label: "Picked for you", title: "Tuesday night 10-pack", body: "You play pickleball most Tuesdays after 7. Lock in 10 prime-time hours.", price: 269, was: 320, cta: "Get 10-pack", toast: "10-pack added. Your next 10 hours are covered." },
  loyalty: { label: "Smash points", title: "1 more booking to a free hour", body: "Every hour you play earns points. You're nearly there.", pct: 90 },
  review: { text: "No more texting the club at midnight. I can see every free court and grab one for my group in seconds.", who: "Jason W. · Google review" },
  info: [["Hours", "Every day · 7 AM – 11 PM"], ["Address", "3480 Laird Rd, Mississauga"], ["Parking", "Free, 120 spots"], ["Leagues", "Mon & Thu nights, all levels"]],
  extraHome: `<div class="sec"><h3>Club life</h3><div class="hscroll">
    <div class="tile"><div class="sw" style="background:#ffe1d1">🏆</div><b>Thursday ladder league</b><span>Starts Dec 4 · 12 spots</span></div>
    <div class="tile"><div class="sw" style="background:#ecfccb">🎓</div><b>Beginner clinic</b><span>Sat 9 AM · $20</span></div>
    <div class="tile"><div class="sw" style="background:#dbeafe">🤝</div><b>Open play drop-in</b><span>Weekdays 12–2 PM</span></div></div></div>`,
  seedBookings: [
    { service: "pickle", title: "Pickleball", who: "Court 2", inDays: 3, start: 1140, price: 64, key: "c2", hours: 2, players: 4, src: "Online" },
    { service: "badminton", title: "Badminton", who: "Court 4", inDays: -9, start: 1080, price: 24, key: "c4", hours: 1, players: 2, src: "Online" },
  ],
  owner: {
    notes: ["Captain of the Tuesday group", "Usually books Court 2, brings 4 players", "Interested in the ladder league", "Member since 2024, pays annually"],
    place: "Smash Club · 5 courts", unit: "court bookings", revenue: 1488,
    agenda: [
      { t: 420, title: "Pickleball · Court 1", who: "Early birds group · 4 players", src: "Online", c: "#a3e635" },
      { t: 720, title: "Open play drop-in", who: "Courts 1–3 · 14 checked in", src: "Walk-in", c: "#ffc928" },
      { t: 1080, title: "Badminton · Court 4", who: "Wei L. · 2 hours", src: "AI assistant", c: "#2563eb" },
      { t: 1140, title: "Ladder league", who: "Courts 1–3 · 24 players", src: "Online", c: "#ff6b1a" },
      { t: 1200, title: "Pickleball · Court 3", who: "Maria G. · 4 players", src: "Online", c: "#a3e635" },
      { t: 1260, title: "Badminton · Court 5", who: "Tom & Ravi", src: "Phone", c: "#2563eb" },
    ],
    sim: [
      { t: 1320, title: "Pickleball · Court 2", who: "Leah K. · 4 players", src: "Online", c: "#a3e635", price: 32 },
      { t: 900, title: "Badminton · Court 5", who: "Sam P. · 2 players", src: "AI assistant", c: "#2563eb", price: 24 },
    ],
    top: [["Pickleball 7–9 PM", 212], ["Badminton 6–8 PM", 164], ["Weekend mornings", 131], ["Paddle rental", 97], ["Coach add-on", 38]],
    idea: { title: "Off-peak daytime pass", body: "Courts sit 70% empty 10 AM – 3 PM on weekdays. A $99 daytime pass for retirees and shift workers fills them.", stat: "Est. +$2,400 / month" },
    ai: [["Booked", "57 court hours this week, 22 after midnight"], ["Filled", "11 cancelled courts re-booked from the waitlist"], ["Answered", "63 questions about leagues and rentals"]],
  },
  ai: {
    name: "Smash Club assistant", short: "Assistant", placeholder: "Try: pickleball tonight for 4",
    greeting: "Hey! I'm the Smash Club assistant 🏓 Tell me when you want to play and I'll find a free court.",
    hello: "Hey! Want a court, or have a question about leagues?",
    quick: ["Pickleball tonight", "Badminton Saturday morning", "When are leagues?", "Do you rent paddles?"],
    askService: "Sure! Which sport?",
    yes: "Nice!", done: "Booked and held for you. Pay in the app before you play:", remind: "Court number texted 2 hours before", bye: "Have a great game! 🏸",
  },
  faq: [
    { keys: ["league", "ladder"], a: "Leagues run Monday and Thursday nights, 7–10 PM. The Thursday ladder league starts Dec 4 and has 12 spots left.", q: ["Pickleball tonight", "Thanks!"] },
    { keys: ["rent", "paddle", "racquet", "racket"], a: "Yes, rental paddles and racquets are $4 each. Add them when you book and they'll be ready at the desk." },
    { keys: ["member"], a: "Members pay $39/month and save 20% on every court, plus book 14 days ahead instead of 7." },
    { keys: ["park"], a: "Free parking for 120 cars right outside." },
    { keys: ["hour", "open", "close"], a: "Open every day, 7 AM to 11 PM." },
  ],
};
