"""Build src/lib/plan-media.ts from scraped Available Homes assets."""
import re
import urllib.request
from pathlib import Path

url = "https://vantageconstruct.com/available/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=90) as r:
    data = r.read().decode("utf-8", "ignore")

all_imgs = [
    u.replace("\\/", "/")
    for u in sorted(
        set(
            re.findall(
                r"https://vantageconstruct\.com/wp-content/uploads/[^\s,\"'<>]+\.(?:jpg|jpeg|png|webp)",
                data,
                re.I,
            )
        )
    )
]


def prefer_full(u: str) -> str:
    # Prefer mid-size optimized webp when present; strip tiny thumbs later in UI via next/image
    return u


def collect(keys):
    matches = []
    for u in all_imgs:
        low = u.lower()
        if any(k.lower() in low for k in keys):
            matches.append(prefer_full(u))
    return list(dict.fromkeys(matches))


def is_floor(u: str) -> bool:
    n = u.lower()
    return any(
        k in n
        for k in [
            "floor-plan",
            "floor_plan",
            "fp1",
            "fp2",
            "3car-plan",
            "plan-bonus",
            "fp1c",
            "fp2c",
            "bonus-floor-plan",
        ]
    ) or (re.search(r"(^|/)fp\d", n) is not None)


def floor_score(u: str) -> int:
    n = u.lower()
    if "floor-plan" in n or "floor_plan" in n:
        return 0
    if "fp1" in n or "fp1c" in n:
        return 1
    if "bonus-floor" in n or "fp2" in n:
        return 2
    return 5


def exterior_score(u: str) -> int:
    n = u.lower()
    if "front-rendering" in n or "front-elevation" in n or "front-1" in n:
        return 0
    if "front" in n and "cad" not in n:
        return 1
    if "day-render" in n or "day_render" in n:
        return 2
    if "drone" in n or "hires" in n:
        return 3
    if "render" in n:
        return 4
    if "cad" in n:
        return 6
    return 5


def is_exterior(u: str) -> bool:
    n = u.lower()
    if is_floor(n) or any(
        x in n for x in ["logo", "favicon", "vantage_final", "architectural-designers", "basement-stair"]
    ):
        return False
    return any(
        k in n
        for k in [
            "front",
            "rear",
            "elevation",
            "render",
            "day",
            "night",
            "exterior",
            "cad",
            "drone",
            "photo",
            "hires",
            "farmr",
            "side",
            "left",
            "right",
            "thumb",
            "dusk",
            "fall_photo",
        ]
    ) or ("cl-" in n and "interior" not in n)


def is_interior(u: str) -> bool:
    n = u.lower()
    return any(k in n for k in ["kitchen", "living", "great-room", "greatroom", "bedroom", "bath", "dining", "interior"])


# Manual overrides for weak keyword matches
manual = {
    "westbrook-estate": ["cl-003", "6935"],
    "silverleaf-manor": ["cl-20-008", "4641"],
    "millbrook-manor": ["1062236-cl20001", "cl20001", "7867"],
    "highland-manor": ["cl-18-008", "4328"],
    "bridgewater-manor": ["5910"],  # may share willowbrook assets in source HTML
}

