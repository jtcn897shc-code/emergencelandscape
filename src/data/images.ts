// Registry of every image on the site, keyed by name. A `src: undefined`
// entry renders a styled on-brand placeholder (via Figure.astro) instead of
// a broken image — see PLAYBOOK.md §3 and §6.
import type { ImageMetadata } from "astro";
import logoMark from "../assets/brand/logo-mark.png";
import logoMarkReversed from "../assets/brand/logo-mark-reversed.png";
import heroSunsetGarden from "../assets/photos/hero-sunset-garden.jpg";
import frontYardInstallation from "../assets/photos/front-yard-installation.jpg";
import plantingDetail from "../assets/photos/planting-detail.jpg";

export type ImageKind = "garden" | "planting" | "crew" | "property" | "detail";

export type ImageEntry = {
  src: ImageMetadata | undefined;
  alt: string;
  label: string;
  kind: ImageKind;
  /** Rendered over the image as a small glass caption, where the layout uses one. */
  caption?: { label: string; value: string };
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

// TODO: the three photos below are client-generated stand-ins, not photos of
// Emergence's own completed work. Swap them for real job photos (EXIF
// stripped) before launch — see DISCOVERY.md and PLAYBOOK.md §6.
export const images: Record<string, ImageEntry> = {
  hero: {
    src: heroSunsetGarden,
    alt: "A West Coast garden at golden hour — stone steps through fern and rhododendron planting, ocean and mountains beyond",
    label: "Hero — stand-in until real job photography is available",
    kind: "garden",
  },
  proof: {
    src: plantingDetail,
    alt: "Gloved hands settling a flowering shrub into fresh, dark soil in a fern-edged bed",
    label: "Proof — stand-in until real job photography is available",
    kind: "planting",
    caption: {
      label: "Planted right",
      value: "Soil, siting, and species chosen for how the plant actually grows",
    },
  },
  work1: {
    src: frontYardInstallation,
    alt: "A finished front-yard installation: layered beds, stone edging, and lawn framing a modern West Coast home",
    label: "Work — stand-in until real job photography is available",
    kind: "property",
    caption: {
      label: "Design, install, maintain",
      value: "Beds, edging, and planting carried from plan to finished property",
    },
  },
  work2: {
    src: undefined,
    alt: "A further example of completed work by Emergence",
    label: "TODO: second real project photo — a different property or season",
    kind: "detail",
  },
};
