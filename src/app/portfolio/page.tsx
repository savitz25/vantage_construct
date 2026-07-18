import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { portfolioProjects } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Portfolio",
  description:
    "Explore Vantage Construction projects across Central & Northern New Jersey — custom homes and distinctive residential work.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects that reflect lasting craftsmanship"
        description="A selection of named projects across the communities we serve. Each represents the same standard: detail, integrity, and homes built to endure."
      />
      <section className="section pt-0">
        <div className="container-wide grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <article key={project.name} className="card overflow-hidden">
              <div className="aspect-[16/10] bg-gradient-to-br from-[#f0e6d4] via-[#e4d5b8] to-[#d2bf9a]" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-gold">{project.type}</p>
                <h2 className="mt-2 font-display text-2xl text-ivory">{project.name}</h2>
                <p className="mt-1 text-sm text-text-muted">{project.location}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="container-v mt-10 text-center">
          <p className="text-text-muted">
            Professional photography and case-study detail can be added as assets are provided.
            Schedule a consultation to discuss projects similar to your vision.
          </p>
          <Link href="/start" className="btn btn-primary mt-6">
            Discuss your project
          </Link>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
