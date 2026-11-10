export type FrontMatter = Record<string, string>;

/**
 * Minimal front-matter parser for `key: value` pairs between `---` fences.
 * Kept intentionally simple so content files stay plain and dependency-free.
 */
export function parseFrontMatter(raw: string): { data: FrontMatter; body: string } {
  const text = raw.replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) return { data: {}, body: text };

  const data: FrontMatter = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
    if (key) data[key] = value;
  }
  return { data, body: text.slice(match[0].length) };
}

/** Split a Markdown body on `## Heading` lines into an intro plus ordered sections. */
export function splitSections(body: string): { intro: string; sections: { heading: string; body: string }[] } {
  // parts = [intro, heading1, content1, heading2, content2, ...]
  const parts = body.split(/^##[ \t]+(.+)$/m);
  const sections: { heading: string; body: string }[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    sections.push({ heading: parts[i].trim(), body: (parts[i + 1] ?? '').trim() });
  }
  return { intro: parts[0].trim(), sections };
}

export function normalizeHeading(heading: string): string {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function listValue(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
