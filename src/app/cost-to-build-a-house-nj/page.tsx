import Link from "next/link";
import { CostStudio } from "@/components/cost-studio/CostStudio";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { costDisclaimer, costFaqs } from "@/lib/cost-studio/model";
import { createMetadata, faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cost to Build a House in NJ Calculator | North Jersey Custom Home",
  description:
    "Interactive cost-to-build calculator for Central & Northern New Jersey. Calibrated to Vantage plan anchors and luxury finish tiers — free instant range, detailed breakdown, Design Studio integration.",
  path: "/cost-to-build-a-house-nj",
});

export default function CostToBuildNjPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(costFaqs)} />

      <PageHero
        eyebrow="Vantage Vision Cost Studio"
        title="Cost to build a custom house in North Jersey"
        description={`An interactive design + construction cost studio for ${company.focusTowns.join(", ")} and surrounding Somerset, Morris, Union, and Essex communities. Live ranges update as you design — calibrated to real Vantage plan pricing, not generic national averages.`}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#calculator" className="btn btn-primary">
            Open the calculator
          </a>
          <Link href="/design-studio" className="btn btn-secondary">
            Design Studio
          </Link>
          <Link href="/available-homes" className="btn btn-secondary">
            Browse plans
          </Link>
        </div>
      </PageHero>

      <section className="section-sm border-y border-border bg-bg-elevated">
        <div className="container-wide grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Real plan anchors",
              b: "Math mirrors published Vantage bases (e.g. smaller plans near ~$350/sf construction, larger plans easing downward) then layers finish & lifestyle.",
            },
            {
              t: "North Jersey reality",
              b: "Basements, snow-ready roofs, knockdown rebuilds, outdoor living — the costs national calculators miss.",
            },
            {
              t: "No surprises",
              b: "Instant free range. Itemized breakdown gated. Land, sitework, permits, and utilities always excluded and clearly stated.",
            },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <h2 className="font-display text-2xl text-ivory">{x.t}</h2>
              <p className="mt-2 text-sm text-text-muted">{x.b}</p>
            </div>
          ))}
        </div>
      </section>

      <CostStudio />

      <section className="section bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">
            What does it cost to build in Warren, Basking Ridge & beyond?
          </h2>
          <div className="prose-v mt-6 max-w-3xl space-y-4 text-text-muted">
            <p>
              Luxury custom homes in Central & Northern New Jersey typically cost far more per
              square foot than Sun Belt averages. Labor, codes, basement norms, finishes, and
              dense municipalities push quality custom construction into multi-hundreds of dollars
              per square foot — with estate-level projects climbing higher still.
            </p>
            <p>
              Vantage publishes transparent base plan pricing so you can see real construction
              starting points before land and site variables. This Cost Studio uses those anchors as
              the engine, then lets you scale size, finish tier, basement program, roof, garage, and
              lifestyle packages while a live visual model updates.
            </p>
            <p className="text-sm text-text-dim">*{costDisclaimer}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Plan anchor example", v: "1,479 sf from $515k" },
              { k: "Mid-size example", v: "2,889 sf from $860k" },
              { k: "Estate-scale example", v: "4,954 sf from $1,195k" },
            ].map((x) => (
              <div key={x.k} className="card p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-text-dim">{x.k}</p>
                <p className="mt-2 font-display text-2xl text-ivory">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">FAQs</h2>
          <div className="mt-8 space-y-4">
            {costFaqs.map((item) => (
              <details key={item.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-ivory">{item.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/custom-homes/process" className="btn btn-secondary">
              7-step process
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
