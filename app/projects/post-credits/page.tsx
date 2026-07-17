import type { Metadata } from "next";
import Link from "next/link";
import PostCreditsGallery from "./PostCreditsGallery";

export const metadata: Metadata = {
  title: "Post Credits — Jack Landis",
  description:
    "A live film diary where comparison-based ranking keeps an honest, evolving record of your taste.",
};

const liveFeatures = [
  "Public film search and detailed film pages",
  "Diary, rewatches, and DNF entries",
  "Comparison-based personal canon",
  "Resumable ranking, undo, and re-ranking",
  "Watchlist",
  "Public profiles and community diaries",
  "Private and public notes",
  "Taste-led discovery",
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
          Letterboxd is annoying to use, but I love movies, so I built
          something of my own. It’s live now, even if it still has a few quirks.
        </p>
        <a
          className="section-link project-live-link"
          href="https://postcredits.club"
          target="_blank"
          rel="noreferrer"
        >
          Visit postcredits.club <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className="project-story">
        <section className="project-section">
          <h2>The idea</h2>
          <div className="project-section-body">
            <p>
              Post Credits is a quieter film diary built around your own taste,
              not everyone else’s ratings. You can log what you watch, keep
              notes, build a watchlist, and look back at a diary that feels like
              a personal record instead of an engagement feed.
            </p>
            <p>
              There are no ads, likes, trending lists, or star averages pulling
              your opinion in one direction. Signed-out visitors can still
              browse films and public diaries; an account turns it into your own.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>Ranking</h2>
          <div className="project-section-body">
            <p>
              Star ratings drift. A four-star movie from three years ago might
              not mean the same thing today, and most of my ratings end up
              bunched together anyway. Post Credits starts with a simple verdict,
              then asks which of two films I liked more. A handful of comparisons
              places the new film into a living personal canon.
            </p>
            <p>
              The ranking can be paused, undone, or accepted where it is. A
              rewatch can keep the old position or change it, while a DNF stays
              in the diary without pretending it belongs in the canon.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>Live now</h2>
          <div className="project-section-body">
            <p className="project-progress-copy">
              The first public version is live at postcredits.club. It has real
              accounts, hosted diaries, public film browsing, and enough of the
              core loop to use the way I intended.
            </p>
            <p className="project-progress-copy">
              It is also not done. There are still rough edges in the sign-in,
              navigation, and ranking flows, and discovery will get better as
              people build real canons. I wanted to put it in the world before
              every corner felt finished.
            </p>
            <ul className="mvp-grid">
              {liveFeatures.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        </section>
      </div>

      <PostCreditsGallery />

      <div className="project-story">
        <section className="project-section">
          <h2>Technology</h2>
          <div className="project-section-body project-stack">
            <p><strong>Product</strong><span>Next.js · React · TypeScript · responsive web UI</span></p>
            <p><strong>Backend</strong><span>Supabase · PostgreSQL · authentication · row-level security</span></p>
            <p><strong>Film data</strong><span>TMDB API · server-side proxy and caching</span></p>
            <p><strong>Ranking</strong><span>Deterministic comparison engine · resumable sessions · undo</span></p>
            <p><strong>Deployment</strong><span>Cloudflare Workers · Vinext · custom domain</span></p>
          </div>
        </section>

        <section className="project-section">
          <h2>Next</h2>
          <div className="project-section-body">
            <p>
              I’m working through the launch quirks, pressure-testing the logging
              and ranking flows with real use, and making the recommendations and
              public profiles more useful. After that: importing old film history,
              a proper year in review, and better ways to see how taste changes
              over time.
            </p>
          </div>
        </section>
      </div>

      <footer className="article-footer project-footer">
        <p>Post Credits · Live and in progress</p>
        <Link className="back-link" href="/" scroll={false}>
          <span aria-hidden="true">←</span> Back home
        </Link>
      </footer>
    </main>
  );
}
