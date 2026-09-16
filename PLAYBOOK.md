# Small-business website build playbook

Distilled from building the Savanna Roofing site (Astro, GitHub Pages,
dark-editorial redesign, third-party booking embed). Feed this to a fresh
Claude Code session along with the new business's info and it should follow
the same process. It's a process doc, not a template — there's no code to
copy-paste, just the sequence of decisions and the guardrails that kept the
build honest and shippable.

---

## 0. Environment setup (one-time, or per fresh session)

If the session doesn't already have design/motion skills installed, run:

```
npx skills add pbakaus/impeccable
npx skills add <a taste/design-system skill repo>
npx skills add <a frontend-design skill repo>
npx skills add emilkowalski/skills
```

That last one is the important one — it's a bundle that includes `animate`,
`animation-vocabulary`, `apple-design`, `review-animations`,
`improve-animations`, and several others. In practice, the skill actually
invoked mid-build was **`animate`** — call it explicitly (via the Skill tool)
once you reach the motion/interaction pass, and hand it a concrete brief:
what kind of scene, what should move, what framework. It has a hard gate
("should this even animate?") and decision tables for easing/duration — don't
skip it and hand-roll motion values from memory.

Not every installed skill gets invoked every build. Treat the roster as a
toolbox, not a checklist to exhaust.

---

## 1. Discovery — before writing any code

Pull every real fact you can from what the client actually gave you (a
Facebook post, a logo, a screenshot, a phone number they said out loud). Then
draw a hard line:

- **Confirmed facts** get used verbatim, and get a `(confirmed)` comment
  next to them in the data file, ideally citing the source.
- **Everything else is a `TODO:`** — realistic enough to demo, never
  presented as true. This includes: phone numbers, addresses, credentials/
  licensing claims, years-in-business, testimonials, review counts.

Two facts worth over-engineering for:

- **Placeholder phone numbers use the reserved fictional range** (`555-01XX`
  in North America) so a template can never accidentally dial a real
  stranger if it leaks into production.
- **Never fabricate testimonials or ratings.** Publishing invented reviews
  for a real business is deceptive advertising in most jurisdictions
  (Competition Act s.74.01 in Canada, FTC rules in the US). Render sample
  testimonials with a visible "sample" badge instead, or omit the section
  until real ones exist. Same logic for `aggregateRating` in JSON-LD — never
  emit one until there's a real first-party rating to back it.

Write this all down in a `DISCOVERY.md`: confirmed vs. open, split into
"blocking launch" and "nice to have." It becomes the launch checklist.

---

## 2. The core argument

Before any layout work: **what's the one thing this business can say that
its competitors can't or won't?** For the roofing site it was "we attend
active leaks during heavy rain — everyone else says call back when it dries
out." That line became the hero headline, the first and widest block in the
services section, and the name of a whole page section. Everything else is
secondary to landing that one argument in the first viewport.

If the client hasn't told you this explicitly, look for it in whatever raw
material they gave you (an old ad, a Google review, an offhand comment) —
it's usually sitting there unexploited.

---

## 3. Content architecture: one data file, dumb components

Structure: `src/data/site.ts` (and `images.ts` for the asset registry) is
the **single source of truth**. Every component imports from it; no copy or
numbers get hardcoded inside a component. The payoff: a content change never
touches a `.astro` file, and a design change never touches content.

```
src/data/site.ts      -> contact info, services, hours, testimonials, CTAs
src/data/images.ts     -> every image on the site, keyed by name, with a
                           styled placeholder fallback when src is undefined
src/components/*.astro -> pure presentation, reads from the data files
```

Each image entry looks like:
```ts
hero: {
  src: undefined, // TODO: description of what should go here
  alt: "...",
  label: "...",
  kind: "roof" | "crew" | ...,
}
```
Undefined `src` renders an on-brand gradient placeholder (via a shared
`Figure.astro`) instead of a broken image — the site never looks broken
mid-build, it looks intentionally unfinished.

---

## 4. Design tokens — derive the palette from the brand, then stress-test it

