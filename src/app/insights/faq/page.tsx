import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { faqs } from "@/lib/content";
import { createMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "FAQs",
  description:
    "Frequently asked questions about building or renovating with Vantage Construction in Central & Northern New Jersey.",
  path: "/insights/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="FAQs"
        title="Answers before you pick up the phone"
        description="Straight answers about process, pricing transparency, service areas, and partnerships."
      />
      <section className="section pt-0">
        <div className="container-v space-y-4">
          {faqs.map((item) => (
            <details key={item.q} className="card group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h2 className="font-display text-2xl text-ivory">{item.q}</h2>
                <span className="text-gold transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
