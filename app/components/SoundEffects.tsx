"use client";

import { useEffect } from "react";
import { playSound, unlockAudio } from "../lib/sound";

const INTERACTIVE_SELECTOR = "a, button, [role='button']";
const QUIET_SELECTOR = ".artifact-card, .film-card, .album-card, [aria-expanded]";
const HOVER_GAP_MS = 180;

export default function SoundEffects() {
  useEffect(() => {
    let lastHoverTarget: Element | null = null;
    let lastHoverTime = -Infinity;

    const onPointerDown = (event: PointerEvent) => {
      void unlockAudio();
      if (
        event.pointerType === "mouse" &&
        event.target instanceof Element &&
        event.target.closest(INTERACTIVE_SELECTOR) &&
        !event.target.closest(QUIET_SELECTOR)
      ) {
        playSound("press");
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return;

      const target = event.target.closest(INTERACTIVE_SELECTOR);
      if (
        !target ||
        target.matches(QUIET_SELECTOR) ||
        target === lastHoverTarget ||
        !document.body.contains(target)
      ) return;

      const now = performance.now();
      if (now - lastHoverTime < HOVER_GAP_MS) return;
      if (!playSound("tick")) return;

      lastHoverTarget = target;
      lastHoverTime = now;
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest(INTERACTIVE_SELECTOR);
      if (target && !(event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) {
        lastHoverTarget = null;
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") void unlockAudio();
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.detail === 0 &&
        event.target instanceof Element &&
        event.target.closest(INTERACTIVE_SELECTOR) &&
        !event.target.closest(QUIET_SELECTOR)
      ) {
        playSound("press");
      }
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("pointerout", onPointerOut, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("pointerout", onPointerOut, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
