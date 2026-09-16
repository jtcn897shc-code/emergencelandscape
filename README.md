# Emergence Landscape Horticulture

Prototype marketing site for Emergence Landscape Horticulture, built with
[Astro](https://astro.build) and deployed to GitHub Pages.

Read **`PLAYBOOK.md`** for the build process this site follows,
**`DISCOVERY.md`** for what's confirmed vs. still open with the client, and
**`DESIGN.md`** for the palette/type/motion system and why it was chosen.

## Development

```sh
npm install
npm run dev       # local dev server
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
```

## Deployment

Pushing to `main` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. The site is served at
`https://<owner>.github.io/emergencelandscape/` — if the repo is ever
renamed, update `astro.config.mjs`'s `site`/`base` and this URL together.
