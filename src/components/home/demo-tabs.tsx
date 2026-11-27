"use client";

import { useState } from "react";
import { Tabs } from "radix-ui";
import { FeatureDemo } from "@/components/demos/feature-demos";
import { IconTile } from "@/components/site/icon-tile";
import { t, type Tone } from "@/content/en";
import { cn } from "@/lib/utils";

const ids = ["online-booking", "in-store-booking", "ai-agent", "reminders", "reports"];

/** Interactive product tour: stands in for the demo video until real footage exists. */
export function DemoTabs() {
  const features = ids.map((id) => t.features.find((f) => f.id === id)!);
  const [value, setValue] = useState(ids[0]);
  return (
    <Tabs.Root value={value} onValueChange={setValue} className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
      <Tabs.List aria-label="Product tour" className="grid gap-2">
        {features.map((f) => (
          <Tabs.Trigger
            key={f.id}
            value={f.id}
            className={cn(
              "group flex items-start gap-4 rounded-3xl border-2 border-transparent p-4 text-left transition-colors hover:bg-soft",
              "data-[state=active]:border-ink data-[state=active]:bg-surface data-[state=active]:shadow-[5px_5px_0_var(--yellow)]",
            )}
          >
            <IconTile id={f.id} tone={f.tone as Tone} size="sm" />
            <span>
              <span className="block font-display text-lg font-bold">{f.title}</span>
              <span className="block text-muted">{f.short}</span>
            </span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {features.map((f) => (
        <Tabs.Content key={f.id} value={f.id} className="focus-visible:outline-none">
          <FeatureDemo id={f.id} tone={f.tone} className="mx-auto w-full max-w-md" />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
