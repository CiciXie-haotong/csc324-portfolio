import { Link, useParams } from 'react-router-dom';
import { Markdown } from '../components/Markdown';
import { PageHeader } from '../components/PageHeader';
import { SectionNav } from '../components/SectionNav';
import { SmartLink } from '../components/SmartLink';
import { getProject, sectionId } from '../lib/content';
import { NotFoundPage } from './NotFoundPage';

export function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFoundPage />;

  return (
    <>
      <PageHeader eyebrow="Case study" title={project.title}>
        <p>{project.tagline}</p>
        <ul className="tag-list" aria-label="Technologies">
          {project.stack.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
        <p>
          <SmartLink href={project.repo} className="text-link">
            Source repository
          </SmartLink>
        </p>
      </PageHeader>

      <div className="container with-sidebar">
        <aside className="with-sidebar__aside">
          <SectionNav label="Case study sections" headings={project.sections.map((s) => s.heading)} />
        </aside>
        <article className="with-sidebar__main">
          {project.intro && <Markdown source={project.intro} className="lead-prose" />}
          {project.sections.map((section) => (
            <section
              key={section.heading}
              id={sectionId(section.heading)}
              className="doc-section"
              tabIndex={-1}
              aria-labelledby={`${sectionId(section.heading)}-h`}
            >
              <h2 id={`${sectionId(section.heading)}-h`}>{section.heading}</h2>
              <Markdown source={section.body || 'TODO: Add content for this section.'} />
            </section>
          ))}
          <p>
            <Link to="/projects" className="text-link">
              <span aria-hidden="true">←</span> All projects
            </Link>
          </p>
        </article>
      </div>
    </>
  );
}
