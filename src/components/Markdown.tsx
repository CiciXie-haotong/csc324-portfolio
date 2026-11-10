import { useMemo } from 'react';
import { renderMarkdown } from '../lib/markdown';

interface MarkdownProps {
  source: string;
  className?: string;
}

/** Renders trusted, local Markdown content from src/content. */
export function Markdown({ source, className = '' }: MarkdownProps) {
  const html = useMemo(() => renderMarkdown(source), [source]);
  return <div className={`prose ${className}`.trim()} dangerouslySetInnerHTML={{ __html: html }} />;
}
