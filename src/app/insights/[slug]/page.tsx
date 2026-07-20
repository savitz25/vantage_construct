import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { RelatedInsights } from "@/components/insights/RelatedInsights";
import { JsonLd } from "@/components/JsonLd";
import { SmartImage } from "@/components/SmartImage";
import { company } from "@/lib/company";
import { getAllPostSlugs, getPostBySlug } from "@/lib/insights/posts";
import { articleJsonLd, createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.metaDescription,
    path: `/insights/${post.slug}`,
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const path = `/insights/${post.slug}`;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.metaDescription,
          path,
          datePublished: post.datePublished,
        })}
      />

      {/* Hero */}
      <header className="hero-grid grain border-b border-border pt-[5.25rem] pb-10 sm:pt-24 sm:pb-12">
        <div className="container-v max-w-3xl">
          <nav className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <Link href="/insights" className="transition hover:text-navy">
              Insights
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-navy">Article</span>
          </nav>

          <p className="eyebrow">{post.topicLabel}</p>
          <h1 className="mt-3 font-display text-4xl text-ivory sm:text-5xl lg:text-[3.15rem] lg:leading-[1.1]">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-text-muted">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5 text-sm text-text-dim">
            <span className="font-medium text-ivory">
              {post.author === "Victor Lobozzo" ? company.founder : post.author}
            </span>
            <span aria-hidden className="text-border-strong">
              ·
            </span>
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished + "T12:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden className="text-border-strong">
              ·
            </span>
            <span>{post.readTime} read</span>
            {post.includesTool ? (
              <>
                <span aria-hidden className="text-border-strong">
                  ·
                </span>
                <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
                  {post.toolLabel ?? "Includes tool"}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </header>

      {/* Featured image */}
      <div className="border-b border-border bg-bg-elevated">
        <div className="container-v max-w-4xl py-6 sm:py-8">
          <div className="relative aspect-[21/10] min-h-[200px] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow)] sm:min-h-[280px]">
            <SmartImage
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <article className="section pt-10 sm:pt-12">
        <div className="container-v max-w-3xl">
          <ArticleBody blocks={post.body} />

          {/* Tags */}
          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
            <span className="rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs font-semibold text-navy">
              {post.topicLabel}
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs text-text-dim">
              North Jersey
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs text-text-dim">
              Vantage Construction
            </span>
          </div>

          {/* Closing CTA */}
          <div className="mt-10 rounded-2xl border border-border bg-bg-elevated p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
              Next step
            </p>
            <h2 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
              {post.closingCta.label.replace(/→/g, "").trim()}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-text-muted">{post.closingCta.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={post.closingCta.href} className="btn btn-primary">
                {post.closingCta.label.includes("→")
                  ? post.closingCta.label
                  : `${post.closingCta.label} →`}
              </Link>
              <Link href="/start" className="btn btn-secondary">
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </article>

      <RelatedInsights slug={post.slug} />
    </>
  );
}
