import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { LandPathFinder } from "@/components/land/LandPathFinder";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { landDevelopments } from "@/lib/content";
import { company } from "@/lib/company";
import {
  landCredibility,
  landHubRelated,
  landPathways,
} from "@/lib/land/hub-content";
import { createMetadata, localBusinessJsonLd, serviceJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Land Opportunities NJ | Evaluation, Signature Builds & Multi-Lot",
  description:
    "What is your land actually capable of? Explore lot evaluation, Signature Builds under construction, and multi-lot development across Central & Northern New Jersey with Vantage Construction.",
  path: "/land",
});

export default function LandPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          name: "Land Opportunities — Evaluation, Signature Builds & Multi-Lot",
          description:
            "Land opportunity hub for Central & Northern New Jersey: single-lot feasibility, Signature Builds inventory, and multi-lot development advisory.",
          path: "/land",
          serviceType: "Land development and lot feasibility consulting",
        })}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Land", path: "/land" },
        ]}
        eyebrow="Land opportunity hub"
        title="What is your land actually capable of?"
        description="From a single homesite to a private enclave — clarity first. Choose the path that matches your situation; each leads to a deeper, purpose-built experience."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#pathways" className="btn btn-primary">
            Explore your path
          </a>
          <a href="#explore-path" className="btn btn-secondary">
            Not sure? Start here
          </a>
        </div>
      </PageHero>

      {/* Aerial hero band */}
      <section className="border-b border-border bg-bg-elevated">
        <div className="container-wide py-6 sm:py-8">
          <div className="relative aspect-[21/9] min-h-[200px] overflow-hidden rounded-2xl border border-border sm:min-h-[260px]">
            <SmartImage
              src="/media/plans/c5405c72-ridgeview-hires-drone1_1-768x435.webp"
              alt="Aerial of North Jersey land and residential community setting"
              fill
              priority
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 max-w-xl sm:bottom-6 sm:left-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                Land is the beginning of every great home
              </p>
              <p className="mt-1 font-display text-xl text-white drop-shadow sm:text-2xl">
                Premium guidance across {company.focusTowns.join(", ")}, and surrounding{" "}
                {company.serviceAreaLabel}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three pathways — core of the hub */}
      <section id="pathways" className="section scroll-mt-28">
        <div className="container-wide">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">Three opportunities</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Choose the door that matches your goal
            </h2>
            <p className="mt-3 text-text-muted">
              This hub introduces — it does not replace — the deeper pages. Pick your audience, then
              go deeper.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {landPathways.map((path) => (
              <article
                key={path.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[var(--shadow)] transition hover:border-gold/35"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SmartImage
                    src={path.image}
                    alt={path.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    {path.audience}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-2xl text-ivory sm:text-3xl">{path.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-gold-deep">{path.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{path.body}</p>
                  <Link href={path.href} className="btn btn-primary mt-6 self-start">
                    {path.cta} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Why Vantage</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              The right guide for land decisions
            </h2>
            <p className="mt-3 text-text-muted">
              Decades of local building and named multi-lot communities — so you get honest
              feasibility, not sales pressure. Track record includes{" "}
              {landDevelopments.join(", ")}.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {landCredibility.map((item) => (
              <div key={item.label} className="card p-6">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-2xl text-ivory">{item.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Light engagement */}
      <section className="section">
        <div className="container-wide">
          <LandPathFinder />
        </div>
      </section>

      {/* Soft related + CTA */}
      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-3xl text-ivory">Continue exploring</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {landHubRelated.map((l) => (
              <Link key={l.href} href={l.href} className="card card-hover p-5">
                <span className="font-display text-xl text-ivory">{l.label}</span>
                <p className="mt-1 text-xs text-text-dim">{l.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Discuss your land opportunity"
        body="A calm, confidential conversation — whether you have a lot, acreage, or are exploring Signature Builds. We’ll point you to the right next step."
      />
    </>
  );
}
