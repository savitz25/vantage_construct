import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { company } from "@/lib/company";
import { getPostsByDate, type InsightPost } from "@/lib/insights/posts";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog | Field Notes on Custom Homes & Building in NJ",
  description:
    "Editorial articles from Vantage Construction on custom home costs, renovate vs rebuild, lot buildability, luxury lower levels, and accessory buildings in North Jersey.",
  path: "/insights/blog",
});

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getPostsByDate();
  const featured = posts[0];
  // All five (and any future posts) get visual cards; featured is also highlighted above
  const gridPosts = posts;

  return (
    <>
      {/* Hero */}
      <section className="hero-grid grain border-b border-border pt-[5.25rem] pb-10 sm:pt-24 sm:pb-12">
        <div className="container-wide">
          <nav className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-text-dim">
            <Link href="/" className="transition hover:text-navy">
              Home
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <Link href="/insights" className="transition hover:text-navy">
              Insights
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-navy">Blog</span>
          </nav>

          <div className="max-w-3xl">
            <p className="eyebrow">Field notes & articles</p>
            <h1 className="mt-3 font-display text-4xl text-ivory sm:text-5xl lg:text-[3.15rem] lg:leading-[1.1]">
              Ideas that make planning clearer
            </h1>
            <p className="mt-4 max-w-2xl text-base text-text-muted sm:text-lg">
              Longform guidance on costs, land, renovations, and luxury upgrades — written for
              North Jersey homeowners who want substance before the sales pitch.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#articles" className="btn btn-primary">
              Browse articles
            </a>
            <Link href="/insights" className="btn btn-secondary">
              Resource Center
            </Link>
            <Link href="/insights/faq" className="btn btn-secondary">
              FAQ hub
            </Link>
          </div>
        </div>
      </section>

      {/* Featured article */}
      {featured ? (
        <section className="section" aria-labelledby="featured-article-heading">
          <div className="container-wide">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Featured</p>
                <h2
                  id="featured-article-heading"
                  className="mt-2 font-display text-3xl text-ivory sm:text-4xl"
                >
                  Latest from the field
                </h2>
              </div>
              <p className="max-w-sm text-sm text-text-dim">
                Our most recent editorial — deep dives with tools where they help.
              </p>
            </div>

            <FeaturedCard post={featured} />
          </div>
        </section>
      ) : null}

      {/* Full article grid — every published article as a strong visual card */}
      <section
        id="articles"
        className="section scroll-mt-28 border-t border-border bg-bg-elevated"
        aria-labelledby="all-articles-heading"
      >
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">All articles</p>
              <h2
                id="all-articles-heading"
                className="mt-2 font-display text-3xl text-ivory sm:text-4xl"
              >
                {posts.length} field notes
              </h2>
            </div>
            <p className="text-sm text-text-dim">
              Sorted by date · {company.founder}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="section border-t border-border">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Keep planning</p>
            <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
              Guides, tools, and answers in one place
            </h2>
            <p className="mt-3 text-text-muted">
              The Resource Center connects articles to Studios, calculators, and the FAQ hub.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/insights",
                label: "Resource Center",
                note: "Pillar guides & pathways",
              },
              {
                href: "/insights/faq",
                label: "FAQ hub",
                note: "Answers by journey",
              },
              {
                href: "/calculators",
                label: "Calculators",
                note: "Feasibility & ranges",
              },
              {
                href: "/start",
                label: "Start a conversation",
                note: "Complimentary consult",
              },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="card card-hover p-6 text-center sm:text-left"
              >
                <span className="font-display text-xl text-ivory sm:text-2xl">{l.label}</span>
                <p className="mt-2 text-sm text-text-dim">{l.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedCard({ post }: { post: InsightPost }) {
  const href = `/insights/${post.slug}`;
  return (
    <article className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-2xl border border-border shadow-[var(--shadow)] sm:min-h-[460px] lg:min-h-[500px]">
      <SmartImage
        src={post.image}
        alt={post.imageAlt}
        fill
        priority
        sizes="100vw"
        className="transition duration-700 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
      <div className="relative z-10 p-6 sm:p-8 lg:p-10 lg:pr-16">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {post.topicLabel}
          </span>
          {post.includesTool ? (
            <span className="rounded-full border border-gold/50 bg-gold/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-bright backdrop-blur-sm">
              {post.toolLabel}
            </span>
          ) : null}
          <span className="text-xs text-white/70">
            {formatDate(post.datePublished)} · {post.readTime}
          </span>
        </div>
        <h3 className="mt-4 max-w-3xl font-display text-3xl text-white drop-shadow sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          <Link href={href} className="transition hover:text-white/95">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link href={href} className="btn btn-primary">
            Read article →
          </Link>
          <span className="text-sm text-white/75">
            {post.author === "Victor Lobozzo" ? company.founder : post.author}
          </span>
        </div>
      </div>
    </article>
  );
}

function ArticleCard({ post }: { post: InsightPost }) {
  const href = `/insights/${post.slug}`;
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden p-0">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden">
        <SmartImage
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition duration-500 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold-deep">
            {post.topicLabel}
          </span>
          <span className="text-text-dim" aria-hidden>
            ·
          </span>
          <span className="text-xs text-text-dim">{post.readTime}</span>
          {post.includesTool ? (
            <>
              <span className="text-text-dim" aria-hidden>
                ·
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-navy">
                {post.toolLabel}
              </span>
            </>
          ) : null}
        </div>
        <h3 className="mt-3 font-display text-xl text-ivory sm:text-2xl">
          <Link href={href} className="transition hover:text-navy-soft">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-text-muted leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <time dateTime={post.datePublished} className="text-xs text-text-dim">
            {formatDate(post.datePublished)}
          </time>
          <Link
            href={href}
            className="text-sm font-semibold text-gold-deep underline-offset-2 hover:underline"
          >
            Read article →
          </Link>
        </div>
      </div>
    </article>
  );
}
