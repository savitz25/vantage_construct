# Vantage Construction Website

Cutting-edge marketing site for **Vantage Construction** — luxury custom home builder serving Central & Northern New Jersey (Warren, Watchung, Basking Ridge, Millburn–Short Hills).

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS v4**
- SEO: metadata API, JSON-LD (LocalBusiness / HowTo / FAQ / Product), sitemap, robots, canonicals
- Content-driven plan explorer with individual plan pages

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Key routes

| Path | Purpose |
|------|---------|
| `/` | Homepage + intent selector |
| `/available-homes` | Interactive plan explorer |
| `/available-homes/[slug]` | Individual plan SEO pages |
| `/custom-homes/process` | 7-step build process |
| `/transformations/*` | Existing home services |
| `/land/*` | Land, multi-lot, spec homes |
| `/partners/realtors` | Realtor commission program |
| `/partners/investors` | Investor partnerships |
| `/locations/[slug]` | Local SEO hub pages |
| `/start` | Consultation lead form |

## Company facts (source of truth)

Content is centralized in:

- `src/lib/company.ts`
- `src/lib/plans.ts`
- `src/lib/content.ts`

Do not invent new prices, projects, or claims — update these files from client-approved data only.

## Design Studio

Interactive lead engine at `/design-studio` (alias: `/design-your-vantage-vision`).

- Client state persists in `localStorage`
- Lead capture posts to `/api/design-studio/lead`
- Optional CRM webhook via env vars below
- GA4-friendly events fire through `gtag` / `dataLayer`

## Vision Cost Studio

North Jersey construction cost + design calculator at `/cost-to-build-a-house-nj`.

- Live estimate engine calibrated to Vantage plan anchors
- Interactive layered house model for add-ons
- Free instant range; itemized breakdown gated
- API: `/api/cost-studio/lead`
- Docs: `docs/COST-STUDIO.md`

## Environment

Optional:

```env
NEXT_PUBLIC_SITE_URL=https://vantageconstruct.com
DESIGN_STUDIO_WEBHOOK_URL=https://hooks.example.com/vantage-leads
DESIGN_STUDIO_WEBHOOK_SECRET=optional-bearer-token
# or
CRM_WEBHOOK_URL=https://hooks.example.com/vantage-leads
```

## Deploy

Connect this repo to Vercel (or any Node host), set `NEXT_PUBLIC_SITE_URL`, and deploy the production build.
