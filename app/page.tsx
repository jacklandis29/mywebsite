import GlassNav from "./components/GlassNav";
import HomeScrollRestoration from "./components/HomeScrollRestoration";
import Link from "next/link";

const writing = [
  { year: "2026", title: "Building taste into the process", href: "/writing/building-taste-into-the-process?from=home" },
  { year: "2026", title: "The operator's advantage", href: "#" },
  { year: "2026", title: "Interfaces should explain themselves", href: "#" },
];

const projects = [
  {
    name: "CSOP Harness",
    description: "A client delivery workspace that turns solicitation requirements into sprint plans and working prototypes.",
    meta: "Client Build",
    preview: "harness",
  },
  {
    name: "Staffing Coordination",
    description: "A local-LLM tool for candidate screening, interviewer assignment, and automated standup summaries.",
    meta: "AI Tool",
    preview: "staffing",
  },
  {
    name: "CRM to Narrative",
    description: "A source-grounded workflow that detects meaningful CRM changes, adds business context, and drafts review-ready reporting.",
    meta: "Applied AI",
    href: "/projects/crm-to-narrative",
    preview: "narrative",
  },
  {
    name: "After Credits",
    description: "A cinematic, no-bloat home for people who genuinely love film.",
    meta: "Concept",
    href: "/projects/after-credits",
    preview: "after",
  },
  {
    name: "PricePoint",
    description: "Purchasing and pricing clarity for restaurant teams.",
    meta: "Product",
    preview: "pricepoint",
  },
];

const listening = [
  {
    title: "Forever, Michael",
    artist: "Michael Jackson",
    year: "1975",
    cover: "/albums/forever-michael.jpg",
    href: "https://music.apple.com/us/album/forever-michael/1444039101",
  },
  {
    title: "ICEMAN",
    artist: "Drake",
    year: "2026",
    cover: "/albums/iceman.jpg",
    href: "https://music.apple.com/us/album/iceman/6769649287",
  },
  {
    title: "James Blake: Music Room",
    artist: "James Blake",
    year: "2026",
    cover: "/albums/james-blake-music-room.jpg",
    href: "https://music.apple.com/us/album/james-blake-music-room/6779919200",
  },
];

const artifacts = [
  {
    name: "CSOP Harness",
    kind: "System map",
    description: "Requirements → sprint plan → working prototype",
    variant: "harness",
  },
  {
    name: "CRM to Narrative",
    kind: "Workflow",
    description: "Validated signal → contextual narrative → review-ready update",
    variant: "narrative",
    href: "/projects/crm-to-narrative",
  },
  {
    name: "After Credits",
    kind: "Product brief",
    description: "Film diary concept, interaction model, and build direction",
    variant: "after",
    href: "/projects/after-credits",
  },
];

const reading = [
  { title: "Iron Gold", author: "Pierce Brown", tone: "gold" },
  { title: "Sunrise on the Reaping", author: "Suzanne Collins", tone: "sunrise" },
  { title: "Project Hail Mary", author: "Andy Weir", tone: "space" },
];

const watching = [
  {
    title: "Backrooms",
    meta: "2026",
    rating: "★★★½",
    liked: false,
    poster: "/films/backrooms.jpg",
    href: "https://letterboxd.com/film/backrooms-2026/",
  },
  {
    title: "Project Hail Mary",
    meta: "2026",
    rating: "★★★½",
    liked: false,
    poster: "/films/project-hail-mary.jpg",
    href: "https://letterboxd.com/film/project-hail-mary/",
  },
  {
    title: "Interstellar",
    meta: "Jul 11 · 2014",
    rating: "★★★★★",
    liked: true,
    poster: "/films/interstellar.jpg",
    href: "https://letterboxd.com/film/interstellar/",
  },
  {
    title: "The Sheep Detectives",
    meta: "Jul 3 · 2026",
    rating: "★★★★★",
    liked: true,
    poster: "/films/the-sheep-detectives.jpg",
    href: "https://letterboxd.com/film/the-sheep-detectives/",
  },
  {
    title: "Obsession",
    meta: "Jul 10 · 2025",
    rating: "★★★★★",
    liked: false,
    poster: "/films/obsession.jpg",
    href: "https://letterboxd.com/film/obsession-2025/",
  },
];

