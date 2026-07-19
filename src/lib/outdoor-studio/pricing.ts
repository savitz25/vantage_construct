import {
  getAmenity,
  getAppliances,
  getCounter,
  getCover,
  getFinish,
  getFire,
  getFlooring,
  getKitchen,
  getLighting,
  getStyle,
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
  const kitchen = getKitchen(sel.kitchen);
  const appliances = getAppliances(sel.appliances);
  const counter = getCounter(sel.counter);
  const cover = getCover(sel.cover);
  const fire = getFire(sel.fire);
  const style = getStyle(sel.style);
  const flooring = getFlooring(sel.flooring);
  const light = getLighting(sel.lighting);
  const finish = getFinish(sel.finish);

  const amenityAdd = sel.amenities.reduce((s, id) => s + (getAmenity(id)?.cost ?? 0), 0);

  // Kitchen appliance cost only applies if kitchen exists
  const kitchenAdd =
    kitchen.id === "none"
      ? 0
      : kitchen.cost + appliances.cost + counter.cost;

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

  const breakdown = [
    { label: "Hardscape, drainage & base", amount: Math.round(mid * 0.22) },
    {
      label: kitchen.id === "none" ? "No outdoor kitchen" : `Kitchen · ${kitchen.label}`,
      amount: Math.max(0, kitchen.id === "none" ? 0 : kitchen.cost + counter.cost),
    },
    {
      label: kitchen.id === "none" ? "—" : `Appliances · ${appliances.label}`,
      amount: kitchen.id === "none" ? 0 : Math.max(0, appliances.cost),
    },
    { label: `Cover · ${cover.label}`, amount: Math.max(0, cover.cost) },
    {
      label: fire.id === "none" ? "No fire feature" : `Fire · ${fire.label}`,
      amount: Math.max(0, fire.cost),
    },
    { label: `Lighting · ${light.label}`, amount: Math.max(1500, light.cost || 2500) },
    {
      label: `Amenities (${sel.amenities.length})`,
      amount: Math.max(0, amenityAdd),
    },
  ].filter((b) => b.label !== "—");

  const monthly = Math.round((mid * 0.0065) / (1 - Math.pow(1 + 0.0065, -180)));
  return { low, mid, high, monthly, breakdown };
}
