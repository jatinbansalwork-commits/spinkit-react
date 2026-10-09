# Agent guidelines

## Versioning

- `package.json` `version` is always the **next** release, not the last published one.
- Every user-facing change (spinners, props, behaviour, docs shown on npm) gets a line in
  `CHANGELOG.md` under `## Unreleased (<version>)`, grouped as Added, Changed, Fixes or Docs.
- Don't bump the version for each change. Only bump when starting a new cycle after a release:
  patch for fixes and docs, minor for new spinners or props, major for breaking changes.
- Never run `npm publish` from a local machine. Releases go through the tag workflow in
  `CONTRIBUTING.md`.

## Checks

Run `pnpm typecheck && pnpm test && pnpm build` before committing.
