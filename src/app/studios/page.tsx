import Link from "next/link";
import { LocationsStrip } from "@/components/LocationsStrip";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { designStudios } from "@/lib/calculators/catalog";
import { createMetadata } from "@/lib/seo";
import { visualForTool } from "@/lib/transformations/studio-media";

export const metadata = createMetadata({
  title: "Design Studios NJ | Kitchen, Basement, Garage & Home Tools",
  description:
    "Interactive Vantage Studios for North Jersey homeowners: Design Studio, Kitchen Studio, Basement Builder, Garage Studio, Outdoor Living, Attic & Primary Suite — visual design with live planning ranges.",
  path: "/studios",
});

export default function StudiosHubPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Studios", path: "/studios" },
        ]}
        eyebrow="Vantage Studios"
        title="Visual design tools for spaces you can see"
        description="Configure kitchens, basements, garages, outdoor rooms, attics, primary suites, and whole-home Design Studio visions — premium visuals with live planning ranges. For pure cost and feasibility math, use Calculators."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#studios-grid" className="btn btn-primary">
            Browse Studios
          </a>
          <Link href="/calculators" className="btn btn-secondary">
            Planning calculators
          </Link>
        </div>
      </PageHero>

      <section className="section-sm border-b border-border bg-bg-elevated">
        <div className="container-wide grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="eyebrow">How Studios work</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              See the space. Adjust the details. Leave with a clearer range.
            </h2>
          </div>
          <div className="space-y-4 text-sm text-text-muted leading-relaxed sm:text-base">
            <p>
              Each Studio is built for homeowners who want to explore options before a sales
              meeting — style, features, and directional investment — then continue into a real
              conversation about their home and lot.
            </p>
            <p>
              Looking for pure feasibility math (move vs improve, ADU payback, multi-lot HBU)?
              Those live on the{" "}
              <Link href="/calculators" className="font-semibold text-navy underline-offset-2 hover:underline">
                Calculators hub
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="studios-grid" className="section scroll-mt-28">
        <div className="container-wide grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {designStudios.map((s) => {
            const visual = visualForTool(s.href);
            return (
              <article
                key={s.href}
                className="card card-hover group flex flex-col overflow-hidden p-0"
              >
                <div className="relative aspect-[16/10] bg-bg-soft">
                  {visual ? (
                    <SmartImage
                      src={visual.image}
                      alt={visual.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <p className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    {s.eyebrow}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h2 className="font-display text-2xl text-ivory sm:text-3xl">{s.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-text-muted">{s.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link href={s.href} className="btn btn-primary !px-4 !py-2.5 text-xs">
                      Open Studio
                    </Link>
                    {"serviceHref" in s && s.serviceHref ? (
                      <Link
                        href={s.serviceHref}
                        className="btn btn-secondary !px-4 !py-2.5 text-xs"
                      >
                        {s.serviceLabel}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="container-wide mt-12">
          <div className="card flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Looking for cost or feasibility only?
              </p>
              <h2 className="mt-2 font-display text-2xl text-ivory">
                Cost Studio, Move or Improve, ADU Payback & more
              </h2>
              <p className="mt-2 max-w-xl text-sm text-text-muted">
                Pure planning tools live on the Calculators hub — separate from visual design
                Studios.
              </p>
            </div>
            <Link href="/calculators" className="btn btn-primary shrink-0">
              Open Calculators →
            </Link>
          </div>
        </div>

        <div className="container-wide mt-8 flex flex-wrap gap-4">
          <Link href="/transformations" className="text-sm font-semibold text-gold-deep hover:underline">
            Browse transformation services →
          </Link>
          <Link href="/custom-homes" className="text-sm font-semibold text-gold-deep hover:underline">
            Custom homes →
          </Link>
          <Link href="/insights/faq" className="text-sm font-semibold text-gold-deep hover:underline">
            Planning FAQ →
          </Link>
        </div>
      </section>

      <LocationsStrip
        compact
        heading="Studios for North Jersey homes"
        body="Configure for how you live in Warren, Watchung, Basking Ridge, Short Hills, and nearby towns — then refine on your actual house."
      />
    </>
  );
}
