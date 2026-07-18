import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Insights, Guides & Resources",
  description:
    "Guides, FAQs, and resources for building or renovating a luxury custom home in Central & Northern New Jersey with Vantage Construction.",
  path: "/insights",
});

const resources = [
  {
    title: "7 Steps To Your Successful Build",
    body: "Free guide to a no-surprises construction experience — vision through celebration.",
    href: "/custom-homes/process",
    cta: "Read the process",
  },
  {
    title: "Frequently asked questions",
    body: "Budgets, deposits, service areas, cameras, plan pricing, and partnerships.",
    href: "/insights/faq",
    cta: "Browse FAQs",
  },
  {
    title: "Blog & updates",
    body: "Ideas and notes for homeowners, land owners, realtors, and investors.",
    href: "/insights/blog",
    cta: "Visit blog",
  },
  {
    title: "Location guides",
    body: "High-value local resources for Warren, Watchung, Basking Ridge, and Millburn–Short Hills.",
    href: "/locations",
    cta: "Explore locations",
  },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Guides for a clearer path to your home"
        description="Practical resources that help you make informed decisions — whether you’re building new, renovating, evaluating land, or partnering with Vantage."
      />
      <section className="section pt-0">
        <div className="container-wide grid gap-6 md:grid-cols-2">
          {resources.map((item) => (
            <Link key={item.href} href={item.href} className="card card-hover p-8">
              <h2 className="font-display text-3xl text-ivory">{item.title}</h2>
              <p className="mt-3 text-text-muted">{item.body}</p>
              <span className="mt-6 inline-block text-sm text-gold">{item.cta} →</span>
            </Link>
          ))}
        </div>
        <div className="container-v mt-10 card p-8">
          <h2 className="font-display text-3xl text-ivory">Downloadable guide</h2>
          <p className="mt-3 text-text-muted">
            Prefer a printable overview? Download the original 7 Steps PDF.
          </p>
          <a
            href="https://vantageconstruct.com/wp-content/uploads/2024/12/7-Steps-To-Your-Successful-Build_web-1.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mt-6"
          >
            Download PDF
          </a>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
