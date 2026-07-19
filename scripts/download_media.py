"""Download remote Vantage media into public/media and rewrite plan-media.ts to local paths."""
from __future__ import annotations

import hashlib
import re
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MEDIA_TS = ROOT / "src" / "lib" / "plan-media.ts"
OUT_DIR = ROOT / "public" / "media" / "plans"
OUT_DIR.mkdir(parents=True, exist_ok=True)

text = MEDIA_TS.read_text(encoding="utf-8")
urls = sorted(
    set(
        re.findall(
            r"https://vantageconstruct\.com/wp-content/uploads/[^\s\"']+\.(?:webp|jpg|jpeg|png)",
            text,
            re.I,
        )
    )
)
print(f"Found {len(urls)} unique remote URLs")

# Also ensure style/size heroes exist even if path variants differ
extra = [
    "https://vantageconstruct.com/wp-content/uploads/2024/11/1479-front-rendering-768x512.webp",
    "https://vantageconstruct.com/wp-content/uploads/2024/11/9081-thumb.webp",
    "https://vantageconstruct.com/wp-content/uploads/2024/11/1448-day-render-768x512.webp",
    "https://vantageconstruct.com/wp-content/uploads/2024/11/2192r1-768x432.webp",
    "https://vantageconstruct.com/wp-content/uploads/2024/11/front-1-v5-1-768x432.webp",
    "https://vantageconstruct.com/wp-content/uploads/2024/04/mh-mulberry.webp",
]
for u in extra:
    if u not in urls:
        urls.append(u)

url_to_local: dict[str, str] = {}
failed: list[str] = []

for i, url in enumerate(urls, 1):
    name = url.split("/")[-1]
    # stable short prefix to avoid collisions
    digest = hashlib.sha1(url.encode()).hexdigest()[:8]
    safe = re.sub(r"[^a-zA-Z0-9._-]", "-", name)
    local_name = f"{digest}-{safe}"
    dest = OUT_DIR / local_name
    public_path = f"/media/plans/{local_name}"

    if dest.exists() and dest.stat().st_size > 1000:
        url_to_local[url] = public_path
        print(f"[{i}/{len(urls)}] skip existing {local_name}")
        continue

    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (compatible; VantageMediaBot/1.0)",
                "Referer": "https://vantageconstruct.com/",
                "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            },
        )
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        if len(data) < 500:
            raise RuntimeError(f"too small: {len(data)} bytes")
        dest.write_bytes(data)
        url_to_local[url] = public_path
        print(f"[{i}/{len(urls)}] OK {local_name} ({len(data)} bytes)")
        time.sleep(0.05)
    except Exception as e:
        failed.append(url)
        print(f"[{i}/{len(urls)}] FAIL {name}: {e}")

# Rewrite TS file paths
new_text = text
for remote, local in url_to_local.items():
    new_text = new_text.replace(remote, local)

MEDIA_TS.write_text(new_text, encoding="utf-8")
print(f"Rewrote {MEDIA_TS}")
print(f"Downloaded/mapped: {len(url_to_local)}; failed: {len(failed)}")
if failed:
    for f in failed[:20]:
        print("  failed:", f)
