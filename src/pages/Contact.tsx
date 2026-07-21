import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL, CONTACT_ENDPOINT } from "../data/site";
import { usePageTitle } from "../hooks/usePageTitle";

type Status = "idle" | "submitting" | "success" | "error";

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface ContactValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
// Optional phone: allow digits, spaces, and the usual + ( ) - . separators once given.
const PHONE_RE = /^[+()\-.\s\d]{7,}$/;

export function validate(values: ContactValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim()))
    errors.phone = "Please enter a valid phone number, or leave it blank.";
  if (values.message.trim().length < 10) errors.message = "Please add a little more detail (10+ characters).";
  return errors;
}

// Builds a mailto: link addressed to CONTACT_EMAIL with the inquiry prefilled.
// Used when no HTTP endpoint is configured, so inquiries reach us with zero backend.
export function buildMailto(values: ContactValues): string {
  const subject = `Website inquiry from ${values.name.trim()}`;
  const bodyLines = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim() || "(not provided)"}`,
    "",
    values.message.trim(),
  ];
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    bodyLines.join("\n"),
  )}`;
}

export default function Contact() {
  usePageTitle("Contact");
  const [values, setValues] = useState<ContactValues>({ name: "", email: "", phone: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(field: keyof ContactValues) {
    return (e: { target: { value: string } }) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      return;
    }
    setStatus("submitting");
    try {
      if (CONTACT_ENDPOINT) {
        // A real endpoint is wired up → POST the inquiry so it emails automatically.
        // No secrets are ever sent from the browser.
        const res = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, company: honeypot }),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      } else {
        // No endpoint → hand off to the visitor's mail client, addressed to us.
        window.location.href = buildMailto(values);
      }
      setStatus("success");
      setValues({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="container section narrow">
      <p className="eyebrow">Contact</p>
      <h1>Let&apos;s get your business online — affordably.</h1>
      <p className="lede">
        Tell us a little about your business and what you need. There&apos;s no cost to
        reach out and no obligation — we&apos;ll reply with a friendly, plain-English plan
        and honest, highly affordable pricing. Prefer email? Write us any time at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      {status === "success" ? (
        <div className="notice notice-success" role="status">
          Thanks — your details are on their way to us. We&apos;ll be in touch shortly.
        </div>
      ) : (
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          {/* Honeypot: hidden from people, tempting to bots. Left blank by real users. */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={update("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            {errors.name && (
              <p id="name-error" className="field-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={update("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && (
              <p id="email-error" className="field-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="phone">
              Phone number <span className="field-hint">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="e.g. (555) 123-4567"
              value={values.phone}
              onChange={update("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="field-error">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="message">How can we help?</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={update("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              required
            />
            {errors.message && (
              <p id="message-error" className="field-error">
                {errors.message}
              </p>
            )}
          </div>

          <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>

          {status === "error" && (
            <p className="notice notice-error" role="alert">
              Something went wrong sending your message. Please email us directly at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
