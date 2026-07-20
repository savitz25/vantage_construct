# Priority 0 — Domain Decision, Canonicals & Migration

**Status date:** July 2026  
**Code status:** Canonicals + sitemap + robots + middleware ready  
**Ops status:** Old WordPress domain still serving full site until DNS/redirects go live  

---

## 1. Domain decision (CONFIRMED)

| Role | Domain |
|------|--------|
| **Primary Domain** | **`https://vantagecustombuilds.com`** |
| **Secondary Domain (redirect only)** | **`https://vantageconstruct.com`** |

### Why primary = vantagecustombuilds.com

| Criterion | Assessment |
|-----------|------------|
| Production site | Full Next.js marketing + Studios already live on custombuilds |
| Canonical / sitemap / OG | Already self-referencing custombuilds in code + Vercel `NEXT_PUBLIC_SITE_URL` |
| Brand for this product | “Custom Builds” consumer site; “Vantage Construction” remains legal brand name on-site |
| Email / licenses | Stay as **VantageConstruct.com** email and builder licenses — mail ≠ web canonical |
| Alternative (construct as primary) | Stronger for raw domain age/backlinks, but would require re-pointing production DNS, changing `SITE_URL`, and re-marketing every link already pointing at custombuilds |

**Decision:** Consolidate **web** authority on **vantagecustombuilds.com**. Transfer equity from construct via **page-to-page 301s**, not by abandoning the new production host.

If leadership later prefers construct.com as the only public URL, flip `SITE_URL` + Vercel primary domain and reverse the redirect map — do not run both as full sites.

---

## 2. Canonical tags (CODE ✅ — LIVE VERIFIED)

| Check | Result |
|-------|--------|
| Homepage `rel=canonical` | `https://vantagecustombuilds.com` |
| OG URL | `https://vantagecustombuilds.com` |
| Implementation | `createMetadata()` → `alternates.canonical = absoluteUrl(path)` |
| Source of truth | `src/lib/site.ts` → `SITE_URL` (env `NEXT_PUBLIC_SITE_URL` or default custombuilds) |
| `metadataBase` | Root layout uses `SITE_URL` |
| Sitemap | Only `https://vantagecustombuilds.com/...` URLs |
| robots.txt | `Host` + `Sitemap` on custombuilds |

**No page on the primary domain should canonicalize to construct.com.**  
(Email `V.Lobozzo@VantageConstruct.com` in schema/footer is fine — it is not a canonical URL.)

---

## 3. 301 redirects

### A. Path redirects on the primary app (✅ in `next.config.ts`)

Legacy paths hitting **custombuilds** (bookmarked old slugs) rewrite to new IA — see `next.config.ts`.

### B. Host redirects construct → custombuilds

| Layer | Status |
|-------|--------|
| Shared path map | ✅ `src/lib/domain-migration.ts` |
| Next middleware | ✅ `src/middleware.ts` (activates when construct DNS → Vercel) |
| WordPress / old host | ⏳ **YOU** — still required while construct serves WP |

### Redirect map (key pages)

| Old (vantageconstruct.com) | New (vantagecustombuilds.com) |
|----------------------------|-------------------------------|
| `/` | `/` |
| `/schedule`, `/contact` | `/start` |
| `/available`, `/photos`, `/portfolio` | `/available-homes` |
| `/process` | `/custom-homes/process` |
| `/process-existing` | `/transformations/process` |
| `/basements`, `/finished-basements` | `/transformations/basements` |
| `/kitchens`, `/kitchen-remodeling` | `/transformations/kitchens` |
| `/additions` | `/transformations/additions` |
| `/remodeling`, `/renovations` | `/transformations/remodeling` |
| `/rebuilds`, `/knockdowns` | `/custom-homes/rebuilds` |
| `/realtors` | `/partners/realtors` |
| `/investors` | `/partners/investors` |
| `/faq` | `/insights/faq` |
| `/blog` | `/insights/blog` |
| `/design-your-vantage-vision` | `/design-studio` |
| `/cost-to-build-a-house-calculator*` | `/cost-to-build-a-house-nj` |
| `/land-evaluation` | `/land/evaluation` |
| `/land-development` | `/land` |
| `/sell-land` | `/land/evaluation` |
| `/multi-lot-use` | `/land/multi-lot` |
| `/spec-home-building` | `/land/spec-homes` |
| `/warren` | `/locations/warren-nj` |
| `/watchung` | `/locations/watchung-nj` |
| `/basking-ridge` | `/locations/basking-ridge-nj` |
| `/short-hills`, `/millburn` | `/locations/millburn-short-hills-nj` |
| Unmapped paths | Same path on primary (middleware), or nearest hub if 404 after test |

