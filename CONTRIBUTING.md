# Contributing to spinkit-react

Thanks for helping out. Bug reports, spinner ideas and pull requests are all welcome.

## Reporting a bug

[Open a bug report](https://github.com/jatinbansalwork-commits/spinkit-react/issues/new?template=bug_report.yml)
with the spinner, the props you used, your browser, and the versions of `spinkit-react` and React.

## Suggesting a spinner

[Request a feature](https://github.com/jatinbansalwork-commits/spinkit-react/issues/new?template=feature_request.yml)
and describe where you'd use it. A sketch or a short screen recording helps a lot.

## Working on the code

Requires Node 20+ and pnpm.

```bash
git clone https://github.com/jatinbansalwork-commits/spinkit-react.git
cd spinkit-react
pnpm install
pnpm site:dev        # docs site with every spinner at http://localhost:5173
```

| Command          | What it does                       |
| ---------------- | ---------------------------------- |
| `pnpm test`      | Unit tests                         |
| `pnpm typecheck` | Type check                         |
| `pnpm build`     | Build the library into `dist/`     |
| `pnpm site:dev`  | Run the docs site                  |

### Adding a spinner

1. Add the component to `src/spinners.tsx`, drawing on the 24×24 grid. Use the `Spinner` wrapper,
   `anim()` for keyframes, `sk-a` on animated elements and `sk-s` on stroked ones, so `duration`,
   `easing`, `thickness`, `cap` and reduced motion all work automatically.
2. Export it from `src/index.ts`. The shared tests pick it up on their own.
3. Add it to `site/src/catalog.ts` and the table in `README.md`.

Before opening a pull request, run `pnpm typecheck && pnpm test && pnpm site:build`, and check the
spinner at small sizes (16px) and with reduced motion turned on.

## Releasing (maintainers)

1. Bump `version` in `package.json`.
2. Run `npm publish --access public` (type check, tests and build run first).
3. Tag the release: `git tag v<version> && git push --tags`.
