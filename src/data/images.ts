// Registry of every image on the site, keyed by name. A `src: undefined`
// entry renders a styled on-brand placeholder (via Figure.astro) instead of
// a broken image — see PLAYBOOK.md §3 and §6.
import type { ImageMetadata } from "astro";
import logoMark from "../assets/brand/logo-mark.png";
import logoMarkReversed from "../assets/brand/logo-mark-reversed.png";

export type ImageKind = "garden" | "planting" | "crew" | "property" | "detail";

export type ImageEntry = {
  src: ImageMetadata | undefined;
  alt: string;
  label: string;
  kind: ImageKind;
};

export const brand = {
  logoMark: {
    src: logoMark,
    alt: "Emergence Landscape Horticulture logo mark",
  },
  logoMarkReversed: {
    src: logoMarkReversed,
    alt: "Emergence Landscape Horticulture logo mark, light variant for dark backgrounds",
  },
};

// TODO: every entry below is a placeholder — no real job photos have been
// supplied yet (see DISCOVERY.md). Replace `src: undefined` with a real,
// EXIF-stripped photo as they come in; the label/kind stay as a content
// brief for what should go there.
export const images: Record<string, ImageEntry> = {
  hero: {
    src: undefined,
    alt: "A recently designed and planted garden bed on a North Shore property",
    label: "TODO: hero photo — a real finished garden/planting job, wide shot",
    kind: "garden",
  },
  proof: {
    src: undefined,
    alt: "Close-up of healthy planting installed by Emergence",
    label: "TODO: a close-up plant/planting detail shot showing quality of work",
    kind: "planting",
  },
  about: {
    src: undefined,
    alt: "The Emergence crew at work on a property",
    label: "TODO: a real photo of the crew or owner on a job site",
    kind: "crew",
  },
  gallery1: {
    src: undefined,
    alt: "Before and after of a garden bed redesign",
    label: "TODO: gallery photo 1 — a completed install or redesign",
    kind: "property",
  },
  gallery2: {
    src: undefined,
    alt: "A maintained garden border",
    label: "TODO: gallery photo 2 — seasonal maintenance result",
    kind: "detail",
  },
  gallery3: {
    src: undefined,
    alt: "A landscaped front yard",
    label: "TODO: gallery photo 3 — a full-property shot",
    kind: "property",
  },
};
