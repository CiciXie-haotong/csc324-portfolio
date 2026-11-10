import { listValue, normalizeHeading, parseFrontMatter, splitSections } from './frontmatter';

// All page content lives in src/content as Markdown. Add or edit files there;
// no React changes are needed. Files whose names start with "_" are ignored,
// so they can serve as copy-and-paste templates.

// One folder per category: competencies/<category>/<slug>.md
const competencyFiles = import.meta.glob<string>('../content/competencies/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const daybookFiles = import.meta.glob<string>('../content/daybook/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const projectFiles = import.meta.glob<string>('../content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '');
}

function published(files: Record<string, string>): [string, string][] {
  return Object.entries(files)
    .filter(([path]) => !slugFromPath(path).startsWith('_'))
    .map(([path, raw]) => [slugFromPath(path), raw]);
}

/* ---------- Competencies ---------- */

export const COMPETENCY_CATEGORIES = [
  {
    id: 'self-learning',
    label: 'Self-Learning',
    blurb: 'Learning new tools, frameworks, and practices independently.',
  },
  {
    id: 'design',
    label: 'Design',
    blurb: 'Understanding users and shaping software before and while it is built.',
  },
  {
    id: 'development',
    label: 'Development',
    blurb: 'Building working software as part of a team.',
  },
  {
    id: 'verification',
    label: 'Verification',
    blurb: 'Checking that software does what it should.',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    blurb: 'Going deeper in an area beyond the core expectations.',
  },
] as const;

export type CategoryId = (typeof COMPETENCY_CATEGORIES)[number]['id'];
export type Category = (typeof COMPETENCY_CATEGORIES)[number];

export function getCategory(id: string): Category | undefined {
  return COMPETENCY_CATEGORIES.find((cat) => cat.id === id);
}

/** Sections rendered on every competency detail page, in this order. */
export const COMPETENCY_SECTIONS = [
  'Overview',
  'Process',
  'My Contributions',
  'Evidence',
  'Reflection',
  'Lessons Learned',
] as const;

/** Older heading names still accepted in content files (normalized form). */
const SECTION_ALIASES: Record<string, string> = {
  'evidence artifacts': 'evidence',
  artifacts: 'evidence',
};

export interface Section {
  heading: string;
  body: string;
}

export interface Competency {
  slug: string;
  title: string;
  category: CategoryId;
  summary: string;
  status: string;
  order: number;
  sections: Section[];
}

export const competencies: Competency[] = Object.entries(competencyFiles)
  .flatMap(([path, raw]): Competency[] => {
    const slug = slugFromPath(path);
    const folder = path.split('/').slice(-2)[0];
    if (slug.startsWith('_')) return [];
    const category = getCategory(folder);
    if (!category) {
      console.warn(`Skipping ${path}: "${folder}" is not a competency category folder.`);
      return [];
    }

    const { data, body } = parseFrontMatter(raw);
    const found = new Map<string, Section>();
    for (const s of splitSections(body).sections) {
      const key = normalizeHeading(s.heading);
      found.set(SECTION_ALIASES[key] ?? key, s);
    }
    const standard = COMPETENCY_SECTIONS.map((heading) => {
      const key = normalizeHeading(heading);
      const body = found.get(key)?.body ?? '';
      found.delete(key);
      return { heading, body };
    });

    return [
      {
        slug,
        title: data.title ?? slug,
        category: category.id,
        summary: data.summary ?? '',
        status: data.status ?? 'TODO',
        order: Number(data.order ?? 99),
        // Always render the full template (a missing section shows as TODO),
        // followed by any extra sections the file adds, so nothing is dropped.
        sections: [...standard, ...found.values()],
      },
    ];
  })
  .sort(
    (a, b) =>
      COMPETENCY_CATEGORIES.findIndex((cat) => cat.id === a.category) -
        COMPETENCY_CATEGORIES.findIndex((cat) => cat.id === b.category) ||
      a.order - b.order ||
      a.title.localeCompare(b.title),
  );

export function competenciesIn(category: string): Competency[] {
  return competencies.filter((c) => c.category === category);
}

export function getCompetency(category: string, slug: string): Competency | undefined {
  return competencies.find((c) => c.category === category && c.slug === slug);
}

export function competencyPath(c: Pick<Competency, 'category' | 'slug'>): string {
  return `/competencies/${c.category}/${c.slug}`;
}

/* ---------- Daybook ---------- */

export interface DaybookEntry {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  body: string;
}

export const daybook: DaybookEntry[] = published(daybookFiles)
  .map(([slug, raw]) => {
    const { data, body } = parseFrontMatter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      tags: listValue(data.tags),
      body,
    };
  })
  // Newest first. ISO dates (YYYY-MM-DD) sort correctly as strings.
  .sort((a, b) => b.date.localeCompare(a.date) || b.slug.localeCompare(a.slug));

/* ---------- Projects ---------- */

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  stack: string[];
  repo: string;
  intro: string;
  sections: Section[];
}

export const projects: Project[] = published(projectFiles).map(([slug, raw]) => {
  const { data, body } = parseFrontMatter(raw);
  const { intro, sections } = splitSections(body);
  return {
    slug,
    title: data.title ?? slug,
    tagline: data.tagline ?? '',
    stack: listValue(data.stack),
    repo: data.repo ?? 'TODO',
    intro,
    sections,
  };
});

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function sectionId(heading: string): string {
  return normalizeHeading(heading).replace(/ /g, '-');
}
