# SEO Migration & Ranking Playbook — Vantage Custom Builds

**Primary domain (canonical):** `https://vantagecustombuilds.com`  
**Old domain (must not compete):** `https://vantageconstruct.com`  
**Audited:** July 2026  

---

## Priority 0 — Domain & indexing (THIS WEEK)

### What was wrong
Every page’s canonical, Open Graph URL, and sitemap defaulted to `https://vantageconstruct.com` while production is live at `https://vantagecustombuilds.com`. Google treats the new site as a **duplicate** and may not index it.

### What we fixed in code
- Centralized production URL in `src/lib/site.ts` → `https://vantagecustombuilds.com`
- Self-referencing canonicals, OG, JSON-LD, robots.txt, sitemap all use that domain
- Removed useless `meta keywords` from root layout
- Improved `HomeAndConstructionBusiness` + `WebSite` schema
- Service page title pattern: `[Service] NJ | [Modifier] | Vantage Construction`
- Expanded 301 map for common old paths (`/basements`, `/portfolio`, etc.)

### What YOU must do outside the repo

1. **Vercel → Project → Settings → Environment Variables**  
   Set for Production (and Preview if desired):
   ```
   NEXT_PUBLIC_SITE_URL=https://vantagecustombuilds.com
   ```
   Redeploy after saving.

2. **Domain decision (confirm)**  
   - **Option A (current code):** Keep **vantagecustombuilds.com** as winner.  
   - **Option B (stronger long-term):** Point this Next app at **vantageconstruct.com** (age + email + backlinks) and 301 custombuilds → construct.  
   If you choose B, change `SITE_URL` default in `src/lib/site.ts` and `company.siteUrl`, then redeploy.

3. **Old WordPress site**  
   - Either **301 every important URL** to the matching new path, or take WP offline after redirects are in place.  
   - **Never** leave two full sites live with overlapping content.  
   - Prefer **page-to-page** 301s, not everything → homepage.

4. **Google Search Console**
   - Verify **both** domains (Domain property or URL-prefix).
   - Submit `https://vantagecustombuilds.com/sitemap.xml`.
   - Use **Change of Address** if permanently moving construct → custombuilds (or reverse).
   - Monitor Coverage / Page indexing for 4–8 weeks.

5. **External pointers** (same NAP everywhere)
   - Google Business Profile website URL  
   - Houzz, Facebook, BBB, email signatures, directories  
   - Must match chosen primary domain + phone `(908) 350-0989` + Warren address  

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
