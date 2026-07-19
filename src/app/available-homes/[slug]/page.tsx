import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { formatPrice, getPlanBySlug, plans, pricingDisclaimer } from "@/lib/plans";
import { getPlanMedia, planImageAlt } from "@/lib/plan-media";
import { createMetadata, productOfferJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return plans.map((plan) => ({ slug: plan.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);
  if (!plan) return {};
  return createMetadata({
    title: `${plan.name} — ${plan.sqft.toLocaleString()} sq ft from ${formatPrice(plan.priceFrom)}`,
    description: plan.summary,
    path: `/available-homes/${plan.slug}`,
  });
}

export default async function PlanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);
  if (!plan) notFound();

  const related = plans
    .filter((p) => p.sizeBand === plan.sizeBand && p.slug !== plan.slug)
    .slice(0, 3);
  const media = getPlanMedia(plan.slug);
  const gallery = media?.gallery?.length ? media.gallery : media?.hero ? [media.hero] : [];

  return (
    <>
      <JsonLd data={productOfferJsonLd(plan)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Available Homes", path: "/available-homes" },
          { name: plan.name, path: `/available-homes/${plan.slug}` },
        ])}
      />

      <PageHero
        eyebrow={plan.style}
        title={plan.name}
        description={plan.summary}
      >
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="badge">{plan.sqft.toLocaleString()} sq ft</span>
          <span className="badge">
            {plan.beds} bed · {plan.baths} bath
          </span>
          <span className="badge">From {formatPrice(plan.priceFrom)}*</span>
          {plan.aduCandidate ? <span className="badge">ADU potential</span> : null}
        </div>
      </PageHero>

      {gallery.length ? (
        <section className="section-sm pt-0">
          <div className="container-wide">
            <div className="relative aspect-[21/9] min-h-[260px] overflow-hidden rounded-2xl border border-border bg-bg-elevated">
              <SmartImage
                src={gallery[0]}
                alt={planImageAlt(plan.name, plan.sqft, plan.style, "Front elevation")}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {gallery.length > 1 ? (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {gallery.slice(1, 5).map((src, i) => (
                  <div
                    key={src + i}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-bg-elevated"
                  >
                    <SmartImage
                      src={src}
                      alt={planImageAlt(plan.name, plan.sqft, plan.style, `Design view ${i + 2}`)}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
            {media?.floorPlan ? (
              <div className="card mt-6 overflow-hidden p-0">
                <div className="border-b border-border px-5 py-3 text-sm font-medium text-gold-deep">
                  Floor plan
                </div>
                <div className="relative aspect-[16/10] bg-white">
                  <SmartImage
                    src={media.floorPlan}
                    alt={planImageAlt(plan.name, plan.sqft, plan.style, "Floor plan")}
                    fill
                    sizes="100vw"
                    className="bg-white p-4"
                    objectFit="contain"
                  />
                </div>
              </div>
            ) : null}
            {media?.representative ? (
              <p className="mt-3 text-sm text-text-dim">
                Representative elevation — fully customizable during Design & Discovery.
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="section pt-0">
        <div className="container-v grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card p-8">
            <h2 className="font-display text-3xl text-ivory">Key features</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-text-dim">*{pricingDisclaimer}</p>
            {plan.pdfUrl ? (
              <a
                href={plan.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary mt-6"
              >
                Download floor plan PDF
              </a>
            ) : null}
          </div>

          <aside className="card h-fit p-8">
            <p className="eyebrow">Customize this plan</p>
            <h2 className="mt-3 font-display text-3xl text-ivory">Make it yours</h2>
            <p className="mt-3 text-text-muted">
              We will customize, spec out, and price your desired home using this plan as a basis —
              or another design you love.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/start" className="btn btn-primary">
                Schedule consultation
              </Link>
              <Link
                href={`/design-studio`}
                className="btn btn-secondary"
              >
                Start Design Studio with this plan
              </Link>
              <Link href="/available-homes" className="btn btn-secondary">
                Back to all plans
              </Link>
              {plan.aduCandidate ? (
                <Link href="/custom-homes/adus" className="btn btn-ghost px-0">
                  Learn about ADUs →
                </Link>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="section-sm bg-bg-elevated">
          <div className="container-wide">
            <h2 className="font-display text-3xl text-ivory">Related plans</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/available-homes/${p.slug}`} className="card card-hover p-5">
                  <p className="text-sm text-gold">{formatPrice(p.priceFrom)}+</p>
                  <h3 className="mt-1 font-display text-2xl text-ivory">{p.name}</h3>
                  <p className="mt-1 text-sm text-text-muted">
                    {p.sqft.toLocaleString()} sq ft · {p.beds} bed · {p.baths} bath
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner />
    </>
  );
}
