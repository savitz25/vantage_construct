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
        <Link href="/transformations/process" className="btn btn-primary">
          Existing home process
        </Link>
      </PageHero>
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
