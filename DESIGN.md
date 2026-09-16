# Design system — Emergence Landscape Horticulture

## Palette

All colors below are sampled from real pixels in the client's logo
(`src/assets/brand/logo-mark.png`), not eyeballed. Contrast ratios are WCAG
relative-luminance calculations against each stated ground.

| Token | Hex | Sampled from | Role |
|---|---|---|---|
| `--color-bg` | `#F7F5EE` | derived (warm ivory, not pulled from logo) | page background |
| `--color-surface` | `#FFFFFF` | — | cards / panels on the ivory bg |
| `--color-sage-tint` | `#ECF0E3` | — | alternating section band |
| `--color-ink` | `#525253` | median of the logo's achromatic (charcoal) pixels | body text |
| `--color-headline` | `#2F4F0D` | median of the logo's darkest green pixels | headlines, emphasis |
| `--color-accent` | `#4F7825` | median of the logo's mid-tone green pixels | CTAs, links, icon fills, borders |
| `--color-dark` | `#1B2414` | derived (near-black, green-tinted) | footer / dark panels |

### The contrast check that decided this page is light-mode-first

This is the highest-leverage step (see `PLAYBOOK.md` §4). Both brand colors
were checked on a light ground and a dark ground:

| Pair | On ivory `#F7F5EE` | On dark `#1B2414` |
|---|---|---|
| Charcoal ink `#525253` | **7.15:1** (AAA) | 2.37:1 (fails) |
| Deep green `#2F4F0D` | **8.57:1** (AAA) | 1.98:1 (fails) |
| Mid green `#4F7825` | **4.76:1** (AA) | 3.09:1 (fails as text) |

Unlike the roofing-site precedent this playbook was distilled from (where the
brand gold only worked on near-black), **this brand's colors read clearly on
a light ground and fail on a dark one.** That decided it: the page is
light/editorial-first, not dark-mode-first. Copying the previous project's
dark aesthetic would have been a stylistic default, not a decision — the
numbers say otherwise here.

**Rule, not just values:** mid green (`#4F7825`) is text-and-fill on
white/ivory grounds, but fill-only (icons, borders, buttons ≥ large-text
size) on the sage tint band and on dark panels — it does not clear 4.5:1 on
either. Charcoal and deep green are never used as text on the dark footer
panel; use `--color-bg` (ivory) or white there instead (14.7:1 / 16:1).

### Logo hierarchy

The mark leads, not the name. In the nav the logo is set at `4rem` tall
(`3.1rem` on phones) with the wordmark reduced to a small, letterspaced,
muted line beneath it — roughly **3× the visual mass of the wordmark**,
asserted in the verification script so a future change can't quietly
reverse it. The footer mark is `11rem` wide for the same reason.

### Reversed logo

