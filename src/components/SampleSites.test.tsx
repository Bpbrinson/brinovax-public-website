import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SampleSites from "./SampleSites";

const renderIt = () =>
  render(
    <MemoryRouter>
      <SampleSites />
    </MemoryRouter>,
  );

describe("sample-site carousel", () => {
  it("cycles to the next design when the next arrow is clicked", async () => {
    const user = userEvent.setup();
    renderIt();
    expect(screen.getAllByText("Bloom Café").length).toBeGreaterThan(0);
    await user.click(screen.getByRole("button", { name: /next design/i }));
    expect(screen.getAllByText("Luxe Hair Studio").length).toBeGreaterThan(0);
  });

  it("wraps to the last design when the previous arrow is clicked first", async () => {
    const user = userEvent.setup();
    renderIt();
    await user.click(screen.getByRole("button", { name: /previous design/i }));
    expect(screen.getAllByText("GreenScape").length).toBeGreaterThan(0);
  });

  it("opens a click-through preview modal and closes it on Escape", async () => {
    const user = userEvent.setup();
    renderIt();
    await user.click(screen.getByRole("button", { name: /explore the bloom café design/i }));
    const dialog = screen.getByRole("dialog");
    expect(
      within(dialog).getByRole("link", { name: /get a site like this/i }),
    ).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
