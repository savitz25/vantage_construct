import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { getRelatedPosts } from "@/lib/insights/posts";

export function RelatedInsights({ slug }: { slug: string }) {
  const related = getRelatedPosts(slug, 3);
  if (!related.length) return null;

  return (
    <section className="section border-t border-border bg-bg-elevated">
      <div className="container-wide">
        <p className="eyebrow">Continue exploring</p>
        <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">Related insights</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <article key={a.slug} className="card card-hover group overflow-hidden p-0">
              <Link href={`/insights/${a.slug}`} className="relative block aspect-[16/10]">
                <SmartImage
                  src={a.image}
                  alt={a.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="transition duration-500 group-hover:scale-[1.03]"
                />
              </Link>
              <div className="p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
                  {a.topicLabel} · {a.readTime}
                </p>
                <h3 className="mt-2 font-display text-xl text-ivory">
                  <Link href={`/insights/${a.slug}`}>{a.title}</Link>
                </h3>
                <Link
                  href={`/insights/${a.slug}`}
                  className="mt-3 inline-block text-sm font-semibold text-gold-deep underline-offset-2 hover:underline"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/cost-to-build-a-house-nj",
              label: "Open Cost Studio",
              note: "North Jersey construction ranges",
            },
            {
              href: "/land/evaluation",
              label: "Evaluate a lot",
              note: "Buildability & feasibility",
            },
            {
              href: "/custom-homes/rebuilds",
              label: "Renovate vs rebuild",
              note: "Decision framework & assessment",
            },
            {
              href: "/studios",
              label: "Browse Studios",
              note: "Visual design tools",
            },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="card card-hover p-5">
              <span className="font-display text-lg text-ivory sm:text-xl">{l.label}</span>
              <p className="mt-1 text-xs text-text-dim">{l.note}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/insights"
            className="text-sm font-semibold text-navy underline-offset-2 hover:underline"
          >
            Resource Center →
          </Link>
          <Link
            href="/calculators"
            className="text-sm font-semibold text-gold-deep underline-offset-2 hover:underline"
          >
            All calculators →
          </Link>
          <Link
            href="/insights/faq"
            className="text-sm font-semibold text-gold-deep underline-offset-2 hover:underline"
          >
            FAQ hub →
          </Link>
          <Link
            href="/locations"
            className="text-sm font-semibold text-gold-deep underline-offset-2 hover:underline"
          >
            Town guides →
          </Link>
        </div>
      </div>
    </section>
  );
}
