export const file = "lotus-stone-spa";
export const title = "Lotus & Stone Spa";
export const fonts = "family=Fraunces:opsz,wght@9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700;800";
export const theme = `
:root {
  --p: #7c3aed; --p-ink: #ffffff; --p-text: #6d28d9;
  --a: #ffc928; --a-ink: #1e1233;
  --bg: #fbf7ff; --sf: #ffffff; --ink: #1e1233; --mut: #6e6283; --line: #ece3f8; --tint: #f3ebff;
  --ok: #12a150; --ok-ink: #0d7a3c;
  --hero: linear-gradient(140deg, #ff6b5a 0%, #ff4fa3 38%, #a855f7 72%, #7c3aed 100%);
  --cta: #ffc928; --cta-ink: #1e1233;
  --pack-bg: linear-gradient(135deg, #e7fff7, #fff2e8); --pack-line: #b8f0dd; --pack-lbl: #0f9a74;
  --backdrop: radial-gradient(circle at 8% 12%, #ffc928 0, transparent 26%), radial-gradient(circle at 92% 88%, #2dd4bf 0, transparent 30%), radial-gradient(circle at 85% 8%, #ff6b5a 0, transparent 30%), linear-gradient(135deg, #7c3aed, #c026d3);
  --pitch-ink: #ffffff;
  --fd: "Fraunces", Georgia, serif; --fb: "DM Sans", system-ui, sans-serif;
  --cell-bg: #f3ebff; --cell-line: #d9c6f7; --cell-ink: #6d28d9;
}`;
export const pitch = {
  tag: "Sample app · Spa & massage",
  h: "Lotus & Stone Spa",
  p: "A booking app a day spa can call its own: treatments, therapists, add-ons and a 24/7 AI assistant that books while the team is busy.",
  points: ["Clients book a therapist and time in under a minute", "Smart add-ons from what clients buy most", "Premium AI assistant books, moves and answers questions", "Front desk view with today's schedule and package ideas"],
};
export const cfg = {
  id: "lotus", name: "Lotus & Stone", logoMark: "✿", city: "Oakville", rating: "4.9", reviews: "412 reviews",
  heroArt: "🪷", heroTitle: "Breathe out. We'll handle the rest.", heroSub: "Massage, facials and wellness rituals. Book your therapist in under a minute.",
  bookLabel: "Book a treatment", popularTitle: "Most loved", popularHint: "this month", teamTitle: "Your therapists",
  categories: [
    { id: "massage", name: "Massage", services: [
      { id: "deep", name: "Deep tissue massage", em: "💆", sw: "#efe4ff", price: 110, dur: "60 min", desc: "Slow, firm pressure for tight shoulders and back.", popular: true, upsell: "stones", keys: ["deep tissue", "deep", "massage"] },
      { id: "swedish", name: "Swedish relaxation", em: "🌿", sw: "#dcfbef", price: 95, dur: "60 min", desc: "Light, flowing strokes to switch off.", keys: ["swedish", "relax"], upsell: "aroma" },
      { id: "prenatal", name: "Prenatal massage", em: "🤰", sw: "#ffe8f2", price: 105, dur: "60 min", desc: "Side-lying comfort for mums-to-be.", keys: ["prenatal", "pregnan"] },
      { id: "couples", name: "Couples retreat", em: "💞", sw: "#fff0d6", price: 240, dur: "90 min", desc: "Side-by-side massage, tea and robes for two.", popular: true, keys: ["couple", "partner", "two of us"], upsell: "aroma" },
    ] },
    { id: "facial", name: "Facials", services: [
      { id: "hydra", name: "Hydrating facial", em: "✨", sw: "#e2f4ff", price: 95, dur: "50 min", desc: "Deep clean, mask and glow for dry skin.", popular: true, keys: ["facial", "hydrat", "glow"], upsell: "led" },
      { id: "peel", name: "Brightening peel", em: "🍋", sw: "#fff6c9", price: 120, dur: "45 min", desc: "Gentle enzyme peel for dull skin.", keys: ["peel", "bright"] },
    ] },
    { id: "body", name: "Body", services: [
      { id: "scrub", name: "Salt glow scrub", em: "🧂", sw: "#ffe6dc", price: 85, dur: "45 min", desc: "Sea salt polish and warm oil wrap.", keys: ["scrub", "salt"] },
      { id: "reflex", name: "Reflexology", em: "🦶", sw: "#e6fff4", price: 70, dur: "40 min", desc: "Pressure-point foot therapy.", keys: ["reflex", "foot", "feet"] },
    ] },
  ],
  addons: [
    { id: "stones", em: "🪨", name: "Hot stones", price: 25, desc: "Warm basalt stones melt deep knots.", why: "Most deep tissue clients add hot stones." },
    { id: "aroma", em: "🌸", name: "Aromatherapy oils", price: 15, desc: "Lavender, eucalyptus or citrus blend.", why: "Aromatherapy is our most added extra." },
    { id: "led", em: "💡", name: "LED light therapy", price: 30, desc: "15 min of red light for calm, bright skin.", why: "LED doubles the glow from a hydrating facial." },
    { id: "scalp", em: "💆‍♀️", name: "Scalp massage", price: 20, desc: "10 minutes, warm oil.", why: "" },
  ],
  addonTitle: "Make it extra special?", staffTitle: "Choose your therapist",
  staff: [
    { id: "mei", name: "Mei", role: "RMT", grad: "linear-gradient(135deg,#c084fc,#7c3aed)", tags: ["Deep tissue", "Sports"], does: ["massage", "body"] },
    { id: "ana", name: "Ana", role: "Esthetician", grad: "linear-gradient(135deg,#fda4af,#ff4fa3)", tags: ["Facials", "Peels"], does: ["facial", "body"] },
    { id: "jordan", name: "Jordan", role: "RMT", grad: "linear-gradient(135deg,#5eead4,#0d9488)", tags: ["Prenatal", "Relaxation"], does: ["massage", "body"] },
  ],
  steps: ["service", "addons", "staff", "time", "details"],
  hours: { open: 600, close: 1200, step: 75 }, busy: 45, closedDays: [1],
  demoClient: { name: "Sara Malik", phone: "(416) 555-0142", email: "sara@example.com" },
  policy: "Pay at the spa. Free changes up to 24 hours before. RMT receipts are emailed for insurance.",
  cancelWindow: "24 hours",
  doneTitle: "You're booked, {name}!",
  donePerks: ["📅 Added to your calendar", "💬 Reminder text the day before", "🧾 RMT receipt emailed after your visit"],
  confetti: ["#7c3aed", "#ff4fa3", "#ffc928", "#2dd4bf", "#ff6b5a"],
  pack: { label: "Picked for you", title: "Monthly reset: 4 deep tissue massages", body: "Built from what you book most. Use them any time in 6 months.", price: 399, was: 440, cta: "Get package", toast: "Package added. Your next 4 massages are covered." },
  loyalty: { label: "Lotus rewards", title: "2 visits to a free scalp massage", body: "Every visit earns points. You're 80% of the way there.", pct: 80 },
  review: { text: "I booked at 11 PM through the chat and had a 2:30 slot with Mei the next day. Easiest spa booking ever.", who: "Priya K. · Google review" },
  info: [["Hours", "Tue–Sun · 10 AM – 8 PM"], ["Address", "214 Lakeshore Rd E, Oakville"], ["Parking", "Free lot behind the building"], ["Call", "(905) 555-0186"]],
  seedBookings: [
    { service: "hydra", title: "Hydrating facial", who: "Ana", inDays: 6, start: 840, price: 95, key: "ana", src: "Online" },
    { service: "deep", title: "Deep tissue massage", who: "Mei", inDays: -21, start: 960, price: 135, key: "mei", addons: ["stones"], src: "Online" },
  ],
  owner: {
    notes: ["Prefers firm pressure, avoid lower back", "Likes the lavender room, quiet session", "Allergic to nut oils, use grapeseed", "Books every 4 weeks, birthday in Dec"],
    place: "Lotus & Stone Spa", unit: "treatments", revenue: 1185,
    agenda: [
      { t: 600, title: "Swedish relaxation", who: "Hannah L. · Jordan", src: "Online", c: "#2dd4bf" },
      { t: 675, title: "Deep tissue + hot stones", who: "Omar R. · Mei", src: "AI assistant", c: "#7c3aed" },
      { t: 750, title: "Hydrating facial + LED", who: "Grace T. · Ana", src: "Online", c: "#ff4fa3" },
      { t: 900, title: "Couples retreat", who: "Daniel & Mia · Mei, Jordan", src: "Phone", c: "#ffc928" },
      { t: 1050, title: "Prenatal massage", who: "Leila S. · Jordan", src: "AI assistant", c: "#2dd4bf" },
      { t: 1125, title: "Brightening peel", who: "Nina P. · Ana", src: "Walk-in", c: "#ff6b5a" },
    ],
    sim: [
      { t: 1125, title: "Deep tissue massage", who: "Kevin M. · Mei", src: "Online", c: "#7c3aed", price: 110 },
      { t: 825, title: "Reflexology", who: "Rosa D. · Jordan", src: "AI assistant", c: "#2dd4bf", price: 70 },
    ],
    top: [["Deep tissue", 148], ["Hydrating facial", 96], ["Couples retreat", 61], ["Swedish", 57], ["Hot stones add-on", 88]],
    idea: { title: "Deep tissue 4-pack", body: "61% of deep tissue clients come back within 5 weeks. A 4-pack locks in those visits.", stat: "Est. +$3,900 / quarter" },
    ai: [["Booked", "23 treatments this week, 9 after hours"], ["Answered", "41 questions about parking, prices and gift cards"], ["Saved", "About 6 hours of phone time"]],
  },
  ai: {
    name: "Lotus assistant", short: "Assistant", placeholder: "Ask about treatments or times…",
    greeting: "Hi! I'm the Lotus assistant 🌸 I can book a treatment, move or cancel a visit, or answer any question. What would you like?",
    hello: "Hello! Looking to book, or have a question?",
    quick: ["Deep tissue Saturday afternoon", "Couples massage this weekend", "Do you take insurance?", "Gift cards?"],
    askService: "Happy to! Which treatment would you like?",
    yes: "Yes!", done: "All set! Here's your booking:", remind: "Reminder text the day before", bye: "My pleasure. See you soon 🌿",
  },
  faq: [
    { keys: ["insurance", "receipt", "rmt", "benefit"], a: "Yes. All massages with Mei and Jordan are by RMTs, and we email an insurance receipt after your visit. Most plans cover it." },
    { keys: ["gift", "voucher"], a: "We sell digital gift cards from $50. They arrive by email instantly and never expire 🎁", q: ["Book a treatment", "Thanks!"] },
    { keys: ["park"], a: "Free parking in the lot behind the building. Enter from Navy Street." },
    { keys: ["hour", "open", "close"], a: "We're open Tuesday to Sunday, 10 AM to 8 PM. Closed Mondays." },
    { keys: ["where", "address", "located", "location"], a: "214 Lakeshore Rd E, Oakville. Two minutes from the lake." },
  ],
};
