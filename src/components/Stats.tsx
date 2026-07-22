import Reveal from "./Reveal";
import Counter from "./Counter";

// Factual, defensible platform numbers — not customer counts or testimonials. Each
// reflects a real property of the AWS-backed architecture every Brinovax site runs on.
interface Stat {
  to?: number;
  suffix?: string;
  display?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { to: 300, suffix: "+", label: "Global edge locations", sub: "Delivered fast from AWS CloudFront" },
  { to: 100, suffix: "%", label: "Pages over HTTPS", sub: "Encrypted by default, always" },
  { display: "24/7", label: "Uptime monitoring", sub: "Health-checked around the clock" },
  { display: "0", label: "Public buckets", sub: "Private storage, CDN-only access" },
];

export default function Stats() {
  return (
    <section className="stats-band">
      <div className="container section">
        <Reveal>
          <div className="section-head center" style={{ marginInline: "auto" }}>
            <h2 className="section-title">Enterprise-grade foundations, small-business simple</h2>
            <p className="section-sub">
              The same audited, automated, AWS-backed platform runs under every Brinovax site.
            </p>
          </div>
        </Reveal>
        <Reveal className="stats-grid">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-num">
                {typeof s.to === "number" ? <Counter to={s.to} suffix={s.suffix} /> : s.display}
              </span>
              <span className="stat-label">{s.label}</span>
              <span className="stat-sub">{s.sub}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
