import Link from "next/link";
import { AccessoryBuildingConfigurator } from "@/components/accessory-buildings/AccessoryBuildingConfigurator";
import { AccessoryConceptForm } from "@/components/accessory-buildings/AccessoryConceptForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import {
  accessoryCases,
  accessoryDisclaimer,
  accessoryFaqs,
  accessoryProcess,
  costDrivers,
  directionalCostBands,
  lifestyleUseCases,
  zoningPoints,
} from "@/lib/accessory-buildings/content";
import { createMetadata, faqJsonLd, localBusinessJsonLd, serviceJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Accessory Buildings NJ | Pool Houses, Garages & Pavilions",
  description:
    "Expand your estate with luxury pool houses, collector garages, guest suites, workshops, and entertainment pavilions. Interactive configurator, honest cost ranges, and site feasibility from Vantage Construction.",
  path: "/custom-homes/accessory-buildings",
});

export default function AccessoryBuildingsPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(accessoryFaqs)} />
      <JsonLd
        data={serviceJsonLd({
          name: "Luxury Accessory Buildings & Outbuildings",
          description:
            "Custom pool houses, collector garages, carriage houses, guest suites, workshops, and entertainment pavilions in Central & Northern New Jersey.",
          path: "/custom-homes/accessory-buildings",
          serviceType: "Accessory building construction",
        })}
      />

      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Custom Homes", href: "/custom-homes" },
          { label: "Accessory Buildings", path: "/custom-homes/accessory-buildings" },
        ]}
        eyebrow="Accessory buildings · Estate lifestyle"
        title="The most exciting space on your property doesn’t have to be the house"
        description="Pool houses, collector garages, guest suites, workshops, carriage houses, and entertainment pavilions — designed with the same craftsmanship as our custom homes, and honest about cost, zoning, and complexity."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#configurator" className="btn btn-primary">
            Design your structure
          </a>
          <a href="#lifestyle" className="btn btn-secondary">
            Explore ideas
          </a>
        </div>
      </PageHero>

      {/* Hero photography */}
      <section className="border-b border-border bg-bg-elevated" aria-label="Accessory building inspiration">
        <div className="container-wide py-6 sm:py-8">
          <div className="relative aspect-[21/9] min-h-[200px] overflow-hidden rounded-2xl border border-border sm:min-h-[260px]">
            <SmartImage
              src="/media/garages/pool-pavilion.jpg"
              alt="Luxury pool house and entertainment pavilion on a private estate"
              fill
              priority
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 max-w-xl sm:bottom-6 sm:left-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                Expand your estate. Elevate your lifestyle.
              </p>
              <p className="mt-1 font-display text-xl text-white drop-shadow sm:text-2xl">
                Standalone structures that feel intentional — not afterthoughts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive configurator */}
      <section className="section">
        <div className="container-wide">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow justify-center">Interactive · Backyard retreat configurator</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Make the dream — and the investment level — visible
            </h2>
            <p className="mt-3 text-text-muted">
              Choose purpose, scale, and finish. See a live conceptual range. Go deeper in the full
              Garage Studio when you&apos;re ready.
            </p>
          </div>
          <AccessoryBuildingConfigurator />
        </div>
      </section>

      {/* Lifestyle gallery */}
      <section id="lifestyle" className="section scroll-mt-28 border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">How you live</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Inspiration by identity — not construction jargon
            </h2>
            <p className="mt-3 text-text-muted">
              You don&apos;t wake up wanting an “accessory building.” You want a room for the life
              you already live — outside the main floor plan.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lifestyleUseCases.map((u) => (
              <article
                key={u.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-[var(--shadow)]"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <SmartImage
                    src={u.image}
                    alt={u.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                    {u.subtitle}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-ivory">{u.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-text-muted">{u.body}</p>
                  <a
                    href="#configurator"
                    className="mt-4 text-sm font-semibold text-gold-deep underline-offset-2 hover:underline"
                  >
                    Configure this lifestyle →
                  </a>
                </div>
              </article>
            ))}
            {/* Sixth tile: full studio CTA */}
            <Link
              href="/accessory-building-cost-nj#tool"
              className="card card-hover flex flex-col justify-center p-8 sm:col-span-2 lg:col-span-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Full interactive studio
              </p>
              <h3 className="mt-2 font-display text-2xl text-ivory">Garage Studio</h3>
              <p className="mt-2 text-sm text-text-muted">
                Doors, living above, amenities, and a deeper planning estimate — the complete
                configurator for accessory structures.
              </p>
              <span className="btn btn-primary mt-6 self-start">Open Garage Studio →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Cost reality */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Cost reality</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              These are not inexpensive sheds
            </h2>
            <p className="mt-3 text-text-muted">
              A finished pool house or carriage house carries real foundation, structure, systems,
              and finish costs — often comparable to a serious addition. Transparency builds better
              projects.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {directionalCostBands.map((b) => (
              <div key={b.label} className="card p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-dim">
                  {b.label}
                </p>
                <p className="mt-2 font-display text-xl text-gold-deep sm:text-2xl">{b.range}</p>
                <p className="mt-2 text-xs text-text-muted">{b.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {costDrivers.map((d) => (
              <div key={d.title} className="rounded-xl border border-border bg-bg-elevated p-5">
                <h3 className="font-display text-lg text-ivory">{d.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{d.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-text-dim">*{accessoryDisclaimer}</p>
        </div>
      </section>

      {/* Zoning */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Zoning & feasibility</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Beautiful ideas still need honest site math
            </h2>
            <p className="mt-3 text-text-muted">
              Accessory structures come with real constraints. Vantage handles the complexity and
              gives early answers — so you don&apos;t fall in love with a building the lot can&apos;t
              hold.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {zoningPoints.map((z) => (
              <div key={z.title} className="card p-6">
                <h3 className="font-display text-xl text-ivory">{z.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{z.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/land/evaluation" className="btn btn-secondary">
              Land evaluation for your lot →
            </Link>
            <Link href="/custom-homes/adus" className="btn btn-secondary">
              When it becomes an ADU →
            </Link>
          </div>
        </div>
      </section>

      {/* Process + cases */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              From lifestyle idea to finished structure
            </h2>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {accessoryProcess.map((s) => (
              <li key={s.step} className="card p-6">
                <span className="font-display text-2xl text-gold">{s.step}</span>
                <h3 className="mt-2 font-display text-xl text-ivory">{s.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {accessoryCases.map((c) => (
              <article key={c.title} className="card p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  {c.outcome}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ivory">{c.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-v max-w-3xl">
          <AccessoryConceptForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-v">
          <h2 className="font-display text-4xl text-ivory">Accessory building FAQs</h2>
          <div className="mt-8 space-y-4">
            {accessoryFaqs.map((item) => (
              <details key={item.q} className="card group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-display text-xl text-ivory sm:text-2xl">{item.q}</h3>
                  <span className="text-gold-deep transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <h2 className="font-display text-3xl text-ivory">Related paths</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/accessory-building-cost-nj",
                label: "Garage Studio",
                note: "Full interactive design + estimate",
              },
              {
                href: "/transformations/garages",
                label: "Garages (existing homes)",
                note: "Transformation path for current properties",
              },
              {
                href: "/transformations/outdoor-living",
                label: "Outdoor living",
                note: "Pools, kitchens, and entertaining",
              },
              {
                href: "/outdoor-kitchen-cost-nj",
                label: "Outdoor Living Studio",
                note: "Configure outdoor programs",
              },
              {
                href: "/custom-homes/adus",
                label: "ADUs",
                note: "When living space is the goal",
              },
              {
                href: "/land/evaluation",
                label: "Land evaluation",
                note: "Lot feasibility first",
              },
              {
                href: "/cost-to-build-a-house-nj",
                label: "Cost Studio",
                note: "Whole-home construction ranges",
              },
              { href: "/start", label: "Consultation", note: "Talk with the team" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="card card-hover p-5">
                <span className="font-display text-xl text-ivory">{l.label}</span>
                <p className="mt-1 text-xs text-text-dim">{l.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
