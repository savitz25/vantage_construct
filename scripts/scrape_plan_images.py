import re
import urllib.request
from collections import defaultdict

url = "https://vantageconstruct.com/available/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=90) as r:
    data = r.read().decode("utf-8", "ignore")

print("html_len", len(data))

wp = re.findall(
    r"https://vantageconstruct\.com/wp-content/uploads/[^\s,\"'<>]+\.(?:jpg|jpeg|png|webp)",
    data,
    re.I,
)
# decode entities
wp = [u.replace("\\/", "/").replace("%5F", "_") for u in wp]
unique = sorted(set(wp))
print("unique_images", len(unique))
for u in unique:
    print(u)

# Map plan sections by nearby THD codes
thd = re.findall(r"THD[-_]?(\d+)", data, re.I)
print("thd_codes", sorted(set(thd)))

# Try to associate images near each plan heading
parts = re.split(r"(The [A-Za-z0-9 '\-]+)", data)
print("heading_splits", len(parts))
