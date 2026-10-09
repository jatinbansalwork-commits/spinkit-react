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
  // biome-ignore lint: spinners accept their own extra props
  Component: ComponentType<SpinnerProps & Record<string, any>>;
  description: string;
  duration: number;
  stroke: boolean;
  extra?: ExtraProp;
}

const count = (min: number, max: number, def: number): ExtraProp => ({
  prop: "count",
  label: "Count",
  min,
  max,
  step: 1,
  default: def,
});

export const CATALOG: Entry[] = [
  { name: "Spin", Component: Kit.Spin, description: "An arc rotating around a faint track.", duration: 0.8, stroke: true, extra: { prop: "arc", label: "Arc", min: 0.05, max: 0.95, step: 0.05, default: 0.25 } },
  { name: "Dots", Component: Kit.Dots, description: "Dots hopping one after another.", duration: 1.2, stroke: false, extra: count(2, 7, 3) },
  { name: "Typing", Component: Kit.Typing, description: "Dots fading in and out, like someone typing.", duration: 1.2, stroke: false, extra: count(2, 7, 3) },
  { name: "Bars", Component: Kit.Bars, description: "Bars bouncing like an equalizer.", duration: 1, stroke: false, extra: count(3, 7, 4) },
  { name: "Beacon", Component: Kit.Beacon, description: "Rings radiating from a solid core.", duration: 1.6, stroke: true },
  { name: "Moons", Component: Kit.Moons, description: "Two moons circling a planet.", duration: 1.4, stroke: true },
  { name: "Grid", Component: Kit.Grid, description: "Four tiles lighting up clockwise.", duration: 1.2, stroke: false },
  { name: "Radial", Component: Kit.Radial, description: "Spokes with a highlight sweeping around.", duration: 1, stroke: true, extra: { prop: "spokes", label: "Spokes", min: 6, max: 16, step: 1, default: 8 } },
  { name: "Loop", Component: Kit.Loop, description: "A dash travelling along a figure eight.", duration: 1.6, stroke: true },
  { name: "Heartbeat", Component: Kit.Heartbeat, description: "A pulse crossing a heart-rate line.", duration: 1.4, stroke: true },
  { name: "Pendulum", Component: Kit.Pendulum, description: "A weight swinging from a pivot.", duration: 1.4, stroke: true },
  { name: "Bloom", Component: Kit.Bloom, description: "Petals swelling and shrinking in turn.", duration: 1.2, stroke: false, extra: { prop: "petals", label: "Petals", min: 4, max: 10, step: 1, default: 6 } },
  { name: "Hourglass", Component: Kit.Hourglass, description: "An hourglass draining and flipping over.", duration: 2.4, stroke: true },
  { name: "Honeycomb", Component: Kit.Honeycomb, description: "A ring of hexagons around a centre cell.", duration: 1.2, stroke: false },
  { name: "Signal", Component: Kit.Signal, description: "Waves lighting up from the source outward.", duration: 1.4, stroke: true },
  { name: "Battery", Component: Kit.Battery, description: "A battery charging cell by cell.", duration: 2, stroke: true },
  { name: "Track", Component: Kit.Track, description: "An indeterminate progress bar.", duration: 1.5, stroke: false },
  { name: "Gear", Component: Kit.Gear, description: "A turning gear.", duration: 2, stroke: true },
  { name: "Sun", Component: Kit.Sun, description: "Rays turning around a glowing core.", duration: 1.2, stroke: true },
  { name: "Radar", Component: Kit.Radar, description: "A sweep that lights up a blip as it passes.", duration: 2, stroke: true },
  { name: "Ball", Component: Kit.Ball, description: "A ball bouncing and squashing on the floor.", duration: 0.9, stroke: false },
  { name: "Lines", Component: Kit.Lines, description: "Placeholder lines filling in, like a skeleton.", duration: 1.4, stroke: true },
  { name: "Chase", Component: Kit.Chase, description: "Two dots chasing around a square.", duration: 2, stroke: true },
  { name: "Stretch", Component: Kit.Stretch, description: "An arc that grows and shrinks as it turns.", duration: 1.6, stroke: true },
  { name: "Twin", Component: Kit.Twin, description: "Two arcs turning in opposite directions.", duration: 1.2, stroke: true },
  { name: "Tail", Component: Kit.Tail, description: "A ring with a fading tail, like a comet.", duration: 1, stroke: true },
  { name: "Tumble", Component: Kit.Tumble, description: "A square flipping over on one axis, then the other.", duration: 1.6, stroke: false },
  { name: "Timer", Component: Kit.Timer, description: "A clock face with sweeping hands.", duration: 1.2, stroke: true },
];

export const EASINGS = [
  { label: "Default", value: "" },
  { label: "linear", value: "linear" },
  { label: "ease", value: "ease" },
  { label: "ease-in-out", value: "ease-in-out" },
  { label: "ease-out", value: "ease-out" },
  { label: "snappy", value: "cubic-bezier(.7,0,.3,1)" },
  { label: "steps(8)", value: "steps(8)" },
];
