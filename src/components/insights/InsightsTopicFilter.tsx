"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { trackEvent } from "@/lib/analytics";
import {
  getBrowseArticles,
  insightArticles,
  insightTopics,
  type InsightTopic,
} from "@/lib/insights/content";

export function InsightsTopicFilter() {
  const [topic, setTopic] = useState<InsightTopic>("all");

  const articles = useMemo(() => {
    const base = getBrowseArticles();
    if (topic === "all") return base;
    return base.filter((a) => a.topic === topic);
  }, [topic]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter insights by topic"
      >
        {insightTopics.map((t) => {
          const active = topic === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setTopic(t.id);
                trackEvent("insights_topic_filter", {
                  event_category: "insights",
                  topic: t.id,
                });
              }}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide transition ${
                active
                  ? "border-navy bg-navy text-on-navy"
                  : "border-border bg-surface text-text-muted hover:border-navy/30 hover:text-navy"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <article
            key={a.id}
            className="card card-hover group flex flex-col overflow-hidden p-0"
          >
            <Link
              href={a.href}
              className="relative block aspect-[16/10] overflow-hidden"
              onClick={() =>
                trackEvent("insights_article_click", {
                  event_category: "insights",
                  article_id: a.id,
                  placement: "browse",
                })
              }
            >
              <SmartImage
                src={a.image}
                alt={a.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              {a.includesTool ? (
                <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-black/50 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-gold-bright backdrop-blur-sm">
                  {a.toolLabel ?? "Includes tool"}
                </span>
              ) : null}
            </Link>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-text-dim">
                <span className="text-gold-deep">{a.topicLabel}</span>
                <span aria-hidden>·</span>
                <span>{a.readTime}</span>
              </div>
              <h3 className="mt-2 font-display text-xl text-ivory sm:text-2xl">
                <Link href={a.href} className="transition hover:text-navy-soft">
                  {a.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm text-text-muted">{a.excerpt}</p>
              <Link
                href={a.href}
                className="mt-4 text-sm font-semibold text-gold-deep underline-offset-2 hover:underline"
              >
                Read →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {articles.length === 0 ? (
        <p className="mt-8 text-center text-sm text-text-muted">
          No articles in this topic yet.{" "}
          <button
            type="button"
            className="font-semibold text-gold-deep underline-offset-2 hover:underline"
            onClick={() => setTopic("all")}
          >
            View all
          </button>
        </p>
      ) : null}

      <p className="mt-6 text-center text-xs text-text-dim">
        {insightArticles.length} resources · filters refine the browse grid only
      </p>
    </div>
  );
}
