# Changelog

All notable changes to `spinkit-react`. New entries go under **Unreleased**; on release that heading
becomes the version number.

## Unreleased (0.2.1)

## 0.2.0

### Added

- `intent` presets on every spinner: `"button"`, `"inline"`, `"page"` — size and stroke weight for
  the moments you already design for.
- `SpinnerGroup` layout helper for spinner + label without custom flex CSS.
- Optional `value` (0–1) on `Track` and `Progress` for determinate loads.
- Four new indicators: `Spark`, `Waveform`, `Orbit`, `Shimmer`.
- Docs: playground copy-snippet label, intent controls, “Pair with brand” page, and use-case demos
  for the new APIs.

## 0.1.2

### A proper front door

The kit worked. The homepage still felt like a packing slip.

So the docs got a real surface — warm dark, a little orange for pulse, a catalog instead of a
scroll of names. Every spinner has a page. Twist size, color, speed, easing until it matches the
frame. ⌘K when your hands are already there. A version chip that brings you back here.
`/llms.txt` for anything that reads ahead.

Docs live at [spinkit-react.vercel.app](https://spinkit-react.vercel.app/).

Same package. Less time translating "I like this motion" into "it's in the build."

## 0.1.1

Contributing guide, issue templates, README badges and package metadata.

## 0.1.0 — Version one

### The idea

Loading is the beat between intent and result. Most products treat it like interstitial furniture —
a leftover GIF, a CSS circle from a starter kit, or silence.

The brief was almost rude in how small it was: waiting should look decided. One API. Props you'd
actually reach for — size, color, speed, stroke. Motion that backs off when someone prefers less.
Import it. Place it. Move on.

No platform. No manifesto. Just a drawer of indicators that behave.

### What shipped

Thirty-four of them. From the quiet `Spin` to things with a little more personality — `Typing`,
`Heartbeat`, `Honeycomb`, `Radar`.

They all speak the same language: `size`, `color`, `duration`, `easing`, `thickness`, `cap`,
`playState`, `label`, `motion`. A few shapes get extras (`arc`, `count`, `spokes`, `petals`).
Optional sound lives at `spinkit-react/sound` for the rare moment a finish deserves a click.

That was version one. Small on purpose.
