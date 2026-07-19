import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { transformationServices } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home Transformations",
  description:
    "Luxury renovations, additions, basements, attics, and outdoor living by Vantage Construction across Central & Northern New Jersey.",
  path: "/transformations",
});

export default function TransformationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Existing homes"
        title="Transform the home you already love"
        description="Expand, reimagine, and elevate — with clear process, careful craftsmanship, and communication that keeps your project on track."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/transformations/process" className="btn btn-primary">
            Existing home process
          </Link>
          <Link href="/studios" className="btn btn-secondary">
            Transformation calculators
          </Link>
        </div>
      </PageHero>

      <section className="section-sm border-y border-border bg-bg-elevated">
        <div className="container-wide">
          <p className="eyebrow">Interactive tools</p>
          <h2 className="mt-3 font-display text-3xl text-ivory">Decide with clarity</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link href="/move-or-improve-calculator-nj" className="card card-hover p-6">
              <h3 className="font-display text-2xl text-ivory">Move or Improve?</h3>
              <p className="mt-2 text-sm text-text-muted">
                NJ selling costs vs the addition that solves the same problem.
              </p>
            </Link>
            <Link href="/adu-cost-calculator-nj" className="card card-hover p-6">
              <h3 className="font-display text-2xl text-ivory">ADU Payback</h3>
              <p className="mt-2 text-sm text-text-muted">
                Build cost, rent, and break-even timeline by county.
              </p>
            </Link>
            <Link href="/finished-basement-cost-nj" className="card card-hover p-6">
              <h3 className="font-display text-2xl text-ivory">Basement Builder</h3>
              <p className="mt-2 text-sm text-text-muted">
                Visual zones + live estimate for finished basements.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-wide grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {transformationServices.map((s) => (
            <Link key={s.title} href={s.href} className="card card-hover p-8">
              <h2 className="font-display text-3xl text-ivory">{s.title}</h2>
              <p className="mt-3 text-text-muted">{s.body}</p>
              <span className="mt-6 inline-block text-sm text-gold">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
