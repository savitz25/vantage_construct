"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { company, nav } from "@/lib/company";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-[rgba(12,11,10,0.92)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="group flex flex-col" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-[0.04em] text-ivory transition group-hover:text-gold-bright">
            Vantage
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.28em] text-text-dim">
            Construction
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {nav.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-text-muted transition hover:text-gold-bright"
              >
                {item.label}
              </Link>
              {"children" in item && item.children && activeMenu === item.label ? (
                <div className="absolute left-0 top-full min-w-[240px] pt-3">
                  <div className="card overflow-hidden p-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2.5 text-sm text-text-muted transition hover:bg-white/5 hover:text-gold-bright"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${company.phoneTel}`}
            className="hidden text-sm text-text-muted transition hover:text-gold-bright md:inline"
          >
            {company.phone}
          </a>
          <Link href="/start" className="btn btn-primary !px-4 !py-2.5 text-xs sm:text-sm">
            Start Your Project
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ivory xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span className={`h-px w-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-px w-full bg-current transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-bg-elevated xl:hidden"
        >
          <div className="container-wide space-y-4 py-6">
            {nav.map((item) => (
              <div key={item.href} className="border-b border-border pb-4">
                <Link
                  href={item.href}
                  className="font-display text-2xl text-ivory"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {"children" in item && item.children ? (
                  <div className="mt-3 grid gap-2 pl-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="text-sm text-text-muted"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <a href={`tel:${company.phoneTel}`} className="block text-gold">
              {company.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
