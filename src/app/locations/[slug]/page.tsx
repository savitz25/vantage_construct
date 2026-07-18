import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { locationHubs } from "@/lib/content";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return locationHubs.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = locationHubs.find((l) => l.slug === slug);
  if (!loc) return {};
  return createMetadata({
    title: `Custom Home Builder ${loc.name}, NJ`,
    description: `Luxury custom homes, renovations, and land services in ${loc.name}, ${loc.county} County, NJ by Vantage Construction. ${loc.blurb}`,
    path: `/locations/${loc.slug}`,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = locationHubs.find((l) => l.slug === slug);
  if (!loc) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: loc.name, path: `/locations/${loc.slug}` },
        ])}
      />
      <PageHero
        eyebrow={`${loc.county} County, New Jersey`}
        title={`Luxury custom homes in ${loc.name}`}
        description={loc.blurb}
      />
      <section className="section pt-0">
        <div className="container-v space-y-6">
          <div className="card p-8">
            <h2 className="font-display text-3xl text-ivory">
              Building in {loc.name} with local expertise
            </h2>
            <p className="mt-4 text-text-muted">
              Vantage Construction brings {company.yearsExperience} years of hands-on experience to{" "}
              {loc.name} and surrounding communities. Whether you&apos;re planning a new custom
              home, knockdown rebuild, high-end renovation, ADU, or land evaluation, our{" "}
              {company.philosophy} approach means clear communication, realistic budgeting
              conversations, and craftsmanship built to last.
            </p>
            <p className="mt-4 text-text-muted">
              Led by Master Builder {company.founder} from our Warren base, we understand the
              expectations of {loc.county} County homeowners — from design quality to long-term
              durability. Clients remain delighted with Vantage-built homes 15+ years later.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: "/custom-homes", label: "Custom homes" },
              { href: "/transformations", label: "Renovations" },
              { href: "/available-homes", label: "Available designs" },
              { href: "/land", label: "Land services" },
              { href: "/custom-homes/process", label: "Build process" },
              { href: "/start", label: "Schedule consultation" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="card card-hover p-5 text-center">
                <span className="font-display text-xl text-ivory">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner title={`Start a ${loc.name} project conversation`} />
    </>
  );
}
