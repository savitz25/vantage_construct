import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
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
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(moveImproveFaqs)} />
      <PageHero
        eyebrow="Vantage Studios · Transformations"
        title="Move or improve? Run the real North Jersey math"
        description={`Selling a home in ${company.focusTowns.join(", ")} and nearby markets layers commissions and transfer costs — including higher-value Graduated Percent Fee tiers. Improving often keeps more of your equity working at home.`}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#tool" className="btn btn-primary">
            Open calculator
          </a>
          <Link href="/studios" className="btn btn-secondary">
            All Vantage Studios
          </Link>
        </div>
        <p className="mt-6 max-w-2xl text-xs text-text-dim">*{taxDisclaimer}</p>
      </PageHero>
      <MoveOrImproveTool />
      <section className="section bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">FAQs</h2>
          <div className="mt-8 space-y-4">
            {moveImproveFaqs.map((f) => (
              <details key={f.q} className="card p-6">
                <summary className="cursor-pointer font-display text-2xl text-ivory">{f.q}</summary>
                <p className="mt-3 text-text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/transformations/additions" className="btn btn-secondary">
              Additions
            </Link>
            <Link href="/custom-homes/rebuilds" className="btn btn-secondary">
              Knockdowns
            </Link>
            <Link href="/start" className="btn btn-primary">
              Schedule consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
