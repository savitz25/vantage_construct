"use client";

import Link from "next/link";
import { company } from "@/lib/company";
import {
  FORM_CONFIRMATIONS,
  type ConfirmationVariant,
} from "@/lib/forms/confirmation-copy";

type Props = {
  variant: ConfirmationVariant;
  /** Compact for sidebar / studio gates */
  compact?: boolean;
  /** Override optional resource link (e.g. Cost Studio after design lead) */
  extraLinks?: { href: string; label: string; primary?: boolean }[];
  className?: string;
};

/**
 * Premium on-page confirmation after form success — segment-specific copy.
 */
export function FormConfirmation({
  variant,
  compact = false,
  extraLinks,
  className = "",
}: Props) {
  const c = FORM_CONFIRMATIONS[variant];
  const links = extraLinks?.length ? extraLinks : c.links;

  if (compact) {
    return (
      <div className={`studio-lead-card studio-lead-success ${className}`}>
        <p className="studio-estimate-label">{c.eyebrow}</p>
        <h3 className="mt-1 font-display text-2xl text-ivory">{c.headline}</h3>
        <p className="mt-2 text-sm text-text-muted">{c.body}</p>
        {c.secondary ? (
          <p className="mt-2 text-xs text-text-dim">{c.secondary}</p>
        ) : null}
        {links?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {links.slice(0, 2).map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className={`btn !px-4 !py-2.5 text-xs ${l.primary ? "btn-primary" : "btn-secondary"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`card relative overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-12 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,160,53,0.12),transparent_50%),radial-gradient(circle_at_bottom,rgba(11,31,74,0.04),transparent_55%)]" />
      <div className="relative mx-auto max-w-lg">
        <p className="eyebrow justify-center">{c.eyebrow}</p>
        <h3 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">{c.headline}</h3>
        <p className="mt-4 text-text-muted">{c.body}</p>
        {c.secondary ? (
          <p className="mt-3 text-sm text-text-dim">{c.secondary}</p>
        ) : null}
        {links?.length ? (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {links.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className={`btn ${l.primary ? "btn-primary" : "btn-secondary"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        ) : null}
        <p className="mt-8 text-sm text-text-dim">
          <a className="font-medium text-navy hover:text-gold-deep" href={`tel:${company.phoneTel}`}>
            {company.phone}
          </a>
          {" · "}
          <a
            className="font-medium text-navy hover:text-gold-deep"
            href="https://vantagecustombuilds.com"
          >
            vantagecustombuilds.com
          </a>
        </p>
      </div>
    </div>
  );
}
