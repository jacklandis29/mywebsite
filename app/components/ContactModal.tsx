"use client";

import { FormEvent, useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactModal() {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const toggle = () => {
    const opening = !isOpen;
    setIsOpen(opening);
    setStatus("idle");
    setError("");
    if (opening && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => messageRef.current?.focus({ preventScroll: true }));
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch(() => null);

    if (response?.ok) {
      form.reset();
      setStatus("sent");
      return;
    }

    const payload = await response?.json().catch(() => null);
    setError(payload?.error || "That didn’t go through. Try emailing me directly.");
    setStatus("error");
  };

  return (
    <>
      <button
        className={`intro-cta${isOpen ? " is-open" : ""}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls="contact-panel"
        onClick={toggle}
      >
        Get in touch <span aria-hidden="true">{isOpen ? "×" : "→"}</span>
      </button>

      <div
        id="contact-panel"
        className={`contact-reveal${isOpen ? " is-open" : ""}`}
        aria-hidden={!isOpen}
        onTransitionEnd={(event) => {
          if (
            isOpen &&
            event.target === event.currentTarget &&
            event.propertyName === "grid-template-rows"
          ) {
            messageRef.current?.focus({ preventScroll: true });
          }
        }}
      >
        <div className="contact-reveal-inner">
          <div className="contact-panel">
          {status === "sent" ? (
            <div className="contact-success" role="status">
              <span className="contact-success-mark" aria-hidden="true">✓</span>
              <h2>Message sent.</h2>
              <p>Thanks for reaching out. I’ll get back to you soon.</p>
              <button type="button" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          ) : (
            <>
              <form className="contact-form" onSubmit={submit}>
                <label>
                  <span>Message</span>
                  <textarea
                    ref={messageRef}
                    name="message"
                    rows={5}
                    maxLength={2000}
                    placeholder="Leave a note—and your email if you’d like a reply."
                    required
                  />
                </label>
                <label className="contact-honeypot" aria-hidden="true">
                  <span>Company website</span>
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>

                {status === "error" && (
                  <p className="contact-error" role="alert">
                    {error}{" "}
                    <a href="mailto:jacklandis2@icloud.com">Email me directly</a>.
                  </p>
                )}

                <div className="contact-actions">
                  <button className="contact-submit" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send message"}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </form>
            </>
          )}
          </div>
        </div>
      </div>
    </>
  );
}
