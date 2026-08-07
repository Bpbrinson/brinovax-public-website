import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window back to the top whenever the route changes.
 *
 * Single-page apps keep the scroll position across client-side navigations, so
 * clicking a nav link would otherwise drop you partway down the new page. Watching
 * the pathname and resetting the scroll makes every navigation start at the top —
 * the behavior visitors expect. Renders nothing.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
