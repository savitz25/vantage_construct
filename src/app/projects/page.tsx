import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { SmartImage } from "@/components/SmartImage";
import { caseStudies } from "@/lib/projects/case-studies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Custom Home & Renovation Projects NJ | Case Studies",
  description:
    "Project case studies from Vantage Construction across Warren, Watchung, Basking Ridge, Short Hills, and Westfield — rebuilds, kitchens, additions, outdoor living, and more.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", path: "/projects" },
        ]}
        eyebrow="Portfolio · Case studies"
        title="Real project paths — not stock photography alone"
        description="Each case study pairs a North Jersey context with challenge, solution, and outcome — then links to the services, Studios, and calculators that support a similar path. Photography is representative of craft and program until dedicated project galleries are published."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#case-studies" className="btn btn-primary">
            Browse case studies
          </a>
          <Link href="/locations" className="btn btn-secondary">
            Town guides
          </Link>
          <Link href="/start" className="btn btn-secondary">
            Discuss your project
          </Link>
        </div>
      </PageHero>

      <section className="section-sm border-b border-border bg-bg-elevated">
        <div className="container-wide grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Local context",
              body: "Every study is rooted in a real service-area town — lot, lifestyle, and market dynamics included.",
            },
            {
              title: "Decision clarity",
              body: "Challenge → solution → outcome, so you can see how Vantage thinks before a first meeting.",
            },
            {
              title: "Next tools",
              body: "Each page links Cost Studio, rebuild assessment, land evaluation, or the matching Studio.",
            },
          ].map((c) => (
            <div key={c.title} className="card p-6">
              <h2 className="font-display text-2xl text-ivory">{c.title}</h2>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="case-studies" className="section scroll-mt-28">
        <div className="container-wide">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">{caseStudies.length} featured studies</p>
            <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
              Projects by type and town
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {caseStudies.map((p) => (
              <article
                key={p.slug}
                className="card card-hover group flex flex-col overflow-hidden p-0"
              >
                <Link href={`/projects/${p.slug}`} className="relative block aspect-[16/10]">
                  <SmartImage
                    src={p.heroImage}
                    alt={p.heroAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    {p.typeLabel}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
                    {p.locationName} · {p.county} County
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-ivory">
                    <Link href={`/projects/${p.slug}`} className="hover:text-navy-soft">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-text-muted line-clamp-3">{p.summary}</p>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="mt-4 text-sm font-semibold text-gold-deep underline-offset-2 hover:underline"
                  >
                    Read case study →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm border-t border-border bg-bg-elevated">
        <div className="container-wide flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl text-ivory sm:text-3xl">
              Have a project like one of these?
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Start with Cost Studio or a town guide — then a calm conversation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/cost-to-build-a-house-nj" className="btn btn-primary min-h-11">
              Cost Studio
            </Link>
            <Link href="/locations" className="btn btn-secondary min-h-11">
              Town guides
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner title="Tell us about your project" />
    </>
  );
}
