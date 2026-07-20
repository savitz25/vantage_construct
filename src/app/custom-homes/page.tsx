import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { LocationsStrip } from "@/components/LocationsStrip";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { company } from "@/lib/company";
import { customHomeServices } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Custom Home Builder North Jersey | Luxury Homes & Rebuilds",
  description:
    "Luxury custom homes, knockdown rebuilds, ADUs, and accessory buildings in Warren, Watchung, Basking Ridge & Short Hills. Transparent process, Cost Studio ranges, no surprises — Vantage Construction since 1990.",
  path: "/custom-homes",
});

const pathwayImages: Record<string, { src: string; alt: string }> = {
  "/available-homes": {
    src: "/media/plans/22a95723-wellington-exterior-01-768x421.webp",
    alt: "Luxury custom home exterior design option in North Jersey",
  },
  "/custom-homes/rebuilds": {
    src: "/media/rebuilds/before-ranch-nj.webp",
    alt: "North Jersey home ready for knockdown rebuild evaluation",
  },
  "/custom-homes/adus": {
    src: "/media/garages/pool-pavilion.jpg",
    alt: "Accessory dwelling and guest suite style building",
  },
  "/custom-homes/accessory-buildings": {
    src: "/media/garages/pool-pavilion.jpg",
    alt: "Luxury pool house and accessory building",
  },
  "/land/evaluation": {
    src: "/media/plans/c24862ba-ridgeview-hires16-768x525.webp",
    alt: "Buildable residential lot in Central New Jersey",
  },
};

const whyPoints = [
  {
    title: "Clarity before commitment",
    body: "Design & Discovery, Cost Studio ranges, and honest lot evaluation so you understand the path — and the budget — before major deposits.",
  },
  {
    title: "Hands-on master builder leadership",
    body: `${company.founder} leads with cost discipline, craft standards, and direct communication — the same standard for a new home or a rebuild on land you already love.`,
  },
  {
    title: "Local execution",
    body: `Deep roots in ${company.focusTowns.join(", ")} and surrounding ${company.serviceAreaLabel} — zoning, trades, and timelines that match how building actually works here.`,
  },
] as const;

export default function CustomHomesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Custom Homes", path: "/custom-homes" },
        ]}
        eyebrow="New construction · Central & Northern NJ"
        title="Luxury custom homes built to endure — with no surprises"
        description="From first vision on a blank lot to a knockdown rebuild on the street you already love, Vantage guides you through a clear process: honest ranges, thoughtful design, and craftsmanship that still feels right years later."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/cost-to-build-a-house-nj" className="btn btn-primary">
            Open Cost Studio
          </Link>
          <Link href="/custom-homes/process" className="btn btn-secondary">
            7-step process
          </Link>
          <Link href="/available-homes" className="btn btn-secondary">
            Browse designs
          </Link>
        </div>
      </PageHero>

      {/* Who this is for */}
      <section className="section-sm border-b border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
            <div>
              <p className="eyebrow">Who this is for</p>
              <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
                Homeowners ready for a true custom path
              </h2>
            </div>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                This hub is for families planning a new custom home, evaluating a knockdown on an
                existing lot, or exploring ADUs and accessory buildings that match the main house.
                If you want national average calculators and a one-size floor plan, you are in the
                wrong place.
              </p>
              <p>
                If you want ranges that reflect North Jersey reality, a process that surfaces
                decisions early, and a builder who still cares how the house lives fifteen years
                from now — start here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pathways */}
      <section className="section">
        <div className="container-wide">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">Pathways</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Choose how you want to build
            </h2>
            <p className="mt-3 text-text-muted">
              Every path connects to tools, process, and a real conversation — not a dead-end
              brochure page.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {customHomeServices.map((service) => {
              const img = pathwayImages[service.href];
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="card card-hover group flex flex-col overflow-hidden p-0"
                >
                  {img ? (
                    <div className="relative aspect-[16/10] bg-bg-soft">
                      <SmartImage
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h2 className="font-display text-2xl text-ivory sm:text-3xl">{service.title}</h2>
                    <p className="mt-2 flex-1 text-sm text-text-muted">{service.body}</p>
                    <span className="mt-4 text-sm font-semibold text-gold-deep">Explore →</span>
                  </div>
                </Link>
              );
            })}
            <Link
              href="/custom-homes/process"
              className="card card-hover group flex flex-col overflow-hidden p-0"
            >
              <div className="relative aspect-[16/10] bg-bg-soft">
                <SmartImage
                  src="/media/plans/d973d32e-ridgeview-hires17-768x512.webp"
                  alt="Completed luxury custom home exterior in North Jersey"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h2 className="font-display text-2xl text-ivory sm:text-3xl">Building process</h2>
                <p className="mt-2 flex-1 text-sm text-text-muted">
                  Vision → Design & Discovery → Agreement → Permits → Build → C.O. → Celebrate —
                  with clear ownership at every step.
                </p>
                <span className="mt-4 text-sm font-semibold text-gold-deep">See every step →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">The Vantage approach</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              What makes a custom build feel calm
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {whyPoints.map((p) => (
              <div key={p.title} className="card p-6 sm:p-7">
                <h3 className="font-display text-2xl text-ivory">{p.title}</h3>
                <p className="mt-3 text-sm text-text-muted leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/design-studio" className="btn btn-primary min-h-12">
              Open Design Studio
            </Link>
            <Link href="/cost-to-build-a-house-nj" className="btn btn-secondary min-h-12">
              Cost Studio ranges
            </Link>
            <Link href="/insights/faq" className="btn btn-secondary min-h-12">
              Custom home FAQ
            </Link>
          </div>
        </div>
      </section>

      <LocationsStrip
        heading="Custom homes in the towns we know best"
        body="Explore local guides for lot patterns, rebuilds, and renovation demand in our core North Jersey communities."
      />

      <CtaBanner title="Start your custom home conversation" />
    </>
  );
}
