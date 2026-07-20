import Link from "next/link";
import { FaqHub } from "@/components/insights/FaqHub";
import { JsonLd } from "@/components/JsonLd";
import { faqsForJsonLd } from "@/lib/insights/faq-content";
import { createMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQ | Clear Answers for North Jersey Home Building",
  description:
    "Answers homeowners actually ask about custom home costs, renovate vs rebuild, lot buildability, process, and timelines in North Jersey — with links to Cost Studio, land tools, and Vantage Studios.",
  path: "/insights/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqsForJsonLd())} />

      {/* Hero */}
      <section className="hero-grid grain border-b border-border pt-[5.25rem] pb-10 sm:pt-24 sm:pb-12">
        <div className="container-wide">
          <nav className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <Link href="/insights" className="transition hover:text-navy">
              Insights
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-navy">FAQ</span>
          </nav>

          <div className="max-w-3xl">
            <p className="eyebrow">Answers & planning hub</p>
            <h1 className="mt-3 font-display text-4xl text-ivory sm:text-5xl lg:text-[3.15rem] lg:leading-[1.1]">
              Answers to the questions homeowners actually ask
            </h1>
            <p className="mt-4 max-w-2xl text-base text-text-muted sm:text-lg">
              Clear, practical guidance before you commit — filtered by where you are in the journey,
              and linked to the Studios, Calculators, and guides that go deeper.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#faq-browse" className="btn btn-primary">
              Browse answers
            </a>
            <Link href="/start" className="btn btn-secondary">
              Talk with the team
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive hub */}
      <section id="faq-browse" className="section scroll-mt-28">
        <div className="container-wide">
          <FaqHub />
        </div>
      </section>

      {/* Featured resource callout */}
      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="card flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Flagship guide
              </p>
              <h2 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
                7 Steps to Your Successful Build
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Prefer a printable roadmap? Download the guide from the Insights Resource Center —
                or explore Cost Studio for directional ranges.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/insights#featured" className="btn btn-primary">
                Get the guide
              </Link>
              <Link href="/cost-to-build-a-house-nj" className="btn btn-secondary">
                Cost Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="section border-t border-border">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Still have questions?</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Clear next steps — not another wall of text
            </h2>
            <p className="mt-3 text-text-muted">
              Explore a tool, read a deeper guide, or start a calm conversation with the team.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/cost-to-build-a-house-nj",
                label: "Cost Studio",
                note: "Directional construction ranges",
              },
              {
                href: "/calculators",
                label: "All calculators",
                note: "Feasibility & planning tools",
              },
              {
                href: "/insights",
                label: "Resource Center",
                note: "Guides & field notes",
              },
              {
                href: "/start",
                label: "Start a conversation",
                note: "Complimentary consultation",
              },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="card card-hover p-6 text-center sm:text-left">
                <span className="font-display text-xl text-ivory sm:text-2xl">{l.label}</span>
                <p className="mt-2 text-sm text-text-dim">{l.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
