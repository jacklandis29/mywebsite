"use client";

import { useState } from "react";

const repositoryAreas = [
  "Agent runtime",
  "Paper engine",
  "Memory layer",
  "Next.js terminal",
];

export default function ConsiliumRepoPane() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isOpen = isExpanded || isHovering;

  return (
    <aside
      className={`consilium-repo-drawer${isOpen ? " is-open" : ""}`}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsHovering(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setIsHovering(false);
      }}
    >
      <div className="consilium-repo-reveal" id="consilium-repo-details">
        <div className="consilium-repo-reveal-clip">
          <div className="consilium-repo-reveal-inner">
            <span className="consilium-repo-detail-label">Inside the repository</span>
            <p>
              The agent runtime, constrained paper engine, institutional memory,
              and operator terminal in one inspectable build.
            </p>
            <div className="consilium-repo-footer">
              <span className="consilium-repo-areas" aria-label="Repository areas">
                {repositoryAreas.map((area) => <span key={area}>{area}</span>)}
              </span>
              <a
                className="consilium-repo-link"
                href="https://github.com/jacklandis29/consilium-trading"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open repository <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        className="consilium-repo-trigger"
        data-testid="consilium-repo-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls="consilium-repo-details"
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        <span className="consilium-repo-lockup">
          <span className="consilium-repo-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
          </span>
          <span className="consilium-repo-title">
            <small>Source repository</small>
            <strong>jacklandis29/consilium-trading</strong>
          </span>
        </span>
        <span className="consilium-repo-action">
          <span className="consilium-repo-hover-label">Explore build</span>
          <i aria-hidden="true" />
        </span>
      </button>
    </aside>
  );
}
