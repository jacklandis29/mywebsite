import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building this site — Jack Landis",
  description: "I needed to start making things again, so I built this site.",
};

export default async function ArticlePage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const cameFromHome = from === "home";
  const backHref = cameFromHome ? "/#writing" : "/writing";
  const backLabel = cameFromHome ? "Jack Landis" : "Writing";

  return (
    <main className="page article-page">
      <header className="article-header">
        <Link className="back-link" href={backHref}>
          <span aria-hidden="true">←</span> {backLabel}
        </Link>

        <p className="article-kicker">A note on making things</p>
        <h1>Building this site</h1>
        <p className="article-dek">
          I needed to start making things again, so I built this site.
        </p>
        <div className="article-meta">
          <time dateTime="2026-07">July 2026</time>
          <span aria-hidden="true">·</span>
          <span>3 min read</span>
        </div>
      </header>

      <article className="article-body">
        <p>
          I had been thinking about building a personal site for a while. Mostly
          I was thinking about building a lot of things. I had notes, half-formed
          ideas, screenshots, and folders full of things I might get around to.
          At some point I realized I needed to stop organizing the possibility
          of making something and actually make something.
        </p>

        <p>
          This site became the kickstart. It was small enough to begin without a
          grand plan, but personal enough that I would care about getting it
          right. More importantly, it gave the next thing I build somewhere to
          go.
        </p>

        <h2>More than a resume</h2>

        <p>
          I knew I did not want to paste my resume onto a webpage and call it a
          portfolio. Work is part of the site, but so are movies, music, books,
          ideas, and unfinished projects. That mix is a more honest picture of
          me than a polished list of accomplishments would be.
        </p>

        <p>
          The question I kept coming back to was simple: if my name disappeared
          from the top, would this still feel like mine? The restrained layout,
          the small interactions, the project previews, and the space for what I
          am reading, watching, and listening to all came from trying to make
          the answer yes.
        </p>

        <blockquote>
          I wanted the site to feel like a place I would actually keep coming
          back to.
        </blockquote>

        <h2>Figuring it out by building</h2>

        <p>
          I did not have a complete design system or a perfect picture of the
          finished site. I built a version, looked at it, noticed what felt
          generic, and changed it. Some ideas sounded good until I saw them on
          the page. Others only started working after the content was real.
        </p>

        <p>
          A lot of the work was small: moving things a few pixels, rewriting a
          sentence, removing a section, making an interaction feel less stiff.
          None of it sounds especially important on its own. Together, those
          choices are the site.
        </p>

        <p>
          The useful part was having something real to react to. Thinking had
          gotten me only so far. Building made the decisions obvious.
        </p>

        <h2>Something to build from</h2>

        <p>
          Finishing the first version did more than give me a website. It broke
          the feeling that every idea needed to become a fully formed project
          before it was worth starting. I can put something small here. I can
          follow a weird idea for a weekend. I can make it better later.
        </p>

        <p>
          That is probably the real reason I built it. I wanted some momentum. A
          home for the things I make is useful, but becoming someone who is
          making things again matters more.
        </p>

        <p>
          The site is not finished. I do not really want it to be. I want the
          writing to grow, the projects to get deeper, and the personal sections
          to keep changing with me. For now, it exists. That was the point.
        </p>
      </article>

      <footer className="article-footer">
        <p>Thanks for reading.</p>
        <Link className="back-link" href={backHref}>
          <span aria-hidden="true">←</span> {cameFromHome ? "Back home" : "All writing"}
        </Link>
      </footer>
    </main>
  );
}
