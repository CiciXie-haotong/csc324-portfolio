import { Link, useParams } from 'react-router-dom';
import { CompetencyCards } from '../components/CompetencyCards';
import { PageHeader } from '../components/PageHeader';
import { competenciesIn, getCategory } from '../lib/content';
import { NotFoundPage } from './NotFoundPage';

/** Lists every competency page in one category, e.g. /competencies/development. */
export function CompetencyCategoryPage() {
  const { category: id = '' } = useParams();
  const category = getCategory(id);
  if (!category) return <NotFoundPage />;

  const items = competenciesIn(category.id);

  return (
    <>
      <PageHeader eyebrow="Competency area" title={category.label}>
        <p>{category.blurb}</p>
        <p className="muted">
          {items.length} {items.length === 1 ? 'competency page' : 'competency pages'}. Status labels reflect only what
          is recorded in each content file.
        </p>
      </PageHeader>

      <div className="container section">
        <CompetencyCards category={category.id} items={items} />
        <p>
          <Link to="/competencies" className="text-link">
            <span aria-hidden="true">←</span> All competencies
          </Link>
        </p>
      </div>
    </>
  );
}
