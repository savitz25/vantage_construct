import Link from "next/link";
import { DesignStudio } from "@/components/design-studio/DesignStudio";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { studioFaqs } from "@/lib/design-studio/options";
import { createMetadata, faqJsonLd, howToJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Design Your Vantage Vision | Custom Home Design Studio New Jersey",
  description:
    "Interactive luxury custom home design tool for Warren, Basking Ridge, Watchung & Millburn–Short Hills. Shape size, style, finishes, and lifestyle — then unlock a transparent Vision Summary with no surprises.",
  path: "/design-studio",
});

export default function DesignStudioPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(studioFaqs)} />
      <JsonLd
        data={{
          ...howToJsonLd(),
          name: "How to design your custom home vision online with Vantage",
          description:
            "Use the Vantage Design Studio to select size, style, exterior, finishes, and lifestyle add-ons before a complimentary consultation.",
        }}
      />

      <PageHero
        eyebrow="Vantage Design Studio"
        title="Design Your Vantage Vision"
        description={`An elegant interactive studio for custom homes in ${company.serviceAreaLabel}. Explore real size categories, architectural styles, exterior character, finish levels, and lifestyle add-ons — then unlock a personalized Vision Summary that feeds your no-surprises consultation.`}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#studio" className="btn btn-primary">
            Enter the Design Studio
          </a>
          <Link href="/available-homes" className="btn btn-secondary">
            Browse available homes
          </Link>
          <Link href="/custom-homes/process" className="btn btn-secondary">
            See the 7-step process
          </Link>
        </div>
      </PageHero>

      <section className="section-sm border-y border-border bg-bg-elevated">
        <div className="container-wide grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Shape your vision",
              body: "Size, style, exterior palette, finishes, and lifestyle must-haves — all in one guided studio.",
            },
            {
              title: "Transparent ranges",
              body: "Live conceptual investment ranges seeded from real Vantage plans and selections — never a false quote.",
            },
            {
              title: "Ready for consultation",
              body: "Unlock a Vision Summary that prepares Victor’s team for an informed, no-surprises first conversation.",
            },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <h2 className="font-display text-2xl text-ivory">{item.title}</h2>
              <p className="mt-2 text-sm text-text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section pb-0">
        <div className="container-v max-w-3xl text-center">
          <p className="eyebrow justify-center">Serving {company.focusTowns.join(" · ")}</p>
          <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
            Custom home design tool for Central & Northern New Jersey
          </h2>
          <p className="mt-4 text-text-muted">
            Whether you&apos;re planning a luxury build in Warren, a knockdown in Basking Ridge, an
            estate home near Millburn–Short Hills, or exploring ADUs and outdoor living in Watchung —
            this studio organizes preferences so Design & Discovery starts with clarity.
          </p>
        </div>
      </section>

      <DesignStudio />

      <section className="section bg-bg-elevated">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">How the Design Studio works</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Share lot context and optional timeline",
              "Choose size band or a real available plan",
              "Select architectural style and exterior character",
              "Set finish level and interior priorities",
              "Add lifestyle experiences (outdoor living, ADU, etc.)",
              "Unlock your Vision Summary and book a consultation",
            ].map((step, i) => (
              <li key={step} className="card flex gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong font-display text-lg text-gold-deep">
                  {i + 1}
                </span>
                <span className="pt-2 text-text-muted">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/portfolio" className="btn btn-secondary">
              View portfolio
            </Link>
            <Link href="/start" className="btn btn-secondary">
              Schedule directly
            </Link>
            <Link href="/insights/faq" className="btn btn-secondary">
              More FAQs
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">Design Studio FAQs</h2>
          <div className="mt-8 space-y-4">
            {studioFaqs.map((item) => (
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
    </>
  );
}
