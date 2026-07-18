import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Vantage Construction & Victor Lobozzo",
  description:
    "Family-owned luxury custom home builder founded in 1990 by Master Builder Victor Lobozzo — serving Warren, Watchung, Basking Ridge, and Millburn-Short Hills.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A family business built on craftsmanship and trust"
        description={`Founded in ${company.founded} by Master Builder ${company.founder}, Vantage Construction has spent ${company.yearsExperience} years creating luxury homes that stand the test of time.`}
      />

      <section className="section pt-0">
        <div className="container-v space-y-10">
          <div className="card p-8 sm:p-10">
            <h2 className="font-display text-3xl text-ivory sm:text-4xl">
              Meet Master Builder Developer {company.founder}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-text-muted">{company.founderBio}</p>
          </div>

          <div id="values">
            <p className="eyebrow">Values</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">What guides every project</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {company.values.map((value) => (
                <div key={value.title} className="card p-7">
                  <h3 className="font-display text-2xl text-ivory">{value.title}</h3>
                  <p className="mt-3 text-text-muted">{value.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="service" className="card p-8">
            <h2 className="font-display text-3xl text-ivory">Service area</h2>
            <p className="mt-3 text-text-muted">
              Distinctive luxury design & construction in {company.serviceAreaLabel}, with focus in{" "}
              {company.focusTowns.join(", ")} — across {company.counties.join(", ")} counties.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/locations" className="btn btn-secondary">
                Location guides
              </Link>
              <Link href="/about/careers" className="btn btn-secondary">
                Join our team
              </Link>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="font-display text-3xl text-ivory">America&apos;s Trusted Builders</h2>
            <p className="mt-3 text-text-muted">{company.recognition}</p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
