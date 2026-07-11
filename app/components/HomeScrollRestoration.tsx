"use client";

import { useEffect } from "react";

const STORAGE_KEY = "jack-landis-home-scroll";

export default function HomeScrollRestoration() {
  useEffect(() => {
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    const isReload = navigation?.type === "reload";
    const previousRestoration = history.scrollRestoration;
    let revealTimer = 0;

    const savePosition = () => {
      sessionStorage.setItem(STORAGE_KEY, String(window.scrollY));
    };

    if (isReload) {
      history.scrollRestoration = "manual";
      const storedPosition = Number(sessionStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(storedPosition)) {
        const restore = () => {
          window.scrollTo({ top: storedPosition, behavior: "instant" });
          document.documentElement.classList.remove("home-scroll-restoring");
        };
        requestAnimationFrame(() => requestAnimationFrame(restore));
        window.addEventListener("load", restore, { once: true });
        revealTimer = window.setTimeout(restore, 350);
      }
    } else {
      document.documentElement.classList.remove("home-scroll-restoring");
    }

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(savePosition);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", savePosition);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(revealTimer);
      savePosition();
      history.scrollRestoration = previousRestoration;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", savePosition);
    };
  }, []);

  return null;
}
