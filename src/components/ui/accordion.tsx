"use client";

import * as React from "react";
import { Accordion as A } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = A.Root;

function AccordionItem({ className, ...props }: React.ComponentProps<typeof A.Item>) {
  return <A.Item className={cn("border-b-2 border-line last:border-b-0", className)} {...props} />;
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof A.Trigger>) {
  return (
    <A.Header className="flex">
      <A.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold transition-colors hover:text-green-ink",
          className,
        )}
        {...props}
      >
        {children}
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-tint-yellow transition-transform duration-300 group-data-[state=open]:rotate-180">
          <ChevronDown aria-hidden className="size-4" />
        </span>
      </A.Trigger>
    </A.Header>
  );
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof A.Content>) {
  return (
    <A.Content
      className="overflow-hidden data-[state=closed]:animate-[acc-up_200ms_ease-out] data-[state=open]:animate-[acc-down_250ms_ease-out]"
      {...props}
    >
      <div className={cn("pb-5 pr-12 text-muted", className)}>{children}</div>
    </A.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
