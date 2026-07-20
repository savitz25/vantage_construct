# Segmented lead email routing

## Addresses (vantagecustombuilds.com)

| Segment | Address | Form sources |
|---------|---------|--------------|
| Design / general | `design@vantagecustombuilds.com` | Design Studio, Cost Studio, transformations leads, land, accessory, rebuilds, calculators, contact-style tools |
| Investor | `investor@vantagecustombuilds.com` | `/partners/investors` |
| Realtor | `realtors@vantagecustombuilds.com` | `/partners/realtors` |

## Delivery (app behavior)

Form APIs send via **Resend** with:

| Field | Value |
|-------|--------|
| **From** | Segment address (e.g. `Vantage Design Leads <design@vantagecustombuilds.com>`) |
| **To** | `V.Lobozzo@VantageConstruct.com` (`LEAD_FORWARD_TO`) |
| **Cc** | `info@movetrusthub.com` (`LEAD_CC`) |
| **Reply-To** | Submitter’s email |

This guarantees Victor + MoveTrustHub receive every lead **without** requiring inbound MX first.

Set `LEAD_SEND_TO_ALIAS=true` to also put the segment address on the **To** line (use after alias/MX forwarding is live).

## Environment variables (Vercel Production)

```
RESEND_API_KEY=re_...
RESEND_FROM_DOMAIN=vantagecustombuilds.com
# Optional override once domain verified:
# RESEND_FROM_EMAIL=Vantage Leads <design@vantagecustombuilds.com>

LEAD_FORWARD_TO=V.Lobozzo@VantageConstruct.com
LEAD_CC=info@movetrusthub.com
LEAD_EMAIL_DESIGN=design@vantagecustombuilds.com
LEAD_EMAIL_INVESTOR=investor@vantagecustombuilds.com
LEAD_EMAIL_REALTOR=realtors@vantagecustombuilds.com
# LEAD_SEND_TO_ALIAS=true
```

## DNS — Resend (sending / SPF / DKIM)

1. Resend Dashboard → Domains → Add `vantagecustombuilds.com`
2. Add the TXT (SPF), DKIM, and optional DMARC records Resend shows
3. Add via Vercel DNS: Project domain DNS or `vercel dns add`
4. Click **Verify** in Resend

Example DMARC (start monitoring):

```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:design@vantagecustombuilds.com
```

## Inbound aliases + forwarding (optional but recommended)

Vercel does **not** host mailboxes. For people emailing `design@` / `investor@` / `realtors@` directly:

### Option A — ImprovMX (free forwarding)

1. Sign up at improvmx.com with domain `vantagecustombuilds.com`
2. Add MX records ImprovMX provides (via Vercel DNS)
3. Create aliases:
   - `design@` → `V.Lobozzo@VantageConstruct.com`
   - `investor@` → `V.Lobozzo@VantageConstruct.com`
   - `realtors@` → `V.Lobozzo@VantageConstruct.com`
4. Note: CC to `info@movetrusthub.com` on **inbound** mail may need a paid multi-forward or a Google Group; **website forms already CC** via Resend.

### Option B — Google Workspace / Microsoft 365

Create the three users or aliases with forward + CC rules there.

## Code map

| API route | Segment |
|-----------|---------|
| `/api/investors/lead` | investor |
| `/api/realtors/lead` | realtor |
| `/api/design-studio/lead` | design |
| `/api/cost-studio/lead` | design |
| `/api/transformations/lead` | design |

## Testing

```bash
# Investor
curl -s -X POST https://vantagecustombuilds.com/api/investors/lead \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"Investor","email":"test@example.com","phone":"9085550100","investmentRange":"$500k+","preferredStructure":"equity","notes":"TEST investor lead","source":"test"}'

# Realtor
curl -s -X POST https://vantagecustombuilds.com/api/realtors/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Realtor","brokerage":"Test Brokerage","email":"test@example.com","phone":"9085550101","opportunityType":"listing","notes":"TEST realtor lead","source":"test"}'

# Design / general
curl -s -X POST https://vantagecustombuilds.com/api/transformations/lead \
  -H "Content-Type: application/json" \
  -d '{"tool":"kitchen-studio","firstName":"Test","lastName":"Design","email":"test@example.com","phone":"9085550102","payload":{"note":"Test design lead"},"source":"test"}'
```

Expect JSON with `"email":{"ok":true,"id":"..."}` when Resend is configured.
