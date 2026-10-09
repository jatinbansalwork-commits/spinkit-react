# spinkit-react

Tiny, accessible, dependency-free loading spinners for React.

- 23 SVG spinners, ~13 KB minified for the whole set, tree-shakable
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

## Development

```sh
pnpm install
pnpm test        # unit tests
pnpm build       # build the library into dist/
pnpm site:dev    # run the docs site
```

## License

MIT
