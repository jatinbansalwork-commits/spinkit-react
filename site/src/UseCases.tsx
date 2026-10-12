import { type ReactNode, useEffect, useState } from "react";
import { Beacon, Dots, Lines, Radar, Spin, Track, Typing } from "spinkit-react";
import { playLoadingSound, setLoadingSounds } from "spinkit-react/sound";
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
      {saving ? "Saving…" : "Publish"}
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
      <input placeholder="Find a motion…" value={value} onChange={(e) => setValue(e.target.value)} />
      {searching && <Spin size={16} label="Searching" />}
    </div>
  );
}

type Job = "idle" | "running" | "done" | "error";

function SoundDemo() {
  const [on, setOn] = useState(true);
  const [job, setJob] = useState<Job>("idle");

  useEffect(() => {
    setLoadingSounds(on);
  }, [on]);

  const run = (outcome: "done" | "error") => {
    playLoadingSound("start");
    setJob("running");
    setTimeout(() => {
      playLoadingSound(outcome);
      setJob(outcome);
    }, 1600);
  };

  return (
    <div className="sound-demo">
      <div className="row">
        <button type="button" className="btn" disabled={job === "running"} onClick={() => run("done")}>
          {job === "running" ? <Spin size={16} label="Exporting" /> : null}
          Pack the PDF
        </button>
        <button type="button" className="btn btn-ghost" disabled={job === "running"} onClick={() => run("error")}>
          Break it on purpose
        </button>
      </div>
      <div className="row muted">
        <span className="status" data-job={job}>
          {job === "idle" && "Quiet"}
          {job === "running" && "Busy…"}
          {job === "done" && "Packed"}
          {job === "error" && "Nope — try again"}
        </span>
        <label className="check">
          <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} />
          Sound
        </label>
      </div>
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
  {saving ? "Saving…" : "Publish"}
</button>`}
      >
        While the save is out, the label steps aside. The spinner keeps the button honest.
      </Demo>

      <Demo
        id="inline"
        title="In the sentence"
        preview={
          <p className="inline-text">
            Pulling three files <Dots size="1em" />
          </p>
        }
        code={`<p>
  Pulling three files <Dots size="1em" />
</p>`}
      >
        Size it to <code>1em</code> and it reads with the line — not beside it.
      </Demo>

      <Demo
        id="color"
        title="Takes the color"
        preview={
          <div className="row">
            <div className="alert alert-info">
              <Beacon size={18} /> Pushing the build
            </div>
            <div className="alert alert-warn">
              <Spin size={18} /> Line went quiet — retrying
            </div>
          </div>
        }
        code={`<div className="alert-info">
  <Beacon size={18} /> Pushing the build
</div>`}
      >
        Defaults to <code>currentColor</code>. Your alert styles do the rest.
      </Demo>

      <Demo id="inputs" title="Inside the field" preview={<InputDemo />} code={`<div className="input">
  <input value={query} onChange={...} />
  {searching && <Spin size={16} label="Searching" />}
</div>`}>
        Mid-query, the field goes quiet. A spinner in the trailing edge says you're still looking.
      </Demo>

      <Demo
        id="overlay"
        title="Over the card"
        preview={
          <div className="card-overlay">
            <div className="fake-card">
              <strong>This week's total</strong>
              <span>$12,480</span>
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
        Keep the last good number. Soft veil, centered spinner — no jump when fresh data lands.
      </Demo>

      <Demo
        id="skeleton"
        title="Fake rows"
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
        <code>Lines</code> sketches the row before the data shows up. Blank pages are a choice.
      </Demo>

      <Demo
        id="toast"
        title="Corner toast"
        preview={
          <div className="toast">
            <div>
              <strong>Sending moodboard.pdf</strong>
              <span>Maybe ten seconds</span>
            </div>
            <Track size={48} label="Uploading" />
          </div>
        }
        code={`<Toast>
  Sending moodboard.pdf
  <Track size={48} label="Uploading" />
</Toast>`}
      >
        No percent? Don't invent one. <code>Track</code> only promises you're still going.
      </Demo>

      <Demo
        id="chat"
        title="Someone's typing"
        preview={
          <div className="bubble">
            <Typing size={28} label="Assistant is typing" />
          </div>
        }
        code={`<Bubble>
  <Typing size={28} label="Assistant is typing" />
</Bubble>`}
      >
        The bounce in the bubble while the other side gathers a reply. Familiar. Quieter.
      </Demo>

      <Demo
        id="page"
        title="Whole screen"
        preview={
          <div className="page-frame">
            <Spin size={36} arc={0.35} thickness={2} />
            <span>One sec — laying out the board</span>
          </div>
        }
        code={`<main className="grid place-items-center min-h-screen">
  <Spin size={36} arc={0.35} thickness={2} />
  <span>One sec — laying out the board</span>
</main>`}
      >
        Big mark. Short line. Route changes, cold starts, first paint.
      </Demo>

      <Demo id="play-state" title="Hold still" preview={<PlayStateDemo />} code={`<Radar playState={running ? "running" : "paused"} />
// or simply
<Radar paused />`}>
        Pause with <code>playState</code> or <code>paused</code> when a human is the bottleneck.
      </Demo>

      <Demo
        id="sound"
        title="A little click"
        preview={<SoundDemo />}
        code={`import { playLoadingSound } from "spinkit-react/sound";

async function onExport() {
  playLoadingSound("start");
  try {
    await exportReport();
    playLoadingSound("done");
  } catch {
    playLoadingSound("error");
  }
}`}
      >
        Optional beeps from <code>spinkit-react/sound</code> — start, done, error. No audio files.
        Quiet on touch; <code>setLoadingSounds(false)</code> mutes the lot.
      </Demo>

      <Demo
        id="styling"
        title="Your CSS"
        preview={
          <div className="row">
            <Spin size={32} className="hover-brand" />
            <span className="muted">Hover me</span>
          </div>
        }
        code={`<Spin className="hover-brand" />

/* CSS */
.hover-brand { --sk-color: #94a3b8; transition: color .2s; }
.hover-brand:hover { --sk-color: #4f46e5; --sk-duration: .4s; }`}
      >
        <code>className</code>, <code>style</code>, or <code>--sk-*</code> tokens. Paint it like
        the rest of the sheet.
      </Demo>

      <Demo
        id="suspense"
        title="Suspense"
        preview={
          <div className="row muted">
            <Spin size={20} /> Fetching the board…
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
        No hooks. Fine in Suspense fallbacks and Server Components — no <code>"use client"</code>
        required.
      </Demo>
    </div>
  );
}
