import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Vantage Studios | Design, Cost & Transformation Tools",
  description:
    "Interactive Vantage Studios: Design Studio, Cost Studio, Move or Improve, ADU Payback, and Basement Dream-Space Builder for North Jersey homeowners.",
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
    href: "/move-or-improve-calculator-nj",
    eyebrow: "Transformations",
    title: "Move or Improve?",
    body: "Compare true NJ selling costs vs the addition that solves the same problem.",
  },
  {
    href: "/adu-cost-calculator-nj",
    eyebrow: "Transformations",
    title: "ADU Payback",
    body: "Build cost, rent, break-even year, and 10-year cash flow for accessory dwellings.",
  },
  {
    href: "/finished-basement-cost-nj",
    eyebrow: "Transformations",
    title: "Basement Dream-Space",
    body: "Visual zone builder for theaters, suites, gyms, bars — live estimate.",
  },
] as const;

export default function StudiosHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Vantage Studios"
        title="Interactive tools for designing and deciding"
        description="A unified suite — premium visuals, live math, honest disclaimers, and clear next steps into consultation. Built for Central & Northern New Jersey."
      />
      <section className="section pt-0">
        <div className="container-wide grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {studios.map((s) => (
            <Link key={s.href} href={s.href} className="card card-hover p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{s.eyebrow}</p>
              <h2 className="mt-2 font-display text-3xl text-ivory">{s.title}</h2>
              <p className="mt-3 text-text-muted">{s.body}</p>
              <span className="mt-6 inline-block text-sm text-gold-deep">Open tool →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
