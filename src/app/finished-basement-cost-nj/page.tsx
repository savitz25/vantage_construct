import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { BasementBuilderTool } from "@/components/transformations/BasementBuilderTool";
import { basementFaqs } from "@/lib/transformations/basement";
import { estimateDisclaimer } from "@/lib/transformations/disclaimers";
import { createMetadata, faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Finished Basement Cost NJ | Dream-Space Builder",
  description:
    "Plan a finished basement in North Jersey with visual zone tiles — theater, gym, guest suite, bar, and more. Live estimate and playful floor mockup.",
  path: "/finished-basement-cost-nj",
});

export default function BasementCostPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(basementFaqs)} />
      <PageHero
        eyebrow="Vantage Studios · Basements"
        title="Basement dream-space builder"
        description="Pick the zones you want downstairs. Watch a simple floor mock assemble and a planning estimate update live — then book a site walkthrough with Vantage."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#tool" className="btn btn-primary">
            Build your basement
          </a>
          <Link href="/transformations/basements" className="btn btn-secondary">
            Finished basement services
          </Link>
        </div>
        <p className="mt-6 max-w-2xl text-xs text-text-dim">*{estimateDisclaimer}</p>
      </PageHero>
      <BasementBuilderTool />
      <section className="section bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">FAQs</h2>
          <div className="mt-8 space-y-4">
            {basementFaqs.map((f) => (
              <details key={f.q} className="card p-6">
                <summary className="cursor-pointer font-display text-2xl text-ivory">{f.q}</summary>
                <p className="mt-3 text-text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/studios" className="btn btn-secondary">
              All studios
            </Link>
            <Link href="/start" className="btn btn-primary">
              Schedule consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
