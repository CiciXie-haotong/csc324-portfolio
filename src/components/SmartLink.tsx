import type { ReactNode } from 'react';
import { isTodo } from '../lib/markdown';

interface SmartLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** External link that renders as a visible TODO badge when the href is missing. */
export function SmartLink({ href, children, className }: SmartLinkProps) {
  if (isTodo(href)) {
    return <span className={`todo-link ${className ?? ''}`.trim()}>{children} — link TODO</span>;
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
