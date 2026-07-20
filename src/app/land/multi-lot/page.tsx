import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ConfidentialLandForm } from "@/components/land/ConfidentialLandForm";
import { HighestBestUseTool } from "@/components/land/HighestBestUseTool";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { landDevelopments } from "@/lib/content";
import {
  multiLotDisclaimer,
  multiLotFaqs,
  multiLotPaths,
  multiLotProcess,
  multiLotTrackRecord,
} from "@/lib/land/multi-lot-content";
import { createMetadata, faqJsonLd, localBusinessJsonLd, serviceJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Multi-Lot Land Development NJ | Highest & Best Use",
  description:
    "What could your North Jersey acreage be worth as a multi-lot opportunity? Confidential land assessments, highest-and-best-use thinking, and experienced partnership with Vantage Construction.",
  path: "/land/multi-lot",
});

export default function MultiLotPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(multiLotFaqs)} />
      <JsonLd
        data={serviceJsonLd({
          name: "Multi-Lot Subdivision & Land Development Advisory",
          description:
            "Highest and best use exploration, multi-lot feasibility, and development partnership discussions for landowners in Central & Northern New Jersey.",
          path: "/land/multi-lot",
          serviceType: "Multi-lot land development consulting",
        })}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Land", href: "/land" },
          { label: "Multi-Lot Development", path: "/land/multi-lot" },
        ]}
        eyebrow="Multi-lot · Highest & best use"
        title="What could your land actually be worth?"
        description="One parcel. Multiple luxury homesites. Sometimes significantly more value — if zoning, topography, and market support it. Vantage helps landowners see the real options: sell as-is, partner to develop, or sell with eyes open."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#confidential-assessment" className="btn btn-primary">
            Request a confidential land assessment
          </a>
          <a href="#highest-best-use" className="btn btn-secondary">
            Explore lot potential
          </a>
        </div>
      </PageHero>

      {/* Aerial visual */}
      <section className="border-b border-border bg-bg-elevated">
        <div className="container-wide py-6 sm:py-8">
          <div className="relative aspect-[21/9] min-h-[200px] overflow-hidden rounded-2xl border border-border">
            <SmartImage
              src="/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp"
              alt="Aerial of a multi-home luxury community setting — multi-lot development potential"
              fill
              priority
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 max-w-xl sm:bottom-6 sm:left-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                Advisory · Discreet
              </p>
              <p className="mt-1 font-display text-xl text-white drop-shadow sm:text-2xl">
                Closer to a private consultation than a marketing funnel — especially for family land
                and long-held parcels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive tool */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">Highest & best use lens</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Make the upside tangible — without over-promising
            </h2>
            <p className="mt-3 text-text-muted">
              A conceptual acreage → lot yield tool for North Jersey luxury density. Use it to frame
              the conversation, then validate with a confidential assessment.
            </p>
          </div>
          <HighestBestUseTool />
        </div>
      </section>

      {/* Three paths */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Three clear paths</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Sell as-is · Partner · Strategic sale
            </h2>
            <p className="mt-3 text-text-muted">
              Most owners only consider the first option. The right answer depends on your timeline,
              risk tolerance, and the land itself.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {multiLotPaths.map((p) => (
              <article key={p.id} className="card flex flex-col p-6 sm:p-7">
                <h3 className="font-display text-2xl text-ivory">{p.title}</h3>
                <p className="mt-1 text-sm font-semibold text-gold-deep">{p.tagline}</p>
                <p className="mt-3 flex-1 text-sm text-text-muted">{p.body}</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
                      Upside
                    </p>
                    <ul className="mt-1.5 space-y-1 text-xs text-text-muted">
                      {p.pros.map((x) => (
                        <li key={x}>✓ {x}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-text-dim">
                      Trade-offs
                    </p>
                    <ul className="mt-1.5 space-y-1 text-xs text-text-dim">
                      {p.cons.map((x) => (
                        <li key={x}>· {x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-5 border-t border-border pt-4 text-xs text-text-muted">
                  <strong className="text-ivory">Best for: </strong>
                  {p.bestFor}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">How we work with landowners</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">A calm, sequential process</h2>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {multiLotProcess.map((s) => (
              <li key={s.step} className="card p-6">
                <span className="font-display text-2xl text-gold">{s.step}</span>
                <h3 className="mt-2 font-display text-xl text-ivory">{s.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Track record */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Track record</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Communities that prove the craft
            </h2>
            <p className="mt-3 text-text-muted">
              Named developments including {landDevelopments.join(", ")}. Past work illustrates
              capability — not a guarantee of future outcomes on your parcel.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {multiLotTrackRecord.map((d) => (
              <div key={d.name} className="card p-6">
                <h3 className="font-display text-2xl text-ivory">{d.name}</h3>
                <p className="mt-2 text-sm text-text-muted">{d.note}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-10 aspect-[21/9] min-h-[180px] overflow-hidden rounded-2xl border border-border">
            <SmartImage
              src="/media/plans/d973d32e-ridgeview-hires17-768x512.webp"
              alt="Luxury residential community character — multi-lot development quality"
              fill
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Confidential form */}
      <section className="section">
        <div className="container-v max-w-3xl">
          <ConfidentialLandForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">Multi-lot FAQs</h2>
          <div className="mt-8 space-y-4">
            {multiLotFaqs.map((item) => (
              <details key={item.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-xl text-ivory sm:text-2xl">{item.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-xs text-text-dim">*{multiLotDisclaimer}</p>
        </div>
      </section>

      {/* Links */}
      <section className="section-sm border-t border-border">
        <div className="container-wide">
          <h2 className="font-display text-3xl text-ivory">Related paths</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/land/evaluation",
                label: "Single-lot evaluation",
                note: "One homesite feasibility",
              },
              {
                href: "/land/spec-homes",
                label: "Signature Builds",
                note: "Homes during construction",
              },
              {
                href: "/partners/investors",
                label: "Investor partnerships",
                note: "Capital structures (separate)",
              },
              {
                href: "/partners/realtors",
                label: "Realtor partners",
                note: "Land & listing collaboration",
              },
              { href: "/custom-homes", label: "Custom homes", note: "End-product craftsmanship" },
              {
                href: "/cost-to-build-a-house-nj",
                label: "Cost Studio",
                note: "Construction ranges",
              },
              { href: "/start", label: "Consultation", note: "Talk with the team" },
              { href: "/locations", label: "Town guides", note: "Where we work" },
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
