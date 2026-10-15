import type { ComponentType } from "react";
import * as Kit from "spinkit-react";
import type { SpinnerProps } from "spinkit-react";

export interface ExtraProp {
  prop: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

export interface Entry {
  name: string;
  slug: string;
  // biome-ignore lint: spinners accept their own extra props
  Component: ComponentType<SpinnerProps & Record<string, any>>;
  description: string;
  /** Default cycle length in seconds (library units). */
  duration: number;
  stroke: boolean;
  extra?: ExtraProp;
  /** Speed slider range in milliseconds. */
  speedRange: { min: number; max: number };
}

const count = (min: number, max: number, def: number): ExtraProp => ({
  prop: "count",
  label: "Count",
  min,
  max,
  step: 1,
  default: def,
});

function entry(
  name: string,
  Component: Entry["Component"],
  description: string,
  duration: number,
  stroke: boolean,
  extra?: ExtraProp,
): Entry {
  const ms = Math.round(duration * 1000);
  return {
    name,
    slug: name.toLowerCase(),
    Component,
    description,
    duration,
    stroke,
    extra,
    speedRange: { min: Math.max(200, Math.round(ms * 0.35)), max: Math.round(ms * 2.5) },
  };
}

/** Order here is sidebar order, overview grid order, and prev/next order. */
export const CATALOG: Entry[] = [
  entry("Spin", Kit.Spin, "An arc rotating around a faint track.", 0.8, true, {
    prop: "arc",
    label: "Arc",
    min: 0.05,
    max: 0.95,
    step: 0.05,
    default: 0.25,
  }),
  entry("Dots", Kit.Dots, "Dots hopping one after another.", 1.2, false, count(2, 7, 3)),
  entry("Typing", Kit.Typing, "Dots fading in and out, like someone typing.", 1.2, false, count(2, 7, 3)),
  entry("Bars", Kit.Bars, "Bars bouncing like an equalizer.", 1, false, count(3, 7, 4)),
  entry("Beacon", Kit.Beacon, "Rings radiating from a solid core.", 1.6, true),
  entry("Moons", Kit.Moons, "Two moons circling a planet.", 1.4, true),
  entry("Grid", Kit.Grid, "Four tiles lighting up clockwise.", 1.2, false),
  entry("Radial", Kit.Radial, "Spokes with a highlight sweeping around.", 1, true, {
    prop: "spokes",
    label: "Spokes",
    min: 6,
    max: 16,
    step: 1,
    default: 8,
  }),
  entry("Loop", Kit.Loop, "A dash travelling along a figure eight.", 1.6, true),
  entry("Heartbeat", Kit.Heartbeat, "A pulse crossing a heart-rate line.", 1.4, true),
  entry("Pendulum", Kit.Pendulum, "A weight swinging from a pivot.", 1.4, true),
  entry("Bloom", Kit.Bloom, "Petals swelling and shrinking in turn.", 1.2, false, {
    prop: "petals",
    label: "Petals",
    min: 4,
    max: 10,
    step: 1,
    default: 6,
  }),
  entry("Hourglass", Kit.Hourglass, "An hourglass draining and flipping over.", 2.4, true),
  entry("Honeycomb", Kit.Honeycomb, "A ring of hexagons around a centre cell.", 1.2, false),
  entry("Signal", Kit.Signal, "Waves lighting up from the source outward.", 1.4, true),
  entry("Battery", Kit.Battery, "A battery charging cell by cell.", 2, true),
  entry("Track", Kit.Track, "An indeterminate progress bar.", 1.5, false),
  entry("Gear", Kit.Gear, "A turning gear.", 2, true),
  entry("Sun", Kit.Sun, "Rays turning around a glowing core.", 1.2, true),
  entry("Radar", Kit.Radar, "A sweep that lights up a blip as it passes.", 2, true),
  entry("Ball", Kit.Ball, "A ball bouncing and squashing on the floor.", 0.9, false),
  entry("Lines", Kit.Lines, "Placeholder lines filling in, like a skeleton.", 1.4, true),
  entry("Chase", Kit.Chase, "Two dots chasing around a square.", 2, true),
  entry("Stretch", Kit.Stretch, "An arc that grows and shrinks as it turns.", 1.6, true),
  entry("Twin", Kit.Twin, "Two arcs turning in opposite directions.", 1.2, true),
  entry("Tail", Kit.Tail, "A ring with a fading tail, like a comet.", 1, true),
  entry("Tumble", Kit.Tumble, "A square flipping over on one axis, then the other.", 1.6, false),
  entry("Timer", Kit.Timer, "A clock face with sweeping hands.", 1.2, true),
  entry("Helix", Kit.Helix, "Two strands of dots twisting like DNA.", 1.6, false),
  entry("Sync", Kit.Sync, "Two arrows cycling around each other.", 1.2, true),
  entry("Cursor", Kit.Cursor, "A line being typed with a blinking caret.", 2, true),
  entry("Progress", Kit.Progress, "A ring filling up, fading, and starting over.", 1.8, true),
  entry("Spiral", Kit.Spiral, "Dots spiralling in toward the centre.", 1.2, false),
  entry("Cloud", Kit.Cloud, "A cloud with an arrow rising into it.", 1.4, true),
  entry("Spark", Kit.Spark, "Soft sparks for AI thinking moments.", 1.4, false),
  entry("Waveform", Kit.Waveform, "A voice-style waveform for streaming audio.", 1, false),
  entry("Orbit", Kit.Orbit, "Three agents orbiting a shared centre.", 1.6, true),
  entry("Shimmer", Kit.Shimmer, "A soft shimmer for text or card placeholders.", 1.5, false),
];

export function getEntry(slug: string) {
  return CATALOG.find((e) => e.slug === slug);
}

export function neighbors(slug: string) {
  const i = CATALOG.findIndex((e) => e.slug === slug);
  if (i < 0) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? CATALOG[i - 1] : undefined,
    next: i < CATALOG.length - 1 ? CATALOG[i + 1] : undefined,
  };
}

export const EASINGS = [
  { label: "Linear", value: "linear" },
  { label: "Eased", value: "ease-in-out" },
  { label: "Ease out", value: "ease-out" },
  { label: "Snappy", value: "cubic-bezier(.7,0,.3,1)" },
] as const;

export const SIZE_PRESETS = [
  { label: "Small", value: 24 },
  { label: "Medium", value: 48 },
  { label: "Large", value: 96 },
] as const;

export const CAPS = [
  { label: "Round", value: "round" as const },
  { label: "Flat", value: "butt" as const },
  { label: "Square", value: "square" as const },
];
