import { useEffect, useMemo, useState } from "react";
import { Spin } from "spinkit-react";
import { CATALOG, type Entry } from "./catalog";
import { Code, useCopy } from "./Code";
import { Playground } from "./Playground";
import { UseCases } from "./UseCases";

const INSTALL = "npm install spinkit-react";

const DOCS = [
  ["install", "Installation"],
  ["usage", "Usage"],
  ["use-cases", "Use cases"],
  ["props", "Props"],
  ["accessibility", "Accessibility"],
  ["motion", "Reduced motion"],
] as const;

type View = "overview" | "spinner" | (typeof DOCS)[number][0];

function hashView(): { view: View; entry?: Entry } {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === "top" || hash === "overview") return { view: "overview" };
  const doc = DOCS.find(([id]) => id === hash);
  if (doc) return { view: doc[0] };
  const entry = CATALOG.find((e) => e.name.toLowerCase() === hash.toLowerCase());
  if (entry) return { view: "spinner", entry };
  return { view: "overview" };
}

export function App() {
  const { copied, copy } = useCopy();
  const [{ view, entry }, setRoute] = useState(() =>
    typeof window === "undefined" ? { view: "overview" as View } : hashView(),
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onHash = () => setRoute(hashView());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.querySelector<HTMLInputElement>(".search input")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (next: View, spinner?: Entry) => {
    if (next === "overview") window.location.hash = "overview";
    else if (next === "spinner" && spinner) window.location.hash = spinner.name.toLowerCase();
    else window.location.hash = next;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATALOG;
    return CATALOG.filter(
      (e) => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
    );
  }, [query]);

  const activeSpinner = entry ?? CATALOG[0];

  return (
    <div className="layout">
      <aside className="sidebar">
        <a
          href="#overview"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            go("overview");
          }}
        >
          <span className="mark" aria-hidden="true">
            <Spin size={16} />
          </span>
        </a>

        <label className="search">
          <span className="sr-only">Search spinners</span>
          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd>⌘K</kbd>
        </label>

        <nav>
          <a
            href="#overview"
            className={view === "overview" ? "active" : undefined}
            onClick={(e) => {
              e.preventDefault();
              go("overview");
            }}
          >
            Overview
          </a>
          {filtered.map((e) => (
            <a
              key={e.name}
              href={`#${e.name.toLowerCase()}`}
              className={view === "spinner" && activeSpinner?.name === e.name ? "active" : undefined}
              onClick={(eClick) => {
                eClick.preventDefault();
                go("spinner", e);
              }}
            >
              {e.name}
            </a>
          ))}
          <h4>Docs</h4>
          {DOCS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={view === id ? "active" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(id);
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="sidebar-foot">
          <a href="https://github.com/jatinbansalwork-commits/spinkit-react">GitHub</a>
          <a href="https://www.npmjs.com/package/spinkit-react">npm</a>
        </div>
      </aside>

      <main>
        {view === "overview" && (
          <div className="overview">
            <header className="hero">
              <h1>
                Spinners, <span>made simple.</span>
              </h1>
              <p className="lead">
                A lightweight library of accessible loading indicators for React.
              </p>
              <button type="button" className="install" onClick={() => copy(INSTALL)}>
                <span className="prompt">$</span>
                <code>{INSTALL}</code>
                <span className="install-copy">{copied === INSTALL ? "Copied" : "Copy"}</span>
              </button>
            </header>

            <div className="gallery">
              {CATALOG.map((e) => (
                <button
                  type="button"
                  key={e.name}
                  className="tile"
                  onClick={() => go("spinner", e)}
                >
                  <div className="tile-preview">
                    <e.Component size={36} />
                  </div>
                  <span>{e.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "spinner" && activeSpinner && (
          <div className="spinner-page">
            <header className="page-head">
              <h1>{activeSpinner.name}</h1>
              <p>{activeSpinner.description}</p>
            </header>
            <Playground key={activeSpinner.name} entry={activeSpinner} showGallery={false} />
          </div>
        )}

        {view === "install" && (
          <Doc title="Installation">
            <p>Install from npm with your package manager of choice. React 19 or later is required.</p>
            <Code lang="sh">{`npm install spinkit-react
# or
pnpm add spinkit-react
# or
yarn add spinkit-react`}</Code>
          </Doc>
        )}

        {view === "usage" && (
          <Doc title="Usage">
            <p>
              Import a spinner and render it. Every spinner shares the same props: <code>size</code>,{" "}
              <code>color</code>, <code>duration</code>, <code>easing</code>, <code>thickness</code>,{" "}
              <code>cap</code>, <code>playState</code> and <code>label</code>. Some have extra props of
              their own.
            </p>
            <Code>{`import { Spin } from "spinkit-react";

export function Loader() {
  return <Spin size={20} color="#4f46e5" duration={1} />;
}`}</Code>
          </Doc>
        )}

        {view === "use-cases" && (
          <Doc title="Use cases">
            <p>Common places a loading indicator shows up, with code you can paste.</p>
            <UseCases />
          </Doc>
        )}

        {view === "props" && (
          <Doc title="Props">
            <p>
              Shared by every spinner. Any other prop is passed to the root <code>span</code>, so{" "}
              <code>id</code>, <code>data-*</code> and event handlers all work.
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {SHARED_PROPS.map(([prop, type, def, desc]) => (
                    <tr key={prop}>
                      <td>
                        <code>{prop}</code>
                      </td>
                      <td>
                        <code>{type}</code>
                      </td>
                      <td>
                        <code>{def}</code>
                      </td>
                      <td>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3>Spinner-specific props</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Spinner</th>
                    <th>Prop</th>
                    <th>Range</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  {CATALOG.filter((e) => e.extra).map((e) => (
                    <tr key={e.name}>
                      <td>
                        <code>{e.name}</code>
                      </td>
                      <td>
                        <code>{e.extra?.prop}</code>
                      </td>
                      <td>
                        {e.extra?.min} – {e.extra?.max}
                      </td>
                      <td>
                        <code>{e.extra?.default}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Doc>
        )}

        {view === "accessibility" && (
          <Doc title="Accessibility">
            <p>
              Each spinner renders a <code>role="status"</code> element with an <code>aria-label</code>{" "}
              (default <code>"Loading"</code>), so screen readers announce it politely. The SVG itself is
              hidden from assistive technology.
            </p>
            <Code>{`<Spin label="Uploading avatar" />`}</Code>
          </Doc>
        )}

        {view === "motion" && (
          <Doc title="Reduced motion">
            <p>
              When the operating system asks for reduced motion, spinners slow to a third of their speed
              rather than stopping. Opt out per instance when motion is essential:
            </p>
            <Code>{`<Spin motion="always" />`}</Code>
          </Doc>
        )}
      </main>
    </div>
  );
}

function Doc({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="doc-page">
      <header className="page-head">
        <h1>{title}</h1>
      </header>
      {children}
    </div>
  );
}

const SHARED_PROPS = [
  ["size", "number | string", "24", "Width and height. Numbers are pixels; strings accept any CSS length."],
  ["color", "string", "currentColor", "Any CSS color."],
  ["duration", "number", "per spinner", "Seconds per animation cycle."],
  ["easing", "string", "per spinner", "Any CSS timing function."],
  ["thickness", "number", "per spinner", "Stroke width on the 24×24 grid. Stroked spinners only."],
  ["cap", '"round" | "butt" | "square"', '"round"', "Stroke line cap. Stroked spinners only."],
  ["playState", '"running" | "paused"', '"running"', "Pause or resume the animation."],
  ["paused", "boolean", "false", 'Shorthand for playState="paused".'],
  ["label", "string", '"Loading"', "Accessible label for screen readers."],
  ["motion", '"reduce" | "always"', '"reduce"', "Whether to slow down for reduced-motion users."],
] as const;
