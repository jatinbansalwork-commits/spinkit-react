import { useMemo } from "react";
import { usePageRail } from "./RailContext";
import { UseCases } from "./UseCases";

const SECTIONS = [
  ["buttons", "Buttons"],
  ["intent", "Intent presets"],
  ["inline", "Inline with text"],
  ["color", "Inherited color"],
  ["inputs", "Input adornment"],
  ["overlay", "Content overlay"],
  ["skeleton", "Placeholder content"],
  ["toast", "Toasts and progress"],
  ["chat", "Chat and AI"],
  ["determinate", "Determinate progress"],
  ["page", "Full-page loading"],
  ["play-state", "Pausing"],
  ["sound", "Sound feedback"],
  ["styling", "Custom styling"],
  ["suspense", "Suspense"],
] as const;

export function UseCasesPage() {
  const rail = useMemo(
    () => (
      <nav className="toc" aria-label="On this page">
        <p className="toc-label">On this page</p>
        <ul>
          {SECTIONS.map(([id, title]) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ul>
      </nav>
    ),
    [],
  );

  usePageRail(rail);

  return (
    <div className="doc-page">
      <header className="page-head">
        <p className="eyebrow">Docs/</p>
        <h1>Use cases</h1>
        <p className="lede">
          Recipes for the pauses in a product. Short copy, working demos, code you can paste.
        </p>
      </header>
      <UseCases />
    </div>
  );
}
