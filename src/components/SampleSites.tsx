import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SAMPLE_SITES, type SampleSite, type SampleTheme } from "../data/site";

function themeStyle(t: SampleTheme): CSSProperties {
  return {
    "--t-bg": t.bg,
    "--t-surface": t.surface,
    "--t-primary": t.primary,
    "--t-primary2": t.primary2,
    "--t-accent": t.accent,
    "--t-text": t.text,
    "--t-muted": t.muted,
    "--t-font": t.font === "serif" ? 'Georgia, "Times New Roman", serif' : '"Segoe UI", system-ui, sans-serif',
  } as CSSProperties;
}

/* Per-industry line-art motifs — self-hosted vector "imagery" that matches each
   theme (drawn in currentColor so it inherits white on the colored panels). */
const MOTIFS: Record<string, ReactNode> = {
  cafe: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10h11v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-4Z" />
      <path d="M16 11h2.2a2.3 2.3 0 0 1 0 4.6H16" />
      <path d="M8 6.5c.8-1 .8-1.8 0-2.8M11.5 6.5c.8-1 .8-1.8 0-2.8" />
    </g>
  ),
  salon: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="17" r="2.3" />
      <circle cx="7" cy="7" r="2.3" />
      <path d="M8.8 8.4 20 16M8.8 15.6 20 8" />
    </g>
  ),
  law: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9 12 4l8 5" />
      <path d="M5 9v9M19 9v9M9 10v7M15 10v7M12 10v7" />
      <path d="M4 20h16" />
    </g>
  ),
  fitness: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 12h10" />
      <path d="M5 9v6M7 8v8M17 8v8M19 9v6" />
    </g>
  ),
  photo: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="2.5" />
      <circle cx="12" cy="14" r="3.2" />
      <path d="M8.5 8l1.4-2.2h4.2L15.5 8" />
    </g>
  ),
  landscape: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20v-5" />
      <path d="M12 4 7.5 11h9L12 4Z" />
      <path d="M12 9l-3.5 6h7L12 9Z" />
      <path d="M4 20h16" />
    </g>
  ),
  realty: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10.5V20h12v-9.5" />
      <path d="M10.5 20v-5h3v5" />
    </g>
  ),
  boutique: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8h10l1 11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L7 8Z" />
      <path d="M9.3 8a2.7 2.7 0 0 1 5.4 0" />
    </g>
  ),
  dental: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 4.6C5.7 5 4.8 6.7 5.2 9c.3 1.7.7 3.4 1.2 5 .4 1.3.8 2.6 1.3 3.8.5 1.1 1.6.9 1.8-.3l.6-3.3c.1-.7 1-.7 1.1 0l.6 3.3c.2 1.2 1.3 1.4 1.8.3.5-1.2.9-2.5 1.3-3.8.5-1.6.9-3.3 1.2-5 .4-2.3-.5-4-2.3-4.4-1.3-.3-2 .4-3 .4s-1.7-.7-3-.4Z" />
    </g>
  ),
  agency: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5 13.7 9.8 20 11.5l-6.3 1.7L12 19.5l-1.7-6.3L4 11.5l6.3-1.7L12 3.5Z" />
      <path d="M18.5 4.5v3M20 6h-3" />
    </g>
  ),
};

const motifFor = (id: string): ReactNode => MOTIFS[id] ?? MOTIFS.agency;

/* A photo-style gallery of themed "shots" — alternating colored panels, some with
   the industry motif, some with a soft bokeh cluster, to read like real imagery. */
