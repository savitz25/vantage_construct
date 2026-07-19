import type {
  BacksplashId,
  CabinetToneId,
  CounterId,
  HardwareId,
  IslandId,
  KitchenStyleId,
} from "./types";

export type KitchenStyle = {
  id: KitchenStyleId;
  name: string;
  tagline: string;
  description: string;
  /** Wall color behind cabinets */
  wall: string;
  /** Upper/lower cabinet body */
  cabinet: string;
  /** Cabinet door panel lighter/darker accent */
  cabinetDoor: string;
  /** Floor tone */
  floor: string;
  /** Default feature ids when style is selected */
  defaults: {
    counter: CounterId;
    backsplash: BacksplashId;
    island: IslandId;
    hardware: HardwareId;
    cabinetTone: CabinetToneId;
  };
  /** Soft cost bias for more elaborate traditional / european looks */
  baseBias: number;
  portfolioTags: string[];
};

export const kitchenStyles: KitchenStyle[] = [
  {
    id: "modern-farmhouse",
    name: "Modern Farmhouse",
    tagline: "Warm white, open shelving energy, lived-in elegance",
    description: "Shaker bones, soft whites, and a welcoming island for everyday gathering.",
    wall: "#f4efe6",
    cabinet: "#f7f4ef",
    cabinetDoor: "#ebe4d8",
    floor: "#c4a574",
    defaults: {
      counter: "quartz-calacatta",
      backsplash: "subway",
      island: "oversized-seating",
      hardware: "brass",
      cabinetTone: "style-default",
    },
    baseBias: 0,
    portfolioTags: ["farmhouse", "white", "shaker"],
  },
  {
    id: "warm-organic",
    name: "Warm Organic Modern",
    tagline: "Natural wood, soft curves, quiet luxury",
    description: "White oak warmth, tactile stone, and a calm modern plan.",
    wall: "#ebe4d6",
    cabinet: "#c9a882",
    cabinetDoor: "#b8956c",
    floor: "#a67c52",
    defaults: {
      counter: "quartzite",
      backsplash: "full-slab",
      island: "waterfall",
      hardware: "bronze",
      cabinetTone: "style-default",
    },
    baseBias: 8000,
    portfolioTags: ["organic", "oak", "warm"],
  },
  {
    id: "classic-transitional",
    name: "Classic Transitional",
    tagline: "Timeless balance of traditional and modern",
    description: "Refined moldings, soft neutrals, and hardware that ages gracefully.",
    wall: "#f0ebe3",
    cabinet: "#e8e2d8",
    cabinetDoor: "#ddd5c8",
    floor: "#b8956c",
    defaults: {
      counter: "quartz-calacatta",
      backsplash: "subway",
      island: "standard",
      hardware: "polished-nickel",
      cabinetTone: "style-default",
    },
    baseBias: 5000,
    portfolioTags: ["transitional", "classic"],
  },
  {
    id: "sleek-european",
    name: "Sleek European",
    tagline: "Handleless lines, integrated appliances, quiet drama",
    description: "Minimal massing with panel-ready appliances and stone that does the talking.",
    wall: "#e8e6e3",
    cabinet: "#2c2c2c",
    cabinetDoor: "#1f1f1f",
    floor: "#d4cfc7",
    defaults: {
      counter: "porcelain-slab",
      backsplash: "full-slab",
      island: "waterfall",
      hardware: "matte-black",
      cabinetTone: "style-default",
    },
    baseBias: 18000,
    portfolioTags: ["european", "modern", "minimal"],
  },
  {
    id: "traditional-luxury",
    name: "Traditional Luxury",
    tagline: "Paneled elegance, statement hoods, heirloom detail",
    description: "Furniture-grade cabinetry, layered moldings, and a formal entertaining plan.",
    wall: "#f2ebe0",
    cabinet: "#f5f0e8",
    cabinetDoor: "#e8dfd0",
    floor: "#8b6914",
    defaults: {
      counter: "marble-carrara",
      backsplash: "herringbone",
      island: "oversized-seating",
      hardware: "brass",
      cabinetTone: "style-default",
    },
    baseBias: 25000,
    portfolioTags: ["traditional", "luxury"],
  },
  {
    id: "coastal-hamptons",
    name: "Coastal / Hamptons",
    tagline: "Airy blues, bright light, relaxed polish",
    description: "Crisp whites, soft sea tones, and an island built for long summers.",
    wall: "#e8f0f4",
    cabinet: "#f8fafb",
    cabinetDoor: "#dce8ef",
    floor: "#d4c4a8",
    defaults: {
      counter: "quartz-calacatta",
      backsplash: "subway",
      island: "oversized-seating",
      hardware: "chrome",
      cabinetTone: "style-default",
    },
    baseBias: 6000,
    portfolioTags: ["coastal", "hamptons", "light"],
  },
  {
    id: "forest-moody",
    name: "Forest / Moody Modern",
    tagline: "Deep green cabinetry, rich stone, intimate glow",
    description: "A jewel-box kitchen with dramatic color and soft ambient light.",
    wall: "#e5e0d6",
    cabinet: "#2f4a3a",
    cabinetDoor: "#264032",
    floor: "#6b5344",
    defaults: {
      counter: "soapstone",
      backsplash: "full-slab",
      island: "standard",
      hardware: "brass",
      cabinetTone: "style-default",
    },
    baseBias: 12000,
    portfolioTags: ["green", "moody", "forest"],
  },
  {
    id: "industrial-loft",
    name: "Industrial Loft",
    tagline: "Raw materials, dark metals, urban edge",
    description: "Concrete energy, black metal, and open loft proportions.",
    wall: "#d8d4cf",
    cabinet: "#3a3a3a",
    cabinetDoor: "#2a2a2a",
    floor: "#9a9590",
    defaults: {
      counter: "soapstone",
      backsplash: "painted",
      island: "standard",
      hardware: "matte-black",
      cabinetTone: "style-default",
    },
    baseBias: 4000,
    portfolioTags: ["industrial", "loft"],
  },
  {
    id: "japandi",
    name: "Japandi / Minimal Warm",
    tagline: "Restraint, light wood, meditative calm",
    description: "Scandinavian warmth meets Japanese simplicity — less clutter, more intention.",
    wall: "#f0ebe3",
    cabinet: "#d4c4a8",
    cabinetDoor: "#c9b898",
    floor: "#c4b49a",
    defaults: {
      counter: "porcelain-slab",
      backsplash: "painted",
      island: "standard",
      hardware: "matte-black",
      cabinetTone: "style-default",
    },
    baseBias: 7000,
    portfolioTags: ["japandi", "minimal"],
  },
  {
    id: "white-brass",
    name: "Timeless White & Brass",
    tagline: "Bright, classic, endlessly photographable",
    description: "The North Jersey favorite — luminous cabinets, warm brass, and soft stone.",
    wall: "#f7f4ef",
    cabinet: "#faf8f5",
    cabinetDoor: "#f0ebe4",
    floor: "#c9a882",
    defaults: {
      counter: "marble-carrara",
      backsplash: "full-slab",
      island: "waterfall",
      hardware: "brass",
      cabinetTone: "style-default",
    },
    baseBias: 10000,
    portfolioTags: ["white", "brass", "timeless"],
  },
  {
    id: "dark-dramatic",
    name: "Dark & Dramatic",
    tagline: "Charcoal cabinetry, high-contrast stone, evening energy",
    description: "A nighttime kitchen that entertains as well as it cooks.",
    wall: "#dcd8d2",
    cabinet: "#1a1a1a",
    cabinetDoor: "#121212",
    floor: "#5c5348",
    defaults: {
      counter: "quartzite",
      backsplash: "full-slab",
      island: "waterfall",
      hardware: "matte-black",
      cabinetTone: "style-default",
    },
    baseBias: 15000,
    portfolioTags: ["dark", "dramatic"],
  },
  {
    id: "scandinavian",
    name: "Light Scandinavian Luxury",
    tagline: "Pale wood, air, and effortless function",
    description: "Light oak, clean lines, and a soft northern light aesthetic.",
    wall: "#f5f2eb",
    cabinet: "#e8e0d0",
    cabinetDoor: "#ddd4c2",
    floor: "#d8cbb4",
    defaults: {
      counter: "quartz-calacatta",
      backsplash: "subway",
      island: "standard",
      hardware: "chrome",
      cabinetTone: "style-default",
    },
    baseBias: 3000,
    portfolioTags: ["scandinavian", "light"],
  },
];

export function getStyle(id: KitchenStyleId): KitchenStyle {
  return kitchenStyles.find((s) => s.id === id) ?? kitchenStyles[0];
}
