import {
  getBacksplash,
  getCabinetTone,
  getCounter,
  getHardware,
  getIsland,
} from "./options";
import { getStyle } from "./styles";
import type { KitchenEstimate, KitchenSelections } from "./types";

/** North Jersey luxury kitchen remodel planning base (refresh → full remodel mid). */
const BASE_LOW = 95000;
const BASE_MID = 165000;
const BASE_HIGH = 245000;

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

export function calculateKitchenEstimate(sel: KitchenSelections): KitchenEstimate {
  const style = getStyle(sel.styleId);
  const counter = getCounter(sel.counter);
  const splash = getBacksplash(sel.backsplash);
  const island = getIsland(sel.island);
  const hardware = getHardware(sel.hardware);
  const cabinet = getCabinetTone(sel.cabinetTone);

  const add =
    style.baseBias +
    counter.cost +
    splash.cost +
    island.cost +
    hardware.cost +
    cabinet.cost;

  const mid = Math.max(75000, BASE_MID + add);
  const low = Math.max(60000, Math.round(BASE_LOW + add * 0.85));
  const high = Math.round(BASE_HIGH + add * 1.15);

  const breakdown = [
    { label: "Cabinetry & layout (planning)", amount: Math.round(mid * 0.42) },
    { label: counter.label, amount: Math.round(12000 + counter.cost) },
    { label: `Backsplash · ${splash.label}`, amount: Math.round(4500 + splash.cost) },
    {
      label: island.id === "none" ? "No island credit" : `Island · ${island.label}`,
      amount: Math.round(island.id === "none" ? -8000 : 14000 + island.cost),
    },
    { label: "Appliances & electrical (allowance)", amount: 28000 },
    { label: "Labor, plumbing, finishing", amount: Math.round(mid * 0.22) },
  ];

  // Illustrative ~6.5% APR-ish monthly for discussion only
  const monthly = Math.round((mid * 0.0065) / (1 - Math.pow(1 + 0.0065, -180)));

  return { low, mid, high, monthly, breakdown };
}
