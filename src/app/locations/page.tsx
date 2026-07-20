import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { locationHubs } from "@/lib/content";
import { company } from "@/lib/company";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Custom Home Builder Near Me NJ | Town Guides & Service Areas",
  description: `Local custom home builder guides for Warren, Watchung, Basking Ridge, Millburn–Short Hills & Westfield. Luxury homes, rebuilds & renovations across ${company.counties.join(", ")} counties — Vantage Construction.`,
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", path: "/locations" },
        ]}
        eyebrow="Service areas · Local guides"
        title={`${company.serviceAreaLabel} — with deep local roots`}
        description={`Primary focus: ${company.focusTowns.join(", ")}. Broader service across ${company.counties.join(", ")} counties. Each guide covers local project patterns, process, and next steps — not generic city copy.`}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#town-guides" className="btn btn-primary">
            Browse town guides
          </a>
          <Link href="/start" className="btn btn-secondary">
            Start a conversation
          </Link>
        </div>
      </PageHero>

      <section className="section-sm border-b border-border bg-bg-elevated">
        <div className="container-wide grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div>
            <p className="eyebrow">Why local pages matter</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Building well here means knowing the towns
            </h2>
          </div>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              Lot patterns, permitting culture, knockdown economics, and finish expectations vary
              street by street. These guides share how Vantage approaches custom homes,
              renovations, and land work in each community — with clear links to Cost Studio,
              rebuild assessment, and consultation.
            </p>
            <p>
              Looking for a project type first? Start with{" "}
              <Link href="/custom-homes" className="font-semibold text-navy underline-offset-2 hover:underline">
                custom homes
              </Link>
              ,{" "}
              <Link href="/transformations" className="font-semibold text-navy underline-offset-2 hover:underline">
                transformations
              </Link>
              , or{" "}
              <Link href="/land" className="font-semibold text-navy underline-offset-2 hover:underline">
                land opportunities
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="town-guides" className="section scroll-mt-28">
        <div className="container-wide">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">Town guides</p>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
              Explore by community
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {locationHubs.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="card card-hover flex flex-col p-7 sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  {loc.county} County, NJ
                </p>
                <h2 className="mt-2 font-display text-3xl text-ivory">{loc.name}</h2>
                <p className="mt-3 flex-1 text-text-muted leading-relaxed">{loc.blurb}</p>
                <span className="mt-5 text-sm font-semibold text-gold-deep">
                  Open {loc.name} guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                href: "/cost-to-build-a-house-nj",
                label: "Cost Studio",
                note: "North Jersey construction ranges",
              },
              {
                href: "/custom-homes/rebuilds",
                label: "Rebuilds",
                note: "Renovate vs rebuild assessment",
              },
              {
                href: "/land/evaluation",
                label: "Lot evaluation",
                note: "Buildability before you commit",
              },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="card card-hover p-6">
                <span className="font-display text-2xl text-ivory">{l.label}</span>
                <p className="mt-2 text-sm text-text-dim">{l.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Talk about a project in your town" />
    </>
  );
}
