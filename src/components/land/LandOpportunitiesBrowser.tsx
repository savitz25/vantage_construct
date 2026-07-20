"use client";

import { useMemo, useState } from "react";
import { LandOpportunityCard } from "@/components/land/LandOpportunityCard";
import {
  filterLandOpportunities,
  landOpportunities,
  landOpportunityFeatureLabels,
  landOpportunityTowns,
  type LandOpportunityFeature,
  type LandOpportunitySort,
  type LandOpportunityStatus,
} from "@/lib/land/opportunities";

const minAcreOptions = [
  { value: 0.5, label: "0.5+ acres" },
  { value: 0.75, label: "0.75+ acres" },
  { value: 1, label: "1+ acre" },
  { value: 1.5, label: "1.5+ acres" },
  { value: 2, label: "2+ acres" },
] as const;

const priceOptions = [
  { value: null as number | null, label: "Any price" },
  { value: 750000, label: "Under $750k" },
  { value: 1000000, label: "Under $1M" },
  { value: 1250000, label: "Under $1.25M" },
  { value: 1500000, label: "Under $1.5M" },
  { value: 2000000, label: "Under $2M" },
] as const;

const sortOptions: { value: LandOpportunitySort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price · low to high" },
  { value: "price-desc", label: "Price · high to low" },
  { value: "acres-desc", label: "Acreage · largest" },
  { value: "acres-asc", label: "Acreage · smallest" },
];

const featureOptions = Object.entries(landOpportunityFeatureLabels) as [
  LandOpportunityFeature,
  string,
][];

type ViewMode = "grid" | "map";

