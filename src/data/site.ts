// Site content. Grounded in docs/product/* — prices are intentionally omitted
// because they require product-owner approval (pricing-and-service-boundaries.md).

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/examples", label: "Examples" },
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
// through for inspiration. Stats, quotes, and prices are illustrative placeholders.
// Common questions. Rendered on the site AND mirrored as FAQ structured data in
// index.html — keep the two in sync so the rich result matches the page.
export const FAQS = [
  {
    q: "How much does a Brinovax website cost?",
    a: "Pricing is built for small businesses and depends on your plan and scope. Starter hosting is our most affordable tier; custom builds are quoted per project. Reach out and we'll give you an honest, plain-English quote — there's no cost to ask.",
  },
  {
    q: "How long does it take to launch?",
    a: "Most small-business sites go from intake to a live, approved site in a couple of weeks — it depends mostly on how quickly content and approvals come together. You review a private preview before anything goes live.",
  },
  {
    q: "Do I own my website and domain?",
    a: "Yes. You keep ownership of your domain and content. We manage the hosting and deployment; you approve every change.",
  },
  {
    q: "Can I make changes after it launches?",
    a: "Absolutely. Request content edits within your plan — our AI drafts them fast, and nothing goes live until you review and approve. Every change is previewed and reversible.",
  },
  {
    q: "Is my site secure and reliable?",
    a: "Every site runs on AWS with HTTPS, private storage behind a global CDN, health checks, and documented rollback — enterprise-grade foundations without the enterprise bill.",
  },
];

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

export type SampleLayout = "split" | "centered" | "aurora" | "portfolio";

export interface SampleSite {
  id: string;
  name: string;
  category: string;
  summary: string;
  // Each sample renders a structurally different layout so the designs don't all
  // look alike: split (text + side image), centered (hero + screenshot + glow),
  // aurora (full-bleed animated background), portfolio (gallery-first).
  layout: SampleLayout;
  nav: string[];
  hero: { eyebrow: string; heading: string; sub: string; cta: string };
  stats: { value: string; label: string }[];
  features: { title: string; body: string }[];
  testimonial: { quote: string; name: string; role: string };
  theme: SampleTheme;
}

