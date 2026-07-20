import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { LocationsStrip } from "@/components/LocationsStrip";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import {
  transformSecondaryLinks,
  transformServices,
  transformTools,
} from "@/lib/transformations/ia";
import {
  visualForService,
  visualForTool,
} from "@/lib/transformations/studio-media";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home Renovations North Jersey | Kitchens, Basements & Additions",
  description:
    "Luxury home transformations in North Jersey — finished basements, kitchens, additions, outdoor living, attics & more. Interactive Studios, clear process, no surprises from Vantage Construction.",
  path: "/transformations",
});

export default function TransformationsPage() {
  const featuredTool = transformTools.find((t) => t.featured) ?? transformTools[0];
  const otherTools = transformTools.filter((t) => t.href !== featuredTool.href);
  const featuredVisual = visualForTool(featuredTool.href);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Transformations", path: "/transformations" },
        ]}
        eyebrow="Transformations · Existing homes"
        title="Elevate the home you already love"
        description="Lower levels, kitchens, additions, garages, outdoor rooms, and attic sanctuaries — built with the same craftsmanship as our custom homes. Clear process. No surprises. Serving Warren, Watchung, Basking Ridge, Millburn–Short Hills, and surrounding North Jersey towns."
      >
        <div className="flex flex-wrap gap-3">
          <Link href={featuredTool.href} className="btn btn-primary">
            Open the {featuredTool.label}
          </Link>
          <Link href="/start" className="btn btn-secondary">
            Schedule a consultation
          </Link>
        </div>
      </PageHero>

      {/* Featured tool + studio strip — photo-first */}
      <section className="section-sm border-y border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">Interactive Studios</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Design first. Estimate live. Decide with clarity.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-stretch">
            {/* Large Kitchen Studio feature */}
            <Link
              href={featuredTool.href}
              className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[calc(var(--radius)+0.25rem)] border border-border shadow-[var(--shadow)] sm:min-h-[400px] lg:min-h-[480px]"
            >
              {featuredVisual ? (
                <SmartImage
                  src={featuredVisual.image}
                  alt={featuredVisual.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="transition duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-bg-soft to-bg-elevated" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
              <div className="relative z-10 p-7 sm:p-9 lg:p-10">
                {featuredTool.badge ? (
                  <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    {featuredTool.badge}
                  </span>
                ) : null}
                <h2 className="mt-4 font-display text-3xl text-white drop-shadow sm:text-4xl lg:text-5xl">
                  {featuredTool.label}
                </h2>
                <p className="mt-3 max-w-lg text-sm text-white/85 sm:text-base">
                  {featuredTool.body}
                </p>
                <span className="btn btn-primary mt-6 inline-flex">
                  Open the {featuredTool.label} →
                </span>
              </div>
            </Link>

            {/* Smaller studio cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:content-start">
              {otherTools.map((tool) => {
                const visual = visualForTool(tool.href);
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex overflow-hidden rounded-[calc(var(--radius)+0.15rem)] border border-border bg-surface shadow-[var(--shadow)] transition hover:border-gold/35 hover:shadow-[0_18px_45px_rgba(40,30,15,0.1)]"
                  >
                    <div className="relative w-[38%] min-w-[7.5rem] shrink-0 self-stretch sm:w-36 lg:w-40">
                      {visual ? (
                        <SmartImage
                          src={visual.image}
                          alt={visual.alt}
                          fill
                          sizes="160px"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-bg-soft" />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                      {tool.badge ? (
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
                          {tool.badge}
                        </p>
                      ) : null}
                      <h3 className="mt-0.5 font-display text-xl text-ivory sm:text-2xl">
                        {tool.label}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs text-text-muted sm:text-sm">
                        {tool.body}
                      </p>
                      <span className="mt-3 text-sm font-semibold text-gold-deep">
                        Open tool →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Service grid — photo cards */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Services</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              What would you transform first?
            </h2>
            <p className="mt-4 text-text-muted">
              Each pathway sells the lifestyle of the finished space — then connects you to the right
              Studio or a consultation.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {transformServices.map((s) => {
              const visual = visualForService(s.href);
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="card card-hover group flex flex-col overflow-hidden p-0"
                >
                  <div className="relative aspect-[16/10] bg-bg-soft">
                    {visual ? (
                      <SmartImage
                        src={visual.image}
                        alt={visual.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : null}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <h3 className="absolute bottom-3 left-4 right-4 font-display text-2xl text-white drop-shadow">
                      {s.title ?? s.label}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex-1 text-sm text-text-muted">{s.body}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-gold-deep">
                      Explore {s.label.toLowerCase()} →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl text-ivory">Process & whole-home work</h2>
            <p className="mt-2 max-w-xl text-text-muted">
              Prefer a full renovation path or want to see how we run existing-home projects?
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {transformSecondaryLinks
              .filter((l) => l.href !== "/transformations")
              .map((link) => (
                <Link key={link.href} href={link.href} className="btn btn-secondary">
                  {link.label}
                </Link>
              ))}
            <Link href="/studios" className="btn btn-primary">
              All Studios
            </Link>
            <Link href="/move-or-improve-calculator-nj" className="btn btn-secondary">
              Move or improve?
            </Link>
          </div>
        </div>
      </section>

      <LocationsStrip
        compact
        heading="Renovations where we work most"
        body="Town-specific notes on basements, kitchens, and additions — plus paths into Cost Studio and consultation."
      />

      <CtaBanner />
    </>
  );
}
