# Foundr Design System

Foundr is a recruiting firm for venture capital — placing exceptional operators and engineers inside venture-backed companies "quickly, quietly, and with conviction." The brand is minimal, editorial, black-and-white with a single electric blue accent (#5271FF) and the signature blue dot from the wordmark "foundr."

**Sources provided**:
- www.foundr.xyz — live marketing site (content basis for the Website UI kit)
- `uploads/deck.pdf` — internal pitch deck (foundr.xyz Deck (8)); `uploads/onboarding.pdf` — Onboarding Blueprint. Extracted assets in `assets/` (gradient blobs, client logos)
- Attached local folders (read-only):
- `assets/` — logo suite (wordmark black/white, monogram, dot), 7 community/event photos
- `tokens/` — pre-authored token CSS (colors, typography, spacing, fonts, base)
- `guidelines/` — 12 specimen cards (brand, colors, type, spacing)
- `uploads/` — raw logo exports and original photography (DSC*.jpg)

No product codebase or Figma was provided — components below are a standard set authored to the brand's foundations (see "Intentional additions"). The Website UI kit is recreated from live-site content; its raw CSS was not accessible, so layout values are token-derived.

## CONTENT FUNDAMENTALS

Voice: **Direct · Bright · Human.**
- Direct: "We found your next CTO." — never "Leveraging our network…"
- Bright: "Great teams start with one hire." — never "Revolutionary platform!"
- Human: "Meet the people building what's next." — never "Access top-tier human capital."

Rules:
- First person plural ("We") speaking to "you". Short declarative sentences.
- Sentence case everywhere except the 11px tracked-caps label style (`--fs-label`, 0.25em tracking, uppercase).
- The wordmark is always lowercase: **foundr.** — the period is part of the mark, rendered in Foundr Blue on light surfaces.
- Display headlines may end with a blue period as brand punctuation ("Bold ventures<span blue>.</span>").
- No emoji. No exclamation marks. No jargon ("human capital", "leverage", "synergy").

## VISUAL FOUNDATIONS

- **Color**: Ink #000000, Paper #FFFFFF, Foundr Blue #5271FF (hover #3D5CF0, soft rgba(82,113,255,.12)). Gray ramp 50–800 for text/borders. Usage ratio ≈ Paper 55% / Ink 37% / Blue 8% — blue is punctuation, never a field.
- **Type**: Archivo for everything (display 48/600/-0.02em, headline 26/500, title 16/600, body 15/1.6, small 13, caption 12, label 11 caps tracked 0.25em). League Spartan Bold is the wordmark face ONLY — never running text. Both loaded from Google Fonts (`tokens/fonts.css`); Canva source face for the wordmark was League Spartan.
- **Spacing**: 4-based scale `--sp-1`(4)…`--sp-8`(64).
- **Radius**: 4px default, 6px overlays, pill 999px for tags only. Corners stay tight — nothing bubbly.
- **Borders & shadows**: hairline #EEEEEE, strong #E5E5E5. Whisper card shadow `0 1px 3px rgba(0,0,0,.06)`; overlay `0 12px 40px rgba(0,0,0,.18)`. No inner shadows.
- **Backgrounds**: flat Paper or gray-50 panels; full-bleed Ink sections for contrast moments. In decks and hero moments only: soft blue→purple gradient blobs (`assets/gradient-blob-1/2.png`) floated behind content at reduced opacity — never as UI surface fills.
- **Tagline**: "CONNECTING THE BRIGHTEST MINDS WITH THE BOLDEST VENTURES" — tracked caps, used as a running header/footer line on slides.
- **Editorial italics**: display headlines emphasize 1-2 words in italic ("the brightest *minds*"); sections are numbered ("01 / Services"); labels use ◆ and ● markers; marquee tickers list open roles.
- **Photography**: candid, natural light, real community/event shots — never stock, never filtered. Warm and human. 4px radius crop.
- **Motion**: 150ms, cubic-bezier(0.2,0,0,1). Fades and small translates only — no bounces.
- **Hover**: darken (blue→#3D5CF0; ink links stay ink; gray surfaces→gray-100). **Press**: no shrink; darken one more step.
- **Focus**: 3px soft-blue ring `--focus-ring`.
- **Cards**: Paper, hairline border, 4px radius, whisper shadow. No colored left borders, no gradients.
- **Transparency/blur**: none in the brand kit — solid surfaces only.

## ICONOGRAPHY

No icon set ships with the brand sources — no icon font, sprite, or SVG library was provided. Approach:
- The **blue dot** (`assets/dot.png` or a plain blue circle) is the primary graphic mark — bullets, accents, status.
- Unicode glyphs (→ · ×) serve as functional icons in components.
- If a fuller set is ever needed, use a thin-stroke geometric set (e.g. Lucide via CDN) — **substitution, not brand canon**; flag it.
- Logo suite: `assets/logo-black.png`, `logo-white.png` (reverse), `logo-on-white.png`, `monogram.png` (f. for small sizes), `dot.png`. Clearspace = one dot-diameter; minimum wordmark 96px/25mm, monogram 24px/7mm.

## Intentional additions

No source defined a component inventory, so a standard set was authored against the foundations: Button, IconButton, Input, Select, Checkbox, Radio, Switch, Card, Badge, Tag, Tabs, Dialog, Toast, Tooltip. Treat as house style, not recreations.

## Index

- `styles.css` — global entry; imports `tokens/*.css`
- `tokens/` — colors, typography, spacing, fonts, base element styles
- `guidelines/` — 15 specimen cards (Brand, Colors, Type, Spacing groups)
- `assets/` — logos, dot, gradient blobs, photography; `assets/clients2/`, `assets/clients3/` — client logos; `assets/vc/` — venture fund logos
- `components/forms/` — Button, IconButton, Input, Select, Checkbox, Radio, Switch
- `components/display/` — Card, Badge, Tag
- `components/feedback/` — Tabs, Dialog, Toast, Tooltip
- `templates/foundr-deck/` — Foundr Deck template (21 slide layouts: covers, agenda, dividers, stats, KPI dashboards, photo layouts, logo walls, quote, closer)
- `thumbnail.html` — homepage tile
- `SKILL.md` — agent-skill entry point
