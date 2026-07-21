import { BRINOVAX_RESPONSIBILITIES, CUSTOMER_RESPONSIBILITIES } from "../data/site";
import { useSeo } from "../hooks/usePageTitle";

export default function About() {
  useSeo({
    title: "About",
    description:
      "Brinovax gives small businesses a professional web presence without the overhead of managing cloud infrastructure — hosting, security, deployments, and monitoring, handled.",
  });
  return (
    <section className="container section">
      <p className="eyebrow">About</p>
      <h1>Website hosting, minus the guesswork.</h1>
      <p className="lede">
        Brinovax gives small businesses a professional web presence without the
        overhead of managing cloud infrastructure. We handle the hosting, security,
        deployments, and monitoring so you can focus on your business.
      </p>

      <div className="two-col">
        <div>
          <h2>What Brinovax handles</h2>
          <ul className="checklist">
            {BRINOVAX_RESPONSIBILITIES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>What you handle</h2>
          <ul className="checklist">
            {CUSTOMER_RESPONSIBILITIES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="callout">
        <h2>Built on proven infrastructure</h2>
        <p>
          Every Brinovax site runs on the same audited, automated foundation:
          private storage, a global CDN, HTTPS certificates, health checks, and
          documented rollback. The result is a site that is fast, secure, and
          dependable.
        </p>
      </div>
    </section>
  );
}