The logo's grey/charcoal leaf-half disappears on a dark ground (2.37:1,
same failure as charcoal text). `src/assets/brand/logo-mark-reversed.png` is
a knockout variant: the achromatic half is remapped to a light grey/white
band (its saturation classifies it as "the dark parts," not "the brand
colors" — the green half keeps its real color) so it stays legible on the
footer and any other dark panel. Use `logo-mark.png` on light grounds,
`logo-mark-reversed.png` on dark ones.

### Photography and overlay rules

The layout is photography-led: a full-bleed hero, a portrait proof shot, and
a feature work tile. Two rules keep text legible over images that will change
when real job photos replace the current stand-ins:

- **Hero scrim is directional, not a flat wash.** The copy sits bottom-left,
  so the darkening is weighted there (≈92% at the bottom edge) and falls off
  up and to the right, leaving sky and detail visible. It never drops below
  ~12%, so a bright photo can't wash the headline out. Measured against the
  current hero photo, the headline renders at **9.7:1**.
- **Glass captions only ever sit fully over a photo.** A translucent card
  that straddles the edge of an image reads muddy, because it's blending
  with two different grounds. A caption that overlaps the photo's edge uses
  the `solid` variant (opaque light card) instead — see
  `PhotoCaption.astro`. The dark glass is mixed at 72% so white text holds
  over a bright area of a photo, not just a dark one.

---

## Typography

A display/text **pair**, not one family. The playbook prefers a single
variable family, but a heavy grotesk reads industrial — wrong for a garden
brand — so the display voice is a serif and the sans is kept for text.

- **Display / headlines: Fraunces.** Variable, with the axes verified
  against the actual font binary rather than the CSS: `opsz 9–144`,
  `wght 100–900`, `SOFT 0–100`, `WONK 0–1`. Headlines run at a high optical
  size (`opsz 144`) for the tighter, higher-contrast display cut; smaller
  headings drop to `opsz 48` so they stay sturdy. `SOFT 20` softens the
  terminals slightly; `WONK 0` keeps the splayed novelty letterforms off.
- **Body / UI: Plus Jakarta Sans.** Variable `wght 400–800`. A clean
  geometric sans that stays readable at small sizes — nav, paragraphs,
  labels, buttons.

A serif needs different metrics than the grotesk the scale was first tuned
for: `--tracking-display` relaxed from `-0.032em` to `-0.015em` (a serif
does not want heavy negative tracking) and `--line-height-tight` opened from
`1.02` to `1.08` to clear its longer ascenders and descenders.

### Both fonts are self-hosted

`src/styles/fonts.css` + `src/assets/fonts/*.woff2` (latin and latin-ext
subsets). Reasons, in order of importance:

1. No third-party request — the page has **zero** external dependencies at
   runtime, and no failed request in any environment.
2. Font files are referenced by **relative** path so Vite fingerprints them
   and the site's base path is applied automatically. A hardcoded `/base/`
   would break silently on a repo rename (PLAYBOOK.md §11).
3. Declared `format("woff2")`, deliberately **not** the deprecated
   `format("woff2-variations")` — some browsers reject the latter outright
   and fall back to a system font. The variable axes still work.

Both families are SIL Open Font License, so self-hosting is permitted.

### Scale

| Token | Value |
|---|---|
| `--font-size-xs` | 0.8125rem |
| `--font-size-sm` | 0.9375rem |
| `--font-size-base` | 1.0625rem |
| `--font-size-lg` | 1.25rem |
| `--font-size-xl` | clamp(1.5rem, 1.3rem + 1vw, 1.875rem) |
| `--font-size-2xl` | clamp(1.875rem, 1.5rem + 2vw, 2.5rem) |
| `--font-size-3xl` | clamp(2.5rem, 1.8rem + 3.5vw, 4rem) |
| `--font-size-hero` | clamp(2.75rem, 1.8rem + 5vw, 5.5rem) |

---

## Spacing scale (4px base)

`--space-1` 0.25rem · `--space-2` 0.5rem · `--space-3` 0.75rem ·
`--space-4` 1rem · `--space-5` 1.5rem · `--space-6` 2rem ·
`--space-7` 3rem · `--space-8` 4rem · `--space-9` 6rem · `--space-10` 8rem

## Radii

`--radius-sm` 0.375rem · `--radius-md` 0.75rem · `--radius-lg` 1.5rem ·
`--radius-full` 999px

## Motion tokens

`--ease-standard` cubic-bezier(0.4,0,0.2,1) · `--ease-out`
cubic-bezier(0,0,0.2,1) · `--ease-in` cubic-bezier(0.4,0,1,1) ·
`--duration-fast` 150ms · `--duration-base` 250ms · `--duration-slow` 450ms

---

## Category clichés to design away from

Five minutes naming what every landscaping-company site defaults to, so we
actively avoid it:

- The "guy-with-a-truck" contractor palette: Home-Depot orange + forest
  green + brown, used by nearly every lawn-care franchise (TruGreen, Lawn
  Doctor, etc.). We go editorial/botanical instead — ivory, deep green,
  charcoal — closer to a garden-design studio than a franchise.
- Clip-art wheelbarrows, cartoon suns, leaf-shaped bullet icons on every
  single line item (the leaf is already the logo — it doesn't need to
  repeat as decoration everywhere).
- Bright red "FREE ESTIMATE!!" starburst badges and urgency-theatre banners.
- Stock photos of a diversity-cast crew lined up smiling straight at the
  camera holding tools.
- Overused before/after slider gimmicks with a harsh diagonal wipe.
- Generic sprinkler-on-a-suburban-lawn stock photography.
