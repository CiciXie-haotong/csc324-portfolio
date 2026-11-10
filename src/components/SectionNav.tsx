import { sectionId } from '../lib/content';

interface SectionNavProps {
  headings: string[];
  label: string;
}

/**
 * In-page table of contents. Uses buttons + scrollIntoView rather than #hash
 * links, because the router already uses the URL hash for page routes.
 */
export function SectionNav({ headings, label }: SectionNavProps) {
  const jump = (heading: string) => {
    const target = document.getElementById(sectionId(heading));
    if (!target) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    target.focus({ preventScroll: true });
  };

  return (
    <nav className="section-nav" aria-label={label}>
      <p className="section-nav__title">On this page</p>
      <ol>
        {headings.map((heading) => (
          <li key={heading}>
            <button type="button" onClick={() => jump(heading)}>
              {heading}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
