import { useEffect, useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { NAV } from "../data/site";

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setShowTop(y > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={scrolled ? "site-header scrolled" : "site-header"}>
        <div className="container header-inner">
          <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark" aria-hidden="true">
              ▲
            </span>
            Brinovax
          </NavLink>
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            ☰
          </button>
          <nav
            id="primary-nav"
            className={open ? "site-nav open" : "site-nav"}
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/contact" className="nav-cta" onClick={() => setOpen(false)}>
              Get a quote
            </NavLink>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="brand">
              <span className="brand-mark" aria-hidden="true">
                ▲
              </span>
              Brinovax
            </span>
            <p>
              Fast, secure, affordable website hosting for small businesses — built and
              managed on AWS, reviewed before every launch.
            </p>
          </div>
          <nav className="footer-col" aria-label="Explore">
            <h2>Explore</h2>
            <NavLink to="/how-it-works">How it works</NavLink>
            <NavLink to="/examples">Examples</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
          <nav className="footer-col" aria-label="Get started">
            <h2>Get started</h2>
            <NavLink to="/contact">Contact us</NavLink>
            <a href="mailto:bpbrinson@brinovax.com">bpbrinson@brinovax.com</a>
            <NavLink to="/contact" className="btn btn-primary footer-cta">
              Get a free quote
            </NavLink>
          </nav>
        </div>
        <div className="container footer-legal">
          <p>© {year} Brinovax Website Hosting. Managed hosting for small businesses.</p>
          <p>Built on AWS · HTTPS everywhere · Reviewed before launch</p>
        </div>
      </footer>

      <button
        className={showTop ? "to-top show" : "to-top"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 15 6-6 6 6" />
        </svg>
      </button>
    </div>
  );
}
