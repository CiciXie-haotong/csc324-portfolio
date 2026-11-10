import { marked } from 'marked';

const BASE = import.meta.env.BASE_URL;

/**
 * Render Markdown to HTML, then apply portfolio conventions:
 * - The word TODO is highlighted so missing evidence is easy to spot.
 * - Images with src "TODO" become labelled screenshot placeholders.
 * - Links with href "TODO" become visible "link TODO" badges instead of broken links.
 * - Relative image paths (e.g. images/foo.png) resolve against the Vite base path.
 */
export function renderMarkdown(md: string): string {
  const html = marked.parse(md, { async: false, gfm: true }) as string;
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstElementChild as HTMLElement;

  root.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src') ?? '';
    if (src === 'TODO' || src === '') {
      const figure = doc.createElement('figure');
      figure.className = 'placeholder';
      const tag = doc.createElement('span');
      tag.className = 'placeholder__tag';
      tag.textContent = 'Image TODO';
      const caption = doc.createElement('figcaption');
      caption.textContent = img.alt || 'Image to be added';
      figure.append(tag, caption);
      // Lift the placeholder out of its wrapping <p> when it is the only child.
      const parent = img.parentElement;
      if (parent?.tagName === 'P' && parent.childNodes.length === 1) parent.replaceWith(figure);
      else img.replaceWith(figure);
      return;
    }
    if (!/^(https?:)?\/\//.test(src) && !src.startsWith('/') && !src.startsWith('data:')) {
      img.setAttribute('src', BASE + src);
    }
    img.setAttribute('loading', 'lazy');
  });

  root.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href') ?? '';
    if (href === 'TODO' || href === '') {
      const span = doc.createElement('span');
      span.className = 'todo-link';
      span.textContent = `${a.textContent} — link TODO`;
      a.replaceWith(span);
    } else if (/^https?:\/\//.test(href)) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });

  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
  for (const node of textNodes) {
    if (!node.data.includes('TODO')) continue;
    if (node.parentElement?.closest('code, pre, .todo-link, .placeholder')) continue;
    const frag = doc.createDocumentFragment();
    for (const piece of node.data.split(/(TODO)/)) {
      if (piece === 'TODO') {
        const mark = doc.createElement('mark');
        mark.className = 'todo';
        mark.textContent = 'TODO';
        frag.appendChild(mark);
      } else if (piece) {
        frag.appendChild(doc.createTextNode(piece));
      }
    }
    node.replaceWith(frag);
  }

  return root.innerHTML;
}

/** True when a value is empty or explicitly marked as TODO. */
export function isTodo(text: string | undefined): boolean {
  return !text || text.trim() === '' || /^TODO\b/.test(text.trim());
}
