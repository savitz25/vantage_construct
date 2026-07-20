# SEO Content Calendar & E-E-A-T — Vantage Construction

**Author standard (mandatory):**  
Every Insights post credits **Victor Lobozzo**, Master Builder, N.J. Registered Builder #029289, 35+ years.  
Never use a personal Gmail byline. Link author to `/about`.

**Cadence:** 2 substantial posts per month (1,200–2,000 words) + internal links to a Studio tool.

---

## Month 1–2 (highest ROI)

| # | Working title | Primary keyword | Link to |
|---|---------------|-----------------|---------|
| 1 | Cost to build a custom home in North Jersey (real numbers) | cost to build a house in nj | `/cost-to-build-a-house-nj` |
| 2 | Move or improve after NJ transfer fee changes | move or renovate nj / graduated percent fee | `/move-or-improve-calculator-nj` |
| 3 | Knockdown-rebuild in NJ: process, costs, timelines | knockdown rebuild nj | `/custom-homes/rebuilds` |
| 4 | Finished basement costs in Warren & North Jersey | finished basement cost nj | `/finished-basement-cost-nj` |

## Month 3–4

| # | Working title | Primary keyword | Link to |
|---|---------------|-----------------|---------|
| 5 | Kitchen remodel cost & process in North Jersey | kitchen remodel cost nj | `/kitchen-remodel-cost-nj` |
| 6 | ADU rules & payback by town (framework) | adu builder nj | `/adu-cost-calculator-nj` |
| 7 | Custom home builder guide: Warren Township | custom home builder warren nj | `/locations/warren-nj` |
| 8 | Primary suite addition vs move | primary suite addition nj | `/primary-suite-cost-nj` |

## Month 5–6

| # | Working title | Primary keyword | Link to |
|---|---------------|-----------------|---------|
| 9 | Outdoor kitchen cost in New Jersey | outdoor kitchen cost nj | `/outdoor-kitchen-cost-nj` |
| 10 | Basking Ridge stay-and-improve guide | custom home builder basking ridge | `/locations/basking-ridge-nj` |
| 11 | What $1.5M builds in Warren NJ (with photos) | custom home cost warren nj | Cost Studio + portfolio |
| 12 | Whole-home remodel sequencing (live-in-place) | whole home remodel nj | `/transformations/remodeling` |

---

## Post template (every article)

1. **Hook** — homeowner problem in North Jersey terms  
2. **Expert framing** — Victor quote / 35-year lesson  
3. **Numbers** — ranges with disclaimer; link Cost Studio  
4. **Process** — how Vantage actually delivers  
5. **Local note** — town or county nuance  
6. **FAQ** (3–5) + FAQ schema when page is built  
7. **CTA** — Studio tool + `/start`  
8. **Byline box** — Victor bio + licenses  

Use `articleJsonLd()` from `src/lib/seo.ts` when full posts ship as routes.

---

## Project / case study pages (live)

**Hub:** `/projects` · **Template:** `/projects/[slug]` · **Data:** `src/lib/projects/case-studies.ts`

Initial studies (update names/photos when approved):

| Slug | Town | Type |
|------|------|------|
| `warren-family-compound-rebuild` | Warren | Rebuild |
| `watchung-hillside-outdoor-living` | Watchung | Outdoor |
| `basking-ridge-primary-suite-addition` | Basking Ridge | Addition |
| `short-hills-kitchen-transformation` | Short Hills | Kitchen |
| `westfield-stay-and-improve-expansion` | Westfield | Addition + reno |

See also: [`docs/INSIGHTS-CADENCE.md`](./INSIGHTS-CADENCE.md)
- Include: town, scope, challenge, photos, testimonial, related Studio  

---

## Link building (realistic)

1. Houzz + BBB fully optimized  
2. Pitch Move-or-Improve + transfer fee angle to Patch / NJ real-estate columns  
3. Realtor partner page → agents link “builder partner”  
4. Supplier/architect reciprocal mentions  
5. Town event sponsorships that include a link  

---

## Measurement of content

- GSC queries containing “cost”, “basement”, “knockdown”, town names  
- Studio tool starts attributed to organic landing pages  
- Leads with `tool_*` or page path in CRM notes  