function Shots({ id, count }: { id: string; count: number }) {
  const motif = motifFor(id);
  return (
    <div className="mock-shots" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`mock-shot ${i % 2 === 0 ? "shot-a" : "shot-b"}`}>
          {i % 3 === 1 ? (
            <span className="shot-bokeh" />
          ) : (
            <svg className="shot-motif" viewBox="0 0 24 24">
              {motif}
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

/* A self-contained, themed mock of a small-business site — designed to look like a
   real, polished website: an image-style hero, a photo gallery, stats, and reviews.
   Pure CSS/SVG, no external assets. `full` adds the extra sections in the modal. */
function SiteMock({ sample, full = false }: { sample: SampleSite; full?: boolean }) {
  const { hero, features, nav, name, stats, testimonial, id } = sample;
  return (
    <div className="mock" style={themeStyle(sample.theme)} data-variant={full ? "full" : "preview"}>
      <div className="mock-topbar">
        <span className="mock-logo">{name}</span>
        <nav className="mock-nav" aria-hidden="true">
          {nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </nav>
        <span className="mock-navcta" aria-hidden="true">
          {nav[nav.length - 1]}
        </span>
      </div>

      <div className="mock-hero">
        <div className="mock-hero-copy">
          <span className="mock-stars" aria-hidden="true">
            <span className="s">★★★★★</span> Loved locally
          </span>
          <span className="mock-eyebrow">{hero.eyebrow}</span>
          <p className="mock-h">{hero.heading}</p>
          <p className="mock-sub">{hero.sub}</p>
          <span className="mock-hero-actions">
            <span className="mock-btn">{hero.cta}</span>
            <span className="mock-btn ghost">{nav[0]}</span>
          </span>
        </div>
        <div className="mock-art" aria-hidden="true">
          <svg className="mock-art-motif" viewBox="0 0 24 24">
            {motifFor(id)}
          </svg>
        </div>
      </div>

      <div className="mock-stats" aria-hidden="true">
        {stats.map((s) => (
          <div key={s.label} className="mock-stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="mock-block">
        <p className="mock-kicker">Featured work</p>
        <Shots id={id} count={full ? 6 : 3} />
      </div>

      <div className="mock-features">
        {features.map((f) => (
          <div key={f.title} className="mock-card">
            <span className="mock-card-icon" aria-hidden="true" />
            <strong>{f.title}</strong>
            <span className="mock-body">{f.body}</span>
          </div>
        ))}
      </div>

      {full && (
        <>
          <figure className="mock-quote">
            <blockquote>“{testimonial.quote}”</blockquote>
            <figcaption>
              <span className="mock-avatar" aria-hidden="true">
                {testimonial.name.charAt(0)}
              </span>
              <span>
                <strong>{testimonial.name}</strong>
                {testimonial.role && <span className="mock-body"> · {testimonial.role}</span>}
              </span>
            </figcaption>
          </figure>

          <div className="mock-cta">
            <div>
              <strong>{hero.heading}</strong>
              <span className="mock-body">Ready when you are.</span>
            </div>
            <span className="mock-btn">{nav[nav.length - 1]}</span>
          </div>
        </>
      )}

      <div className="mock-footer" aria-hidden="true">
        © {name}
      </div>
    </div>
  );
}

export default function SampleSites() {
  const count = SAMPLE_SITES.length;
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const current = SAMPLE_SITES[index];

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  // While the modal is open: lock body scroll and wire Escape + arrow keys.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go]);

  return (
    <section className="band" id="ideas">
      <div className="container section">
        <div className="section-head center" style={{ marginInline: "auto" }}>
          <h2 className="section-title">Design ideas to get you started</h2>
          <p className="section-sub">
            Browse example designs for different kinds of businesses. Use the arrows to
            explore, then click any design to see it full-size — we&apos;ll tailor one to
            your brand.
          </p>
        </div>

        <div
          className="sample-stage"
          role="group"
          aria-roledescription="carousel"
          aria-label="Sample website designs"
          onKeyDown={(e) => {
            if (open) return;
            if (e.key === "ArrowRight") go(1);
            else if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <button className="sample-arrow prev" onClick={() => go(-1)} aria-label="Previous design">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="sample-viewport">
            <button
              type="button"
              className="sample-frame"
              onClick={() => setOpen(true)}
              aria-label={`Explore the ${current.name} design (${current.category})`}
            >
              <SiteMock sample={current} />
              <span className="sample-caption">
                <span className="sample-caption-main">
                  <strong>{current.name}</strong>
                  <span className="sample-tag">{current.category}</span>
                </span>
                <span className="sample-explore">Click to explore →</span>
              </span>
            </button>
          </div>

          <button className="sample-arrow next" onClick={() => go(1)} aria-label="Next design">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <p className="sample-summary">{current.summary}</p>

        <div className="sample-dots" role="tablist" aria-label="Choose a design">
          {SAMPLE_SITES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === index}
              aria-label={s.name}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      {open && (
        <div className="sample-modal" role="dialog" aria-modal="true" aria-label={`${current.name} — sample design`}>
          <button className="sample-modal-backdrop" aria-label="Close preview" onClick={() => setOpen(false)} />
          <div className="sample-modal-panel">
            <header className="sample-modal-head">
              <div>
                <strong>{current.name}</strong>
                <span className="sample-tag">{current.category}</span>
              </div>
              <div className="sample-modal-controls">
                <button className="sample-arrow sm" onClick={() => go(-1)} aria-label="Previous design">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button className="sample-arrow sm" onClick={() => go(1)} aria-label="Next design">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                </button>
                <button className="sample-close" onClick={() => setOpen(false)} aria-label="Close preview">✕</button>
              </div>
            </header>

            <div className="sample-modal-scroll">
              <SiteMock sample={current} full />
            </div>

            <footer className="sample-modal-foot">
              <span>Like this style? We&apos;ll build you one like it — affordably.</span>
              <Link className="btn btn-primary" to="/contact" onClick={() => setOpen(false)}>
                Get a site like this
              </Link>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
}
