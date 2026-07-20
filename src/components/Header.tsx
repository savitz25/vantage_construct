"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { trackNavClick } from "@/lib/analytics";
import { company, nav } from "@/lib/company";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>("Transformations");
  const menuId = useId();

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

  function onNav(label: string, href: string, location: "desktop" | "mobile") {
    trackNavClick(label, href, location);
    if (location === "mobile") setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-[rgba(251,249,246,0.92)] backdrop-blur-xl shadow-[0_8px_30px_rgba(40,30,15,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex h-[4.5rem] items-center justify-between gap-4">
        <BrandLogo
          variant="header"
          priority
          onClick={() => onNav("Logo", "/", open ? "mobile" : "desktop")}
        />

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {nav.map((item) => (
            <div
              key={item.href + item.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
              onFocus={() => setActiveMenu(item.label)}
            >
              <Link
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-text-muted transition hover:text-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-haspopup={"children" in item && item.children ? "menu" : undefined}
                aria-expanded={
                  "children" in item && item.children ? activeMenu === item.label : undefined
                }
                onClick={() => onNav(item.label, item.href, "desktop")}
              >
                {item.label}
              </Link>
              {"children" in item && item.children && activeMenu === item.label ? (
                <div
                  className="absolute left-0 top-full min-w-[300px] pt-3"
                  role="menu"
                  aria-label={`${item.label} submenu`}
                >
                  <div className="card overflow-hidden p-2 shadow-lg">
                    {item.children.map((child, idx) => (
                      <Link
                        key={`${child.href}-${child.label}`}
                        href={child.href}
                        role="menuitem"
                        className={`block rounded-lg px-3 py-2.5 text-sm transition hover:bg-bg-elevated hover:text-gold-deep focus-visible:bg-bg-elevated focus-visible:outline-none ${
                          idx === 0 && item.label === "Transformations"
                            ? "font-medium text-ivory"
                            : "text-text-muted"
                        }`}
                        onClick={() => onNav(`${item.label} › ${child.label}`, child.href, "desktop")}
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
            className="hidden text-sm text-text-muted transition hover:text-gold-deep md:inline"
          >
            {company.phone}
          </a>
          <Link
            href="/start"
            className="btn btn-primary !px-4 !py-2.5 text-xs sm:text-sm"
            onClick={() => onNav("Start Your Project", "/start", open ? "mobile" : "desktop")}
          >
            Start Your Project
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ivory xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
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
          id={menuId}
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-bg-elevated xl:hidden"
        >
          <div className="container-wide space-y-2 py-5">
            {nav.map((item) => {
              const hasChildren = "children" in item && item.children && item.children.length > 0;
              const expanded = mobileExpanded === item.label;

              return (
                <div key={item.href + item.label} className="border-b border-border pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={item.href}
                      className="font-display text-2xl text-ivory"
                      onClick={() => onNav(item.label, item.href, "mobile")}
                    >
                      {item.label}
                    </Link>
                    {hasChildren ? (
                      <button
                        type="button"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-gold-deep"
                        aria-expanded={expanded}
                        aria-label={expanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                        onClick={() =>
                          setMobileExpanded((cur) => (cur === item.label ? null : item.label))
                        }
                      >
                        <span className={`text-lg leading-none transition ${expanded ? "rotate-45" : ""}`}>
                          +
                        </span>
                      </button>
                    ) : null}
                  </div>
                  {hasChildren && expanded ? (
                    <div className="mt-3 grid gap-1 pl-1">
                      {item.children!.map((child) => (
                        <Link
                          key={`${child.href}-${child.label}`}
                          href={child.href}
                          className="rounded-lg px-3 py-2.5 text-sm text-text-muted transition hover:bg-surface hover:text-gold-deep"
                          onClick={() =>
                            onNav(`${item.label} › ${child.label}`, child.href, "mobile")
                          }
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
            <a
              href={`tel:${company.phoneTel}`}
              className="block py-3 text-gold"
              onClick={() => onNav("Phone", `tel:${company.phoneTel}`, "mobile")}
            >
              {company.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
