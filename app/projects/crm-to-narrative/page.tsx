import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CRM to Narrative — Jack Landis",
  description:
    "A source-grounded AI workflow for turning CRM changes into contextual, review-ready reporting.",
};

const workflow = [
  { number: "01", label: "CRM signal", detail: "Structured data changes at the source", tone: "source" },
  { number: "02", label: "Change detection", detail: "Material movement is isolated", tone: "detect" },
  { number: "03", label: "Context layer", detail: "Operating knowledge frames the change", tone: "context" },
  { number: "04", label: "Narrative reasoning", detail: "The what and why are drafted", tone: "reason" },
  { number: "05", label: "Validation gate", detail: "Every numeric claim is checked", tone: "validate" },
  { number: "06", label: "Review-ready update", detail: "A traceable brief is prepared", tone: "publish" },
];

const principles = [
  "Data remains the source of truth",
  "Interpretation is grounded in context",
  "Material changes receive attention",
  "Numeric claims are validated",
  "Outputs stay reviewable and traceable",
  "The pattern can be reused across teams",
];

export default function CrmToNarrativePage() {
  return (
    <main className="page project-page narrative-page">
      <header className="project-header">
        <Link className="back-link" href="/#projects">
          <span aria-hidden="true">←</span> Projects
        </Link>

        <p className="project-kicker">Applied AI · Sanitized workflow</p>
        <h1>CRM to Narrative</h1>
        <p className="project-dek">
          A source-grounded reporting workflow that turns meaningful CRM
          changes into contextual, review-ready narrative—without asking AI to
          invent the facts.
        </p>
      </header>

      <section className="narrative-workflow" aria-labelledby="workflow-title">
        <div className="narrative-workflow-header">
          <div>
            <span className="narrative-eyebrow">System view</span>
            <h2 id="workflow-title">From signal to story</h2>
          </div>
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
            <span>Generated brief</span>
            <strong>Material account movement</strong>
            <small>Prepared for review</small>
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

      <div className="project-story">
        <section className="project-section">
          <h2>Problem</h2>
          <div className="project-section-body">
            <p>
              Operational reporting rarely ends when the dashboard refreshes.
              Someone still has to notice what moved, determine what is
              meaningful, recover the relevant context, and explain the change
              clearly. That final mile is repetitive, slow, and easy to handle
              inconsistently.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>System</h2>
          <div className="project-section-body">
            <p>
              The workflow watches structured CRM data for material changes,
              combines those signals with a controlled business-context layer,
              and drafts an update that separates what changed from why it
              matters. The result is prepared for review and publication rather
              than buried in another export.
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>Trust</h2>
          <div className="project-section-body">
            <p>
              The core design constraint is simple: numbers come from validated
              data; AI provides interpretation. Numeric claims are checked
              against their source fields before the narrative moves forward,
              preserving provenance and a human review path.
            </p>
            <p className="project-statement">
              “The model explains the signal. It does not own the truth.”
            </p>
          </div>
        </section>

        <section className="project-section">
          <h2>Pattern</h2>
          <div className="project-section-body">
            <ul className="principle-grid">
              {principles.map((principle) => <li key={principle}>{principle}</li>)}
            </ul>
          </div>
        </section>

        <section className="project-section">
          <h2>Note</h2>
          <div className="project-section-body">
            <p>
              This public artifact abstracts an operating workflow implemented
              for an internal team. The data, scenarios, and organizational
              context shown here are synthetic; the system pattern and design
              decisions are representative.
            </p>
          </div>
        </section>
      </div>

      <footer className="article-footer project-footer">
        <p>CRM to Narrative · Applied AI workflow</p>
        <Link className="back-link" href="/#projects">
          <span aria-hidden="true">←</span> Back home
        </Link>
      </footer>
    </main>
  );
}
