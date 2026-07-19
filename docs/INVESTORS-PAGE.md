# Investors / Partners Page

**URL:** `/partners/investors`  
**Status:** Built for sophistication + compliance framing. **Must be reviewed by a securities attorney before treating as fully launch-ready marketing.**

## Legal framing (non-negotiable)
- All calculator rates, splits, and outcomes are **illustrative only**.
- Copy frames “how partnerships are structured,” not “invest now for X%.”
- Permanent disclaimer near the deal modeler and page footer.
- Actual terms only in written agreements after underwriting.

## Placeholder assumptions (Victor + counsel to replace)
Located in `src/lib/investors/content.ts` → `illustrativeAssumptions`:
- Loan preferred ~11% annualized
- Equity residual share 50% of assumed margin pool × capital share
- Hybrid ~8% preferred + 30% residual kicker
- Illustrative project gross margin 14% of construction budget

## Features
1. Hero + dual CTAs (modeler / overview)
2. Track record dashboard (1990, developments, spec range, Victor)
3. Loan / Equity / Hybrid cards
4. Interactive Deal Modeler (sliders + side-by-side outcomes)
5. 6-phase lifecycle timeline
6. Investor FAQ + FAQ schema
7. Gated Investor Overview form → `POST /api/investors/lead` (`leadType: Investor Lead`)

## CRM
- Env: `INVESTOR_WEBHOOK_URL` (falls back to `CRM_WEBHOOK_URL` / design studio webhook)
- Payload tagged `pipeline: "investors"` for separate homeowner lead flows

## Analytics events
`investment_amount_changed`, `hold_period_changed`, `project_cost_changed`, `structure_compared`, `investor_overview_requested`, `investor_overview_submitted`, `investor_consultation_clicked`

## Pre-launch checklist
- [ ] Securities attorney review of all language + calculator assumptions
- [ ] Victor confirms illustrative rates/splits/timeline ranges
- [ ] Attach real Investor Overview PDF delivery (email automation)
- [ ] Confirm CRM pipeline mapping for Investor Lead
