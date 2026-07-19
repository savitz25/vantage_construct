import {
  getAmenity,
  getCounter,
  getCover,
  getFinish,
  getFire,
  getFlooring,
  getGrillType,
  getKitchenLevel,
  getKitchenUpgrade,
  getLighting,
  getStyle,
  packageImpliedUpgrades,
} from "./options";
import { getVision } from "./visions";
import type { OutdoorEstimate, OutdoorSelections } from "./types";

const BASE_LOW = 45000;
const BASE_MID = 95000;
const BASE_HIGH = 160000;

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

export function calculateOutdoorEstimate(sel: OutdoorSelections): OutdoorEstimate {
  const vision = getVision(sel.visionId);
  const level = getKitchenLevel(sel.kitchenLevel);
  const grill = getGrillType(sel.grillType);
  const counter = getCounter(sel.counter);
  const cover = getCover(sel.cover);
  const fire = getFire(sel.fire);
  const style = getStyle(sel.style);
  const flooring = getFlooring(sel.flooring);
  const light = getLighting(sel.lighting);
  const finish = getFinish(sel.finish);

  const amenityAdd = sel.amenities.reduce((s, id) => s + (getAmenity(id)?.cost ?? 0), 0);

  const hasKitchen = level.id !== "none";
  const implied = new Set(packageImpliedUpgrades[level.id] ?? []);

  // Only charge upgrades not already implied by package
  const upgradeAdd = hasKitchen
    ? sel.kitchenUpgrades.reduce((sum, id) => {
        if (implied.has(id)) return sum;
        return sum + (getKitchenUpgrade(id)?.cost ?? 0);
      }, 0)
    : 0;

  const kitchenAdd = hasKitchen
    ? level.cost + grill.cost + counter.cost + upgradeAdd
    : 0;

  const add =
    vision.baseBias +
    kitchenAdd +
    cover.cost +
    fire.cost +
    style.cost +
    flooring.cost +
    light.cost +
    amenityAdd;

  const mid = Math.max(35000, Math.round((BASE_MID + add) * finish.mult));
  const low = Math.max(25000, Math.round((BASE_LOW + add * 0.85) * finish.mult));
  const high = Math.round((BASE_HIGH + add * 1.25) * finish.mult);

  const upgradeLabels =
    hasKitchen && sel.kitchenUpgrades.length
      ? sel.kitchenUpgrades
          .filter((id) => !implied.has(id))
          .map((id) => getKitchenUpgrade(id).label)
          .join(", ") || "Package includes"
      : "—";

  const breakdown = [
    { label: "Hardscape, drainage & base", amount: Math.round(mid * 0.2) },
    {
      label: hasKitchen ? `Kitchen · ${level.label}` : "No outdoor kitchen",
      amount: hasKitchen ? Math.max(0, level.cost) : 0,
    },
    {
      label: hasKitchen ? `Grill · ${grill.label}` : "—",
      amount: hasKitchen ? Math.max(0, grill.cost) : 0,
    },
    {
      label: hasKitchen ? `Counters · ${counter.label}` : "—",
      amount: hasKitchen ? Math.max(0, counter.cost || 2000) : 0,
    },
    {
      label: hasKitchen ? `Upgrades · ${upgradeLabels}` : "—",
      amount: hasKitchen ? Math.max(0, upgradeAdd) : 0,
    },
    { label: `Cover · ${cover.label}`, amount: Math.max(0, cover.cost) },
    {
      label: fire.id === "none" ? "No fire feature" : `Fire · ${fire.label}`,
      amount: Math.max(0, fire.cost),
    },
    { label: `Lighting · ${light.label}`, amount: Math.max(1500, light.cost || 2500) },
    {
      label: `Living amenities (${sel.amenities.length})`,
      amount: Math.max(0, amenityAdd),
    },
  ].filter((b) => b.label !== "—");

  const monthly = Math.round((mid * 0.0065) / (1 - Math.pow(1 + 0.0065, -180)));
  return { low, mid, high, monthly, breakdown };
}
