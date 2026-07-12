"use client";

import Image from "next/image";
import { type PointerEvent, useRef } from "react";

type FilmCardProps = {
  title: string;
  meta: string;
  rating: string;
  liked: boolean;
  poster: string;
  href: string;
};

export default function FilmCard({ title, meta, rating, liked, poster, href }: FilmCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const cardRectRef = useRef<DOMRect | null>(null);

  const cacheRect = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;
    cardRectRef.current = event.currentTarget.getBoundingClientRect();
  };

  const tilt = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;
    const card = cardRef.current;
    const rect = cardRectRef.current;
    if (!card || !rect) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--film-tilt-x", `${(-y * 8).toFixed(2)}deg`);
    card.style.setProperty("--film-tilt-y", `${(x * 8).toFixed(2)}deg`);
  };

  const reset = () => {
    cardRectRef.current = null;
    cardRef.current?.style.removeProperty("--film-tilt-x");
    cardRef.current?.style.removeProperty("--film-tilt-y");
  };

  return (
    <a
      ref={cardRef}
      className="film-card"
      href={href}
      onPointerEnter={cacheRect}
      onPointerMove={tilt}
      onPointerLeave={reset}
    >
      <span className="film-poster-wrap">
        <Image
          className="film-poster"
          src={poster}
          alt={`${title} poster`}
          width={600}
          height={900}
          sizes="164px"
        />
        <span className="film-rating-overlay" aria-hidden="true">
          {rating}{liked && <span className="film-liked">♥</span>}
        </span>
      </span>
      <span className="film-copy">
        <span className="film-title">{title}</span>
        <span className="film-meta">{meta}</span>
      </span>
    </a>
  );
}