**Land pages still on WordPress:** see `docs/WP-LAND-REDIRECTS.md` for copy-paste 301s until construct DNS points at Vercel.

Full machine map: `LEGACY_PATH_REDIRECTS` in `src/lib/domain-migration.ts`.

### How to activate construct.com → custombuilds (pick one)

#### Option 1 — Recommended: point construct DNS at Vercel

1. Vercel → Project → **Domains** → Add `vantageconstruct.com` + `www.vantageconstruct.com`
2. At registrar/DNS host, set records Vercel shows (usually A/CNAME)
3. Middleware issues **301** with path map automatically
4. Remove or park WordPress so it is not still answering on another IP

#### Option 2 — Keep WP host temporarily: Redirection plugin / `.htaccess`

Use the table above as **source URL → target URL** (absolute targets on custombuilds).  
Example Apache (illustrative):

```apache
# Prefer plugin "Redirection" or server rules per path — not RedirectMatch everything to /
Redirect 301 /basements https://vantagecustombuilds.com/transformations/basements
Redirect 301 /process https://vantagecustombuilds.com/custom-homes/process
# ... every row in the map ...
```

#### Option 3 — Cloudflare (if domain is proxied)

Bulk dynamic redirects: `vantageconstruct.com/*` → `https://vantagecustombuilds.com/$1` **only after** path exceptions for mapped routes are defined (or use Workers with the same map).

**Never** send every old URL only to the homepage.

---

## 4. Google Search Console (MANUAL — checklist)

- [ ] Verify **Domain property** or URL-prefix for `vantagecustombuilds.com`
- [ ] Verify **Domain property** or URL-prefix for `vantageconstruct.com`
- [ ] Submit sitemap: `https://vantagecustombuilds.com/sitemap.xml`
- [ ] After 301s are live: GSC on old property → **Settings → Change of Address** → new site = custombuilds (if tool available for your property type)
- [ ] URL Inspection → Request indexing: `/`, `/cost-to-build-a-house-nj`, `/custom-homes/rebuilds`, `/transformations/basements`, `/locations/warren-nj`
- [ ] Monitor **Pages** / indexing for 4–8 weeks (expect temporary volatility during migration)

---

## 5. Cleanup & consistency (checklist)

### Done in code / deploy
- [x] Self-referencing canonicals on primary  
- [x] robots.txt Host + Sitemap on primary  
- [x] Sitemap only primary URLs  
- [x] Vercel env `NEXT_PUBLIC_SITE_URL=https://vantagecustombuilds.com`  
- [x] Path redirects in Next config  
- [x] Middleware ready for host-level 301s  

### Still human / ops
- [ ] **Kill independent WP content** on construct (redirects only)  
- [ ] Google Business Profile website → `https://vantagecustombuilds.com`  
- [ ] Houzz, Facebook, BBB, directories → primary domain  
- [ ] Email signatures / proposals (website line → custombuilds)  
- [ ] Optional later: host PDFs on custombuilds instead of construct `/wp-content/`  

---

## 6. Verification commands (after 301s live)

```bash
# Primary self-canonical
curl -sL https://vantagecustombuilds.com/ | findstr /i canonical

# Secondary must 301 (expect 301 + Location: custombuilds...)
curl -sI https://vantageconstruct.com/basements
curl -sI https://vantageconstruct.com/process
```

Expect: `HTTP/1.1 301` and `Location: https://vantagecustombuilds.com/...` matching the map.

---

## 7. Success criteria

| Criterion | Status |
|-----------|--------|
| Canonicals on primary point to themselves | ✅ Live |
| Secondary 301s page-by-page to primary | ⏳ Pending DNS or WP redirects |
| GSC primary crawled/indexed | ⏳ After submit + 301s |
| No competing full site on secondary | ⏳ Pending decommission |

---

## Summary of code changes (this pass)

1. **Documented formal domain decision** (this file)  
2. **`src/lib/domain-migration.ts`** — single source of truth for path map  
3. **`src/middleware.ts`** — 301 construct (+ www) → custombuilds when host hits Vercel  
4. Prior pass already fixed **SITE_URL / canonicals / sitemap / robots**  
