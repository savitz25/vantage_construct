import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { TrackToolLanderView } from "@/components/TrackPageEvent";
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

const education = [
  {
    title: "Moisture comes first",
    body: "Before finishes, we evaluate drainage, grading, and any history of dampness. A beautiful lower level that smells like a basement isn’t finished — it’s covered up.",
  },
  {
    title: "Egress & code, designed in",
    body: "Sleeping areas below grade need code-compliant egress. We plan windows or walkouts from day one and manage municipal permits so resale never surprises you.",
  },
  {
    title: "Comfort like the main floor",
    body: "HVAC extensions, dehumidification, and lighting so the space feels intentional — not an afterthought under the stairs.",
  },
  {
    title: "Honest ceiling conversations",
    body: "Most NJ basements finish beautifully at existing height. If yours is tight, we’ll say so — and when a dig-out is (or isn’t) worth it.",
  },
] as const;

export default function BasementCostPage() {
  return (
    <>
      <TrackToolLanderView tool="basement-builder" path="/finished-basement-cost-nj" />
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(basementFaqs)} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Transformations", href: "/transformations" },
          { label: "Finished Basements", href: "/transformations/basements" },
          { label: "Basement Builder" },
        ]}
      />

      {/* Compact tool-as-hero intro — tool is the primary content immediately below */}
      <section className="hero-grid grain border-b border-border pt-28 pb-8 sm:pt-32 sm:pb-10">
        <div className="container-wide relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Interactive tool · Finished basement cost NJ</p>
              <h1 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">
                Basement Builder
              </h1>
              <p className="mt-3 text-lg text-text-muted">
                Design your lower level in 60 seconds. Pick theater, gym, bar, guest suite, and more
                — watch a live planning estimate for North Jersey update in real time.
              </p>
              <p className="mt-3 text-xs text-text-dim">*{estimateDisclaimer}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/transformations/basements"
                className="btn btn-secondary"
              >
                Learn how we build them
              </Link>
              <Link href="/start" className="btn btn-primary">
                Schedule a consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive tool = hero experience */}
      <BasementBuilderTool />

      {/* Educational support */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Beyond the estimate</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              What turns a planning range into a lower level you love
            </h2>
            <p className="mt-4 text-text-muted">
              The Basement Builder shapes budget and layout. Craftsmanship is how Vantage makes the
              space dry, legal, comfortable, and indistinguishable from the rest of your home.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {education.map((item) => (
              <div key={item.title} className="card p-7">
                <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/transformations/basements" className="btn btn-primary">
              Learn how we build them
            </Link>
            <Link href="/transformations" className="btn btn-secondary">
              All home transformations
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">Finished basement FAQs</h2>
          <div className="mt-8 space-y-4">
            {basementFaqs.map((f) => (
              <details key={f.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-ivory">{f.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation drive */}
      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-v text-center">
          <h2 className="font-display text-4xl text-ivory">Ready for real numbers on your home?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            Bring your Basement Builder vision to a complimentary consultation. We&apos;ll talk
            moisture, egress, ceiling height, and what&apos;s actually possible under your house —
            phone, Zoom, or on site.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/start" className="btn btn-primary">
              Schedule a consultation
            </Link>
            <Link href="/transformations/basements" className="btn btn-secondary">
              Learn how we build them
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
