# spinkit-react

Tiny, accessible, dependency-free loading spinners for React.

- 12 SVG spinners, ~7 KB minified for the whole set, tree-shakable
- No CSS import: styles are injected once via React 19 stylesheet hoisting
- Works in Server Components (no hooks, no client state)
- `role="status"` with an accessible label
- Slows down automatically for users who prefer reduced motion

## Install

```sh
npm install spinkit-react
```

Requires React 19 or later.

## Usage

```tsx
import { Spin } from "spinkit-react";

export function SaveButton({ saving }: { saving: boolean }) {
  return <button>{saving ? <Spin size={16} /> : "Save"}</button>;
}
```

## Spinners

| Component   | Description                              |
| ----------- | ---------------------------------------- |
| `Spin`      | An arc rotating around a faint track     |
| `Dots`      | Three dots hopping one after another     |
| `Typing`    | Three dots fading in and out             |
| `Bars`      | Four bars bouncing like an equalizer     |
| `Pulse`     | Rings radiating from a solid core        |
| `Orbit`     | Two moons circling a planet              |
| `Grid`      | Four tiles lighting up clockwise         |
| `Radial`    | Eight spokes with a sweeping highlight   |
| `Loop`      | A dash travelling along a figure eight   |
| `Heartbeat` | A pulse crossing a heart-rate line       |
| `Pendulum`  | A weight swinging from a pivot           |
| `Bloom`     | Six petals swelling in turn              |

## Props

Every spinner accepts the same props, plus any attribute of a `span`.

| Prop       | Type                   | Default        |
| ---------- | ---------------------- | -------------- |
| `size`     | `number \| string`     | `24`           |
| `color`    | `string`               | `currentColor` |
| `duration` | `number` (seconds)     | per spinner    |
| `paused`   | `boolean`              | `false`        |
| `label`    | `string`               | `"Loading"`    |
| `motion`   | `"reduce" \| "always"` | `"reduce"`     |

## Styling

Each spinner renders `<span class="sk sk-{name}">`. Pass `className` or `style`, or target the
CSS variables `--sk-color`, `--sk-duration` and `--sk-state` directly.

## Development

```sh
pnpm install
pnpm test        # unit tests
pnpm build       # build the library into dist/
pnpm site:dev    # run the demo site
```

## License

MIT
