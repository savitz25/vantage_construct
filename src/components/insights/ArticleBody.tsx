import Link from "next/link";
import type { ReactNode } from "react";
import type { PostBlock } from "@/lib/insights/posts";

/** Renders structured editorial blocks with premium hierarchy */
export function ArticleBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="article-prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="article-p">
                {linkify(block.text)}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="article-h2">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="article-h3">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="article-ul">
                {block.items.map((item) => (
                  <li key={item}>{linkify(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="article-ol">
                {block.items.map((item) => (
                  <li key={item}>{linkify(item)}</li>
                ))}
              </ol>
            );
          case "pull":
            return (
              <blockquote key={i} className="article-pull">
                <p>{block.text}</p>
              </blockquote>
            );
          case "callout":
            return (
              <aside key={i} className="article-callout">
                {block.title ? <p className="article-callout-title">{block.title}</p> : null}
                <p>{linkify(block.text)}</p>
              </aside>
            );
          case "cta":
            return (
              <div key={i} className="article-inline-cta">
                {block.body ? <p className="text-sm text-text-muted">{block.body}</p> : null}
                <Link href={block.href} className="btn btn-secondary mt-3 !px-4 !py-2.5 text-xs">
                  {block.label} →
                </Link>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/** Lightweight internal link enrichment for known tool phrases */
function linkify(text: string): ReactNode {
  const rules: { phrase: string; href: string }[] = [
    { phrase: "Cost Studio", href: "/cost-to-build-a-house-nj" },
    { phrase: "Basement Builder", href: "/finished-basement-cost-nj" },
    { phrase: "Garage Studio", href: "/accessory-building-cost-nj" },
    { phrase: "Design & Discovery", href: "/custom-homes/process" },
    { phrase: "land evaluation", href: "/land/evaluation" },
    { phrase: "Land Evaluation", href: "/land/evaluation" },
    { phrase: "Pre-Purchase Lot Audit", href: "/land/evaluation#lot-audit" },
  ];

  // Find first match only per string to keep simple
  for (const rule of rules) {
    const idx = text.indexOf(rule.phrase);
    if (idx === -1) continue;
    const before = text.slice(0, idx);
    const after = text.slice(idx + rule.phrase.length);
    return (
      <>
        {before}
        <Link href={rule.href} className="article-inline-link">
          {rule.phrase}
        </Link>
        {after.includes(rule.phrase) ? linkify(after) : after}
      </>
    );
  }
  return text;
}
