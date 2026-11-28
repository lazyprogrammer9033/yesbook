export const file = "wag-and-wash";
export const title = "Wag & Wash Grooming";
export const fonts = "family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800;900";
export const theme = `
:root {
  --p: #ff4fa3; --p-ink: #ffffff; --p-text: #d6247a;
  --a: #ffd23f; --a-ink: #3a1d00;
  --bg: #fff8ec; --sf: #ffffff; --ink: #3a1d00; --mut: #7d6450; --line: #fde6c8; --tint: #fff0dc;
  --ok: #12a150; --ok-ink: #0d7a3c;
  --hero: linear-gradient(135deg, #ff8a00 0%, #ff5f6d 50%, #ff4fa3 100%);
  --cta: #ffd23f; --cta-ink: #3a1d00;
  --pack-bg: linear-gradient(135deg, #e0f6ff, #e9ffe9); --pack-line: #a9e3fa; --pack-lbl: #0284c7;
  --backdrop: radial-gradient(circle at 10% 12%, #3ec1f3 0, transparent 26%), radial-gradient(circle at 90% 88%, #ffd23f 0, transparent 30%), radial-gradient(circle at 88% 10%, #ff4fa3 0, transparent 30%), linear-gradient(135deg, #ff8a00, #ff4fa3);
  --pitch-ink: #ffffff;
  --fd: "Fredoka", system-ui, sans-serif; --fb: "Nunito", system-ui, sans-serif;
  --cell-bg: #fff0dc; --cell-line: #fcd9a8; --cell-ink: #b45309;
}
.pitch h1 { font-size: 48px; }`;
export const pitch = {
  tag: "Sample app · Pet grooming",
  h: "Wag & Wash Grooming",
  p: "A booking app for a dog and cat groomer: saved pet profiles, size-based prices, spa extras and a photo text when your pet is ready.",
  points: ["Saved pet profiles with breed, size and coat notes", "Prices adjust to your pet's size automatically", "Premium AI assistant books grooms from a quick message", "Front desk view with today's pets and package ideas"],
};
export const cfg = {
  skin: "pets",
  id: "wag", name: "Wag & Wash", logoMark: "🐾", city: "Pickering", rating: "5.0", reviews: "367 reviews",
  heroArt: "🐶", heroTitle: "Fresh, fluffy and happy.", heroSub: "Gentle grooming for dogs and cats. Book in a minute and get a photo when they're ready.",
  bookLabel: "Book a groom", popularTitle: "Favourite grooms", popularHint: "small dog prices", teamTitle: "Meet the groomers",
  sizeNote: "Prices shown for {pet}, a {size} pup.",
  pets: [
    { id: "bella", name: "Bella", breed: "Goldendoodle", size: "l", sizeLabel: "Large", em: "🐕", sw: "#ffe8c2", note: "Teddy bear cut · nervous with dryers" },
    { id: "milo", name: "Milo", breed: "Shih Tzu", size: "s", sizeLabel: "Small", em: "🐶", sw: "#ffe1f0", note: "Short face, sensitive eyes" },
    { id: "luna", name: "Luna", breed: "Maine Coon cat", size: "m", sizeLabel: "Medium", em: "🐈", sw: "#e0f6ff", note: "Cat-only quiet room" },
  ],
  serviceTitle: "Pick a groom",
  categories: [
    { id: "groom", name: "Grooming", services: [
      { id: "full", name: "Full groom", em: "✂️", sw: "#ffe1f0", price: 75, from: true, bySize: { s: 0, m: 15, l: 35 }, dur: "2–3 h", desc: "Bath, blow-dry, haircut, nails and ears.", popular: true, upsell: "teeth", keys: ["full groom", "haircut", "groom", "cut"] },
      { id: "bath", name: "Bath & tidy", em: "🛁", sw: "#e0f6ff", price: 50, from: true, bySize: { s: 0, m: 10, l: 25 }, dur: "1–2 h", desc: "Bath, blow-dry, face and paw tidy, nails.", popular: true, upsell: "blueberry", keys: ["bath", "wash", "tidy"] },
      { id: "puppy", name: "Puppy first groom", em: "🍼", sw: "#fff6c9", price: 45, dur: "1 h", desc: "Gentle intro with lots of treats.", keys: ["puppy", "first"] },
    ] },
    { id: "quick", name: "Quick visits", services: [
      { id: "nails", name: "Nail trim", em: "💅", sw: "#e9ffe9", price: 20, dur: "15 min", desc: "Clip and file. Walk-ins welcome.", popular: true, keys: ["nail", "claw"] },
      { id: "deshed", name: "De-shed treatment", em: "🌬️", sw: "#f1e9ff", price: 40, from: true, bySize: { s: 0, m: 10, l: 20 }, dur: "1 h", desc: "Up to 80% less shedding for 4–6 weeks.", keys: ["shed", "deshed", "undercoat"] },
    ] },
  ],
  addons: [
    { id: "teeth", em: "🦷", name: "Teeth brushing", price: 12, desc: "Enzyme paste, fresh breath.", why: "Most full-groom pups get their teeth done too." },
    { id: "blueberry", em: "🫐", name: "Blueberry facial", price: 15, desc: "Tear-stain fighting, smells amazing.", why: "The blueberry facial is our most loved extra." },
    { id: "bandana", em: "🎀", name: "Bandana or bow", price: 5, desc: "Pick a colour at drop-off.", why: "" },
    { id: "paw", em: "🐾", name: "Paw balm", price: 8, desc: "Soothes winter-salt paws.", why: "" },
  ],
  addonTitle: "Spa extras?", staffTitle: "Choose a groomer",
  staff: [
    { id: "jess", name: "Jess", role: "Senior groomer", grad: "linear-gradient(135deg,#ffb36b,#ff8a00)", tags: ["Doodles", "Teddy cuts"] },
    { id: "omar", name: "Omar", role: "Groomer", grad: "linear-gradient(135deg,#7dd3fc,#3ec1f3)", tags: ["Big dogs", "De-shedding"] },
    { id: "kim", name: "Kim", role: "Cat & small dog", grad: "linear-gradient(135deg,#f9a8d4,#ff4fa3)", tags: ["Cats", "Nervous pets"] },
  ],
  steps: ["pet", "service", "addons", "staff", "time", "details"],
  hours: { open: 480, close: 1080, step: 60 }, busy: 44, closedDays: [0],
  demoClient: { name: "Emily Tran", phone: "(289) 555-0163", email: "emily@example.com" },
  policy: "Pay at pick-up. We'll text a photo when your pet is ready. Free changes up to 24 hours before.",
  cancelWindow: "24 hours",
  doneTitle: "{pet} is booked in!",
  donePerks: ["📸 Photo text when they're ready for pick-up", "💬 Reminder the day before", "🐾 Notes saved to the pet profile"],
  confetti: ["#ff4fa3", "#ffd23f", "#3ec1f3", "#ff8a00", "#12a150"],
  pack: { label: "Picked for Bella", title: "Groom club: every 6 weeks", body: "Bella comes in about every 6 weeks. Lock in 6 full grooms with Jess and teeth brushing free.", price: 594, was: 732, cta: "Join groom club", toast: "Groom club started. Bella's next 6 grooms are booked." },
  loyalty: { label: "Paw points", title: "1 groom to a free blueberry facial", body: "Every visit earns paw points. Bella's almost there.", pct: 85 },
  review: { text: "I booked Bella's groom from the app in a minute and got a photo of her looking like a teddy bear before pick-up. Obsessed.", who: "Nadia S. · Google review" },
  info: [["Hours", "Mon–Sat · 8 AM – 6 PM"], ["Address", "1355 Kingston Rd, Pickering"], ["Parking", "Free, at the door"], ["Vaccines", "Rabies record on file needed"]],
  seedBookings: [
    { service: "full", title: "Full groom", who: "Jess", pet: "Bella", inDays: 4, start: 600, price: 122, key: "jess", addons: ["teeth"], src: "Online" },
    { service: "nails", title: "Nail trim", who: "Kim", pet: "Milo", inDays: -18, start: 780, price: 20, key: "kim", src: "Walk-in" },
  ],
  owner: {
    notes: ["Nervous with dryers, hand towel only", "Teddy bear cut, keep ears long", "Senior dog, needs breaks", "Cat: quiet room, no clippers near face"],
    place: "Wag & Wash Grooming", unit: "pets", revenue: 846,
    agenda: [
      { t: 480, title: "Full groom · Bailey (Doodle)", who: "Mark R. · Jess", src: "Online", c: "#ff8a00" },
      { t: 540, title: "Bath & tidy · Coco (Pug)", who: "Sana A. · Omar", src: "AI assistant", c: "#3ec1f3" },
      { t: 600, title: "Cat groom · Oreo", who: "Lisa M. · Kim", src: "Online", c: "#ff4fa3" },
      { t: 720, title: "Nail trim · Rocky", who: "Walk-in · Omar", src: "Walk-in", c: "#ffd23f" },
      { t: 780, title: "Puppy first groom · Maple", who: "Priya D. · Kim", src: "AI assistant", c: "#12a150" },
      { t: 900, title: "De-shed · Thor (Husky)", who: "Ben K. · Omar", src: "Phone", c: "#3ec1f3" },
    ],
    sim: [
      { t: 960, title: "Full groom · Teddy (Cavapoo)", who: "Olivia W. · Jess", src: "Online", c: "#ff8a00", price: 90 },
      { t: 660, title: "Bath & tidy · Max (Lab)", who: "Ken L. · Omar", src: "AI assistant", c: "#3ec1f3", price: 75 },
    ],
    top: [["Full groom", 176], ["Bath & tidy", 142], ["Nail trim", 119], ["Teeth brushing", 94], ["Blueberry facial", 81]],
    idea: { title: "Doodle groom club", body: "Doodles are 34% of your grooms and come back every 5–7 weeks. A 6-groom club keeps them on schedule.", stat: "Est. +$4,800 / quarter" },
    ai: [["Booked", "26 grooms this week, 10 after closing"], ["Answered", "38 questions about vaccines and prices"], ["Sent", "52 'ready for pick-up' photo texts"]],
  },
  ai: {
    name: "Wag & Wash helper", short: "Assistant", placeholder: "Ask about grooms or times…",
    greeting: "Woof! I'm the Wag & Wash helper 🐾 I can book Bella, Milo or Luna in, or answer any grooming question.",
    hello: "Hi there! Want to book a groom, or have a question?",
    quick: ["Full groom for Bella Saturday", "Nail trim tomorrow", "Do you groom cats?", "What vaccines do you need?"],
    askService: "Happy to help! Which groom would you like?",
    yes: "Yay!", done: "Booked! Here are the details:", remind: "Photo text when ready", bye: "Anytime! Give Bella a scratch from us 🐶",
  },
  faq: [
    { keys: ["cat"], a: "Yes! Kim grooms cats in our quiet cat-only room, away from the dogs. Luna's profile is already set up.", q: ["Book a groom for Luna", "Thanks!"] },
    { keys: ["vaccin", "rabies", "shot"], a: "We need a current rabies record. Upload a photo in your pet's profile and you're set." },
    { keys: ["long", "how long", "pick up", "pickup", "ready"], a: "Most full grooms take 2–3 hours. We'll text you a photo the moment your pet is ready." },
    { keys: ["park"], a: "Free parking right at the door." },
    { keys: ["hour", "open", "close"], a: "Monday to Saturday, 8 AM to 6 PM." },
  ],
};
