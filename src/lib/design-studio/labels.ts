import { plans } from "@/lib/plans";
import {
  exteriorPalettes,
  finishLevels,
  lifestyleOptions,
  lotOptions,
  priorityOptions,
  roofOptions,
  sizeOptions,
  styleOptions,
  timelineOptions,
} from "./options";
import type { DesignSelections } from "./types";

function findLabel<T extends { id: string; label: string }>(
  list: T[],
  id: string | null | undefined,
) {
  if (!id) return null;
  return list.find((item) => item.id === id)?.label ?? id;
}

export function summarizeSelections(selections: DesignSelections) {
  const plan = selections.planSlug
    ? plans.find((p) => p.slug === selections.planSlug)
    : null;

  return {
    lotStatus: findLabel(lotOptions, selections.lotStatus),
    timeline: findLabel(timelineOptions, selections.timeline),
    sizeBand: findLabel(sizeOptions, selections.sizeBand),
    plan: plan?.name ?? null,
    style: findLabel(styleOptions, selections.style),
    roof: findLabel(roofOptions, selections.roof),
    exteriorPalette: findLabel(exteriorPalettes, selections.exteriorPalette),
    finishLevel: findLabel(finishLevels, selections.finishLevel),
    priorities: selections.priorities.map(
      (id) => priorityOptions.find((p) => p.id === id)?.label ?? id,
    ),
    lifestyle: selections.lifestyle.map(
      (id) => lifestyleOptions.find((p) => p.id === id)?.label ?? id,
    ),
    lifestyleOther: selections.lifestyleOther || null,
  };
}
