# Handoff: Foundr marketing site + live jobs (Loxo)

## Overview
Four-page marketing site for foundr, a recruiting firm for venture-backed companies: Home, Jobs, Services, Contact. The Jobs page and the home-page roles ticker read live roles from Loxo (the firm's ATS) through a small proxy, with inline application submission. Everything else is static content.

## About the design files
The `.dc.html` files in this bundle are **design references built in HTML**: working prototypes that show the intended look and behaviour. They are not production code to copy verbatim. The task is to **recreate these designs in the target codebase's environment** (Next.js/React, Astro, plain HTML, whatever the site runs on) using its established patterns. If no codebase exists, Next.js (App Router) on Vercel or Cloudflare Pages is a sensible default: static pages, one serverless route for the Loxo proxy.

Two files are **meant to be used as-is**, not recreated:
- `loxo-proxy.worker.js` — the Cloudflare Worker proxy. Deploy it directly, or port its logic 1:1 to a Next.js route handler / serverless function.
- `loxo.js` — the browser-side Loxo client (fetch, normalise, sanitise, apply). Framework-agnostic ES module; import it or lift its functions.

## Fidelity
**High-fidelity.** Colours, type, spacing, copy, interaction timing and responsive behaviour are final. Recreate pixel-accurately.

## Design system
Archivo (Google Fonts) for everything. League Spartan Bold appears only inside the wordmark PNG. Load:
`https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;1,500&display=swap`

Tokens:
- Ink `#000000`, Paper `#FFFFFF`, Foundr Blue `#5271FF`, Blue hover `#3D5CF0`, Blue soft `rgba(82,113,255,.12)`
- Grays: `#FAFAFA` panel, `#F5F5F5` hover surface, `#EEEEEE` hairline border, `#E5E5E5` strong border, `#BBBBBB` hover border, `#999999` muted on ink, `#777777` secondary text, `#555555` body-secondary, `#333333` rich-text body
- Radius: 4px default, 6px cards/overlays, 50% dots
- Shadows: whisper `0 1px 3px rgba(0,0,0,.06)`, overlay `0 12px 40px rgba(0,0,0,.18)`
- Motion: `cubic-bezier(.2,0,0,1)`; 150ms colour/border, 200ms shadow, 250ms icon rotate, 300–350ms drawer, 550ms card flip, 600–800ms reveals. Fades + small translates only. Everything respects `prefers-reduced-motion: reduce` (animations and transitions off).
- Focus ring: `0 0 0 3px rgba(82,113,255,.12)` + border `#5271FF`
- Type scale (Archivo):
  - Display h1: `clamp(40px,6vw,72px)` / 1.04 / -0.03em / 600; one italic word in Blue weight 500; ends with a Blue dot (`.17em` circle, `margin-left:.07em`)
  - Section h2: `clamp(28px,4.5vw,34px)` / 1.15 / -0.02em / 600
  - Card title: 20px / 1.2 / -0.015em / 600 (open role: `clamp(24px,4vw,30px)`)
  - Lead: `clamp(16px,2vw,18px)` / 1.55 / `#555555`
  - Body: 15px / 1.6; Small 14px; Caption 13px; Meta 12px
  - Label: 11px / uppercase / `letter-spacing:.25em` / 500 / `#777777` (Blue when it's the page eyebrow). Prefixed with `◆` or `●`.
  - Chip: 11px / uppercase / `.12em` / 500
- Layout: content column `max-width:1080px`, `padding:0 24px`. Section bottoms 96px. Nav 22px vertical padding, logo 32px tall.
- Copy voice: sentence case, first person plural, no exclamation marks, no emoji. Wordmark always lowercase "foundr." with the period in Blue.

## Shared chrome (all pages)

**Nav** — 1080 column, flex space-between. Left: `assets/logo-black.png` at 32px height, links Home. Right: 44×44 ghost button (hover `#F5F5F5`, radius 4) containing three 6px Blue dots in a row, gap 5px. On hover/focus the dot row rotates 90° (250ms). Click opens the drawer. `aria-expanded` bound.

**Drawer** — fixed, `top:88px`, right-aligned to the content column (`right:max(24px, calc((100vw - 1080px)/2 + 24px - 48px))`), z-index 50, transparent full-screen scrim behind it (z 40) that closes on click. Links stacked right-aligned: Home, About (`/#services`), Jobs, Services, Team (`/#team`), Contact; 28px / 1.1 / -0.02em / 600, 8px vertical padding, gap 4. Current page in Blue. Hidden state: `opacity:0; translateY(-8px); pointer-events:none`; shows with 300ms opacity + 350ms transform. Escape closes. ≤640px: scrim becomes `rgba(255,255,255,.94)`, drawer spans `left:24px; right:24px`, left-aligned, links 36px with 10px padding.

**Footer** — `margin-top:clamp(72px,12vw,120px)`, `padding:32px 24px 40px`, top hairline `#EEEEEE`, flex space-between wrap. Logo at 18px, tagline label "Connecting the brightest minds with the boldest ventures" (11px tracked caps, centred), "© 2026 foundr" 13px `#777777`. ≤640px: column, left-aligned, gap 14.

**Page header** (Jobs, Services, Contact) — `padding:clamp(48px,8vw,72px) 24px clamp(40px,6vw,56px)`; Blue eyebrow label with ◆, 24px below it the display h1 (`max-width:880px`), 28px below a lead paragraph (`max-width:560px`).

**Scroll reveal** — sections with `data-reveal` start `opacity:0; translateY(24px)` and transition in (700ms) when they enter the viewport (IntersectionObserver, threshold ~0.15, once).

## Screens

### 1. Home (`Foundr Landing.dc.html`)
Sections in order (see `data-screen-label` in the file): Hero → Open roles ticker → Trusted-by logo wall → 01 Profiles → 02 Services → Community → 03 Engage → 04 Founders → Team → Footer. All content, copy, and per-section layout values are in the file; the pieces that need explanation:

**Open roles ticker** — pulls from Loxo (first 12 published roles), falls back to `jobs.json`. Horizontal marquee: cards 280×168, gap 16, `width:max-content` track animated `translateX(0 → -50%)` linearly over `jobs.length × 7s`, infinite (the list is rendered twice for a seamless loop). Side fades via mask `linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)`. Pauses on hover of the row. Each card is a 3D flip (`perspective:1000px`, 550ms): front is Paper, border `#E5E5E5`, radius 6, whisper shadow, padding 20, company as Blue 11px label at top, title 18px/600 + location 13px `#777777` at bottom; back is Ink with white 14px summary and a "View role →" link to `/jobs#role-<id>`. Flip on hover, toggle on click (touch).

**Trusted-by wall** — 6 slots (4 on tablet, 3 on phone), 27 client logos from `assets/clients/`, max 28px tall and 80% slot width, grayscale. Every 3.4s all visible logos slide up together (800ms) and the next set slides in from below. Pauses on hover; disabled under reduced motion.

**01 Profiles** — five "Talent you can trust" cards (Engineering, Security, AI/ML, Forward Deployed, GTM) with dot-matrix icons on `#FAFAFA` tiles and one Blue focal dot. Cards stack; hovering brings a card to front with the overlay shadow (no layout push). Collapse only when the pointer leaves the whole stack.

**Team** — row of member cards; hovered card widens (328px) and reveals bio; siblings shrink to 164px. Collapse only when pointer leaves the entire row.

### 2. Jobs (`Jobs.dc.html`)
Purpose: browse live roles, open one in place, apply inline.

**Header** — eyebrow "◆ Open roles"; h1 "Make your next move in the *frontier*." (frontier italic Blue); lead "Every role here is live and run by foundr. One application, and we handle the rest."

**Filter bar** — `padding:24px 0`, top border `#E5E5E5`, bottom `#EEEEEE`, flex wrap, gap `24px clamp(24px,5vw,48px)`.
- Search (full width row): label "Search"; input 44px tall, `max-width:480px`, padding `0 44px 0 14px`, border `#E5E5E5` radius 4, 15px, placeholder "Role, company, skill or city"; focus = Blue border + soft ring. A 36×36 "×" clear button appears at right when non-empty.
- Location chips (only if >1 distinct value): "All", then up to 7 cities by frequency, then "Remote" if any role is remote. Practice chips: "All" + up to 7 categories by frequency. Chips: 30px tall, `padding:0 12px`, radius 4, 11px tracked caps; off = Paper / `#555555` / border `#E5E5E5`; on = Ink bg / Paper text / Ink border. ≤640px or coarse pointer: 44px tall, 12px text.
- Right-aligned count "**N** open roles" (13px, tabular nums) with a Blue "Clear" text button when any filter is active.

**Roles grid** — `grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))`, gap 16, `align-items:start`, `padding-top:32px`.
- Loading: 6 skeleton cards (border `#EEEEEE`, `#F5F5F5` blocks) pulsing 1.6s with 120ms stagger.
- Closed card: Paper, border `#E5E5E5` (hover `#BBBBBB`), radius 6, whisper shadow, padding `clamp(18px,3vw,24px)`, cursor pointer. Top row: neutral Badge (job type or practice) + posted-ago 12px `#777777`. Title 20px (margin-top 20). "Company · Location" 14px `#777777` (margin-top 8). Summary 15px/1.6 `#555555` (margin-top 16). Bottom row (margin-top 22, padding-top 16, hairline): practice label + Blue "View role →". Cards fade/rise in on first load (600ms, 60ms stagger, max 12).
- Open card: spans all columns, border Ink, overlay shadow, padding `clamp(20px,4vw,32px)`, title grows to `clamp(24px,4vw,30px)`, a 40px ghost IconButton "×" top-right. Summary 17px/1.55 Ink `max-width:720px`. Below a hairline (margin-top 36, padding-top 32), two-column grid `repeat(auto-fit,minmax(min(100%,300px),1fr))` gap 48:
  - Left: rich description (sanitised HTML; styles in the `[data-rich]` block of the file: 15px/1.6 `#333333`, headings rendered as 11px tracked-caps labels, bullets as 6px Blue dots, links Blue underlined). Then a meta row (Compensation / Practice / Type) when present.
  - Right: Apply panel, `#FAFAFA`, border `#EEEEEE`, radius 6, padding 24, `align-self:start`. Label "Apply", sub "Two minutes. We read every one." Inputs (Name, Email, Phone, LinkedIn), résumé drop (44px dashed border `#E5E5E5`, Blue "Attach"/"Replace", accepts .pdf/.doc/.docx), primary Button "Send application →" (full width, 40px; "Sending…" while posting). Validation on submit: name required, valid email, phone ≥7 digits (Loxo requires phone). Error copy: "Add your name", "Add a valid email", "Add a phone number". On failure: "We couldn't send that just now. Apply on Loxo →" (13px). Success replaces the panel: 10px Blue dot, "Application sent." 20px/600, "We'll read it and come back to you within two working days."
- Opening a card: sets `#role-<id>` in the URL (replaceState), scrolls the card to centre (or top with 24px margin if taller than viewport), fetches the full description if the list payload lacked it. Closing clears the hash. Escape closes. Deep link `/jobs#role-<id>` opens that role on load.
- Empty: "No open roles right now." or "No roles match those filters." (20px/600 + Blue dot), "New searches open every week." 15px, Blue "Clear filters →" when filtered.
- Notice (when live fetch fails): 6px Blue dot + "Live roles are unavailable right now — showing sample roles." 13px `#777777`; with `fallback: message` the notice reads "Live roles are unavailable right now." plus "See them on Loxo →".

### 3. Services (`Services.dc.html`)
Header eyebrow "◆ What we do · 3 engagement models", h1 with italic Blue word. Three alternating image/text sections (`#contingent`, `#embedded`, `#retained`): grid `repeat(auto-fit,minmax(min(100%,280px),1fr))`, gap `40px clamp(32px,6vw,64px)`, image 4:5 `object-fit:cover` radius 4 (image side alternates; on ≤640px image goes 4:3 and always first). Closer section with h2 and CTA. Copy in file.

### 4. Contact (`Contact.dc.html`)
Header eyebrow "◆ Get in touch". Two-column grid `minmax(0,5fr) minmax(0,4fr)` with hairline across the top; left is the form (rows collapse to one column ≤640px), right is an aside with contact details. Submit shows an inline confirmation (`feedIn` 10px rise). ≤760px: single column, aside moves below. Copy and field list in file.

## Loxo integration (the part that is not just visual)

Architecture: browser → proxy (holds API key, adds CORS) → `https://app.loxo.co/api/{agency_slug}/...` with `Authorization: Bearer <key>`. Loxo blocks direct browser calls, so the proxy is mandatory. Full setup in `LOXO.md`.

Endpoints the site uses (via proxy):
- `GET /jobs?page&per_page=100&published_at_sort=desc` → proxy adds `published=true&status=active&serialization_set=api_row_job_with_description`, filters/strips fields, caches 60s. Response `{results, total_count, current_page, per_page}`.
- `GET /jobs/:id` → single job with description (used when a list row lacks one). Cache 120s.
- `POST /jobs/:id/apply` multipart: `name`, `email`, `phone` (all required by Loxo), `linkedin`, `resume` (file).

Normalisation (`loxo.js → normalize()`), reused verbatim:
- `title` = `published_name || title`
- `company` = `company.name` unless hidden; label falls back to "Confidential search"
- `location` = `macro_address || "City, ST"`; append " or remote" if `remote_work_allowed`; "Remote" if no place; "Location on request" if nothing
- `area` (practice) = first category name, else job type, else "Open role"; `tags` = all category names
- `comp` = `salary` formatted `$1,234` if numeric, else as-is; empty if 0/blank
- `posted` = relative ("Today", "3 days ago", "2 weeks ago", "1 month ago", "Over a year ago") from `published_at || created_at`
- `descHtml` = sanitised description (strip script/style/iframe/img/svg and all attributes except href/target/rel; links `target=_blank rel=noopener`; drop empty paragraphs)
- `summary` = first ~170 chars of description text, cut at sentence/word, "…"
- `url` = `public_url` or the agency careers page

Config: `CONFIG.endpoint` (proxy URL), `CONFIG.slug` (agency slug), `CONFIG.domain`. Both pages also accept `loxoEndpoint`/`loxoSlug` overrides.

Fallbacks: if the proxy is unreachable or returns no roles, both pages show `jobs.json` (sample roles, same normalised shape via `fromSample()`), and the Jobs page shows the notice above. `source: 'sample'` forces sample data; `fallback: 'message'` shows a notice instead of sample roles. `applyMode: 'loxo'` replaces the inline form with a Button that opens the Loxo job page.

Loxo-side: a role appears only if Active + Job Board Publishing on + publish start date in the past + no past end date.

## State (Jobs page)
`jobs[]`, `loaded`, `source` ('loxo'|'sample'), `error`, `loc`, `area`, `query`, `open` (role id|null), `fetching` (id|null), `navOpen`, `form {name,email,phone,linkedin,resume}`, `sent {id:true}`, `sending` (id|null), `applyError`, `tried` (validation shown). Filters reset `open`. Changing endpoint/slug/source reloads.

## Assets
- `assets/logo-black.png` — wordmark (nav 32px, footer 18px)
- `assets/dot.png` — Blue dot
- `assets/clients/*.png` — 27 client logos (grayscale in the wall)
- `assets/photo-*-web.jpg` — community photos, web-optimised; `assets/service-{1,2,3}-tall.jpg` — Services page portraits
- `jobs.json` — 10 sample roles for the fallback
- LlamaIndex logo in `assets/clients/` is low-res; replace with a 300px+ or SVG version when available.

## Files
- `Foundr Landing.dc.html`, `Jobs.dc.html`, `Services.dc.html`, `Contact.dc.html` — the four pages (markup + inline styles + logic class at the bottom of each)
- `loxo.js` — Loxo client module (use as-is)
- `loxo-proxy.worker.js` — Cloudflare Worker proxy (deploy as-is or port)
- `LOXO.md` — proxy setup steps and Loxo publishing checklist
- `jobs.json` — sample roles
- `assets/` — images
- `_ds/` — Foundr design-system tokens (`tokens/*.css`) and the `styles.css` entry; component bundle used by the prototypes for Button/Input/Badge/IconButton. Recreate those four with the codebase's own primitives using the token values above.
