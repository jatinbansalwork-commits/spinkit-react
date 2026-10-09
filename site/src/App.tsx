import { Bloom, Chase, Dots, Gear, Hourglass, Spin } from "spinkit-react";
import { CATALOG } from "./catalog";
import { Code, useCopy } from "./Code";
import { Playground } from "./Playground";
import { UseCases } from "./UseCases";

const INSTALL = "npm install spinkit-react";

const NAV = [
  ["Getting started", [
    ["install", "Installation"],
    ["usage", "Usage"],
  ]],
  ["Spinners", [["playground", "Playground"]]],
  ["Use cases", [
    ["buttons", "Buttons"],
    ["inline", "Inline with text"],
    ["color", "Inherited color"],
    ["inputs", "Input adornment"],
    ["overlay", "Content overlay"],
    ["skeleton", "Placeholder content"],
    ["toast", "Toasts and progress"],
    ["chat", "Chat and AI"],
    ["page", "Full-page loading"],
    ["play-state", "Pausing"],
    ["sound", "Sound feedback"],
    ["styling", "Custom styling"],
    ["suspense", "Suspense and RSC"],
  ]],
  ["Reference", [
    ["props", "Props"],
    ["accessibility", "Accessibility"],
    ["motion", "Reduced motion"],
  ]],
] as const;

export function App() {
  const { copied, copy } = useCopy();

  return (
    <div className="layout">
      <aside className="sidebar">
        <a href="#top" className="brand">
          <Spin size={18} />
          spinkit-react
        </a>
        <nav>
          {NAV.map(([group, links]) => (
            <div key={group}>
              <h4>{group}</h4>
              {links.map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">
          <a href="https://www.npmjs.com/package/spinkit-react">npm</a>
          <span>v0.1.0</span>
        </div>
      </aside>

      <main id="top">
        <header className="hero">
          <div className="hero-strip" aria-hidden="true">
            <Spin size={28} />
            <Dots size={28} />
            <Hourglass size={28} />
            <Bloom size={28} />
            <Gear size={28} />
            <Chase size={28} />
          </div>
          <h1>Loading spinners for React, done properly.</h1>
          <p className="lead">
            {CATALOG.length} hand-tuned SVG spinners in about 13 KB. Accessible by default, respectful of
            reduced motion, styled with zero CSS imports, and ready for Server Components.
          </p>
          <div className="hero-actions">
            <button type="button" className="install" onClick={() => copy(INSTALL)}>
              <span className="prompt">$</span>
              <code>{INSTALL}</code>
              <span className="install-copy">{copied === INSTALL ? "Copied" : "Copy"}</span>
            </button>
            <a className="btn btn-ghost" href="#playground">
              Browse spinners
            </a>
          </div>
        </header>

        <section id="install">
          <h2>Installation</h2>
          <p>Install from npm with your package manager of choice. React 19 or later is required.</p>
          <Code lang="sh">{`npm install spinkit-react
# or
pnpm add spinkit-react
# or
yarn add spinkit-react`}</Code>
        </section>

        <section id="usage">
          <h2>Usage</h2>
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
        </section>

        <section id="playground">
          <h2>Playground</h2>
          <p>Pick a spinner, tune it, and copy the code. Settings apply to every tile.</p>
          <Playground />
        </section>

        <section id="use-cases">
          <h2>Use cases</h2>
          <p>Common places a loading indicator shows up, with code you can paste.</p>
          <UseCases />
        </section>

        <section id="props">
          <h2>Props</h2>
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
                    <td><code>{prop}</code></td>
                    <td><code>{type}</code></td>
                    <td><code>{def}</code></td>
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
                    <td><code>{e.name}</code></td>
                    <td><code>{e.extra?.prop}</code></td>
                    <td>
                      {e.extra?.min} – {e.extra?.max}
                    </td>
                    <td><code>{e.extra?.default}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="accessibility">
          <h2>Accessibility</h2>
          <p>
            Each spinner renders a <code>role="status"</code> element with an <code>aria-label</code>{" "}
            (default <code>"Loading"</code>), so screen readers announce it politely. The SVG itself is
            hidden from assistive technology. Give the label context where it helps:
          </p>
          <Code>{`<Spin label="Uploading avatar" />`}</Code>
        </section>

        <section id="motion">
          <h2>Reduced motion</h2>
          <p>
            When the operating system asks for reduced motion, spinners slow to a third of their speed
            rather than stopping, so they still signal progress. Opt out per instance when motion is
            essential:
          </p>
          <Code>{`<Spin motion="always" />`}</Code>
        </section>

        <footer>
          <span>MIT licensed.</span>
          <a href="https://www.npmjs.com/package/spinkit-react">npm</a>
        </footer>
      </main>
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
