"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const screenshots = [
  {
    src: "/projects/post-credits-film.png",
    alt: "Post Credits film page for Interstellar",
    caption: "Film details",
  },
  {
    src: "/projects/post-credits-home.png",
    alt: "Post Credits home and discovery interface",
    caption: "Home and discovery",
  },
  {
    src: "/projects/post-credits-search.png",
    alt: "Post Credits movie search interface",
    caption: "Film search",
  },
];

export default function PostCreditsGallery() {
  const [activeScreenshot, setActiveScreenshot] = useState<(typeof screenshots)[number] | null>(null);

  useEffect(() => {
    if (!activeScreenshot) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveScreenshot(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [activeScreenshot]);

  return (
    <>
      <div className="project-gallery" aria-label="Post Credits interface screenshots">
        {screenshots.map((screenshot) => (
          <figure key={screenshot.src}>
            <button
              className="project-gallery-button"
              type="button"
              onClick={() => setActiveScreenshot(screenshot)}
              aria-label={`View ${screenshot.caption.toLowerCase()} screenshot full size`}
            >
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={1440}
                height={900}
                sizes="(max-width: 640px) calc(100vw - 48px), 440px"
              />
            </button>
            <figcaption>{screenshot.caption}</figcaption>
          </figure>
        ))}
      </div>

      {activeScreenshot ? (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeScreenshot.caption} screenshot`}
          onClick={() => setActiveScreenshot(null)}
        >
          <button
            className="project-lightbox-close"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveScreenshot(null);
            }}
            aria-label="Close full-size screenshot"
          >
            Close
          </button>
          <Image
            src={activeScreenshot.src}
            alt={activeScreenshot.alt}
            width={1440}
            height={900}
            sizes="100vw"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
