import {
  getBath,
  getCeiling,
  getDormer,
  getFinish,
  getSkylight,
  getStorage,
} from "./options";
import { getVision } from "./visions";
import type { AtticEstimate, AtticSelections } from "./types";

/** North Jersey attic conversion planning base (finished loft mid). */
const BASE_LOW = 55000;
const BASE_MID = 95000;
const BASE_HIGH = 145000;

export function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatRange(low: number, high: number) {
  return `${formatUsd(low)} – ${formatUsd(high)}`;
}

export function calculateAtticEstimate(sel: AtticSelections): AtticEstimate {
  const vision = getVision(sel.visionId);
  const dormer = getDormer(sel.dormer);
  const bath = getBath(sel.bath);
  const storage = getStorage(sel.storage);
  const skylight = getSkylight(sel.skylights);
  const ceiling = getCeiling(sel.ceiling);
  const finish = getFinish(sel.finish);

  const featureAdd =
    vision.baseBias +
    dormer.cost +
    bath.cost +
    storage.cost +
    skylight.cost +
    ceiling.cost;

  const midRaw = (BASE_MID + featureAdd) * finish.mult;
  const mid = Math.max(45000, Math.round(midRaw));
  const low = Math.max(35000, Math.round((BASE_LOW + featureAdd * 0.85) * finish.mult));
  const high = Math.round((BASE_HIGH + featureAdd * 1.2) * finish.mult);

  const breakdown = [
    { label: "Structure, insulation & envelope", amount: Math.round(mid * 0.28) },
    { label: "Access / stairs allowance", amount: Math.round(mid * 0.12) },
    {
      label: dormer.id === "none" ? "Roof volume as-is" : `Dormers · ${dormer.label}`,
      amount: Math.max(0, dormer.cost),
    },
    {
      label: bath.id === "none" ? "No wet rooms" : `Bath · ${bath.label}`,
      amount: Math.max(0, bath.cost),
    },
    { label: `Storage · ${storage.label}`, amount: Math.max(2000, storage.cost || 3500) },
    { label: "Electrical, HVAC & finishes", amount: Math.round(mid * 0.22) },
  ];

  const monthly = Math.round((mid * 0.0065) / (1 - Math.pow(1 + 0.0065, -180)));

  return { low, mid, high, monthly, breakdown };
}
