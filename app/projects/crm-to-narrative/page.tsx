import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CRM to Narrative — Jack Landis",
  description:
    "How I rebuilt a slow reporting handoff into a source-grounded, review-ready publishing workflow.",
};

const workflow = [
  { number: "01", label: "CRM signal", detail: "Structured data changes at the source", tone: "source" },
  { number: "02", label: "Change detection", detail: "Material movement is isolated", tone: "detect" },
  { number: "03", label: "Claude Code routine", detail: "The change is caught and checked", tone: "context" },
  { number: "04", label: "Business context", detail: "The meaning behind it is added", tone: "reason" },
  { number: "05", label: "Source verification", detail: "Every numeric claim is checked", tone: "validate" },
  { number: "06", label: "Review-ready update", detail: "A traceable brief is prepared", tone: "publish" },
];

export default function CrmToNarrativePage() {
  return (
    <main className="page project-page narrative-page">
      <header className="project-header">
        <Link className="back-link" href="/" scroll={false}>
          <span aria-hidden="true">←</span> Projects
        </Link>

        <h1>CRM to Narrative</h1>
        <p className="project-dek">
          How I turned a slow, manual reporting chain into a system that keeps
          the story attached to the numbers.
        </p>
      </header>

      <section className="narrative-workflow" aria-labelledby="workflow-title">
        <div className="narrative-workflow-header">
          <h2 id="workflow-title">From signal to story</h2>
          <span className="narrative-status"><i /> Review path active</span>
        </div>

        <ol className="narrative-flow">
          {workflow.map((step) => (
            <li className={`narrative-step narrative-step-${step.tone}`} key={step.number}>
              <span className="narrative-step-number">{step.number}</span>
              <span className="narrative-step-icon" aria-hidden="true"><i /><i /><i /></span>
              <strong>{step.label}</strong>
              <small>{step.detail}</small>
            </li>
          ))}
        </ol>

        <div className="narrative-result">
          <div className="narrative-result-rail">
            <span>Prepared brief</span>
            <strong>Material account movement</strong>
            <small>Ready for review</small>
          </div>
          <div className="narrative-result-main">
            <div className="narrative-result-topline">
              <span>Reporting update</span>
              <span className="narrative-source-badge">3 sourced claims</span>
            </div>
            <section>
              <span className="narrative-result-label">What changed</span>
              <p>
                A material opportunity moved beyond the reporting threshold,
                changing the shape of the active pipeline.
              </p>
            </section>
            <section className="narrative-rationale">
              <span className="narrative-result-label">Why it matters</span>
              <p>
                The movement is concentrated in a strategically important
                relationship, signaling a decision point that warrants focused
                follow-through.
              </p>
            </section>
            <div className="narrative-result-footer">
              <span><i className="narrative-check" /> Claims validated</span>
              <span>Source fields attached</span>
              <span>Human review retained</span>
            </div>
          </div>
        </div>
      </section>

      <article className="project-story">
        <section className="project-section">
          <h2>The manual process</h2>
          <div className="project-section-body">
            <p>
              At work, we tracked partnership activity in a CRM. The data moved
              from the CRM into an export, from the export into Power BI, and
              from Power BI into an embedded dashboard. Then someone still had
              to compare the latest version with the last one, figure out what
              had changed, and write an explanation.
            </p>
            <p>
              It was a small manual step that became a recurring drain. The
              dashboard could be current while the written update lagged behind
              it. Each cycle meant another round of comparison, context hunting,
              and rewriting.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>The workflow</h2>
          <div className="project-section-body">
            <p>
              I set up a Claude Code routine to handle that handoff. When the
              CRM data changed, the routine compared the new snapshot with the
              last published version and caught the movement that mattered.
            </p>
            <p>
              It then paired the change with a small context document I
              maintained for the team: which relationships mattered, what
              different milestones meant, and why a change was worth calling
              out. The result was a short update that explained both what moved
              and why it mattered.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>Keeping it accurate</h2>
          <div className="project-section-body">
            <p>
              The CRM stayed the source of truth. The routine could explain a
              change, but it could not invent or alter the figures. Every
              numeric claim had to resolve to a field in the validated snapshot
              before the update could move forward.
            </p>
            <p>
              I kept the source fields attached and left a human review step at
              the end. That made it easy to check the explanation against the
              dashboard before it was published.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>The result</h2>
          <div className="project-section-body">
            <p>
              A repetitive writing task became a short review. The narrative
              could move with the dashboard instead of trailing it, and the
              update was more consistent from one reporting cycle to the next.
            </p>
            <p>
              The useful part was not adding more reporting. It was closing the
              gap between a number changing and the team understanding what the
              change meant.
            </p>
          </div>
        </section>

        <section className="project-section project-note">
          <h2>About this page</h2>
          <div className="project-section-body">
            <p>
              This is a sanitized version of an internal workflow. The example
              data and scenario are illustrative.
            </p>
          </div>
        </section>
      </article>

      <footer className="article-footer project-footer">
        <p>CRM to Narrative · Reporting workflow</p>
        <Link className="back-link" href="/" scroll={false}>
          <span aria-hidden="true">←</span> Back home
        </Link>
      </footer>
    </main>
  );
}
