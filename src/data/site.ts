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
