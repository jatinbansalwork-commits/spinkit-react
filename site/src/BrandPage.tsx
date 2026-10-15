import { useMemo, useState } from "react";
import { CATALOG } from "./catalog";
import { Code } from "./Code";
import { usePageRail } from "./RailContext";

const PRESETS = ["#c45c28", "#e0d9d3", "#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa", "#ffffff"];

export function BrandPage() {
  const [color, setColor] = useState("#c45c28");

  const rail = useMemo(
    () => (
      <nav className="toc" aria-label="On this page">
        <p className="toc-label">On this page</p>
        <ul>
          <li>
            <a href="#color">Your color</a>
          </li>
          <li>
            <a href="#gallery">Whole kit</a>
          </li>
          <li>
            <a href="#snippet">Snippet</a>
          </li>
        </ul>
      </nav>
    ),
    [],
  );

  usePageRail(rail);

  const snippet = `import { Spin } from "spinkit-react";

<Spin color="${color}" intent="button" />`;

  return (
    <div className="doc-page">
      <header className="page-head">
        <p className="eyebrow">Docs/</p>
        <h1>Pair with brand</h1>
        <p className="lede">
          Drop a hex. See every spinner wear it. Spinners default to <code>currentColor</code> — this
          is how they look when you pin a brand tone.
        </p>
      </header>

      <section className="brand-picker" id="color">
        <label className="brand-field">
          <span>Brand color</span>
          <div className="brand-field-row">
            <input
              type="color"
              value={color.length === 7 ? color : "#c45c28"}
              aria-label="Pick a brand color"
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              type="text"
              value={color}
              spellCheck={false}
              aria-label="Brand color hex"
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </label>
        <div className="swatches" role="listbox" aria-label="Presets">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className="swatch"
              aria-label={preset}
              aria-pressed={color.toLowerCase() === preset.toLowerCase()}
              style={{ background: preset }}
              onClick={() => setColor(preset)}
            />
          ))}
        </div>
      </section>

      <section className="brand-gallery" id="gallery" aria-label="Spinners in brand color">
        {CATALOG.map((e) => (
          <div key={e.slug} className="brand-tile">
            <div className="brand-tile-preview">
              <e.Component size={36} color={color} />
            </div>
            <span>{e.name}</span>
          </div>
        ))}
      </section>

      <section className="demo" id="snippet">
        <h3>
          <a href="#snippet">Snippet</a>
        </h3>
        <p>Pin the color once, or let the spinner inherit from the parent text color.</p>
        <Code>{snippet}</Code>
      </section>
    </div>
  );
}
