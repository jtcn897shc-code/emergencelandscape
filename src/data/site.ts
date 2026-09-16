// Single source of truth for all site copy and business data.
// Components read from here; nothing gets hardcoded in a .astro file.
// See DISCOVERY.md for what's confirmed vs. still open.

export const business = {
  name: "Emergence Landscape Horticulture", // (confirmed) FB page title
  shortName: "Emergence",
  phone: "(604) 379-9912", // (confirmed) FB contact info
  phoneHref: "tel:+16043799912",
  email: "info@emergencelh.com", // (confirmed) FB contact info
  facebookUrl: "https://www.facebook.com/emergencelh", // (confirmed handle) FB contact info
  messenger: "Emergence Landscape Horticulture", // (confirmed) FB contact info
  serviceAreas: [
    "West Vancouver, BC",
    "Langley, BC",
    "North Vancouver, BC",
    // TODO: 4th service area truncated in the source screenshot ("New…") —
    // confirm full name before launch (see DISCOVERY.md).
  ],
};

// UNCONFIRMED (tracked in DISCOVERY.md): this positioning is inferred from
// the business's own name — "Landscape Horticulture" implies plant and garden
// expertise rather than mowing — not from a client statement. It is written
// to avoid asserting anything unverifiable: it describes an approach, and
// makes no claim about credentials, certifications, or years in business.
// Replace once the client's values page / direct input is available.
export const coreArgument = {
  eyebrow: "Horticulture first, not just lawn care",
  // Written flat and factual on purpose. A punchy slogan ("designed and
  // grown, not mowed and blown") is the register of generated marketing
  // copy; a plain statement of what the business does reads as a real one.
  headline:
    "Design, planting and seasonal care for gardens across the North Shore and Langley — approached as horticulture rather than lawn maintenance.",
  body:
    "Planting plans, soil health, and seasonal care, from people who start with how a plant actually grows.",
};

export type ServiceIcon = "design" | "install" | "prune" | "seasonal";

export type Service = {
  name: string;
  description: string;
  confirmed: boolean;
  icon: ServiceIcon;
};

// UNCONFIRMED (tracked in DISCOVERY.md): this service list is inferred from
// the business name and standard horticulture offerings — the client has not
// confirmed what they actually do. `confirmed: false` marks that; confirm the
// real list and its ordering before launch.
export const services: Service[] = [
  {
    name: "Garden & Planting Design",
    description:
      "Planting plans built around soil, sun exposure, and what will actually thrive on your property.",
    confirmed: false,
    icon: "design",
  },
  {
    name: "Landscape Installation",
    description:
      "Beds, borders, hardscape, and planting installed from a design plan.",
    confirmed: false,
    icon: "install",
  },
  {
    name: "Horticultural Maintenance & Pruning",
    description:
      "Seasonal pruning and plant care that works with how each species grows, rather than a single mowing route.",
    confirmed: false,
    icon: "prune",
  },
  {
    name: "Seasonal Garden Care",
    description:
      "Spring cleanup, fall prep, and the in-between maintenance that keeps a garden healthy year to year.",
    confirmed: false,
    icon: "seasonal",
  },
];

export const about = {
  heading: "About Emergence",
  // Service areas here are confirmed (FB page). No founding story, team size,
  // or years in business is claimed — none of that is confirmed yet. Replace
  // with the client's own words once available (see DISCOVERY.md).
  body:
    "Emergence Landscape Horticulture serves West Vancouver, North Vancouver, and Langley — designing, planting, and caring for gardens with an emphasis on what keeps them healthy long after the install.",
};

export const contactIntake = {
  heading: "Get a quote",
  body:
    "Tell us about your property and what you're hoping for — we'll follow up to schedule a walkthrough.",
  checklist: [
    "Property address and rough lot size",
    "What you want done (design, install, maintenance, or all three)",
    "Any photos of the space",
    "Timeline — right away, or planning ahead for a season",
  ],
};

export const footer = {
  credit: "Built by Destura", // explicit client instruction
};
