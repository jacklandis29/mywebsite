import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing — Jack Landis",
  description: "Notes on building, operating, technology, and taste.",
};

const writing = [
  {
    date: "Jul 2026",
    title: "Building taste into the process",
    description: "Notes on making considered choices before the work feels finished.",
    href: "/writing/building-taste-into-the-process?from=writing",
  },
  {
    date: "May 2026",
    title: "The operator's advantage",
    description: "Why the people closest to the work are well positioned to reshape it.",
    href: "#",
  },
  {
    date: "Feb 2026",
    title: "Interfaces should explain themselves",
    description: "On clarity, restraint, and the small details that earn trust.",
    href: "#",
  },
  {
    date: "Nov 2025",
    title: "Good systems leave room for judgment",
    description: "A case for tools that support decisions without pretending to make them.",
    href: "#",
  },
  {
    date: "Aug 2025",
    title: "The useful distance between idea and execution",
    description: "What becomes visible when you stay close enough to both.",
    href: "#",
  },
  {
    date: "Apr 2025",
    title: "Software for the way work actually happens",
    description: "Designing around real behavior instead of the clean version of it.",
    href: "#",
  },
];

export default function WritingPage() {
  return (
    <main className="page writing-page">
      <header className="writing-header">
        <Link className="back-link" href="/">
          <span aria-hidden="true">←</span> Jack Landis
        </Link>
        <h1>Writing</h1>
        <p>
          Notes on building, operating, technology, and the details that make
          things feel considered.
        </p>
      </header>

      <ul className="list writing-index">
        {writing.map((post) => (
          <li key={post.title}>
            <a className="writing-entry" href={post.href}>
              <span className="writing-entry-copy">
                <span className="row-title">{post.title}</span>
                <span className="row-description">{post.description}</span>
              </span>
              <time className="row-meta">{post.date}</time>
            </a>
          </li>
        ))}
      </ul>

      <footer className="footer">
        <Link className="back-link" href="/">
          <span aria-hidden="true">←</span> Back home
        </Link>
      </footer>
    </main>
  );
}
