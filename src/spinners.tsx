import { anim, clamp, phase, polar, round, Spinner, type SpinnerProps, spinCss } from "./core";

const RING_C = 2 * Math.PI * 9.5;

export interface SpinProps extends SpinnerProps {
  /** Visible portion of the ring, 0.05–0.95. Default `0.25`. */
  arc?: number;
}

/** An arc rotating around a faint track. */
export function Spin({ arc = 0.25, ...props }: SpinProps) {
  const dash = round(RING_C * Math.min(0.95, Math.max(0.05, arc)));
  return (
    <Spinner name="spin" defaultDuration={0.8} css={`.sk-spin{--sk-tw:2.5}${spinCss("spin")}`} {...props}>
      <circle className="sk-s sk-t" cx="12" cy="12" r="9.5" />
      <circle
        className="sk-a sk-s"
        cx="12"
        cy="12"
        r="9.5"
        strokeDasharray={`${dash} ${round(RING_C)}`}
      />
    </Spinner>
  );
}

export interface CountProps extends SpinnerProps {
  /** Number of elements. */
  count?: number;
}

const spread = (n: number, from: number, to: number) =>
  Array.from({ length: n }, (_, i) => round(n === 1 ? (from + to) / 2 : from + ((to - from) * i) / (n - 1)));

const stagger = (i: number, n: number, total: number) => (n > 1 ? 1 - (i * total) / (n - 1) : 0);

/** Dots hopping one after another. `count` 2–7, default 3. */
export function Dots({ count = 3, ...props }: CountProps) {
  const n = clamp(count, 2, 7);
  const xs = spread(n, 3.5, 20.5);
  const r = round(Math.min(2.5, (17 / (n - 1)) * 0.36));
  return (
    <Spinner
      name="dots"
      defaultDuration={1.2}
      css={anim("dots", "0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}", "ease-in-out")}
      {...props}
    >
      {xs.map((cx, i) => (
        <circle key={cx} className="sk-a" cx={cx} cy="14" r={r} fill="currentColor" style={phase(stagger(i, n, 0.3))} />
      ))}
    </Spinner>
  );
}

/** Dots fading in and out, like someone typing. `count` 2–7, default 3. */
export function Typing({ count = 3, ...props }: CountProps) {
  const n = clamp(count, 2, 7);
  const xs = spread(n, 3.5, 20.5);
  const r = round(Math.min(2.5, (17 / (n - 1)) * 0.36));
  return (
    <Spinner
      name="typing"
      defaultDuration={1.2}
      css={anim("typing", "0%,100%{opacity:.25;transform:scale(.8)}35%{opacity:1;transform:scale(1)}", "ease-in-out")}
      {...props}
    >
      {xs.map((cx, i) => (
        <circle key={cx} className="sk-a sk-f" cx={cx} cy="12" r={r} fill="currentColor" style={phase(stagger(i, n, 0.4))} />
      ))}
    </Spinner>
  );
}

/** Bars bouncing like an equalizer. `count` 3–7, default 4. */
export function Bars({ count = 4, ...props }: CountProps) {
  const n = clamp(count, 3, 7);
  const slot = 20 / n;
  const w = round(slot * 0.62);
  return (
    <Spinner
      name="bars"
      defaultDuration={1}
      css={anim("bars", "0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}", "ease-in-out")}
      {...props}
    >
      {Array.from({ length: n }, (_, i) => (
        <rect
          key={i}
          className="sk-a sk-f"
          x={round(2 + i * slot + (slot - w) / 2)}
          y="4"
          width={w}
          height="16"
          rx={round(w / 2)}
          fill="currentColor"
          style={phase(stagger(i, n, 0.54))}
        />
      ))}
    </Spinner>
  );
}

/** Rings radiating from a solid core. */
export function Beacon(props: SpinnerProps) {
  return (
    <Spinner
      name="beacon"
      defaultDuration={1.6}
      css={`.sk-beacon{--sk-tw:1.5}${anim("beacon", "0%{transform:scale(.3);opacity:1}100%{transform:scale(1);opacity:0}", "cubic-bezier(.2,.6,.4,1)")}`}
      {...props}
    >
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      {[0, 0.5].map((o) => (
        <circle key={o} className="sk-a sk-s" cx="12" cy="12" r="10" vectorEffect="non-scaling-stroke" style={phase(o)} />
      ))}
    </Spinner>
  );
}

