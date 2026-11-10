import { Link } from 'react-router-dom';
import { featuredProjectSlug, site } from '../content/site';
import { COMPETENCY_CATEGORIES, competenciesIn, daybook, getProject } from '../lib/content';

export function HomePage() {
  const featured = getProject(featuredProjectSlug);
  const latest = daybook[0];

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <p className="eyebrow reveal">{site.course} · Grinnell College</p>
          <h1 className="hero__title reveal">{site.name}</h1>
          <p className="hero__lead reveal">{site.tagline}</p>
          <div className="hero__actions reveal">
            <Link to={featured ? `/projects/${featured.slug}` : '/projects'} className="button">
              Read the GrinnSkill case study
            </Link>
            <Link to="/competencies" className="button button--ghost">
              Browse competencies
            </Link>
          </div>
        </div>
      </section>

      {featured && (
        <section className="section" aria-labelledby="featured-heading">
          <div className="container">
            <h2 id="featured-heading" className="section-title">
              Featured project
            </h2>
            <article className="feature-card">
              <div className="feature-card__body">
                <h3 className="feature-card__title">{featured.title}</h3>
                <p>{featured.tagline}</p>
                <ul className="tag-list" aria-label="Technologies">
                  {featured.stack.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>
                <Link to={`/projects/${featured.slug}`} className="text-link">
                  View case study <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="feature-card__media placeholder" aria-hidden="true">
                <span className="placeholder__tag">Image TODO</span>
                <span className="placeholder__caption">GrinnSkill screenshot</span>
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="section section--tinted" aria-labelledby="competency-heading">
        <div className="container">
          <h2 id="competency-heading" className="section-title">
            Competency overview
          </h2>
          <p className="section-lead">
            Evidence for the CSC 324 competency areas. Each page follows the same template so the work can be reviewed
            consistently.
          </p>
          <ul className="category-grid">
            {COMPETENCY_CATEGORIES.map((cat) => {
              const count = competenciesIn(cat.id).length;
              return (
                <li key={cat.id}>
                  <Link to={`/competencies/${cat.id}`} className="category-card">
                    <span className="category-card__label">{cat.label}</span>
                    <span className="category-card__blurb">{cat.blurb}</span>
                    <span className="category-card__count">
                      {count} {count === 1 ? 'competency' : 'competencies'}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {latest && (
        <section className="section" aria-labelledby="daybook-heading">
          <div className="container">
            <h2 id="daybook-heading" className="section-title">
              Latest from the daybook
            </h2>
            <p>
              <time dateTime={latest.date} className="mono">
                {latest.date}
              </time>{' '}
              — {latest.title}
            </p>
            <Link to="/daybook" className="text-link">
              Open the engineering daybook <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
