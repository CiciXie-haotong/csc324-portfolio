import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this site from https://<user>.github.io/csc324-portfolio/,
// so production builds need that sub-path as the base. Override with VITE_BASE
// (e.g. VITE_BASE=/ for a custom domain or user site).
const REPO_BASE = '/csc324-portfolio/';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: process.env.VITE_BASE ?? (command === 'build' ? REPO_BASE : '/'),
}));
