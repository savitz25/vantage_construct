import Link from "next/link";
import { company } from "@/lib/company";
import { locationHubs } from "@/lib/content";

/**
 * Compact town-guide strip for hub pages — strengthens location discoverability
 * and internal links into /locations/[slug].
 */
export function LocationsStrip({
  heading = "Where we build",
  body,
  compact = false,
}: {
  heading?: string;
  body?: string;
  compact?: boolean;
}) {
  const intro =
    body ??
    `Deep local roots in ${company.focusTowns.join(", ")} — with service across ${company.counties.join(", ")} counties.`;

  return (
    <section
      className={`border-t border-border bg-bg-elevated ${compact ? "section-sm" : "section"}`}
      aria-labelledby="locations-strip-heading"
    >
      <div className="container-wide">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Service areas</p>
            <h2
              id="locations-strip-heading"
              className="mt-2 font-display text-3xl text-ivory sm:text-4xl"
            >
              {heading}
            </h2>
            <p className="mt-3 text-sm text-text-muted sm:text-base">{intro}</p>
          </div>
          <Link href="/locations" className="btn btn-secondary min-h-11 shrink-0">
            All town guides
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {locationHubs.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="card card-hover flex min-h-[4.5rem] flex-col justify-center p-4 transition"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
                {loc.county} County
              </span>
              <span className="mt-1 font-display text-xl text-ivory">{loc.name}</span>
              <span className="mt-1 text-xs font-semibold text-navy">Town guide →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
