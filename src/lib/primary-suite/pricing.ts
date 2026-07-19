import {
  getAmenity,
  getBathLayout,
  getBathSurface,
  getBedWall,
  getCeiling,
  getCloset,
  getClosetIsland,
  getClosetMillwork,
  getFinish,
  getOutdoor,
  getShower,
  getSitting,
  getTub,
  getVanity,
} from "./options";
import { getVision } from "./visions";
import type { SuiteEstimate, SuiteSelections } from "./types";

/** North Jersey luxury primary suite remodel / addition planning base */
const BASE_LOW = 85000;
const BASE_MID = 165000;
const BASE_HIGH = 280000;

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

export function calculateSuiteEstimate(sel: SuiteSelections): SuiteEstimate {
  const vision = getVision(sel.visionId);
  const finish = getFinish(sel.finish);

  const bedroomAdd =
    getBedWall(sel.bedWall).cost +
    getSitting(sel.sitting).cost +
    getCeiling(sel.ceiling).cost +
    getOutdoor(sel.outdoorAccess).cost;

  const bathAdd =
    getBathLayout(sel.bathLayout).cost +
    getTub(sel.tub).cost +
    getShower(sel.shower).cost +
    getVanity(sel.vanity).cost +
    getBathSurface(sel.bathSurface).cost;

  const closetAdd =
    getCloset(sel.closet).cost +
    getClosetIsland(sel.closetIsland).cost +
    getClosetMillwork(sel.closetMillwork).cost;

  const amenityAdd = sel.amenities.reduce((s, id) => s + (getAmenity(id)?.cost ?? 0), 0);

  const add = vision.baseBias + bedroomAdd + bathAdd + closetAdd + amenityAdd;

  const mid = Math.max(70000, Math.round((BASE_MID + add) * finish.mult));
  const low = Math.max(55000, Math.round((BASE_LOW + add * 0.85) * finish.mult));
  const high = Math.round((BASE_HIGH + add * 1.2) * finish.mult);

  const breakdown = [
    { label: "Structure, MEP & base finishes", amount: Math.round(mid * 0.28) },
    {
      label: `Bedroom · ${getBedWall(sel.bedWall).label}`,
      amount: Math.max(8000, bedroomAdd || 12000),
    },
    {
      label: `Bath · ${getBathLayout(sel.bathLayout).label}`,
      amount: Math.max(25000, bathAdd || 35000),
    },
    {
      label: `Closet · ${getCloset(sel.closet).label}`,
      amount: Math.max(8000, closetAdd || 12000),
    },
    {
      label:
        sel.outdoorAccess === "none"
          ? "No private outdoor"
          : `Outdoor · ${getOutdoor(sel.outdoorAccess).label}`,
      amount: Math.max(0, getOutdoor(sel.outdoorAccess).cost),
    },
    {
      label: `Amenities (${sel.amenities.length})`,
      amount: Math.max(0, amenityAdd),
    },
  ];

  const monthly = Math.round((mid * 0.0065) / (1 - Math.pow(1 + 0.0065, -180)));
  return { low, mid, high, monthly, breakdown };
}
