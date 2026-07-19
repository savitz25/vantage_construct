import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { TrackToolLanderView } from "@/components/TrackPageEvent";
import { MoveOrImproveTool } from "@/components/transformations/MoveOrImproveTool";
import { company } from "@/lib/company";
import { taxDisclaimer } from "@/lib/transformations/disclaimers";
import { moveImproveFaqs } from "@/lib/transformations/move-or-improve";
import { createMetadata, faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Move or Improve Calculator NJ | Cost of Selling vs Renovating",
  description:
    "Should you move or renovate in North Jersey? Compare true selling costs (commissions + NJ transfer fees) vs an addition that solves the same problem. Free interactive calculator.",
  path: "/move-or-improve-calculator-nj",
});

export default function MoveOrImprovePage() {
  return (
    <>
      <TrackToolLanderView tool="move-or-improve" path="/move-or-improve-calculator-nj" />
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(moveImproveFaqs)} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Transformations", href: "/transformations" },
          { label: "Home Additions", href: "/transformations/additions" },
          { label: "Move or Improve Calculator" },
        ]}
      />

      <section className="hero-grid grain border-b border-border pt-28 pb-8 sm:pt-32 sm:pb-10">
        <div className="container-wide relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Interactive tool · Move or improve</p>
              <h1 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">
                Move or Improve calculator
              </h1>
              <p className="mt-3 text-lg text-text-muted">
                Selling in {company.focusTowns.join(", ")} and nearby markets layers commissions and
                NJ transfer costs. Compare that friction against the addition that solves the same
                problem — then decide with clearer math.
              </p>
              <p className="mt-3 text-xs text-text-dim">*{taxDisclaimer}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/transformations/additions" className="btn btn-secondary">
                Learn how we build additions
              </Link>
              <Link href="/start" className="btn btn-primary">
                Schedule a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MoveOrImproveTool />

      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">FAQs</h2>
          <div className="mt-8 space-y-4">
            {moveImproveFaqs.map((f) => (
              <details key={f.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-ivory">{f.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/start" className="btn btn-primary">
              Schedule a consultation
            </Link>
            <Link href="/transformations/additions" className="btn btn-secondary">
              Learn how we build additions
            </Link>
            <Link href="/transformations" className="btn btn-secondary">
              All home transformations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
