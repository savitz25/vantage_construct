# Design Studio & Plan Image Assets

## Status

**Resolved:** Style cards and plan cards no longer depend on hotlinked `vantageconstruct.com` URLs at runtime. Assets are downloaded into this repo and served from Vercel as first-party static files.

## Why images were broken

WordPress media on `vantageconstruct.com` returns **HTTP 403** when requested without a normal browser `User-Agent`. Vercel’s Next.js image optimizer often hit that restriction, so cards rendered empty beige boxes with only alt text visible.

## Pipeline

1. Scrape Available Homes media from the live site (`scripts/scrape_plan_images.py`, `scripts/build_media_ts.py`).
2. Download bytes with proper headers into `public/media/plans/` (`scripts/download_media.py`).
3. Map every plan/style/roof/lifestyle/size option to a **local** path in `src/lib/plan-media.ts`.
4. Render with `SmartImage` (`src/components/SmartImage.tsx`).

Re-run after the client updates photography:

```bash
python scripts/build_media_ts.py
python scripts/download_media.py
```

## Component: SmartImage

- Native `<img>` (no remote optimizer dependency)
- Reserved `aspect-[16/10]` parent boxes → no CLS
- Soft gradient base layer while loading
- `loading="lazy"` by default; `priority` → `eager` + `fetchPriority="high"`
- `decoding="async"`
- On error → `/media/plans/fallback-luxury-home.svg` (never a broken icon)
- Descriptive `alt` from callers (`planImageAlt` helpers)

## Card coverage

| Surface | Visual |
|---------|--------|
| Architectural Style | Real exteriors via `styleMedia` |
| Size bands | Representative homes via `sizeBandMedia` |
| Available plans | Per-plan hero/hover/gallery/floor via `planMedia` |
| Roof types | Elevation examples via `roofMedia` |
| Lifestyle add-ons | Relevant project photos via `lifestyleMedia` |
| Available Homes catalog | Same `planMedia` heroes |

## Fallback strategy

1. Preferred: plan-specific exterior from Available Homes.
2. Secondary: hover/alternate elevation or gallery frame.
3. Ultimate: branded SVG luxury-home silhouette (`fallback-luxury-home.svg`).
4. Plans with weak asset matches may set `representative: true` and show a “Representative elevation” badge.

## Performance notes

- WebP sources preferred (already sized ~400–800px wide for cards).
- First 3 style heroes preloaded on `/design-studio`.
- First 3 plan cards in each visible grid use `priority`.
- Remaining cards lazy-load.

## QA checklist

- [x] Style cards show real exteriors
- [x] Plan cards show actual designs
- [x] Local media returns 200 on production
- [x] Fallback SVG present
- [x] Aspect-ratio boxes prevent layout shift
- [x] Selected checkmark visible on image
- [x] Mobile-friendly `sizes` attributes
- [x] Alt text on all design images
