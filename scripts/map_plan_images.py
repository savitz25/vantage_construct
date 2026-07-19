"""Map scraped Available Homes images to plan sqft/slugs and emit a TS-friendly map."""
import json
import re
import urllib.request

url = "https://vantageconstruct.com/available/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=90) as r:
    data = r.read().decode("utf-8", "ignore")

wp = re.findall(
    r"https://vantageconstruct\.com/wp-content/uploads/[^\s,\"'<>]+\.(?:jpg|jpeg|png|webp)",
    data,
    re.I,
)
wp = [u.replace("\\/", "/") for u in sorted(set(wp))]

# Prefer non-resized originals when possible by stripping -768x...
def prefer_full(u: str) -> str:
    return re.sub(r"-\d+x\d+(?=\.(?:jpg|jpeg|png|webp))", "", u, flags=re.I)

# sqft keys used in filenames
sqft_keys = [
    872, 1448, 1479, 1671, 1800, 1849, 1998, 2192, 2340, 2364, 2407,
    2425, 2482, 2570, 2577, 2841, 2862, 2889, 2992, 3146, 3262, 3349,
    3686, 4954,
]

# known filename patterns / keywords per plan slug
slug_keywords = {
    "cypress-hollow-farmhouse": ["1479", "cypress"],
    "cozy-craftsman-cottage": ["872", "hpg-872"],
    "modern-homestead": ["1448"],
    "classic-bungalow-retreat": ["9081", "1671"],
    "willow-haven": ["1800", "willow"],
    "ridgeview-haven": ["ridgeview", "1849", "7623"],
    "whispering-pine": ["7229", "1998", "whispering"],
    "magnolia-retreat": ["2192", "magnolia", "sumner"],
    "westbrook-estate": ["6935", "2340", "westbrook"],
    "silverleaf-manor": ["4641", "2364", "silverleaf"],
    "fairview-ranch": ["2407", "9417", "fairview"],
    "silo-house": ["2425", "7807", "silo"],
    "laurelwood": ["2482", "5252", "laurelwood"],
    "grand-vista": ["2570", "7375", "grand-vista", "grandvista"],
    "alderwood-barndominium": ["2577", "10060", "alderwood"],
    "meadowbrook-estate": ["2841", "1062", "meadowbrook"],
    "millbrook-manor": ["2862", "7867", "millbrook"],
    "emerald-cottage": ["2889", "8812", "emerald"],
    "lakeside-loft": ["2992", "4387", "lakeside"],
    "willow-ridge-farmhouse": ["3146", "8815", "willow-ridge", "willowridge", "willowbrook"],
    "highland-manor": ["3262", "4328", "highland"],
    "chateau-royale": ["3349", "8712", "chateau", "farmr"],
    "bridgewater-manor": ["3686", "5910", "bridgewater"],
    "grand-alpine": ["4954", "9699", "alpine", "wellington"],
}

def is_floor(u: str) -> bool:
    n = u.lower()
    return any(k in n for k in ["floor", "fp1", "fp2", "plan", "basement-stair", "3car-plan"])

def is_exterior(u: str) -> bool:
    n = u.lower()
    if is_floor(n):
        return False
    return any(
        k in n
        for k in [
            "front", "rear", "elevation", "render", "day", "night", "exterior",
            "cad-image", "drone", "photo", "fall_photo", "thumb", "hires",
            "farmr", "side", "left", "right",
        ]
    )

def is_interior(u: str) -> bool:
    n = u.lower()
    return any(k in n for k in ["kitchen", "living", "great-room", "greatroom", "bedroom", "bath", "dining", "interior"])

result = {}
for slug, keys in slug_keywords.items():
    matches = []
    for u in wp:
        low = u.lower()
        if any(k.lower() in low for k in keys):
            matches.append(prefer_full(u))
    matches = list(dict.fromkeys(matches))  # preserve order unique
    exteriors = [u for u in matches if is_exterior(u)]
    floors = [u for u in matches if is_floor(u)]
    interiors = [u for u in matches if is_interior(u)]
    # fallbacks
    if not exteriors:
        exteriors = [u for u in matches if not is_floor(u)][:6]
    result[slug] = {
        "hero": exteriors[0] if exteriors else (matches[0] if matches else None),
        "hover": exteriors[1] if len(exteriors) > 1 else (interiors[0] if interiors else None),
        "floorPlan": floors[0] if floors else None,
        "gallery": (exteriors[:4] + floors[:2] + interiors[:3])[:8],
        "matchCount": len(matches),
    }
    print(f"{slug}: matches={len(matches)} hero={bool(result[slug]['hero'])} floor={bool(result[slug]['floorPlan'])}")

with open("scripts/plan_image_map.json", "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2)
print("wrote scripts/plan_image_map.json")
