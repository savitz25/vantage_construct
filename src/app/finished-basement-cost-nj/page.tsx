import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { BasementBuilderTool } from "@/components/transformations/BasementBuilderTool";
import { basementFaqs } from "@/lib/transformations/basement";
import { estimateDisclaimer } from "@/lib/transformations/disclaimers";
import { createMetadata, faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Finished Basement Cost NJ | Basement Builder Calculator",
  description:
    "Finished basement cost calculator for North Jersey. Design theaters, gyms, bars, and guest suites in 60 seconds — live planning estimate from Vantage Construction.",
  path: "/finished-basement-cost-nj",
});

export default function BasementCostPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(basementFaqs)} />
      <PageHero
        eyebrow="Interactive tool · Finished basements"
        title="Finished basement cost calculator for North Jersey"
        description="Stop guessing what a luxury lower level costs. Pick your zones — private cinema, wellness suite, speakeasy bar, guest quarters — and watch a planning estimate update live. Built for Warren, Watchung, Basking Ridge, Millburn–Short Hills, and surrounding towns."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#tool" className="btn btn-primary">
            Open the Basement Builder
          </a>
          <Link href="/transformations/basements" className="btn btn-secondary">
            How we build lower levels
          </Link>
        </div>
        <p className="mt-6 max-w-2xl text-xs text-text-dim">*{estimateDisclaimer}</p>
      </PageHero>

      <section className="section-sm border-y border-border bg-bg-elevated">
        <div className="container-wide grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Visual zoning",
              b: "Theater, gym, bar, suite, office — assemble the floor you actually want.",
            },
            {
              t: "Live planning range",
              b: "See a North Jersey–oriented estimate update as you add spaces. No sign-up required.",
            },
            {
              t: "Clear next step",
              b: "When you’re ready, book a site walkthrough — moisture, egress, and height honesty first.",
            },
          ].map((item) => (
            <div key={item.t} className="card p-6">
              <h2 className="font-display text-xl text-ivory">{item.t}</h2>
              <p className="mt-2 text-sm text-text-muted">{item.b}</p>
            </div>
          ))}
        </div>
      </section>

      <BasementBuilderTool />

      <section className="section bg-bg-elevated">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="eyebrow">From estimate to craftsmanship</p>
              <h2 className="mt-3 font-display text-4xl text-ivory">
                The calculator is step one. The lower level is the lifestyle.
              </h2>
              <p className="mt-4 max-w-2xl text-text-muted">
                Moisture management, code-compliant egress, comfort engineering, and finishes that
                match the rest of your home — that&apos;s what turns a planning range into the most
                used floor in the house.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/transformations/basements" className="btn btn-primary">
                  Lower level living page
                </Link>
                <Link href="/start" className="btn btn-secondary">
                  Schedule consultation
                </Link>
              </div>
            </div>
            <div className="card p-7">
              <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">Also explore</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/transformations/additions" className="text-ivory hover:text-gold">
                    Home additions →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/move-or-improve-calculator-nj"
                    className="text-ivory hover:text-gold"
                  >
                    Move or Improve calculator →
                  </Link>
                </li>
                <li>
                  <Link href="/transformations" className="text-ivory hover:text-gold">
                    All transformations →
                  </Link>
                </li>
                <li>
                  <Link href="/studios" className="text-ivory hover:text-gold">
                    All Vantage Studios →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">Finished basement FAQs</h2>
          <div className="mt-8 space-y-4">
            {basementFaqs.map((f) => (
              <details key={f.q} className="card p-6">
                <summary className="cursor-pointer font-display text-2xl text-ivory">{f.q}</summary>
                <p className="mt-3 text-text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
