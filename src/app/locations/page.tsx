import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { locationHubs } from "@/lib/content";
import { company } from "@/lib/company";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Custom Home Builder Service Areas NJ | Town Guides",
  description: `Luxury custom home builder serving Warren, Watchung, Basking Ridge, Millburn–Short Hills, Westfield and ${company.counties.join(", ")} counties. Local guides with real project paths.`,
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Service areas"
        title={`${company.serviceAreaLabel} — with deep local roots`}
        description={`Primary focus: ${company.focusTowns.join(", ")}. Broader service across ${company.counties.join(", ")} counties.`}
      />
      <section className="section pt-0">
        <div className="container-wide grid gap-6 md:grid-cols-2">
          {locationHubs.map((loc) => (
            <Link key={loc.slug} href={`/locations/${loc.slug}`} className="card card-hover p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-gold">
                {loc.county} County, NJ
              </p>
              <h2 className="mt-2 font-display text-3xl text-ivory">{loc.name}</h2>
              <p className="mt-3 text-text-muted">{loc.blurb}</p>
              <span className="mt-6 inline-block text-sm text-gold">Open guide →</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
