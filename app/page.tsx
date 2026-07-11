"use client";

import { useEffect, useState } from "react";

const sections = ["About", "Writing", "Projects", "Activity"] as const;
type Section = (typeof sections)[number];

const writing = [
  {
    date: "JUL 2026",
    title: "Building taste into the process",
    excerpt: "A few notes on making software feel considered before it feels finished.",
  },
  {
    date: "MAY 2026",
    title: "The operator's advantage",
    excerpt: "Why the people closest to the work are best positioned to reshape it with AI.",
  },
  {
    date: "FEB 2026",
    title: "Interfaces should explain themselves",
    excerpt: "On clarity, restraint, and the quiet details that earn a user's trust.",
  },
];

const projects = [
  {
    index: "01",
    name: "PricePoint",
    type: "PRODUCT · 2026",
    description: "A clearer way for restaurant teams to understand purchasing, pricing, and what comes next.",
    color: "violet",
  },
  {
    index: "02",
    name: "Relay",
    type: "EXPERIMENT · 2026",
    description: "A compact exploration of how context can move cleanly between people and their tools.",
    color: "amber",
  },
  {
    index: "03",
    name: "Work Memory",
    type: "RESEARCH · ONGOING",
    description: "A private, citation-first system for finding the ideas and decisions buried in everyday work.",
    color: "blue",
  },
];

const activity = [
  ["Now", "Designing and building this corner of the internet."],
  ["This week", "Exploring more tactile, useful interfaces for AI products."],
  ["Recently", "Shipped a demo for restaurant procurement teams."],
  ["Always", "Collecting good films, strange ideas, and overly specific playlists."],
];

export default function Home() {
  const [active, setActive] = useState<Section>("About");
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("site-theme");
    const nextDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(nextDark);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    window.localStorage.setItem("site-theme", dark ? "dark" : "light");
  }, [dark]);

  const selectSection = (section: Section) => {
    setActive(section);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="mobile-header">
        <button className="mobile-brand" onClick={() => selectSection("About")}>
          <span className="brand-mark">JL</span>
          <span>Jack Landis</span>
        </button>
        <button
          className="round-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "×" : "＋"}
        </button>
      </header>

      <aside className={`glass-sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="sidebar-shine" aria-hidden="true" />
        <button className="identity" onClick={() => selectSection("About")}>
          <span className="brand-mark">JL</span>
          <span>
            <strong>Jack Landis</strong>
            <small>New York, NY</small>
          </span>
        </button>

        <nav aria-label="Primary navigation">
          {sections.map((section, index) => (
            <button
              key={section}
              className={`nav-item ${active === section ? "active" : ""}`}
              onClick={() => selectSection(section)}
              aria-current={active === section ? "page" : undefined}
            >
              <span className="nav-number">0{index + 1}</span>
              <span>{section}</span>
              <span className="nav-arrow">↗</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a className="availability" href="mailto:hello@jacklandis.com">
            <span className="status-dot" />
            Open to interesting work
          </a>
          <div className="footer-actions">
            <button
              className="round-button"
              onClick={() => setDark((value) => !value)}
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {dark ? "☼" : "◐"}
            </button>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </aside>

      <section className="content" key={active}>
        <div className="section-label">
          <span>0{sections.indexOf(active) + 1}</span>
          <span>{active}</span>
        </div>

        {active === "About" && <About onExplore={() => selectSection("Projects")} />}
        {active === "Writing" && <Writing />}
        {active === "Projects" && <Projects />}
        {active === "Activity" && <Activity />}
      </section>
    </main>
  );
}

function About({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="about-view view-enter">
      <div className="hero-copy">
        <p className="eyebrow"><span /> DESIGN · OPERATIONS · AI</p>
        <h1>I turn complicated work into <em>clear, useful things.</em></h1>
        <p className="intro">
          I’m Jack, an operator and builder interested in the space between a good idea and the moment it becomes real.
        </p>
        <div className="hero-actions">
          <button className="primary-button" onClick={onExplore}>
            Explore my work <span>↗</span>
          </button>
          <a className="text-link" href="mailto:hello@jacklandis.com">Say hello <span>→</span></a>
        </div>
      </div>

      <div className="lens-stage" aria-label="An abstract glass sculpture">
        <div className="grid-plane" />
        <div className="orb orb-back" />
        <div className="glass-lens">
          <span className="lens-glow" />
          <span className="lens-ring" />
        </div>
        <p>Clarity through curiosity</p>
      </div>

      <div className="about-notes">
        <p>Currently focused on thoughtful AI products, operational systems, and the small details that make technology feel natural.</p>
        <p>Previously, I’ve helped teams untangle messy processes, find signal in their data, and ship work people actually want to use.</p>
      </div>
    </div>
  );
}

function Writing() {
  return (
    <div className="listing-view view-enter">
      <div className="page-heading">
        <p className="eyebrow"><span /> NOTES & OBSERVATIONS</p>
        <h1>Thinking in public, <em>occasionally.</em></h1>
        <p>Writing about building, operating, taste, and the increasingly blurry space between them.</p>
      </div>
      <div className="writing-list">
        {writing.map((item) => (
          <article className="writing-row" key={item.title}>
            <time>{item.date}</time>
            <div><h2>{item.title}</h2><p>{item.excerpt}</p></div>
            <span className="row-arrow">↗</span>
          </article>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="listing-view view-enter">
      <div className="page-heading">
        <p className="eyebrow"><span /> SELECTED WORK</p>
        <h1>A few things I’ve helped <em>bring to life.</em></h1>
        <p>Products, systems, and experiments shaped by curiosity and made useful through iteration.</p>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <div className={`project-art ${project.color}`}>
              <span className="project-index">{project.index}</span>
              <div className="art-glass"><span /></div>
            </div>
            <div className="project-copy">
              <p>{project.type}</p>
              <h2>{project.name}</h2>
              <span>{project.description}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Activity() {
  return (
    <div className="listing-view activity-view view-enter">
      <div className="page-heading">
        <p className="eyebrow"><span /> CURRENT SIGNAL</p>
        <h1>What I’m doing <em>right now.</em></h1>
        <p>A lightweight log of what has my attention, updated whenever the signal changes.</p>
      </div>
      <div className="activity-card">
        <div className="activity-orbit"><span /><i /></div>
        <div className="activity-list">
          {activity.map(([time, note]) => (
            <div key={time}><time>{time}</time><p>{note}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}
