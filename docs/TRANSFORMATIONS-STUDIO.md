# Vantage Transformations Interactive Suite

## Hub
`/studios` — Design Studio, Cost Studio, Move or Improve, ADU Payback, Basement Builder

## Tools

### 1. Move or Improve? (`/move-or-improve-calculator-nj`)
- Compares true cost of selling (commissions, est. NJ RTF, Graduated Percent Fee tiers, moving, buy-side, rate differential framing) vs net effective cost of improving
- Need chips drive addition scope presets
- Gated detailed PDF lead capture
- Tax figures are **estimates only** — not tax advice

### 2. ADU Payback (`/adu-cost-calculator-nj`)
- Types: detached (Cozy Craftsman anchor), garage conversion, basement suite, above-garage
- County rent presets + rent slider
- Break-even years + 10-year cash flow chart
- Town zoning status lookup (maintain as CMS later)
- Gated Feasibility Guide

### 3. Basement Dream-Space (`/finished-basement-cost-nj`)
- Footprint slider, finish tier, multi-select zones
- Live colored floor mock + capacity bar
- Estimate, monthly framing, value-add
- Gated Lookbook

## CRM
`POST /api/transformations/lead`  
Tags: `pipeline: transformations`, `tool: move-or-improve | adu-payback | basement-builder`  
Webhook: `TRANSFORMATIONS_WEBHOOK_URL`

## Confirm with Victor
- Addition / ADU / basement pricing bands from recent jobs
- Town ADU ordinance status refresh
- Attorney review of tax language
- Quarterly rate/rent/tax maintenance owner
