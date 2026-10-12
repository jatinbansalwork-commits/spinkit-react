import { useMemo, useState } from "react";
import { CAPS, EASINGS, SIZE_PRESETS, type Entry } from "./catalog";
import { Code } from "./Code";
import {
  initialCustomization,
  previewProps,
  snippet,
  type Customization,
} from "./customization";

const PRESET_COLORS = [
  "#e0d9d3",
  "#ffffff",
  "#8f8982",
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#f87171",
  "#c45c28",
];

export function Playground({ entry }: { entry: Entry }) {
  const [c, setC] = useState(() => initialCustomization(entry));
  const [paused, setPaused] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [customColors, setCustomColors] = useState<string[]>([]);

  const set = <K extends keyof Customization>(key: K, value: Customization[K]) =>
    setC((prev) => ({ ...prev, [key]: value }));

  const props = useMemo(() => previewProps(entry, c, paused), [entry, c, paused]);
  const code = useMemo(() => snippet(entry, c, paused), [entry, c, paused]);
  const extra = entry.extra;
  const extraValue = extra ? (c.extra[extra.prop] ?? extra.default) : undefined;

  return (
    <section className="playground" id="preview" aria-label="Preview">
      <div className={`playground-frame${panelOpen ? "" : " is-collapsed"}`}>
        <div className="stage">
          <entry.Component {...props} />
          <button
            type="button"
            className="stage-pause"
            aria-pressed={paused}
            aria-label={paused ? "Resume animation" : "Pause animation"}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="stage-toggle"
            aria-expanded={panelOpen}
            aria-label={panelOpen ? "Hide customization" : "Show customization"}
            onClick={() => setPanelOpen((o) => !o)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {panelOpen && (
          <div className="controls">
            <Segmented
              label="Size"
              value={c.size}
              options={SIZE_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
              onChange={(v) => set("size", v)}
            />

            <Segmented
              label="Easing"
              value={c.easing}
              options={EASINGS.map((e) => ({ label: e.label, value: e.value }))}
              onChange={(v) => set("easing", v)}
            />

            {entry.stroke && (
              <Segmented
                label="Cap"
                value={c.cap}
                options={CAPS.map((cap) => ({ label: cap.label, value: cap.value }))}
                onChange={(v) => set("cap", v)}
              />
            )}

            <ColorControl
              value={c.color}
              customColors={customColors}
              onChange={(color) => set("color", color)}
              onAdd={(color) => {
                const next = color.toLowerCase();
                setCustomColors((prev) =>
                  prev.some((p) => p.toLowerCase() === next) ||
                  PRESET_COLORS.some((p) => p.toLowerCase() === next)
                    ? prev
                    : [...prev, next],
                );
                set("color", next);
              }}
              onRemove={(color) => {
                setCustomColors((prev) => prev.filter((p) => p.toLowerCase() !== color.toLowerCase()));
                if (c.color.toLowerCase() === color.toLowerCase()) set("color", PRESET_COLORS[0]);
              }}
            />

            <div className="control">
              <div className="control-head">
                <span>Speed</span>
                <output>{c.durationMs}ms</output>
              </div>
              <input
                type="range"
                min={entry.speedRange.min}
                max={entry.speedRange.max}
                step={50}
                value={c.durationMs}
                aria-label="Speed"
                onChange={(e) => set("durationMs", +e.target.value)}
              />
            </div>

            <div className="control">
              <div className="control-head">
                <span>Opacity</span>
                <output>{c.opacity}%</output>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={1}
                value={c.opacity}
                aria-label="Opacity"
                onChange={(e) => set("opacity", +e.target.value)}
              />
            </div>

            {entry.stroke && (
              <div className="control">
                <div className="control-head">
                  <span>Thickness</span>
                  <output>{c.thickness == null ? "default" : c.thickness}</output>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={4}
                  step={0.25}
                  value={c.thickness ?? 2}
                  aria-label="Thickness"
                  onChange={(e) => set("thickness", +e.target.value)}
                />
              </div>
            )}

            {extra && (
              <div className="control">
                <div className="control-head">
                  <span>{extra.label}</span>
                  <output>{extraValue}</output>
                </div>
                <input
                  type="range"
                  min={extra.min}
                  max={extra.max}
                  step={extra.step}
                  value={extraValue}
                  aria-label={extra.label}
                  onChange={(e) =>
                    setC((prev) => ({
                      ...prev,
                      extra: { ...prev.extra, [extra.prop]: +e.target.value },
                    }))
                  }
                />
              </div>
            )}

            <div className="controls-foot">
              <button type="button" className="reset" onClick={() => setC(initialCustomization(entry))}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Reset
              </button>
            </div>
          </div>
        )}

        <div className="playground-code">
          <Code>{code}</Code>
        </div>
      </div>
    </section>
  );
}

function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="control">
      <div className="control-head">
        <span>{label}</span>
      </div>
      <div className="segmented" role="radiogroup" aria-label={label}>
        {options.map((opt) => (
          <button
            type="button"
            key={String(opt.value)}
            role="radio"
            aria-checked={value === opt.value}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ColorControl({
  value,
  customColors,
  onChange,
  onAdd,
  onRemove,
}: {
  value: string;
  customColors: string[];
  onChange: (color: string) => void;
  onAdd: (color: string) => void;
  onRemove: (color: string) => void;
}) {
  const colors = [...PRESET_COLORS, ...customColors];

  return (
    <div className="control">
      <div className="control-head">
        <span>Color</span>
        <output>{value.toUpperCase()}</output>
      </div>
      <div className="swatches" role="listbox" aria-label="Color">
        {colors.map((color) => {
          const selected = value.toLowerCase() === color.toLowerCase();
          const isCustom = customColors.some((c) => c.toLowerCase() === color.toLowerCase());
          return (
            <div key={color} className="swatch-wrap" role="option" aria-selected={selected}>
              <button
                type="button"
                className="swatch"
                aria-label={color}
                aria-pressed={selected}
                style={{ background: color }}
                onClick={() => onChange(color)}
                onContextMenu={
                  isCustom
                    ? (e) => {
                        e.preventDefault();
                        onRemove(color);
                      }
                    : undefined
                }
              />
              {isCustom && (
                <button
                  type="button"
                  className="swatch-remove"
                  aria-label={`Remove ${color}`}
                  onClick={() => onRemove(color)}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
        <label className="swatch-add" title="Add a color">
          <input
            type="color"
            value={value.startsWith("#") && value.length === 7 ? value : "#e0d9d3"}
            aria-label="Add a color"
            onChange={(e) => onAdd(e.target.value)}
          />
          <span aria-hidden="true">+</span>
        </label>
      </div>
    </div>
  );
}
