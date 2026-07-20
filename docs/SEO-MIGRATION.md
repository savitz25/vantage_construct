# SEO Migration & Ranking Playbook — Vantage Custom Builds

**Primary domain (canonical):** `https://vantagecustombuilds.com`  
**Secondary domain (redirect only):** `https://vantageconstruct.com`  
**Full Priority 0 runbook:** [`docs/PRIORITY-0-DOMAIN.md`](./PRIORITY-0-DOMAIN.md)  
**Redirect CSV:** [`docs/REDIRECT-MAP.csv`](./REDIRECT-MAP.csv)  
**Audited:** July 2026  

---

## Priority 0 — Domain & indexing (THIS WEEK)

### Decision (LOCKED)
- **Primary Domain = `https://vantagecustombuilds.com`**
- **Secondary Domain = `https://vantageconstruct.com`** (301 page-by-page; no independent site)

### What was wrong
Canonicals/OG/sitemap defaulted to construct while production was custombuilds → Google treated the new site as a duplicate. Construct WP is **still fully live** (as of verification), which continues to split signals until 301s are live.

### What we fixed in code
- ✅ `SITE_URL` + self-referencing canonicals, OG, JSON-LD, robots, sitemap → custombuilds  
- ✅ Vercel `NEXT_PUBLIC_SITE_URL=https://vantagecustombuilds.com`  
- ✅ Path 301s in `next.config.ts` for legacy slugs on the primary app  
- ✅ Host migration map + middleware: `src/lib/domain-migration.ts`, `src/middleware.ts`  

### What YOU must do outside the repo (blocks indexing recovery)

1. **301 construct.com** — Point DNS at Vercel **or** install path map on WP host (see Priority 0 doc).  
2. **GSC** — Verify both domains, submit `https://vantagecustombuilds.com/sitemap.xml`, Change of Address when 301s live.  
3. **GBP + citations** — Website URL → custombuilds.  
4. Confirm construct no longer serves a full competing site.

---

## Priority 1 — Technical & on-page (weeks 1–3)

| Task | Status in codebase | Owner notes |
|------|--------------------|-------------|
| Canonicals self-referencing | ✅ Fixed | Confirm Vercel env |
| Sitemap only canonical URLs | ✅ Fixed | |
| robots.txt + sitemap link | ✅ Fixed | |
| Remove meta keywords | ✅ Fixed | |
| LocalBusiness / Service / FAQ / Breadcrumb schema | ✅ Present on key templates | Validate in Rich Results Test |
| Service titles with NJ | ✅ Pattern applied | Review any remaining generic titles |
| Thin service pages expanded | ✅ Lifestyle pages + Studios | Keep adding case study photos |
| Tool pages have crawlable copy | ✅ ToolLanderShell education + FAQ | |
| CWV / WebP / image alts | Partial | Studio photos are JPG; convert to WebP later |
| Full Screaming Frog crawl | Manual | Run after deploy |

### Target title pattern
```
Finished Basements NJ | Custom Basement Remodeling | Vantage Construction
Cost to Build a House in NJ Calculator | North Jersey Custom Home | Vantage Construction
```

### High-priority ranking URLs
1. `/cost-to-build-a-house-nj` — “cost to build a house in NJ”
2. `/finished-basement-cost-nj` + `/transformations/basements`
3. `/kitchen-remodel-cost-nj` + `/transformations/kitchens`
4. `/move-or-improve-calculator-nj`
5. `/adu-cost-calculator-nj`
6. `/outdoor-kitchen-cost-nj`
7. `/primary-suite-cost-nj`
8. Town hubs under `/locations/[slug]`

---

## Priority 2 — Local SEO (weeks 1–6)

See **`docs/LOCAL-SEO-PLAYBOOK.md`** for full GBP / reviews / citations checklist.

1. **Google Business Profile** — website → custombuilds; category Custom Home Builder  
2. **Review engine** — post-project SMS + email (step 7 Celebrate Beginnings)  
3. **NAP** — Vantage Construction Inc · 16 Saddlemount Ave, Warren, NJ 07059 · (908) 350-0989  
4. **Town pages (code ✅ expanded)**  
   - `/locations/warren-nj`  
   - `/locations/watchung-nj`  
   - `/locations/basking-ridge-nj`  
   - `/locations/millburn-short-hills-nj`  
   - `/locations/westfield-nj` (added)  
   - Next: add real project photos per town

---

## Priority 3 — Content & authority (weeks 2–12)

See **`docs/SEO-CONTENT-CALENDAR.md`**.

1. **Cost Studio (code ✅ expanded)** — $/sq ft anchors ~$241–$348, methodology, FAQs, internal links  
2. **Move or Improve** — transfer-fee angle in on-page copy; PR outreach still manual  
3. Insights: 2 posts/month, Victor byline — calendar ready; full article routes next  
4. Named project/case study pages — pending portfolio assets  
5. Backlinks: Houzz/BBB, partners, realtors, local press

---

## Measurement

| Channel | What to track |
|---------|----------------|
| GSC | Impressions, clicks, indexing coverage |
| Ranks | 15–20 terms (custom home builder Warren NJ, cost to build NJ, finished basement NJ, etc.) |
| GBP | Calls, directions, website clicks |
| GA4 | Organic → Studio start → lead |

### Suggested GA4 events (already partially instrumented)
- `tool_started`, `vision_selected` / `style_selected` / `purpose_selected`
- `feature_changed`, `estimate_updated`
- `lead_capture_submit`, `lead_captured`
- `nav_click`, `tool_lander_view`, `service_tool_cta_click`

---

## Realistic timeline

| Window | Expectation |
|--------|-------------|
| Days–weeks | Indexation after canonical fix |
| 4–8 weeks | Recovery of any old-domain equity if 301s are clean |
| 30–60 days | Local map pack movement with GBP + reviews |
| 2–6 months | Cost Studio + calculators as compounding assets |

---

## Post-deploy verification checklist

- [ ] View source on homepage: `rel="canonical"` → `https://vantagecustombuilds.com/`
- [ ] Open `/sitemap.xml` — all URLs on custombuilds domain  
- [ ] Open `/robots.txt` — Sitemap line correct  
- [ ] Rich Results Test on homepage + basements + cost studio  
- [ ] GSC “URL inspection” → Request indexing on key URLs  
- [ ] Old domain returns 301 to matching new URL (when WP/host redirects live)  
