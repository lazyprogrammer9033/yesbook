import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero, CtaBand, Mark } from "@/components/site/section";
import { FeatureDemo } from "@/components/demos/feature-demos";
import { IconTile } from "@/components/site/icon-tile";
import { Reveal } from "@/components/motion/reveal";
import { ScrollTilt } from "@/components/motion/scroll-tilt";
import { JsonLd } from "@/components/site/json-ld";
import { t } from "@/content/en";
import { pageMeta, productLd, breadcrumbLd } from "@/lib/seo";
import { tone } from "@/lib/tone";
import { cn } from "@/lib/utils";

export const metadata = pageMeta({
  title: "Booking website features",
  description:
    "Online and in-store booking, client records, staff and services, SMS reminders, reports and automatic secure backups. Everything your business needs in one branded booking website.",
  path: "/product/",
  keywords: ["salon software features", "salon booking website", "custom booking website"],
});

export default function ProductPage() {
  return (
    <>
      <JsonLd data={[productLd, breadcrumbLd([{ name: "Home", path: "/" }, { name: "Product", path: "/product/" }])]} />
      <PageHero
        eyebrow="Your booking website"
        title={
          <>
            One website. <Mark>Every</Mark> booking tool you need.
          </>
        }
        lede="Built for the way salons, studios and clinics really work, then branded as your own. Here's everything inside."
        blobs={["green", "yellow"]}
      >
        <nav aria-label="Features on this page">
          <ul className="flex flex-wrap gap-2">
            {t.features.map((f) => (
              <li key={f.id}>
                <Link
                  href={`#${f.id}`}
                  className={cn("inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 font-semibold transition-transform hover:-translate-y-0.5", tone[f.tone].tint)}
                >
                  <IconTile id={f.id} tone={f.tone} size="sm" className="size-8 rounded-full [&_svg]:size-4" />
                  {f.title.replace(" (optional)", "")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="grid gap-6 pb-12">
        {t.features.map((f, i) => (
          <section key={f.id} id={f.id} aria-labelledby={`${f.id}-title`} className={cn("overflow-x-clip py-14 sm:py-20", i % 2 === 1 && "bg-soft")}>
            <div className="container-x grid items-center gap-12 lg:grid-cols-2">
              <Reveal className={cn("grid gap-5", i % 2 === 1 && "lg:order-2")}>
                <IconTile id={f.id} tone={f.tone} size="lg" />
                <h2 id={`${f.id}-title`} className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05]">
                  {f.title}
                </h2>
                <p className="text-lg text-muted">{f.body}</p>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 font-medium">
                      <span className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-pine", tone[f.tone].bg)}>
                        <Check aria-hidden className="size-3.5" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <ScrollTilt flip={i % 2 === 1} className={cn(i % 2 === 1 && "lg:order-1")}>
                <FeatureDemo id={f.id} tone={f.tone} className="mx-auto w-full max-w-md" />
              </ScrollTilt>
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
