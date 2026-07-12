"use client";

import { useState } from "react";

const roles = [
  {
    id: "deloitte",
    company: "Deloitte",
    role: "AI & Engineering",
    date: "Current",
    logo: (
      <span className="work-logo-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="work-logo work-logo-light" src="/deloitte.png" alt="" width={24} height={24} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="work-logo work-logo-dark work-logo-deloitte-dark" src="/deloitte-dark.png" alt="" width={24} height={24} />
      </span>
    ),
    detail:
      "Consultant in Government & Public Services, leading data governance for a federated data mesh across five enterprise domains at a federal agency—product definition, executive briefings, and delivery. On the side: go-to-market for the defense and national security sector, and agentic-AI prototyping that turns capture requirements into working demos.",
    href: "https://www.deloitte.com",
    linkLabel: "deloitte.com",
  },
  {
    id: "jnj",
    company: "Johnson & Johnson",
    role: "Data Engineering",
    date: "Previously",
    logo: (
      <span className="work-logo-frame work-logo-frame-jandj">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="work-logo work-logo-jandj" src="/jnj-mark.png" alt="" width={32} height={22} />
      </span>
    ),
    detail:
      "Summer on the MedTech supply chain team, building Azure and Databricks ETL pipelines to automate ingestion of SKU and warehouse data, and documenting schema and lineage standards for downstream analytics.",
    href: "https://www.jnj.com",
    linkLabel: "jnj.com",
  },
];

export default function WorkSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      {roles.map((item) => {
        const isOpen = open === item.id;
        return (
          <div className="work-entry" key={item.id}>
            <button
              className={`work-row${isOpen ? " is-open" : ""}`}
              type="button"
              aria-expanded={isOpen}
              aria-controls={`work-detail-${item.id}`}
              onClick={() => setOpen(isOpen ? null : item.id)}
            >
              <span className="work-identity">
                {item.logo}
                <span className="work-company">{item.company}</span>
                <span className="work-role">{item.role}</span>
              </span>
              <span className="work-date">
                {item.date}
                <span className="work-chevron" aria-hidden="true" />
              </span>
            </button>
            <div
              id={`work-detail-${item.id}`}
              className={`work-reveal${isOpen ? " is-open" : ""}`}
              aria-hidden={!isOpen}
            >
              <div className="work-reveal-inner">
                <p className="work-detail">{item.detail}</p>
                <a className="work-detail-link" href={item.href} rel="noopener" tabIndex={isOpen ? 0 : -1}>
                  {item.linkLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
