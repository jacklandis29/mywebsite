"use client";

import { useEffect, useState } from "react";

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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const documentElement = document.documentElement;
      const atBottom =
        window.scrollY + window.innerHeight >= documentElement.scrollHeight - 2;
      const threshold = window.scrollY + window.innerHeight / 3;
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

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (index: number) => {
    setActive(index);
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
            onClick={() => go(index)}
          >
            <span className="glass-nav-mark" aria-hidden="true" />
            <span className="glass-nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
