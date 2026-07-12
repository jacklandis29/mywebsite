import Image from "next/image";
import GlassNav from "./components/GlassNav";
import ContactModal from "./components/ContactModal";
import LocalTime from "./components/LocalTime";
import WorkSection from "./components/WorkSection";
import FilmCard from "./components/FilmCard";
import ProjectCard from "./components/ProjectCard";
import OverscrollReward from "./components/OverscrollReward";
import MoreWritingButton from "./components/MoreWritingButton";

const writing = [
  { year: "2026", title: "Building this site", href: "/writing/building-taste-into-the-process?from=home" },
];

const projects = [
  {
    name: "CRM to Narrative",
    description: "A source-grounded workflow that detects meaningful CRM changes, adds business context, and drafts review-ready reporting.",
    meta: "Workflow design",
    variant: "narrative",
    href: "/projects/crm-to-narrative",
  },
  {
    name: "Consilium: Agentic Trading",
    description: "A paper investment fund where specialized agents debate ideas, work within hard risk limits, and preserve what they learn.",
    meta: "System build · In progress",
    variant: "consilium",
    href: "/projects/consilium",
  },
  {
    name: "Post Credits",
    description: "A simpler film diary with a Beli-style comparison system for ranking what you watch.",
    meta: "In progress",
    variant: "after",
    href: "/projects/post-credits",
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

const reading = [
  { title: "Iron Gold", author: "Pierce Brown", cover: "/books/iron-gold.jpg" },
  { title: "Sunrise on the Reaping", author: "Suzanne Collins", cover: "/books/sunrise-on-the-reaping.jpg" },
  { title: "Project Hail Mary", author: "Andy Weir", cover: "/books/project-hail-mary.jpg" },
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

export default function Home() {
  return (
    <main className="page">
      <GlassNav />
      <header className="masthead">
        <div className="identity-lockup">
          <Image
            className="portrait"
            src="/jack.png"
            alt="Illustrated portrait of Jack Landis"
            width={72}
            height={72}
            sizes="72px"
          />
          <div>
            <h1>Jack Landis</h1>
            <p className="bio">
              I&rsquo;m based in Washington, D.C., working across data &amp; AI,
              mission systems, and forward-deployed delivery.
            </p>
          </div>
        </div>
        <ContactModal />
        <ul className="icon-links" aria-label="Elsewhere">
          <li>
            <a className="icon-link icon-link-github" href="https://github.com/jacklandis29" rel="me noopener" aria-label="GitHub" title="GitHub">
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
        <MoreWritingButton />
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <ul className="artifact-grid project-grid">
          {projects.map((project) => {
            return (
              <li key={project.name}>
                <ProjectCard {...project} />
              </li>
            );
          })}
        </ul>
      </section>

      <section id="work">
        <h2>Work</h2>
        <WorkSection />
      </section>

      <section id="listening">
        <h2>Listening</h2>
        <ul className="media-shelf album-shelf" tabIndex={0} aria-label="Albums, scroll horizontally">
          {listening.map((item) => (
            <li key={item.title}>
              <a className="album-card" href={item.href}>
                <Image
                  className="album-cover shelf-art"
                  src={item.cover}
                  alt={`${item.title} album cover`}
                  width={600}
                  height={600}
                  sizes="190px"
                />
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
              <FilmCard {...item} />
            </li>
          ))}
        </ul>
      </section>

      <section id="reading">
        <h2>Reading</h2>
        <ul className="media-shelf reading-shelf" tabIndex={0} aria-label="Books, scroll horizontally">
          {reading.map((book) => (
            <li key={book.title}>
              <Image
                className="book-cover"
                src={book.cover}
                alt={`${book.title} book cover`}
                width={400}
                height={600}
                sizes="164px"
              />
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
        <LocalTime />
      </footer>
      <OverscrollReward />
    </main>
  );
}
