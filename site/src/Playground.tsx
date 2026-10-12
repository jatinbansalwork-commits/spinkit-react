import { useMemo, useState } from "react";
import type { StrokeCap } from "spinkit-react";
import { CATALOG, EASINGS, type Entry } from "./catalog";
import { Code } from "./Code";

interface Settings {
  size: number;
  color: string;
  speed: number;
  easing: string;
  thickness: number | null;
  cap: StrokeCap;
  paused: boolean;
  extra: Record<string, number>;
}

const INITIAL: Settings = {
  size: 64,
  color: "",
  speed: 1,
  easing: "",
  thickness: null,
  cap: "round",
  paused: false,
  extra: {},
};

function snippet(entry: Entry, s: Settings) {
  const props: string[] = [`size={${s.size}}`];
  if (s.color) props.push(`color="${s.color}"`);
  if (s.speed !== 1) props.push(`duration={${+(entry.duration / s.speed).toFixed(2)}}`);
  if (s.easing) props.push(`easing="${s.easing}"`);
  if (entry.stroke && s.thickness != null) props.push(`thickness={${s.thickness}}`);
  if (entry.stroke && s.cap !== "round") props.push(`cap="${s.cap}"`);
  if (s.paused) props.push(`playState="paused"`);
  const extra = entry.extra;
  if (extra && s.extra[extra.prop] != null && s.extra[extra.prop] !== extra.default) {
    props.push(`${extra.prop}={${s.extra[extra.prop]}}`);
  }
  return `import { ${entry.name} } from "spinkit-react";\n\n<${entry.name} ${props.join(" ")} />`;
}

export function Playground({
  entry,
  showGallery = true,
}: {
  entry?: Entry;
  showGallery?: boolean;
}) {
  const [selected, setSelected] = useState(entry ?? (CATALOG[0] as Entry));
  const [s, setS] = useState(INITIAL);
  const set = <K extends keyof Settings>(key: K, value: Settings[K]) => setS((prev) => ({ ...prev, [key]: value }));

  const current = entry ?? selected;
  const extra = current.extra;
  const extraValue = extra ? (s.extra[extra.prop] ?? extra.default) : undefined;
  const props = useMemo(
    () => ({
      color: s.color || undefined,
      duration: current.duration / s.speed,
      easing: s.easing || undefined,
      thickness: s.thickness ?? undefined,
      cap: s.cap,
      playState: s.paused ? ("paused" as const) : ("running" as const),
    }),
    [s, current],
  );

  return (
    <>
      <div className="inspector">
        <div className="stage">
          <current.Component size={s.size} {...props} {...(extra ? { [extra.prop]: extraValue } : null)} />
        </div>

        <div className="fields">
          <Field label="Size" value={`${s.size}px`}>
            <input type="range" min={12} max={120} value={s.size} onChange={(e) => set("size", +e.target.value)} />
          </Field>
          <Field label="Speed" value={`${s.speed.toFixed(2)}×`}>
            <input type="range" min={0.25} max={3} step={0.25} value={s.speed} onChange={(e) => set("speed", +e.target.value)} />
          </Field>
          <Field label="Color" value={s.color || "currentColor"}>
            <div className="swatches">
              {["", "#ffffff", "#a1a1aa", "#60a5fa", "#34d399", "#fbbf24", "#f87171"].map((c) => (
                <button
                  type="button"
                  key={c || "current"}
                  aria-label={c || "currentColor"}
                  aria-pressed={s.color === c}
                  className="swatch"
                  style={{ background: c || "var(--ink)" }}
                  onClick={() => set("color", c)}
                />
              ))}
            </div>
          </Field>
          <Field label="Easing">
            <select value={s.easing} onChange={(e) => set("easing", e.target.value)}>
              {EASINGS.map((e) => (
                <option key={e.label} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Thickness" value={s.thickness == null ? "default" : String(s.thickness)} disabled={!current.stroke}>
            <input
              type="range"
              min={0.5}
              max={4}
              step={0.25}
              disabled={!current.stroke}
              value={s.thickness ?? 2}
              onChange={(e) => set("thickness", +e.target.value)}
            />
          </Field>
          <Field label="Cap" disabled={!current.stroke}>
            <div className="segmented">
              {(["round", "butt", "square"] as const).map((c) => (
                <button
                  type="button"
                  key={c}
                  disabled={!current.stroke}
                  aria-pressed={s.cap === c}
                  onClick={() => set("cap", c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </Field>
          {extra && (
            <Field label={extra.label} value={String(extraValue)}>
              <input
                type="range"
                min={extra.min}
                max={extra.max}
                step={extra.step}
                value={extraValue}
                onChange={(e) => setS((p) => ({ ...p, extra: { ...p.extra, [extra.prop]: +e.target.value } }))}
              />
            </Field>
          )}
          <div className="field-row">
            <label className="check">
              <input type="checkbox" checked={s.paused} onChange={(e) => set("paused", e.target.checked)} />
              Paused
            </label>
            <button type="button" className="reset" onClick={() => setS(INITIAL)}>
              Reset
            </button>
          </div>
        </div>

        <div className="inspector-code">
          <Code>{snippet(current, s)}</Code>
        </div>
      </div>

      {showGallery && (
        <div className="gallery gallery-compact">
          {CATALOG.map((item) => (
            <button
              type="button"
              key={item.name}
              className="tile"
              aria-pressed={item.name === current.name}
              onClick={() => setSelected(item)}
            >
              <div className="tile-preview">
                <item.Component size={28} {...props} />
              </div>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function Field({
  label,
  value,
  disabled,
  children,
}: {
  label: string;
  value?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="field" data-disabled={disabled || undefined}>
      <div className="field-head">
        <span>{label}</span>
        {value && <output>{value}</output>}
      </div>
      {children}
    </div>
  );
}
