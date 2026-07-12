"use client";

import { useEffect, useRef, useState } from "react";

type ButtonState = "idle" | "spinning" | "revealed";

export default function MoreWritingButton() {
  const [state, setState] = useState<ButtonState>("idle");
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (revealTimer.current) clearTimeout(revealTimer.current);
  }, []);

  function revealMessage() {
    if (state !== "idle") return;

    setState("spinning");
    revealTimer.current = setTimeout(() => setState("revealed"), 450);
  }

  return (
    <button
      className="section-link more-writing-button"
      type="button"
      data-state={state}
      disabled={state !== "idle"}
      onClick={revealMessage}
      aria-live="polite"
    >
      {state === "revealed" ? "More writing coming soon :)" : "More writing"}
      {state === "spinning" ? (
        <span className="more-writing-spinner" aria-hidden="true" />
      ) : state === "idle" ? (
        <span aria-hidden="true">→</span>
      ) : null}
    </button>
  );
}
