import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import type { HomePlan } from "@/lib/plans";
import { formatPrice } from "@/lib/plans";
import { getPlanMedia, planImageAlt } from "@/lib/plan-media";

export function PlanCard({ plan }: { plan: HomePlan }) {
  const media = getPlanMedia(plan.slug);
  const hero = media?.hero;

  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] bg-bg-elevated">
        <SmartImage
          src={hero}
          alt={planImageAlt(plan.name, plan.sqft, plan.style, "Front elevation")}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 pt-16">
          <span className="badge !border-white/30 !bg-white/15 !text-white">{plan.style}</span>
          <p className="mt-2 font-display text-3xl text-white">
            {plan.sqft.toLocaleString()}{" "}
            <span className="text-base tracking-wide text-white/80">sq ft</span>
          </p>
        </div>
        <div className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-semibold text-gold-deep backdrop-blur">
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
          {media?.floorPlan ? (
            <span className="rounded-full border border-border px-2.5 py-1">Floor plan</span>
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
