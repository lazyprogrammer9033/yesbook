import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, CtaBand, Mark, Section } from "@/components/site/section";
import { IconTile } from "@/components/site/icon-tile";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { t } from "@/content/en";
import { pageMeta, breadcrumbLd } from "@/lib/seo";
import { tone } from "@/lib/tone";
import { cn } from "@/lib/utils";

export const metadata = pageMeta({
  title: "Booking apps for salons, sports courts, spas, clinics and more",
  description:
    "Yesbook builds custom booking apps for hair salons, barbershops, badminton and pickleball courts, spas and nail studios, clinics, personal trainers and tutors across Toronto and the GTA.",
  path: "/industries/",
  keywords: ["barbershop booking app", "spa booking app", "clinic booking app Ontario", "tutor scheduling app", "badminton court booking", "pickleball court booking"],
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries/" }])} />
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Made for businesses that run on <Mark color="blue">appointments</Mark>.
          </>
        }
        lede="Every industry books a little differently. Your Yesbook app is set up around your services, your team and your clients."
        blobs={["pink", "blue"]}
      />
      <Section className="pt-0 sm:pt-0">
        <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.industries.map((i) => (
            <RevealItem key={i.id}>
              <article
                id={i.id}
                className={cn(
                  "sticker group grid h-full scroll-mt-28 content-start gap-4 rounded-[2rem] p-7 transition-transform duration-300 hover:-translate-y-1",
                  tone[i.tone].tint,
                  tone[i.tone].shadow,
                )}
              >
                <IconTile id={i.id} tone={i.tone} size="lg" className="transition-transform duration-300 group-hover:-rotate-6" />
                <h2 className="text-2xl font-bold">{i.title}</h2>
                <p className="text-muted">{i.body}</p>
                <ul className="flex flex-wrap gap-2">
                  {i.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-surface px-3 py-1 text-sm font-semibold">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
          <RevealItem>
            <Link
              href="/contact/"
              className="grid h-full min-h-64 content-center justify-items-center gap-3 rounded-[2rem] border-2 border-dashed border-muted/50 p-7 text-center transition-colors hover:border-ink hover:bg-soft"
            >
              <span className="font-display text-2xl font-bold">Don&apos;t see your business?</span>
              <span className="max-w-xs text-muted">If you take appointments, we can build your app. Tell us how you work.</span>
              <span className="inline-flex items-center gap-1 font-semibold text-green-ink">
                Talk to us <ArrowRight aria-hidden className="size-4" />
              </span>
            </Link>
          </RevealItem>
        </RevealGroup>
      </Section>
      <CtaBand />
    </>
  );
}
