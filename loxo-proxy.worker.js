// Loxo proxy — Cloudflare Worker (free tier is plenty).
// Keeps the Loxo API key server-side, adds CORS, and exposes only published, active roles.
//
// Deploy:  npx wrangler deploy loxo-proxy.worker.js --name foundr-jobs
// Secrets: npx wrangler secret put LOXO_API_KEY
// Vars (wrangler.toml [vars] or dashboard):
//   LOXO_AGENCY_SLUG = "foundr"            ← the part after app.loxo.co/ on your careers page
//   LOXO_DOMAIN      = "app.loxo.co"       ← or "<agency>.app.loxo.co" if Loxo gave you one
//   ALLOWED_ORIGINS  = "https://foundr.xyz,https://www.foundr.xyz"   ← comma-separated, or "*" while testing
// Then set CONFIG.endpoint in loxo.js (or the Jobs page's "loxoEndpoint" tweak) to the worker URL,
// e.g. https://foundr-jobs.<account>.workers.dev  — or route it at https://foundr.xyz/api/loxo.

const PUBLIC_FIELDS = ['id', 'title', 'published_name', 'description', 'city', 'state', 'state_code', 'country', 'country_code', 'zip', 'address', 'macro_address',
  'salary', 'salary_type', 'salary_type_id', 'compensation', 'job_type', 'category', 'categories', 'remote_work_allowed', 'published_at', 'created_at', 'updated_at', 'public_url', 'company', 'company_hidden', 'hide_company'];

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (!allowed(origin, env)) return json({ error: 'Origin not allowed' }, 403, cors);

    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, '');
    const m = path.match(/\/jobs(?:\/(\d+))?(\/apply)?$/);
    if (!m) return json({ error: 'Not found' }, 404, cors);
    const [, id, isApply] = m;
    const domain = env.LOXO_DOMAIN || 'app.loxo.co';
    const base = `https://${domain}/api/${env.LOXO_AGENCY_SLUG}/jobs`;
    const auth = { Authorization: `Bearer ${env.LOXO_API_KEY}`, Accept: 'application/json' };

    // POST /jobs/:id/apply — pass the multipart body straight through
    if (isApply) {
      if (req.method !== 'POST' || !id) return json({ error: 'Method not allowed' }, 405, cors);
      const r = await fetch(`${base}/${id}/apply`, { method: 'POST', headers: { ...auth, 'Content-Type': req.headers.get('Content-Type') || 'multipart/form-data' }, body: req.body });
      const text = await r.text();
      return new Response(text || '{}', { status: r.status, headers: { ...cors, 'Content-Type': 'application/json' } });
    }
    if (req.method !== 'GET') return json({ error: 'Method not allowed' }, 405, cors);

    // GET /jobs/:id
    if (id) {
      const r = await fetch(`${base}/${id}`, { headers: auth });
      if (!r.ok) return json({ error: `Loxo ${r.status}` }, r.status, cors);
      const job = await r.json();
      if (!isPublic(job)) return json({ error: 'Not found' }, 404, cors);
      return json(pick(job), 200, { ...cors, 'Cache-Control': 'public, max-age=120' });
    }

    // GET /jobs — published + active only, newest first, with descriptions
    const cache = caches.default;
    const cacheKey = new Request(url.origin + '/jobs?' + url.searchParams.toString(), { method: 'GET' });
    const hit = await cache.match(cacheKey);
    if (hit) { const res = new Response(hit.body, hit); Object.entries(cors).forEach(([k, v]) => res.headers.set(k, v)); return res; }

    const page = url.searchParams.get('page') || '1';
    const perPage = Math.min(+(url.searchParams.get('per_page') || 100), 100);
    const q = new URLSearchParams({ page, per_page: String(perPage), published: 'true', status: 'active', published_at_sort: 'desc', serialization_set: 'api_row_job_with_description' });
    const r = await fetch(`${base}?${q}`, { headers: auth });
    if (!r.ok) return json({ error: `Loxo ${r.status}` }, r.status, cors);
    const data = await r.json();
    const rows = (Array.isArray(data) ? data : data.results || []).filter(isPublic).map(pick);
    const body = { results: rows, total_count: data.total_count ?? rows.length, current_page: +page, per_page: perPage };
    const res = json(body, 200, { ...cors, 'Cache-Control': 'public, max-age=60' });
    await cache.put(cacheKey, res.clone());
    return res;
  }
};

function isPublic(j) {
  if (j.published === false) return false;
  if (j.status && typeof j.status === 'object' && j.status.name && /inactive|closed|filled|on hold/i.test(j.status.name)) return false;
  if (j.job_status && j.job_status.name && /inactive|closed|filled|on hold/i.test(j.job_status.name)) return false;
  return true;
}
function pick(j) {
  const o = {};
  PUBLIC_FIELDS.forEach(k => { if (j[k] !== undefined) o[k] = j[k]; });
  if (o.company && typeof o.company === 'object') o.company = { id: o.company.id, name: o.company.name, logo_url: o.company.logo_url, hidden: !!(j.company_hidden || j.hide_company) };
  return o;
}
function allowed(origin, env) {
  const list = (env.ALLOWED_ORIGINS || '*').split(',').map(s => s.trim()).filter(Boolean);
  return list.includes('*') || !origin || list.includes(origin);
}
function corsHeaders(origin, env) {
  const list = (env.ALLOWED_ORIGINS || '*').split(',').map(s => s.trim());
  return {
    'Access-Control-Allow-Origin': list.includes('*') ? '*' : (list.includes(origin) ? origin : list[0] || ''),
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}
function json(obj, status, headers) { return new Response(JSON.stringify(obj), { status, headers: { ...headers, 'Content-Type': 'application/json' } }); }
