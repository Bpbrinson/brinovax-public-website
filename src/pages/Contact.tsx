import { useState, type FormEvent } from "react";
import { CONTACT_ENDPOINT } from "../data/site";
import { usePageTitle } from "../hooks/usePageTitle";

type Status = "idle" | "submitting" | "success" | "error";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Please add a little more detail (10+ characters).";
  return errors;
}

export default function Contact() {
  usePageTitle("Contact");
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(field: keyof typeof values) {
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
      // No endpoint configured → simulate success without any network call.
      // No secrets are ever sent from the browser.
      if (CONTACT_ENDPOINT) {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      }
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="container section narrow">
      <p className="eyebrow">Contact</p>
      <h1>Let&apos;s talk about your website.</h1>
      <p className="lede">
        Tell us a little about your business and what you need. We&apos;ll get back to
        you to plan next steps.
      </p>

      {status === "success" ? (
        <div className="notice notice-success" role="status">
          Thanks — your message has been received. We&apos;ll be in touch shortly.
        </div>
      ) : (
        <form className="contact-form" onSubmit={onSubmit} noValidate>
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
              Something went wrong sending your message. Please try again later.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
