import re

path = r"C:\Users\makei\.grok\sessions\C%3A%5CUsers%5Cmakei\019f7785-c94a-7d32-9f01-663f91df43de\web_fetch\1.md"
with open(path, encoding="utf-8", errors="ignore") as f:
    t = f.read()

parts = re.split(r"## The ", t)
for p in parts[1:]:
    name_m = re.match(r"([^\n]+)", p)
    name = name_m.group(1).strip() if name_m else "?"
    price = re.search(r"from \$([0-9,]+)", p)
    beds = re.search(r"(\d+) bedrooms?", p, re.I)
    baths = re.search(r"([\d.]+) (?:full )?bathrooms?", p, re.I)
    style = re.search(r"### ([^\n]+)", p)
    pdf = re.search(r"(https://vantageconstruct.com/wp-content/uploads/[^\s\)]+\.pdf)", p)
    features = re.findall(r"\* ([^\n]+)", p[:2500])
    print("---")
    print("NAME:", name)
    print("PRICE:", price.group(1) if price else "?")
    print("BEDS:", beds.group(1) if beds else "?")
    print("BATHS:", baths.group(1) if baths else "?")
    print("STYLE:", style.group(1)[:80] if style else "?")
    print("PDF:", pdf.group(1) if pdf else "")
    print("FEATS:", " | ".join(features[:8]))
