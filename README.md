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

## Environment

Optional:

```env
NEXT_PUBLIC_SITE_URL=https://vantageconstruct.com
```

## Deploy

Connect this repo to Vercel (or any Node host), set `NEXT_PUBLIC_SITE_URL`, and deploy the production build.
