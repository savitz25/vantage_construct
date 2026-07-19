import type {
  AtticVisionId,
  BathOption,
  CeilingOption,
  DormerOption,
  FinishTier,
  SkylightOption,
  StorageOption,
} from "./types";

export type AtticVision = {
  id: AtticVisionId;
  name: string;
  lifestyleName: string;
  tagline: string;
  description: string;
  heroImage: string;
  /** Scene palette */
  wall: string;
  floor: string;
  accent: string;
  baseBias: number;
  defaults: {
    dormer: DormerOption;
    bath: BathOption;
    storage: StorageOption;
    skylights: SkylightOption;
    ceiling: CeilingOption;
    finish: FinishTier;
  };
};

export const atticVisions: AtticVision[] = [
  {
    id: "primary-suite",
    name: "Primary Suite",
    lifestyleName: "Sky-Level Primary Retreat",
    tagline: "A private sanctuary under the rafters",
    description:
      "Bedroom, spa bath, and quiet separation from the main floor — designed with egress, light, and comfort first.",
    heroImage: "/media/attics/primary-suite.jpg",
    wall: "#f0ebe3",
    floor: "#b8956c",
    accent: "#8f6a28",
    baseBias: 18000,
    defaults: {
      dormer: "paired",
      bath: "full",
      storage: "window-seats",
      skylights: "single",
      ceiling: "tray",
      finish: "luxury",
    },
  },
  {
    id: "guest-suite",
    name: "Guest Suite",
    lifestyleName: "Upper-Level Guest Quarters",
    tagline: "Hospitality with privacy and dignity",
    description:
      "A welcoming suite for visiting family — full bath optional, soft finishes, and code-smart sleeping space.",
    heroImage: "/media/attics/guest-suite.jpg",
    wall: "#f4f0e8",
    floor: "#c4a574",
    accent: "#6b8f9a",
    baseBias: 12000,
    defaults: {
      dormer: "single",
      bath: "full",
      storage: "kneewall",
      skylights: "none",
      ceiling: "finished-drywall",
      finish: "premium",
    },
  },
  {
    id: "home-office",
    name: "Home Office / Studio",
    lifestyleName: "Creative Upper Level",
    tagline: "Focus, daylight, and a real door between work and life",
    description:
      "Acoustic separation, desk zones, and light planned for video calls and deep work — or a true creative studio.",
    heroImage: "/media/attics/home-office.jpg",
    wall: "#ebe6dc",
    floor: "#a67c52",
    accent: "#5c6b8a",
    baseBias: 0,
    defaults: {
      dormer: "single",
      bath: "none",
      storage: "full-built-ins",
      skylights: "paired",
      ceiling: "exposed-beams",
      finish: "premium",
    },
  },
  {
    id: "teen-retreat",
    name: "Teen Retreat",
    lifestyleName: "Independent Upper Hangout",
    tagline: "Space to grow without leaving home",
    description:
      "Lounge energy, sleep zone, and storage that respects privacy while staying code-compliant.",
    heroImage: "/media/attics/teen-retreat.jpg",
    wall: "#e8e4dc",
    floor: "#8b6914",
    accent: "#6b4c9a",
    baseBias: 6000,
    defaults: {
      dormer: "paired",
      bath: "half",
      storage: "kneewall",
      skylights: "single",
      ceiling: "finished-drywall",
      finish: "premium",
    },
  },
  {
    id: "playroom-flex",
    name: "Playroom / Flex Space",
    lifestyleName: "Bonus Level Living",
    tagline: "Durable, bright, ready for whatever comes next",
    description:
      "Hardworking finishes and smart storage that grow with kids — then flex into media or guest space later.",
    heroImage: "/media/attics/playroom-flex.jpg",
    wall: "#f2ede4",
    floor: "#c9a882",
    accent: "#3d7a5a",
    baseBias: -4000,
    defaults: {
      dormer: "none",
      bath: "none",
      storage: "kneewall",
      skylights: "paired",
      ceiling: "finished-drywall",
      finish: "premium",
    },
  },
  {
    id: "reading-loft",
    name: "Reading Loft / Bonus",
    lifestyleName: "Quiet Loft Sanctuary",
    tagline: "Soft light, built-ins, nowhere else you’d rather be",
    description:
      "A contemplative upper room — window seats, bookshelves, and a ceiling that feels intentional.",
    heroImage: "/media/attics/reading-loft.jpg",
    wall: "#f5f0e8",
    floor: "#d4c4a8",
    accent: "#b8893d",
    baseBias: -2000,
    defaults: {
      dormer: "single",
      bath: "none",
      storage: "window-seats",
      skylights: "single",
      ceiling: "tray",
      finish: "luxury",
    },
  },
];

export function getVision(id: AtticVisionId): AtticVision {
  return atticVisions.find((v) => v.id === id) ?? atticVisions[0];
}
