/**
 * Site-wide settings. Edit these values to update the whole site.
 * Anything marked TODO is a placeholder waiting for real details.
 */
export const site = {
  name: "Yesbook",
  legalName: "Yesbook", // TODO: registered business name (e.g. "Yesbook Inc.")
  url: "https://yesbook.ca",
  altDomains: ["https://yesbook.ai", "https://yesbookapp.com"],
  tagline: "Say yes to every booking.",
  description:
    "Yesbook builds custom, branded booking apps for salons, barbers, spas, clinics, tutors and trainers across the GTA. Online and in-store booking, reminders, client records and an AI phone receptionist.",
  // Contact inbox (also set in public/api/config.php)
  email: "contact@yesbook.ca",
  phone: "", // TODO: optional public phone number, e.g. "+1 905 555 0100"
  // TODO: paste your Cal.com / Calendly / Google Calendar booking page link
  calendarUrl: "",
  region: {
    province: "ON",
    country: "CA",
    city: "Brampton", // TODO: confirm the city you want listed
    areaServed: [
      "Hamilton",
      "Burlington",
      "Oakville",
      "Mississauga",
      "Brampton",
      "Toronto",
      "Vaughan",
      "Markham",
      "Richmond Hill",
      "Pickering",
      "Ajax",
    ],
  },
  // Privacy-friendly, cookie-free analytics. Leave empty to turn analytics off.
  // Plausible: set provider "plausible" and domain "yesbook.ca".
  // Umami: set provider "umami", src to your script URL and websiteId.
  analytics: {
    provider: "" as "" | "plausible" | "umami",
    domain: "yesbook.ca",
    src: "",
    websiteId: "",
  },
  social: {
    instagram: "",
    linkedin: "",
    facebook: "",
  },
  defaultLocale: "en-CA",
  locales: ["en-CA"] as const, // add "fr-CA" when the French translation is ready
} as const;

export type Site = typeof site;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
