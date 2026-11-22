"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme";
import { Button } from "@/components/ui/button";
import { t } from "@/content/en";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled ? "glass border-x-0 border-t-0 shadow-[0_8px_30px_-20px_rgb(0_0_0/0.4)]" : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-yellow focus:px-4 focus:py-2 focus:font-semibold focus:text-pine"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label="Yesbook home" className="rounded-xl">
          <Logo id="yb-h" className="h-10 sm:h-11" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {t.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors hover:bg-soft",
                    isActive(item.href) && "bg-tint-brand text-brand-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="cta" className="hidden sm:inline-flex">
            <Link href="/contact/">{t.cta.demo}</Link>
          </Button>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full bg-brand text-on-brand lg:hidden"
                aria-label="Open menu"
              >
                <Menu aria-hidden className="size-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgb(10_15_46/0.5)] backdrop-blur-sm data-[state=open]:animate-[fade-in_200ms_ease-out]" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(24rem,100%)] flex-col gap-6 bg-bg p-6 pt-[max(1.5rem,env(safe-area-inset-top))] shadow-soft data-[state=open]:animate-[slide-in_280ms_cubic-bezier(.22,1,.36,1)]">
                <div className="flex items-center justify-between">
                  <Dialog.Title asChild>
                    <span>
                      <Logo id="yb-m" />
                    </span>
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button type="button" aria-label="Close menu" className="grid size-11 place-items-center rounded-full bg-soft">
                      <X aria-hidden className="size-5" />
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                <nav aria-label="Mobile">
                  <ul className="grid gap-2">
                    {[{ href: "/", label: "Home" }, ...t.nav].map((item, i) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-bold",
                            ["bg-tint-brand", "bg-tint-yellow", "bg-tint-green", "bg-tint-pink", "bg-tint-orange", "bg-tint-blue"][i % 6],
                          )}
                        >
                          {item.label}
                          <ArrowRight aria-hidden className="size-5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Button asChild variant="cta" size="lg" className="mt-auto">
                  <Link href="/contact/" onClick={() => setOpen(false)}>
                    {t.cta.demo}
                  </Link>
                </Button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
