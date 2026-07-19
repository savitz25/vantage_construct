import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import {
  transformSecondaryLinks,
  transformServices,
  transformTools,
} from "@/lib/transformations/ia";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home Transformations NJ | Renovations, Additions & Lower Levels",
  description:
    "Luxury renovations across Central & Northern NJ — finished basements, kitchens, additions, garages, outdoor living, and attics. Interactive tools and clear process.",
  path: "/transformations",
});

export default function TransformationsPage() {
  const featuredTool = transformTools.find((t) => t.featured) ?? transformTools[0];
  const otherTools = transformTools.filter((t) => t.href !== featuredTool.href);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Transformations" },
        ]}
      />
      <PageHero
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

      {/* Featured tool — conversion engine */}
      <section className="section-sm border-y border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Link
              href={featuredTool.href}
              className="card card-hover relative block overflow-hidden p-8 sm:p-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(201,160,78,0.18),transparent_55%)]" />
              <div className="relative">
                {featuredTool.badge ? (
                  <span className="badge">{featuredTool.badge}</span>
                ) : null}
                <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
                  {featuredTool.label}
                </h2>
                <p className="mt-3 max-w-xl text-text-muted">{featuredTool.body}</p>
                <span className="btn btn-primary mt-6 inline-flex">
                  Open the {featuredTool.label} →
                </span>
              </div>
            </Link>

            <div className="grid gap-4">
              {otherTools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="card card-hover p-6">
                  {tool.badge ? (
                    <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                      {tool.badge}
                    </p>
                  ) : null}
                  <h3 className="mt-1 font-display text-2xl text-ivory">{tool.label}</h3>
                  <p className="mt-2 text-sm text-text-muted">{tool.body}</p>
                  <span className="mt-4 inline-block text-sm text-gold-deep">Open tool →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service grid */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Services</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              What would you transform first?
            </h2>
            <p className="mt-4 text-text-muted">
              Each service page sells the lifestyle of the finished space — then connects you to the
              right tool or a consultation.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {transformServices.map((s) => (
              <Link key={s.href} href={s.href} className="card card-hover flex flex-col p-8">
                <h3 className="font-display text-2xl text-ivory sm:text-3xl">
                  {s.title ?? s.label}
                </h3>
                <p className="mt-3 flex-1 text-text-muted">{s.body}</p>
                <span className="mt-6 inline-block text-sm text-gold-deep">
                  Explore {s.label.toLowerCase()} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary paths */}
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
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