/** Two moons circling a planet. */
export function Moons(props: SpinnerProps) {
  return (
    <Spinner name="moons" defaultDuration={1.4} css={`.sk-moons{--sk-tw:1.5}${spinCss("moons")}`} {...props}>
      <circle className="sk-s sk-t" cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <g className="sk-a">
        <circle cx="12" cy="4" r="2.5" fill="currentColor" />
        <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
      </g>
    </Spinner>
  );
}

const TILES = [
  [3, 3, 0],
  [13, 3, 0.75],
  [13, 13, 0.5],
  [3, 13, 0.25],
] as const;

/** Four tiles lighting up clockwise. */
export function Grid(props: SpinnerProps) {
  return (
    <Spinner
      name="grid"
      defaultDuration={1.2}
      css={anim("grid", "0%{opacity:1;transform:scale(1)}60%,100%{opacity:.2;transform:scale(.8)}", "ease-out")}
      {...props}
    >
      {TILES.map(([x, y, o]) => (
        <rect key={`${x}-${y}`} className="sk-a sk-f" x={x} y={y} width="8" height="8" rx="2" fill="currentColor" style={phase(o)} />
      ))}
    </Spinner>
  );
}

export interface RadialProps extends SpinnerProps {
  /** Number of spokes, 6–16. Default `8`. */
  spokes?: number;
}

/** Spokes with a highlight sweeping around. */
export function Radial({ spokes = 8, ...props }: RadialProps) {
  const n = clamp(spokes, 6, 16);
  return (
    <Spinner
      name="radial"
      defaultDuration={1}
      css={`.sk-radial{--sk-tw:2.25}${anim("radial", "0%{opacity:1}100%{opacity:.15}", "linear")}`}
      {...props}
    >
      {Array.from({ length: n }, (_, i) => {
        const [x1, y1] = polar(5, (i * 360) / n);
        const [x2, y2] = polar(9.5, (i * 360) / n);
        return <line key={i} className="sk-a sk-s" x1={x1} y1={y1} x2={x2} y2={y2} style={phase(((n - i) % n) / n)} />;
      })}
    </Spinner>
  );
}

const LOOP_PATH =
  "M12 12c-2-2.7-3.6-4-5.5-4a4 4 0 0 0 0 8c1.9 0 3.5-1.3 5.5-4s3.6-4 5.5-4a4 4 0 0 1 0 8c-1.9 0-3.5-1.3-5.5-4z";

/** A dash travelling along a figure eight. */
export function Loop(props: SpinnerProps) {
  return (
    <Spinner
      name="loop"
      defaultDuration={1.6}
      css={anim("loop", "from{stroke-dashoffset:0}to{stroke-dashoffset:-100}", "linear")}
      {...props}
    >
      <path className="sk-s sk-t" d={LOOP_PATH} />
      <path className="sk-a sk-s" d={LOOP_PATH} pathLength={100} strokeDasharray="22 78" />
    </Spinner>
  );
}

const HEARTBEAT_POINTS = "2 12 7 12 9 7 12 17 15 9 17 12 22 12";

/** A pulse travelling across a heart-rate line. */
export function Heartbeat(props: SpinnerProps) {
  return (
    <Spinner
      name="heartbeat"
      defaultDuration={1.4}
      css={anim("heartbeat", "from{stroke-dashoffset:35}to{stroke-dashoffset:-100}", "ease-in-out")}
      {...props}
    >
      <polyline className="sk-s sk-t" points={HEARTBEAT_POINTS} />
      <polyline className="sk-a sk-s" points={HEARTBEAT_POINTS} pathLength={100} strokeDasharray="35 100" />
    </Spinner>
  );
}

