import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroMockup } from "@/components/home/hero-mockup";
import { DemoTabs } from "@/components/home/demo-tabs";
import { VideoShowcase } from "@/components/site/video-showcase";
import { Section, SectionHeading, Mark, Blobs, CtaBand } from "@/components/site/section";
import { IconTile } from "@/components/site/icon-tile";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { t, type Tone } from "@/content/en";
import { pageMeta, productLd } from "@/lib/seo";
import { tone } from "@/lib/tone";
import { cn } from "@/lib/utils";

export const metadata = pageMeta({
  title: "Booking apps for salons & local businesses in Toronto and the GTA",
  description:
    "Yesbook builds your own branded booking app for your salon, barbershop, spa, clinic or studio in the GTA. Online and in-store booking, reminders, client records and an AI phone receptionist.",
  path: "/",
});

const f = (id: string) => t.features.find((x) => x.id === id)!;

export default function Home() {
  return (
    <>
      <JsonLd data={productLd} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-12 pt-10 sm:pb-20 sm:pt-16">
        <Blobs a="yellow" b="blue" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="rise grid gap-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-tint-green px-4 py-1.5 text-sm font-semibold text-green-ink">
              <span className="size-2 rounded-full bg-green motion-safe:animate-pulse" /> {t.home.eyebrow}
            </p>
            <h1 className="text-[clamp(2.75rem,7.5vw,5.25rem)] font-bold leading-[0.98]">
              Say <Mark>yes</Mark> to every booking.
            </h1>
            <p className="max-w-xl text-lg text-muted sm:text-xl">{t.home.lede}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="cta" size="lg">
                <Link href="/contact/">
                  {t.cta.demo} <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#demos">{t.cta.seeHow}</Link>
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {t.home.proof.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <CheckCircle2 aria-hidden className="size-4 text-green-ink" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <HeroMockup />
        </div>
      </section>

      {/* INDUSTRY MARQUEE */}
      <div className="border-y-2 border-line bg-soft py-4" aria-label="Industries we serve">
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <ul className="flex w-max gap-3 motion-safe:animate-[marquee_40s_linear_infinite]">
            {[...t.industries, ...t.industries].map((i, k) => (
              <li
                key={k}
                aria-hidden={k >= t.industries.length || undefined}
                className="flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-display font-semibold shadow-soft"
              >
                <IconTile id={i.id} tone={i.tone as Tone} size="sm" className="size-8 rounded-full [&_svg]:size-4" />
                {i.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* VALUE BENTO */}
      <Section>
        <SectionHeading eyebrow="Why Yesbook" title={t.home.valueTitle} lede={t.home.valueLede} />
        <RevealGroup className="grid auto-rows-[minmax(11rem,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4">
          <RevealItem className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-tint-yellow p-7 shadow-[6px_6px_0_var(--yellow)] md:col-span-2 lg:row-span-2">
            <div className="grid h-full content-between gap-8">
              <div className="grid gap-3">
                <span className="flex gap-2">
                  <span className="grid size-12 place-items-center rounded-2xl bg-yellow text-pine"><Palette aria-hidden className="size-6" /></span>
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue text-pine"><Globe aria-hidden className="size-6" /></span>
                </span>
                <h3 className="text-3xl font-bold sm:text-4xl">Your brand. Your app. Your domain.</h3>
                <p className="max-w-md text-muted">
                  Clients book on <b className="text-fg">book.yoursalon.ca</b>, with your logo and colours. No marketplace, no competitors listed next to you.
                </p>
              </div>
              <div aria-hidden className="relative h-40">
                {[
                  { n: "Glow Studio", c: "bg-pink", r: "-rotate-6", x: "left-0" },
                  { n: "Fade Factory", c: "bg-blue", r: "rotate-2", x: "left-[28%]" },
                  { n: "Calm Spa", c: "bg-green", r: "rotate-[8deg]", x: "left-[56%]" },
                ].map((b) => (
                  <div key={b.n} className={cn("absolute top-2 w-[44%] rounded-2xl border-2 border-ink bg-surface p-3 shadow-soft transition-transform duration-300 hover:-translate-y-2", b.r, b.x)}>
                    <div className={cn("mb-2 h-7 rounded-lg", b.c)} />
                    <p className="font-display text-sm font-bold">{b.n}</p>
                    <div className="mt-2 grid grid-cols-3 gap-1">
                      {[0, 1, 2].map((k) => (
                        <span key={k} className="h-4 rounded bg-soft" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>
          {(["online-booking", "ai-agent", "reminders", "client-records"] as const).map((id) => (
            <RevealItem key={id} className={cn("grid content-start gap-3 rounded-[2rem] p-6 transition-transform duration-300 hover:-translate-y-1", tone[f(id).tone].tint)}>
              <IconTile id={id} tone={f(id).tone} />
              <h3 className="text-xl font-bold">{f(id).title}</h3>
              <p className="text-muted">{f(id).short}</p>
            </RevealItem>
          ))}
          <RevealItem className="grid gap-4 rounded-[2rem] bg-tint-blue p-6 md:col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3">
              <IconTile id="reports" tone="blue" />
              <h3 className="text-xl font-bold">{f("reports").title}</h3>
            </div>
            <p className="text-muted">{f("reports").short}</p>
            <div aria-hidden className="flex h-16 items-end gap-2">
              {[45, 60, 40, 75, 65, 92, 70, 85].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} className={cn("flex-1 rounded-t-md", ["bg-blue", "bg-green", "bg-yellow", "bg-pink", "bg-orange", "bg-red"][i % 6])} />
              ))}
            </div>
          </RevealItem>
          <RevealItem className="grid content-start gap-3 rounded-[2rem] bg-tint-green p-6 lg:col-span-2">
            <div className="flex items-center gap-3">
              <IconTile id="backups" tone="green" />
              <h3 className="text-xl font-bold">{f("backups").title}</h3>
            </div>
            <p className="text-muted">{f("backups").body}</p>
          </RevealItem>
        </RevealGroup>
        <Reveal className="mt-8">
          <Button asChild variant="link">
            <Link href="/product/">
              Explore every feature <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </Section>

      {/* DEMO VIDEOS */}
      <Section id="demos">
        <SectionHeading eyebrow={t.videos.eyebrow} title={t.videos.title} lede={t.videos.lede} />
        <VideoShowcase />
      </Section>

      {/* PRODUCT TOUR */}
      <Section className="bg-soft" id="tour">
        <SectionHeading eyebrow="Product tour" title={t.home.videoTitle} lede="Tap a feature to watch it work. These are live previews of the real screens." />
        <DemoTabs />
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how-it-works">
        <SectionHeading eyebrow="How it works" title={t.home.stepsTitle} align="center" />
        <RevealGroup className="relative grid gap-6 md:grid-cols-3">
          <div aria-hidden className="absolute left-[16%] right-[16%] top-10 hidden border-t-4 border-dashed border-line md:block" />
          {t.home.steps.map((s, i) => {
            const c = ["bg-yellow", "bg-blue", "bg-green"][i];
            return (
              <RevealItem key={s.title} className="relative grid justify-items-center gap-4 text-center">
                <span className={cn("grid size-20 place-items-center rounded-[1.75rem] border-2 border-ink font-display text-3xl font-bold text-pine shadow-[4px_4px_0_var(--ink)]", c)}>
                  {i + 1}
                </span>
                <h3 className="text-2xl font-bold">{s.title}</h3>
                <p className="max-w-xs text-muted">{s.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* INDUSTRIES */}
      <Section className="bg-soft">
        <SectionHeading eyebrow="Industries" title={t.home.industriesTitle} lede={t.home.industriesLede} />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.industries.map((i) => (
            <RevealItem key={i.id}>
              <Link
                href={`/industries/#${i.id}`}
                className="group grid h-full content-start gap-3 rounded-[2rem] border-2 border-transparent bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[6px_6px_0_var(--yellow)]"
              >
                <IconTile id={i.id} tone={i.tone as Tone} />
                <h3 className="text-xl font-bold">{i.title}</h3>
                <p className="text-muted">{i.body}</p>
                <span className="mt-1 inline-flex items-center gap-1 font-semibold text-green-ink">
                  Learn more <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* TESTIMONIALS PLACEHOLDER */}
      <Section>
        <SectionHeading eyebrow="Our clients" title={t.home.testimonialsTitle} lede={t.home.testimonialsLede} />
        <Reveal className="grid items-center gap-8 rounded-[2.5rem] border-2 border-ink bg-tint-pink p-8 shadow-[8px_8px_0_var(--pink)] sm:p-12 md:grid-cols-[1fr_auto]">
          <div className="grid gap-3">
            <span className="grid size-14 place-items-center rounded-2xl bg-pink text-pine">
              <Sparkles aria-hidden className="size-7" />
            </span>
            <h3 className="text-3xl font-bold">{t.home.foundingTitle}</h3>
            <p className="max-w-2xl text-lg text-muted">{t.home.foundingBody}</p>
          </div>
          <Button asChild variant="cta" size="lg">
            <Link href="/contact/">
              Claim a founding spot <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