function ProjectPreview({ name, variant }: { name: string; variant: string }) {
  return (
    <span className={`project-preview project-preview-${variant}`} aria-hidden="true">
      <span className="project-preview-titlebar">
        <span className="project-preview-dots"><i /><i /><i /></span>
        <small>{name}</small>
      </span>
      <span className="project-preview-canvas">
        <span className="project-preview-sidebar"><i /><i /><i /><i /></span>
        <span className="project-preview-main">
          <span className="project-preview-heading"><i /><i /></span>
          <span className="project-preview-visual"><i /><i /><i /></span>
          <span className="project-preview-caption"><i /><i /></span>
        </span>
      </span>
    </span>
  );
}

export default function Home() {
  return (
    <main className="page">
      <HomeScrollRestoration />
      <GlassNav />
      <header className="masthead">
        <div className="identity-lockup">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="portrait"
            src="/jack.png"
            alt="Illustrated portrait of Jack Landis"
            width={72}
            height={72}
          />
          <div>
            <h1>Jack Landis</h1>
            <p className="bio">
              I&rsquo;m a builder in Washington, D.C., working across agentic AI,
              mission systems, and forward-deployed delivery.
            </p>
          </div>
        </div>
        <a className="intro-cta" href="mailto:jacklandis2@gmail.com">
          Get in touch <span aria-hidden="true">→</span>
        </a>
        <ul className="icon-links" aria-label="Elsewhere">
          <li>
            <a className="icon-link icon-link-email" href="mailto:jacklandis2@gmail.com" aria-label="Email Jack Landis" title="jacklandis2@gmail.com">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
              </svg>
            </a>
          </li>
          <li>
            <a className="icon-link icon-link-github" href="https://github.com" rel="me noopener" aria-label="GitHub" title="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </li>
          <li>
            <a className="icon-link icon-link-linkedin" href="https://www.linkedin.com/in/jacklandis" rel="me noopener" aria-label="LinkedIn" title="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5.34 3.63a2.08 2.08 0 1 1 0 4.16 2.08 2.08 0 0 1 0-4.16ZM3.54 9.37h3.61V20.5H3.54V9.37Zm5.75 0h3.46v1.52h.05c.48-.91 1.66-1.87 3.42-1.87 3.66 0 4.34 2.41 4.34 5.54v5.94h-3.61v-5.27c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.79v5.36H9.29V9.37Z" />
              </svg>
            </a>
          </li>
          <li>
            <a className="icon-link icon-link-letterboxd" href="https://letterboxd.com/jack529/" rel="me noopener" aria-label="Letterboxd" title="Letterboxd">
              <svg viewBox="0 0 28 24" aria-hidden="true">
                <circle className="letterboxd-orange" cx="8" cy="12" r="6" />
                <circle className="letterboxd-green" cx="14" cy="12" r="6" />
                <circle className="letterboxd-blue" cx="20" cy="12" r="6" />
              </svg>
            </a>
          </li>
        </ul>
      </header>

      <section id="writing">
        <h2>Writing</h2>
        <ul className="list">
          {writing.map((post) => (
            <li key={post.title}>
              <a className="row" href={post.href}>
                <span className="row-title">{post.title}</span>
                <span className="row-meta">{post.year}</span>
              </a>
            </li>
          ))}
        </ul>
        <Link className="section-link" href="/writing">
          See all writing <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <ul className="list">
          {projects.map((project) => {
            const content = (
              <>
                <span className="row-title">
                  {project.name}
                  <span className="row-meta">{project.meta}</span>
                </span>
                <span className="row-description">{project.description}</span>
                <ProjectPreview name={project.name} variant={project.preview} />
              </>
            );

            return (
              <li key={project.name}>
                {"href" in project ? (
                  <Link className="row row-stacked project-link project-item" href={project.href}>
                    {content}
                  </Link>
                ) : (
                  <div className="row row-stacked project-item" tabIndex={0}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section id="artifacts">
        <h2>Artifacts</h2>
        <ul className="artifact-grid">
          {artifacts.map((artifact) => {
            const content = (
              <>
                <span className={`artifact-visual artifact-${artifact.variant}`} aria-hidden="true">
                  <i /><i /><i /><i />
                </span>
                <span className="artifact-copy">
                  <strong>{artifact.name}</strong>
                  <small>{artifact.kind}</small>
                  <span>{artifact.description}</span>
                </span>
              </>
            );

            return (
              <li key={artifact.name}>
                {"href" in artifact ? (
                  <Link className="artifact-card" href={artifact.href}>{content}</Link>
                ) : (
                  <div className="artifact-card">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section id="work">
        <h2>Work</h2>
        <a className="work-row" href="https://www.deloitte.com" rel="noopener">
          <span className="work-identity">
            <span className="work-logo-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="work-logo work-logo-light" src="/deloitte.png" alt="" width={24} height={24} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="work-logo work-logo-dark work-logo-deloitte-dark" src="/deloitte-dark.png" alt="" width={24} height={24} />
            </span>
            <span className="work-company">Deloitte</span>
            <span className="work-role">AI &amp; Engineering</span>
          </span>
          <span className="work-date">Current</span>
        </a>
        <a className="work-row" href="https://www.jnj.com" rel="noopener">
          <span className="work-identity">
            <span className="work-logo-frame work-logo-frame-jandj">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="work-logo work-logo-light work-logo-jandj" src="/jnj-mark.png" alt="" width={32} height={22} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="work-logo work-logo-dark work-logo-jandj-dark" src="/jnj-dark.png" alt="" width={32} height={22} />
            </span>
            <span className="work-company">Johnson &amp; Johnson</span>
            <span className="work-role">Data Engineering</span>
          </span>
          <span className="work-date">Previously</span>
        </a>
      </section>

      <section id="listening">
        <h2>Listening</h2>
        <ul className="media-shelf album-shelf" tabIndex={0} aria-label="Albums, scroll horizontally">
          {listening.map((item) => (
            <li key={item.title}>
              <a className="album-card" href={item.href}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="album-cover shelf-art" src={item.cover} alt={`${item.title} album cover`} width={600} height={600} />
                <span className="album-copy">
                  <span className="album-title">{item.title}</span>
                  <span className="album-meta">{item.artist} · {item.year}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="watching">
        <div className="section-heading">
          <h2>Watching</h2>
          <a className="letterboxd-link" href="https://letterboxd.com/jack529/" rel="me noopener">
            <span className="letterboxd-dots" aria-hidden="true"><i /><i /><i /></span>
            jack529 <span aria-hidden="true">↗</span>
          </a>
        </div>
        <ul className="media-shelf film-grid" tabIndex={0} aria-label="Films, scroll horizontally">
          {watching.map((item) => (
            <li key={item.title}>
              <a className="film-card" href={item.href}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="film-poster" src={item.poster} alt={`${item.title} poster`} width={600} height={900} />
                <span className="film-copy">
                  <span className="film-title">{item.title}</span>
                  <span className="film-meta">{item.meta}</span>
                  <span className="film-rating">
                    {item.rating}{item.liked && <span className="film-liked" aria-label="Liked">♥</span>}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="reading">
        <h2>Reading</h2>
        <ul className="reading-shelf">
          {reading.map((book) => (
            <li key={book.title}>
              <div className={`book-cover book-cover-${book.tone}`} aria-hidden="true">
                <span>{book.title}</span>
                <small>{book.author}</small>
              </div>
              <span className="book-copy">
                <strong>{book.title}</strong>
                <small>{book.author}</small>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Jack Landis</p>
      </footer>
    </main>
  );
}
