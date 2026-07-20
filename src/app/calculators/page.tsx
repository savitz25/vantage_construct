import Link from "next/link";
import { CalculatorHubCards } from "@/components/calculators/CalculatorHubCards";
import { TrackCalculatorHubView } from "@/components/calculators/TrackCalculatorHubView";
import { PageHero } from "@/components/PageHero";
import { calculators } from "@/lib/calculators/catalog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Planning Calculators NJ | Cost, Feasibility & Decision Tools",
  description:
    "Cost Studio, Move or Improve, ADU Payback, lot feasibility, multi-lot highest-and-best-use, and renovate-vs-rebuild tools from Vantage Construction — plan with clarity before you commit.",
  path: "/calculators",
});

export default function CalculatorsHubPage() {
  return (
    <>
      <TrackCalculatorHubView />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Calculators", path: "/calculators" },
        ]}
        eyebrow="Planning calculators"
        title="Cost, feasibility, and decision tools — without the design rabbit hole"
        description={`${calculators.length} focused calculators for North Jersey homeowners and landowners. For visual design experiences, visit Studios. Here: honest ranges, tradeoffs, and next steps.`}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#tools" className="btn btn-primary">
            Browse calculators
          </a>
          <Link href="/studios" className="btn btn-secondary">
            Prefer visual Studios?
          </Link>
        </div>
      </PageHero>

      <section id="tools" className="section scroll-mt-28 pt-0">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">All tools</p>
              <h2 className="mt-2 font-display text-3xl text-ivory">Choose a calculator</h2>
            </div>
            <p className="max-w-sm text-sm text-text-dim">
              Conceptual planning aids — not formal bids or appraisals. Each tool carries clear
              disclaimers and a path to a real conversation.
            </p>
          </div>
          <CalculatorHubCards />
        </div>
      </section>

      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide grid gap-6 lg:grid-cols-2">
          <div className="card p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Studios vs calculators
            </p>
            <h2 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
              Two ways to explore
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-text-muted">
              <li>
                <strong className="text-ivory">Studios</strong> — visual design and configurators
                (kitchens, basements, garages, outdoor living, Design Studio).
              </li>
              <li>
                <strong className="text-ivory">Calculators</strong> — cost ranges, payback math,
                feasibility, and stay-vs-move decisions.
              </li>
            </ul>
            <Link href="/studios" className="btn btn-secondary mt-6">
              Open Studios hub →
            </Link>
          </div>
          <div className="card p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Ready for a real number?
            </p>
            <h2 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
              Tools educate. Consultations decide.
            </h2>
            <p className="mt-3 text-sm text-text-muted">
              When the model is close enough, schedule a complimentary conversation — site, zoning,
              and program get real.
            </p>
            <Link href="/start" className="btn btn-primary mt-6">
              Schedule a consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