1. Pull the brand's actual colors from their logo (sample real pixels, don't
   eyeball hex codes).
2. **Run a contrast check before committing to a light or dark page.** This
   is the single highest-leverage step in the whole build. On the roofing
   site the brand gold scored 2.3:1 on white (fails as text, fill-only) but
   6.5:1 on near-black (works as headlines, CTAs, numerals). That one check
   decided the entire page was dark-mode-first, not a stylistic preference.
3. Write the decision down as a rule in `tokens.css`, not just as values:
   *"gold is a fill on light grounds, text-and-fill on dark grounds, never
   white text on gold."* Future edits (yours or a teammate's) need the
   reasoning, not just the numbers.
4. Typography: prefer one variable font family that covers both the display
   and body use case (a width-axis variable font gives you a condensed
   poster face and a normal-width UI face from one download instead of two
   unrelated fonts).
5. Document the whole system in a `DESIGN.md`: palette table with contrast
   ratios, type scale, spacing scale, motion tokens, and an explicit
   Do/Don't list of the category clichés to avoid (for roofing: navy-and-red
   contractor palette, shield crests, urgency-theatre banners; the
   equivalent list will be different for every category — spend five
   minutes naming the visual clichés of *this* business's category before
   designing, so you actively design away from them).

---

## 5. Section order = sales funnel, not a feature list

A reasonable default order, adapted per business:

1. **Hero** — the core argument (§2), one primary CTA, real place-names if
   there's a service area.
2. **Trust/stat band** — only *confirmed* numbers. No invented "18+ years."
3. **Services**, ordered by what the customer is thinking, not by internal
   trade categories — the highest-intent need first and given the most
   visual weight.
4. **Proof** — the differentiator explained in more depth, plus
   testimonials (real, or visibly marked as samples).
5. **About** — who they are, in their own words if possible.
6. **Work/gallery** — real photos if available (see §6); real work beats
   generated imagery for a trade business every time.
7. **Contact/quote** — the actual conversion point. See §8 for how to keep
   this from being a silent dead end.
8. **Footer** — logo, contact, service area, socials.

---

## 6. Working with the client's real assets

Real photos and logos beat AI-generated ones for a local business — a
customer recognizing their own street, or a logo they already trust,
outweighs generation quality every time. Also: **check the sandbox's
network policy before assuming you can generate or fetch images.** Many
build environments block general internet egress (stock photo sites, image
APIs) even though they allow GitHub. Confirm this early rather than
discovering it mid-task.

**Logo extraction from a phone screenshot**, when that's all you have:
1. Detect the screenshot's own letterboxing (black bars) programmatically to
   crop to just the artwork — don't eyeball pixel coordinates.
2. Patch out any OS-injected UI (iOS Live Text glyph, etc.) that landed
   inside the crop.
3. Key the flat background color to transparency (sample it, don't guess
   it) so the logo works on any surface.
4. **Derive a reversed/knockout variant if the site has both light and dark
   sections.** Most small-business logos are designed for a light ground
   only; their dark elements vanish on a dark page. Separate "the dark
   parts" from "the brand colors" **by saturation, not lightness** — a
   colored element (like a green tree) can be nearly as dark as the
   charcoal you're trying to flip, so a luminance-only test corrupts it.
   Run a denoise pass first if the source is a compressed screenshot, or
   JPEG artifacts will speckle through as false positives.
5. Generate a proper favicon set from the extracted mark, not the platform
   default.

**Client job photos**, when supplied as phone screenshots: crop the
letterboxing the same way, and **strip EXIF metadata before publishing** —
camera originals carry GPS coordinates, and publishing a past customer's
home address as a "before/after" photo is a real privacy problem, not a
theoretical one.

---

## 7. Motion — gate everything, ship the fallback with the feature

Follow the `animate` skill's build sequence, don't shortcut it:

1. **Should this animate at all?** A control used 100+ times a day gets
   nothing. Marketing pages seen once or twice per visitor are where the
   "delight budget" legitimately lives — but delight still never delays
   interaction or gates content.
