import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { PlanCard } from "@/components/PlanCard";
import { TrackedLink } from "@/components/TrackedLink";
import { plans } from "@/lib/plans";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Accessory Dwelling Units (ADUs) NJ | Custom ADU Builder",
  description:
    "Maximize your New Jersey property with a custom ADU for rental income, multi-generational living, or private guest space — built by Vantage Construction.",
  path: "/custom-homes/adus",
});

export default function AdusPage() {
  const aduPlans = plans.filter((p) => p.aduCandidate || p.sqft < 1200);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Custom Homes", href: "/custom-homes" },
          { label: "ADUs", path: "/custom-homes/adus" },
        ]}
        eyebrow="ADUs · Accessory dwelling units"
        title="Accessory dwelling units that add value"
        description="Maximize your property’s potential with a custom ADU — perfect for rental income, multi-generational living, or creating a private guest space while adding lasting value across Warren, Watchung, Basking Ridge, and surrounding towns."
      >
        <div className="flex flex-wrap gap-3">
          <TrackedLink
            href="/adu-cost-calculator-nj#tool"
            className="btn btn-primary"
            serviceTool={{ service: "adus", ctaLabel: "Open the ADU Payback calculator" }}
          >
            Open the ADU Payback calculator
          </TrackedLink>
          <Link href="/start" className="btn btn-secondary">
            Schedule a consultation
          </Link>
        </div>
      </PageHero>

      <section className="section-sm border-y border-border bg-bg-elevated">
        <div className="container-wide">
          <TrackedLink
            href="/adu-cost-calculator-nj#tool"
            className="card card-hover relative block overflow-hidden p-8 sm:p-10"
            serviceTool={{ service: "adus", ctaLabel: "Open the ADU Payback calculator" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(201,160,78,0.16),transparent_55%)]" />
            <div className="relative grid gap-6 md:grid-cols-[1.3fr_0.7fr] md:items-center">
              <div>
                <span className="badge">Interactive tool</span>
                <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
                  ADU cost & payback in 60 seconds
                </h2>
                <p className="mt-3 max-w-2xl text-text-muted">
                  Model build cost, county rent presets, and illustrative break-even — then book a
                  site evaluation for zoning and lot reality.
                </p>
              </div>
              <div className="md:text-right">
                <span className="btn btn-primary">Open the ADU Payback calculator →</span>
              </div>
            </div>
          </TrackedLink>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Rental income",
                body: "Create a high-quality unit that can generate long-term income potential.",
              },
              {
                title: "Multi-generational living",
                body: "Keep family close with privacy, dignity, and independent living space.",
              },
              {
                title: "Guest & flex space",
                body: "Private quarters for guests, a home office suite, or creative studio living.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-7">
                <h2 className="font-display text-2xl text-ivory">{item.title}</h2>
                <p className="mt-2 text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-14 font-display text-3xl text-ivory">Plans with strong ADU potential</h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Compact designs like the Cozy Craftsman Cottage can serve as ADUs. We also design fully
            custom accessory dwellings to match your lot and local requirements.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {aduPlans.map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/available-homes" className="btn btn-secondary">
              Browse all plans
            </Link>
            <Link href="/transformations/garages" className="btn btn-secondary">
              Garages & accessory buildings
            </Link>
            <Link href="/land/evaluation" className="btn btn-secondary">
              Land evaluation
            </Link>
          </div>
        </div>
      </section>
      <CtaBanner title="Explore an ADU for your property" />
    </>
  );
}
