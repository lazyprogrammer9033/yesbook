import { CalendarDays, Mail, MapPin } from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/json-ld";
import { t } from "@/content/en";
import { site } from "@/lib/site";
import { pageMeta, breadcrumbLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book a free demo",
  description: "Book a free 20-minute demo of Yesbook. See how a custom booking app would work for your salon, spa, clinic or studio in the GTA.",
  path: "/contact/",
});

export default function ContactPage() {
  const c = t.contact;
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Book a demo", path: "/contact/" }])} />
      <PageHero eyebrow="Free demo" title={c.title} lede={c.lede} blobs={["yellow", "pink"]} />
      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-[2rem] border-2 border-ink bg-surface p-6 shadow-[8px_8px_0_var(--yellow)] sm:p-10">
            <ContactForm />
          </Reveal>
          <div className="grid content-start gap-5">
            <Reveal delay={0.1} className="grid gap-4 rounded-[2rem] bg-tint-blue p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-blue text-pine">
                <CalendarDays aria-hidden className="size-6" />
              </span>
              <h2 className="text-2xl font-bold">{c.calendarTitle}</h2>
              {site.calendarUrl ? (
                <>
                  <p className="text-muted">{c.calendarBody}</p>
                  <Button asChild variant="primary" size="lg" className="w-fit">
                    <a href={site.calendarUrl} target="_blank" rel="noopener noreferrer">
                      Pick a time
                    </a>
                  </Button>
                </>
              ) : (
                <p className="text-muted">{c.calendarMissing}</p>
              )}
            </Reveal>
            <Reveal delay={0.15} className="grid gap-4 rounded-[2rem] bg-tint-green p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-green text-pine">
                <Mail aria-hidden className="size-6" />
              </span>
              <h2 className="text-2xl font-bold">Email us</h2>
              <a href={`mailto:${site.email}`} className="w-fit break-all font-semibold underline decoration-green decoration-2 underline-offset-4">
                {site.email}
              </a>
            </Reveal>
            <Reveal delay={0.2} className="grid gap-4 rounded-[2rem] bg-tint-orange p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-orange text-pine">
                <MapPin aria-hidden className="size-6" />
              </span>
              <h2 className="text-2xl font-bold">Local to the GTA</h2>
              <p className="text-muted">{t.footer.serving} Happy to meet in person at your business.</p>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
