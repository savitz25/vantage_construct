import Link from "next/link";
import { GatedResourceForm } from "@/components/insights/GatedResourceForm";
import { InsightsTopicFilter } from "@/components/insights/InsightsTopicFilter";
import { NewsletterForm } from "@/components/insights/NewsletterForm";
import { JsonLd } from "@/components/JsonLd";
import { SmartImage } from "@/components/SmartImage";
import { company } from "@/lib/company";
import {
  gatedResource,
  getFeatured,
  getSupporting,
  insightAudiences,
} from "@/lib/insights/content";
import { createMetadata, localBusinessJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Homebuilding Resource Center | Insights & Guides NJ",
  description:
    "Expert guides on custom home costs, process, land, renovations, and North Jersey towns — plus calculators and Studios from Vantage Construction. Field notes from master builder Victor Lobozzo.",
  path: "/insights",
});

export default function InsightsPage() {
  const featured = getFeatured();
  const supporting = getSupporting();

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />

      {/* 1. Masthead */}
      <section className="hero-grid grain border-b border-border pt-[5.25rem] pb-10 sm:pt-24 sm:pb-12">
        <div className="container-wide">
          <nav className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-navy">Insights</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow">Homebuilding resource center</p>
              <h1 className="mt-3 max-w-3xl font-display text-4xl text-ivory sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                Field notes, guides & tools for a clearer path home
              </h1>
              <p className="mt-4 max-w-2xl text-base text-text-muted sm:text-lg">
                Expert guidance for homeowners, landowners, realtors, and investors — written to help
                you plan with confidence before you call. Tightly linked to Vantage Studios and
                Calculators.
              </p>
            </div>

            {/* Architect-style title block */}
            <aside className="rounded-xl border border-border bg-surface/90 p-5 shadow-[var(--shadow)] sm:p-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                Drawing block
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="text-text-dim">Project</dt>
                  <dd className="font-medium text-ivory">Resource Center</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="text-text-dim">Sheet</dt>
                  <dd className="font-medium text-ivory">INS-01</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="text-text-dim">Checked by</dt>
                  <dd className="font-medium text-ivory">{company.founder}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-text-dim">Discipline</dt>
                  <dd className="font-medium text-ivory">Planning · E-E-A-T</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#featured" className="btn btn-primary">
              Featured guides
            </a>
            <Link href="/calculators" className="btn btn-secondary">
              Open calculators
            </Link>
            <Link href="/studios" className="btn btn-secondary">
              Open Studios
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured editorial */}
      <section id="featured" className="section scroll-mt-28">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Featured</p>
              <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
                Start with the essentials
              </h2>
            </div>
            <p className="max-w-sm text-sm text-text-dim">
              Pillar guides with the highest planning value — several include live tools.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
            {/* Large feature */}
            <article className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-2xl border border-border shadow-[var(--shadow)] sm:min-h-[440px]">
              <SmartImage
                src={featured.image}
                alt={featured.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
              <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    {featured.topicLabel}
                  </span>
                  {featured.includesTool ? (
                    <span className="rounded-full border border-gold/50 bg-gold/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-bright backdrop-blur-sm">
                      {featured.toolLabel}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 max-w-xl font-display text-3xl text-white drop-shadow sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm text-white/85 sm:text-base">{featured.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link href={featured.href} className="btn btn-primary">
                    Read guide →
                  </Link>
                  <span className="text-xs text-white/70">
                    {featured.readTime}
                    {featured.author ? ` · ${featured.author}` : ""}
                  </span>
                </div>
              </div>
            </article>

            {/* Supporting stack */}
            <div className="flex flex-col gap-5">
              {supporting.map((a) => (
                <article
                  key={a.id}
                  className="card card-hover group flex min-h-0 flex-1 overflow-hidden p-0"
                >
                  <Link href={a.href} className="relative w-[38%] min-w-[7.5rem] shrink-0 self-stretch sm:w-40">
                    <SmartImage
                      src={a.image}
                      alt={a.imageAlt}
                      fill
                      sizes="160px"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
                        {a.topicLabel}
                      </span>
                      {a.includesTool ? (
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-navy">
                          {a.toolLabel}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 font-display text-xl text-ivory sm:text-2xl">
                      <Link href={a.href} className="transition hover:text-navy-soft">
                        {a.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-text-muted">{a.excerpt}</p>
                    <Link
                      href={a.href}
                      className="mt-3 text-sm font-semibold text-gold-deep underline-offset-2 hover:underline"
                    >
                      Read →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Gated resource */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide">
          <div className="grid overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)] lg:grid-cols-[1.1fr_1fr]">
            <div className="relative min-h-[240px] lg:min-h-full">
              <SmartImage
                src="/media/plans/d973d32e-ridgeview-hires17-768x512.webp"
                alt="Luxury custom home — 7 Steps guide"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy/50 to-transparent lg:bg-gradient-to-t lg:from-navy-deep/70 lg:via-transparent" />
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-bright">
                  {gatedResource.eyebrow}
                </p>
                <p className="mt-2 font-display text-2xl text-white sm:text-3xl">
                  Free PDF · Printable roadmap
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="eyebrow">{gatedResource.eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
                {gatedResource.title}
              </h2>
              <p className="mt-3 text-text-muted">{gatedResource.body}</p>
              <div className="mt-6">
                <GatedResourceForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Audience pathways */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">Who you are</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Four clear entry points
            </h2>
            <p className="mt-3 text-text-muted">
              Different goals, different tools. Start where you are — then go deeper.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {insightAudiences.map((a) => (
              <Link
                key={a.id}
                href={a.href}
                className="card card-hover flex flex-col p-6 transition hover:border-navy/25"
              >
                <h3 className="font-display text-2xl text-ivory">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm text-text-muted">{a.body}</p>
                <span className="mt-5 text-sm font-semibold text-gold-deep">
                  {a.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Browse + topic filters */}
      <section id="browse" className="section border-t border-border bg-bg-elevated scroll-mt-28">
        <div className="container-wide">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">Browse</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Guides, tools & local notes
            </h2>
            <p className="mt-3 text-text-muted">
              Filter by topic. Many resources open an interactive Studio or Calculator — not just
              long-form text.
            </p>
          </div>
          <InsightsTopicFilter />
        </div>
      </section>

      {/* 6. Master builder newsletter */}
      <section className="section">
        <div className="container-wide">
          <div className="grid overflow-hidden rounded-2xl border border-border bg-navy-deep text-on-navy lg:grid-cols-[0.9fr_1.2fr]">
            <div className="relative min-h-[260px] border-b border-white/10 lg:border-b-0 lg:border-r">
              <SmartImage
                src="/media/plans/fc48a99c-willowbrook_front_dusk1-768x432.webp"
                alt={`${company.founder} — Vantage Construction field presence`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-bright">
                  Master builder
                </p>
                <p className="mt-1 font-display text-2xl text-white">{company.founder}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-bright">
                Notes from the master builder
              </p>
              <h2 className="mt-3 font-display text-3xl text-on-navy sm:text-4xl">
                Honest letters from the field
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-on-navy/75">
                Monthly notes from {company.founder} — process, budgets, land realities, and what
                “No Surprises” looks like on real North Jersey jobs. Practical, not promotional.
              </p>
              <div className="mt-6 max-w-lg [&_.label]:text-on-navy/60 [&_.input]:border-white/15 [&_.input]:bg-white/95 [&_.input]:text-text">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Tools hub strip */}
      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide grid gap-4 md:grid-cols-2">
          <Link href="/calculators" className="card card-hover p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Planning tools
            </p>
            <h2 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">Calculators hub</h2>
            <p className="mt-2 text-sm text-text-muted">
              Cost Studio, Move or Improve, ADU Payback, lot feasibility, and more.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-gold-deep">
              Browse calculators →
            </span>
          </Link>
          <Link href="/studios" className="card card-hover p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Visual design
            </p>
            <h2 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">Studios hub</h2>
            <p className="mt-2 text-sm text-text-muted">
              Kitchen, basement, garage, outdoor living, attic, primary suite, Design Studio.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-gold-deep">
              Browse Studios →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
