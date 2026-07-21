import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Contact, { buildMailto, validate } from "./Contact";

describe("contact form validation", () => {
  it("accepts a well-formed submission", () => {
    expect(
      validate({ name: "Ada", email: "ada@example.com", phone: "", message: "I need a website." }),
    ).toEqual({});
  });

  it("accepts an optional phone number", () => {
    expect(
      validate({
        name: "Ada",
        email: "ada@example.com",
        phone: "(555) 123-4567",
        message: "I need a website.",
      }),
    ).toEqual({});
  });

  it("rejects a missing name, bad email, bad phone, and short message", () => {
    const errors = validate({ name: "", email: "nope", phone: "abc", message: "hi" });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.phone).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it("builds a mailto link addressed to bpbrinson@brinovax.com with the phone included", () => {
    const link = buildMailto({
      name: "Ada",
      email: "ada@example.com",
      phone: "555-1234",
      message: "I would like a website.",
    });
    expect(link).toContain("mailto:bpbrinson@brinovax.com");
    expect(link).toContain(encodeURIComponent("555-1234"));
    expect(link).toContain(encodeURIComponent("ada@example.com"));
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

  it("POSTs the enquiry (with the honeypot field) and confirms success", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 200, json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText(/name/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/email/i), "ada@example.com");
    await user.type(screen.getByLabelText(/phone/i), "555-1234");
    await user.type(screen.getByLabelText(/help/i), "I would like a website for my shop.");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/on their way to us/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0];
    const sent = JSON.parse(init.body as string);
    expect(sent).toMatchObject({ name: "Ada Lovelace", phone: "555-1234", company: "" });

    vi.unstubAllGlobals();
  });
});
