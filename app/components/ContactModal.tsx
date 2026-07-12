"use client";

import { FormEvent, useRef, useState } from "react";
import { playSound } from "../lib/sound";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactModal() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const toggle = () => {
    if (status === "sent") return;
    const opening = !isOpen;
    playSound(opening ? "bloom" : "droplet");
    setIsOpen(opening);
    setStatus("idle");
    setError("");
    if (opening && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => nameRef.current?.focus({ preventScroll: true }));
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
      setIsOpen(false);
      requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
      return;
    }

    const payload = await response?.json().catch(() => null);
    setError(payload?.error || "That didn’t go through. Try emailing me directly.");
    setStatus("error");
  };

  return (
    <>
      <button
        ref={triggerRef}
        className={`intro-cta${isOpen ? " is-open" : ""}${status === "sent" ? " is-sent" : ""}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls="contact-panel"
        aria-disabled={status === "sent"}
        aria-live="polite"
        onClick={toggle}
      >
        {status === "sent" ? (
          <>Thanks — message sent <span aria-hidden="true">✓</span></>
        ) : (
          <>Get in touch <span aria-hidden="true">{isOpen ? "×" : "→"}</span></>
        )}
      </button>

      <div
        id="contact-panel"
        className={`contact-reveal${isOpen ? " is-open" : ""}`}
        aria-hidden={!isOpen}
        onTransitionEnd={(event) => {
          if (isOpen && event.target === event.currentTarget && event.propertyName === "grid-template-rows") {
            nameRef.current?.focus({ preventScroll: true });
          }
        }}
      >
        <div className="contact-reveal-inner">
          <div className="contact-panel">
            <form className="contact-form" onSubmit={submit}>
              <div className="contact-fields">
                <label>
                  <span>Name</span>
                  <input ref={nameRef} name="name" type="text" autoComplete="name" maxLength={100} required />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} required />
                </label>
              </div>
              <label>
                <span>Message</span>
                <textarea name="message" rows={5} maxLength={2000} placeholder="Leave a note." required />
              </label>
              <label className="contact-honeypot" aria-hidden="true">
                <span>Company website</span>
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              {status === "error" && (
                <p className="contact-error" role="alert">
                  {error} <a href="mailto:jacklandis2@icloud.com">Email me directly</a>.
                </p>
              )}
              <div className="contact-actions">
                <button className="contact-submit" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send message"}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
