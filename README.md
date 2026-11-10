# CSC 324 Portfolio

Personal portfolio for CSC 324: Software Development at Grinnell College, built with React, TypeScript, and Vite. It is a static site with no backend, database, or authentication.

Pages:

- **Home** — introduction, featured project, competency overview
- **Projects** — GrinnSkill case study
- **Competencies** — index by area (Self-Learning, Design, Development, Verification, Advanced), a page per area, and any number of individual competency pages within each area
- **Daybook** — chronological engineering log
- **About** — biography and links

## Local development

Requires Node.js 20.19+ or 22.12+ (Vite's minimum).

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # type-check and build to dist/
npm run preview   # serve the production build locally
```

The preview server serves the build under `/csc324-portfolio/`, matching GitHub Pages; open the URL it prints.

## Editing content

All page content lives in `src/content/`. You do not need to edit React components to update it.

| What | Where |
| --- | --- |
| Name, bio, tagline, links | `src/content/site.ts` |
| GrinnSkill case study | `src/content/projects/grinnskill.md` |
| Competency pages | `src/content/competencies/<category>/*.md` |
| Daybook entries | `src/content/daybook/*.md` |
| Images | `public/images/` |

Files whose names start with `_` are templates and are not shown on the site.

### Competency pages

Each category has its own folder, and each folder can hold any number of competency pages:

```
src/content/competencies/
  _template.md
  self-learning/   design/   development/   verification/   advanced/
```

To add a competency, copy `src/content/competencies/_template.md` into the right category folder and rename it. The folder sets the category and the file name becomes the URL (`development/testing-offers.md` → `/competencies/development/testing-offers`). It appears automatically on the Competencies index, its category page (`/competencies/development`), and the Home page counts. Front matter:

```yaml
---
title: Exact competency name from the rubric
summary: One sentence shown on the index card.
status: TODO            # free text shown as a badge; record only real statuses
order: 30               # sort order within the category
---
```

Each page uses the same six `##` sections: Overview, Process, My Contributions, Evidence, Reflection, Lessons Learned. A missing or empty section is shown with a TODO marker automatically. Use `###` sub-headings inside a section for more structure; any extra `##` section is shown after the six standard ones. The older heading `Evidence/Artifacts` is still accepted as `Evidence`.

### Daybook entries

Copy `src/content/daybook/_template.md` to a file such as `2026-11-03-offer-states.md` and set `date` (YYYY-MM-DD), `title`, and comma-separated `tags`. Entries are sorted newest first.

### Markdown conventions

- `TODO` anywhere in text is highlighted.
- `![Description](TODO)` renders a labelled screenshot placeholder.
- `[Commit or PR](TODO)` renders a visible "link TODO" badge instead of a broken link.
- `![Description](images/file.png)` loads `public/images/file.png` (the base path is added automatically).

## Deployment (GitHub Pages)

The workflow in `.github/workflows/deploy.yml` builds and deploys the site on every push to `main`.

1. Create a GitHub repository named **`csc324-portfolio`** and push this project to its `main` branch.
2. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab). The site will be at `https://<your-username>.github.io/csc324-portfolio/`.

### Base path

GitHub Pages serves project sites from a sub-path, so `vite.config.ts` sets `base` to `/csc324-portfolio/` for production builds (and `/` for the dev server). If you rename the repository, update `REPO_BASE` in `vite.config.ts`. To build for a different path without editing the file, set `VITE_BASE`, e.g. `VITE_BASE=/ npm run build` for a custom domain.

The site uses hash-based routing (`/#/competencies`), so deep links and page refreshes work on GitHub Pages without a server-side fallback.

## Project structure

```
src/
  components/   Layout, Markdown renderer, shared UI
  content/      Editable site content (Markdown + site.ts)
  lib/          Content loading, front-matter parsing, Markdown rendering
  pages/        One component per route
  styles.css    All styles (design tokens at the top)
```
