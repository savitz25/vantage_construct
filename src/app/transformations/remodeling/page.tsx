import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { RelatedServices } from "@/components/transformations/RelatedServices";
import { TransformServiceNav } from "@/components/transformations/TransformServiceNav";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Whole-Home Remodeling NJ | Luxury Renovations",
  description:
    "High-end whole-home remodeling in Central & Northern New Jersey — kitchens, baths, layouts, and multi-room renovations with Vantage craftsmanship.",
  path: "/transformations/remodeling",
});

const focusAreas = [
  {
    href: "/transformations/kitchens",
    title: "Kitchen remodeling",
    body: "The highest-impact renovation in most homes — layout, light, and entertaining flow.",
  },
  {
    href: "/transformations/basements",
    title: "Lower level living",
    body: "Finish the square footage you already own into cinema, wellness, or guest space.",
  },
  {
    href: "/transformations/additions",
    title: "Additions",
    body: "When remodeling isn’t enough footprint, expand with architectural continuity.",
  },
  {
    href: "/transformations/attics",
    title: "Attic conversions",
    body: "Reclaim upper volume for suites, offices, and private retreats.",
  },
  {
    href: "/transformations/outdoor-living",
    title: "Outdoor living",
    body: "Porches, kitchens, and terraces that extend the season.",
  },
  {
    href: "/transformations/garages",
    title: "Garages & outbuildings",
    body: "Collector bays, workshops, and estate accessory buildings.",
  },
] as const;

export default function RemodelingPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Transformations", href: "/transformations" },
          { label: "Whole-home remodeling" },
        ]}
      />
      <TransformServiceNav currentPath="/transformations/remodeling" sticky />
      <PageHero
        eyebrow="Whole-home remodeling"
        title="Transform outdated spaces into rooms you’ll use every day"
        description="From kitchen and bath renovations to multi-room and whole-home remodels, we elevate how your home looks and lives — with the same standards as our custom homes across Warren, Watchung, Basking Ridge, and Millburn–Short Hills."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/start" className="btn btn-primary">
            Schedule a consultation
          </Link>
          <Link href="/transformations" className="btn btn-secondary">
            All transformations
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-wide">
          <h2 className="font-display text-4xl text-ivory">Where should we start?</h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Most renovations focus on one lifestyle zone first. Choose a path — or tell us you want
            a whole-home sequence.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {focusAreas.map((area) => (
              <Link key={area.href} href={area.href} className="card card-hover p-7">
                <h3 className="font-display text-2xl text-ivory">{area.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{area.body}</p>
                <span className="mt-5 inline-block text-sm text-gold-deep">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">How we remodel</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Layout improvements for modern living",
              "Kitchen & bath renovations as lifestyle projects",
              "Material and finish guidance that ages well",
              "Transparent sequencing and communication",
              "Living-in-place planning where possible",
              "Lasting craftsmanship over trend-chasing",
            ].map((point) => (
              <li key={point} className="card p-5 text-text-muted">
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/transformations/process" className="btn btn-primary">
              Existing home process
            </Link>
            <Link href="/transformations/kitchens" className="btn btn-secondary">
              Kitchen remodeling
            </Link>
          </div>
        </div>
      </section>

      <RelatedServices currentPath="/transformations/remodeling" variant="full" />
      <CtaBanner />
    </>
  );
}