/** A weight swinging from a pivot. */
export function Pendulum(props: SpinnerProps) {
  return (
    <Spinner
      name="pendulum"
      defaultDuration={1.4}
      css={`.sk-pendulum{--sk-tw:1.5}.sk-pendulum .sk-a{transform-origin:12px 3px}${anim("pendulum", "0%,100%{transform:rotate(-35deg)}50%{transform:rotate(35deg)}", "ease-in-out")}`}
      {...props}
    >
      <g className="sk-a">
        <line className="sk-s" x1="12" y1="3" x2="12" y2="15" />
        <circle cx="12" cy="18" r="3.5" fill="currentColor" />
      </g>
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
    </Spinner>
  );
}

export interface BloomProps extends SpinnerProps {
  /** Number of petals, 4–10. Default `6`. */
  petals?: number;
}

/** Petals swelling and shrinking in turn. */
export function Bloom({ petals = 6, ...props }: BloomProps) {
  const n = clamp(petals, 4, 10);
  const r = round(Math.min(2.5, 7.5 * Math.sin(Math.PI / n) * 0.8));
  return (
    <Spinner
      name="bloom"
      defaultDuration={1.2}
      css={anim("bloom", "0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.45)}", "ease-in-out")}
      {...props}
    >
      {Array.from({ length: n }, (_, i) => {
        const [cx, cy] = polar(7.5, (i * 360) / n);
        return <circle key={i} className="sk-a sk-f" cx={cx} cy={cy} r={r} fill="currentColor" style={phase(((n - i) % n) / n)} />;
      })}
    </Spinner>
  );
}

/** An hourglass draining and flipping over. */
export function Hourglass(props: SpinnerProps) {
  return (
    <Spinner
      name="hourglass"
      defaultDuration={2.4}
      css={
        ".sk-hourglass{--sk-tw:1.75}.sk-hourglass .sk-f{transform-origin:50% 100%}" +
        anim("hourglass", "0%,35%{transform:rotate(0)}50%,85%{transform:rotate(180deg)}100%{transform:rotate(360deg)}", "cubic-bezier(.6,0,.3,1)", "r") +
        anim("hourglass", "0%{transform:scale(1)}35%,50%{transform:scale(0)}85%,100%{transform:scale(1)}", "linear", "t") +
        anim("hourglass", "0%{transform:scale(0)}35%,50%{transform:scale(1)}85%,100%{transform:scale(0)}", "linear", "b")
      }
      {...props}
    >
      <g className="sk-a sk-hourglass-r">
        <path className="sk-s" d="M6 3h12M6 21h12M7.5 3c0 5 4.5 6 4.5 9s-4.5 4-4.5 9M16.5 3c0 5-4.5 6-4.5 9s4.5 4 4.5 9" />
        <path className="sk-a sk-f sk-hourglass-t" d="M9 6.5h6L12 11z" fill="currentColor" />
        <path className="sk-a sk-f sk-hourglass-b" d="M12 15.5l3.5 3.5h-7z" fill="currentColor" />
      </g>
    </Spinner>
  );
}

const hexagon = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, j) => polar(r, j * 60, cx, cy).join(",")).join(" ");

const HONEYCOMB = Array.from({ length: 6 }, (_, i) => {
  const [cx, cy] = polar(6.2, 30 + i * 60);
  return { points: hexagon(cx, cy, 3), o: ((6 - i) % 6) / 6 };
});

/** A ring of hexagons lighting up around a centre cell. */
export function Honeycomb(props: SpinnerProps) {
  return (
    <Spinner
      name="honeycomb"
      defaultDuration={1.2}
      css={anim("honeycomb", "0%{opacity:1;transform:scale(1)}100%{opacity:.2;transform:scale(.85)}", "linear")}
      {...props}
    >
      <polygon points={hexagon(12, 12, 3)} fill="currentColor" />
      {HONEYCOMB.map(({ points, o }) => (
        <polygon key={o} className="sk-a sk-f" points={points} fill="currentColor" style={phase(o)} />
      ))}
    </Spinner>
  );
}

const signalArc = (r: number) => {
  const [x1, y1] = polar(r, -45, 12, 19);
  const [x2, y2] = polar(r, 45, 12, 19);
  return `M${x1} ${y1}A${r} ${r} 0 0 1 ${x2} ${y2}`;
};

