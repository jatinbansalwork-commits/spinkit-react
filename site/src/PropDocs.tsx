import type { ReactNode } from "react";
import type { Entry } from "./catalog";
import { Code } from "./Code";

interface Section {
  id: string;
  title: string;
  body: ReactNode;
  demo: (entry: Entry) => ReactNode;
  code: (entry: Entry) => string;
}

const SHARED: Section[] = [
  {
    id: "size",
    title: "Size",
    body: (
      <>
        Sets the spinner&apos;s dimensions in pixels. The default value is <code>24</code>.
      </>
    ),
    demo: (entry) => (
      <div className="demo-row">
        <entry.Component size={16} color="#e0d9d3" />
        <entry.Component size={24} color="#e0d9d3" />
        <entry.Component size={40} color="#e0d9d3" />
      </div>
    ),
    code: (entry) => `import { ${entry.name} } from "spinkit-react";

export function ${entry.name}Size() {
  return (
    <div className="flex items-center gap-6">
      <${entry.name} size={16} />
      <${entry.name} size={24} />
      <${entry.name} size={40} />
    </div>
  );
}`,
  },
  {
    id: "custom-classes",
    title: "Custom Classes",
    body: (
      <>
        You can use a custom <code>className</code> in case you need to tweak the spinner in a specific
        way that the library doesn&apos;t provide.
      </>
    ),
    demo: (entry) => <entry.Component className="doc-faded" size={32} color="#e0d9d3" />,
    code: (entry) => `import { ${entry.name} } from "spinkit-react";

export function ${entry.name}ClassName() {
  return <${entry.name} className="opacity-40" size={32} />;
}`,
  },
  {
    id: "color",
    title: "Color",
    body: (
      <>
        The loader inherits <code>currentColor</code> from the parent by default. You can tint it in any
        way you want. It accepts any valid CSS color.
      </>
    ),
    demo: (entry) => <entry.Component color="#c45c28" size={32} />,
    code: (entry) => `import { ${entry.name} } from "spinkit-react";

export function ${entry.name}Color() {
  return <${entry.name} color="#c45c28" size={32} />;
}`,
  },
  {
    id: "duration",
    title: "Duration",
    body: (
      <>
        Sets the speed in <code>seconds</code>. Higher values are slower, smaller values are faster.
      </>
    ),
    demo: (entry) => <entry.Component duration={entry.duration * 2} size={32} color="#e0d9d3" />,
    code: (entry) => `import { ${entry.name} } from "spinkit-react";

export function ${entry.name}Duration() {
  return <${entry.name} duration={${+(entry.duration * 2).toFixed(1)}} size={32} />;
}`,
  },
  {
    id: "state",
    title: "State",
    body: (
      <>
        Pauses or resumes the animation and exposes the state of the spinner. You can also use the{" "}
        <code>paused</code> shorthand.
      </>
    ),
    demo: (entry) => <entry.Component playState="paused" size={32} color="#e0d9d3" />,
    code: (entry) => `import { ${entry.name} } from "spinkit-react";

export function ${entry.name}PlayState() {
  return <${entry.name} playState="paused" size={32} />;
}`,
  },
];

function optionSections(entry: Entry): Section[] {
  const sections: Section[] = [];

  if (entry.stroke) {
    sections.push({
      id: "cap",
      title: "Cap",
      body: (
        <>
          Controls how the ends of the stroke are drawn. <code>round</code> finishes them with a half
          circle, <code>butt</code> cuts them square. The default cap is <code>round</code>.
        </>
      ),
      demo: (e) => (
        <div className="demo-row">
          <e.Component cap="round" size={32} color="#e0d9d3" />
          <e.Component cap="butt" size={32} color="#e0d9d3" />
        </div>
      ),
      code: (e) => `import { ${e.name} } from "spinkit-react";

export function ${e.name}Cap() {
  return (
    <div className="flex items-center gap-6">
      <${e.name} cap="round" size={32} />
      <${e.name} cap="butt" size={32} />
    </div>
  );
}`,
    });
  }

  if (entry.extra) {
    const { prop, label, min, max, default: def } = entry.extra;
    const low = min;
    const high = max;
    sections.push({
      id: prop,
      title: label,
      body: (
        <>
          Spinner-specific control. Default is <code>{def}</code>, range <code>{min}</code>–
          <code>{max}</code>.
        </>
      ),
      demo: (e) => (
        <div className="demo-row">
          <e.Component {...{ [prop]: low }} size={32} color="#e0d9d3" />
          <e.Component {...{ [prop]: def }} size={32} color="#e0d9d3" />
          <e.Component {...{ [prop]: high }} size={32} color="#e0d9d3" />
        </div>
      ),
      code: (e) => `import { ${e.name} } from "spinkit-react";

export function ${e.name}${label.replace(/\s/g, "")}() {
  return (
    <div className="flex items-center gap-6">
      <${e.name} ${prop}={${low}} size={32} />
      <${e.name} ${prop}={${def}} size={32} />
      <${e.name} ${prop}={${high}} size={32} />
    </div>
  );
}`,
    });
  }

  return sections;
}

export function tocFor(entry: Entry) {
  return [
    { id: "preview", title: "Preview" },
    ...SHARED.map((s) => ({ id: s.id, title: s.title })),
    ...optionSections(entry).map((s) => ({ id: s.id, title: s.title })),
  ];
}

export function PropDocs({ entry }: { entry: Entry }) {
  const sections = [...SHARED, ...optionSections(entry)];
  return (
    <div className="prop-docs">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="prop-section">
          <h2>
            <a href={`#${section.id}`}>{section.title}</a>
          </h2>
          <p>{section.body}</p>
          <div className="prop-demo">{section.demo(entry)}</div>
          <Code>{section.code(entry)}</Code>
        </section>
      ))}
    </div>
  );
}
