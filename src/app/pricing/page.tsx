import { PageHero, CtaBand, Section, SectionHeading, Mark } from "@/components/site/section";
import { PricingTable } from "@/components/site/pricing-table";
import { Reveal } from "@/components/motion/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/site/json-ld";
import { t } from "@/content/en";
import { pageMeta, faqLd, breadcrumbLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Pricing",
  description: "Simple monthly or yearly plans for Yesbook booking apps, in Canadian dollars. Every plan includes setup, your own branded app and local Ontario support.",
  path: "/pricing/",
  keywords: ["salon booking app price Canada", "salon software cost Ontario"],
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[faqLd(t.pricing.faq), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing/" }])]} />
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Simple pricing for <Mark>growing</Mark> businesses
          </>
        }
        lede={t.pricing.lede}
        blobs={["yellow", "green"]}
      />
      <Section className="pt-0 sm:pt-0">
        <PricingTable />
      </Section>
      <Section className="bg-soft">
        <SectionHeading eyebrow="Questions" title="Pricing FAQ" />
        <Reveal className="max-w-3xl rounded-[2rem] bg-surface px-6 sm:px-8">
          <Accordion type="single" collapsible>
            {t.pricing.faq.map((q, i) => (
              <AccordionItem key={q.q} value={`q${i}`}>
                <AccordionTrigger>{q.q}</AccordionTrigger>
                <AccordionContent>{q.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>
      <CtaBand />
    </>
  );
}
