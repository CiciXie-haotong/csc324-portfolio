import { isTodo } from '../lib/markdown';

/** Shows a competency's status exactly as written in its content file. */
export function StatusBadge({ status }: { status: string }) {
  const todo = isTodo(status);
  return (
    <span className={`badge ${todo ? 'badge--todo' : 'badge--status'}`}>
      {todo ? 'Status: TODO' : status}
    </span>
  );
}
