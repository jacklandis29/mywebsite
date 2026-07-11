import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "After Credits — Jack Landis",
  description: "A no-bloat home for people who genuinely love film.",
};

const principles = [
  "Exceptional design",
  "Fast performance",
  "Great discovery",
  "Clean UX",
  "High-quality data",
  "Minimal clutter",
];

const mvp = [
  "Search movies",
  "Beautiful movie pages",
  "Ratings and reviews",
  "Watchlists",
  "Custom lists",
  "User profiles",
  "Quiet activity",
  "Trending and new films",
];

export default function AfterCreditsPage() {
  return (
    <main className="page project-page">
      <header className="project-header">
        <Link className="back-link" href="/#projects">
          <span aria-hidden="true">←</span> Projects
        </Link>

        <p className="project-kicker">Product concept · In development</p>
        <h1>After Credits</h1>
        <p className="project-dek">
          A no-bloat home for people who genuinely love film—designed to feel
          more like a beautiful publication or Apple app than a social network.
        </p>
      </header>

      <figure className="project-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/after-credits-hero.png"
          alt="After Credits concept artwork reading Your film diary, in order"
          width={1512}
          height={794}
        />
      </figure>

      <div className="project-story">
        <section className="project-section">
          <h2>Vision</h2>
          <div className="project-section-body">
            <p>
              After Credits is built around movies—not engagement metrics. The
              interface stays out of the way so that imagery, writing, discovery,
              and personal taste can take the foreground.
            </p>
            <p className="project-statement">
              “This is what Letterboxd should have become.”
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>Principles</h2>
          <div className="project-section-body">
            <ul className="principle-grid">
              {principles.map((principle) => <li key={principle}>{principle}</li>)}
            </ul>
          </div>
        </section>

        <section className="project-section">
          <h2>Direction</h2>
          <div className="project-section-body">
            <p>
              Dark-first and cinematic: deep blacks, high contrast, technicolor
              blue and purple, premium typography, and almost no unnecessary
              chrome. The reference point is Apple TV, A24, Neon, Nothing, and
              editorial film magazines—not dashboards or generic SaaS.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>Core</h2>
          <div className="project-section-body">
            <p>
              Movie pages, ratings, reviews, watchlists, lists, profiles, and
              discovery form the foundation. The differentiator is not a longer
              feature list. It is taste: better typography, spacing, imagery,
              motion, browsing, and editorial judgment.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>MVP</h2>
          <div className="project-section-body">
            <ul className="mvp-grid">
              {mvp.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        </section>

        <section className="project-section">
          <h2>Technology</h2>
          <div className="project-section-body project-stack">
            <p><strong>Frontend</strong><span>Next.js · React · dark-first responsive UI</span></p>
            <p><strong>Backend</strong><span>Supabase · PostgreSQL · authentication</span></p>
            <p><strong>Film data</strong><span>TMDB API · server-side access token</span></p>
          </div>
        </section>

        <section className="project-section">
          <h2>Later</h2>
          <div className="project-section-body">
            <p>
              Taste-based recommendations, editorial collections, lightweight
              social discovery, a polished “what should I watch tonight?” flow,
              and companion apps for iOS and Android—all built only after the
              foundation feels exceptional.
            </p>
          </div>
        </section>
      </div>

      <footer className="article-footer project-footer">
        <p>After Credits · In development</p>
        <Link className="back-link" href="/#projects">
          <span aria-hidden="true">←</span> Back home
        </Link>
      </footer>
    </main>
  );
}
