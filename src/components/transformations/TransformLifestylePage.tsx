import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { TrackedLink } from "@/components/TrackedLink";
import { RelatedServices } from "@/components/transformations/RelatedServices";
import { TransformServiceNav } from "@/components/transformations/TransformServiceNav";
import type { TransformServiceContent } from "@/lib/transformations/service-pages";
import { faqJsonLd, serviceJsonLd } from "@/lib/seo";

export function TransformLifestylePage({ content }: { content: TransformServiceContent }) {
  const c = content;
  const crumbLabel =
    c.path.includes("basements")
      ? "Finished Basements"
      : c.path.includes("kitchens")
        ? "Kitchen Remodeling"
        : c.path.includes("additions")
          ? "Home Additions"
          : c.path.includes("garages")
            ? "Garages & Accessory Buildings"
            : c.path.includes("outdoor")
              ? "Outdoor Living"
              : c.path.includes("attics")
                ? "Attic Conversions"
                : c.path.includes("primary")
                  ? "Primary Suite"
                  : c.eyebrow.split("·")[0]?.trim() || "Service";
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Transformations", href: "/transformations" },
    { label: crumbLabel },
  ];
  const serviceKey = c.path.replace("/transformations/", "") || "overview";

  return (
    <>
      <JsonLd data={faqJsonLd(c.faqs)} />
      <JsonLd
        data={serviceJsonLd({
          name: c.seoTitle.split("|")[0]?.trim() || crumbLabel,
          description: c.seoDescription,
          path: c.path,
          serviceType: crumbLabel,
        })}
      />
      <Breadcrumbs items={crumbs} />
      <TransformServiceNav currentPath={c.path} sticky />

      <PageHero eyebrow={c.eyebrow} title={c.headline} description={c.subhead}>
        <div className="flex flex-wrap gap-3">
          {c.toolCard ? (
            <TrackedLink
              href={c.toolCard.href}
              className="btn btn-primary"
              serviceTool={{ service: serviceKey, ctaLabel: c.primaryCta.label }}
            >
              {c.primaryCta.label}
            </TrackedLink>
          ) : (
            <Link href={c.primaryCta.href} className="btn btn-primary">
              {c.primaryCta.label}
            </Link>
          )}
          <Link href={c.secondaryCta.href} className="btn btn-secondary">
            {c.secondaryCta.label}
          </Link>
          <Link href="/transformations" className="btn btn-secondary">
            All transformations
          </Link>
        </div>
      </PageHero>

      {c.toolCard ? (
        <section className="section-sm border-y border-border bg-bg-elevated">
          <div className="container-wide">
            <TrackedLink
              href={c.toolCard.href}
              className="card card-hover relative block overflow-hidden p-8 sm:p-10"
              serviceTool={{ service: serviceKey, ctaLabel: c.toolCard.cta }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(201,160,78,0.16),transparent_55%)]" />
              <div className="relative grid gap-6 md:grid-cols-[1.3fr_0.7fr] md:items-center">
                <div>
                  <span className="badge">{c.toolCard.badge}</span>
                  <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
                    {c.toolCard.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-text-muted">{c.toolCard.body}</p>
                </div>
                <div className="md:text-right">
                  <span className="btn btn-primary">{c.toolCard.cta} →</span>
                </div>
              </div>
            </TrackedLink>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container-wide">
          <h2 className="font-display text-4xl text-ivory">{c.spaceHeading}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.spaces.map((space) => (
              <article key={space.title} className="card card-hover group overflow-hidden p-0">
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-soft">
                  {space.image ? (
                    <>
                      <SmartImage
                        src={space.image}
                        alt={`${space.title} — luxury home transformation inspiration by Vantage Construction`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${space.gradient}`}
                      aria-hidden
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-ivory">{space.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{space.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page discovery — no need to scroll to top for other rooms */}
      <RelatedServices currentPath={c.path} variant="mid" />

      <section className="section bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="eyebrow">Craft & confidence</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">{c.trustHeading}</h2>
            <p className="mt-4 text-text-muted">{c.trustIntro}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {c.trustPillars.map((pillar) => (
              <div key={pillar.title} className="card p-7">
                <h3 className="font-display text-2xl text-ivory">{pillar.title}</h3>
                <p className="mt-3 text-text-muted">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="font-display text-4xl text-ivory">{c.pricingHeading}</h2>
          <p className="mt-3 max-w-2xl text-text-muted">{c.pricingIntro}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {c.priceBands.map((band) => (
              <div key={band.scope} className="card p-7">
                <h3 className="font-display text-2xl text-ivory">{band.scope}</h3>
                <p className="mt-2 text-sm text-text-muted">{band.includes}</p>
                <p className="mt-4 font-display text-xl text-gold-deep">{band.range}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-xs text-text-dim">{c.pricingNote}</p>
          {c.toolCard ? (
            <TrackedLink
              href={c.toolCard.href}
              className="btn btn-primary mt-8"
              serviceTool={{
                service: serviceKey,
                ctaLabel: c.toolCard.cta,
              }}
            >
              {c.toolCard.cta}
            </TrackedLink>
          ) : null}
        </div>
      </section>

      <section className="section bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">{c.caseHeading}</h2>
          <div className="card mt-8 grid gap-6 p-8 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">The challenge</p>
              <p className="mt-2 text-sm text-text-muted">{c.caseStory.problem}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">What we did</p>
              <p className="mt-2 text-sm text-text-muted">{c.caseStory.solution}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">The result</p>
              <p className="mt-2 text-sm text-text-muted">{c.caseStory.result}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">FAQs</h2>
          <div className="mt-8 space-y-4">
            {c.faqs.map((item) => (
              <details key={item.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-ivory">{item.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-close tool reinforcement for pages with a related calculator */}
      {c.toolCard ? (
        <section className="section-sm border-y border-border bg-bg-elevated">
          <div className="container-v text-center">
            <p className="eyebrow">Interactive planning</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              {c.toolCard.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-text-muted">{c.toolCard.body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <TrackedLink
                href={c.toolCard.href}
                className="btn btn-primary"
                serviceTool={{ service: serviceKey, ctaLabel: c.toolCard.cta }}
              >
                {c.toolCard.cta}
              </TrackedLink>
              <Link href="/start" className="btn btn-secondary">
                Schedule a consultation
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-sm border-t border-border">
        <div className="container-v text-center">
          <h2 className="font-display text-4xl text-ivory">{c.closeHeading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">{c.closeBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={c.primaryCta.href} className="btn btn-primary">
              {c.primaryCta.label}
            </Link>
            <Link href={c.secondaryCta.href} className="btn btn-secondary">
              {c.secondaryCta.label}
            </Link>
            <Link href="/transformations" className="btn btn-secondary">
              Browse all rooms
            </Link>
          </div>
        </div>
      </section>

      <RelatedServices currentPath={c.path} variant="full" />
      <CtaBanner />
    </>
  );
}
