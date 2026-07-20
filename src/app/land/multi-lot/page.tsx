import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ConfidentialLandForm } from "@/components/land/ConfidentialLandForm";
import { HighestBestUseTool } from "@/components/land/HighestBestUseTool";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import {
  entitlementObstacles,
  entitlementSteps,
  entitlementTimeline,
  multiLotDisclaimer,
  multiLotFaqs,
  multiLotPaths,
  multiLotProcess,
  multiLotProjects,
  partnershipHowItWorks,
  sellVsDevelopRows,
} from "@/lib/land/multi-lot-content";
import { createMetadata, faqJsonLd, localBusinessJsonLd, serviceJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Multi-Lot Land Development NJ | Highest & Best Use",
  description:
    "What could your North Jersey acreage be worth as a multi-lot opportunity? Confidential land assessments, highest-and-best-use thinking, and experienced partnership with Vantage Construction — Hidden Hollow, Prospect Hill, Winding Ridge.",
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
        description="One parcel. Multiple luxury homesites. Sometimes significantly more value — if zoning, topography, and market support it. Vantage helps landowners choose the right level of involvement: sell as-is, entitle & sell, or partner to develop."
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

      {/* Interactive tool — Phase 1 centerpiece */}
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
              Sell as-is · Entitle & sell · Partner with Vantage
            </h2>
            <p className="mt-3 text-text-muted">
              Most owners only hear about the first option. Vantage’s role is to help you choose the
              right level of involvement and risk — not to push every parcel into development.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {multiLotPaths.map((p, i) => (
              <article
                key={p.id}
                className={`card flex flex-col p-6 sm:p-7 ${
                  p.id === "partner-vantage" ? "border-gold/35 ring-1 ring-gold/20" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-display text-2xl text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                  <div className="text-right text-[0.65rem] uppercase tracking-[0.12em] text-text-dim">
                    <p>
                      Involvement · <span className="text-ivory">{p.involvement}</span>
                    </p>
                  </div>
                </div>
                <h3 className="mt-3 font-display text-2xl text-ivory">{p.title}</h3>
                <p className="mt-1 text-sm font-semibold text-gold-deep">{p.tagline}</p>
                <p className="mt-1 text-xs text-text-dim">{p.risk}</p>
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
                <p className="mt-3 text-xs text-text-muted">
                  <strong className="text-gold-deep">Vantage as guide: </strong>
                  {p.vantageRole}
                </p>
              </article>
            ))}
          </div>

          {/* Sell vs develop snapshot */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-border">
            <div className="border-b border-border bg-bg px-5 py-4 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Quick comparison
              </p>
              <h3 className="mt-1 font-display text-2xl text-ivory">Sell as-is vs develop</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-elevated text-xs uppercase tracking-[0.12em] text-text-dim">
                    <th className="px-5 py-3 font-semibold sm:px-6">Factor</th>
                    <th className="px-5 py-3 font-semibold sm:px-6">Sell as-is</th>
                    <th className="px-5 py-3 font-semibold sm:px-6">Entitle / develop</th>
                  </tr>
                </thead>
                <tbody>
                  {sellVsDevelopRows.map((row) => (
                    <tr key={row.factor} className="border-b border-border/80 last:border-0">
                      <td className="px-5 py-3.5 font-medium text-ivory sm:px-6">{row.factor}</td>
                      <td className="px-5 py-3.5 text-text-muted sm:px-6">{row.sell}</td>
                      <td className="px-5 py-3.5 text-text-muted sm:px-6">{row.develop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Proof: real multi-lot projects — Phase 2 */}
      <section id="proof" className="section scroll-mt-28">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Proof · Named communities</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Real multi-lot projects — not theoretical
            </h2>
            <p className="mt-3 text-text-muted">
              These named developments are among the strongest credibility assets on the site.
              Detailed metrics are available in a confidential conversation; figures below describe
              scale and character without overstating precision.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {multiLotProjects.map((project, idx) => (
              <article
                key={project.id}
                className={`grid gap-0 overflow-hidden rounded-2xl border border-border bg-bg-elevated lg:grid-cols-2 ${
                  idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/11] min-h-[220px] lg:aspect-auto lg:min-h-full">
                  <SmartImage
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                    {project.location}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">{project.name}</h3>
                  <dl className="mt-5 grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-border bg-bg/60 p-4">
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-text-dim">
                        Original land
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium text-ivory">{project.originalAcreage}</dd>
                    </div>
                    <div className="rounded-xl border border-border bg-bg/60 p-4">
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-text-dim">
                        Outcome scale
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium text-ivory">{project.lotsCreated}</dd>
                    </div>
                  </dl>
                  <p className="mt-5 text-sm leading-relaxed text-text-muted">{project.story}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-border px-3 py-1 text-xs text-text-muted"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs text-text-dim">
            Past communities illustrate capability — not a guarantee of future results on your
            parcel. Ask for verified project metrics in a private assessment.
          </p>
        </div>
      </section>

      {/* Entitlement reality — Phase 3 trust */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Entitlement reality · New Jersey</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Honest about the process — because trust requires it
            </h2>
            <p className="mt-3 text-text-muted">
              Multi-lot value is real, and so is complexity. Vantage’s advantage is having navigated
              this repeatedly in Central and Northern New Jersey — concept through infrastructure.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {entitlementSteps.map((s, i) => (
              <div key={s.title} className="card p-5 sm:p-6">
                <span className="font-display text-xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-lg text-ivory sm:text-xl">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="card border-gold/30 bg-gold/5 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Timeline
              </p>
              <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
                {entitlementTimeline.headline}
              </h3>
              <p className="mt-3 font-display text-xl text-gold-deep">{entitlementTimeline.range}</p>
              <p className="mt-3 text-sm text-text-muted">{entitlementTimeline.detail}</p>
            </div>
            <div className="card p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Common obstacles
              </p>
              <h3 className="mt-2 font-display text-2xl text-ivory">What often reduces yield or extends schedule</h3>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {entitlementObstacles.map((o) => (
                  <li key={o} className="flex gap-2 text-sm text-text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership how it works */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Partnership model</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              How a Vantage multi-lot partnership typically works
            </h2>
            <p className="mt-3 text-text-muted">
              Low-pressure and sequential. Your involvement can range from land contribution with
              limited day-to-day role to a more active partnership — calibrated after we understand
              the parcel.
            </p>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnershipHowItWorks.map((s) => (
              <li key={s.step} className="card p-6">
                <span className="font-display text-2xl text-gold">{s.step}</span>
                <h3 className="mt-2 font-display text-xl text-ivory">{s.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <p className="eyebrow">First conversations</p>
            <h3 className="mt-2 font-display text-3xl text-ivory">A calm landowner process</h3>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {multiLotProcess.map((s) => (
                <li key={s.step} className="rounded-xl border border-border bg-bg-elevated p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                    {s.step}
                  </span>
                  <h4 className="mt-2 font-display text-lg text-ivory">{s.title}</h4>
                  <p className="mt-2 text-xs text-text-muted sm:text-sm">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Confidential form — Phase 3 lead capture */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-v max-w-3xl">
          <ConfidentialLandForm />
        </div>
      </section>

      {/* FAQ — Phase 4 */}
      <section className="section">
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

      {/* Internal links */}
      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-3xl text-ivory">Related paths</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/land/evaluation",
                label: "Land evaluation",
                note: "Single-lot feasibility & setbacks",
              },
              {
                href: "/land/spec-homes",
                label: "Signature Builds",
                note: "Homes during construction",
              },
              {
                href: "/partners/investors",
                label: "Investor partnerships",
                note: "Capital structures (separate track)",
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
