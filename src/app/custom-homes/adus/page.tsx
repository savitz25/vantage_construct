import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { PlanCard } from "@/components/PlanCard";
import { plans } from "@/lib/plans";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Accessory Dwelling Units (ADUs)",
  description:
    "Maximize your New Jersey property with a custom ADU for rental income, multi-generational living, or private guest space — built by Vantage Construction.",
  path: "/custom-homes/adus",
});

export default function AdusPage() {
  const aduPlans = plans.filter((p) => p.aduCandidate || p.sqft < 1200);

  return (
    <>
      <PageHero
        eyebrow="ADUs"
        title="Accessory dwelling units that add value"
        description="Maximize your property’s potential with a custom ADU — perfect for rental income, multi-generational living, or creating a private guest space while adding lasting value."
      />
      <section className="section pt-0">
        <div className="container-wide">
          <div className="card mb-10 grid gap-6 p-8 lg:grid-cols-3">
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
              <div key={item.title}>
                <h2 className="font-display text-2xl text-ivory">{item.title}</h2>
                <p className="mt-2 text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-3xl text-ivory">Plans with strong ADU potential</h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Compact designs like the Cozy Craftsman Cottage can serve as ADUs. We also design fully
            custom accessory dwellings to match your lot and local requirements.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {aduPlans.map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/available-homes" className="btn btn-secondary">
              Browse all plans
            </Link>
          </div>
        </div>
      </section>
      <CtaBanner title="Explore an ADU for your property" />
    </>
  );
}
