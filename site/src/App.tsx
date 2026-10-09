import { useState, type ComponentType } from "react";
import {
  Bars,
  Bloom,
  Dots,
  Grid,
  Heartbeat,
  Loop,
  Orbit,
  Pendulum,
  Pulse,
  Radial,
  Spin,
  type SpinnerProps,
  Typing,
} from "spinkit-react";

const SPINNERS: [string, ComponentType<SpinnerProps>, string][] = [
  ["Spin", Spin, "An arc rotating around a faint track."],
  ["Dots", Dots, "Three dots hopping one after another."],
  ["Typing", Typing, "Three dots fading in and out."],
  ["Bars", Bars, "Four bars bouncing like an equalizer."],
  ["Pulse", Pulse, "Rings radiating from a solid core."],
  ["Orbit", Orbit, "Two moons circling a planet."],
  ["Grid", Grid, "Four tiles lighting up clockwise."],
  ["Radial", Radial, "Eight spokes with a sweeping highlight."],
  ["Loop", Loop, "A dash travelling along a figure eight."],
  ["Heartbeat", Heartbeat, "A pulse crossing a heart-rate line."],
  ["Pendulum", Pendulum, "A weight swinging from a pivot."],
  ["Bloom", Bloom, "Six petals swelling in turn."],
];

const INSTALL = "npm install spinkit-react";

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied((c) => (c === text ? null : c)), 1200);
    });
  };
  return { copied, copy };
}

export function App() {
  const [size, setSize] = useState(32);
  const [speed, setSpeed] = useState(1);
  const [color, setColor] = useState("#6d5dfc");
  const [paused, setPaused] = useState(false);
  const { copied, copy } = useCopy();

  return (
    <main>
      <header className="hero">
        <Spin size={40} color={color} />
        <h1>spinkit-react</h1>
        <p>Tiny, accessible, dependency-free loading spinners for React.</p>
        <button type="button" className="install" onClick={() => copy(INSTALL)}>
          <code>{INSTALL}</code>
          <span>{copied === INSTALL ? "Copied" : "Copy"}</span>
        </button>
      </header>

      <section className="controls" aria-label="Playground controls">
        <label>
          Size <output>{size}px</output>
          <input type="range" min={12} max={64} value={size} onChange={(e) => setSize(+e.target.value)} />
        </label>
        <label>
          Speed <output>{speed.toFixed(1)}×</output>
          <input
            type="range"
            min={0.25}
            max={3}
            step={0.25}
            value={speed}
            onChange={(e) => setSpeed(+e.target.value)}
          />
        </label>
        <label>
          Color
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        <label className="toggle">
          <input type="checkbox" checked={paused} onChange={(e) => setPaused(e.target.checked)} />
          Paused
        </label>
      </section>

      <section className="grid">
        {SPINNERS.map(([name, Component, description]) => {
          const snippet = `import { ${name} } from "spinkit-react";\n\n<${name} size={${size}} />`;
          return (
            <button
              type="button"
              key={name}
              className="card"
              onClick={() => copy(snippet)}
              title="Copy usage"
            >
              <div className="preview">
                <Component size={size} color={color} paused={paused} duration={defaultDuration(name) / speed} />
              </div>
              <strong>{copied === snippet ? "Copied!" : name}</strong>
              <small>{description}</small>
            </button>
          );
        })}
      </section>

      <section className="docs">
        <h2>Usage</h2>
        <pre>
          <code>{`import { Spin } from "spinkit-react";

export function SaveButton({ saving }) {
  return <button>{saving ? <Spin size={16} /> : "Save"}</button>;
}`}</code>
        </pre>

        <h2>Props</h2>
        <p>Every spinner accepts the same props, plus any attribute of a <code>span</code>.</p>
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>size</td><td>number | string</td><td>24</td></tr>
            <tr><td>color</td><td>string</td><td>currentColor</td></tr>
            <tr><td>duration</td><td>number (seconds)</td><td>per spinner</td></tr>
            <tr><td>paused</td><td>boolean</td><td>false</td></tr>
            <tr><td>label</td><td>string</td><td>"Loading"</td></tr>
            <tr><td>motion</td><td>"reduce" | "always"</td><td>"reduce"</td></tr>
          </tbody>
        </table>

        <h2>Notes</h2>
        <ul>
          <li>Renders a <code>role="status"</code> element with an accessible label.</li>
          <li>Slows down automatically for users who prefer reduced motion.</li>
          <li>Styles are injected once per spinner using React 19 stylesheet hoisting, so no CSS import is needed and it works in Server Components.</li>
          <li>Restyle anything with <code>className</code>, <code>style</code> or the <code>.sk</code> class.</li>
        </ul>
      </section>

      <footer>
        MIT licensed · <a href="https://www.npmjs.com/package/spinkit-react">npm</a>
      </footer>
    </main>
  );
}

const DURATIONS: Record<string, number> = {
  Spin: 0.8,
  Bars: 1,
  Radial: 1,
  Orbit: 1.4,
  Heartbeat: 1.4,
  Pendulum: 1.4,
  Pulse: 1.6,
  Loop: 1.6,
};

function defaultDuration(name: string) {
  return DURATIONS[name] ?? 1.2;
}