/** Signal waves lighting up from the source outward. */
export function Signal(props: SpinnerProps) {
  return (
    <Spinner
      name="signal"
      defaultDuration={1.4}
      css={`.sk-signal{--sk-tw:2.25}${anim("signal", "0%{opacity:.2}20%{opacity:1}60%,100%{opacity:.2}", "ease-out")}`}
      {...props}
    >
      <circle className="sk-a" cx="12" cy="19" r="1.75" fill="currentColor" style={phase(0)} />
      {[4.5, 9, 13.5].map((r, i) => (
        <path key={r} className="sk-a sk-s" d={signalArc(r)} style={phase(1 - (i + 1) * 0.15)} />
      ))}
    </Spinner>
  );
}

const CELLS = [4.25, 8, 11.75, 15.5];

/** A battery charging cell by cell. */
export function Battery(props: SpinnerProps) {
  const css =
    ".sk-battery{--sk-tw:1.5}" +
    CELLS.map((_, i) => {
      const on = (i + 1) * 18;
      return anim("battery", `0%,${on - 0.1}%{opacity:0}${on}%,90%{opacity:1}100%{opacity:0}`, "linear", String(i));
    }).join("");
  return (
    <Spinner name="battery" defaultDuration={2} css={css} {...props}>
      <rect className="sk-s" x="2.5" y="7" width="17" height="10" rx="2.5" />
      <rect x="20.5" y="10" width="1.75" height="4" rx="0.875" fill="currentColor" />
      {CELLS.map((x, i) => (
        <rect key={x} className={`sk-a sk-battery-${i}`} x={x} y="9" width="2.75" height="6" rx="0.75" fill="currentColor" />
      ))}
    </Spinner>
  );
}

/** An indeterminate progress bar. */
export function Track(props: SpinnerProps) {
  return (
    <Spinner
      name="track"
      defaultDuration={1.5}
      css={
        ".sk-track .sk-a{transform-origin:2px 12px}" +
        anim("track", "0%{transform:translateX(0) scaleX(0)}55%{transform:translateX(5px) scaleX(.6)}100%{transform:translateX(20px) scaleX(0)}", "ease-in-out")
      }
      {...props}
    >
      <rect className="sk-t" x="2" y="10.5" width="20" height="3" rx="1.5" fill="currentColor" />
      <rect className="sk-a" x="2" y="10.5" width="20" height="3" rx="1.5" fill="currentColor" />
    </Spinner>
  );
}

const GEAR = (() => {
  const pts: string[] = [];
  for (let k = 0; k < 8; k++) {
    const t = k * 45;
    for (const [d, r] of [
      [-15, 7.5],
      [-8, 10],
      [8, 10],
      [15, 7.5],
    ] as const) {
      pts.push(polar(r, t + d).join(","));
    }
  }
  return pts.join(" ");
})();

/** A turning gear. */
export function Gear(props: SpinnerProps) {
  return (
    <Spinner name="gear" defaultDuration={2} css={`.sk-gear{--sk-tw:1.75}${spinCss("gear")}`} {...props}>
      <g className="sk-a">
        <polygon className="sk-s" points={GEAR} />
        <circle className="sk-s" cx="12" cy="12" r="3" />
      </g>
    </Spinner>
  );
}

const RAYS = Array.from({ length: 8 }, (_, i) => {
  const [x1, y1] = polar(7, i * 45);
  const [x2, y2] = polar(10, i * 45);
  return { x1, y1, x2, y2 };
});

/** A sun with rays turning and a glowing core. */
export function Sun(props: SpinnerProps) {
  return (
    <Spinner
      name="sun"
      defaultDuration={1.2}
      css={
        anim("sun", "to{transform:rotate(45deg)}", "ease-in-out", "r") +
        anim("sun", "0%,100%{transform:scale(1)}50%{transform:scale(.75)}", "ease-in-out", "c")
      }
      {...props}
    >
      <g className="sk-a sk-sun-r">
        {RAYS.map((ray) => (
          <line key={`${ray.x1}-${ray.y1}`} className="sk-s" {...ray} />
        ))}
      </g>
      <circle className="sk-a sk-sun-c" cx="12" cy="12" r="4" fill="currentColor" />
    </Spinner>
  );
}

