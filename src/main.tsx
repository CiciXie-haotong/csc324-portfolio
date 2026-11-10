import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { CompetenciesPage } from './pages/CompetenciesPage';
import { CompetencyCategoryPage } from './pages/CompetencyCategoryPage';
import { CompetencyDetailPage } from './pages/CompetencyDetailPage';
import { DaybookPage } from './pages/DaybookPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import './styles.css';

// HashRouter keeps deep links working on GitHub Pages, which has no
// server-side fallback for client-side routes.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="competencies" element={<CompetenciesPage />} />
          <Route path="competencies/:category" element={<CompetencyCategoryPage />} />
          <Route path="competencies/:category/:slug" element={<CompetencyDetailPage />} />
          <Route path="daybook" element={<DaybookPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
);
