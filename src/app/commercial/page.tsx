import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { commercialServices, commercialStartingNote } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Commercial Construction",
  description:
    "Commercial construction by Vantage Construction — offices, medical/dental, retail, restaurant, tenant improvements, and light industrial in New Jersey.",
  path: "/commercial",
});

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial"
        title="Commercial spaces built with the same standard of care"
        description="Offices, medical and dental, retail, restaurant, tenant improvements, and light industrial — executed with clarity, communication, and quality."
      />
      <section className="section pt-0">
        <div className="container-v">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commercialServices.map((service) => (
              <div key={service} className="card p-6">
                <h2 className="font-display text-2xl text-ivory">{service}</h2>
              </div>
            ))}
          </div>
          <p className="mt-8 text-text-muted">{commercialStartingNote}</p>
        </div>
      </section>
      <CtaBanner title="Talk through a commercial scope" />
    </>
  );
}