2. **Name the purpose** (feedback / spatial continuity / state change /
   explanation / delight) before writing a line of CSS.
3. **Cheapest tool that works** — CSS transition, then `@starting-style`,
   then CSS animation, then WAAPI, then a JS motion library, in that order.
   Don't reach for JS because it's familiar if CSS alone does the job.
4. **`transform`/`opacity` only** (plus `clip-path` as the one sanctioned
   extra) — anything else triggers layout/paint and drops frames.
5. **Every animation ships with its reduced-motion variant and its no-JS
   fallback in the same commit, not as a follow-up.** Concretely:
   - `prefers-reduced-motion` keeps the fades, drops every translate/rotate/
     loop/pointer-tracker.
   - Elements that reveal-on-scroll must be **fully visible by default** and
     only become hide-able once an inline script (that runs before first
     paint) confirms JS is actually running. A JS failure should show the
     whole page, never a blank one.
   - Hover-only motion is gated behind `(hover: hover) and (pointer: fine)`
     — touch fires a false hover on tap and leaves effects stuck mid-state.

**A specific bug worth knowing about in advance:** don't drive a
scroll-reveal by putting `clip-path` on the *same element* the
IntersectionObserver is watching. An element clipped to zero area reports an
intersection ratio of zero, so the observer never fires, so it's never
un-clipped — permanent chicken-and-egg. Put the clip on a wrapper and
transform the inner content instead.

**Sticky/transparent nav over a hero image:** if the nav pulls the hero up
underneath it (a negative `margin-bottom` trick) so it can sit transparently
over the photo, the hero's *own* top padding must independently guarantee it
clears the nav's height — don't let both rely on the same `vw`-based clamp.
A clamp that's fine on desktop can shrink below the nav's fixed height on
phones, and the headline renders behind the nav bar.

---

## 8. Lead capture must never fail silently

This is the throughline for every interactive element on a small-business
site: **a broken CTA costs the client a customer, invisibly.** Concretely:

- Don't build a `<form>` with no real submission endpoint. A form that posts
  into nothing silently swallows leads — the worst possible failure mode. If
  there's no endpoint yet, render the intake as a checklist + a real `tel:`/
  messaging link instead, and wire the actual form once an endpoint exists.
- Any button/link that's meant to trigger JS behavior (open a modal, open a
  booking widget) should still carry a **real, working `href`** as its
  underlying markup — `target="_blank"` to the destination it would
  otherwise open inline. JS then does `event.preventDefault()` and intercepts
  the click *only once it has confirmed the enhanced behavior actually
  works*. If JS fails to load, the visitor still lands somewhere useful
  instead of clicking a dead `<button>`.
- If you add a persistent "quote" or "contact" affordance (a modal, a widget),
  give it a phone/alternate-contact fallback one interaction away — a
  collapsed `<details>` under it is enough — for the case where the primary
  path breaks for some visitor for reasons you can't predict or test.

---

## 9. Third-party embeds (booking widgets, chat, forms)

1. **Get the exact slug/ID, and verify it against the actual routing path,
   not the display name.** Platforms commonly show a human-readable name in
   their dashboard ("My Business Name") while the real routing identifier is
   a slugified version ("my-business-name") — dots become hyphens, spaces
   get stripped, etc. If a widget mounts nothing and throws no visible
   error, mismatched slug/config is the first thing to check, ahead of
   assuming the vendor's script is broken.
2. **Confirm the script is even reachable** before debugging further: fetch
   the script URL directly in a browser. If it returns real JS, the network
   path and hosting are fine, and the problem is client-side config
   (unpublished, wrong slug, domain not authorized) rather than DNS/hosting.
3. **If a vendor's "floating launcher" script mounts nothing and you have no
   docs for its trigger API, don't guess at undocumented function names.**
   If the platform has a plain, linkable page for the same flow, iframe that
   directly instead — it's debuggable (you can literally open the URL and
   see what's there) in a way an opaque bundled script isn't.
