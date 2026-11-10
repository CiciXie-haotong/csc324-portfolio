import { useState } from 'react';
import { Markdown } from '../components/Markdown';
import { PageHeader } from '../components/PageHeader';
import { daybook } from '../lib/content';

export function DaybookPage() {
  const allTags = [...new Set(daybook.flatMap((e) => e.tags))].sort();
  const [tag, setTag] = useState<string | null>(null);
  const entries = tag ? daybook.filter((e) => e.tags.includes(tag)) : daybook;

  return (
    <>
      <PageHeader eyebrow="Engineering daybook" title="Development log">
        <p>
          A chronological record of what I worked on, what I learned, and what is next. Newest entries first. Each entry
          is a Markdown file in <code>src/content/daybook/</code>.
        </p>
      </PageHeader>

      <div className="container section">
        {allTags.length > 0 && (
          <div className="filter-bar" role="group" aria-label="Filter entries by tag">
            <button type="button" aria-pressed={tag === null} onClick={() => setTag(null)}>
              All
            </button>
            {allTags.map((t) => (
              <button key={t} type="button" aria-pressed={tag === t} onClick={() => setTag(t)}>
                {t}
              </button>
            ))}
          </div>
        )}

        {entries.length === 0 ? (
          <p className="empty-note">
            <mark className="todo">TODO</mark> No entries yet.
          </p>
        ) : (
          <ol className="timeline">
            {entries.map((entry) => (
              <li key={entry.slug} className="timeline__item">
                <article aria-labelledby={`entry-${entry.slug}`}>
                  <time className="timeline__date mono" dateTime={entry.date}>
                    {entry.date || 'Date TODO'}
                  </time>
                  <h2 id={`entry-${entry.slug}`} className="timeline__title">
                    {entry.title}
                  </h2>
                  {entry.tags.length > 0 && (
                    <ul className="tag-list" aria-label="Tags">
                      {entry.tags.map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Markdown source={entry.body} />
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
