"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  faqCategories,
  faqItems,
  getMostAsked,
  type FaqCategoryId,
  type FaqItem,
} from "@/lib/insights/faq-content";

export function FaqHub() {
  const [category, setCategory] = useState<FaqCategoryId>("all");
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState<Record<string, "yes" | "no">>({});

  const mostAsked = useMemo(() => getMostAsked(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqItems.filter((item) => {
      const catOk = category === "all" || item.categories.includes(category);
      if (!catOk) return false;
      if (!q) return true;
      return (
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q) ||
        item.categories.some((c) => c.includes(q))
      );
    });
  }, [category, query]);

  // Group filtered by primary category label for sectioned list.
  // When browsing "all" with no search, omit most-asked items (shown above) so sections aren't empty shells.
  const grouped = useMemo(() => {
    const hideMostAsked = category === "all" && !query.trim();
    const items = hideMostAsked
      ? filtered.filter((item) => !item.mostAsked)
      : filtered;

    if (category !== "all" || query.trim()) {
      return [{ id: category, label: labelFor(category), items }];
    }

    const map = new Map<string, FaqItem[]>();
    for (const item of items) {
      const primary = item.categories[0] || "process";
      const label = labelFor(primary);
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(item);
    }
    return Array.from(map.entries())
      .filter(([, groupItems]) => groupItems.length > 0)
      .map(([label, groupItems]) => ({
        id: label,
        label,
        items: groupItems,
      }));
  }, [filtered, category, query]);

  function onFeedback(id: string, value: "yes" | "no") {
    setFeedback((f) => ({ ...f, [id]: value }));
    trackEvent("faq_feedback", {
      event_category: "faq",
      faq_id: id,
      helpful: value,
    });
  }

  return (
    <div className="space-y-12 lg:space-y-14">
      {/* Search */}
      <div className="mx-auto max-w-2xl">
        <label htmlFor="faq-search" className="label text-center sm:text-left">
          Search answers
        </label>
        <div className="relative">
          <input
            id="faq-search"
            type="search"
            className="input !py-3.5 pl-11 text-base"
            placeholder="Type a question or keyword — cost, lot, rebuild, realtor…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.length === 1 || e.target.value.length === 0) {
                trackEvent("faq_search", {
                  event_category: "faq",
                  has_query: e.target.value.length > 0,
                });
              }
            }}
            autoComplete="off"
          />
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-dim"
            aria-hidden
          >
            ⌕
          </span>
        </div>
      </div>

      {/* Category chips */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
          Browse by journey
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="FAQ categories"
        >
          {faqCategories.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setCategory(c.id);
                  trackEvent("faq_category", {
                    event_category: "faq",
                    category: c.id,
                  });
                }}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide transition ${
                  active
                    ? "border-navy bg-navy text-on-navy"
                    : "border-border bg-surface text-text-muted hover:border-navy/30 hover:text-navy"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Most asked — only when browsing all with no search */}
      {category === "all" && !query.trim() ? (
        <section aria-labelledby="most-asked-heading">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Start here</p>
              <h2
                id="most-asked-heading"
                className="mt-2 font-display text-3xl text-ivory sm:text-4xl"
              >
                Most asked questions
              </h2>
            </div>
            <p className="max-w-sm text-sm text-text-dim">
              Highest-value answers for homeowners beginning to plan.
            </p>
          </div>
          <div className="space-y-3">
            {mostAsked.map((item) => (
              <FaqAccordion
                key={item.id}
                item={item}
                feedback={feedback[item.id]}
                onFeedback={onFeedback}
                featured
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* Full / filtered list */}
      <section aria-labelledby="all-answers-heading">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">
              {query.trim() || category !== "all" ? "Results" : "All answers"}
            </p>
            <h2
              id="all-answers-heading"
              className="mt-2 font-display text-3xl text-ivory sm:text-4xl"
            >
              {query.trim()
                ? `${filtered.length} match${filtered.length === 1 ? "" : "es"}`
                : category === "all"
                  ? "Browse by topic"
                  : labelFor(category)}
            </h2>
          </div>
          <p className="text-sm text-text-dim">{filtered.length} questions</p>
        </div>

        {filtered.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="font-display text-2xl text-ivory">No matches</p>
            <p className="mt-2 text-sm text-text-muted">
              Try a different keyword, or{" "}
              <button
                type="button"
                className="font-semibold text-gold-deep underline-offset-2 hover:underline"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                clear filters
              </button>
              .
            </p>
            <Link href="/start" className="btn btn-primary mt-6">
              Ask us directly
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {grouped.map((group) => (
              <div key={group.id}>
                {category === "all" && !query.trim() ? (
                  <h3 className="mb-4 font-display text-2xl text-navy">{group.label}</h3>
                ) : null}
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <FaqAccordion
                      key={item.id}
                      item={item}
                      feedback={feedback[item.id]}
                      onFeedback={onFeedback}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FaqAccordion({
  item,
  feedback,
  onFeedback,
  featured,
}: {
  item: FaqItem;
  feedback?: "yes" | "no";
  onFeedback: (id: string, v: "yes" | "no") => void;
  featured?: boolean;
}) {
  return (
    <details
      className={`card group p-5 sm:p-6 ${featured ? "border-navy/15 ring-1 ring-navy/5" : ""}`}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <h3 className="font-display text-xl text-ivory sm:text-2xl">{item.q}</h3>
        <span className="mt-1 shrink-0 text-gold-deep transition group-open:rotate-45">+</span>
      </summary>
      <div className="mt-4 space-y-4 border-t border-border pt-4">
        <p className="text-text-muted leading-relaxed">{item.a}</p>
        {item.links?.length ? (
          <div className="flex flex-wrap gap-2">
            {item.links.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold/40 hover:text-gold-deep"
                onClick={() =>
                  trackEvent("faq_link_click", {
                    event_category: "faq",
                    faq_id: item.id,
                    href: l.href,
                  })
                }
              >
                {l.badge ? (
                  <span className="text-[0.6rem] uppercase tracking-[0.12em] text-gold-deep">
                    {l.badge}
                  </span>
                ) : null}
                {l.label} →
              </Link>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-text-dim">
          <span>Was this helpful?</span>
          <button
            type="button"
            className={`rounded-full border px-2.5 py-1 transition ${
              feedback === "yes"
                ? "border-navy bg-navy text-on-navy"
                : "border-border hover:border-navy/30"
            }`}
            onClick={() => onFeedback(item.id, "yes")}
            disabled={Boolean(feedback)}
          >
            Yes
          </button>
          <button
            type="button"
            className={`rounded-full border px-2.5 py-1 transition ${
              feedback === "no"
                ? "border-navy bg-navy text-on-navy"
                : "border-border hover:border-navy/30"
            }`}
            onClick={() => onFeedback(item.id, "no")}
            disabled={Boolean(feedback)}
          >
            No
          </button>
          {feedback ? (
            <span className="text-text-muted">Thank you for the feedback.</span>
          ) : null}
        </div>
      </div>
    </details>
  );
}

function labelFor(id: string) {
  return faqCategories.find((c) => c.id === id)?.label ?? id;
}
