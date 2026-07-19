# Vantage Vision Cost Studio

## URL
- Primary SEO page: `/cost-to-build-a-house-nj`
- Alias redirect: `/cost-to-build-a-house-calculator-north-jersey` → primary

## Philosophy
Users design a vision while watching a live construction investment range update. Instant range is free. Detailed line-item breakdown is gated (name + email). Reinforces **No Surprises**.

## Cost model (Phase 0)
Calibrated to published Vantage Available Homes base prices:

| Plan anchor | Size | Base | Implied $/sf |
|-------------|------|------|--------------|
| Cypress Hollow | 1,479 | $515k | ~$348 |
| Emerald Cottage | 2,889 | $860k | ~$298 |
| Grand Alpine | 4,954 | $1,195k | ~$241 |

- Premium base curve declines with size (`premiumBasePerSqft`)
- Finish multipliers: Premium 1.0 · Luxury 1.28 · Estate 1.55
- Style complexity 1.03–1.08
- NJ basements: unfinished / finished / walk-out adders
- Roof, garage, knockdown premium, lifestyle add-ons

**Excluded (always disclosed):** land, sitework, permits, utilities, design fees.

## Interactive model (Phase 2)
`InteractiveHouseModel` — layered 2D composition:
- Base elevation from style photography
- Roof wash by roof type
- Garage wing for 3-car / collector
- Pool, outdoor kitchen, porch, ADU cottage, sunroom chips
- Basement + smart home badges

## Lead capture
- Free: overall range + model + high-level summary
- Gated: `CostBreakdown` + downloadable summary
- API: `POST /api/cost-studio/lead`
- Webhook env: `COST_STUDIO_WEBHOOK_URL` (falls back to Design Studio / CRM webhook)

## Analytics events
`cost_studio_start`, `step_view`, `step_completed`, `option_selected`, `estimate_updated`, `form_submit`, `summary_unlocked`, `consultation_clicked`, `pdf_downloaded`

## Integration
- Nav: Cost Studio
- Homepage + Design Studio cross-links
- Consultation handoff pre-fills `/start?source=cost-studio&config=...`
