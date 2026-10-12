import type { StrokeCap } from "spinkit-react";
import type { Entry } from "./catalog";

export interface Customization {
  size: number;
  color: string;
  /** Duration in milliseconds (UI). Converted to seconds for the library. */
  durationMs: number;
  opacity: number;
  easing: string;
  thickness: number | null;
  cap: StrokeCap;
  extra: Record<string, number>;
}

export function initialCustomization(entry: Entry): Customization {
  return {
    size: 48,
    color: "#e0d9d3",
    durationMs: Math.round(entry.duration * 1000),
    opacity: 100,
    easing: "linear",
    thickness: null,
    cap: "round",
    extra: {},
  };
}

function propLines(entry: Entry, c: Customization, paused: boolean) {
  const lines: string[] = [];
  if (c.size !== 24) lines.push(`size={${c.size}}`);
  if (c.color && c.color.toLowerCase() !== "#e0d9d3") lines.push(`color="${c.color}"`);
  const durationSec = +(c.durationMs / 1000).toFixed(2);
  if (durationSec !== entry.duration) lines.push(`duration={${durationSec}}`);
  if (c.easing && c.easing !== "linear") lines.push(`easing="${c.easing}"`);
  if (entry.stroke && c.thickness != null) lines.push(`thickness={${c.thickness}}`);
  if (entry.stroke && c.cap !== "round") lines.push(`cap="${c.cap}"`);
  if (paused) lines.push(`playState="paused"`);
  const extra = entry.extra;
  if (extra) {
    const value = c.extra[extra.prop] ?? extra.default;
    if (value !== extra.default) lines.push(`${extra.prop}={${value}}`);
  }
  return lines;
}

export function snippet(entry: Entry, c: Customization, paused: boolean) {
  const lines = propLines(entry, c, paused);
  const indent = "      ";
  let spinner: string;
  if (lines.length === 0) {
    spinner = `<${entry.name} />`;
  } else if (lines.length === 1) {
    spinner = `<${entry.name} ${lines[0]} />`;
  } else {
    spinner = `<${entry.name}\n${lines.map((l) => `${indent}${l}`).join("\n")}\n    />`;
  }

  if (c.opacity < 100) {
    const opacity = +(c.opacity / 100).toFixed(2);
    return `import { ${entry.name} } from "spinkit-react";

export function ${entry.name}Demo() {
  return (
    <div style={{ opacity: ${opacity} }}>
      ${spinner.includes("\n") ? spinner.replace(/\n/g, "\n      ") : spinner}
    </div>
  );
}`;
  }

  return `import { ${entry.name} } from "spinkit-react";

export function ${entry.name}Demo() {
  return ${spinner.includes("\n") ? `(\n    ${spinner}\n  )` : spinner};
}`;
}

/** Runtime props passed to the live preview. */
export function previewProps(entry: Entry, c: Customization, paused: boolean) {
  const extra = entry.extra;
  return {
    size: c.size,
    color: c.color || undefined,
    duration: c.durationMs / 1000,
    easing: c.easing || undefined,
    thickness: c.thickness ?? undefined,
    cap: entry.stroke ? c.cap : undefined,
    playState: paused ? ("paused" as const) : ("running" as const),
    style: c.opacity < 100 ? { opacity: c.opacity / 100 } : undefined,
    ...(extra ? { [extra.prop]: c.extra[extra.prop] ?? extra.default } : null),
  };
}