/** A radar sweep that lights up a blip as it passes. */
export function Radar(props: SpinnerProps) {
  const [ex, ey] = polar(9.5, -40);
  const [bx, by] = polar(6, 45);
  return (
    <Spinner
      name="radar"
      defaultDuration={2}
      css={
        ".sk-radar{--sk-tw:1.5}" +
        spinCss("radar").replace(".sk-a", ".sk-radar-s") +
        ".sk-radar .sk-radar-b{animation-name:sk-radar-b;animation-timing-function:linear}" +
        "@keyframes sk-radar-b{0%,10%{opacity:.15}12.5%{opacity:1}60%,100%{opacity:.15}}"
      }
      {...props}
    >
      <circle className="sk-s sk-t" cx="12" cy="12" r="9.5" />
      <g className="sk-a sk-radar-s">
        <path d={`M12 12L${ex} ${ey}A9.5 9.5 0 0 1 12 2.5z`} fill="currentColor" opacity="0.25" />
        <line className="sk-s" x1="12" y1="12" x2="12" y2="2.5" />
      </g>
      <circle className="sk-a sk-radar-b" cx={bx} cy={by} r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </Spinner>
  );
}

/** A ball bouncing and squashing against the floor. */
export function Ball(props: SpinnerProps) {
  return (
    <Spinner
      name="ball"
      defaultDuration={0.9}
      css={
        ".sk-ball{--sk-tw:1.5}.sk-ball .sk-ball-b{transform-origin:50% 100%}" +
        anim(
          "ball",
          "0%,100%{transform:translateY(-11px) scale(1,1);animation-timing-function:cubic-bezier(.5,0,1,.6)}" +
            "45%{transform:translateY(0) scale(1,1)}50%{transform:translateY(0) scale(1.3,.75)}" +
            "55%{transform:translateY(0) scale(1,1);animation-timing-function:cubic-bezier(0,.4,.5,1)}",
          "linear",
          "b",
        ) +
        anim("ball", "0%,100%{transform:scaleX(.4);opacity:.15}50%{transform:scaleX(1);opacity:.35}", "ease-in-out", "s")
      }
      {...props}
    >
      <ellipse className="sk-a sk-f sk-ball-s" cx="12" cy="21" rx="5" ry="1" fill="currentColor" />
      <circle className="sk-a sk-f sk-ball-b" cx="12" cy="17" r="3.5" fill="currentColor" />
    </Spinner>
  );
}

/** Lines of placeholder text filling in, like a skeleton. */
export function Lines(props: SpinnerProps) {
  return (
    <Spinner
      name="lines"
      defaultDuration={1.4}
      css={
        ".sk-lines{--sk-tw:3}.sk-lines .sk-f{transform-origin:0 50%}" +
        anim("lines", "0%,100%{transform:scaleX(.3);opacity:.35}50%{transform:scaleX(1);opacity:1}", "ease-in-out")
      }
      {...props}
    >
      {[
        [6, 1],
        [12, 0.85],
        [18, 0.7],
      ].map(([y, o]) => (
        <line key={y} className="sk-a sk-f sk-s" x1="4" y1={y} x2="20" y2={y} style={phase(o as number)} />
      ))}
    </Spinner>
  );
}

/** Two dots chasing each other around a square. */
export function Chase(props: SpinnerProps) {
  return (
    <Spinner
      name="chase"
      defaultDuration={2}
      css={
        ".sk-chase{--sk-tw:1.5}" +
        anim(
          "chase",
          "0%,100%{transform:translate(0,0)}25%{transform:translate(12px,0)}50%{transform:translate(12px,12px)}75%{transform:translate(0,12px)}",
          "cubic-bezier(.7,0,.3,1)",
        )
      }
      {...props}
    >
      <rect className="sk-s sk-t" x="6" y="6" width="12" height="12" rx="1" />
      <circle className="sk-a" cx="6" cy="6" r="1.75" fill="currentColor" opacity="0.5" style={phase(0.94)} />
      <circle className="sk-a" cx="6" cy="6" r="2.75" fill="currentColor" style={phase(0)} />
    </Spinner>
  );
}
