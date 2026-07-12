import type { Metadata } from "next";
import Link from "next/link";
import PostCreditsGallery from "./PostCreditsGallery";

export const metadata: Metadata = {
  title: "Post Credits — Jack Landis",
  description:
    "An in-progress film diary built as a simpler alternative to Letterboxd.",
};

const inProgress = [
  "Film search and detail pages",
  "Comparison-based ranking",
  "Diary and ranked canon",
  "Watchlist",
  "Rewatches and DNF entries",
  "Private and public notes",
  "Taste-led discovery",
  "Responsive web experience",
];

export default function PostCreditsPage() {
  return (
    <main className="page project-page post-credits-page">
      <header className="project-header">
        <Link className="back-link" href="/" scroll={false}>
          <span aria-hidden="true">←</span> Projects
        </Link>

        <h1>Post Credits</h1>
        <p className="project-dek">
          Letterboxd is annoying to use, but I love movies, so I thought I’d
          build something of my own.
        </p>
      </header>

      <div className="project-story">
        <section className="project-section">
          <h2>The idea</h2>
          <div className="project-section-body">
            <p>
              Post Credits is a simpler film diary without the ads and clutter.
              It is a place to log what I watch, keep notes, build a watchlist,
              and look back at my taste over time.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>Ranking</h2>
          <div className="project-section-body">
            <p>
              A Beli-style comparison system asks which of two films you liked
              more, then uses those choices to build a personal ranking. It is
              easier than assigning stars and gives you a better sense of what
              you actually like and dislike.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>Now</h2>
          <div className="project-section-body">
            <p className="project-progress-copy">
              This is still in progress. The current build includes:
            </p>
            <ul className="mvp-grid">
              {inProgress.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        </section>
      </div>

      <PostCreditsGallery />

      <div className="project-story">
        <section className="project-section">
          <h2>Technology</h2>
          <div className="project-section-body project-stack">
            <p><strong>Product</strong><span>Next.js · React · responsive web UI</span></p>
            <p><strong>Backend</strong><span>Supabase · PostgreSQL · authentication · row-level security</span></p>
            <p><strong>Film data</strong><span>TMDB API · server-side proxy and caching</span></p>
            <p><strong>Ranking</strong><span>Deterministic comparison engine · resumable sessions · undo</span></p>
          </div>
        </section>

        <section className="project-section">
          <h2>Next</h2>
          <div className="project-section-body">
            <p>
              I’m focused on getting the ranking flow right, improving discovery,
              and making the diary feel good enough to keep coming back to.
            </p>
          </div>
        </section>
      </div>

      <footer className="article-footer project-footer">
        <p>Post Credits · In progress</p>
        <Link className="back-link" href="/" scroll={false}>
          <span aria-hidden="true">←</span> Back home
        </Link>
      </footer>
    </main>
  );
}
