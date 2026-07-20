# Insights Publishing Cadence & Standards

**Primary domain:** https://vantagecustombuilds.com  
**Hub:** `/insights` · **Articles:** `/insights/[slug]` · **Blog index:** `/insights/blog`  
**Author standard:** Victor Lobozzo, Master Builder · N.J. Builder #029289  

---

## Cadence (sustainable)

| Rhythm | Volume | Focus |
|--------|--------|--------|
| **Baseline** | **2 articles / month** | High-intent commercial themes only |
| Stretch | 3 / month | Only if quality holds |
| Never | Thin weekly filler | Damages brand + SEO |

Each article: **1,200–2,000 words**, one clear search intent, one primary conversion path.

---

## Priority themes (topical authority)

Map every post to **one** primary theme:

1. **Cost / investment** → Cost Studio  
2. **Renovate vs rebuild** → Rebuilds + assessment  
3. **Land / lot feasibility** → Land evaluation + multi-lot  
4. **Kitchens** → Kitchen Studio  
5. **Basements / lower levels** → Basement Builder  
6. **Accessory buildings** → Garage Studio + accessory buildings page  
7. **Process / timeline** → Process pages + FAQ  

---

## Internal linking requirements (every article)

Mandatory before publish:

| Link type | Minimum | Examples |
|-----------|---------|----------|
| Primary tool / calculator | 1 | Cost Studio, Kitchen Studio |
| Service page | 1 | Rebuilds, basements, outdoor living |
| Location (when relevant) | 1 | Warren, Watchung, etc. |
| Related Insights | 1–2 | Same theme cluster |
| FAQ or process | Optional | `/insights/faq`, process |
| CTA | 1 | `/start` |

**Anchor text:** descriptive (“Open Cost Studio for North Jersey ranges”), not “click here”.

Implementation already supports tool CTAs in article body blocks + `PlanningPathways` + `RelatedInsights`.

---

## Article structure (template)

1. **Hook** — homeowner problem in North Jersey terms  
2. **Expert framing** — Victor / 35-year lesson  
3. **Numbers** — ranges + disclaimer; link tool  
4. **Process** — how Vantage delivers  
5. **Local note** — town or county nuance when possible  
6. **FAQ** — 3–5 questions (good for FAQ schema on dedicated pages)  
7. **Closing CTA** — tool + conversation  
8. **Byline** — Victor + licenses (in post metadata)

Use `src/lib/insights/posts.ts` and `articleJsonLd()`.

---

## 90-day content calendar (framework)

### Month 1
| Topic | Intent | Primary link |
|-------|--------|--------------|
| Cost to build in Warren vs Short Hills (ranges) | Commercial | Cost Studio + town pages |
| Knockdown logistics in North Jersey | Commercial | Rebuilds |

### Month 2
| Topic | Intent | Primary link |
|-------|--------|--------------|
| Finished basement ROI for luxury markets | Commercial | Basement Builder |
| What makes a Watchung lot expensive to build | Land | Land evaluation |

### Month 3
| Topic | Intent | Primary link |
|-------|--------|--------------|
| Kitchen remodel sequencing while living in place | Service | Kitchen Studio |
| Westfield move-or-improve after transfer fees | Decision | Move or Improve |

Rotate through remaining themes; always pair with a live tool.

---

## Quality gate (definition of done)

- [ ] Unique title + meta via `createMetadata`  
- [ ] Victor as author  
- [ ] No generic national-only advice without NJ note  
- [ ] Disclaimers on cost numbers  
- [ ] ≥1 Studio/Calculator deep link  
- [ ] ≥1 service or location deep link  
- [ ] Featured image with descriptive alt  
- [ ] Listed in `insightPosts` + sitemap auto-includes  

---

## Operating rhythm

| Cadence | Owner | Action |
|---------|-------|--------|
| Monthly planning | Marketing + Victor | Pick 2 topics from theme list |
| Draft | Writer / agent | Use template + posts.ts |
| Review | Victor | Numbers, claims, local accuracy |
| Publish | Web | Ship + share to GBP post |
| Quarterly | Strategy | Refresh top 5 articles + internal links |

---

## Connection to projects & towns

When a case study ships at `/projects/[slug]`:

1. Link from matching **town page** (auto if `locationSlug` set)  
2. Link from related **service** page (manual or related block)  
3. Write **one Insights post** that expands the lesson (optional, high value)  
