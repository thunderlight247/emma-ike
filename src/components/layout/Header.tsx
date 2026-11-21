"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import Container from "@/components/ui/Container";
import ReserveButton from "@/components/booking/ReserveButton";
import Wordmark from "./Wordmark";

export default function Header() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const light = overHero && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        menuOpen
          ? "flex h-[100dvh] flex-col bg-ivory md:h-auto md:bg-transparent"
          : ""
      }`}
    >
      <div
        className={`transition-[background-color,border-color,padding] duration-300 shrink-0 ${
          menuOpen
            ? "border-b border-line bg-ivory py-4"
            : light
            ? "border-b border-transparent bg-transparent py-6"
            : "border-b border-line/80 bg-ivory/92 py-4 backdrop-blur-md"
        }`}
      >
        <Container className="flex items-center justify-between gap-8">
          <Wordmark light={light} />

          <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-[0.9375rem] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:transition-transform after:duration-300 ${
                    light ? "text-ivory/90 after:bg-ivory hover:text-ivory" : "text-ink/80 after:bg-forest hover:text-ink"
                  } ${active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <ReserveButton variant={light ? "light" : "primary"} className="px-5 py-2.5">
              Reserve
            </ReserveButton>
          </nav>

          <button
            type="button"
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors md:hidden ${
              light ? "border-ivory/50 text-ivory hover:bg-ivory/10" : "border-line text-ink hover:bg-paper"
            }`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </Container>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="flex-1 min-h-0 overflow-y-auto bg-ivory md:hidden"
          data-lenis-prevent
        >
          <Container className="flex min-h-full flex-col justify-between pt-6 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
            <nav aria-label="Mobile" className="flex flex-col">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`border-b border-line py-4 font-display text-3xl sm:text-4xl transition-colors hover:text-forest ${
                  pathname === "/" ? "font-semibold text-forest" : "text-ink"
                }`}
              >
                Home
              </Link>
              {site.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`border-b border-line py-4 font-display text-3xl sm:text-4xl transition-colors hover:text-forest ${
                      active ? "font-semibold text-forest" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-6">
                <ReserveButton
                  variant="primary"
                  className="w-full justify-center py-3.5 text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  Reserve a room
                </ReserveButton>
              </div>
            </nav>

            <div className="pt-8 text-stone">
              <p className="text-xs font-semibold tracking-wider uppercase text-stone/80">Location</p>
              <p className="mt-1 text-ink">{site.address.street}</p>
              <p className="text-stone">{site.address.locality}</p>
              <div className="mt-4">
                <a href={site.phoneHref} className="inline-block text-base font-medium text-forest hover:underline">
                  Call front desk ({site.phoneDisplay})
                </a>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
