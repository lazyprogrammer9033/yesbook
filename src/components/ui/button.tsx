import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn/ui-style button, themed for Yesbook.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,box-shadow,background-color,color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[1.1em] [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        // The bright yellow call to action, with a chunky pressed shadow.
        cta: "bg-yellow text-pine font-bold shadow-[0_4px_0_var(--yellow-deep)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_var(--yellow-deep)] active:shadow-[0_1px_0_var(--yellow-deep)]",
        primary: "bg-brand-ink text-on-brand shadow-[0_4px_0_color-mix(in_oklab,var(--brand-ink)_60%,black)] hover:-translate-y-0.5",
        outline:
          "border-2 border-ink/80 bg-surface text-fg hover:-translate-y-0.5 hover:bg-soft",
        ghost: "text-fg hover:bg-soft",
        link: "rounded-md px-0 text-fg underline decoration-2 underline-offset-4 decoration-brand hover:decoration-yellow",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.95rem]",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
