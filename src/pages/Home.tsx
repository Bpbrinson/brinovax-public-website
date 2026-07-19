import { Link } from "react-router-dom";
import { STEPS } from "../data/site";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Home() {
  usePageTitle("Fast, secure website hosting");
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Managed website hosting</p>
          <h1>Your business website, built and hosted the right way.</h1>
          <p className="lede">
            Brinovax builds fast, secure websites and hosts them on AWS — private
            storage behind a global CDN, HTTPS, and your own custom domain. You
            review every change before it goes live.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" to="/contact">
              Get started
            </Link>
            <Link className="btn btn-ghost" to="/how-it-works">
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="feature-grid">
          <article className="feature">
            <h2>Fast by default</h2>
            <p>
              Static delivery from a global CDN means your pages load quickly for
              visitors anywhere, with automatic HTTPS.
            </p>
          </article>
          <article className="feature">
            <h2>Secure &amp; private</h2>
            <p>
              Your files sit in private storage that only the CDN can read — never a
              publicly exposed bucket.
            </p>
          </article>
          <article className="feature">
            <h2>Reviewed before launch</h2>
            <p>
              Every change is previewed on a development URL and health-checked before
              it is promoted to production.
            </p>
          </article>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">From intake to launch</h2>
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
        </div>
      </section>
    </>
  );
}
