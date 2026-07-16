"use client";

import { useEffect } from "react";
import { playSound } from "../lib/sound";

const TICK_GAP_MS = 85;

export default function ShelfTicks() {
  useEffect(() => {
    const shelves = Array.from(document.querySelectorAll<HTMLElement>(".media-shelf"));
    if (!shelves.length) return;

    let lastTick = -Infinity;

    const cleanups = shelves.map((shelf) => {
      let frame = 0;
      let index = -1;

      const itemStep = () => {
        const [first, second] = shelf.children;
        if (!(first instanceof HTMLElement) || !(second instanceof HTMLElement)) return 0;
        return second.offsetLeft - first.offsetLeft;
      };

      const update = () => {
        frame = 0;
        const step = itemStep();
        if (!step) return;

        const next = Math.round(shelf.scrollLeft / step);
        if (next === index) return;
        const isFirstReading = index === -1;
        index = next;
        if (isFirstReading) return;

        const now = performance.now();
        if (now - lastTick < TICK_GAP_MS) return;
        lastTick = now;
        playSound("shelfTick");
        navigator.vibrate?.(3);
      };

      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };

      update();
      shelf.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        if (frame) cancelAnimationFrame(frame);
        shelf.removeEventListener("scroll", onScroll);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
