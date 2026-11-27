"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/content/en";
import { tone } from "@/lib/tone";
import { cn } from "@/lib/utils";

const cad = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

export function PricingTable() {
  const [yearly, setYearly] = useState(false);
  const p = t.pricing;
  return (
    <div className="grid gap-10">
      <div role="radiogroup" aria-label="Billing period" className="mx-auto flex items-center gap-1 rounded-full border-2 border-ink bg-surface p-1.5">
        {[
          { v: false, label: p.monthly },
          { v: true, label: p.yearly },
        ].map((o) => (
          <button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={yearly === o.v}
            onClick={() => setYearly(o.v)}
            className={cn(
              "flex h-11 items-center gap-2 rounded-full px-5 font-semibold transition-colors",
              yearly === o.v ? "bg-fg text-bg" : "text-fg hover:bg-soft",
            )}
          >
            {o.label}
            {o.v && <span className="rounded-full bg-yellow px-2 py-0.5 text-xs font-bold text-pine">{p.yearlyNote}</span>}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {p.plans.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly;
          const popular = "popular" in plan && plan.popular;
          return (
            <article
              key={plan.id}
              className={cn(
                "relative grid content-start gap-6 rounded-[2rem] p-7",
                popular ? cn("sticker", tone[plan.tone].shadow, "bg-tint-yellow lg:-translate-y-3") : cn("border-2 border-line bg-surface"),
              )}
            >
              {popular && (
                <span className="absolute -top-4 left-7 inline-flex items-center gap-1 rounded-full bg-fg px-3 py-1 text-sm font-bold text-bg">
                  <Sparkles aria-hidden className="size-3.5" /> Most popular
                </span>
              )}
              <div className="grid gap-1">
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="text-muted">{plan.for}</p>
              </div>
              <div className="min-h-16">
                {price == null ? (
                  <>
                    <p className="font-display text-4xl font-bold">Contact us</p>
                    <p className="text-sm text-muted">Pricing tailored to your business</p>
                  </>
                ) : (
                  <>
                    <p className="font-display text-5xl font-bold tabular-nums">
                      {cad.format(yearly ? price / 12 : price)}
                      <span className="text-lg font-medium text-muted"> /month</span>
                    </p>
                    <p className="text-sm text-muted">{yearly ? `Billed ${cad.format(price)} yearly, plus HST` : "Billed monthly, plus HST"}</p>
                  </>
                )}
              </div>
              <Button asChild variant={popular ? "cta" : "outline"} size="lg">
                <Link href={`/contact/?plan=${plan.id}`}>{price == null ? "Get a quote" : "Start with a demo"}</Link>
              </Button>
              <ul className="grid gap-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-pine", tone[plan.tone].bg)}>
                      <Check aria-hidden className="size-3.5" strokeWidth={3} />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <p className="text-center text-sm text-muted">All prices in Canadian dollars. Applicable taxes extra.</p>
    </div>
  );
}
