import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routing", () => {
  it("renders the home hero", () => {
    renderAt("/");
    expect(
      screen.getByRole("heading", { name: /built and hosted the right way/i }),
    ).toBeInTheDocument();
  });

  it("renders the pricing page with all three tiers", () => {
    renderAt("/pricing");
    expect(screen.getByRole("heading", { name: /simple plans/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Starter Hosting" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Managed Hosting" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Custom Build" })).toBeInTheDocument();
  });

  it("shows a not-found page for unknown routes", () => {
    renderAt("/does-not-exist");
    expect(screen.getByRole("heading", { name: /couldn.t find that page/i })).toBeInTheDocument();
  });

  it("exposes the primary navigation", () => {
    renderAt("/");
    const nav = screen.getByRole("navigation", { name: /primary/i });
    expect(nav).toBeInTheDocument();
  });
});