4. **An always-visible iframe often looks wrong**, because the embedded
   page is virtually always built assuming it's the only thing on the
   screen (its own light-themed background, its own typography) and clashes
   with the host page's design system — a light form sitting permanently in
   a dark panel reads as "someone forgot to style this." Prefer opening it
   in a modal on demand:
   - Use the native `<dialog>` element — `showModal()` gives you a focus
     trap, an inert background, and Escape-to-close for free, so the only
     custom JS needed is a backdrop-click handler.
   - Lazy-load the iframe's `src` on first open, not on page load.
   - Animate the dialog's entrance/exit in pure CSS via `@starting-style` +
     `transition-behavior: allow-discrete` (this lets a *closing* dialog
     transition out through `display: none` with zero JS). Unsupported
     browsers just snap shut instead of animating — acceptable degrade, not
     broken.
5. Keep the fallback CTA (§8) even after the embed is confirmed working —
   you can't guarantee it stays reachable for every visitor forever.

---

## 10. Verify in a real headless browser, not just "the build succeeded"

A clean `astro build` / `npm run build` proves the code compiles; it proves
nothing about whether the page actually works. Before calling anything done:

- Screenshot at both a desktop and a phone viewport.
- Check for horizontal overflow at 360px width specifically (the narrowest
  common device).
- **Load the page with JavaScript disabled** and confirm all content is
  visible and every CTA still has a working `href`. This is the single
  fastest way to catch the "reveal system hides everything by default"
  class of bug.
- Check the browser console for errors, and the network tab for failed
  requests.
- If you added an interactive control (modal, disclosure, tab), actually
  click it in the automated browser and assert on the resulting DOM state —
  don't infer correctness from the code looking right.

If the sandbox/build environment has no general internet access, you can
still verify a third-party script won't *break* the page (simulate it being
unreachable, confirm no console errors and the rest of the page still
renders) even if you can't verify what the widget itself displays. Say so
explicitly rather than claiming full verification.

---

## 11. Git/deploy workflow

- One feature branch per change, PR opened with a clear test-plan checklist,
  merge only after the requester has actually looked (don't assume "build
  succeeded" is the same as "looks right" for anything involving layout or
  motion — screenshot it into the PR description).
- **Confirm the live site actually has a CI pipeline before assuming a merge
  goes live.** A repo can have a stale, manually-populated `gh-pages` branch
  from a previous ad-hoc deploy with no automation behind it — merging to
  `main` changes nothing until you either add a GitHub Actions workflow that
  rebuilds and republishes on every push, or you rebuild and push the
  static output by hand. Check for `.github/workflows/*.yml` before telling
  someone their change is live.
- **If the repo gets renamed, the GitHub Pages URL changes with it** — a
  project Pages site is always served at `<owner>.github.io/<repo-name>/`,
  which means the Astro `base` config, the canonical `site.url`, and any
  README references to the local dev URL all need to move together. Verify
  by grepping the whole repo for the old name after a rename, not just the
  config file you assume holds it.
- For truly tiny, already-confirmed-by-the-client fixes (a typo'd slug, a
  wrong URL) it's reasonable to skip the PR ceremony and fast-forward
  `main` directly — but default to the PR flow for anything that changes
  layout, content structure, or behavior.

---

## Quick-reference checklist for a new business

- [ ] Discovery doc: confirmed facts vs. TODOs, blocking vs. nice-to-have
- [ ] Identify the one differentiated argument this business can make
- [ ] Pull real brand colors, run a contrast check, decide light vs. dark
- [ ] Write `DESIGN.md` with the palette rule, type scale, category clichés
      to avoid
- [ ] `site.ts` / `images.ts` as the single content source
- [ ] Section order follows the sales funnel, highest-intent CTA first
- [ ] Extract and key real logo/photos if the client has them; strip EXIF
- [ ] Motion pass via the `animate` skill: gate, purpose, cheapest tool,
      reduced-motion + no-JS fallback shipped with each animation
- [ ] Every lead-capture control has a real `href` fallback under any JS
      failure
- [ ] Verify with a headless browser: phone + desktop, JS off, console
      clean, no 360px overflow
- [ ] Confirm CI actually deploys on merge before telling anyone it's live
