import { Link } from "react-router-dom";
import { STEPS } from "../data/site";
import { usePageTitle } from "../hooks/usePageTitle";

export default function HowItWorks() {
  usePageTitle("How it works");
  return (
    <section className="container section">
      <p className="eyebrow">How it works</p>
      <h1>A calm, reviewable path from idea to live site.</h1>
      <p className="lede">
        Brinovax turns website hosting into a repeatable, safe process. Nothing goes
        live until you have seen it and approved it.
      </p>

      <ol className="steps steps-lg">
        {STEPS.map((step, i) => (
          <li key={step.title} className="step">
            <span className="step-num" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="callout">
        <h2>Reversible by design</h2>
        <p>
          Deployments are versioned. If something is not right, we roll back to the
          previous approved version — quickly and safely.
        </p>
        <Link className="btn btn-primary" to="/contact">
          Start your project
        </Link>
      </div>
    </section>
  );
}