plans = {
    "cypress-hollow-farmhouse": {
        "name": "The Cypress Hollow Farmhouse",
        "sqft": 1479,
        "style": "Modern Farmhouse",
        "keys": ["1479-"],
    },
    "cozy-craftsman-cottage": {
        "name": "The Cozy Craftsman Cottage",
        "sqft": 872,
        "style": "Craftsman Cottage",
        "keys": ["hpg-872", "872-"],
    },
    "modern-homestead": {
        "name": "The Modern Homestead",
        "sqft": 1448,
        "style": "Modern Farmhouse",
        "keys": ["1448-"],
    },
    "classic-bungalow-retreat": {
        "name": "The Classic Bungalow Retreat",
        "sqft": 1671,
        "style": "Craftsman",
        "keys": ["9081"],
    },
    "willow-haven": {
        "name": "The Willow Haven",
        "sqft": 1800,
        "style": "Modern Farmhouse",
        "keys": ["18009", "1800-"],
    },
    "ridgeview-haven": {
        "name": "The Ridgeview Haven",
        "sqft": 1849,
        "style": "Modern Farmhouse",
        "keys": ["ridgeview"],
    },
    "whispering-pine": {
        "name": "The Whispering Pine",
        "sqft": 1998,
        "style": "Modern Farmhouse",
        "keys": ["7229", "whispering"],
    },
    "magnolia-retreat": {
        "name": "The Magnolia Retreat",
        "sqft": 2192,
        "style": "Farmhouse",
        "keys": ["2192"],
    },
    "westbrook-estate": {
        "name": "The Westbrook Estate",
        "sqft": 2340,
        "style": "Modern Farmhouse",
        "keys": ["cl-003", "6935", "westbrook"],
    },
    "silverleaf-manor": {
        "name": "The Silverleaf Manor",
        "sqft": 2364,
        "style": "Modern Farmhouse",
        "keys": ["cl-20-008", "4641", "silverleaf"],
    },
    "fairview-ranch": {
        "name": "The Fairview Ranch",
        "sqft": 2407,
        "style": "Modern Farmhouse",
        "keys": ["2407-"],
    },
    "silo-house": {
        "name": "The Silo House",
        "sqft": 2425,
        "style": "Modern Farmhouse",
        "keys": ["2425"],
    },
    "laurelwood": {
        "name": "The Laurelwood",
        "sqft": 2482,
        "style": "Modern Farmhouse",
        "keys": ["2482", "5252"],
    },
    "grand-vista": {
        "name": "The Grand Vista",
        "sqft": 2570,
        "style": "Modern Farmhouse",
        "keys": ["7375", "2570"],
    },
    "alderwood-barndominium": {
        "name": "The Alderwood (Cypress Hollow Barndominium)",
        "sqft": 2577,
        "style": "Barndominium",
        "keys": ["10060", "2577"],
    },
    "meadowbrook-estate": {
        "name": "The Meadowbrook Estate",
        "sqft": 2841,
        "style": "Modern Farmhouse",
        "keys": ["meadowbrook", "1062"],
    },
    "millbrook-manor": {
        "name": "The Millbrook Manor",
        "sqft": 2862,
        "style": "Modern Farmhouse",
        "keys": ["1062236-cl20001", "cl20001", "7867"],
    },
    "emerald-cottage": {
        "name": "The Emerald Cottage",
        "sqft": 2889,
        "style": "Cottage Farmhouse",
        "keys": ["emerald", "cl-20-009", "8812"],
    },
    "lakeside-loft": {
        "name": "The Lakeside Loft",
        "sqft": 2992,
        "style": "Barndominium",
        "keys": ["4387", "lakeside", "front-1-v5", "front-2-v5", "front-left-day", "front-night", "cl-20-012"],
    },
    "willow-ridge-farmhouse": {
        "name": "The Willow Ridge Farmhouse",
        "sqft": 3146,
        "style": "Modern Farmhouse",
        "keys": ["willowbrook", "8815"],
    },
    "highland-manor": {
        "name": "The Highland Manor",
        "sqft": 3262,
        "style": "Modern Farmhouse",
        "keys": ["cl-18-008", "4328"],
    },
    "chateau-royale": {
        "name": "The Chateau Royale",
        "sqft": 3349,
        "style": "Modern Farmhouse",
        "keys": ["3349"],
    },
    "bridgewater-manor": {
        "name": "The Bridgewater Estate",
        "sqft": 3686,
        "style": "Modern Farmhouse",
        "keys": ["5910", "bridgewater"],
    },
    "grand-alpine": {
        "name": "The Grand Alpine",
        "sqft": 4954,
        "style": "Modern Farmhouse",
        "keys": ["wellington", "9699", "4954"],
    },
}

# Global nice fallbacks for style categories when a plan lacks floor plan
style_fallbacks = {
    "Modern Farmhouse": collect(["ridgeview-hires2", "1479-front-rendering"]),
    "Craftsman": collect(["9081-thumb", "hpg-872-frontv2"]),
    "Barndominium": collect(["10060", "4387"]),
}

lines = []
lines.append("/** Auto-assisted media map from vantageconstruct.com Available Homes assets. */")
lines.append("export type PlanMedia = {")
lines.append("  hero: string;")
lines.append("  hover?: string;")
lines.append("  floorPlan?: string;")
lines.append("  gallery: string[];")
lines.append("  representative?: boolean;")
lines.append("};")
lines.append("")
lines.append("export const planMedia: Record<string, PlanMedia> = {")

