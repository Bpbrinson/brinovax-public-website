import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "Brinovax";
const BASE_URL = "https://brinovax.com";
const DEFAULT_DESCRIPTION =
  "Brinovax builds and hosts fast, secure websites for small businesses — on AWS, with HTTPS, a custom domain, and honest, affordable pricing.";

function upsertMeta(keyType: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${keyType}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(keyType, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Per-route SEO. Keeps title, meta description, Open Graph / Twitter tags, and the
 * canonical link in sync as the SPA navigates — so shared links and crawlers see the
 * right metadata for each page.
 */
export function useSeo({ title, description = DEFAULT_DESCRIPTION }: { title: string; description?: string }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const fullTitle = `${title} · ${SITE}`;
    const url = `${BASE_URL}${pathname === "/" ? "" : pathname}`;
    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertCanonical(url);
  }, [title, description, pathname]);
}

/** Back-compat wrapper — sets the title with the default description. */
export function usePageTitle(title: string) {
  useSeo({ title });
}
