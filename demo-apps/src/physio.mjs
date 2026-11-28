export const file = "peak-physio";
export const title = "Peak Physio & Rehab";
export const fonts = "family=Sora:wght@500;600;700&family=Figtree:wght@400;500;600;700;800";
export const theme = `
:root {
  --p: #00a99d; --p-ink: #ffffff; --p-text: #00796f;
  --a: #ffd23f; --a-ink: #10302c;
  --bg: #f1fbfa; --sf: #ffffff; --ink: #10302c; --mut: #557370; --line: #d6efec; --tint: #e3f8f5;
  --ok: #12a150; --ok-ink: #0d7a3c;
  --hero: linear-gradient(135deg, #00a99d 0%, #00c2c7 45%, #38bdf8 100%);
  --cta: #ffd23f; --cta-ink: #10302c;
  --pack-bg: linear-gradient(135deg, #fff8d9, #ffe9f1); --pack-line: #ffe08a; --pack-lbl: #b45309;
  --backdrop: radial-gradient(circle at 12% 14%, #ffd23f 0, transparent 26%), radial-gradient(circle at 88% 90%, #ff7aa8 0, transparent 28%), radial-gradient(circle at 90% 10%, #38bdf8 0, transparent 30%), linear-gradient(135deg, #00a99d, #0284c7);
  --pitch-ink: #ffffff;
  --fd: "Outfit", system-ui, sans-serif; --fb: "Plus Jakarta Sans", system-ui, sans-serif;
  --cell-bg: #e3f8f5; --cell-line: #9fe3da; --cell-ink: #00796f;
}`;
export const pitch = {
  tag: "Sample app · Physio clinic",
  h: "Peak Physio & Rehab",
  p: "A booking app for a physio and rehab clinic: pick the right care and clinician, fill intake before the visit, and set up direct billing in one go.",
  points: ["New and returning patients book the right visit type", "Intake questions answered before arrival", "Direct billing to insurance switched on at booking", "Premium AI assistant answers coverage and booking questions"],
};
export const cfg = {
  skin: "physio",
  id: "peak", name: "Peak Physio", logoMark: "✚", city: "Burlington", rating: "4.9", reviews: "538 reviews",
  heroArt: "🦵", heroTitle: "Move better, starting this week.", heroSub: "Physio, massage therapy and chiro under one roof. Same-week appointments and direct billing.",
  bookLabel: "Book an appointment", popularTitle: "Most booked", popularHint: "direct billing", teamTitle: "Our clinicians",
  serviceTitle: "What kind of care?",
  categories: [
    { id: "physio", name: "Physio", services: [
      { id: "assess", name: "Initial assessment", em: "📋", sw: "#e3f8f5", price: 120, dur: "60 min", desc: "First visit: full assessment and a treatment plan.", popular: true, keys: ["assessment", "first visit", "new patient", "initial", "physio"] },
      { id: "follow", name: "Follow-up treatment", em: "🔁", sw: "#e0f2fe", price: 90, dur: "30 min", desc: "Hands-on care and exercise progressions.", popular: true, keys: ["follow", "treatment", "return"] },
      { id: "sport", name: "Sports injury rehab", em: "🏃", sw: "#fef3c7", price: 105, dur: "45 min", desc: "Back to running, court or ice with a plan.", keys: ["sport", "running", "knee", "ankle", "acl"] },
    ] },
    { id: "rmt", name: "Massage", services: [
      { id: "rmt60", name: "Massage therapy", em: "💆", sw: "#fce7f3", price: 115, dur: "60 min", desc: "RMT massage for tension, recovery or pain.", popular: true, keys: ["massage", "rmt"] },
    ] },
    { id: "chiro", name: "Chiro", services: [
      { id: "chiro1", name: "Chiropractic visit", em: "🦴", sw: "#ede9fe", price: 80, dur: "20 min", desc: "Adjustment and mobility work.", keys: ["chiro", "adjust"] },
    ] },
  ],
  addons: [],
  staffTitle: "Choose a clinician",
  staff: [
    { id: "kate", name: "Kate Morrison", role: "Physiotherapist", grad: "linear-gradient(135deg,#2dd4bf,#00a99d)", tags: ["Sports injuries", "Knees"], does: ["physio"] },
    { id: "raj", name: "Raj Bhatt", role: "Physiotherapist", grad: "linear-gradient(135deg,#7dd3fc,#0284c7)", tags: ["Back & neck", "Post-surgery"], does: ["physio"] },
    { id: "lena", name: "Lena Ortiz", role: "RMT", grad: "linear-gradient(135deg,#f9a8d4,#ec4899)", tags: ["Deep tissue", "Recovery"], does: ["rmt"] },
    { id: "sam", name: "Dr. Sam Chen", role: "Chiropractor", grad: "linear-gradient(135deg,#c4b5fd,#7c3aed)", tags: ["Spine", "Posture"], does: ["chiro"] },
  ],
  steps: ["service", "staff", "time", "intake", "details"],
  hours: { open: 450, close: 1170, step: 45 }, busy: 46, closedDays: [0],
  intake: {
    placeholder: "e.g. Knee pain after running, worse on stairs",
    areas: ["Neck", "Shoulder", "Back", "Hip", "Knee", "Ankle / foot", "Wrist / hand"],
    billingTitle: "Direct bill my insurance", billingBody: "We send the claim for you, so you only pay what your plan doesn't cover.",
    privacy: "Your answers go only to your clinician and are kept in your private health record.",
  },
  demoClient: { name: "Daniel Okafor", phone: "(905) 555-0127", email: "daniel@example.com" },
  policy: "Pay at the clinic. With direct billing you only pay your share. Please give 24 hours notice to change.",
  cancelWindow: "24 hours",
  doneTitle: "See you soon, {name}!",
  donePerks: ["📝 Intake form saved to your file", "🧾 Direct billing set up with your insurer", "💬 Reminder text the day before, with parking info"],
  confetti: ["#00a99d", "#ffd23f", "#38bdf8", "#ff7aa8", "#12a150"],
  pack: { label: "Your plan", title: "Knee rehab plan: 6 follow-ups", body: "Kate recommends 6 visits over 8 weeks. Book them all now and keep your Tuesday 5:15 slot.", price: 495, was: 540, cta: "Book plan", toast: "6 follow-ups booked with Kate, Tuesdays at 5:15 PM." },
  loyalty: { label: "Your progress", title: "Visit 4 of 6 in your knee plan", body: "Home exercises are in your app. You're two-thirds through.", pct: 66 },
  review: { text: "Booked a same-week assessment at 10 PM, filled the intake on my phone and the clinic billed my insurance directly. Zero paperwork.", who: "Michelle A. · Google review" },
  info: [["Hours", "Mon–Sat · 7:30 AM – 7:30 PM"], ["Address", "1100 Brant St, Burlington"], ["Parking", "Free, at the front door"], ["Billing", "Direct to most insurance plans"]],
  seedBookings: [
    { service: "follow", title: "Follow-up treatment", who: "Kate Morrison", inDays: 2, start: 1035, price: 90, key: "kate", src: "Online" },
    { service: "assess", title: "Initial assessment", who: "Kate Morrison", inDays: -12, start: 990, price: 120, key: "kate", src: "Online" },
  ],
  owner: {
    notes: ["Right knee, ACL repair March 2026", "Desk job, neck and shoulder tension", "Insurance: 80% coverage, $1,000/yr", "Prefers early morning appointments"],
    place: "Peak Physio & Rehab", unit: "appointments", revenue: 1915,
    agenda: [
      { t: 450, title: "Follow-up treatment", who: "Tom B. · Raj", src: "Online", c: "#38bdf8" },
      { t: 540, title: "Initial assessment", who: "Aisha N. · Kate", src: "AI assistant", c: "#00a99d" },
      { t: 630, title: "Chiropractic visit", who: "Greg H. · Dr. Chen", src: "Phone", c: "#7c3aed" },
      { t: 765, title: "Massage therapy", who: "Joanna P. · Lena", src: "Online", c: "#ec4899" },
      { t: 990, title: "Sports injury rehab", who: "Liam C. · Kate", src: "Online", c: "#ffd23f" },
      { t: 1080, title: "Follow-up treatment", who: "Mark S. · Raj", src: "AI assistant", c: "#38bdf8" },
    ],
    sim: [
      { t: 855, title: "Initial assessment", who: "Fatima R. · Raj", src: "Online", c: "#00a99d", price: 120 },
      { t: 1125, title: "Massage therapy", who: "Chris D. · Lena", src: "AI assistant", c: "#ec4899", price: 115 },
    ],
    top: [["Follow-up treatment", 304], ["Massage therapy", 188], ["Initial assessment", 126], ["Sports rehab", 92], ["Chiropractic", 71]],
    idea: { title: "Post-assessment care plan", body: "38% of new patients never book a second visit. Offer a 6-visit plan right after the assessment.", stat: "Est. +$6,100 / quarter" },
    ai: [["Booked", "31 appointments this week, 12 after hours"], ["Answered", "54 coverage and parking questions"], ["Reminded", "9 patients who missed follow-ups"]],
  },
  ai: {
    name: "Peak care assistant", short: "Assistant", placeholder: "Ask about appointments or coverage…",
    greeting: "Hi, I'm the Peak care assistant 👋 I can book you in, explain coverage, or help you pick the right type of visit.",
    hello: "Hi! Want to book, or have a question about coverage?",
    quick: ["New patient, sore knee", "Massage Thursday evening", "Do you direct bill?", "Do I need a referral?"],
    askService: "Sure! Is this a first visit, a follow-up, massage or chiro?",
    yes: "Good news!", done: "You're booked. I've also sent your intake form:", remind: "Reminder text the day before", bye: "You're welcome. Feel better soon!",
  },
  faq: [
    { keys: ["direct bill", "insurance", "coverage", "covered", "benefit"], a: "Yes, we direct bill most insurance plans for physio, massage and chiro. Switch it on when you book and you'll only pay your share." },
    { keys: ["referral", "doctor note"], a: "No referral needed for physio in Ontario. Some insurance plans ask for one for massage, so check your plan if you're unsure." },
    { keys: ["wear", "bring", "clothes"], a: "Wear comfy clothes you can move in. Shorts help for knee or hip visits. Bring your insurance card." },
    { keys: ["park"], a: "Free parking right at the front door." },
    { keys: ["hour", "open", "close"], a: "Monday to Saturday, 7:30 AM to 7:30 PM." },
  ],
};
