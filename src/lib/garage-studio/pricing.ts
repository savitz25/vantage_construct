import {
  getAmenity,
  getBay,
  getBath,
  getDoor,
  getExterior,
  getFinish,
  getLiving,
} from "./options";
import { getPurpose } from "./purposes";
import type { GarageEstimate, GarageSelections } from "./types";

const BASE_LOW = 85000;
const BASE_MID = 145000;
const BASE_HIGH = 220000;

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

export function calculateGarageEstimate(sel: GarageSelections): GarageEstimate {
  const purpose = getPurpose(sel.purposeId);
  const bay = getBay(sel.bays);
  const door = getDoor(sel.door);
  const exterior = getExterior(sel.exterior);
  const living = getLiving(sel.livingAbove);
  const bath = getBath(sel.bath);
  const finish = getFinish(sel.finish);

  const amenityAdd = sel.amenities.reduce((sum, id) => sum + (getAmenity(id)?.cost ?? 0), 0);

  const add =
    purpose.baseBias +
    bay.cost +
    door.cost +
    exterior.cost +
    living.cost +
    bath.cost +
    amenityAdd;

  const mid = Math.max(65000, Math.round((BASE_MID + add) * finish.mult));
  const low = Math.max(50000, Math.round((BASE_LOW + add * 0.85) * finish.mult));
  const high = Math.round((BASE_HIGH + add * 1.2) * finish.mult);

  const amenityLabels =
    sel.amenities.length > 0
      ? sel.amenities.map((id) => getAmenity(id).label).join(", ")
      : "None selected";

  const breakdown = [
    { label: "Foundation, structure & shell", amount: Math.round(mid * 0.3) },
    { label: `Size · ${bay.label}`, amount: Math.max(8000, bay.cost || 12000) },
    { label: `Doors · ${door.label}`, amount: Math.max(6000, door.cost) },
    {
      label: living.id === "none" ? "Single-story program" : `Living · ${living.label}`,
      amount: Math.max(0, living.cost),
    },
    {
      label: bath.id === "none" ? "No wet rooms" : `Bath · ${bath.label}`,
      amount: Math.max(0, bath.cost),
    },
    {
      label: `Exterior · ${exterior.label}`,
      amount: Math.max(2000, exterior.cost || 4000),
    },
    {
      label: `Amenities · ${amenityLabels}`,
      amount: Math.max(0, amenityAdd),
    },
  ];

  const monthly = Math.round((mid * 0.0065) / (1 - Math.pow(1 + 0.0065, -180)));
  return { low, mid, high, monthly, breakdown };
}
