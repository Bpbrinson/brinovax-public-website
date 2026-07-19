import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { NAV } from "../data/site";

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
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
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {year} Brinovax Website Hosting. Managed hosting for small businesses.</p>
          <nav aria-label="Footer">
            <NavLink to="/how-it-works">How it works</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>
      </footer>
    </div>
  );
}
