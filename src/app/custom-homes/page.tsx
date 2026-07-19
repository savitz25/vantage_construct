import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { customHomeServices } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Custom Home Builder NJ | Luxury Homes Central & Northern New Jersey",
  description:
    "Build a luxury custom home in Central & Northern New Jersey with Vantage Construction — transparent process, elite craftsmanship, no surprises.",
  path: "/custom-homes",
});

export default function CustomHomesPage() {
  return (
    <>
      <PageHero
        eyebrow="New construction"
        title="Luxury custom homes built to endure"
        description="From first vision to housewarming celebration, we guide you through a clear, detail-driven process that blends old-world craftsmanship with modern innovation."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/custom-homes/process" className="btn btn-primary">
            Explore the 7-step process
          </Link>
          <Link href="/available-homes" className="btn btn-secondary">
            Browse available designs
          </Link>
        </div>
      </PageHero>

      <section className="section pt-0">
        <div className="container-wide grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {customHomeServices.map((service) => (
            <Link key={service.href} href={service.href} className="card card-hover p-8">
              <h2 className="font-display text-3xl text-ivory">{service.title}</h2>
              <p className="mt-3 text-text-muted">{service.body}</p>
              <span className="mt-6 inline-block text-sm text-gold">Learn more →</span>
            </Link>
          ))}
          <Link href="/custom-homes/process" className="card card-hover p-8">
            <h2 className="font-display text-3xl text-ivory">Building Process</h2>
            <p className="mt-3 text-text-muted">
              Share vision → Design & Discovery ($500–$2,500) → Agreement → Permits → Build → C.O. →
              Celebrate.
            </p>
            <span className="mt-6 inline-block text-sm text-gold">See every step →</span>
          </Link>
        </div>
      </section>

      <CtaBanner title="Start your custom home journey" />
    </>
  );
}
