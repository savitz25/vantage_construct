# Realtors Partner Page

**URL:** `/partners/realtors`

## Strategy
Money + reputation. Interactive commission math first; specialized form second; co-branded kit + no-poaching third.

## Commission model (illustrative — confirm in writing)
Matches the existing public Vantage example:
- Land-only: **5%** of land price
- Package path: **3%** of (land + build)
- Payment narrative: land at closing; build fee at **framing** (not CO)

Actual rates/terms: confirmed per partnership agreement.

## Features
1. Interactive Commission Calculator (sliders + yearly impact + payment timing card)
2. Double-dip value prop
3. “We make you look good” reputation section
4. Co-branded marketing kit offer
5. VIP tier framing (Preferred / Gold / Platinum)
6. 30-second listing qualify check
7. Purpose-built realtor form → `POST /api/realtors/lead` (`Realtor Lead`)

## CRM
`REALTOR_WEBHOOK_URL` (fallback: CRM / design studio webhook)

## Analytics
`land_price_changed`, `build_cost_changed`, `yearly_packages_changed`, `qualify_answer`, `qualify_cta_clicked`, `realtor_form_submit`
