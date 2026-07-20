import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LandHubRouter } from "@/components/land/LandHubRouter";
import { LocationsStrip } from "@/components/LocationsStrip";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { landDevelopments } from "@/lib/content";
import { company } from "@/lib/company";
import { landCredibility, landHubRelated } from "@/lib/land/hub-content";
import { createMetadata, localBusinessJsonLd, serviceJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Land for Sale & Lot Evaluation NJ | Signature Builds & Multi-Lot",
  description:
    "Browse land opportunities, evaluate buildable lots, explore Signature Builds, and assess multi-lot potential in Central & Northern New Jersey. Honest feasibility from Vantage Construction — Warren, Watchung, Basking Ridge & beyond.",
  path: "/land",
});

export default function LandPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          name: "Land Opportunities — Evaluation, Signature Builds & Multi-Lot",
          description:
            "Land opportunity hub for Central & Northern New Jersey: lot directory, single-lot feasibility, Signature Builds inventory, and multi-lot development advisory.",
          path: "/land",
          serviceType: "Land development and lot feasibility consulting",
        })}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Land", path: "/land" },
        ]}
        eyebrow="Land opportunity hub"
        title="What is your land actually capable of?"
        description="From a single homesite to a private enclave — clarity first. Tell us what best describes you, then open the pathway built for your situation."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#explore-path" className="btn btn-primary">
            Explore your path
          </a>
          <a href="#pathways" className="btn btn-secondary">
            View all pathways
          </a>
        </div>
      </PageHero>

      {/* Aerial hero band */}
      <section className="border-b border-border bg-bg-elevated" aria-label="Land photography">
        <div className="container-wide py-6 sm:py-8">
          <div className="relative aspect-[21/9] min-h-[200px] overflow-hidden rounded-2xl border border-border sm:min-h-[260px]">
            <SmartImage
              src="/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp"
              alt="Aerial of North Jersey land and residential community setting"
              fill
              priority
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 max-w-xl sm:bottom-6 sm:left-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                Land is the beginning of every great home
              </p>
              <p className="mt-1 font-display text-xl text-white drop-shadow sm:text-2xl">
                Premium guidance across {company.focusTowns.join(", ")}, and surrounding{" "}
                {company.serviceAreaLabel}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Routing question + three pathways */}
      <section className="section" aria-label="Land opportunity pathways">
        <div className="container-wide">
          <LandHubRouter />
        </div>
      </section>

      {/* Credibility strip */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Why Vantage</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              The right guide for land decisions
            </h2>
            <p className="mt-3 text-text-muted">
              Decades of local building and named multi-lot communities — so you get honest
              feasibility, not sales pressure. Track record includes{" "}
              {landDevelopments.join(", ")}.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {landCredibility.map((item) => (
              <div key={item.label} className="card p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-2xl text-ivory">{item.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — calm land consultation */}
      <section className="section" aria-labelledby="land-consult-heading">
        <div className="container-v">
          <div className="card relative overflow-hidden px-8 py-12 text-center sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,160,78,0.18),transparent_55%)]" />
            <div className="relative">
              <p className="eyebrow justify-center">Complimentary consultation</p>
              <h2
                id="land-consult-heading"
                className="mx-auto mt-4 max-w-3xl font-display text-3xl text-ivory sm:text-4xl lg:text-5xl"
              >
                Ready for a calm conversation about your land?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-text-muted">
                Whether you have a specific lot, larger acreage, or are exploring Signature Builds —
                schedule a complimentary land-related consultation. No pressure. Clear next steps.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/start" className="btn btn-primary">
                  Schedule your consultation
                </Link>
                <a href={`tel:${company.phoneTel}`} className="btn btn-secondary">
                  Call {company.phone}
                </a>
              </div>
              <p className="mt-5 text-xs text-text-dim">
                Serving {company.focusTowns.join(", ")} and surrounding {company.serviceAreaLabel}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-3xl text-ivory">Continue exploring</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {landHubRelated.map((l) => (
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
        heading="Land decisions by town"
        body="Pair lot evaluation with local guides — zoning culture and lot patterns differ across our core communities."
      />
    </>
  );
}
