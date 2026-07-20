import Link from "next/link";
import { CostStudio } from "@/components/cost-studio/CostStudio";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { costDisclaimer, costFaqs } from "@/lib/cost-studio/model";
import {
  createMetadata,
  faqJsonLd,
  localBusinessJsonLd,
  serviceJsonLd,
} from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cost to Build a House in NJ Calculator | North Jersey Custom Home",
  description:
    "What does it cost to build a custom house in New Jersey? Interactive Cost Studio with real Vantage plan anchors (~$241–$348/sq ft base), finish tiers, basement & lifestyle packages for Warren, Basking Ridge, Watchung & North Jersey.",
  path: "/cost-to-build-a-house-nj",
});

const planAnchors = [
  {
    name: "Cypress Hollow–scale",
    sf: "1,479 sf",
    base: "from $515,000",
    psf: "~$348/sq ft",
    note: "Efficient luxury footprint — higher $/sf is normal at smaller sizes.",
  },
  {
    name: "Emerald Cottage–scale",
    sf: "2,889 sf",
    base: "from $860,000",
    psf: "~$298/sq ft",
    note: "Mid-size family home range — common North Jersey custom band.",
  },
  {
    name: "Grand Alpine–scale",
    sf: "4,954 sf",
    base: "from $1,195,000",
    psf: "~$241/sq ft",
    note: "Estate-scale construction — $/sf eases as massing grows.",
  },
];

const methodology = [
  {
    t: "Start with published plan anchors",
    b: "Our curve is calibrated to real Vantage Available Homes base prices — not a national average scraped from the internet. Smaller plans often run higher per square foot; larger plans trend lower per square foot before finish upgrades.",
  },
  {
    t: "Layer North Jersey reality",
    b: "Basements, snow-ready roofs, knockdown complexity, outdoor living, and finish tiers change totals more than square footage alone. The Studio lets you toggle those choices and see the range move live.",
  },
  {
    t: "Exclude what must be excluded",
    b: "Land, sitework, permits, utilities, and design fees are never buried in a fake “all-in” number. That honesty is how No Surprises works — and why serious buyers trust the tool.",
  },
  {
    t: "Refine in Design & Discovery",
    b: "A calculator is a decision aid, not a bid. When scope is comparable, early ranges often land within about 10–15% of final construction cost. Your lot and specs set the final number.",
  },
];

export default function CostToBuildNjPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(costFaqs)} />
      <JsonLd
        data={serviceJsonLd({
          name: "Cost to Build a Custom House in New Jersey — Consultation & Estimating",
          description:
            "Interactive construction cost ranges for luxury custom homes in Central & Northern New Jersey, calibrated to Vantage plan anchors.",
          path: "/cost-to-build-a-house-nj",
          serviceType: "Custom home construction cost estimating",
        })}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Studios", href: "/studios" },
          { label: "Cost to Build NJ", path: "/cost-to-build-a-house-nj" },
        ]}
        eyebrow="Vantage Vision Cost Studio"
        title="Cost to build a custom house in New Jersey"
        description={`What does it cost to build a house in NJ? This interactive Cost Studio is calibrated to real Vantage plan anchors for ${company.focusTowns.join(", ")} and surrounding Somerset, Morris, Union, and Essex communities — not generic national averages.`}
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
              b: "Published Vantage bases imply roughly $241–$348/sq ft construction before land — then finish & lifestyle packages layer on.",
            },
            {
              t: "North Jersey reality",
              b: "Basements, snow-ready roofs, knockdown rebuilds, outdoor living — costs national calculators miss.",
            },
            {
              t: "No surprises",
              b: "Instant free range. Itemized detail when you want it. Land, sitework, permits, and utilities always excluded and stated.",
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
            Real portfolio $/sq ft anchors (construction base)
          </h2>
          <p className="mt-4 max-w-3xl text-text-muted">
            These examples mirror published Vantage Available Homes base construction pricing.
            Your Studio estimate starts from a similar curve, then adjusts for size, finish tier,
            basement program, roof, garage, and lifestyle packages.
          </p>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {planAnchors.map((x) => (
              <div key={x.name} className="card p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-text-dim">{x.name}</p>
                <p className="mt-2 font-display text-3xl text-ivory">{x.psf}</p>
                <p className="mt-2 text-sm text-gold">
                  {x.sf} · {x.base}
                </p>
                <p className="mt-3 text-sm text-text-muted">{x.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-text-dim">*{costDisclaimer}</p>
          <div className="mt-8">
            <Link href="/available-homes" className="btn btn-secondary">
              View available home designs
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">
            What does it cost to build in Warren, Basking Ridge & beyond?
          </h2>
          <div className="prose-v mt-6 max-w-3xl space-y-4 text-text-muted">
            <p>
              Luxury custom homes in Central & Northern New Jersey typically cost far more per
              square foot than Sun Belt averages. Labor, codes, basement norms, finishes, and dense
              municipalities push quality custom construction into the mid-$200s to $600+/sq ft band
              depending on finish tier and complexity — with estate-level projects climbing higher.
            </p>
            <p>
              Vantage publishes transparent base plan pricing so you can see real construction
              starting points before land and site variables. This Cost Studio uses those anchors as
              the engine, then lets you scale size, finish tier, basement program, roof, garage, and
              lifestyle packages while a live visual model updates.
            </p>
            <p>
              Building in {company.focusTowns.join(", ")}, or nearby towns across{" "}
              {company.counties.join(", ")} counties? Start here, then bring your range into a
              complimentary consultation with Master Builder {company.founder}.
            </p>
          </div>
        </div>
      </section>

      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-4xl text-ivory">How the Cost Studio works</h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Google cannot “use” the calculator — so here is the methodology in plain language for
            homeowners and search engines alike.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {methodology.map((item) => (
              <div key={item.t} className="card p-7">
                <h3 className="font-display text-2xl text-ivory">{item.t}</h3>
                <p className="mt-3 text-sm text-text-muted">{item.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="font-display text-4xl text-ivory">Explore related tools & services</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/design-studio",
                label: "Design Studio",
                note: "Style, size, and finish vision",
              },
              {
                href: "/move-or-improve-calculator-nj",
                label: "Move or Improve",
                note: "Sell vs renovate with NJ fees",
              },
              {
                href: "/custom-homes",
                label: "Custom homes",
                note: "New construction process",
              },
              {
                href: "/custom-homes/rebuilds",
                label: "Knockdowns & rebuilds",
                note: "Teardown on your lot",
              },
              {
                href: "/locations",
                label: "Town guides",
                note: "Warren, Watchung, Basking Ridge…",
              },
              {
                href: "/finished-basement-cost-nj",
                label: "Basement Builder",
                note: "Lower-level cost ranges",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="card card-hover p-6">
                <span className="font-display text-2xl text-ivory">{item.label}</span>
                <p className="mt-2 text-sm text-text-muted">{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">
            Cost to build a house in NJ — FAQs
          </h2>
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
