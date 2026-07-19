import { Link } from "react-router-dom";
import { TIERS } from "../data/site";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Pricing() {
  usePageTitle("Pricing");
  return (
    <section className="container section">
      <p className="eyebrow">Pricing</p>
      <h1>Simple plans for small businesses.</h1>
      <p className="lede">
        Choose the level of involvement you want. Final prices and edit allowances are
        confirmed during onboarding.
      </p>

      <div className="pricing-grid">
        {TIERS.map((tier) => (
          <article
            key={tier.name}
            className={tier.featured ? "price-card featured" : "price-card"}
          >
            {tier.featured && <span className="badge">Most popular</span>}
            <h2>{tier.name}</h2>
            <p className="price">Contact for pricing</p>
            <p className="tier-tagline">{tier.tagline}</p>
            <ul className="checklist">
              {tier.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link className="btn btn-primary" to="/contact">
              {tier.cta}
            </Link>
          </article>
        ))}
      </div>

      <p className="fine-print">
        Excludes emergency 24/7 incident response, custom backend development,
        regulated-data storage, e-commerce payment processing, and SEO guarantees
        unless separately contracted.
      </p>
    </section>
  );
}
