"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { trackEvent } from "@/lib/analytics";
import {
  formatPrice,
  phaseMeta,
  type SpecHome,
} from "@/lib/spec-homes/inventory";

export function SpecHomeCard({ home }: { home: SpecHome }) {
  const phase = phaseMeta[home.phase];
  const href = `/land/spec-homes/${home.slug}`;

  return (
    <article className="card card-hover group flex flex-col overflow-hidden p-0">
      <Link
        href={href}
        className="relative block aspect-[16/10] bg-bg-soft"
        onClick={() =>
          trackEvent("spec_home_card_click", {
            event_category: "spec_homes",
            slug: home.slug,
            phase: home.phase,
          })
        }
      >
        <SmartImage
          src={home.heroImage}
          alt={`${home.name} in ${home.town} — Vantage Signature Build`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white ${phase.color}`}
          >
            {phase.short} · {phase.badge}
          </span>
          {home.status === "upcoming" ? (
            <span className="rounded-full border border-white/30 bg-black/40 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              Upcoming
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
            {home.town} · {home.county} County
          </p>
          <h3 className="font-display text-2xl text-white drop-shadow sm:text-3xl">{home.name}</h3>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="rounded-lg border border-gold/30 bg-gold/10 px-3 py-2.5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
            Customization window
          </p>
          <p className="mt-1 text-sm text-ivory">{phase.customizationLevel}</p>
        </div>

        <p className="mt-4 line-clamp-3 text-sm text-text-muted">{home.summary}</p>

        <dl className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-[0.65rem] uppercase tracking-wider text-text-dim">Beds</dt>
            <dd className="font-medium text-ivory">{home.beds}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] uppercase tracking-wider text-text-dim">Baths</dt>
            <dd className="font-medium text-ivory">{home.baths}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] uppercase tracking-wider text-text-dim">Sq ft</dt>
            <dd className="font-medium text-ivory">~{home.sqft.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] uppercase tracking-wider text-text-dim">Investment</dt>
            <dd className="font-medium text-gold-deep">
              {home.priceLabel ?? formatPrice(home.priceFrom)}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={href}
            className="btn btn-primary !px-4 !py-2.5 text-xs"
            onClick={() =>
              trackEvent("spec_home_view_details", {
                event_category: "spec_homes",
                slug: home.slug,
              })
            }
          >
            View details
          </Link>
          <a href="#early-access" className="btn btn-secondary !px-4 !py-2.5 text-xs">
            Early access list
          </a>
        </div>
      </div>
    </article>
  );
}
