import type { Metadata } from "next";
import Link from "next/link";
import ConsiliumRepoPane from "./ConsiliumRepoPane";

export const metadata: Metadata = {
  title: "Consilium: Agentic Trading — Jack Landis",
  description:
    "An agent-operated paper investment fund built around inspectable decisions, hard risk controls, and durable institutional memory.",
};

const decisionFlow = [
  { number: "01", label: "Research", detail: "Structured sources", tone: "blue" },
  { number: "02", label: "Investment memo", detail: "Analyst thesis", tone: "gold" },
  { number: "03", label: "Counter-memo", detail: "Challenge case", tone: "red" },
  { number: "04", label: "PM decision", detail: "Final ruling", tone: "gold" },
  { number: "05", label: "Risk engine", detail: "Sizing and limits", tone: "red" },
  { number: "06", label: "Paper execution", detail: "Immutable event", tone: "blue" },
  { number: "07", label: "Monitoring", detail: "Thesis checks", tone: "blue" },
  { number: "08", label: "Post-mortem", detail: "Outcome review", tone: "red" },
  { number: "09", label: "Reusable lesson", detail: "Institutional memory", tone: "gold" },
];

const currentBuild = [
  "Multi-sector research agents",
  "Memo and counter-memo workflow",
  "Portfolio-manager decisions",
  "Paper execution and accounting",
  "Hard risk and sizing constraints",
  "Position monitoring",
  "Post-mortems and reusable lessons",
  "Versioned institutional memory",
  "Source trust and citation tracking",
  "Agent cost and failure monitoring",
  "Read-only operator terminal",
  "Agent and execution kill switches",
];

export default function ConsiliumPage() {
  return (
    <main className="page project-page consilium-page">
      <header className="project-header">
        <Link className="back-link" href="/" scroll={false}>
          <span aria-hidden="true">←</span> Projects
        </Link>

        <h1>Consilium</h1>
        <p className="project-dek">
          Investment research gets more useful when the reasoning survives
          longer than the conversation, so I built a paper fund designed to
          remember.
        </p>
      </header>

      <div className="consilium-system-stack">
        <section className="consilium-system" aria-labelledby="decision-flow-title">
          <div className="consilium-system-header">
            <div>
              <span className="consilium-eyebrow">Decision lifecycle</span>
              <h2 id="decision-flow-title">How a decision moves</h2>
            </div>
            <span className="consilium-paper-state"><i /> Paper only</span>
          </div>

          <ol className="consilium-flow">
            {decisionFlow.map((step) => (
              <li className={`consilium-step consilium-step-${step.tone}`} key={step.number}>
                <span className="consilium-step-number">{step.number}</span>
                <span className="consilium-step-mark" aria-hidden="true"><i /><i /></span>
                <strong>{step.label}</strong>
                <small>{step.detail}</small>
              </li>
            ))}
          </ol>

          <div className="consilium-memory-loop">
            <span aria-hidden="true">↳</span>
            <p><strong>Lessons return to research.</strong> The next memo can retrieve the outcomes, disagreements, and prior assumptions that came before it.</p>
          </div>
        </section>
        <ConsiliumRepoPane />
      </div>

      <article className="project-story">
        <section className="project-section">
          <h2>The idea</h2>
          <div className="project-section-body">
            <p>
              Consilium is an agent-operated investment fund that researches
              public companies, debates ideas, makes paper-trading decisions,
              and learns from what happens afterward.
            </p>
            <p>
              It is not an AI stock picker or trading dashboard. The experiment
              is the process around the decision: analysts, a challenger, a
              portfolio manager, risk controls, post-mortems, and an
              institutional memory that compounds over time. It never trades
              real money.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>The council</h2>
          <div className="project-section-body">
            <p>
              Sector analysts research companies and write investment memos. A
              challenger looks for weak assumptions and missing risks. A
              portfolio manager reads both sides and makes the final paper
              decision. Position monitors revisit open ideas, and a librarian
              turns completed trades into reusable lessons.
            </p>
            <p>
              They do not work through an open-ended group chat. Every handoff
              is a structured artifact that can be reviewed, traced, and
              challenged later.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>Memory</h2>
          <div className="project-section-body">
            <p>
              The most important part of the project is not the agents. It is
              what the system remembers.
            </p>
            <p>
              Consilium keeps doctrine, research, theses, decisions, execution
              records, post-mortems, and lessons in a versioned institutional
              memory. Agents can add to it, but important changes to the fund’s
              rules still require human approval. The goal is to improve the
              process instead of starting each new session with a larger prompt.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>Risk</h2>
          <div className="project-section-body">
            <p>
              The agents do not control the boundaries. Position sizing,
              concentration, cash levels, cooldown periods, the tradable
              universe, and the paper-only kill switch are enforced in code.
              Portfolio activity is recorded as immutable events so the current
              state can be reconstructed and audited.
            </p>
            <p>
              Numbers used in a decision must come from structured market or
              filing data. Web research can add context, but it is not trusted
              as the source of financial figures.
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
              {currentBuild.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        </section>

        <section className="project-section">
          <h2>Technology</h2>
          <div className="project-section-body project-stack">
            <p><strong>Runtime</strong><span>Python · FastAPI · Pydantic · structured agent workflows</span></p>
            <p><strong>Memory</strong><span>PostgreSQL · pgvector · hybrid search · Git-versioned artifacts</span></p>
            <p><strong>Paper engine</strong><span>Event-sourced portfolio · deterministic constraints · simulated execution</span></p>
            <p><strong>Research</strong><span>Anthropic models · SEC EDGAR · structured market data</span></p>
            <p><strong>Interface</strong><span>Next.js · React · TypeScript · responsive operator terminal</span></p>
          </div>
        </section>

        <section className="project-section">
          <h2>Next</h2>
          <div className="project-section-body">
            <p>
              I’m replacing the remaining demonstration data in the terminal,
              tightening the live read models, and running the system long
              enough to learn whether the memory actually improves its
              decisions.
            </p>
          </div>
        </section>
      </article>

      <footer className="article-footer project-footer">
        <p>Consilium · In progress</p>
        <Link className="back-link" href="/" scroll={false}>
          <span aria-hidden="true">←</span> Back home
        </Link>
      </footer>
    </main>
  );
}
