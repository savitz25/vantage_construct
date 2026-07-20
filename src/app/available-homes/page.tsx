import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { PlanCard } from "@/components/PlanCard";
import { plans, plansByBand, pricingDisclaimer } from "@/lib/plans";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Available Custom Home Designs NJ | Plans & Base Pricing",
  description:
    "Browse fully customizable luxury home plans for Central & Northern New Jersey — organized by size with transparent base pricing from Vantage Construction.",
  path: "/available-homes",
});

const bands = [
  { key: "under-2000" as const, title: "Homes under 2,000 sq ft", id: "under-2000" },
  { key: "2000-3000" as const, title: "Homes between 2,000 & 3,000 sq ft", id: "2000-3000" },
  { key: "over-3000" as const, title: "Homes over 3,000 sq ft", id: "over-3000" },
];

export default function AvailableHomesPage() {
  return (
    <>
      <PageHero
        eyebrow="Plan explorer"
        title="Available custom home designs"
        description="Explore our selection of available homes, organized by square footage and fully customizable to match your unique needs. Already have plans or inspiration? We'll tailor them to your vision."
      >
        <div className="flex flex-wrap gap-3">
          {bands.map((b) => (
            <a key={b.id} href={`#${b.id}`} className="btn btn-secondary">
              {b.title}
            </a>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-text-dim">*{pricingDisclaimer}</p>
      </PageHero>

      <section className="section pt-0">
        <div className="container-wide space-y-16">
          {bands.map((band) => {
            const bandPlans = plansByBand(band.key);
            return (
              <div key={band.key} id={band.id}>
                <div className="mb-8 flex items-end justify-between gap-4">
                  <h2 className="font-display text-3xl text-ivory sm:text-4xl">{band.title}</h2>
                  <p className="text-sm text-text-dim">{bandPlans.length} designs</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {bandPlans.map((plan) => (
                    <PlanCard key={plan.slug} plan={plan} />
                  ))}
                </div>
              </div>
            );
          })}
          <p className="text-center text-text-muted">
            Showing all {plans.length} published designs. Every plan can be customized, expanded, or
            used as a starting point for a fully bespoke home.
          </p>
        </div>
      </section>

      <CtaBanner title="Find the right plan — or bring your own" />
    </>
  );
}
