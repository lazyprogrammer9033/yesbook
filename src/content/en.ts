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
    { href: "/pricing/", label: "Pricing" },
    { href: "/about/", label: "About" },
  ],
  cta: {
    demo: "Book a free demo",
    seeHow: "See how it works",
    talk: "Talk to us",
  },

  home: {
    eyebrow: "Booking websites for GTA businesses",
    title: "Say yes to every booking.",
    lede:
      "Yesbook builds your own booking website, with your name, your colours and your domain. Clients book online from any phone or computer, and your front desk books walk-ins in the same calendar.",
    proof: ["Your brand, your domain", "Set up for you", "Ontario-based support"],
    valueTitle: "Everything a busy front desk needs, in one booking website",
    valueLede:
      "No more paper books, phone tag or double bookings. Each Yesbook website is built around how your business already works.",
    industriesTitle: "Made for appointment-based businesses",
    industriesLede: "Salons, sports courts and any business that runs on a calendar.",
    videoTitle: "See Yesbook in action",
    videoLede: "A two-minute tour: a client books online, the salon books a walk-in, and reminders go out on their own.",
    stepsTitle: "Live in three simple steps",
    steps: [
      {
        title: "Book a free demo",
        body: "A 20-minute video call. We look at how you take bookings today and show you a booking website like yours.",
      },
      {
        title: "We build your website",
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
      "Our first businesses get hands-on setup, a locked-in founding price and a direct line to the people building your website.",
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
      id: "sports",
      tone: "green" as Tone,
      title: "Sports courts and clubs",
      body: "Badminton, pickleball, tennis and squash. Players book a court by the hour, see what's free in real time and get a reminder before they play.",
      tags: ["Court booking", "Hourly slots", "Memberships"],
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
      tone: "pink" as Tone,
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

  pricing: {
    title: "Simple pricing for growing businesses",
    lede: "Every plan includes setup, your own branded booking website and local support. Final pricing is coming soon. Book a demo for a quote that fits your business.",
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
        name: "Pro",
        for: "Multiple locations or courts",
        monthly: null as number | null,
        yearly: null as number | null,
        features: ["Everything in Growth", "Multi-location", "Court and room booking", "Custom features", "Dedicated support"],
      },
    ],
    faq: [
      { q: "Is there a setup fee?", a: "Setup details will be confirmed with your quote. We set everything up for you, including importing your client list." },
      { q: "Can I use my own domain?", a: "Yes. Your booking website runs on your own domain, like book.yoursalon.ca, or we can help you get one." },
      { q: "Are there contracts?", a: "Monthly plans can be cancelled any time. Yearly plans are paid upfront and include two months free." },
      { q: "Do you charge in Canadian dollars?", a: "Yes. All prices are in CAD, plus applicable HST." },
    ],
  },

  about: {
    title: "Built in Ontario for the businesses that keep our neighbourhoods running.",
    lede: "Yesbook makes booking simple for local, appointment-based businesses across the GTA, from Hamilton to Ajax.",
    // TODO: replace with your own story (2-4 short paragraphs).
    story: [
      "[Your story goes here: how Yesbook started, the businesses that inspired it, and why you care about local businesses.]",
      "[Add a second paragraph about what makes Yesbook different: personal setup, real local support and a booking website that carries the client's own brand.]",
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
    businessTypes: ["Hair salon", "Barbershop", "Spa", "Nail studio", "Clinic", "Fitness or trainer", "Tutor or lessons", "Sports courts (badminton, pickleball, tennis)", "Other"],
    success: "Thanks! Your message is on its way. We'll reply within one business day.",
    error: "Sorry, your message couldn't be sent. Please email us directly at",
    calendarTitle: "Prefer to pick a time?",
    calendarBody: "Choose a 20-minute slot that suits you. We'll send a video link.",
    calendarMissing: "Online scheduling is coming soon. For now, send the form and we'll suggest a few times.",
  },

  footer: {
    blurb: "Custom booking websites for salons, sports courts, clinics, studios and more. Proudly based in Ontario.",
    serving: "Serving the GTA, from Hamilton to Ajax.",
  },
} as const;

export type Content = typeof en;
export const t = en; // swap by locale when French is added
