import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';

export function NotFoundPage() {
  return (
    <PageHeader eyebrow="404" title="Page not found">
      <p>That page does not exist.</p>
      <p>
        <Link to="/" className="text-link">
          <span aria-hidden="true">←</span> Back home
        </Link>
      </p>
    </PageHeader>
  );
}
