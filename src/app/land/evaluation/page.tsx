import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LotAuditForm } from "@/components/land/LotAuditForm";
import { SetbackVisualizer } from "@/components/land/SetbackVisualizer";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { company } from "@/lib/company";
import {
  evaluationCases,
  evaluationDeliverables,
  evaluationFactors,
  evaluationFaqs,
  townInsights,
} from "@/lib/land/evaluation-content";
import { createMetadata, faqJsonLd, localBusinessJsonLd, serviceJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Land Evaluation NJ | Pre-Purchase Lot Audit & Feasibility",
  description:
    "Know what your North Jersey lot can support before you over-commit. Interactive setback visualizer, hidden site-cost flags, and Rapid Feasibility Reviews from Vantage Construction.",
  path: "/land/evaluation",
});

export default function LandEvaluationPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(evaluationFaqs)} />
      <JsonLd
        data={serviceJsonLd({
          name: "Land Evaluation & Pre-Purchase Lot Feasibility",
          description:
            "Professional feasibility review of residential lots in Central & Northern New Jersey — zoning envelope, topography, utilities, and site risk flags.",
          path: "/land/evaluation",
          serviceType: "Land evaluation / lot feasibility consulting",
        })}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Land", href: "/land" },
          { label: "Land Evaluation", path: "/land/evaluation" },
        ]}
        eyebrow="Land evaluation · North Jersey"
        title="Know what your lot can become — before you spend a dollar more"
        description="Can you build the home you want on this property? What hidden site costs are you about to walk into? Vantage turns anxiety into a clear pursue · redesign · or walk-away path — grounded in local zoning and 35+ years of build reality."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#feasibility-tool" className="btn btn-primary">
            Start a quick feasibility check
          </a>
          <a href="#lot-audit" className="btn btn-secondary">
            Request a Pre-Purchase Lot Audit
          </a>
        </div>
      </PageHero>

      {/* Hero visual */}
      <section className="border-b border-border bg-bg-elevated">
        <div className="container-wide py-6 sm:py-8">
          <div className="relative aspect-[21/9] min-h-[200px] overflow-hidden rounded-2xl border border-border sm:min-h-[260px]">
            <SmartImage
              src="/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp"
              alt="Aerial view of a custom home site — land evaluation and lot potential"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 max-w-lg sm:bottom-6 sm:left-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                Lot first. House second.
              </p>
              <p className="mt-1 font-display text-xl text-white drop-shadow sm:text-2xl">
                The smartest custom homes start with reading the land — not forcing a floor plan onto
                it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive centerpiece */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">Interactive feasibility</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              See how setbacks decide your dream
            </h2>
            <p className="mt-3 text-text-muted">
              Move the yards. Watch the buildable envelope change. Then flag common North Jersey site
              conditions that drive prep cost — and request a real audit for your address.
            </p>
          </div>
          <SetbackVisualizer />
        </div>
      </section>

      {/* What we evaluate */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">What we actually evaluate</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Seven lenses. One clear recommendation.
            </h2>
            <p className="mt-4 text-text-muted">
              Not a dense technical memo — a scannable map of the risks and opportunities that
              determine whether a lot is a gift or a money pit.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {evaluationFactors.map((f) => (
              <div key={f.id} className="card p-6">
                <span className="font-display text-2xl text-gold">{f.icon}</span>
                <h3 className="mt-2 font-display text-xl text-ivory">{f.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{f.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 card border-gold/25 bg-gold/5 p-6 sm:p-8">
            <h3 className="font-display text-2xl text-ivory">What you actually receive</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {evaluationDeliverables.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-text-muted">
                  <span className="text-gold-deep shrink-0">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Proof over promises</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Stories that build more trust than slogans
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {evaluationCases.map((c) => (
              <article key={c.title} className="card p-7 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${
                      c.outcome === "Walk away"
                        ? "bg-red-50 text-red-900 border border-red-200/60"
                        : "bg-emerald-50 text-emerald-900 border border-emerald-200/60"
                    }`}
                  >
                    {c.outcome}
                  </span>
                  <span className="text-xs text-text-dim">{c.town}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl text-ivory sm:text-3xl">{c.title}</h3>
                <p className="mt-3 text-text-muted">{c.story}</p>
                <p className="mt-4 text-sm font-semibold text-gold-deep">{c.lesson}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Town insight */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Local insight</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Town-by-town orientation — always verify
            </h2>
            <p className="mt-4 text-text-muted">
              High-level notes for {company.focusTowns.join(", ")}, and nearby markets. Every parcel
              is unique; ordinances and practices change. Treat this as orientation, not a permit.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {townInsights.map((t) => (
              <Link key={t.town} href={t.href} className="card card-hover p-6">
                <h3 className="font-display text-2xl text-ivory">{t.town}</h3>
                <p className="mt-2 text-sm text-text-muted">{t.notes}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-gold-deep">
                  Town guide →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-text-dim">
            Disclaimer: Zoning, environmental, and utility conditions must be confirmed with official
            sources and licensed professionals. Vantage provides builder-led feasibility guidance as
            part of a consultative process.
          </p>
        </div>
      </section>

      {/* Lead capture */}
      <section className="section">
        <div className="container-v max-w-3xl">
          <LotAuditForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">Land evaluation FAQs</h2>
          <div className="mt-8 space-y-4">
            {evaluationFaqs.map((item) => (
              <details key={item.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-xl text-ivory sm:text-2xl">{item.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="section-sm border-t border-border">
        <div className="container-wide">
          <h2 className="font-display text-3xl text-ivory">Continue your path</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/custom-homes/rebuilds",
                label: "Knockdowns & rebuilds",
                note: "When the lot is right and the house is not",
              },
              {
                href: "/cost-to-build-a-house-nj",
                label: "Cost Studio",
                note: "Construction ranges for your program",
              },
              {
                href: "/design-studio",
                label: "Design Studio",
                note: "Style, size, and vision tools",
              },
              {
                href: "/transformations",
                label: "Transformations",
                note: "If improving the current home wins",
              },
              { href: "/land", label: "All land services", note: "Multi-lot & development paths" },
              {
                href: "/custom-homes/process",
                label: "7-step process",
                note: "How we build after evaluation",
              },
              { href: "/start", label: "Schedule consultation", note: "Talk with Victor’s team" },
              {
                href: "/locations",
                label: "Town guides",
                note: "Warren, Watchung, Basking Ridge…",
              },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="card card-hover p-5">
                <span className="font-display text-xl text-ivory">{l.label}</span>
                <p className="mt-1 text-xs text-text-dim">{l.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
