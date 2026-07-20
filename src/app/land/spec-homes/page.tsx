import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { EarlyAccessForm } from "@/components/spec-homes/EarlyAccessForm";
import { SpecHomeCard } from "@/components/spec-homes/SpecHomeCard";
import {
  activeInventory,
  comparisonRows,
  customizationStages,
  pastSignatureBuilds,
  phaseMeta,
  specFaqs,
} from "@/lib/spec-homes/inventory";
import { createMetadata, faqJsonLd, localBusinessJsonLd, serviceJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Signature Builds NJ | Spec Homes with Customization Window",
  description:
    "Move-in ready luxury with personalization — Vantage Signature Builds across North Jersey. Buy during construction and design more of the home. Early Access list for new inventory.",
  path: "/land/spec-homes",
});

export default function SpecHomesPage() {
  const homes = activeInventory();

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(specFaqs)} />
      <JsonLd
        data={serviceJsonLd({
          name: "Signature Builds — Luxury Spec Homes with Customization Window",
          description:
            "Curated luxury homes under construction or upcoming in Central & Northern New Jersey, with phase-based buyer customization.",
          path: "/land/spec-homes",
          serviceType: "Spec / semi-custom luxury home sales",
        })}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Land", href: "/land" },
          { label: "Signature Builds", path: "/land/spec-homes" },
        ]}
        eyebrow="Signature Builds · Spec with a design window"
        title="New construction speed. Your personalization."
        description="The earlier you reserve a Signature Build, the more of it you get to design. Kitchen, baths, finishes — even plan refinements in early phases — without waiting years for a fully custom timeline."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#inventory" className="btn btn-primary">
            View available & upcoming homes
          </a>
          <a href="#early-access" className="btn btn-secondary">
            Join the Early Access list
          </a>
        </div>
      </PageHero>

      {/* Key insight strip */}
      <section className="border-y border-border bg-bg-elevated">
        <div className="container-wide py-8 sm:py-10">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Buy during construction",
                b: "Skip the multi-year blank-lot wait while still shaping the home’s most important rooms.",
              },
              {
                t: "Customization is phase-based",
                b: "Phase 1 is maximum design freedom. Phase 4 is turn-key. Every card shows your window.",
              },
              {
                t: "Exclusive inventory",
                b: "Many opportunities move on the Early Access list before broad public marketing.",
              },
            ].map((x) => (
              <div key={x.t} className="card p-6">
                <h2 className="font-display text-xl text-ivory sm:text-2xl">{x.t}</h2>
                <p className="mt-2 text-sm text-text-muted">{x.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inventory */}
      <section id="inventory" className="section scroll-mt-28">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Current & upcoming inventory</p>
              <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
                Signature Builds with a clear customization window
              </h2>
              <p className="mt-3 text-text-muted">
                Status badges show construction phase first — because that decides how much of the
                home is still yours to design.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.1em]">
              {([1, 2, 3, 4] as const).map((p) => (
                <span
                  key={p}
                  className={`rounded-full px-2.5 py-1 text-white ${phaseMeta[p].color}`}
                >
                  {phaseMeta[p].short}: {phaseMeta[p].badge}
                </span>
              ))}
            </div>
          </div>

          {homes.length ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {homes.map((h) => (
                <SpecHomeCard key={h.slug} home={h} />
              ))}
            </div>
          ) : (
            <div className="card mt-10 p-8 text-center">
              <h3 className="font-display text-2xl text-ivory">Inventory updates often</h3>
              <p className="mt-2 text-text-muted">
                Join Early Access to hear about the next Signature Build before it is public.
              </p>
              <a href="#early-access" className="btn btn-primary mt-6">
                Join the Early Access list
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Customization window explainer */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">How the window works</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              What you can still influence at each phase
            </h2>
            <p className="mt-3 text-text-muted">
              High-net-worth buyers want speed and personalization. This is the trade-off map —
              transparent, phase by phase.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {customizationStages.map((s) => {
              const meta = phaseMeta[s.phase];
              return (
                <div key={s.phase} className="card flex flex-col p-6">
                  <span
                    className={`w-fit rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white ${meta.color}`}
                  >
                    Phase {s.phase}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-ivory">{s.title}</h3>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
                    Still open
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-text-muted">
                    {s.canStill.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="text-gold-deep">✓</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-text-dim">
                    Typically closed
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-text-dim">
                    {s.closed.map((x) => (
                      <li key={x}>· {x}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Choose your path</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Spec vs custom vs resale
            </h2>
            <p className="mt-3 text-text-muted">
              Signature Builds sit between full custom control and resale speed — when you reserve
              early enough.
            </p>
          </div>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 font-semibold text-text-dim">Path</th>
                  <th className="py-3 pr-4 font-semibold text-text-dim">Control</th>
                  <th className="py-3 pr-4 font-semibold text-text-dim">Timeline</th>
                  <th className="py-3 font-semibold text-text-dim">Best for</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.path} className="border-b border-border/70">
                    <td className="py-4 pr-4 font-display text-lg text-ivory">{row.path}</td>
                    <td className="py-4 pr-4 text-text-muted">{row.control}</td>
                    <td className="py-4 pr-4 text-text-muted">{row.timeline}</td>
                    <td className="py-4 text-text-muted">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/custom-homes" className="btn btn-secondary">
              Fully custom homes
            </Link>
            <Link href="/custom-homes/rebuilds" className="btn btn-secondary">
              Knockdown rebuilds
            </Link>
            <Link href="/available-homes" className="btn btn-secondary">
              Browse design library
            </Link>
          </div>
        </div>
      </section>

      {/* Past / sold */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Social proof</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Quality homes move during construction
            </h2>
            <p className="mt-3 text-text-muted">
              Recent and representative Signature outcomes — inventory turns when buyers engage
              early.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pastSignatureBuilds.map((p) => (
              <article key={p.name} className="card overflow-hidden p-0">
                <div className="relative aspect-[16/10]">
                  <SmartImage
                    src={p.image}
                    alt={`${p.name} in ${p.town}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    Sold / completed
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.12em] text-gold-deep">{p.town}</p>
                  <h3 className="mt-1 font-display text-xl text-ivory">{p.name}</h3>
                  <p className="mt-1 text-sm text-text-dim">
                    {p.beds} bed · {p.baths} bath · ~{p.sqft.toLocaleString()} sf
                  </p>
                  <p className="mt-3 text-sm text-text-muted">{p.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Early access */}
      <section className="section">
        <div className="container-v max-w-3xl">
          <EarlyAccessForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">Signature Builds FAQs</h2>
          <div className="mt-8 space-y-4">
            {specFaqs.map((item) => (
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
          <h2 className="font-display text-3xl text-ivory">Related next steps</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/design-studio", label: "Design Studio", note: "Explore style & vision" },
              { href: "/cost-to-build-a-house-nj", label: "Cost Studio", note: "Construction ranges" },
              { href: "/land/evaluation", label: "Land evaluation", note: "Lot feasibility first" },
              { href: "/custom-homes/rebuilds", label: "Rebuilds", note: "Keep the lot you love" },
              { href: "/available-homes", label: "Design library", note: "Browse plan portfolio" },
              { href: "/partners/investors", label: "Investors", note: "Capital partnerships" },
              { href: "/start", label: "Consultation", note: "Talk with the team" },
              { href: "/locations", label: "Town guides", note: "Where we build" },
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
