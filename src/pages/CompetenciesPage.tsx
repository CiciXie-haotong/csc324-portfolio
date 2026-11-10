import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CompetencyCards } from '../components/CompetencyCards';
import { PageHeader } from '../components/PageHeader';
import { COMPETENCY_CATEGORIES, competenciesIn } from '../lib/content';

export function CompetenciesPage() {
  // Links like /competencies#design scroll to that category group.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <>
      <PageHeader eyebrow="Competencies" title="Competency evidence">
        <p>
          Evidence and reflection for each CSC 324 competency area. Status labels reflect only what is recorded in each
          content file; nothing here indicates instructor approval unless explicitly stated.
        </p>
      </PageHeader>

      <div className="container section">
        {COMPETENCY_CATEGORIES.map((cat) => {
          const items = competenciesIn(cat.id);
          return (
            <section key={cat.id} id={cat.id} className="category-group" aria-labelledby={`${cat.id}-h`}>
              <div className="category-group__head">
                <h2 id={`${cat.id}-h`}>
                  <Link to={`/competencies/${cat.id}`}>{cat.label}</Link>
                </h2>
                <p className="muted">
                  {cat.blurb} · {items.length} {items.length === 1 ? 'competency' : 'competencies'}
                </p>
              </div>
              <CompetencyCards category={cat.id} items={items} />
            </section>
          );
        })}
      </div>
    </>
  );
}
