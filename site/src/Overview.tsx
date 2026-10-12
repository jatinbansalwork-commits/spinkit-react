import { Link } from "react-router-dom";
import { CATALOG } from "./catalog";
import { useCopy } from "./Code";

const INSTALL = "npm install spinkit-react";

export function Overview() {
  const { copied, copy } = useCopy();

  return (
    <div className="overview">
      <header className="hero">
        <h1>
          Hold on. <span>Make it count.</span>
        </h1>
        <p className="lead">
          Spinkit is a quiet React kit for the pause between tap and result — thirty-four motions,
          one calm API, nothing borrowed from a starter template.
        </p>
      </header>

      <button type="button" className="install" onClick={() => copy(INSTALL)}>
        <span className="prompt">$</span>
        <code>
          npm install <span className="pkg">spinkit-react</span>
        </code>
        <span className="install-action" aria-hidden="true">
          {copied === INSTALL ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.75" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          )}
        </span>
        <span className="sr-only">{copied === INSTALL ? "Copied" : "Copy to clipboard"}</span>
      </button>

      <div className="gallery">
        {CATALOG.map((e) => (
          <Link key={e.slug} to={`/spinners/${e.slug}`} className="tile">
            <div className="tile-preview">
              <e.Component size={36} color="#e0d9d3" />
            </div>
            <span>{e.name}</span>
          </Link>
        ))}
      </div>

      <Link to="/use-cases" className="use-cases-card">
        <div>
          <p className="use-cases-kicker">Patterns</p>
          <h2>Where the pause lives</h2>
          <p>Buttons mid-save, cards refreshing, chat thinking, Suspense holding — steal the recipe.</p>
        </div>
        <span className="use-cases-arrow" aria-hidden="true">
          →
        </span>
      </Link>

      <p className="overview-note">
        Designed by{" "}
        <a href="https://github.com/jatinbansalwork-commits">Jatin Bansal</a>
      </p>
    </div>
  );
}
