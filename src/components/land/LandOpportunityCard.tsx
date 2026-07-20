"use client";

import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { trackEvent } from "@/lib/analytics";
import {
  formatAcres,
  formatLandPrice,
  landOpportunityFeatureLabels,
  landOpportunityStatusLabel,
  type LandOpportunity,
} from "@/lib/land/opportunities";

const statusStyles: Record<LandOpportunity["status"], string> = {
  available: "bg-emerald-800/90 text-white",
  "under-review": "bg-amber-800/90 text-white",
  "coming-soon": "bg-navy/90 text-white border border-gold/40",
};

export function LandOpportunityCard({
  listing,
  selected,
  onSelect,
}: {
  listing: LandOpportunity;
  selected?: boolean;
  onSelect?: (id: string) => void;
}) {
  const href = `/land/opportunities/${listing.slug}`;
  const featurePreview = listing.features.slice(0, 3);

  return (
    <article
      className={`card card-hover group flex flex-col overflow-hidden p-0 transition ring-offset-2 ring-offset-bg ${
        selected ? "ring-2 ring-gold" : ""
      }`}
    >
      <Link
        href={href}
        className="relative block aspect-[16/10] bg-bg-soft"
        onClick={() => {
          onSelect?.(listing.id);
          trackEvent("land_opportunity_card_click", {
            event_category: "land_opportunities",
            slug: listing.slug,
            town: listing.town,
          });
        }}
      >
        <SmartImage
          src={listing.image}
          alt={listing.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] ${statusStyles[listing.status]}`}
          >
            {landOpportunityStatusLabel[listing.status]}
          </span>
          <span className="rounded-full border border-white/25 bg-black/45 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            {formatAcres(listing.acres)}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-bright">
            {listing.town} · {listing.county} County
          </p>
          <h3 className="font-display text-xl text-white drop-shadow sm:text-2xl">{listing.title}</h3>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm text-text-muted">{listing.locationLabel}</p>
        <p className="mt-2 font-display text-2xl text-gold-deep">{formatLandPrice(listing)}</p>
        <p className="mt-3 line-clamp-2 text-sm text-text-muted">{listing.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {listing.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full border border-border bg-bg-elevated px-2.5 py-1 text-[0.65rem] font-medium text-ivory"
            >
              {h}
            </li>
          ))}
        </ul>

        {featurePreview.length ? (
          <p className="mt-3 text-xs text-text-dim">
            {featurePreview.map((f) => landOpportunityFeatureLabels[f]).join(" · ")}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={href}
            className="btn btn-primary !px-4 !py-2.5 text-xs"
            onClick={() =>
              trackEvent("land_opportunity_view_details", {
                event_category: "land_opportunities",
                slug: listing.slug,
              })
            }
          >
            View details
          </Link>
          <Link
            href="/land/evaluation#lot-audit"
            className="btn btn-secondary !px-4 !py-2.5 text-xs"
            onClick={() =>
              trackEvent("land_opportunity_request_eval", {
                event_category: "land_opportunities",
                slug: listing.slug,
              })
            }
          >
            Request evaluation
          </Link>
        </div>
      </div>
    </article>
  );
}
