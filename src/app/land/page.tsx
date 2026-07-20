import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { landDevelopments } from "@/lib/content";
import { company } from "@/lib/company";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Land Development",
  description:
    "Single-lot evaluation, multi-lot development, and best-use analysis across Central & Northern New Jersey by Vantage Construction.",
  path: "/land",
});

export default function LandPage() {
  return (
    <>
      <PageHero
        eyebrow="Land & development"
        title="Unlock your land’s true potential"
        description={`With over 35 years of local market knowledge across ${company.counties.join(", ")} counties, we help maximize property opportunity — with no surprises along the way.`}
      />
      <section className="section pt-0">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          <Link href="/land/evaluation" className="card card-hover p-8">
            <h2 className="font-display text-3xl text-ivory">Single-lot opportunities</h2>
            <p className="mt-3 text-text-muted">
              Find or evaluate the perfect lot for your dream home. We maximize potential through
              proven land analysis and deep zoning knowledge in Warren, Watchung, Basking Ridge, and
              Millburn-Short Hills.
            </p>
          </Link>
          <Link href="/land/multi-lot" className="card card-hover p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Highest & best use
            </p>
            <h2 className="mt-2 font-display text-3xl text-ivory">Multi-lot development</h2>
            <p className="mt-3 text-text-muted">
              What could your acreage be worth as multiple luxury lots? Interactive potential tool,
              sell / entitle / partner paths, and proof including {landDevelopments.join(", ")}.
            </p>
          </Link>
          <Link href="/land/spec-homes" className="card card-hover p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Signature Builds
            </p>
            <h2 className="mt-2 font-display text-3xl text-ivory">Signature Builds</h2>
            <p className="mt-3 text-text-muted">
              Luxury homes under construction with a phase-based customization window — plus Early
              Access to inventory before public release.
            </p>
          </Link>
        </div>
        <div className="container-v mt-10">
          <div className="card p-8">
            <h2 className="font-display text-3xl text-ivory">Best use & return analysis</h2>
            <p className="mt-3 text-text-muted">
              Our detailed evaluation process helps determine the highest and best use — luxury
              custom build, strategic development, or investment opportunity — while navigating
              permits, entitlements, and approvals.
            </p>
          </div>
        </div>
      </section>
      <CtaBanner title="Discuss your land opportunity" />
    </>
  );
}