export function LandOpportunitiesBrowser() {
  const [town, setTown] = useState<string>("all");
  const [minAcres, setMinAcres] = useState(0.5);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [feature, setFeature] = useState<LandOpportunityFeature | "all">("all");
  const [status, setStatus] = useState<LandOpportunityStatus | "all">("all");
  const [sort, setSort] = useState<LandOpportunitySort>("newest");
  const [view, setView] = useState<ViewMode>("grid");
  const [selectedId, setSelectedId] = useState<string | null>(
    landOpportunities[0]?.id ?? null
  );

  const results = useMemo(
    () =>
      filterLandOpportunities({
        town,
        minAcres,
        maxPrice,
        query,
        feature,
        status,
        sort,
      }),
    [town, minAcres, maxPrice, query, feature, status, sort]
  );

  const selected =
    results.find((r) => r.id === selectedId) ?? results[0] ?? landOpportunities[0];

  const mapSrc = selected
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${selected.lng - 0.06}%2C${selected.lat - 0.04}%2C${selected.lng + 0.06}%2C${selected.lat + 0.04}&layer=mapnik&marker=${selected.lat}%2C${selected.lng}`
    : "https://www.openstreetmap.org/export/embed.html?bbox=-74.65%2C40.55%2C-74.25%2C40.78&layer=mapnik";

  return (
    <div className="space-y-8">
      {/* Filter bar */}
      <div className="card p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-text-dim">
            Town
            <select
              className="mt-1.5 w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm font-medium text-ivory"
              value={town}
              onChange={(e) => setTown(e.target.value)}
            >
              <option value="all">All key towns</option>
              {landOpportunityTowns.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-text-dim">
            Minimum acreage
            <select
              className="mt-1.5 w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm font-medium text-ivory"
              value={minAcres}
              onChange={(e) => setMinAcres(Number(e.target.value))}
            >
              {minAcreOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-text-dim">
            Price range
            <select
              className="mt-1.5 w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm font-medium text-ivory"
              value={maxPrice ?? ""}
              onChange={(e) =>
                setMaxPrice(e.target.value === "" ? null : Number(e.target.value))
              }
            >
              {priceOptions.map((o) => (
                <option key={String(o.value)} value={o.value ?? ""}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-text-dim">
            Feature
            <select
              className="mt-1.5 w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm font-medium text-ivory"
              value={feature}
              onChange={(e) =>
                setFeature(e.target.value as LandOpportunityFeature | "all")
              }
            >
              <option value="all">Any feature</option>
              {featureOptions.map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-text-dim">
            Status
            <select
              className="mt-1.5 w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm font-medium text-ivory"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as LandOpportunityStatus | "all")
              }
            >
              <option value="all">Any status</option>
              <option value="available">Available</option>
              <option value="under-review">Under review</option>
              <option value="coming-soon">Coming soon</option>
            </select>
          </label>

          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-text-dim">
            Sort
            <select
              className="mt-1.5 w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm font-medium text-ivory"
              value={sort}
              onChange={(e) => setSort(e.target.value as LandOpportunitySort)}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block min-w-0 flex-1 text-xs font-semibold uppercase tracking-[0.12em] text-text-dim">
            Search
            <input
              type="search"
              placeholder="Keyword, town, wooded, utilities…"
              className="mt-1.5 w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 text-sm font-medium text-ivory placeholder:text-text-dim"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              className={`btn !px-4 !py-2.5 text-xs ${view === "grid" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
            >
              Grid
            </button>
            <button
              type="button"
              className={`btn !px-4 !py-2.5 text-xs ${view === "map" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setView("map")}
              aria-pressed={view === "map"}
            >
              Map
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-text-muted">
          Showing{" "}
          <span className="font-semibold text-ivory">{results.length}</span> lot
          {results.length === 1 ? "" : "s"} · default filter{" "}
          <span className="text-gold-deep">0.5+ acres</span> in{" "}
          {landOpportunityTowns.join(", ")}.
        </p>
      </div>

      {results.length === 0 ? (
        <div className="card p-8 text-center sm:p-12">
          <h3 className="font-display text-2xl text-ivory">No lots match these filters</h3>
          <p className="mx-auto mt-2 max-w-md text-text-muted">
            Try widening acreage or price — or request a custom land search. We routinely review
            off-market and network parcels not shown here.
          </p>
          <a href="#custom-search" className="btn btn-primary mt-6">
            Request a custom land search
          </a>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((listing) => (
            <LandOpportunityCard
              key={listing.id}
              listing={listing}
              selected={listing.id === selected?.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            {results.map((listing) => (
              <button
                key={listing.id}
                type="button"
                onClick={() => setSelectedId(listing.id)}
                className={`card w-full p-4 text-left transition ${
                  listing.id === selected?.id
                    ? "border-gold/50 bg-gold/10"
                    : "hover:border-gold/30"
                }`}
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
                  {listing.town} · {listing.acres} ac
                </p>
                <p className="mt-1 font-display text-lg text-ivory">{listing.title}</p>
                <p className="mt-1 text-sm text-text-muted">{listing.priceLabel}</p>
              </button>
            ))}
          </div>
          <div className="lg:col-span-3">
            <div className="card overflow-hidden p-0">
              <div className="relative aspect-[4/3] min-h-[280px] w-full bg-bg-soft sm:min-h-[360px]">
                <iframe
                  title={
                    selected
                      ? `Map for ${selected.title} in ${selected.town}`
                      : "Land opportunities map"
                  }
                  src={mapSrc}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {selected ? (
                <div className="border-t border-border p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-dim">
                    Selected parcel
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-ivory">{selected.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">
                    {selected.town} · {selected.acres} ac · {selected.priceLabel}
                  </p>
                  <p className="mt-2 text-sm text-text-muted line-clamp-3">{selected.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={`/land/opportunities/${selected.slug}`}
                      className="btn btn-primary !px-4 !py-2.5 text-xs"
                    >
                      View details
                    </a>
                    <a href="/land/evaluation#lot-audit" className="btn btn-secondary !px-4 !py-2.5 text-xs">
                      Request evaluation
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-text-dim">
              Map pins are approximate for privacy and prototype inventory. Confirm exact parcel
              boundaries during evaluation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
