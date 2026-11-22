import { PhoneCall } from "lucide-react";
import { CtaBand, Mark, Section, SectionHeading } from "@/components/site/section";
import { DemoFrame, AiCall } from "@/components/demos/feature-demos";
import { IconTile } from "@/components/site/icon-tile";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/site/json-ld";
import { t } from "@/content/en";
import { pageMeta, faqLd, breadcrumbLd } from "@/lib/seo";
import { tone } from "@/lib/tone";
import { cn } from "@/lib/utils";

export const metadata = pageMeta({
  title: "AI phone receptionist for salons and clinics",
  description:
    "The Yesbook AI agent answers your business calls 24/7, books appointments into your calendar, answers common questions and texts confirmations. Built for GTA salons, spas and clinics.",
  path: "/ai-agent/",
  keywords: ["AI receptionist", "AI phone agent for salons", "AI booking assistant Toronto", "virtual receptionist Ontario"],
});

const a = t.aiAgent;

export default function AiAgentPage() {
  return (
    <>
      <JsonLd data={[faqLd(a.faq), breadcrumbLd([{ name: "Home", path: "/" }, { name: "AI Agent", path: "/ai-agent/" }])]} />
      <section className="relative isolate overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_20%,color-mix(in_oklab,var(--red)_22%,transparent),transparent),radial-gradient(50%_50%_at_10%_90%,color-mix(in_oklab,var(--yellow)_35%,transparent),transparent)]" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="rise grid gap-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-tint-red px-4 py-1.5 text-sm font-semibold">
              <PhoneCall aria-hidden className="size-4" /> {a.eyebrow}
            </p>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1]">
              An AI receptionist that <Mark color="pink">never</Mark> misses a call.
            </h1>
            <p className="max-w-xl text-lg text-muted sm:text-xl">{a.lede}</p>
            <dl className="grid max-w-md grid-cols-3 gap-3">
              {[
                ["24/7", "Answers day and night"],
                ["Live", "Books into your real calendar"],
                ["SMS", "Texts every confirmation"],
              ].map(([k, v], i) => (
                <div key={k} className={cn("rounded-2xl p-3", ["bg-tint-yellow", "bg-tint-blue", "bg-tint-green"][i])}>
                  <dt className="sr-only">{v}</dt>
                  <dd className="font-display text-2xl font-bold">{k}</dd>
                  <dd className="text-xs text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal delay={0.1}>
            <DemoFrame device="phone" tone="red" label="Animated preview: the AI agent answers a call and books a Saturday appointment.">
              <AiCall lines={a.transcript} />
            </DemoFrame>
          </Reveal>
        </div>
      </section>

      <Section className="bg-soft">
        <SectionHeading eyebrow="Capabilities" title={a.capabilitiesTitle} />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {a.capabilities.map((c) => (
            <RevealItem key={c.id} className={cn("grid content-start gap-3 rounded-[2rem] p-6", tone[c.tone].tint)}>
              <IconTile id={c.id} tone={c.tone} />
              <h3 className="text-xl font-bold">{c.title}</h3>
              <p className="text-muted">{c.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeading eyebrow="How it works" title={a.stepsTitle} align="center" />
        <RevealGroup className="mx-auto grid max-w-3xl gap-4">
          {a.steps.map((s, i) => (
            <RevealItem key={s.title} className="flex items-start gap-5 rounded-[2rem] border-2 border-line bg-surface p-6">
              <span className={cn("grid size-14 shrink-0 place-items-center rounded-2xl font-display text-2xl font-bold text-pine", ["bg-yellow", "bg-blue", "bg-green"][i])}>
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-1 text-muted">{s.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section className="bg-soft">
        <SectionHeading eyebrow="Questions" title="AI agent FAQ" />
        <Reveal className="max-w-3xl rounded-[2rem] bg-surface px-6 sm:px-8">
          <Accordion type="single" collapsible>
            {a.faq.map((q, i) => (
              <AccordionItem key={q.q} value={`q${i}`}>
                <AccordionTrigger>{q.q}</AccordionTrigger>
                <AccordionContent>{q.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>
      <CtaBand title="Hear the AI agent for yourself" body="Book a demo and we'll call you with a live AI receptionist set up for a sample salon." />
    </>
  );
}
