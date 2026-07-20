import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/company";
import { getTownBySlug, townHubs } from "@/lib/locations/towns";
import { createMetadata, faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return townHubs.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getTownBySlug(slug);
  if (!loc) return {};
  return createMetadata({
    title: loc.seoTitle,
    description: loc.seoDescription,
    path: `/locations/${loc.slug}`,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getTownBySlug(slug);
  if (!loc) notFound();

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(loc.faqs)} />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: loc.name, path: `/locations/${loc.slug}` },
        ]}
        eyebrow={`${loc.county} County, New Jersey`}
        title={loc.headline}
        description={loc.blurb}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/start" className="btn btn-primary">
            Schedule a consultation
          </Link>
          <Link href="/cost-to-build-a-house-nj" className="btn btn-secondary">
            Cost to build calculator
          </Link>
        </div>
      </PageHero>

      <section className="section pt-0">
        <div className="container-v max-w-3xl space-y-5">
          {loc.intro.map((p) => (
            <p key={p.slice(0, 48)} className="text-lg text-text-muted">
              {p}
            </p>
          ))}
          <p className="text-sm text-text-dim">
            Serving {loc.name} from {company.address.full} · {company.phone} · Builder #
            {company.licenses.builder}
          </p>
        </div>
      </section>

      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-4xl text-ivory">
            Local knowledge for building in {loc.name}
          </h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Cookie-cutter town pages do not rank — and they do not help homeowners. Here is how we
            think about real {loc.name} projects.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {loc.localKnowledge.map((item) => (
              <div key={item.title} className="card p-7">
                <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="font-display text-4xl text-ivory">Projects we build in {loc.name}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {loc.projectAngles.map((item) => (
              <div key={item.title} className="card p-7">
                <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-4xl text-ivory">Studios & services for {loc.name}</h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Interactive tools for early ranges — then a consultation for lot-specific reality.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loc.services.map((item) => (
              <Link key={item.href} href={item.href} className="card card-hover p-6">
                <span className="font-display text-2xl text-ivory">{item.label}</span>
                <p className="mt-2 text-sm text-text-muted">{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">{loc.name} FAQs</h2>
          <div className="mt-8 space-y-4">
            {loc.faqs.map((item) => (
              <details key={item.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-2xl text-ivory">{item.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-text-dim">
            Nearby communities we also serve: {loc.nearby.join(", ")}.
          </p>
        </div>
      </section>

      <CtaBanner title={`Start a ${loc.name} project conversation`} />
    </>
  );
}
