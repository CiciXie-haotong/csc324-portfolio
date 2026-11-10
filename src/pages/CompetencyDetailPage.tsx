import { Link, useParams } from 'react-router-dom';
import { Markdown } from '../components/Markdown';
import { PageHeader } from '../components/PageHeader';
import { SectionNav } from '../components/SectionNav';
import { StatusBadge } from '../components/StatusBadge';
import { competenciesIn, competencyPath, getCategory, sectionId } from '../lib/content';
import { isTodo } from '../lib/markdown';
import { NotFoundPage } from './NotFoundPage';

/** Reusable template for every competency page; content comes from Markdown files. */
export function CompetencyDetailPage() {
  const { category: categoryId = '', slug = '' } = useParams();
  const category = getCategory(categoryId);
  // Previous/next move between competencies in the same category.
  const siblings = category ? competenciesIn(category.id) : [];
  const index = siblings.findIndex((c) => c.slug === slug);
  if (!category || index === -1) return <NotFoundPage />;

  const competency = siblings[index];
  const prev = siblings[index - 1];
  const next = siblings[index + 1];

  return (
    <>
      <PageHeader eyebrow={`${category.label} competency`} title={competency.title}>
        {competency.summary && <p>{competency.summary}</p>}
        <StatusBadge status={competency.status} />
      </PageHeader>

      <div className="container with-sidebar">
        <aside className="with-sidebar__aside">
          <SectionNav label="Competency sections" headings={competency.sections.map((s) => s.heading)} />
        </aside>
        <article className="with-sidebar__main">
          {competency.sections.map((section) => {
            const id = sectionId(section.heading);
            const missing = isTodo(section.body);
            return (
              <section
                key={section.heading}
                id={id}
                tabIndex={-1}
                className={`doc-section ${missing ? 'doc-section--todo' : ''}`}
                aria-labelledby={`${id}-h`}
              >
                <h2 id={`${id}-h`}>{section.heading}</h2>
                <Markdown source={section.body || `TODO: Add ${section.heading.toLowerCase()}.`} />
              </section>
            );
          })}

          <nav className="pager" aria-label={`Other ${category.label} competencies`}>
            {prev ? (
              <Link to={competencyPath(prev)} className="pager__link">
                <span className="muted">Previous</span>
                <span>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={competencyPath(next)} className="pager__link pager__link--next">
                <span className="muted">Next</span>
                <span>{next.title}</span>
              </Link>
            )}
          </nav>
          <p>
            <Link to={`/competencies/${category.id}`} className="text-link">
              <span aria-hidden="true">←</span> All {category.label} competencies
            </Link>
          </p>
        </article>
      </div>
    </>
  );
}
