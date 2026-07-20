import Link from "next/link";
import { CalculatorHubCards } from "@/components/calculators/CalculatorHubCards";
import { TrackCalculatorHubView } from "@/components/calculators/TrackCalculatorHubView";
import { LocationsStrip } from "@/components/LocationsStrip";
import { PageHero } from "@/components/PageHero";
import { calculators } from "@/lib/calculators/catalog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home Building Calculators NJ | Cost Studio & Feasibility Tools",
  description:
    "North Jersey planning calculators: Cost Studio, Move or Improve, ADU payback, lot feasibility, multi-lot HBU, and renovate vs rebuild — free tools from Vantage Construction before you commit.",
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

      <section className="section-sm border-b border-border bg-bg-elevated">
        <div className="container-wide grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Who these are for",
              body: "Homeowners and landowners who want directional ranges and tradeoffs before a formal bid — not a substitute for site-specific pricing.",
            },
            {
              title: "What you get",
              body: "Clear inputs, honest assumptions, and next steps into Cost Studio, land evaluation, Studios, or a conversation with the team.",
            },
            {
              title: "What they are not",
              body: "Appraisals, bank quotes, or guaranteed contracts. Every tool includes disclaimers so expectations stay clean.",
            },
          ].map((c) => (
            <div key={c.title} className="card p-6">
              <h2 className="font-display text-xl text-ivory sm:text-2xl">{c.title}</h2>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tools" className="section scroll-mt-28">
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

      <LocationsStrip
        compact
        heading="Local context behind the numbers"
        body="Ranges mean more when you know the town. Pair calculators with our Warren, Watchung, Basking Ridge, and Short Hills guides."
      />
    </>
  );
}
