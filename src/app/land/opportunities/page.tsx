import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LandOpportunitiesBrowser } from "@/components/land/LandOpportunitiesBrowser";
import { LocationsStrip } from "@/components/LocationsStrip";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { company } from "@/lib/company";
import {
  landOpportunities,
  landOpportunityFaqs,
  landOpportunityTowns,
} from "@/lib/land/opportunities";
import { createMetadata, faqJsonLd, localBusinessJsonLd, serviceJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Land Opportunities North Jersey | Lots & Land ½ Acre+",
  description:
    "Browse curated lots and land over ½ acre in Warren, Watchung, Basking Ridge, Millburn–Short Hills, and Westfield. Filter by town, acreage, and price — then request a Vantage land evaluation.",
  path: "/land/opportunities",
});

export default function LandOpportunitiesPage() {
  const listingCount = landOpportunities.length;
  const townLabel = landOpportunityTowns.join(", ");

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd([...landOpportunityFaqs])} />
      <JsonLd
        data={serviceJsonLd({
          name: "Land Opportunities — North Jersey Lots & Acreage",
          description:
            "Curated directory of residential lots and land opportunities over one-half acre in Central & Northern New Jersey key towns, with land evaluation and custom home guidance.",
          path: "/land/opportunities",
          serviceType: "Land opportunity directory and lot consulting",
        })}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Land", href: "/land" },
          { label: "Land Opportunities", path: "/land/opportunities" },
        ]}
        eyebrow="Land opportunities · North Jersey"
        title="Prime lots & land for your custom home"
        description={`Curated homesites over ½ acre across ${townLabel}. Filter by town, size, and price — then pair the right parcel with a Vantage land evaluation and build plan.`}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#listings" className="btn btn-primary">
            Browse {listingCount} opportunities
          </a>
          <a href="#custom-search" className="btn btn-secondary">
            Request a custom land search
          </a>
        </div>
      </PageHero>

      {/* Hero visual band */}
      <section className="border-b border-border bg-bg-elevated" aria-label="Land photography">
        <div className="container-wide py-6 sm:py-8">
          <div className="relative aspect-[21/9] min-h-[200px] overflow-hidden rounded-2xl border border-border sm:min-h-[260px]">
            <SmartImage
              src="/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp"
              alt="Aerial view of North Jersey land and residential community setting"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 max-w-2xl sm:bottom-6 sm:left-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-bright">
                Curated by Vantage — local experts since {company.founded}
              </p>
              <p className="mt-1 font-display text-xl text-white drop-shadow sm:text-2xl lg:text-3xl">
                Land Opportunities in North Jersey
              </p>
              <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">
                Half-acre and larger parcels where custom homes, outdoor living, and privacy can
                actually work — not just fit on paper.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border">
        <div className="container-wide py-8 sm:py-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "½ acre and up",
                b: "Default filter for buildable scale — setbacks, coverage, and outdoor program matter.",
              },
              {
                t: "Five key towns",
                b: townLabel + " — plus surrounding Somerset, Morris, Union, and Essex.",
              },
              {
                t: "Buildability first",
                b: "We read the land before the floor plan. Honest pursue · redesign · walk-away guidance.",
              },
            ].map((x) => (
              <div key={x.t} className="card p-5 sm:p-6">
                <h2 className="font-display text-xl text-ivory sm:text-2xl">{x.t}</h2>
                <p className="mt-2 text-sm text-text-muted">{x.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="section scroll-mt-28" aria-labelledby="listings-heading">
        <div className="container-wide">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">Browse inventory</p>
            <h2 id="listings-heading" className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Available lots & land over ½ acre
            </h2>
            <p className="mt-3 text-text-muted">
              Prototype directory for demonstration and early lead capture. Confirm availability and
              pricing during evaluation. Off-market and network parcels often move before public
              listing.
            </p>
          </div>
          <LandOpportunitiesBrowser />
        </div>
      </section>

      {/* Custom search CTA */}
      <section
        id="custom-search"
        className="section scroll-mt-28 border-t border-border bg-bg-elevated"
        aria-labelledby="custom-search-heading"
      >
        <div className="container-v">
          <div className="card relative overflow-hidden px-6 py-10 sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,160,78,0.16),transparent_55%)]" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="eyebrow">Not seeing what you need?</p>
                <h2
                  id="custom-search-heading"
                  className="mt-3 font-display text-3xl text-ivory sm:text-4xl"
                >
                  Request a custom land search
                </h2>
                <p className="mt-4 text-text-muted">
                  Tell us your town shortlist, minimum acreage, budget band, and must-haves
                  (schools, privacy, walkability, septic vs. sewer). We will work the network —
                  including off-market opportunities — and pair promising parcels with a Rapid
                  Feasibility Review.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-text-muted">
                  <li className="flex gap-2">
                    <span className="text-gold" aria-hidden>
                      ◆
                    </span>
                    Town-by-town lot patterns from decades of local building
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold" aria-hidden>
                      ◆
                    </span>
                    Clear site-risk flags before you over-commit
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gold" aria-hidden>
                      ◆
                    </span>
                    Path from land decision to custom home design
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link href="/land/evaluation#lot-audit" className="btn btn-primary min-h-12">
                  Schedule land evaluation
                </Link>
                <Link href="/start" className="btn btn-secondary min-h-12">
                  Start a consultation
                </Link>
                <a href={`tel:${company.phoneTel}`} className="btn btn-secondary min-h-12">
                  Call {company.phone}
                </a>
              </div>
            </div>
            <p className="relative mt-8 text-center text-xs text-text-dim lg:text-left">
              Curated by Vantage Construction — local experts since {company.founded}.{" "}
              {company.philosophy} process. Builder #{company.licenses.builder}.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section border-t border-border">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Questions</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              How this directory works
            </h2>
          </div>
          <dl className="mt-10 grid gap-4 md:grid-cols-2">
            {landOpportunityFaqs.map((f) => (
              <div key={f.q} className="card p-6">
                <dt className="font-display text-xl text-ivory">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Related paths */}
      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-3xl text-ivory">Continue with land</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/land/evaluation",
                label: "Land Evaluation",
                note: "Feasibility before you buy",
              },
              {
                href: "/land/spec-homes",
                label: "Signature Builds",
                note: "Homes under construction",
              },
              {
                href: "/land/multi-lot",
                label: "Multi-Lot Development",
                note: "Larger acreage potential",
              },
              { href: "/land", label: "Land hub", note: "All pathways" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="card card-hover p-5">
                <span className="font-display text-xl text-ivory">{l.label}</span>
                <p className="mt-1 text-xs text-text-dim">{l.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LocationsStrip
        compact
        heading="Lots differ by town"
        body="Pair inventory browsing with local guides — zoning culture and lot patterns shift across Warren, Watchung, Basking Ridge, Millburn–Short Hills, and Westfield."
      />
    </>
  );
}
