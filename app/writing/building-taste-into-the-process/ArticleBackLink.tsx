"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type ArticleBackLinkProps = {
  footer?: boolean;
};

export function ArticleBackLink({ footer = false }: ArticleBackLinkProps) {
  const cameFromHome = useSearchParams().get("from") === "home";
  const href = cameFromHome ? "/#writing" : "/writing";
  const label = footer
    ? cameFromHome ? "Back home" : "All writing"
    : cameFromHome ? "Jack Landis" : "Writing";

  return (
    <Link className="back-link" href={href}>
      <span aria-hidden="true">←</span> {label}
    </Link>
  );
}
