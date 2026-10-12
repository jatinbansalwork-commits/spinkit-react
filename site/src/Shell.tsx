import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Spin } from "spinkit-react";
import { CATALOG } from "./catalog";
import { RailProvider, useRail } from "./RailContext";
import { VERSION_LABEL } from "./version";

export function Shell() {
  return (
    <RailProvider>
      <ShellLayout />
    </RailProvider>
  );
}

function ShellLayout() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { rail } = useRail();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATALOG;
    return CATALOG.filter(
      (e) => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setNavOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setQuery("");
    setNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const openSearch = () => {
    setSearchOpen(true);
    setNavOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className={`shell${navOpen ? " nav-open" : ""}${rail ? " has-rail" : ""}`}>
      <a className="skip" href="#content">
        Skip to content
      </a>

      <header className="mobile-bar">
        <Link to="/" className="brand" aria-label="spinkit home">
          <span className="brand-mark" aria-hidden="true">
            <Spin size={14} color="#c45c28" />
          </span>
          <span className="brand-name" aria-hidden="true">
            <span className="brand-spin">spin</span>
            <span className="brand-kit">kit</span>
          </span>
        </Link>
        <div className="mobile-bar-actions">
          <button type="button" className="icon-btn" aria-label="Search" onClick={openSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.75" />
              <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
            aria-controls="site-sidebar"
            onClick={() => setNavOpen((open) => !open)}
          >
            {navOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {navOpen && (
        <button type="button" className="nav-backdrop" aria-label="Close menu" onClick={() => setNavOpen(false)} />
      )}

      <aside className="sidebar panel-left" id="site-sidebar">
        <div className="sidebar-top">
          <Link to="/" className="brand desktop-only" aria-label="spinkit home">
            <span className="brand-mark" aria-hidden="true">
              <Spin size={14} color="#c45c28" />
            </span>
            <span className="brand-name" aria-hidden="true">
              <span className="brand-spin">spin</span>
              <span className="brand-kit">kit</span>
            </span>
          </Link>

          <button type="button" className="search-trigger desktop-only" aria-label="Search" onClick={openSearch}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.75" />
              <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            <span>Search</span>
            <kbd>⌘K</kbd>
          </button>

          {(searchOpen || navOpen) && (
            <label className="search-field">
              <span className="sr-only">Search spinners</span>
              <input
                ref={inputRef}
                type="search"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered[0]) {
                    navigate(`/spinners/${filtered[0].slug}`);
                  }
                }}
              />
            </label>
          )}

          <nav aria-label="Main">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : undefined)}>
              Overview
            </NavLink>
            {filtered.map((e) => (
              <NavLink
                key={e.slug}
                to={`/spinners/${e.slug}`}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {e.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <nav aria-label="Docs" className="docs-nav">
            <p className="nav-label">Docs</p>
            <NavLink to="/use-cases" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Use cases
            </NavLink>
            <NavLink to="/changelog" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Release notes
            </NavLink>
          </nav>
          <nav aria-label="Social" className="social social-mobile">
            <a href="https://github.com/jatinbansalwork-commits/spinkit-react">
              <GitHubIcon />
              GitHub
            </a>
            <a href="https://www.npmjs.com/package/spinkit-react">
              <NpmIcon />
              npm
            </a>
            <a href="/llms.txt">llms.txt</a>
          </nav>
          <div className="sidebar-meta">
            <Link to="/changelog" className="version-pill version-mobile" title="Release notes">
              {VERSION_LABEL}
            </Link>
            <p className="credit">
              Designed by{" "}
              <a href="https://github.com/jatinbansalwork-commits">Jatin Bansal</a>
            </p>
          </div>
        </div>
      </aside>

      <div className="content panel-center" id="content">
        <Outlet />
      </div>

      <aside className={`rail panel-right${rail ? " is-filled" : ""}`} aria-label="Page outline">
        <div className="rail-top">{rail ?? <DefaultRail />}</div>
        <div className="rail-bottom">
          <nav aria-label="Resources" className="social">
            <a href="https://github.com/jatinbansalwork-commits/spinkit-react">
              <GitHubIcon />
              GitHub
            </a>
            <a href="https://www.npmjs.com/package/spinkit-react">
              <NpmIcon />
              npm
            </a>
            <a href="/llms.txt">llms.txt</a>
          </nav>
          <Link to="/changelog" className="version-pill" title="Release notes">
            {VERSION_LABEL}
          </Link>
        </div>
      </aside>
    </div>
  );
}

function DefaultRail() {
  return (
    <div className="rail-default">
      <p className="toc-label">Explore</p>
      <ul>
        <li>
          <Link to="/">Overview</Link>
        </li>
        <li>
          <Link to="/use-cases">Use cases</Link>
        </li>
        <li>
          <Link to="/changelog">Release notes</Link>
        </li>
      </ul>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M0 0v16h16V0H0zm13 13h-2V5H8v8H3V3h10v10z" />
    </svg>
  );
}
