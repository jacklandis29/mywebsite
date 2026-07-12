"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type ProjectCardProps = {
  href: string;
  name: string;
  meta: string;
  description: string;
  variant: string;
};

const HOVER_INTENT_DELAY = 70;

export default function ProjectCard(props: ProjectCardProps) {
  const router = useRouter();
  const prefetchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelPrefetch = () => {
    if (prefetchTimer.current) clearTimeout(prefetchTimer.current);
    prefetchTimer.current = null;
  };

  const prefetchAfterIntent = () => {
    cancelPrefetch();
    prefetchTimer.current = setTimeout(() => router.prefetch(props.href), HOVER_INTENT_DELAY);
  };

  useEffect(() => cancelPrefetch, []);

  return (
    <Link
      className="artifact-card"
      href={props.href}
      prefetch={false}
      onMouseEnter={prefetchAfterIntent}
      onMouseLeave={cancelPrefetch}
      onFocus={() => router.prefetch(props.href)}
      onTouchStart={() => router.prefetch(props.href)}
    >
      <span className={`artifact-visual artifact-${props.variant}`} aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="artifact-copy">
        <strong>{props.name}</strong>
        <small>{props.meta}</small>
        <span>{props.description}</span>
      </span>
    </Link>
  );
}
