import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Vantage Studios | Design, Cost & Transformation Tools",
  description:
    "Interactive Vantage Studios: Design Studio, Cost Studio, Kitchen Studio, Attic Studio, Garage Studio, Outdoor Living Studio, Basement Builder, Move or Improve, and ADU Payback for North Jersey homeowners.",
  path: "/studios",
});

const studios = [
  {
    href: "/design-studio",
    eyebrow: "New construction",
    title: "Design Studio",
    body: "Shape size, style, exterior, finishes, and lifestyle — unlock a Vision Summary.",
  },
  {
    href: "/cost-to-build-a-house-nj",
    eyebrow: "New construction",
    title: "Cost Studio",
    body: "Live North Jersey construction ranges with an interactive house model.",
  },
  {
    href: "/kitchen-remodel-cost-nj",
    eyebrow: "Transformations",
    title: "Kitchen Studio",
    body: "12 high-end styles with live counter, island, backsplash, and hardware swaps — plus planning cost.",
    serviceHref: "/transformations/kitchens",
    serviceLabel: "Learn how we build kitchens",
  },
  {
    href: "/attic-conversion-cost-nj",
    eyebrow: "Transformations",
    title: "Attic Studio",
    body: "Upper-level suites, offices, and lofts — dormers, baths, skylights, live structure preview + estimate.",
    serviceHref: "/transformations/attics",
    serviceLabel: "Learn how we build upper levels",
  },
  {
    href: "/accessory-building-cost-nj",
    eyebrow: "Transformations",
    title: "Garage Studio",
    body: "Custom garages, carriage houses, workshops, ADUs — bays, doors, living space above, live estimate.",
    serviceHref: "/transformations/garages",
    serviceLabel: "Learn how we build them",
  },
  {
    href: "/outdoor-kitchen-cost-nj",
    eyebrow: "Transformations",
    title: "Outdoor Living Studio",
    body: "Outdoor kitchens, covered lounges, fire features, resort yards — live design + planning estimate.",
    serviceHref: "/transformations/outdoor-living",
    serviceLabel: "Learn how we build outdoor living",
  },
  {
    href: "/primary-suite-cost-nj",
    eyebrow: "Transformations",
    title: "Primary Suite Studio",
    body: "Private retreats — bedroom, spa bath, walk-in closet — zone design + live planning estimate.",
    serviceHref: "/transformations/primary-suite",
    serviceLabel: "Learn how we build primary suites",
  },
  {
    href: "/finished-basement-cost-nj",
    eyebrow: "Transformations",
    title: "Basement Builder",
    body: "Visual zone builder for theaters, suites, gyms, bars — live finished basement estimate.",
    serviceHref: "/transformations/basements",
    serviceLabel: "Learn how we build them",
  },
  {
    href: "/move-or-improve-calculator-nj",
    eyebrow: "Transformations",
    title: "Move or Improve?",
    body: "Compare true NJ selling costs vs the addition that solves the same problem.",
    serviceHref: "/transformations/additions",
    serviceLabel: "Learn how we build additions",
  },
  {
    href: "/adu-cost-calculator-nj",
    eyebrow: "Transformations",
    title: "ADU Payback",
    body: "Build cost, rent, break-even year, and 10-year cash flow for accessory dwellings.",
    serviceHref: "/custom-homes/adus",
    serviceLabel: "Learn how we build ADUs",
  },
] as const;

export default function StudiosHubPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Studios" },
        ]}
      />
      <PageHero
        eyebrow="Vantage Studios"
        title="Interactive tools for designing and deciding"
        description="A unified suite — premium visuals, live math, honest disclaimers, and clear next steps into consultation. Built for Central & Northern New Jersey."
      />
      <section className="section pt-0">
        <div className="container-wide grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {studios.map((s) => (
            <article key={s.href} className="card flex flex-col p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{s.eyebrow}</p>
              <h2 className="mt-2 font-display text-3xl text-ivory">{s.title}</h2>
              <p className="mt-3 flex-1 text-text-muted">{s.body}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={s.href} className="btn btn-primary !py-2.5 text-sm">
                  Open tool
                </Link>
                {"serviceHref" in s && s.serviceHref ? (
                  <Link href={s.serviceHref} className="btn btn-secondary !py-2.5 text-sm">
                    {s.serviceLabel}
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <div className="container-wide mt-10">
          <Link href="/transformations" className="text-sm text-gold-deep hover:underline">
            Browse all home transformation services →
          </Link>
        </div>
      </section>
    </>
  );
}