export const SAMPLE_SITES: SampleSite[] = [
  {
    id: "cafe",
    name: "Bloom Café",
    category: "Café & Bakery",
    summary: "Warm, inviting, and made for menus, hours, and mouth-watering photos.",
    layout: "split",
    nav: ["Menu", "Our Story", "Visit", "Order"],
    hero: {
      eyebrow: "Fresh daily",
      heading: "Slow mornings, good coffee.",
      sub: "Locally roasted beans and fresh-baked pastries in the heart of downtown.",
      cta: "View the menu",
    },
    stats: [
      { value: "4.9★", label: "Avg. review" },
      { value: "12", label: "Signature drinks" },
      { value: "7am", label: "Open daily" },
    ],
    features: [
      { title: "Seasonal menu", body: "Rotating espresso, pour-overs, and house pastries." },
      { title: "Cozy space", body: "Free Wi-Fi, warm light, and room to linger." },
      { title: "Order ahead", body: "Skip the line — pick up on your schedule." },
    ],
    testimonial: { quote: "The cozy spot I start every morning at.", name: "Jordan M.", role: "Regular" },
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
    layout: "portfolio",
    nav: ["Services", "Gallery", "Team", "Book"],
    hero: {
      eyebrow: "By appointment",
      heading: "Beautiful hair, effortlessly.",
      sub: "Precision cuts, color, and styling from an award-winning team.",
      cta: "Book your visit",
    },
    stats: [
      { value: "4.9★", label: "Client rating" },
      { value: "1.2k+", label: "Happy clients" },
      { value: "6", label: "Expert stylists" },
    ],
    features: [
      { title: "Signature color", body: "Balayage, gloss, and dimensional highlights." },
      { title: "Expert stylists", body: "A team obsessed with the details." },
      { title: "Easy booking", body: "Reserve online in under a minute." },
    ],
    testimonial: { quote: "I've never loved my color more.", name: "Priya S.", role: "Client" },
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
    layout: "centered",
    nav: ["Practice", "Attorneys", "Results", "Contact"],
    hero: {
      eyebrow: "Trusted counsel",
      heading: "Clarity when it matters most.",
      sub: "Straightforward legal guidance for individuals and small businesses.",
      cta: "Request a consultation",
    },
    stats: [
      { value: "25+", label: "Years experience" },
      { value: "98%", label: "Client satisfaction" },
      { value: "500+", label: "Clients served" },
    ],
    features: [
      { title: "Practice areas", body: "Business, estate, and real-estate law." },
      { title: "Proven results", body: "Decades of outcomes clients rely on." },
      { title: "Direct access", body: "Talk to your attorney, not a call center." },
    ],
    testimonial: { quote: "Clear guidance exactly when I needed it.", name: "D. Nguyen", role: "Client" },
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
    layout: "aurora",
    nav: ["Classes", "Coaches", "Pricing", "Join"],
    hero: {
      eyebrow: "Train with intent",
      heading: "Stronger every session.",
      sub: "Coached classes, open gym, and programs for every level.",
      cta: "Start free trial",
    },
    stats: [
      { value: "40+", label: "Weekly classes" },
      { value: "15", label: "Certified coaches" },
      { value: "24/7", label: "Gym access" },
    ],
    features: [
      { title: "Group classes", body: "Strength, HIIT, and mobility every day." },
      { title: "Real coaching", body: "Certified coaches who know your name." },
      { title: "Flexible plans", body: "Month-to-month, cancel anytime." },
    ],
    testimonial: { quote: "Best community I've ever trained with.", name: "Marcus T.", role: "Member" },
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
    layout: "portfolio",
    nav: ["Work", "About", "Services", "Inquire"],
    hero: {
      eyebrow: "Portfolio",
      heading: "Moments, made to last.",
      sub: "Weddings, portraits, and brand stories shot with natural light.",
      cta: "See the portfolio",
    },
    stats: [
      { value: "300+", label: "Shoots delivered" },
      { value: "4.9★", label: "Client rating" },
      { value: "48h", label: "Sneak peeks" },
    ],
    features: [
      { title: "Signature style", body: "Timeless, warm, and true to life." },
      { title: "Full galleries", body: "High-resolution images, quickly delivered." },
      { title: "Custom packages", body: "Coverage tailored to your day." },
    ],
    testimonial: { quote: "Our photos took our breath away.", name: "The Alvarez Family", role: "Wedding" },
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
    layout: "split",
    nav: ["Services", "Projects", "Reviews", "Quote"],
    hero: {
      eyebrow: "Design • Build • Maintain",
      heading: "Outdoor spaces you'll love.",
      sub: "Full-service landscaping for homes and small businesses.",
      cta: "Get a free quote",
    },
    stats: [
      { value: "500+", label: "Yards transformed" },
      { value: "15yr", label: "In business" },
      { value: "4.9★", label: "Homeowner rating" },
    ],
    features: [
      { title: "Custom design", body: "Plans shaped around your yard and budget." },
      { title: "Reliable crews", body: "On time, tidy, and detail-obsessed." },
      { title: "Year-round care", body: "Seasonal maintenance that keeps it sharp." },
    ],
    testimonial: { quote: "Our backyard is now our favorite room.", name: "Sam R.", role: "Homeowner" },
    theme: {
      bg: "#f4faf4", surface: "#e2f1e2", primary: "#2e7d32", primary2: "#4faf52",
      accent: "#b5892b", text: "#1c2b1c", muted: "#5e6f5e", font: "sans",
    },
  },
  {
    id: "realty",
    name: "Cedar & Co Realty",
    category: "Real Estate",
    summary: "Polished and trust-building, with room for listings, neighborhoods, and agents.",
    layout: "centered",
    nav: ["Listings", "Buy", "Sell", "Contact"],
    hero: {
      eyebrow: "Local experts",
      heading: "Find your next front door.",
      sub: "Homes and honest guidance for buyers and sellers in your neighborhood.",
      cta: "Browse listings",
    },
    stats: [
      { value: "$120M+", label: "Homes sold" },
      { value: "350+", label: "Families moved" },
      { value: "14", label: "Avg. days to sell" },
    ],
    features: [
      { title: "Curated listings", body: "Only the homes that fit what you want." },
      { title: "Neighborhood insight", body: "Schools, commutes, and local know-how." },
      { title: "Smooth closings", body: "Guided from first tour to keys in hand." },
    ],
    testimonial: { quote: "Sold above asking in a single week.", name: "The Bennetts", role: "Sellers" },
    theme: {
      bg: "#f7f9fc", surface: "#e8eef7", primary: "#14324f", primary2: "#24507a",
      accent: "#c99a3a", text: "#16202e", muted: "#5b6675", font: "serif",
    },
  },
  {
    id: "boutique",
    name: "Marlo Boutique",
    category: "Retail & E-commerce",
    summary: "Playful and product-forward, built to browse collections and drive sales.",
    layout: "portfolio",
    nav: ["Shop", "New In", "Lookbook", "Cart"],
    hero: {
      eyebrow: "New arrivals",
      heading: "Style that's uniquely you.",
      sub: "Curated apparel and accessories, refreshed every single week.",
      cta: "Shop the collection",
    },
    stats: [
      { value: "4.9★", label: "1k+ reviews" },
      { value: "Free", label: "Shipping $50+" },
      { value: "New", label: "Drops weekly" },
    ],
    features: [
      { title: "Curated edits", body: "Handpicked pieces you won't find everywhere." },
      { title: "Easy returns", body: "30-day, no-questions-asked returns." },
      { title: "Member perks", body: "Early access and members-only pricing." },
    ],
    testimonial: { quote: "My new favorite place to shop.", name: "Ava L.", role: "Member" },
    theme: {
      bg: "#fff8f6", surface: "#ffe7e0", primary: "#c93f78", primary2: "#9c2f6e",
      accent: "#f0a04b", text: "#3a222c", muted: "#8a6b73", font: "sans",
    },
  },
  {
    id: "dental",
    name: "Bright Smile Dental",
    category: "Dental & Medical",
    summary: "Clean and calming, designed to build trust and make booking effortless.",
    layout: "centered",
    nav: ["Services", "New Patients", "Insurance", "Book"],
    hero: {
      eyebrow: "Gentle care",
      heading: "A healthier, brighter smile.",
      sub: "Modern, comfortable dentistry for the whole family.",
      cta: "Book an appointment",
    },
    stats: [
      { value: "4.9★", label: "Patient rating" },
      { value: "20+", label: "Years caring" },
      { value: "Same-day", label: "Appointments" },
    ],
    features: [
      { title: "Same-day visits", body: "Emergencies and check-ups without the wait." },
      { title: "Family friendly", body: "Care for every age, gently done." },
      { title: "Most insurance", body: "We handle the paperwork for you." },
    ],
    testimonial: { quote: "Zero anxiety and a great result.", name: "Chris P.", role: "Patient" },
    theme: {
      bg: "#f3fbfb", surface: "#dff1f0", primary: "#0e7c86", primary2: "#12a3ad",
      accent: "#f0a93b", text: "#14322f", muted: "#5c7573", font: "sans",
    },
  },
  {
    id: "agency",
    name: "Northwind Studio",
    category: "Creative Agency",
    summary: "Modern and vibrant, made to showcase work and win new projects.",
    layout: "aurora",
    nav: ["Work", "Services", "About", "Start"],
    hero: {
      eyebrow: "Brand & web",
      heading: "Ideas that move brands forward.",
      sub: "Design, web, and content for ambitious growing companies.",
      cta: "Start a project",
    },
    stats: [
      { value: "120+", label: "Projects shipped" },
      { value: "4.9★", label: "Client rating" },
      { value: "2x", label: "Avg. conversion lift" },
    ],
    features: [
      { title: "Brand identity", body: "Logos, palettes, and systems that scale." },
      { title: "Web design", body: "Fast, striking sites that convert." },
      { title: "Content", body: "Words and visuals that tell your story." },
    ],
    testimonial: { quote: "They just get it — and delivered.", name: "Dana K.", role: "Founder" },
    theme: {
      bg: "#f7f7fb", surface: "#ececf6", primary: "#4b34d6", primary2: "#7b3ff2",
      accent: "#12c7b8", text: "#16162a", muted: "#5c5c76", font: "sans",
    },
  },
];
