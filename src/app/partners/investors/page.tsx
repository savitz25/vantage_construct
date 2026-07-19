import Link from "next/link";
import { DealModeler } from "@/components/investors/DealModeler";
import { InvestorOverviewForm } from "@/components/investors/InvestorOverviewForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import {
  investorDisclaimer,
  investorFaqs,
  investorFooterDisclaimer,
  lifecycle,
  namedDevelopments,
  structures,
  trackRecord,
} from "@/lib/investors/content";
import { createMetadata, faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Investor Partnerships | Private Capital Structures North Jersey",
  description:
    "How Vantage Construction structures loan, equity, and hybrid partnerships for luxury custom homes and developments in Central & Northern New Jersey. Illustrative deal modeler — not an offer.",
  path: "/partners/investors",
});

export default function InvestorsPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(investorFaqs)} />

      <PageHero
        eyebrow="For investors / partners"
        title="Partner with a builder who’s been delivering since 1990"
        description={`How our partnerships are structured — loan, equity, and hybrid — for sophisticated private capital across ${company.focusTowns.join(", ")} and surrounding North Jersey markets. Hands-on leadership by Master Builder ${company.founder}.`}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#deal-modeler" className="btn btn-primary">
            Model a deal
          </a>
          <a href="#investor-overview" className="btn btn-secondary">
            Request the Investor Overview
          </a>
        </div>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-text-dim">
          *{investorDisclaimer}
        </p>
      </PageHero>

      {/* Proof dashboard */}
      <section className="section-sm border-y border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">Track record</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Credibility before capital conversations
            </h2>
            <p className="mt-3 text-text-muted">
              Local market knowledge, off-market relationship flow, and the same no-surprises
              discipline we bring to homeowners — applied to partnership reporting and execution.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trackRecord.map((item) => (
              <div key={item.label} className="card p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-text-dim">{item.label}</p>
                <p className="mt-2 font-display text-3xl text-ivory">{item.value}</p>
                <p className="mt-1 text-sm text-gold-deep">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="card mt-6 p-6 sm:p-8">
            <h3 className="font-display text-2xl text-ivory">Named developments</h3>
            <p className="mt-2 text-text-muted">
              Multi-lot experience including {namedDevelopments.join(", ")} — plus ongoing custom and
              spec work in the $850k–$2M+ strategic range.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {namedDevelopments.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-ivory"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Structures */}
      <section id="structures" className="section scroll-mt-28">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Partnership structures</p>
            <h2 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">
              How we typically structure partnerships
            </h2>
            <p className="mt-4 text-text-muted">
              Exact terms are always deal-specific and documented in writing after underwriting —
              never set by this website.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {structures.map((s) => (
              <article key={s.id} className="card flex flex-col p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
                  {s.tagline}
                </p>
                <h3 className="mt-3 font-display text-3xl text-ivory">{s.title}</h3>
                <p className="mt-3 flex-1 text-text-muted">{s.body}</p>
                <ul className="mt-6 space-y-2 border-t border-border pt-5">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-text-dim">*{investorDisclaimer}</p>
        </div>
      </section>

      <DealModeler />

      {/* Lifecycle */}
      <section className="section bg-bg-elevated">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Deal lifecycle</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              From underwriting to distribution
            </h2>
            <p className="mt-4 text-text-muted">
              Typical phases and month ranges for discussion — actual calendars vary by municipality,
              weather, and scope.
            </p>
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {lifecycle.map((step) => (
              <li key={step.phase} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong font-display text-lg text-gold-deep">
                    {step.phase}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-text-dim">{step.months}</p>
                    <h3 className="font-display text-xl text-ivory">{step.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">Investor FAQs</h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Straight answers for sophisticated partners. Nothing here is legal or investment advice.
          </p>
          <div className="mt-8 space-y-4">
            {investorFaqs.map((item) => (
              <details key={item.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-ivory">{item.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Gated overview */}
      <section id="investor-overview" className="section scroll-mt-28 bg-bg-elevated">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow">Investor overview</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Request the partnership overview
            </h2>
            <p className="mt-4 text-text-muted">
              A concise overview of how Vantage approaches private capital partnerships — structures,
              process, and how conversations typically start. Tagged as an{" "}
              <strong className="text-ivory">Investor Lead</strong> (separate from homeowner
              inquiries).
            </p>
            <ul className="mt-6 space-y-3 text-sm text-text-muted">
              <li>· Structure overview (loan / equity / hybrid)</li>
              <li>· Process & reporting expectations</li>
              <li>· How underwriting conversations begin</li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-text-dim">*{investorDisclaimer}</p>
            <div className="mt-8">
              <Link href="/start?source=investor" className="btn btn-secondary">
                Or schedule a call with Victor
              </Link>
            </div>
          </div>
          <InvestorOverviewForm />
        </div>
      </section>

      {/* Final trust */}
      <section className="section-sm border-t border-border">
        <div className="container-v text-center">
          <p className="font-display text-2xl text-ivory">{company.name}</p>
          <p className="mt-2 text-sm text-text-muted">
            {company.address.full} ·{" "}
            <a href={`tel:${company.phoneTel}`} className="text-gold-deep">
              {company.phone}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${company.email}`} className="text-gold-deep">
              {company.email}
            </a>
          </p>
          <p className="mt-2 text-xs text-text-dim">
            N.J. Registered Builder #{company.licenses.builder} · HIC #{company.licenses.hic}
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-xs leading-relaxed text-text-dim">
            {investorFooterDisclaimer}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[0.7rem] font-medium uppercase tracking-[0.12em] text-amber-800/80">
            Implementation note: securities attorney review required before launch of any
            performance language or offering materials.
          </p>
        </div>
      </section>
    </>
  );
}
