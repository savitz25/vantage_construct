import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { company } from "@/lib/company";
import {
  formatAcres,
  formatLandPrice,
  getLandOpportunityBySlug,
  landOpportunities,
  landOpportunityFeatureLabels,
  landOpportunityStatusLabel,
} from "@/lib/land/opportunities";
import { createMetadata, localBusinessJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return landOpportunities.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = getLandOpportunityBySlug(slug);
  if (!listing) return {};
  return createMetadata({
    title: `${listing.title} · ${listing.town} Land ${formatAcres(listing.acres)}`,
    description: `${listing.title} in ${listing.town}, NJ — ${formatAcres(listing.acres)}, ${formatLandPrice(listing)}. ${listing.highlights.join(" · ")}. Curated land opportunity with Vantage evaluation.`,
    path: `/land/opportunities/${listing.slug}`,
  });
}

export default async function LandOpportunityDetailPage({ params }: Props) {
  const { slug } = await params;
  const listing = getLandOpportunityBySlug(slug);
  if (!listing) notFound();

  const related = landOpportunities
    .filter((l) => l.slug !== listing.slug && l.town === listing.town)
    .slice(0, 3);

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${listing.lng - 0.05}%2C${listing.lat - 0.035}%2C${listing.lng + 0.05}%2C${listing.lat + 0.035}&layer=mapnik&marker=${listing.lat}%2C${listing.lng}`;

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: listing.title,
          description: listing.description,
          url: `https://vantagecustombuilds.com/land/opportunities/${listing.slug}`,
          datePosted: listing.listedAt,
          image: listing.image,
          offers: listing.price
            ? {
                "@type": "Offer",
                price: listing.price,
                priceCurrency: "USD",
                availability:
                  listing.status === "available"
                    ? "https://schema.org/InStock"
                    : "https://schema.org/PreOrder",
              }
            : undefined,
          address: {
            "@type": "PostalAddress",
            addressLocality: listing.town,
            addressRegion: "NJ",
            addressCountry: "US",
          },
        }}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Land", href: "/land" },
          { label: "Opportunities", href: "/land/opportunities" },
          { label: listing.title, path: `/land/opportunities/${listing.slug}` },
        ]}
        eyebrow={`${listing.town} · ${formatAcres(listing.acres)}`}
        title={listing.title}
        description={`${listing.locationLabel}. ${listing.description}`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-sm font-semibold text-gold-deep">
            {formatLandPrice(listing)}
          </span>
          <span className="rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-sm text-ivory">
            {landOpportunityStatusLabel[listing.status]}
          </span>
          <Link href="/land/evaluation#lot-audit" className="btn btn-primary">
            Request land evaluation
          </Link>
          <Link href="/land/opportunities" className="btn btn-secondary">
            All opportunities
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
                <SmartImage
                  src={listing.image}
                  alt={listing.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-8 prose-invert max-w-none">
                <h2 className="font-display text-2xl text-ivory sm:text-3xl">About this parcel</h2>
                <p className="mt-3 text-text-muted leading-relaxed">{listing.description}</p>
                <p className="mt-4 text-sm text-text-dim">
                  Illustrative opportunity for the Land Opportunities directory. Confirm legal
                  description, surveys, and current asking terms with your realtor and attorney.
                  Vantage focuses on buildability, design, and construction — N.J. Builder #
                  {company.licenses.builder}.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-2">
              <div className="card sticky top-28 space-y-5 p-6">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
                    Investment
                  </p>
                  <p className="mt-1 font-display text-3xl text-gold-deep">
                    {formatLandPrice(listing)}
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-text-dim">Acreage</dt>
                    <dd className="font-medium text-ivory">{formatAcres(listing.acres)}</dd>
                  </div>
                  <div>
                    <dt className="text-text-dim">Town</dt>
                    <dd className="font-medium text-ivory">{listing.town}</dd>
                  </div>
                  <div>
                    <dt className="text-text-dim">County</dt>
                    <dd className="font-medium text-ivory">{listing.county}</dd>
                  </div>
                  <div>
                    <dt className="text-text-dim">Status</dt>
                    <dd className="font-medium text-ivory">
                      {landOpportunityStatusLabel[listing.status]}
                    </dd>
                  </div>
                </dl>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
                    Highlights
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {listing.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-border bg-bg-elevated px-2.5 py-1 text-xs text-ivory"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
                    Features
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-text-muted">
                    {listing.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-gold" aria-hidden>
                          ·
                        </span>
                        {landOpportunityFeatureLabels[f]}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2 border-t border-border pt-5">
                  <Link href="/land/evaluation#lot-audit" className="btn btn-primary w-full">
                    Schedule land evaluation
                  </Link>
                  <Link href="/start" className="btn btn-secondary w-full">
                    Consultation
                  </Link>
                  <a href={`tel:${company.phoneTel}`} className="btn btn-secondary w-full">
                    {company.phone}
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl text-ivory">Approximate location</h2>
            <p className="mt-2 text-sm text-text-muted">
              Map pin is generalized for privacy on prototype inventory.
            </p>
            <div className="relative mt-4 aspect-[21/9] min-h-[240px] overflow-hidden rounded-2xl border border-border">
              <iframe
                title={`Map near ${listing.title}`}
                src={mapSrc}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {related.length ? (
            <div className="mt-14">
              <h2 className="font-display text-2xl text-ivory">More in {listing.town}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/land/opportunities/${r.slug}`} className="card card-hover p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
                      {formatAcres(r.acres)} · {formatLandPrice(r)}
                    </p>
                    <p className="mt-2 font-display text-xl text-ivory">{r.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
