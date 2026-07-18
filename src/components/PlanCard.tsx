import Link from "next/link";
import type { HomePlan } from "@/lib/plans";
import { formatPrice } from "@/lib/plans";

export function PlanCard({ plan }: { plan: HomePlan }) {
  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#2a241c] via-[#1a1714] to-[#0f0e0c]">
        <div className="absolute inset-0 flex items-end p-5">
          <div>
            <span className="badge">{plan.style}</span>
            <p className="mt-3 font-display text-3xl text-ivory">
              {plan.sqft.toLocaleString()}{" "}
              <span className="text-base tracking-wide text-text-dim">sq ft</span>
            </p>
          </div>
        </div>
        <div className="absolute right-4 top-4 rounded-full border border-border bg-black/30 px-3 py-1 text-xs text-gold backdrop-blur">
          From {formatPrice(plan.priceFrom)}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-ivory">
          <Link href={`/available-homes/${plan.slug}`} className="hover:text-gold-bright">
            {plan.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-text-muted line-clamp-3">{plan.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-dim">
          <span className="rounded-full border border-border px-2.5 py-1">
            {plan.beds} bed{plan.beds === 1 ? "" : "s"}
          </span>
          <span className="rounded-full border border-border px-2.5 py-1">
            {plan.baths} bath{plan.baths === 1 ? "" : "s"}
          </span>
          {plan.aduCandidate ? (
            <span className="rounded-full border border-border px-2.5 py-1 text-gold">
              ADU potential
            </span>
          ) : null}
        </div>
        <div className="mt-auto pt-6">
          <Link href={`/available-homes/${plan.slug}`} className="btn btn-secondary w-full">
            View plan details
          </Link>
        </div>
      </div>
    </article>
  );
}
