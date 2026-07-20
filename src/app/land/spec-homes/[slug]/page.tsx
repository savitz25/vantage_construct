import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import {
  formatPrice,
  getSpecHome,
  phaseMeta,
  signatureBuilds,
} from "@/lib/spec-homes/inventory";
import { createMetadata, localBusinessJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return signatureBuilds.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const home = getSpecHome(slug);
  if (!home) return {};
  return createMetadata({
    title: `${home.name} | ${home.town} Signature Build | Vantage`,
    description: home.summary,
    path: `/land/spec-homes/${home.slug}`,
  });
}

export default async function SpecHomeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const home = getSpecHome(slug);
  if (!home) notFound();

  const phase = phaseMeta[home.phase];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Land", href: "/land" },
          { label: "Signature Builds", href: "/land/spec-homes" },
          { label: home.name, path: `/land/spec-homes/${home.slug}` },
        ]}
        eyebrow={`${home.town} · ${home.county} County`}
        title={home.name}
        description={home.summary}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white ${phase.color}`}
          >
            {phase.label}
          </span>
          <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-gold-deep">
            {phase.badge}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#reserve" className="btn btn-primary">
            Discuss reservation
          </a>
          <Link href="/land/spec-homes#early-access" className="btn btn-secondary">
            Early Access list
          </Link>
          <Link href="/land/spec-homes#inventory" className="btn btn-secondary">
            All inventory
          </Link>
        </div>
      </PageHero>

      {/* Hero gallery */}
      <section className="border-b border-border bg-bg-elevated">
        <div className="container-wide py-6 sm:py-8">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border md:row-span-2 md:aspect-auto md:min-h-full">
              <SmartImage
                src={home.heroImage}
                alt={`${home.name} primary view`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {home.gallery.slice(1, 5).map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border"
                >
                  <SmartImage src={src} alt="" fill sizes="25vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="card border-gold/30 bg-gold/10 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Customization window · Phase {home.phase}
              </p>
              <p className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
                {phase.customizationLevel}
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
                    Still open
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-text-muted">
                    {home.customizationOpen.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="text-gold-deep">✓</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-dim">
                    Typically closed
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-text-dim">
                    {home.customizationClosed.map((x) => (
                      <li key={x}>· {x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="mt-10 font-display text-3xl text-ivory">Home highlights</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {home.features.map((f) => (
                <li key={f} className="card p-4 text-sm text-text-muted">
                  {f}
                </li>
              ))}
            </ul>

            {home.phase <= 2 ? (
              <>
                <h2 className="mt-10 font-display text-3xl text-ivory">Design lookbook</h2>
                <p className="mt-2 text-sm text-text-muted">
                  Early-stage homes show intended direction — fall in love with the vision while the
                  structure rises.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {home.lookbook.map((item) => (
                    <figure key={item.label} className="card overflow-hidden p-0">
                      <div className="relative aspect-[4/3]">
                        <SmartImage src={item.image} alt={item.label} fill sizes="33vw" />
                      </div>
                      <figcaption className="p-3 text-sm font-medium text-ivory">
                        {item.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6 sm:p-7">
              <p className="studio-estimate-label">Investment guide</p>
              <p className="studio-estimate-range">
                {home.priceLabel ?? formatPrice(home.priceFrom)}
              </p>
              <p className="mt-2 text-sm text-text-muted">
                {home.beds} bed · {home.baths} bath · ~{home.sqft.toLocaleString()} sf · {home.style}
              </p>
              {home.estCompletion ? (
                <p className="mt-3 text-sm text-gold-deep">{home.estCompletion}</p>
              ) : null}
              <p className="mt-4 text-xs text-text-dim">
                Pricing and availability subject to change. Final numbers confirmed in writing before
                reservation.
              </p>
              <div id="reserve" className="mt-6 flex flex-col gap-3 scroll-mt-28">
                <Link
                  href={`/start?source=spec-homes&home=${encodeURIComponent(home.slug)}&town=${encodeURIComponent(home.town)}`}
                  className="btn btn-primary w-full"
                >
                  Schedule reservation conversation
                </Link>
                <Link href="/land/spec-homes#early-access" className="btn btn-secondary w-full">
                  Join Early Access
                </Link>
                {home.planSlug ? (
                  <Link
                    href={`/available-homes/${home.planSlug}`}
                    className="text-center text-sm font-semibold text-gold-deep hover:underline"
                  >
                    Related design in library →
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="card p-6">
              <p className="text-sm font-medium text-ivory">Prefer fully custom?</p>
              <p className="mt-2 text-sm text-text-muted">
                Explore blank-lot custom, land evaluation, or knockdown rebuild when Signature
                inventory is not the right fit.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/custom-homes" className="btn btn-secondary !px-3 !py-2 text-xs">
                  Custom homes
                </Link>
                <Link href="/land/evaluation" className="btn btn-secondary !px-3 !py-2 text-xs">
                  Land evaluation
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
