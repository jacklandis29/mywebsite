"use client";

import { useEffect } from "react";

export default function ScrollMasthead() {
  useEffect(() => {
    let frame = 0;
    const masthead = document.querySelector<HTMLElement>(".masthead");
    if (!masthead) return;

    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, (window.scrollY - 18) / 150));
      masthead.style.setProperty("--masthead-progress", progress.toFixed(3));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      masthead.style.removeProperty("--masthead-progress");
    };
  }, []);

  return null;
}
