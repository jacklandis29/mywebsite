"use client";

import {
  type CSSProperties,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { playSound } from "../lib/sound";
import ScrollMasthead from "./ScrollMasthead";

const ITEMS = [
  { id: "top", label: "About" },
  { id: "writing", label: "Writing" },
  { id: "projects", label: "Projects" },
  { id: "work", label: "Work" },
  { id: "listening", label: "Listening" },
  { id: "watching", label: "Watching" },
  { id: "reading", label: "Reading" },
];

const MARK_WIDTHS = [54, 40, 24, 12];

function getStaticWaveStyle(index: number, active: number | null) {
  const activeIndex = active ?? 0;
  const distance = Math.min(Math.abs(index - activeIndex), MARK_WIDTHS.length - 1);

  return {
    "--nav-mark-width": `${MARK_WIDTHS[distance]}px`,
    "--nav-active-strength": index === activeIndex ? "1" : "0",
  } as CSSProperties;
}

export default function GlassNav() {
  const [active, setActive] = useState<number | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollTarget = useRef<number | null>(null);
  const lastActive = useRef<number | null>(null);
  const waveFrame = useRef<number | null>(null);
  const sectionOffsets = useRef<number[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sampleWaveWidth = (distance: number) => {
      if (distance >= MARK_WIDTHS.length - 1) return MARK_WIDTHS.at(-1) ?? 12;

      const lower = Math.floor(distance);
      const progress = distance - lower;
      const eased = progress * progress * (3 - 2 * progress);
      return MARK_WIDTHS[lower] + (MARK_WIDTHS[lower + 1] - MARK_WIDTHS[lower]) * eased;
    };

    const updateWave = () => {
      waveFrame.current = null;

      const offsets = sectionOffsets.current;
      if (offsets.length !== ITEMS.length) return;

      const firstLiveItem = document.querySelector<HTMLButtonElement>(
        ".glass-nav .glass-nav-item",
      );
      if (firstLiveItem && itemRefs.current[0] !== firstLiveItem) {
        itemRefs.current = Array.from(
          document.querySelectorAll<HTMLButtonElement>(".glass-nav .glass-nav-item"),
        );
      }

      const probe = window.scrollY + 96;
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      let segment = 0;

      for (let index = 1; index < offsets.length; index += 1) {
        if (offsets[index] <= probe) segment = index;
      }

      let position = segment;
      if (!atBottom && segment < offsets.length - 1) {
        const start = offsets[segment];
        const end = offsets[segment + 1];
        const sectionProgress = (probe - start) / Math.max(end - start, 1);
        const waveProgress = Math.min(
          1,
          Math.max(0, (sectionProgress - 0.18) / 0.64),
        );
        const eased =
          waveProgress *
          waveProgress *
          waveProgress *
          (waveProgress * (waveProgress * 6 - 15) + 10);
        position += reducedMotion.matches ? 0 : eased;
      } else if (atBottom) {
        position = ITEMS.length - 1;
      }

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const distance = Math.abs(index - position);
        const width = sampleWaveWidth(distance);
        const highlightProgress = Math.min(1, distance);
        const highlight =
          1 -
          highlightProgress *
            highlightProgress *
            (3 - 2 * highlightProgress);
        item.style.setProperty("--nav-mark-width", `${width.toFixed(2)}px`);
        item.style.setProperty(
          "--nav-active-strength",
          highlight.toFixed(3),
        );
      });
    };

    const scheduleWave = () => {
      if (waveFrame.current === null) {
        waveFrame.current = requestAnimationFrame(updateWave);
      }
    };

    const refreshOffsets = () => {
      sectionOffsets.current = ITEMS.map((item, index) => {
        if (index === 0) return 0;
        return document.getElementById(item.id)?.offsetTop ?? 0;
      });
      scheduleWave();
    };

    const onScroll = () => {
      scheduleWave();

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
        for (let index = 1; index < sectionOffsets.current.length; index += 1) {
          if (sectionOffsets.current[index] <= threshold) next = index;
        }
      }

      if (lastActive.current !== null && lastActive.current !== next) {
        playSound("tick");
      }
      lastActive.current = next;
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

    refreshOffsets();
    let initialFrame = requestAnimationFrame(syncInitialPosition);
    const resizeObserver = new ResizeObserver(refreshOffsets);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", refreshOffsets);
    reducedMotion.addEventListener("change", scheduleWave);
    return () => {
      cancelAnimationFrame(initialFrame);
      if (waveFrame.current !== null) cancelAnimationFrame(waveFrame.current);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", refreshOffsets);
      reducedMotion.removeEventListener("change", scheduleWave);
    };
  }, []);

  const go = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    scrollTarget.current = index;
    lastActive.current = index;
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
      <ScrollMasthead />
      <div className="glass-nav-rail">
        {ITEMS.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            className={`glass-nav-item${index === active ? " is-active" : ""}`}
            style={getStaticWaveStyle(index, active)}
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
