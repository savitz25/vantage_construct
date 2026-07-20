"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import {
  transformSecondaryLinks,
  transformServices,
} from "@/lib/transformations/ia";

type Props = {
  currentPath: string;
  /** sticky under header on scroll */
  sticky?: boolean;
  /** denser bar for mid-page placement */
  compact?: boolean;
  className?: string;
};

/**
 * Horizontal room switcher so users can jump between transformation
 * services without returning to the top nav.
 */
export function TransformServiceNav({
  currentPath,
  sticky = false,
  compact = false,
  className = "",
}: Props) {
  const links = [
    ...transformServices.map((s) => ({
      href: s.href,
      label: s.navLabel ?? s.label,
      short: shortLabel(s.label),
    })),
    {
      href: "/transformations/remodeling",
      label: "Whole-home remodel",
      short: "Whole home",
    },
  ];

  return (
    <nav
      aria-label="Transformation services"
      className={`${
        sticky
          ? "sticky top-[4.25rem] z-30 border-b border-border/80 bg-[rgba(251,249,246,0.92)] backdrop-blur-md"
          : "border-y border-border bg-bg-elevated"
      } ${className}`}
    >
      <div className={`container-wide ${compact ? "py-2.5" : "py-3"}`}>
        <div className="flex items-center gap-3">
          <p className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-dim sm:block">
            Explore rooms
          </p>
          <div className="-mx-1 flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {links.map((l) => {
              const active = currentPath === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() =>
                    trackEvent("transform_room_nav_click", {
                      event_category: "transformations",
                      from: currentPath,
                      to: l.href,
                    })
                  }
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                    active
                      ? "border-gold bg-gold/15 text-gold-deep shadow-sm"
                      : "border-border bg-surface text-text-muted hover:border-gold/40 hover:text-ivory"
                  }`}
                >
                  <span className="sm:hidden">{l.short}</span>
                  <span className="hidden sm:inline">{l.label}</span>
                </Link>
              );
            })}
          </div>
          <Link
            href="/transformations"
            className="hidden shrink-0 text-xs font-semibold text-gold-deep hover:underline lg:inline"
          >
            All →
          </Link>
        </div>
        {!compact ? (
          <div className="mt-2 hidden flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-text-dim md:flex">
            {transformSecondaryLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold-deep">
                {l.label}
              </Link>
            ))}
            <Link href="/studios" className="hover:text-gold-deep">
              Design Studios & calculators
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

function shortLabel(label: string): string {
  const map: Record<string, string> = {
    "Finished Basements": "Basements",
    "Kitchen Remodeling": "Kitchens",
    "Primary Suite": "Primary suite",
    "Home Additions": "Additions",
    "Garages & Accessory Buildings": "Garages",
    "Outdoor Living": "Outdoor",
    "Attic Conversions": "Attics",
  };
  return map[label] ?? label;
}
