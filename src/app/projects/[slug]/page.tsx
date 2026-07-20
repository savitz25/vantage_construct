import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { PlanningPathways } from "@/components/PlanningPathways";
import { SmartImage } from "@/components/SmartImage";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  caseStudies,
} from "@/lib/projects/case-studies";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) return {};
  return createMetadata({
    title: project.seoTitle,
    description: project.seoDescription,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) notFound();

  const related = caseStudies.filter((p) => p.slug !== project.slug).slice(0, 3);
  const path = `/projects/${project.slug}`;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.seoDescription,
    url: absoluteUrl(path),
    image: absoluteUrl(project.heroImage),
    about: {
      "@type": "Place",
      name: `${project.locationName}, NJ`,
    },
    creator: {
      "@type": "HomeAndConstructionBusiness",
      name: "Vantage Construction",
      url: absoluteUrl("/"),
    },
  };

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path },
        ])}
      />

      <header className="hero-grid grain border-b border-border pt-[4.75rem] pb-0 sm:pt-24">
        <div className="container-wide pb-8 sm:pb-10">
          <nav className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <Link href="/projects" className="transition hover:text-navy">
              Projects
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-navy">Case study</span>
          </nav>

          <div className="max-w-3xl">
            <p className="eyebrow">
              {project.typeLabel} · {project.locationName}, {project.county} County
            </p>
            <h1 className="mt-3 font-display text-4xl text-ivory sm:text-5xl lg:text-[3.1rem] lg:leading-[1.1]">
              {project.title}
            </h1>
            <p className="mt-4 text-base text-text-muted sm:text-lg">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/start" className="btn btn-primary min-h-12">
                Discuss a similar project
              </Link>
              <Link
                href={`/locations/${project.locationSlug}`}
                className="btn btn-secondary min-h-12"
              >
                {project.locationName} town guide
              </Link>
            </div>
          </div>
        </div>

        <div className="relative h-[min(42vh,340px)] w-full sm:h-[min(48vh,420px)]">
          <SmartImage
            src={project.heroImage}
            alt={project.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </header>

      {/* Challenge / solution / outcome */}
      <section className="section">
        <div className="container-wide grid gap-6 lg:grid-cols-3">
          {[
            { title: "Challenge", body: project.challenge },
            { title: "Solution", body: project.solution },
            { title: "Outcome", body: project.outcome },
          ].map((block) => (
            <div key={block.title} className="card p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                {block.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="section border-t border-border bg-bg-elevated">
        <div className="container-wide grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Scope & features</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              What the program included
            </h2>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {project.scope.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-text-muted"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-text-dim">{project.timelineNote}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.features.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-navy"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Related services
              </p>
              <ul className="mt-4 space-y-2">
                {project.relatedServices.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-semibold text-ivory underline-offset-2 hover:text-gold-deep hover:underline"
                    >
                      {l.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                Tools used on this path
              </p>
              <ul className="mt-4 space-y-2">
                {project.relatedTools.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="font-semibold text-ivory underline-offset-2 hover:text-gold-deep hover:underline"
                    >
                      {l.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {project.relatedInsights?.length ? (
              <div className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                  Related insights
                </p>
                <ul className="mt-4 space-y-2">
                  {project.relatedInsights.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="font-semibold text-ivory underline-offset-2 hover:text-gold-deep hover:underline"
                      >
                        {l.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 ? (
        <section className="section">
          <div className="container-wide">
            <h2 className="font-display text-3xl text-ivory sm:text-4xl">Project photography</h2>
            <p className="mt-2 max-w-2xl text-sm text-text-muted">
              Imagery represents craft and program. Dedicated shoot galleries can replace these as
              new project assets are approved.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((img) => (
                <div
                  key={img.src + img.alt}
                  className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-border"
                >
                  <SmartImage src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* More projects */}
      {related.length ? (
        <section className="section border-t border-border bg-bg-elevated">
          <div className="container-wide">
            <h2 className="font-display text-3xl text-ivory">More case studies</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="card card-hover p-0 overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <SmartImage src={p.heroImage} alt={p.heroAlt} fill sizes="33vw" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
                      {p.locationName}
                    </p>
                    <p className="mt-1 font-display text-xl text-ivory">{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/projects"
              className="mt-6 inline-block text-sm font-semibold text-gold-deep underline-offset-2 hover:underline"
            >
              All projects →
            </Link>
          </div>
        </section>
      ) : null}

      <PlanningPathways
        title="Plan a project like this"
        body="Use the same tools that frame real conversations — then schedule time with the team."
      />

      <CtaBanner title="Start a conversation about your project" />
    </>
  );
}
