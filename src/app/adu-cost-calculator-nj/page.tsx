import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { AduPaybackTool } from "@/components/transformations/AduPaybackTool";
import { aduFaqs } from "@/lib/transformations/adu-payback";
import { rentDisclaimer } from "@/lib/transformations/disclaimers";
import { createMetadata, faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "ADU Cost & Payback Calculator NJ | Accessory Dwelling Units",
  description:
    "Estimate ADU build cost, rental payback, and 10-year cash flow in Somerset, Morris, Union, and Essex counties. Includes town zoning status notes for North Jersey.",
  path: "/adu-cost-calculator-nj",
});

export default function AduCalculatorPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(aduFaqs)} />
      <PageHero
        eyebrow="Vantage Studios · ADUs"
        title="ADU cost & payback calculator for New Jersey"
        description="Turn an accessory dwelling unit from a construction line item into an income and multi-gen story — with rent presets by county and a simple town status lookup."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#tool" className="btn btn-primary">
            Open calculator
          </a>
          <Link href="/custom-homes/adus" className="btn btn-secondary">
            ADU building services
          </Link>
        </div>
        <p className="mt-6 max-w-2xl text-xs text-text-dim">*{rentDisclaimer}</p>
      </PageHero>
      <AduPaybackTool />
      <section className="section bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">ADU FAQs</h2>
          <div className="mt-8 space-y-4">
            {aduFaqs.map((f) => (
              <details key={f.q} className="card p-6">
                <summary className="cursor-pointer font-display text-2xl text-ivory">{f.q}</summary>
                <p className="mt-3 text-text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/land/evaluation" className="btn btn-secondary">
              Land evaluation
            </Link>
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
