import re
import urllib.request

url = "https://vantageconstruct.com/available/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=90) as r:
    data = r.read().decode("utf-8", "ignore")

needles = [
    "6935", "4641", "7867", "4328", "5910", "2340", "2364", "2862", "3262", "3686",
    "Westbrook", "Silverleaf", "Millbrook", "Highland", "Bridgewater",
    "THD-6935", "THD-4641", "THD-7867", "THD-4328", "THD-5910",
]
for n in needles:
    idxs = [m.start() for m in re.finditer(re.escape(n), data, re.I)]
    print(n, "hits", len(idxs))
    if idxs:
        i = idxs[0]
        chunk = data[max(0, i - 400) : i + 800]
        imgs = re.findall(
            r"https://vantageconstruct\.com/wp-content/uploads/[^\s,\"'<>]+\.(?:jpg|jpeg|png|webp)",
            chunk,
            re.I,
        )
        print("  nearby imgs", len(imgs))
        for u in imgs[:8]:
            print("   ", u.replace("\\/", "/"))
