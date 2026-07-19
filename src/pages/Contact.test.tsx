import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Contact, { validate } from "./Contact";

describe("contact form validation", () => {
  it("accepts a well-formed submission", () => {
    expect(
      validate({ name: "Ada", email: "ada@example.com", message: "I need a website." }),
    ).toEqual({});
  });

  it("rejects a missing name, bad email, and short message", () => {
    const errors = validate({ name: "", email: "nope", message: "hi" });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it("shows inline errors when submitting an empty form", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it("confirms success after a valid submission (no endpoint configured)", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText(/name/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/email/i), "ada@example.com");
    await user.type(screen.getByLabelText(/help/i), "I would like a website for my shop.");
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/your message has been received/i)).toBeInTheDocument();
  });
});
