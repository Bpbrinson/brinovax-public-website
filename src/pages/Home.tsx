import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { STEPS } from "../data/site";
import { usePageTitle } from "../hooks/usePageTitle";

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
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v5h-5" />
    </svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <path d="M4 13a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0v-2M20 13a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0v-2" />
      <path d="M18 19a4 4 0 0 1-4 3h-2" />
    </svg>
  ),
};

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
  usePageTitle("Fast, secure website hosting");
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Managed website hosting</p>
            <h1>Your business website, built and hosted the right way.</h1>
            <p className="lede">
              Brinovax builds fast, secure websites and hosts them on AWS — private
              storage behind a global CDN, HTTPS, and your own custom domain. You review
              every change before it goes live, and it stays surprisingly affordable.
            </p>
            <div className="cta-row">
              <Link className="btn btn-primary" to="/contact">
                Get started
              </Link>
              <Link className="btn btn-ghost" to="/how-it-works">
                See how it works
              </Link>
            </div>
            <div className="pill-row">
              <span className="pill">{icon.lock} HTTPS &amp; custom domain</span>
              <span className="pill">{icon.globe} Global CDN</span>
              <span className="pill">{icon.eye} Preview before launch</span>
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

      <section className="container section">
        <div className="section-head">
          <h2 className="section-title">Everything a small business needs to be online</h2>
          <p className="section-sub">
            Professional hosting without the cloud complexity — set up for you and kept
            running behind the scenes.
          </p>
        </div>
        <div className="feature-grid">
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
        </div>
      </section>

      <section className="band">
        <div className="container section">
          <div className="section-head">
            <h2 className="section-title">Why small businesses choose Brinovax</h2>
            <p className="section-sub">Enterprise-grade foundations, priced for small teams.</p>
          </div>
          <div className="value-grid">
            <Value svg={icon.globe} title="Enterprise infrastructure">
              The same AWS foundation big companies use — global CDN, private storage, and
              managed certificates.
            </Value>
            <Value svg={icon.refresh} title="Reversible by design">
              Deployments are versioned. If something is not right, we roll back to the last
              approved version quickly.
            </Value>
            <Value svg={icon.lock} title="Secure & monitored">
              HTTPS everywhere, private buckets, and health checks watching your site so
              issues surface early.
            </Value>
            <Value svg={icon.headset} title="Friendly, human support">
              Talk to a real person. We handle the technical side so you can focus on your
              business.
            </Value>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2 className="section-title">From intake to launch</h2>
          <p className="section-sub">A calm, reviewable path from idea to a live site.</p>
        </div>
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
        <div className="cta-row">
          <Link className="btn btn-primary" to="/pricing">
            View plans
          </Link>
          <Link className="btn btn-ghost" to="/contact">
            Get a free quote
          </Link>
        </div>
      </section>
    </>
  );
}
