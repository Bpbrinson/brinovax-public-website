import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SiteMock } from "./SampleSites";
import type { SampleLayout, SampleSite, SampleTheme } from "../data/site";

/* ---------- tiny colour helpers (sRGB mix + HSL for a matched accent) ---------- */
const clamp = (n: number) => Math.max(0, Math.min(255, n));

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.padEnd(6, "0").slice(0, 6);
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
}
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => clamp(Math.round(v)).toString(16).padStart(2, "0")).join("");
}
function mix(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}
function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
}
function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

/** Builds a coherent, readable mini-site palette from a single brand colour. */
function deriveTheme(base: string, font: "sans" | "serif"): SampleTheme {
  const [h, s] = hexToHsl(base);
  const accent = hslToHex((h + 42) % 360, Math.min(0.72, Math.max(0.5, s)), 0.5);
  const bg = mix(base, "#ffffff", 0.93);
  const text = mix(base, "#0c0f18", 0.86);
  return {
    bg,
    surface: mix(base, "#ffffff", 0.85),
    primary: mix(base, "#000000", 0.04),
    primary2: mix(base, "#000000", 0.26),
    accent,
    text,
    muted: mix(text, bg, 0.42),
    font,
  };
}

const PRESETS = [
  { name: "Ocean", color: "#2258ff" },
  { name: "Violet", color: "#7b3ff2" },
  { name: "Emerald", color: "#12855a" },
  { name: "Sunset", color: "#e2593b" },
  { name: "Rose", color: "#c93f78" },
  { name: "Teal", color: "#0e8f9a" },
  { name: "Amber", color: "#c9821f" },
  { name: "Slate", color: "#3a4a63" },
];

const LAYOUTS: { id: SampleLayout; label: string }[] = [
  { id: "split", label: "Split" },
  { id: "centered", label: "Centered" },
  { id: "aurora", label: "Bold" },
  { id: "portfolio", label: "Gallery" },
];

// Neutral placeholder content for the live preview. Illustrative only — no real metrics.
const BASE: Omit<SampleSite, "theme" | "layout"> = {
  id: "studio",
  name: "Your Business",
  category: "Your brand",
  summary: "",
  nav: ["Home", "Services", "About", "Contact"],
  hero: {
    eyebrow: "Your tagline here",
    heading: "Your business, beautifully online.",
    sub: "A fast, secure site that turns visitors into customers — built and hosted for you.",
    cta: "Get started",
  },
  stats: [
    { value: "Fast", label: "Global CDN" },
    { value: "HTTPS", label: "Secure" },
    { value: "24/7", label: "Monitored" },
  ],
  features: [
    { title: "Fast & secure", body: "HTTPS and a global CDN, out of the box." },
    { title: "Easy to update", body: "Request a change, approve it, done." },
    { title: "Made for mobile", body: "Looks sharp on every screen size." },
  ],
  testimonial: { quote: "Exactly the site our business needed.", name: "Your customer", role: "Owner" },
};

/**
 * Live brand-color customizer. Pick a colour, style, and layout and a sample site
 * restyles instantly — a hands-on demo of how we tailor a design to a brand.
 */
export default function ThemeStudio() {
  const [color, setColor] = useState(PRESETS[0].color);
  const [font, setFont] = useState<"sans" | "serif">("sans");
  const [layout, setLayout] = useState<SampleLayout>("split");

  const sample: SampleSite = useMemo(
    () => ({ ...BASE, layout, theme: deriveTheme(color, font) }),
    [color, font, layout],
  );

  return (
    <section className="band" id="studio">
      <div className="container section">
        <div className="section-head center" style={{ marginInline: "auto" }}>
          <h2 className="section-title">Make it yours — live</h2>
          <p className="section-sub">
            Pick a color, style, and layout and watch a sample site restyle instantly. Your
            real site is tailored even further to your brand.
          </p>
        </div>

        <div className="studio-grid">
          <div className="studio-controls">
            <div className="studio-block">
              <span className="ux-label">Brand color</span>
              <div className="swatches">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    className={color === p.color ? "swatch active" : "swatch"}
                    style={{ background: p.color }}
                    onClick={() => setColor(p.color)}
                    aria-label={p.name}
                    aria-pressed={color === p.color}
                  />
                ))}
              </div>
              <label className="studio-custom">
                Custom color
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  aria-label="Choose a custom brand color"
                />
              </label>
            </div>

            <div className="studio-block">
              <span className="ux-label">Style</span>
              <div className="seg" role="group" aria-label="Font style">
                <button
                  type="button"
                  className={font === "sans" ? "active" : ""}
                  onClick={() => setFont("sans")}
                  aria-pressed={font === "sans"}
                >
                  Modern
                </button>
                <button
                  type="button"
                  className={font === "serif" ? "active" : ""}
                  onClick={() => setFont("serif")}
                  aria-pressed={font === "serif"}
                >
                  Classic
                </button>
              </div>
            </div>

            <div className="studio-block">
              <span className="ux-label">Layout</span>
              <div className="seg" role="group" aria-label="Layout style">
                {LAYOUTS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    className={layout === l.id ? "active" : ""}
                    onClick={() => setLayout(l.id)}
                    aria-pressed={layout === l.id}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="studio-note">
              Like what you see? <Link to="/contact">Get one built for your brand →</Link>
            </p>
          </div>

          <div className="studio-preview" aria-hidden="true">
            <SiteMock sample={sample} />
          </div>
        </div>
      </div>
    </section>
  );
}
