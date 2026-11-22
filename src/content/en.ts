/**
 * All English copy for the site lives here.
 * To add French later: copy this file to fr.ts, translate the strings,
 * and keep the same keys and ids (ids are used for icons, colours and URLs).
 */

export type Tone = "brand" | "green" | "yellow" | "blue" | "red" | "orange" | "pink";

export const en = {
  nav: [
    { href: "/product/", label: "Product" },
    { href: "/industries/", label: "Industries" },
    { href: "/ai-agent/", label: "AI Agent" },
    { href: "/pricing/", label: "Pricing" },
    { href: "/about/", label: "About" },
  ],
  cta: {
    demo: "Book a free demo",
    seeHow: "See how it works",
    talk: "Talk to us",
  },

  home: {
    eyebrow: "Booking apps for GTA businesses",
    title: "Say yes to every booking.",
    lede:
      "Yesbook builds your own booking app, with your name, your colours and your domain. Clients book from their phone, your front desk books in-store, and our AI receptionist answers the calls you can't.",
    proof: ["Your brand, your domain", "Set up for you", "Ontario-based support"],
    valueTitle: "Everything a busy front desk needs, in one app",
    valueLede:
      "No more paper books, missed calls or double bookings. Each Yesbook app is built around how your business already works.",
    industriesTitle: "Made for appointment-based businesses",
    industriesLede: "Starting with salons, and ready for any business that runs on a calendar.",
    videoTitle: "See The Salon App in action",
    videoLede: "A two-minute tour: a client books online, the salon books a walk-in, and the AI agent fills a cancelled slot.",
    stepsTitle: "Live in three simple steps",
    steps: [
      {
        title: "Book a free demo",
        body: "A 20-minute video call. We look at how you take bookings today and show you the app.",
      },
      {
        title: "We build your app",
        body: "Your logo, colours, services, staff and hours, set up for you. We bring over your client list too.",
      },
      {
        title: "Go live on your domain",
        body: "Share your link, put it on Instagram and Google, and start taking bookings around the clock.",
      },
    ],
    testimonialsTitle: "Loved by local businesses",
    testimonialsLede: "We're onboarding our first GTA clients now.",
    foundingTitle: "Become a founding client",
    foundingBody:
      "Our first businesses get hands-on setup, a locked-in founding price and a direct line to the people building the app.",
    finalTitle: "Ready to fill your calendar?",
    finalBody: "Book a free, no-pressure demo. We'll show you exactly how Yesbook would work for your business.",
  },

  // Product features. `id` drives the icon, the page anchor and the demo video file name.
  features: [
    {
      id: "online-booking",
      tone: "green" as Tone,
      title: "Online booking",
      short: "Clients book 24/7 from their phone in a few taps.",
      body: "A booking page on your own domain that looks like your brand. Clients pick a service, a stylist and a time, then get an instant confirmation.",
      points: ["Real-time availability", "Deposits and cancellation rules", "Add to Apple or Google Calendar", "Share on Instagram, Google and WhatsApp"],
    },
    {
      id: "in-store-booking",
      tone: "blue" as Tone,
      title: "In-store booking",
      short: "A fast front-desk calendar for walk-ins and phone calls.",
      body: "Your team sees the whole day at a glance on a tablet or computer. Drag to move, tap to book, and never double-book a chair again.",
      points: ["Day, week and staff views", "Walk-in queue", "Colour-coded services", "Works on iPad, laptop and phone"],
    },
    {
      id: "client-records",
      tone: "pink" as Tone,
      title: "Client records",
      short: "History, notes and preferences for every client.",
      body: "Remember the colour formula, the allergy, the favourite stylist. Every visit is saved so your team can give a personal welcome.",
      points: ["Visit history and spending", "Private notes and photos", "Birthdays and preferences", "Import your existing list"],
    },
    {
      id: "staff-services",
      tone: "orange" as Tone,
      title: "Staff and services",
      short: "Schedules, skills and prices, set your way.",
      body: "Set each person's hours, breaks and the services they offer. Prices and durations can be different for each staff member.",
      points: ["Staff hours and time off", "Service menu with add-ons", "Per-staff pricing", "Roles and permissions"],
    },
    {
      id: "reminders",
      tone: "yellow" as Tone,
      title: "Reminders",
      short: "Automatic texts and emails that cut no-shows.",
      body: "Clients get a confirmation, a reminder before their visit and an easy way to reschedule. Fewer empty chairs, less phone tag.",
      points: ["SMS and email reminders", "One-tap confirm or reschedule", "Rebooking nudges", "Your wording, your brand"],
    },
    {
      id: "reports",
      tone: "blue" as Tone,
      title: "Reports",
      short: "See bookings, revenue and busy hours at a glance.",
      body: "Simple, clear reports that answer real questions: who are my best clients, which services sell, and when should I add staff?",
      points: ["Daily and monthly revenue", "Staff performance", "Top services and clients", "Export to Excel"],
    },
    {
      id: "backups",
      tone: "green" as Tone,
      title: "Automatic secure backups",
      short: "Your data is backed up every day, automatically.",
      body: "Encrypted daily backups mean your bookings and client records are safe, even if a device is lost or something goes wrong.",
      points: ["Daily encrypted backups", "Secure sign-in for staff", "Restore when you need it", "Your data stays yours"],
    },
    {
      id: "ai-agent",
      tone: "red" as Tone,
      title: "AI phone agent (optional)",
      short: "A friendly AI receptionist that answers calls and books appointments.",
      body: "When you're busy with a client or closed for the night, the AI agent picks up, answers questions and books straight into your calendar.",
      points: ["Answers 24/7", "Books, moves and cancels", "Natural, friendly voice", "Sends you a summary of every call"],
    },
  ],

  industries: [
    {
      id: "salons",
      tone: "pink" as Tone,
      title: "Hair salons",
      body: "Colour, cuts and long services with processing time, per-stylist pricing and client formula notes.",
      tags: ["Colour notes", "Stylist choice", "Deposits"],
    },
    {
      id: "barbers",
      tone: "blue" as Tone,
      title: "Barbershops",
      body: "Quick cuts, walk-in queues and regulars who want the same barber every time.",
      tags: ["Walk-in queue", "Repeat bookings", "Fast checkout"],
    },
    {
      id: "spas",
      tone: "green" as Tone,
      title: "Spas and nail studios",
      body: "Rooms, packages and add-ons, with gentle reminders that keep treatment plans on track.",
      tags: ["Rooms", "Packages", "Gift cards"],
    },
    {
      id: "clinics",
      tone: "red" as Tone,
      title: "Clinics",
      body: "Physio, chiro, massage and dental. Intake notes, practitioner schedules and reminders that reduce no-shows.",
      tags: ["Intake forms", "Practitioners", "Reminders"],
    },
    {
      id: "fitness",
      tone: "orange" as Tone,
      title: "Fitness and trainers",
      body: "Personal training, small classes and memberships, with easy rebooking for the next session.",
      tags: ["Classes", "Sessions", "Rebooking"],
    },
    {
      id: "tutors",
      tone: "yellow" as Tone,
      title: "Tutors and lessons",
      body: "Tutoring, music and driving lessons. Recurring weekly slots and parent-friendly reminders.",
      tags: ["Recurring slots", "Parent contacts", "Online or in person"],
    },
  ],

  aiAgent: {
    eyebrow: "Optional add-on",
    title: "An AI receptionist that never misses a call.",
    lede:
      "Every missed call is a missed booking. The Yesbook AI agent answers in a friendly, natural voice, checks your real calendar and books the appointment while you keep working.",
    transcript: [
      { who: "caller", text: "Hi, can I book a haircut for Saturday morning?" },
      { who: "agent", text: "Of course! Priya has 10:30 or 11:15 on Saturday. Which works better?" },
      { who: "caller", text: "10:30 please." },
      { who: "agent", text: "You're booked with Priya at 10:30 on Saturday. I'll text you a confirmation now." },
    ],
    capabilitiesTitle: "What the AI agent can do",
    capabilities: [
      { id: "answer", tone: "green" as Tone, title: "Answers every call", body: "Day, night, weekends and holidays. No hold music, no voicemail." },
      { id: "book", tone: "blue" as Tone, title: "Books into your calendar", body: "Checks live availability and books, moves or cancels appointments." },
      { id: "faq", tone: "yellow" as Tone, title: "Answers common questions", body: "Prices, hours, parking, services. You choose what it says." },
      { id: "text", tone: "pink" as Tone, title: "Texts confirmations", body: "The caller gets a text with the details right after the call." },
      { id: "handoff", tone: "orange" as Tone, title: "Hands off to you", body: "Tricky calls are passed to your phone or left as a message." },
      { id: "summary", tone: "red" as Tone, title: "Sends call summaries", body: "See who called, what they wanted and what was booked." },
    ],
    stepsTitle: "How it works",
    steps: [
      { title: "Calls ring your number as usual", body: "Keep your existing business number. If you don't pick up, the agent does." },
      { title: "The agent talks and books", body: "It follows your rules: services, staff, hours and policies." },
      { title: "You get the booking and a summary", body: "Appointments appear in your calendar with a short note about the call." },
    ],
    faq: [
      { q: "Will callers know it's an AI?", a: "Yes. The agent introduces itself as your virtual assistant. Being upfront builds trust, and most callers just want a quick booking." },
      { q: "Can I keep my current phone number?", a: "Yes. Calls you don't answer are forwarded to the agent, so nothing changes for your clients." },
      { q: "What if a caller asks something it doesn't know?", a: "It takes a message, tells the caller someone will call back, and sends you the details right away." },
      { q: "Is the AI agent required?", a: "No. It's an optional add-on. The Salon App works perfectly without it." },
    ],
  },

  pricing: {
    title: "Simple pricing for growing businesses",
    lede: "Every plan includes setup, your own branded app and local support. Final pricing is coming soon. Book a demo for a quote that fits your business.",
    monthly: "Monthly",
    yearly: "Yearly",
    yearlyNote: "2 months free",
    // TODO: fill in real prices (CAD). Leave as null to show "Contact us".
    plans: [
      {
        id: "starter",
        tone: "blue" as Tone,
        name: "Starter",
        for: "Solo owners and small studios",
        monthly: null as number | null,
        yearly: null as number | null,
        features: ["Online and in-store booking", "Up to 3 staff", "Email reminders", "Client records", "Daily backups"],
      },
      {
        id: "growth",
        tone: "yellow" as Tone,
        name: "Growth",
        for: "Busy salons and clinics",
        popular: true,
        monthly: null as number | null,
        yearly: null as number | null,
        features: ["Everything in Starter", "Unlimited staff", "SMS reminders", "Reports", "Your own domain", "Priority support"],
      },
      {
        id: "pro",
        tone: "green" as Tone,
        name: "Pro + AI",
        for: "Never miss a call",
        monthly: null as number | null,
        yearly: null as number | null,
        features: ["Everything in Growth", "AI phone agent", "Call summaries", "Multi-location", "Custom features"],
      },
    ],
    faq: [
      { q: "Is there a setup fee?", a: "Setup details will be confirmed with your quote. We set everything up for you, including importing your client list." },
      { q: "Can I use my own domain?", a: "Yes. Your app runs on your own domain, like book.yoursalon.ca, or we can help you get one." },
      { q: "Are there contracts?", a: "Monthly plans can be cancelled any time. Yearly plans are paid upfront and include two months free." },
      { q: "Do you charge in Canadian dollars?", a: "Yes. All prices are in CAD, plus applicable HST." },
    ],
  },

  about: {
    title: "Built in Ontario for the businesses that keep our neighbourhoods running.",
    lede: "Yesbook makes booking simple for local, appointment-based businesses across the GTA, from Hamilton to Ajax.",
    // TODO: replace with your own story (2-4 short paragraphs).
    story: [
      "[Your story goes here: how Yesbook started, the salon that inspired The Salon App, and why you care about local businesses.]",
      "[Add a second paragraph about what makes Yesbook different: personal setup, real local support and an app that carries the client's own brand.]",
    ],
    values: [
      { id: "local", tone: "green" as Tone, title: "Local first", body: "We're based in Ontario and work with GTA businesses face to face." },
      { id: "yours", tone: "yellow" as Tone, title: "Your brand, not ours", body: "Your clients see your name and colours, not a marketplace." },
      { id: "simple", tone: "blue" as Tone, title: "Simple on purpose", body: "If it takes training to use, we haven't finished designing it." },
      { id: "privacy", tone: "pink" as Tone, title: "Privacy by default", body: "Client data is encrypted, backed up and never sold." },
    ],
  },

  contact: {
    title: "Book a free demo",
    lede: "Tell us a little about your business and we'll get back to you within one business day. Or pick a time on our calendar.",
    businessTypes: ["Hair salon", "Barbershop", "Spa", "Nail studio", "Clinic", "Fitness or trainer", "Tutor or lessons", "Other"],
    success: "Thanks! Your message is on its way. We'll reply within one business day.",
    error: "Sorry, your message couldn't be sent. Please email us directly at",
    calendarTitle: "Prefer to pick a time?",
    calendarBody: "Choose a 20-minute slot that suits you. We'll send a video link.",
    calendarMissing: "Online scheduling is coming soon. For now, send the form and we'll suggest a few times.",
  },

  footer: {
    blurb: "Custom booking and business apps for salons, clinics, studios and more. Proudly based in Ontario.",
    serving: "Serving the GTA, from Hamilton to Ajax.",
  },
} as const;

export type Content = typeof en;
export const t = en; // swap by locale when French is added
