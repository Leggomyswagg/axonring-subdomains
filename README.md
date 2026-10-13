# AxonRing Subdomain Pages

12 subdomain landing pages for axonring.com, organized by category.

## Structure

Each subdomain lives in its own folder. To deploy one:

1. Create a new Vercel project pointing to the folder (e.g. `/shop`)
2. Add the matching custom domain (e.g. `shop.axonring.com`) in Vercel settings
3. Point IONOS DNS via CNAME: `shop` → `cname.vercel-dns.com`

## Subdomains

### Customer-Facing
- `shop/` — shop.axonring.com (Live — links to main site collections)
- `support/` — support.axonring.com (Live — links to main site FAQ)
- `app/` — app.axonring.com (Coming Soon — email capture)
- `community/` — community.axonring.com (Coming Soon)
- `blog/` — blog.axonring.com (Coming Soon)
- `learn/` — learn.axonring.com (Coming Soon)

### Technical / Developer
- `api/` — api.axonring.com (Coming Soon)
- `developers/` — developers.axonring.com (Coming Soon)
- `status/` — status.axonring.com (Coming Soon)

### Operations
- `track/` — track.axonring.com (Coming Soon)
- `returns/` — returns.axonring.com (Coming Soon)
- `account/` — account.axonring.com (Coming Soon)

## Notification Requests

Notification forms prepare an email to `support@axonring.com` with the page's
category and the visitor's reply address. The visitor must send the email; no
address is logged, stored, or automatically subscribed by the static pages.
Each page remains self-contained for deployment from its own folder.

Automated signup needs an approved email provider, server endpoint, and consent
handling. Run `node --test tests/*.test.mjs` from the repository root to verify
every page's request behavior without sending email.

## Design

All pages match the axonring.com luxury aesthetic — Cormorant Garamond serif,
gold/cream palette, grain overlay, editorial spacing.
