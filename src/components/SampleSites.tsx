import { useCallback, useEffect, useState, type CSSProperties } from "react";
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

/* A self-contained, themed mock of a small-business site — pure CSS/markup, no
   external assets. `full` adds the extra sections shown in the modal. */
function SiteMock({ sample, full = false }: { sample: SampleSite; full?: boolean }) {
  const { hero, features, nav, name, summary } = sample;
  return (
    <div className="mock" style={themeStyle(sample.theme)} data-variant={full ? "full" : "preview"}>
      <div className="mock-topbar">
        <span className="mock-logo">{name}</span>
        <nav className="mock-nav" aria-hidden="true">
          {nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </nav>
      </div>

      <div className="mock-hero">
        <span className="mock-eyebrow">{hero.eyebrow}</span>
        <p className="mock-h">{hero.heading}</p>
        <p className="mock-sub">{hero.sub}</p>
        <span className="mock-btn">{hero.cta}</span>
      </div>

      {full && (
        <div className="mock-split">
          <div className="mock-about">
            <p className="mock-kicker">About us</p>
            <p className="mock-body">{summary}</p>
            <p className="mock-body mock-dim">
              Every section here is a starting point — your copy, colors, and photos
              drop right in.
            </p>
          </div>
          <div className="mock-gallery" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={`mock-tile tile-${i % 3}`} />
            ))}
          </div>
        </div>
      )}

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
        <div className="mock-cta">
          <div>
            <strong>{hero.heading}</strong>
            <span className="mock-body">Ready when you are.</span>
          </div>
          <span className="mock-btn">{nav[nav.length - 1]}</span>
        </div>
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
