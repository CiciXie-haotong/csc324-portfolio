import { Link } from 'react-router-dom';
import { competencyPath, type Competency } from '../lib/content';
import { StatusBadge } from './StatusBadge';

interface CompetencyCardsProps {
  category: string;
  items: Competency[];
}

/** Card grid of the competency pages in one category, or a TODO note when it has none. */
export function CompetencyCards({ category, items }: CompetencyCardsProps) {
  if (items.length === 0) {
    return (
      <p className="empty-note">
        <mark className="todo">TODO</mark> No competency pages in this area yet. Add a Markdown file to{' '}
        <code>src/content/competencies/{category}/</code>.
      </p>
    );
  }

  return (
    <ul className="card-list card-list--grid">
      {items.map((c) => (
        <li key={c.slug}>
          <Link to={competencyPath(c)} className="card card--link">
            <StatusBadge status={c.status} />
            <h3 className="card__title">{c.title}</h3>
            <p>{c.summary}</p>
            <span className="text-link">
              View evidence <span aria-hidden="true">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
