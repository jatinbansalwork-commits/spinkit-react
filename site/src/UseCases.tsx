import { type ReactNode, useEffect, useState } from "react";
import { Beacon, Dots, Lines, Radar, Spin, Track, Typing } from "spinkit-react";
import { Code } from "./Code";

function Demo({ id, title, children, preview, code }: { id: string; title: string; children: ReactNode; preview: ReactNode; code: string }) {
  return (
    <article className="demo" id={id}>
      <h3>
        <a href={`#${id}`}>{title}</a>
      </h3>
      <p>{children}</p>
      <div className="demo-preview">{preview}</div>
      <Code>{code}</Code>
    </article>
  );
}

function ButtonDemo() {
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!saving) return;
    const t = setTimeout(() => setSaving(false), 1800);
    return () => clearTimeout(t);
  }, [saving]);
  return (
    <button type="button" className="btn" disabled={saving} onClick={() => setSaving(true)}>
      {saving ? <Spin size={16} label="Saving" /> : null}
      {saving ? "Saving…" : "Save changes"}
    </button>
  );
}

function InputDemo() {
  const [value, setValue] = useState("");
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    if (!value) return setSearching(false);
    setSearching(true);
    const t = setTimeout(() => setSearching(false), 700);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="input">
      <input placeholder="Search spinners…" value={value} onChange={(e) => setValue(e.target.value)} />
      {searching && <Spin size={16} label="Searching" />}
    </div>
  );
}

function PlayStateDemo() {
  const [running, setRunning] = useState(true);
  return (
    <div className="row">
      <Radar size={40} playState={running ? "running" : "paused"} />
      <button type="button" className="btn btn-ghost" onClick={() => setRunning((r) => !r)}>
        {running ? "Pause" : "Resume"}
      </button>
    </div>
  );
}

export function UseCases() {
  return (
    <div className="demos">
      <Demo
        id="buttons"
        title="Buttons"
        preview={<ButtonDemo />}
        code={`<button disabled={saving}>
  {saving && <Spin size={16} label="Saving" />}
  {saving ? "Saving…" : "Save changes"}
</button>`}
      >
        Swap the button content while a request is in flight. Click it to try.
      </Demo>

      <Demo
        id="inline"
        title="Inline with text"
        preview={
          <p className="inline-text">
            Syncing 3 files <Dots size="1em" />
          </p>
        }
        code={`<p>
  Syncing 3 files <Dots size="1em" />
</p>`}
      >
        String sizes work too. With <code>1em</code> the spinner scales with the surrounding font.
      </Demo>

      <Demo
        id="color"
        title="Inherited color"
        preview={
          <div className="row">
            <div className="alert alert-info">
              <Beacon size={18} /> Deploying to production
            </div>
            <div className="alert alert-warn">
              <Spin size={18} /> Retrying connection
            </div>
          </div>
        }
        code={`<div className="alert-info">
  <Beacon size={18} /> Deploying to production
</div>`}
      >
        Spinners use <code>currentColor</code> by default, so they match whatever text they sit next to.
      </Demo>

      <Demo id="inputs" title="Input adornment" preview={<InputDemo />} code={`<div className="input">
  <input value={query} onChange={...} />
  {searching && <Spin size={16} label="Searching" />}
</div>`}>
        Show activity inside a field, for example while search results load. Type something.
      </Demo>

      <Demo
        id="overlay"
        title="Content overlay"
        preview={
          <div className="card-overlay">
            <div className="fake-card">
              <strong>Monthly revenue</strong>
              <span>$48,210</span>
            </div>
            <div className="overlay">
              <Spin size={28} label="Refreshing" />
            </div>
          </div>
        }
        code={`<div style={{ position: "relative" }}>
  <Card />
  <div className="overlay">
    <Spin size={28} label="Refreshing" />
  </div>
</div>`}
      >
        Cover stale content while it refreshes, without shifting the layout.
      </Demo>

      <Demo
        id="skeleton"
        title="Placeholder content"
        preview={
          <ul className="list">
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <span className="avatar" />
                <Lines size={28} label="Loading row" />
              </li>
            ))}
          </ul>
        }
        code={`<li>
  <Avatar />
  <Lines size={28} label="Loading row" />
</li>`}
      >
        <code>Lines</code> works as a compact skeleton for rows that haven't arrived yet.
      </Demo>

      <Demo
        id="toast"
        title="Toasts and progress"
        preview={
          <div className="toast">
            <div>
              <strong>Uploading report.pdf</strong>
              <span>About 10 seconds left</span>
            </div>
            <Track size={48} label="Uploading" />
          </div>
        }
        code={`<Toast>
  Uploading report.pdf
  <Track size={48} label="Uploading" />
</Toast>`}
      >
        <code>Track</code> is an indeterminate progress bar for work without a known end.
      </Demo>

      <Demo
        id="chat"
        title="Chat and AI responses"
        preview={
          <div className="bubble">
            <Typing size={28} label="Assistant is typing" />
          </div>
        }
        code={`<Bubble>
  <Typing size={28} label="Assistant is typing" />
</Bubble>`}
      >
        A typing indicator for chat threads or streaming responses.
      </Demo>

      <Demo
        id="page"
        title="Full-page loading"
        preview={
          <div className="page-frame">
            <Spin size={36} arc={0.35} thickness={2} />
            <span>Preparing your workspace</span>
          </div>
        }
        code={`<main className="grid place-items-center min-h-screen">
  <Spin size={36} arc={0.35} thickness={2} />
  <span>Preparing your workspace</span>
</main>`}
      >
        Center a larger spinner with a short message for route transitions or app boot.
      </Demo>

      <Demo id="play-state" title="Pausing" preview={<PlayStateDemo />} code={`<Radar playState={running ? "running" : "paused"} />
// or simply
<Radar paused />`}>
        Freeze a spinner in place with <code>playState</code> or the <code>paused</code> shorthand, for
        example when a task is waiting on the user.
      </Demo>

      <Demo
        id="styling"
        title="Custom styling"
        preview={
          <div className="row">
            <Spin size={32} className="hover-brand" />
            <span className="muted">Hover the spinner</span>
          </div>
        }
        code={`<Spin className="hover-brand" />

/* CSS */
.hover-brand { --sk-color: #94a3b8; transition: color .2s; }
.hover-brand:hover { --sk-color: #4f46e5; --sk-duration: .4s; }`}
      >
        Pass <code>className</code> or <code>style</code>, or set the <code>--sk-color</code>,{" "}
        <code>--sk-duration</code>, <code>--sk-thickness</code> and <code>--sk-ease</code> variables from
        your own CSS.
      </Demo>

      <Demo
        id="suspense"
        title="Suspense and Server Components"
        preview={
          <div className="row muted">
            <Spin size={20} /> Loading dashboard…
          </div>
        }
        code={`// app/dashboard/page.tsx (a Server Component)
import { Suspense } from "react";
import { Spin } from "spinkit-react";

export default function Page() {
  return (
    <Suspense fallback={<Spin size={20} />}>
      <Dashboard />
    </Suspense>
  );
}`}
      >
        Spinners have no hooks or client state, so they render in Server Components and Suspense
        fallbacks without a <code>"use client"</code> boundary.
      </Demo>
    </div>
  );
}
