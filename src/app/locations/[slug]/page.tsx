import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PlanningPathways } from "@/components/PlanningPathways";
import { SmartImage } from "@/components/SmartImage";
import { company } from "@/lib/company";
import { getTownBySlug, townHubs } from "@/lib/locations/towns";
import { getCaseStudiesForTown } from "@/lib/projects/case-studies";
import { createMetadata, faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return townHubs.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getTownBySlug(slug);
  if (!loc) return {};
  return createMetadata({
    title: loc.seoTitle,
    description: loc.seoDescription,
    path: `/locations/${loc.slug}`,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getTownBySlug(slug);
  if (!loc) notFound();

  const townProjects = getCaseStudiesForTown(loc.slug);

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(loc.faqs)} />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: loc.name, path: `/locations/${loc.slug}` },
        ]}
        eyebrow={`${loc.county} County, New Jersey`}
        title={loc.headline}
        description={loc.blurb}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/start" className="btn btn-primary">
            Schedule a consultation
          </Link>
          <Link href="/cost-to-build-a-house-nj" className="btn btn-secondary">
            Open Cost Studio
          </Link>
          <Link href="/land/evaluation" className="btn btn-secondary">
            Evaluate a lot
          </Link>
          {townProjects[0] ? (
            <Link href={`/projects/${townProjects[0].slug}`} className="btn btn-secondary">
              Local case study
            </Link>
          ) : null}
        </div>
      </PageHero>

      <section className="section pt-0">
        <div className="container-v max-w-3xl space-y-5">
          {loc.intro.map((p) => (
            <p key={p.slice(0, 48)} className="text-lg text-text-muted">
              {p}
            </p>
          ))}
          <p className="text-sm text-text-dim">
            Serving {loc.name} from {company.address.full} · {company.phone} · Builder #
            {company.licenses.builder}
          </p>
        </div>
      </section>

      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-4xl text-ivory">
            Local knowledge for building in {loc.name}
          </h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Cookie-cutter town pages do not rank — and they do not help homeowners. Here is how we
            think about real {loc.name} projects.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {loc.localKnowledge.map((item) => (
              <div key={item.title} className="card p-7">
                <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="font-display text-4xl text-ivory">Projects we build in {loc.name}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {loc.projectAngles.map((item) => (
              <div key={item.title} className="card p-7">
                <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies for this town */}
      {townProjects.length > 0 ? (
        <section className="section border-t border-border bg-bg-elevated">
          <div className="container-wide">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Case studies</p>
                <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
                  Project paths in {loc.name}
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-sm font-semibold text-gold-deep underline-offset-2 hover:underline"
              >
                All projects →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {townProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="card card-hover group overflow-hidden p-0"
                >
                  <div className="relative aspect-[16/10]">
                    <SmartImage
                      src={p.heroImage}
                      alt={p.heroAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
                      {p.typeLabel}
                    </p>
                    <h3 className="mt-1 font-display text-xl text-ivory">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-text-muted">{p.summary}</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-gold-deep">
                      Read case study →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container-wide">
          <h2 className="font-display text-4xl text-ivory">Studios & services for {loc.name}</h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Interactive tools for early ranges — then a consultation for lot-specific reality.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loc.services.map((item) => (
              <Link key={item.href} href={item.href} className="card card-hover p-6">
                <span className="font-display text-2xl text-ivory">{item.label}</span>
                <p className="mt-2 text-sm text-text-muted">{item.note}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/studios" className="btn btn-secondary min-h-11">
              All Studios
            </Link>
            <Link href="/calculators" className="btn btn-secondary min-h-11">
              All calculators
            </Link>
            <Link href="/projects" className="btn btn-secondary min-h-11">
              Project case studies
            </Link>
          </div>
        </div>
      </section>

      {/* Topical depth links */}
      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-3xl text-ivory">
            Planning themes that matter in {loc.name}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/insights/what-it-really-costs-to-build-a-custom-home-in-north-jersey",
                label: "Cost to build guide",
                note: "North Jersey ranges",
              },
              {
                href: "/insights/renovate-or-rebuild-north-jersey-2026",
                label: "Renovate or rebuild",
                note: "2026 decision framework",
              },
              {
                href: "/insights/what-makes-a-lot-buildable-north-jersey",
                label: "Lot buildability",
                note: "Before you buy land",
              },
              {
                href: "/insights/faq",
                label: "FAQ hub",
                note: "Answers by journey",
              },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="card card-hover p-5">
                <span className="font-display text-lg text-ivory">{l.label}</span>
                <p className="mt-1 text-xs text-text-dim">{l.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">{loc.name} FAQs</h2>
          <div className="mt-8 space-y-4">
            {loc.faqs.map((item) => (
              <details key={item.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-ivory">{item.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-text-dim">
            Nearby communities we also serve: {loc.nearby.join(", ")}. See all{" "}
            <Link
              href="/locations"
              className="font-semibold text-navy underline-offset-2 hover:underline"
            >
              town guides
            </Link>
            .
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/custom-homes" className="btn btn-secondary min-h-11">
              Custom homes in {loc.name}
            </Link>
            <Link href="/transformations" className="btn btn-secondary min-h-11">
              Renovations in {loc.name}
            </Link>
            <Link href="/insights/faq" className="btn btn-secondary min-h-11">
              Planning FAQ
            </Link>
          </div>
        </div>
      </section>

      <PlanningPathways
        title={`Plan a ${loc.name} project`}
        body={`Cost ranges, lot feasibility, rebuild decisions, and Studios — then a conversation grounded in ${loc.name} and ${loc.county} County.`}
        pathways={[
          {
            href: "/cost-to-build-a-house-nj",
            label: "Open Cost Studio",
            note: `Directional ranges for ${loc.name} builds`,
          },
          {
            href: "/land/evaluation",
            label: "Evaluate my lot",
            note: "Buildability before you buy or design",
          },
          {
            href: "/custom-homes/rebuilds",
            label: "Renovate vs rebuild",
            note: "When the street is right but the house is not",
          },
          {
            href: "/projects",
            label: "Browse case studies",
            note: "See project paths by type and town",
          },
          {
            href: "/kitchen-remodel-cost-nj",
            label: "Kitchen Studio",
            note: "Visual kitchen design with live ranges",
          },
          {
            href: "/start",
            label: `Talk about ${loc.name}`,
            note: "Complimentary consultation",
          },
        ]}
      />

      <CtaBanner title={`Start a ${loc.name} project conversation`} />
    </>
  );
}
