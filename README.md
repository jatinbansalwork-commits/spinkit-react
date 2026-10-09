# spinkit-react

Tiny, accessible, dependency-free loading spinners for React.

[![npm](https://img.shields.io/npm/v/spinkit-react)](https://www.npmjs.com/package/spinkit-react)
[![bundle size](https://img.shields.io/bundlephobia/minzip/spinkit-react)](https://bundlephobia.com/package/spinkit-react)
[![license](https://img.shields.io/npm/l/spinkit-react)](LICENSE)

- 34 SVG spinners, ~18 KB minified for the whole set, tree-shakable
- No CSS import: styles are injected once via React 19 stylesheet hoisting
- Works in Server Components and Suspense fallbacks (no hooks, no client state)
- `role="status"` with an accessible label
- Slows down automatically for users who prefer reduced motion
- Tune size, color, duration, easing, stroke thickness, line caps and play state

## Install

```sh
npm install spinkit-react
```

Requires React 19 or later.

## Usage

```tsx
import { Spin } from "spinkit-react";

export function SaveButton({ saving }: { saving: boolean }) {
  return (
    <button disabled={saving}>
      {saving && <Spin size={16} label="Saving" />}
      {saving ? "Saving…" : "Save"}
    </button>
  );
}
```

## Spinners

| Component   | Description                                  | Extra prop        |
| ----------- | -------------------------------------------- | ----------------- |
| `Spin`      | An arc rotating around a faint track         | `arc` 0.05–0.95   |
| `Dots`      | Dots hopping one after another               | `count` 2–7       |
| `Typing`    | Dots fading in and out                       | `count` 2–7       |
| `Bars`      | Bars bouncing like an equalizer              | `count` 3–7       |
| `Beacon`    | Rings radiating from a solid core            |                   |
| `Moons`     | Two moons circling a planet                  |                   |
| `Grid`      | Four tiles lighting up clockwise             |                   |
| `Radial`    | Spokes with a sweeping highlight             | `spokes` 6–16     |
| `Loop`      | A dash travelling along a figure eight       |                   |
| `Heartbeat` | A pulse crossing a heart-rate line           |                   |
| `Pendulum`  | A weight swinging from a pivot               |                   |
| `Bloom`     | Petals swelling and shrinking in turn        | `petals` 4–10     |
| `Hourglass` | An hourglass draining and flipping over      |                   |
| `Honeycomb` | A ring of hexagons around a centre cell      |                   |
| `Signal`    | Waves lighting up from the source outward    |                   |
| `Battery`   | A battery charging cell by cell              |                   |
| `Track`     | An indeterminate progress bar                |                   |
| `Gear`      | A turning gear                               |                   |
| `Sun`       | Rays turning around a glowing core           |                   |
| `Radar`     | A sweep that lights up a blip as it passes   |                   |
| `Ball`      | A ball bouncing and squashing on the floor   |                   |
| `Lines`     | Placeholder lines filling in, like a skeleton|                   |
| `Chase`     | Two dots chasing around a square             |                   |
| `Stretch`   | An arc that grows and shrinks as it turns    |                   |
| `Twin`      | Two arcs turning in opposite directions      |                   |
| `Tail`      | A ring with a fading tail, like a comet      |                   |
| `Tumble`    | A square flipping over, one axis at a time   |                   |
| `Timer`     | A clock face with sweeping hands             |                   |
| `Helix`     | Two strands of dots twisting like DNA        |                   |
| `Sync`      | Two arrows cycling around each other         |                   |
| `Cursor`    | A line being typed with a blinking caret     |                   |
| `Progress`  | A ring filling up, fading, and starting over |                   |
| `Spiral`    | Dots spiralling in toward the centre         |                   |
| `Cloud`     | A cloud with an arrow rising into it         |                   |

## Props

Shared by every spinner. Any other prop goes to the root `span`.

| Prop        | Type                            | Default        | Notes                              |
| ----------- | ------------------------------- | -------------- | ---------------------------------- |
| `size`      | `number \| string`              | `24`           | Numbers are pixels                 |
| `color`     | `string`                        | `currentColor` |                                    |
| `duration`  | `number`                        | per spinner    | Seconds per cycle                  |
| `easing`    | `string`                        | per spinner    | Any CSS timing function            |
| `thickness` | `number`                        | per spinner    | Stroke width on a 24×24 grid       |
| `cap`       | `"round" \| "butt" \| "square"` | `"round"`      | Stroke line cap                    |
| `playState` | `"running" \| "paused"`         | `"running"`    |                                    |
| `paused`    | `boolean`                       | `false`        | Shorthand for `playState="paused"` |
| `label`     | `string`                        | `"Loading"`    | Accessible label                   |
| `motion`    | `"reduce" \| "always"`          | `"reduce"`     | Reduced-motion behaviour           |

## Styling

Each spinner renders `<span class="sk sk-{name}">`. Pass `className` or `style`, or set these CSS
variables from your own stylesheet: `--sk-color`, `--sk-duration`, `--sk-ease`, `--sk-thickness`,
`--sk-cap` and `--sk-state`.

```css
.muted-spinner { --sk-color: #94a3b8; }
.muted-spinner:hover { --sk-color: #4f46e5; --sk-duration: 0.4s; }
```

## Sound feedback (optional)

Short cues for when work starts, finishes or fails, from a separate entry point so the main
bundle stays small and server-safe. Sounds are synthesized with Web Audio (no audio files), stay
silent on touch devices, and do nothing on the server.

```tsx
import { playLoadingSound, primeLoadingSounds, setLoadingSounds } from "spinkit-react/sound";

async function onExport() {
  playLoadingSound("start"); // or primeLoadingSounds() for a silent start
  try {
    await exportReport();
    playLoadingSound("done");
  } catch {
    playLoadingSound("error");
  }
}

setLoadingSounds(userPrefersSound); // global on/off switch
playLoadingSound("done", { volume: 0.5 });
```

Browsers only allow audio after a user gesture, so trigger the first sound (or
`primeLoadingSounds()`) from the click that starts the work.

## Next.js and frameworks

Spinners have no hooks or client state, so they work in React Server Components, Suspense fallbacks
and `loading.tsx` files without `"use client"`. Their styles are injected by React 19, so there's no
CSS file to import in Next.js, Remix, Vite or any other React 19 setup.

```tsx
// app/dashboard/loading.tsx
import { Spin } from "spinkit-react";

export default function Loading() {
  return <Spin size={24} label="Loading dashboard" />;
}
```

## Troubleshooting

| Problem                                   | Fix                                                                         |
| ----------------------------------------- | --------------------------------------------------------------------------- |
| Spinner is visible but doesn't animate    | Requires React 19; earlier versions don't hoist the injected styles         |
| Spinner is invisible                      | It uses `currentColor`; check the parent's text color or pass `color`       |
| Animates slower than expected             | Reduced motion is on in your OS. Pass `motion="always"` to opt out          |
| `thickness` or `cap` has no effect        | Those only apply to stroked spinners such as `Spin`, `Loop` or `Gear`       |
| No sound                                  | Sounds need a user click first and stay off on touch devices                |

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, adding a spinner and releasing.

```sh
pnpm install
pnpm test        # unit tests
pnpm build       # build the library into dist/
pnpm site:dev    # run the docs site
```

## Support

- [Report a bug](https://github.com/jatinbansalwork-commits/spinkit-react/issues/new?template=bug_report.yml)
- [Suggest a spinner or feature](https://github.com/jatinbansalwork-commits/spinkit-react/issues/new?template=feature_request.yml)

## License

[MIT](LICENSE) © Jatin Bansal
