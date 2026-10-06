// Loxo integration. Loxo's API is bearer-token only and has no CORS, so the browser talks to a small
// proxy (loxo-proxy.worker.js) that holds the key. Set `endpoint` to that proxy's URL.
// Leave `endpoint` empty only if the site is served from a domain that proxies /api/loxo itself.
export const CONFIG = {
  endpoint: '',            // e.g. 'https://foundr-jobs.<account>.workers.dev' or '/api/loxo'
  slug: 'foundr',          // careers-page slug — only used for links + the direct fallback
  domain: 'app.loxo.co',
  perPage: 100, maxPages: 10
};

const base = cfg => { const ep = ((cfg.endpoint ?? CONFIG.endpoint) || '').replace(/\/+$/, ''); return ep || `https://${cfg.domain || CONFIG.domain}/api/${cfg.slug || CONFIG.slug}`; };
export const careersUrl = (cfg = {}) => `https://${cfg.domain || CONFIG.domain}/${cfg.slug || CONFIG.slug}`;

export async function fetchJobs(cfg = {}) {
  const c = { ...CONFIG, ...cfg };
  const all = [];
  for (let page = 1; page <= c.maxPages; page++) {
    const r = await fetch(`${base(c)}/jobs?page=${page}&per_page=${c.perPage}&published_at_sort=desc`, { headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error(`Loxo ${r.status} from ${base(c)}`);
    const data = await r.json();
    const rows = Array.isArray(data) ? data : data.results || data.jobs || [];
    all.push(...rows);
    const total = data.total_count ?? data.total ?? null;
    if (rows.length < c.perPage || (total !== null && all.length >= total)) break;
  }
  return all.map(normalize).sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
}

export async function fetchJob(cfg = {}, id) {
  const r = await fetch(`${base({ ...CONFIG, ...cfg })}/jobs/${id}`, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`Loxo ${r.status} for job ${id}`);
  return normalize(await r.json());
}

// fields: { name, email, phone, linkedin, resume: File|null } — Loxo requires name, email and phone
export async function apply(cfg = {}, id, fields) {
  const fd = new FormData();
  Object.entries(fields).forEach(([k, v]) => { if (v) fd.append(k, v); });
  const r = await fetch(`${base({ ...CONFIG, ...cfg })}/jobs/${id}/apply`, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
  if (!r.ok) { let msg = `Loxo ${r.status}`; try { const j = await r.json(); msg = j.error || j.errors?.join?.(', ') || j.message || msg; } catch (e) {} throw new Error(msg); }
  return r.json().catch(() => ({}));
}

export function normalize(j) {
  const city = j.city || (j.address && j.address.city) || '';
  const state = j.state_code || j.state || '';
  const remote = !!(j.remote_work_allowed || j.remote || /remote/i.test(j.macro_address || '') || (j.job_type && /remote/i.test(j.job_type.name || '')));
  const place = j.macro_address || [city, state].filter(Boolean).join(', ') || (j.country_code && j.country_code !== 'US' ? j.country_code : '');
  const location = place ? (remote ? `${place} or remote` : place) : (remote ? 'Remote' : 'Location on request');
  const type = (j.job_type && j.job_type.name) || j.job_type_name || '';
  const cats = (j.categories && j.categories.map(c => c.name)) || (j.category && [j.category.name]) || [];
  const descHtml = sanitize(j.description || j.public_description || '');
  const company = (j.company && !j.company.hidden && j.company.name) || j.company_name || '';
  const publishedAt = Date.parse(j.published_at || j.created_at || '') || 0;
  return {
    id: String(j.id), loxoId: j.id,
    title: j.published_name || j.title || 'Untitled role',
    company, companyLabel: company || 'Confidential search',
    location, region: city || (remote ? 'Remote' : ''), remote,
    type, area: cats[0] || type || 'Open role', tags: cats,
    comp: formatSalary(j),
    publishedAt, posted: timeAgo(publishedAt),
    summary: excerpt(descHtml, 170),
    descHtml, hasDesc: descHtml.trim().length > 0,
    url: j.public_url || `https://${CONFIG.domain}/${CONFIG.slug}`,
    live: true
  };
}

// Sample-data shape (jobs.json) → same contract as normalize()
export function fromSample(j) {
  const sections = [];
  if (j.about) sections.push(`<h3>About the company</h3><p>${esc(j.about)}</p>`);
  if (j.responsibilities) sections.push(`<h3>What you'll own</h3><ul>${j.responsibilities.map(r => `<li>${esc(r)}</li>`).join('')}</ul>`);
  if (j.looking) sections.push(`<h3>Who we're looking for</h3><ul>${j.looking.map(r => `<li>${esc(r)}</li>`).join('')}</ul>`);
  const descHtml = sections.join('');
  return { ...j, id: String(j.id), loxoId: null, companyLabel: j.company, type: j.stage, tags: [j.area], publishedAt: 0, descHtml, hasDesc: true, url: '', live: false };
}

export function formatSalary(j) {
  const s = j.salary ?? j.compensation ?? j.salary_range;
  if (!s) return '';
  if (typeof s === 'number') return '$' + s.toLocaleString('en-US');
  const str = String(s).trim();
  if (!str || /^0+$/.test(str)) return '';
  return /^\d+(\.\d+)?$/.test(str) ? '$' + Number(str).toLocaleString('en-US') : str;
}

export function timeAgo(ts) {
  if (!ts) return '';
  const d = Math.max(0, Date.now() - ts), day = 864e5;
  if (d < day) return 'Today';
  const days = Math.floor(d / day);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  const w = Math.floor(days / 7);
  if (days < 30) return w === 1 ? '1 week ago' : `${w} weeks ago`;
  const m = Math.floor(days / 30);
  if (days < 365) return m === 1 ? '1 month ago' : `${m} months ago`;
  return 'Over a year ago';
}

export function sanitize(html) {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstElementChild;
  root.querySelectorAll('script,style,iframe,object,embed,link,meta,img,svg').forEach(n => n.remove());
  root.querySelectorAll('*').forEach(n => {
    [...n.attributes].forEach(a => { if (!/^(href|target|rel)$/i.test(a.name)) n.removeAttribute(a.name); });
    if (n.tagName === 'A') { n.setAttribute('target', '_blank'); n.setAttribute('rel', 'noopener'); }
    if (/^(P|DIV|LI|SPAN)$/.test(n.tagName) && !n.textContent.replace(/\u00a0/g, '').trim() && !n.querySelector('br,ul,ol')) n.remove();
  });
  return root.innerHTML;
}

export function excerpt(html, max) {
  const el = document.createElement('div'); el.innerHTML = html;
  const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' '))).replace(/[,;:]$/, '') + '…';
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
