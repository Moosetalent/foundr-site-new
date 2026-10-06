# Live jobs via Loxo

Loxo's API needs a bearer key and doesn't allow browser calls directly, so the site talks to a tiny proxy that holds the key. Three files:

- `loxo-proxy.worker.js` — Cloudflare Worker (free tier). Filters to published + active roles, strips internal fields, caches 60s, adds CORS, forwards applications.
- `loxo.js` — browser module both pages use. `CONFIG.endpoint` points at the proxy.
- `Jobs.dc.html` / `Foundr Landing.dc.html` — read the endpoint from the **Loxo** tweak (`loxoEndpoint`) or `CONFIG.endpoint`.

## Setup (10 min)

1. Loxo → Settings → API: create a key. Note the **agency slug** (the path after `app.loxo.co/` on your careers page).
2. `npx wrangler deploy loxo-proxy.worker.js --name foundr-jobs`
3. `npx wrangler secret put LOXO_API_KEY`
4. Vars on the worker: `LOXO_AGENCY_SLUG`, `LOXO_DOMAIN` (`app.loxo.co` unless Loxo gave you a custom one), `ALLOWED_ORIGINS` (`https://foundr.xyz,https://www.foundr.xyz`; `*` while testing).
5. Paste the worker URL into `CONFIG.endpoint` in `loxo.js` (or the Loxo → Endpoint tweak on both pages). Optional: route it at `foundr.xyz/api/loxo` and use `/api/loxo`.

## Behaviour

- Jobs page: live roles, newest first; filters by location and practice (Loxo job categories/tags); inline apply posts to `/jobs/:id/apply` (name, email, phone required by Loxo; resume optional). `applyMode: loxo` sends applicants to the Loxo job page instead.
- Landing ticker: first 12 live roles; "View role" deep-links to `Jobs.dc.html#role-<id>`.
- If the proxy is unreachable, both fall back to `jobs.json` sample roles (set `fallback: message` to show a notice instead).

## Loxo-side checklist

A role appears only if, in Loxo, it is **Active**, has **Job Board Publishing** on, a publish start date in the past and no past end date. Set "Published Name" if the internal title shouldn't show. Hide company name per job if the search is confidential.
