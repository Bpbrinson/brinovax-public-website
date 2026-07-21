import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { STEPS } from "../data/site";
import { useSeo } from "../hooks/usePageTitle";
import SampleSites from "../components/SampleSites";
import Reveal from "../components/Reveal";
import Faq from "../components/Faq";

/* Small inline stroke icons — no external assets, crisp on every screen. */
const icon = {
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.4 3 8.5 7 9.7 4-1.2 7-5.3 7-9.7V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 12 12 20l-8-8V4h8l8 8Z" />
      <circle cx="8.5" cy="8.5" r="1.4" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z" />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v5h-5" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
};

const INDUSTRIES = [
  "Cafés & restaurants",
  "Salons & beauty",
  "Trades & home services",
  "Fitness & wellness",
  "Professional services",
  "Retail & boutiques",
  "Real estate",
  "Creative studios",
];

function Feature({ svg, title, children }: { svg: ReactNode; title: string; children: ReactNode }) {
  return (
    <article className="feature">
      <div className="feature-icon">{svg}</div>
      <h2>{title}</h2>
      <p>{children}</p>
    </article>
  );
}

function Value({ svg, title, children }: { svg: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="value">
      <div className="feature-icon">{svg}</div>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default function Home() {
  useSeo({
    title: "Affordable, managed website hosting",
    description:
      "Brinovax builds fast, secure websites for small businesses and hosts them on AWS — HTTPS, a custom domain, AI-assisted edits, and honest, affordable pricing. Get a free quote.",
  });
  return (
    <>
      <section className="hero">
        <div className="hero-aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Affordable managed website hosting</p>
            <h1>Your business website, built and hosted the right way.</h1>
            <p className="lede">
              Brinovax builds fast, secure websites and hosts them on AWS — at prices small
              businesses can actually afford. You review every change before it goes live,
              and our AI helps make edits fast while you stay in control.
            </p>
            <div className="cta-row">
              <Link className="btn btn-primary btn-lg" to="/contact">
                Get a free quote
              </Link>
              <a className="btn btn-ghost btn-lg" href="#ideas">
                Browse design ideas
              </a>
            </div>
            <div className="pill-row">
              <span className="pill pill-accent">{icon.tag} Small-business pricing</span>
              <span className="pill">{icon.sparkle} AI-assisted edits</span>
              <span className="pill">{icon.chat} Quick support</span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="browser">
              <div className="browser-bar">
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="browser-dot" />
                <span className="browser-url">https://your-business.com</span>
              </div>
              <div className="browser-body">
                <div className="bb-hero" />
                <div className="bb-line" />
                <div className="bb-line short" />
                <div className="bb-cards">
                  <div className="bb-card" />
                  <div className="bb-card" />
                  <div className="bb-card" />
                </div>
              </div>
            </div>
            <div className="float-badge">
              <span className="dot" /> Live &amp; healthy
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Industries we build for">
        <div className="container">
          <p className="trust-label">Websites for every kind of small business</p>
          <div className="trust-track">
            {INDUSTRIES.map((i) => (
              <Link key={i} to="/examples" className="trust-chip">
                {i}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Everything a small business needs to be online</h2>
            <p className="section-sub">
              Professional hosting without the cloud complexity — set up for you and kept
              running behind the scenes, for a price that fits a small-business budget.
            </p>
          </div>
        </Reveal>
        <Reveal className="feature-grid">
          <Feature svg={icon.bolt} title="Fast by default">
            Static delivery from a global CDN means your pages load quickly for visitors
            anywhere, with automatic HTTPS.
          </Feature>
          <Feature svg={icon.shield} title="Secure & private">
            Your files sit in private storage that only the CDN can read — never a
            publicly exposed bucket.
          </Feature>
          <Feature svg={icon.eye} title="Reviewed before launch">
            Every change is previewed on a development URL and health-checked before it is
            promoted to production.
          </Feature>
        </Reveal>
      </section>

      <SampleSites />

      <section className="container section">
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">Why small businesses choose Brinovax</h2>
            <p className="section-sub">Enterprise-grade foundations, priced for small teams.</p>
          </div>
        </Reveal>
        <Reveal className="value-grid">
          <Value svg={icon.tag} title="Genuinely affordable">
            Small-business pricing with no surprise fees — enterprise-grade hosting without
            the enterprise bill.
          </Value>
          <Value svg={icon.sparkle} title="AI edits, you're in control">
            Request a change and our AI drafts it fast. Nothing goes live until you review
            and approve it — every edit is previewed and reversible.
          </Value>
          <Value svg={icon.chat} title="Quick, friendly support">
            Talk to a real person and get fast answers when you need a hand — no ticket
            mazes, no call centers.
          </Value>
          <Value svg={icon.refresh} title="Reversible & monitored">
            Versioned deploys with health checks watching your site, so we can roll back to
            the last approved version anytime.
          </Value>
        </Reveal>
      </section>

      <section className="container section">
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">From intake to launch</h2>
            <p className="section-sub">A calm, reviewable path from idea to a live site.</p>
          </div>
        </Reveal>
        <Reveal>
          <ol className="steps">
            {STEPS.map((step, i) => (
              <li key={step.title} className="step">
                <span className="step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="band">
        <div className="container section narrow">
          <Reveal>
            <div className="section-head center" style={{ marginInline: "auto" }}>
              <h2 className="section-title">Frequently asked questions</h2>
              <p className="section-sub">Everything you need to know before reaching out.</p>
            </div>
          </Reveal>
          <Reveal>
            <Faq />
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <Reveal>
          <div className="final-cta">
            <div className="final-cta-glow" aria-hidden="true" />
            <div className="final-cta-inner">
              <h2>Ready to get your business online?</h2>
              <p>
                Tell us about your business and we&apos;ll send back a design direction and an
                honest, highly affordable quote — no cost, no obligation.
              </p>
              <div className="cta-row">
                <Link className="btn btn-primary btn-lg" to="/contact">
                  Get a free quote
                </Link>
                <Link className="btn btn-ghost btn-lg on-dark" to="/pricing">
                  View plans
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
