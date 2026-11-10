import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { projects } from '../lib/content';

export function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Project work">
        <p>Case studies of the software I helped build in CSC 324.</p>
      </PageHeader>
      <section className="section">
        <div className="container">
          <ul className="card-list">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link to={`/projects/${project.slug}`} className="card card--link">
                  <h2 className="card__title">{project.title}</h2>
                  <p>{project.tagline}</p>
                  <ul className="tag-list" aria-label="Technologies">
                    {project.stack.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <span className="text-link">
                    Read case study <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
