import { useCallback, useState } from "react";

export type Theme = "light" | "dark";
const STORAGE_KEY = "brinovax-theme";

/** Reads the theme currently applied to <html> (set by the no-flash script in index.html). */
function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/**
 * Site-wide light/dark theme. The initial value is whatever the inline head script
 * already applied (from localStorage or the OS preference), so there is no flash.
 * Toggling persists the choice and keeps the browser UI colour in sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const apply = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable (private mode) — the toggle still works for the session */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "dark" ? "#0a0e17" : "#2258ff");
    setTheme(next);
  }, []);

  const toggle = useCallback(() => apply(currentTheme() === "dark" ? "light" : "dark"), [apply]);

  return { theme, toggle };
}
