import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building taste into the process — Jack Landis",
  description: "Notes on making considered choices before the work feels finished.",
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

        <p className="article-kicker">Design &amp; process</p>
        <h1>Building taste into the process</h1>
        <p className="article-dek">
          Good work rarely arrives fully formed. It emerges from a process that
          knows what to notice, what to question, and when to keep going.
        </p>
        <div className="article-meta">
          <time dateTime="2026-07">July 2026</time>
          <span aria-hidden="true">·</span>
          <span>5 min read</span>
        </div>
      </header>

      <article className="article-body">
        <p>
          Taste is often treated like a finishing layer: the thing you apply
          once the strategy is sound, the system works, and the deadline is
          already uncomfortably close. By then, most of the important choices
          have been made.
        </p>

        <p>
          The more useful version of taste is operational. It changes how a
          problem is framed, which constraints are accepted, and what the team
          decides is worth polishing. It belongs inside the process, not at the
          end of it.
        </p>

        <h2>The invisible standard</h2>

        <p>
          Every project has a standard, whether anyone names it or not. You can
          see it in the questions people ask during a review. Does the team
          debate whether something is technically complete, or whether it is
          genuinely clear? Do they notice the awkward transition, the vague
          label, the moment where the product asks the user to do its thinking?
        </p>

        <p>
          Naming the standard early makes it available to everyone. “Simple” is
          too broad. “A new user should understand the next step without
          instruction” is something a team can design and test against.
        </p>

        <blockquote>
          The point is not to make every choice precious. It is to know which
          choices make everything else easier.
        </blockquote>

        <h2>Make judgment repeatable</h2>

        <p>
          A good critique should leave behind more than a list of edits. It
          should sharpen the lens used to make the next round of decisions. The
          best review question I know is simple: <em>What is this choice helping
          the person understand?</em>
        </p>

        <p>
          That question works on interfaces, operating processes, decks, and
          almost anything else made for another person. It moves the discussion
          away from preference and toward purpose without pretending aesthetics
          do not matter.
        </p>

        <h2>Taste compounds</h2>

        <p>
          Teams build taste the same way they build any other capability: by
          looking closely, developing a shared vocabulary, making choices, and
          examining what those choices produced. Over time, fewer decisions need
          to be escalated because the standard has become part of the work.
        </p>

        <p>
          The result is not a perfect process. It is a process that catches more
          of the right things while there is still time to change them.
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
