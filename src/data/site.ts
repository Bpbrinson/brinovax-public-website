// Site content. Grounded in docs/product/* — prices are intentionally omitted
// because they require product-owner approval (pricing-and-service-boundaries.md).

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export interface Tier {
  name: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const TIERS: Tier[] = [
  {
    name: "Starter Hosting",
    tagline: "Everything a small business needs to be online, done right.",
    features: [
      "Static website hosting on AWS",
      "HTTPS and custom domain",
      "Basic uptime checks",
      "Limited monthly content edits",
      "Email support",
    ],
    cta: "Get started",
  },
  {
    name: "Managed Hosting",
    tagline: "Hands-off hosting with previews and priority support.",
    features: [
      "Everything in Starter Hosting",
      "More included monthly edits",
      "Change previews before production",
      "Monthly operational summary",
      "Priority support",
    ],
    cta: "Talk to us",
    featured: true,
  },
  {
    name: "Custom Build",
    tagline: "A new site or migration, scoped to your project.",
    features: [
      "Project-scoped website build or migration",
      "Separate statement of work",
      "Deployment and handoff through the Brinovax workflow",
    ],
    cta: "Request a quote",
  },
];

export const STEPS = [
  {
    title: "Intake",
    body: "We capture your business, domain, brand, and website details as structured, validated data — no lost email threads.",
  },
  {
    title: "Development preview",
    body: "Your site is built and deployed to a private development URL where you can review it before anything goes live.",
  },
  {
    title: "Approved production launch",
    body: "Once you approve, we promote the exact reviewed build to production behind a global CDN with HTTPS.",
  },
  {
    title: "Ongoing edits & monitoring",
    body: "Request content edits within your plan; every change is previewed, health-checked, and reversible.",
  },
];

export const BRINOVAX_RESPONSIBILITIES = [
  "Hosting infrastructure managed through approved automation",
  "Deployment workflows and rollback documentation",
  "Health checks and operational evidence",
  "Routine static-site content updates within your edit allowance",
];

export const CUSTOMER_RESPONSIBILITIES = [
  "Supplying accurate business, domain, brand, and content details",
  "Approving production changes",
  "Maintaining ownership of domain registration and external accounts unless otherwise agreed",
  "Reviewing legal, regulated, or industry-specific content before publication",
];

// Where contact inquiries go. Shown on the page and used as the mailto fallback
// when no HTTP endpoint is configured. This is a public inbox address, not a secret.
export const CONTACT_EMAIL = "bpbrinson@brinovax.com";

// Contact endpoint. Submissions POST here and are emailed to CONTACT_EMAIL via
// SES (API Gateway + Lambda; infra in shared/contact). This is a public URL — the
// browser calls it directly, so it is not a secret. VITE_CONTACT_ENDPOINT overrides
// it (e.g. "" to fall back to the mailto flow, or a different environment's API).
const DEFAULT_CONTACT_ENDPOINT = "https://0pt6gm3xq5.execute-api.us-east-1.amazonaws.com/contact";
export const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? DEFAULT_CONTACT_ENDPOINT;

// Sample designs shown in the "design ideas" carousel. Each is a self-contained
// theme (no external assets) rendered as a mini mock site the visitor can click
// through for inspiration. Prices/claims are illustrative placeholder content.
export interface SampleTheme {
  bg: string;
  surface: string;
  primary: string;
  primary2: string;
  accent: string;
  text: string;
  muted: string;
  font: "sans" | "serif";
}

export interface SampleSite {
  id: string;
  name: string;
  category: string;
  summary: string;
  nav: string[];
  hero: { eyebrow: string; heading: string; sub: string; cta: string };
  features: { title: string; body: string }[];
  theme: SampleTheme;
}

export const SAMPLE_SITES: SampleSite[] = [
  {
    id: "cafe",
    name: "Bloom Café",
    category: "Café & Bakery",
    summary: "Warm, inviting, and made for menus, hours, and mouth-watering photos.",
    nav: ["Menu", "Our Story", "Visit", "Order"],
    hero: {
      eyebrow: "Fresh daily",
      heading: "Slow mornings, good coffee.",
      sub: "Locally roasted beans and fresh-baked pastries in the heart of downtown.",
      cta: "View the menu",
    },
    features: [
      { title: "Seasonal menu", body: "Rotating espresso, pour-overs, and house pastries." },
      { title: "Cozy space", body: "Free Wi-Fi, warm light, and room to linger." },
      { title: "Order ahead", body: "Skip the line — pick up on your schedule." },
    ],
    theme: {
      bg: "#fbf6ee", surface: "#f2e6d5", primary: "#b5651d", primary2: "#d98b3a",
      accent: "#2f7d5b", text: "#3a2b20", muted: "#8a7563", font: "serif",
    },
  },
  {
    id: "salon",
    name: "Luxe Hair Studio",
    category: "Salon & Beauty",
    summary: "Elegant and photo-forward, built to show off your work and take bookings.",
    nav: ["Services", "Gallery", "Team", "Book"],
    hero: {
      eyebrow: "By appointment",
      heading: "Beautiful hair, effortlessly.",
      sub: "Precision cuts, color, and styling from an award-winning team.",
      cta: "Book your visit",
    },
    features: [
      { title: "Signature color", body: "Balayage, gloss, and dimensional highlights." },
      { title: "Expert stylists", body: "A team obsessed with the details." },
      { title: "Easy booking", body: "Reserve online in under a minute." },
    ],
    theme: {
      bg: "#faf6f7", surface: "#f0e4ea", primary: "#b23a6a", primary2: "#7a2450",
      accent: "#caa15a", text: "#2a1f27", muted: "#7d6b74", font: "serif",
    },
  },
  {
    id: "law",
    name: "Summit Legal",
    category: "Law & Professional",
    summary: "Trustworthy and understated — credibility first, with clear calls to action.",
    nav: ["Practice", "Attorneys", "Results", "Contact"],
    hero: {
      eyebrow: "Trusted counsel",
      heading: "Clarity when it matters most.",
      sub: "Straightforward legal guidance for individuals and small businesses.",
      cta: "Request a consultation",
    },
    features: [
      { title: "Practice areas", body: "Business, estate, and real-estate law." },
      { title: "Proven results", body: "Decades of outcomes clients rely on." },
      { title: "Direct access", body: "Talk to your attorney, not a call center." },
    ],
    theme: {
      bg: "#f6f8fb", surface: "#e7eef7", primary: "#1f3a5f", primary2: "#2f5c8f",
      accent: "#b08d4c", text: "#16202e", muted: "#5b6675", font: "serif",
    },
  },
  {
    id: "fitness",
    name: "Pulse Fitness",
    category: "Gym & Fitness",
    summary: "Bold, high-energy dark theme designed to drive sign-ups and class bookings.",
    nav: ["Classes", "Coaches", "Pricing", "Join"],
    hero: {
      eyebrow: "Train with intent",
      heading: "Stronger every session.",
      sub: "Coached classes, open gym, and programs for every level.",
      cta: "Start free trial",
    },
    features: [
      { title: "Group classes", body: "Strength, HIIT, and mobility every day." },
      { title: "Real coaching", body: "Certified coaches who know your name." },
      { title: "Flexible plans", body: "Month-to-month, cancel anytime." },
    ],
    theme: {
      bg: "#0f1115", surface: "#1a2028", primary: "#1f2933", primary2: "#0b0e12",
      accent: "#a6e22e", text: "#f2f5f0", muted: "#9aa3ad", font: "sans",
    },
  },
  {
    id: "photo",
    name: "Lens & Light",
    category: "Photography",
    summary: "Minimal, gallery-first layout that lets the imagery do the talking.",
    nav: ["Work", "About", "Services", "Inquire"],
    hero: {
      eyebrow: "Portfolio",
      heading: "Moments, made to last.",
      sub: "Weddings, portraits, and brand stories shot with natural light.",
      cta: "See the portfolio",
    },
    features: [
      { title: "Signature style", body: "Timeless, warm, and true to life." },
      { title: "Full galleries", body: "High-resolution images, quickly delivered." },
      { title: "Custom packages", body: "Coverage tailored to your day." },
    ],
    theme: {
      bg: "#ffffff", surface: "#f1f1f1", primary: "#141414", primary2: "#3a3a3a",
      accent: "#c9a227", text: "#141414", muted: "#6b6b6b", font: "sans",
    },
  },
  {
    id: "landscape",
    name: "GreenScape",
    category: "Landscaping & Home",
    summary: "Fresh and dependable, built to showcase projects and capture quote requests.",
    nav: ["Services", "Projects", "Reviews", "Quote"],
    hero: {
      eyebrow: "Design • Build • Maintain",
      heading: "Outdoor spaces you'll love.",
      sub: "Full-service landscaping for homes and small businesses.",
      cta: "Get a free quote",
    },
    features: [
      { title: "Custom design", body: "Plans shaped around your yard and budget." },
      { title: "Reliable crews", body: "On time, tidy, and detail-obsessed." },
      { title: "Year-round care", body: "Seasonal maintenance that keeps it sharp." },
    ],
    theme: {
      bg: "#f4faf4", surface: "#e2f1e2", primary: "#2e7d32", primary2: "#4faf52",
      accent: "#b5892b", text: "#1c2b1c", muted: "#5e6f5e", font: "sans",
    },
  },
];
