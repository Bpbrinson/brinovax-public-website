import { FAQS } from "../data/site";

/* Accessible, keyboard-friendly FAQ using native <details>/<summary>. */
export default function Faq() {
  return (
    <div className="faq">
      {FAQS.map((item) => (
        <details key={item.q} className="faq-item">
          <summary>
            <span>{item.q}</span>
            <span className="faq-chevron" aria-hidden="true" />
          </summary>
          <div className="faq-answer">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
