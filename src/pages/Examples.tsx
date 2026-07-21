import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import SampleSites from "../components/SampleSites";
import { usePageTitle } from "../hooks/usePageTitle";

/* A labeled demo of a reusable UI building block, shown in Brinovax's own brand
   colors so visitors can see the menu of elements we can add to their site. */
function Element({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ux-card">
      <span className="ux-label">{label}</span>
      <div className="ux-demo">{children}</div>
    </div>
  );
}

export default function Examples() {
  usePageTitle("Examples & design ideas");
  return (
    <>
      <section className="container section narrow">
        <p className="eyebrow">Examples</p>
        <h1>Design ideas &amp; the elements that make sites pop.</h1>
        <p className="lede">
          Browse example designs across different industries, then explore the building
          blocks we can mix and match for your site. Everything here is a starting point —
          we tailor the colors, copy, and photos to your brand.
        </p>
      </section>

      <SampleSites />

      <section className="container section">
        <div className="section-head">
          <h2 className="section-title">Elements we can add to make your site pop</h2>
          <p className="section-sub">
            These are examples of the components we build with. Tell us your goals and we
            will assemble the right mix for your business.
          </p>
        </div>

        <div className="ux-grid">
          <Element label="Announcement bar">
            <div className="ux-announce">
              <span>✨ Free consultation this month</span>
              <span className="ux-announce-link">Book now →</span>
            </div>
          </Element>

          <Element label="Stat tiles">
            <div className="ux-stats" aria-hidden="true">
              <div><strong>500+</strong><span>Happy clients</span></div>
              <div><strong>4.9★</strong><span>Avg. rating</span></div>
              <div><strong>24/7</strong><span>Support</span></div>
            </div>
          </Element>

          <Element label="Testimonials">
            <figure className="ux-quote">
              <blockquote>“Best decision we made for our business.”</blockquote>
              <figcaption>
                <span className="ux-avatar" aria-hidden="true">A</span>
                <span>
                  <strong>Alex R.</strong> · Owner
                </span>
              </figcaption>
            </figure>
          </Element>

          <Element label="Image galleries">
            <div className="ux-gallery" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className={`ux-tile t-${i % 3}`} />
              ))}
            </div>
          </Element>

          <Element label="Pricing tables">
            <div className="ux-pricing" aria-hidden="true">
              <div className="ux-plan">
                <span className="ux-plan-name">Basic</span>
                <span className="ux-plan-price">$</span>
              </div>
              <div className="ux-plan featured">
                <span className="ux-plan-badge">Popular</span>
                <span className="ux-plan-name">Pro</span>
                <span className="ux-plan-price">$$</span>
              </div>
              <div className="ux-plan">
                <span className="ux-plan-name">Elite</span>
                <span className="ux-plan-price">$$$</span>
              </div>
            </div>
          </Element>

          <Element label="Buttons & badges">
            <div className="ux-chips" aria-hidden="true">
              <span className="ux-btn primary">Get started</span>
              <span className="ux-btn ghost">Learn more</span>
              <span className="ux-badge">New</span>
              <span className="ux-badge alt">Sale</span>
            </div>
          </Element>

          <Element label="Booking & contact forms">
            <div className="ux-form" aria-hidden="true">
              <span className="ux-input" />
              <span className="ux-input" />
              <span className="ux-btn primary block">Send message</span>
            </div>
          </Element>

          <Element label="Feature highlights">
            <div className="ux-feats" aria-hidden="true">
              <div className="ux-feat"><span className="ux-dot" /> Fast &amp; secure</div>
              <div className="ux-feat"><span className="ux-dot" /> Mobile-friendly</div>
              <div className="ux-feat"><span className="ux-dot" /> Easy to update</div>
            </div>
          </Element>
        </div>

        <div className="callout">
          <h2>See one built around your brand</h2>
          <p>
            Tell us about your business and we&apos;ll put together a design and an honest,
            highly affordable quote — no obligation.
          </p>
          <Link className="btn btn-primary" to="/contact">
            Get started
          </Link>
        </div>
      </section>
    </>
  );
}
