"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";

const ITEMS = [
  { id: "top", label: "About" },
  { id: "writing", label: "Writing" },
  { id: "projects", label: "Projects" },
  { id: "artifacts", label: "Artifacts" },
  { id: "work", label: "Work" },
  { id: "listening", label: "Listening" },
  { id: "watching", label: "Watching" },
  { id: "reading", label: "Reading" },
];

export default function GlassNav() {
  const [active, setActive] = useState<number | null>(null);
  const scrollTarget = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      // Smooth scrolling fires intermediate scroll events for every section it
      // passes. Keep the clicked destination active until that motion settles.
      if (scrollTarget.current !== null) {
        setActive(scrollTarget.current);
        return;
      }

      const documentElement = document.documentElement;
      const atBottom =
        window.scrollY + window.innerHeight >= documentElement.scrollHeight - 2;
      // Keep the active section anchored near the top of the viewport. Using a
      // viewport-relative threshold caused short sections (notably Work) to be
      // skipped as soon as they were scrolled into view.
      const threshold = window.scrollY + 96;
      let next = 0;

      if (atBottom) {
        next = ITEMS.length - 1;
      } else {
        for (let index = 1; index < ITEMS.length; index += 1) {
          const section = document.getElementById(ITEMS[index].id);
          if (section && section.offsetTop <= threshold) next = index;
        }
      }

      setActive(next);
    };

    const onScrollEnd = () => {
      scrollTarget.current = null;
      onScroll();
    };

    const syncInitialPosition = () => {
      if (document.documentElement.classList.contains("home-scroll-restoring")) {
        initialFrame = requestAnimationFrame(syncInitialPosition);
        return;
      }
      onScroll();
    };

    let initialFrame = requestAnimationFrame(syncInitialPosition);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, []);

  const go = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    scrollTarget.current = index;
    setActive(index);

    // Pointer focus can otherwise leave :focus-visible state hanging around
    // while the pointer races to another item. Keep focus for keyboard clicks.
    if (event.detail > 0) event.currentTarget.blur();

    if (index === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document
      .getElementById(ITEMS[index].id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="glass-nav" aria-label="Sections">
      <div className="glass-nav-rail">
        {ITEMS.map((item, index) => (
          <button
            key={item.id}
            className={`glass-nav-item${index === active ? " is-active" : ""}`}
            type="button"
            aria-current={index === active ? "true" : undefined}
            onClick={(event) => go(index, event)}
          >
            <span className="glass-nav-mark" aria-hidden="true" />
            <span className="glass-nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
