"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/lib/company";

/**
 * Premium fixed bottom action bar on mobile — Call + primary path + tools.
 * Hidden on md+ and on pages that already use dense studio chrome.
 */
export function StickyCta() {
  const pathname = usePathname() || "/";

  // Hide on form-heavy start page (its own CTAs) and legal
  const hide =
    pathname === "/start" ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms");

  if (hide) return null;

  const third = thirdAction(pathname);

  return (
    <div
      className="mobile-action-bar md:hidden"
      role="navigation"
      aria-label="Quick actions"
    >
      <a
        href={`tel:${company.phoneTel}`}
        className="mobile-action-item"
        aria-label={`Call ${company.phone}`}
      >
        <span className="mobile-action-icon" aria-hidden>
          <PhoneIcon />
        </span>
        <span className="mobile-action-label">Call</span>
      </a>

      <Link href="/start" className="mobile-action-primary">
        Start project
      </Link>

      <Link href={third.href} className="mobile-action-item" aria-label={third.label}>
        <span className="mobile-action-icon" aria-hidden>
          {third.icon}
        </span>
        <span className="mobile-action-label">{third.short}</span>
      </Link>
    </div>
  );
}

function thirdAction(pathname: string): {
  href: string;
  label: string;
  short: string;
  icon: ReactNode;
} {
  if (
    pathname.startsWith("/kitchen-remodel") ||
    pathname.startsWith("/finished-basement") ||
    pathname.startsWith("/attic-conversion") ||
    pathname.startsWith("/accessory-building") ||
    pathname.startsWith("/outdoor-kitchen") ||
    pathname.startsWith("/primary-suite") ||
    pathname.startsWith("/studios") ||
    pathname.startsWith("/design-studio")
  ) {
    return {
      href: "/studios",
      label: "All Studios",
      short: "Studios",
      icon: <GridIcon />,
    };
  }
  if (
    pathname.startsWith("/cost-to-build") ||
    pathname.startsWith("/move-or-improve") ||
    pathname.startsWith("/adu-cost") ||
    pathname.startsWith("/calculators")
  ) {
    return {
      href: "/calculators",
      label: "All calculators",
      short: "Tools",
      icon: <CalcIcon />,
    };
  }
  if (pathname.startsWith("/land")) {
    return {
      href: "/land/evaluation",
      label: "Evaluate my lot",
      short: "My lot",
      icon: <MapIcon />,
    };
  }
  if (pathname.startsWith("/custom-homes/rebuilds")) {
    return {
      href: "/custom-homes/rebuilds#assessment",
      label: "Rebuild assessment",
      short: "Assess",
      icon: <CalcIcon />,
    };
  }
  if (pathname.startsWith("/insights")) {
    return {
      href: "/insights/faq",
      label: "FAQ answers",
      short: "FAQ",
      icon: <FaqIcon />,
    };
  }
  // Default: Cost Studio — highest-intent tool
  return {
    href: "/cost-to-build-a-house-nj",
    label: "Open Cost Studio",
    short: "Cost",
    icon: <CalcIcon />,
  };
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5h2.2l1 4.2-1.8 1.1a12.5 12.5 0 0 0 5.3 5.3l1.1-1.8 4.2 1v2.2c0 .9-.7 1.7-1.6 1.7C10.8 18.2 5.8 13.2 5.8 6.1c0-.9.8-1.6 1.7-1.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalcIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 8h8M8 12h2.5M13.5 12H16M8 16h2.5M13.5 16H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function FaqIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8V14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.5" r="0.8" fill="currentColor" />
    </svg>
  );
}
