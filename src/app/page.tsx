import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroMockup } from "@/components/home/hero-mockup";
import { ScrollStory } from "@/components/home/scroll-story";
import { StickyNotesWall } from "@/components/home/sticky-notes";
import { HorizontalIndustries } from "@/components/home/horizontal-industries";
import { StepsPath } from "@/components/home/steps-path";
import { VelocityMarquee } from "@/components/home/velocity-marquee";
import { ParallaxShapes } from "@/components/home/parallax-shapes";
import { WordReveal } from "@/components/motion/word-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Section, SectionHeading, Mark, CtaBand } from "@/components/site/section";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { t } from "@/content/en";
import { pageMeta, productLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Booking apps for salons & local businesses in Toronto and the GTA",
  description:
    "Yesbook builds your own branded booking app for your salon, barbershop, spa, clinic or studio in the GTA. Online and in-store booking, reminders, client records and an AI phone receptionist.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={productLd} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden pb-12 pt-10 sm:pb-20 sm:pt-16">
        <ParallaxShapes />
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
              <Magnetic>
                <Button asChild variant="cta" size="lg">
                  <Link href="/contact/">
                    {t.cta.demo} <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild variant="outline" size="lg">
                <Link href="#how-it-works">{t.cta.seeHow}</Link>
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

      {/* SCROLL-SPEED RIBBON */}
      <div className="overflow-x-clip py-4">
        <VelocityMarquee
          items={["Hair salons", "Barbershops", "Spas", "Nail studios", "Clinics", "Personal trainers", "Tutors", "Yoga studios"]}
          className="-mx-4 -rotate-2 border-y-2 border-ink bg-yellow py-4 font-display text-2xl font-bold text-pine sm:text-3xl"
        />
      </div>

      {/* BIG STATEMENT, WORD BY WORD */}
      <Section>
        <WordReveal
          className="max-w-5xl text-[clamp(2rem,5.2vw,4rem)] font-bold leading-[1.08] tracking-[-0.01em] [font-family:var(--font-display)]"
          text="No more paper books. No more missed calls. No more empty chairs. Just one app with your name on it that says *yes* to every booking."
        />
      </Section>

      {/* PINNED STORY (in place of a demo video) */}
      <ScrollStory />

      {/* STICKY NOTES WALL */}
      <Section className="overflow-x-clip">
        <SectionHeading eyebrow="Everything in the app" title={t.home.valueTitle} lede={t.home.valueLede} />
        <StickyNotesWall />
        <Reveal className="mt-12">
          <Button asChild variant="link">
            <Link href="/product/">
              Explore every feature <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how-it-works" className="overflow-x-clip">
        <SectionHeading eyebrow="How it works" title={t.home.stepsTitle} align="center" />
        <StepsPath />
      </Section>

      {/* INDUSTRIES, SIDEWAYS */}
      <HorizontalIndustries />

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
