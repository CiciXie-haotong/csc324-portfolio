import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { site } from '../content/site';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/competencies', label: 'Competencies' },
  { to: '/daybook', label: 'Daybook' },
  { to: '/about', label: 'About' },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // On navigation: close the mobile menu, scroll to top (unless the page will
  // scroll to a #section itself), and move focus to the main region so
  // screen-reader users land on the new page content.
  useEffect(() => {
    setMenuOpen(false);
    if (!hash) window.scrollTo(0, 0);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => {
        e.preventDefault();
        mainRef.current?.focus();
      }}>
        Skip to content
      </a>
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink to="/" className="brand" aria-label={`${site.course} portfolio home`}>
            <span className="brand__mark" aria-hidden="true">324</span>
            <span className="brand__text">Software Development Portfolio</span>
          </NavLink>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="nav-toggle__bar" aria-hidden="true" />
          </button>
          <nav id="primary-nav" aria-label="Primary" className={`site-nav ${menuOpen ? 'is-open' : ''}`}>
            <ul>
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" ref={mainRef} tabIndex={-1} key={pathname} className="page-enter">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p>
            {site.course} · Grinnell College
          </p>
          <p className="muted">Built with React, TypeScript, and Vite.</p>
        </div>
      </footer>
    </>
  );
}
