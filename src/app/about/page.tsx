import { MapPin } from "lucide-react";
import { PageHero, CtaBand, Section, SectionHeading } from "@/components/site/section";
import { IconTile } from "@/components/site/icon-tile";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { t } from "@/content/en";
import { site } from "@/lib/site";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { tone } from "@/lib/tone";
import { cn } from "@/lib/utils";

export const metadata = pageMeta({
  title: "About Yesbook",
  description: "Yesbook is an Ontario company building custom booking websites for local, appointment-based businesses across the GTA, from Hamilton to Ajax.",
  path: "/about/",
});

const a = t.about;

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }])} />
      <PageHero eyebrow="About us" title={a.title} lede={a.lede} blobs={["green", "pink"]} />
      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="grid content-start gap-5 text-lg leading-relaxed">
            <h2 className="text-3xl font-bold">Our story</h2>
            {a.story.map((p, i) => (
              <p key={i} className="text-muted">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="sticker grid content-start gap-4 rounded-[2rem] bg-tint-blue p-7 [--shadow-color:var(--blue)]">
            <span className="grid size-12 place-items-center rounded-2xl bg-blue text-pine">
              <MapPin aria-hidden className="size-6" />
            </span>
            <h2 className="text-2xl font-bold">Where we work</h2>
            <p className="text-muted">Based in Ontario and serving businesses across the Greater Toronto Area:</p>
            <ul className="flex flex-wrap gap-2">
              {site.region.areaServed.map((c) => (
                <li key={c} className="rounded-full bg-surface px-3 py-1 text-sm font-semibold">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
      <Section className="bg-soft">
        <SectionHeading eyebrow="What we believe" title="Four promises to every client" />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.values.map((v) => (
            <RevealItem key={v.id} className={cn("grid content-start gap-3 rounded-[2rem] p-6", tone[v.tone].tint)}>
              <IconTile id={v.id} tone={v.tone} />
              <h3 className="text-xl font-bold">{v.title}</h3>
              <p className="text-muted">{v.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
      <CtaBand title="Let's build your booking website together" />
    </>
  );
}