for slug, meta in plans.items():
    matches = collect(meta["keys"])
    exteriors = [u for u in matches if is_exterior(u)]
    floors = [u for u in matches if is_floor(u)]
    interiors = [u for u in matches if is_interior(u)]
    other = [u for u in matches if u not in exteriors + floors + interiors]

    # Prefer full-size when available (drop -768x variants if full exists)
    def rank(u: str) -> str:
        return re.sub(r"-\d+x\d+(?=\.)", "", u)

    def unique_prefer(lst):
        seen = set()
        out = []
        for u in lst:
            base = rank(u)
            # keep highest res version of same base if possible
            if base in seen:
                continue
            # prefer un-resized if present in matches
            full = None
            for m in matches:
                if rank(m) == base and not re.search(r"-\d+x\d+\.", m):
                    full = m
                    break
            pick = full or u
            seen.add(base)
            out.append(pick)
        return out

    exteriors = unique_prefer(sorted(exteriors or other, key=exterior_score))
    floors = unique_prefer(sorted(floors, key=floor_score))
    interiors = unique_prefer(interiors)

    hero = exteriors[0] if exteriors else (matches[0] if matches else None)
    hover = exteriors[1] if len(exteriors) > 1 else (interiors[0] if interiors else None)
    floor = floors[0] if floors else None
    gallery = unique_prefer(exteriors[:5] + floors[:2] + interiors[:3])
    representative = False

    if not hero:
        # style-based fallback
        fb = style_fallbacks.get(meta["style"]) or collect(["1479-front-rendering", "ridgeview-hires2"])
        hero = fb[0] if fb else "https://vantageconstruct.com/wp-content/uploads/2024/04/mh-mulberry.webp"
        gallery = [hero]
        representative = True

    if not gallery:
        gallery = [hero]

    def q(s: str) -> str:
        return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'

    lines.append(f"  {q(slug)}: {{")
    lines.append(f"    hero: {q(hero)},")
    if hover:
        lines.append(f"    hover: {q(hover)},")
    if floor:
        lines.append(f"    floorPlan: {q(floor)},")
    if representative:
        lines.append("    representative: true,")
    lines.append("    gallery: [")
    for g in gallery[:8]:
        lines.append(f"      {q(g)},")
    lines.append("    ],")
    lines.append("  },")
    print(f"{slug}: hero={'Y' if hero else 'N'} floor={'Y' if floor else 'N'} gallery={len(gallery)} rep={representative}")

lines.append("};")
lines.append("")
lines.append("export function getPlanMedia(slug: string): PlanMedia | undefined {")
lines.append("  return planMedia[slug];")
lines.append("}")
lines.append("")
lines.append("export function planImageAlt(planName: string, sqft: number, style: string, kind: string) {")
lines.append(
    "  return `${kind} of ${planName}, a ${sqft.toLocaleString()} sq ft ${style} custom home design available through Vantage Construction`;"
)
lines.append("}")
lines.append("")

# Style / roof / lifestyle media for other steps
lines.append("export const styleMedia: Record<string, { image: string; alt: string }> = {")
style_map = {
    "modern-farmhouse": ("https://vantageconstruct.com/wp-content/uploads/2024/11/1479-front-rendering.webp", "Modern Farmhouse exterior elevation"),
    "craftsman": ("https://vantageconstruct.com/wp-content/uploads/2024/11/9081-thumb.webp", "Craftsman style home exterior"),
    "contemporary": ("https://vantageconstruct.com/wp-content/uploads/2024/11/1448-day-render.webp", "Contemporary modern homestead exterior"),
    "traditional": ("https://vantageconstruct.com/wp-content/uploads/2024/11/2192r1.webp", "Traditional farmhouse style exterior"),
    "barndominium": ("https://vantageconstruct.com/wp-content/uploads/2024/11/front-1-v5-1.webp", "Barndominium-inspired custom home exterior"),
}
for k, (img, alt) in style_map.items():
    # fix to actual existing if needed
    matches = [u for u in all_imgs if Path(img).name.split(".")[0] in u]
    use = matches[0] if matches else img
    lines.append(f'  "{k}": {{ image: "{use}", alt: "{alt}" }},')
lines.append("};")
lines.append("")

# Size band representative images
lines.append("export const sizeBandMedia: Record<string, string> = {")
lines.append('  "under-2000": "https://vantageconstruct.com/wp-content/uploads/2024/11/1479-front-rendering.webp",')
lines.append('  "2000-3000": "https://vantageconstruct.com/wp-content/uploads/2024/11/cl-20-009-front-1-small.webp",')
lines.append('  "over-3000": "https://vantageconstruct.com/wp-content/uploads/2025/01/wellington-exterior-01.webp",')
lines.append("};")
lines.append("")

out = Path("src/lib/plan-media.ts")
out.write_text("\n".join(lines) + "\n", encoding="utf-8")
print("wrote", out)
