import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Articles and notes from Vantage Construction on custom homes, renovations, land, and building in Central & Northern New Jersey.",
  path: "/insights/blog",
});

const posts = [
  {
    title: "What “No Surprises” really means in custom home building",
    excerpt:
      "How clear communication, upfront budgeting conversations, and milestone updates protect the experience from day one through housewarming.",
  },
  {
    title: "Knockdown vs. major renovation: a practical comparison",
    excerpt:
      "When keeping the existing structure makes sense — and when a rebuild on your lot unlocks a better long-term home.",
  },
  {
    title: "ADUs in New Jersey: lifestyle and property potential",
    excerpt:
      "How accessory dwellings can support multi-generational living, guests, or long-term flexibility on the right property.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas for homeowners and partners"
        description="Editorial foundation for ongoing SEO content. Expand each topic into full articles as your content program grows."
      />
      <section className="section pt-0">
        <div className="container-v space-y-5">
          {posts.map((post) => (
            <article key={post.title} className="card p-8">
              <h2 className="font-display text-3xl text-ivory">{post.title}</h2>
              <p className="mt-3 text-text-muted">{post.excerpt}</p>
              <Link href="/start" className="mt-5 inline-block text-sm text-gold">
                Talk with Victor’s team about this topic →
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
