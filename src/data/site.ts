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

// TODO: the differentiator below is inferred from the business's own name
// ("Landscape Horticulture" implies plant/garden expertise, not just mowing)
// — it is NOT a confirmed client statement. Replace once the client's
// values page / direct input is available. See DISCOVERY.md.
export const coreArgument = {
  eyebrow: "Horticulture-trained, not just lawn-mowed",
  headline: "Gardens designed and grown, not just mowed and blown",
  body:
    "TODO: confirm with client — working copy: Emergence is horticulturists first, landscapers second. Planting plans, soil health, and seasonal care come from people trained in how plants actually grow, across the North Shore and Langley.",
};

export type ServiceIcon = "design" | "install" | "prune" | "seasonal";

export type Service = {
  name: string;
  description: string;
  confirmed: boolean;
  icon: ServiceIcon;
};

// TODO: none of these services are confirmed yet — inferred from the
// business name and standard horticulture-company offerings. Confirm the
// real service list with the client before launch (see DISCOVERY.md).
export const services: Service[] = [
  {
    name: "Garden & Planting Design",
    description:
      "TODO: confirm — planting plans built around soil, sun exposure, and what will actually thrive on your property.",
    confirmed: false,
    icon: "design",
  },
  {
    name: "Landscape Installation",
    description:
      "TODO: confirm — beds, borders, hardscape, and planting installed from a design plan.",
    confirmed: false,
    icon: "install",
  },
  {
    name: "Horticultural Maintenance & Pruning",
    description:
      "TODO: confirm — seasonal pruning and plant care from people trained in horticulture, not just mowing routes.",
    confirmed: false,
    icon: "prune",
  },
  {
    name: "Seasonal Garden Care",
    description:
      "TODO: confirm — spring cleanup, fall prep, and the in-between maintenance that keeps a garden alive year to year.",
    confirmed: false,
    icon: "seasonal",
  },
];

export const about = {
  heading: "About Emergence",
  // TODO: no confirmed founding story yet — replace with the client's own
  // words once available (see DISCOVERY.md "years in business / founding story").
  body:
    "TODO: confirm with client — Emergence Landscape Horticulture serves West Vancouver, North Vancouver, and Langley with a horticulture-first approach to garden design and care.",
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
