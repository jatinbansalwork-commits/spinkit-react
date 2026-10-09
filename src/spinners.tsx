import { phase, round, Spinner, type SpinnerProps } from "./core";

const stroke = {
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** An arc rotating around a faint track. */
export function Spin(props: SpinnerProps) {
  return (
    <Spinner
      name="spin"
      defaultDuration={0.8}
      css=".sk-spin .sk-a{animation-name:sk-rotate;animation-timing-function:linear}"
      {...props}
    >
      <circle cx="12" cy="12" r="9.5" strokeWidth="2.5" {...stroke} opacity="0.2" />
      <circle
        className="sk-a"
        cx="12"
        cy="12"
        r="9.5"
        strokeWidth="2.5"
        strokeDasharray="15 60"
        {...stroke}
      />
    </Spinner>
  );
}

/** Three dots hopping one after another. */
export function Dots(props: SpinnerProps) {
  return (
    <Spinner
      name="dots"
      defaultDuration={1.2}
      css=".sk-dots .sk-a{animation-name:sk-dots;animation-timing-function:ease-in-out}@keyframes sk-dots{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}"
      {...props}
    >
      {[5, 12, 19].map((cx, i) => (
        <circle
          key={cx}
          className="sk-a"
          cx={cx}
          cy="14"
          r="2.5"
          fill="currentColor"
          style={phase(1 - i * 0.15)}
        />
      ))}
    </Spinner>
  );
}

/** Three dots fading in and out, like someone typing. */
export function Typing(props: SpinnerProps) {
  return (
    <Spinner
      name="typing"
      defaultDuration={1.2}
      css=".sk-typing .sk-a{animation-name:sk-typing;animation-timing-function:ease-in-out}@keyframes sk-typing{0%,100%{opacity:.25;transform:scale(.8)}35%{opacity:1;transform:scale(1)}}"
      {...props}
    >
      {[5, 12, 19].map((cx, i) => (
        <circle
          key={cx}
          className="sk-a sk-f"
          cx={cx}
          cy="12"
          r="2.5"
          fill="currentColor"
          style={phase(1 - i * 0.2)}
        />
      ))}
    </Spinner>
  );
}

/** Four bars bouncing like an equalizer. */
export function Bars(props: SpinnerProps) {
  return (
    <Spinner
      name="bars"
      defaultDuration={1}
      css=".sk-bars .sk-a{animation-name:sk-bars;animation-timing-function:ease-in-out}@keyframes sk-bars{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}"
      {...props}
    >
      {[3, 8, 13, 18].map((x, i) => (
        <rect
          key={x}
          className="sk-a sk-f"
          x={x}
          y="4"
          width="3"
          height="16"
          rx="1.5"
          fill="currentColor"
          style={phase(1 - i * 0.18)}
        />
      ))}
    </Spinner>
  );
}

/** Rings radiating from a solid core. */
export function Pulse(props: SpinnerProps) {
  return (
    <Spinner
      name="pulse"
      defaultDuration={1.6}
      css=".sk-pulse .sk-a{animation-name:sk-pulse;animation-timing-function:cubic-bezier(.2,.6,.4,1)}@keyframes sk-pulse{0%{transform:scale(.3);opacity:1}100%{transform:scale(1);opacity:0}}"
      {...props}
    >
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      {[0, 0.5].map((o) => (
        <circle
          key={o}
          className="sk-a"
          cx="12"
          cy="12"
          r="10"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          {...stroke}
          style={phase(o)}
        />
      ))}
    </Spinner>
  );
}

/** Two moons circling a planet. */
export function Orbit(props: SpinnerProps) {
  return (
    <Spinner
      name="orbit"
      defaultDuration={1.4}
      css=".sk-orbit .sk-a{animation-name:sk-rotate;animation-timing-function:linear}"
      {...props}
    >
      <circle cx="12" cy="12" r="8" strokeWidth="1.5" {...stroke} opacity="0.2" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <g className="sk-a">
        <circle cx="12" cy="4" r="2.5" fill="currentColor" />
        <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
      </g>
    </Spinner>
  );
}

/** Four tiles lighting up clockwise. */
export function Grid(props: SpinnerProps) {
  const tiles = [
    [3, 3, 0],
    [13, 3, 0.75],
    [13, 13, 0.5],
    [3, 13, 0.25],
  ] as const;
  return (
    <Spinner
      name="grid"
      defaultDuration={1.2}
      css=".sk-grid .sk-a{animation-name:sk-grid;animation-timing-function:ease-out}@keyframes sk-grid{0%{opacity:1;transform:scale(1)}60%,100%{opacity:.2;transform:scale(.8)}}"
      {...props}
    >
      {tiles.map(([x, y, o]) => (
        <rect
          key={`${x}-${y}`}
          className="sk-a sk-f"
          x={x}
          y={y}
          width="8"
          height="8"
          rx="2"
          fill="currentColor"
          style={phase(o)}
        />
      ))}
    </Spinner>
  );
}

const SPOKES = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  const sin = Math.sin(a);
  const cos = Math.cos(a);
  return {
    x1: round(12 + 5 * sin),
    y1: round(12 - 5 * cos),
    x2: round(12 + 9.5 * sin),
    y2: round(12 - 9.5 * cos),
    o: ((8 - i) % 8) / 8,
  };
});

/** Eight spokes with a highlight sweeping around. */
export function Radial(props: SpinnerProps) {
  return (
    <Spinner
      name="radial"
      defaultDuration={1}
      css=".sk-radial .sk-a{animation-name:sk-radial;animation-timing-function:linear}@keyframes sk-radial{0%{opacity:1}100%{opacity:.15}}"
      {...props}
    >
      {SPOKES.map(({ o, ...line }) => (
        <line
          key={o}
          className="sk-a"
          {...line}
          strokeWidth="2.25"
          {...stroke}
          style={phase(o)}
        />
      ))}
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
      css=".sk-loop .sk-a{animation-name:sk-loop;animation-timing-function:linear}@keyframes sk-loop{from{stroke-dashoffset:0}to{stroke-dashoffset:-100}}"
      {...props}
    >
      <path d={LOOP_PATH} strokeWidth="2" {...stroke} opacity="0.2" />
      <path
        className="sk-a"
        d={LOOP_PATH}
        pathLength={100}
        strokeWidth="2"
        strokeDasharray="22 78"
        {...stroke}
      />
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
      css=".sk-heartbeat .sk-a{animation-name:sk-heartbeat;animation-timing-function:ease-in-out}@keyframes sk-heartbeat{from{stroke-dashoffset:35}to{stroke-dashoffset:-100}}"
      {...props}
    >
      <polyline points={HEARTBEAT_POINTS} strokeWidth="2" {...stroke} opacity="0.2" />
      <polyline
        className="sk-a"
        points={HEARTBEAT_POINTS}
        pathLength={100}
        strokeWidth="2"
        strokeDasharray="35 100"
        {...stroke}
      />
    </Spinner>
  );
}

/** A weight swinging from a pivot. */
export function Pendulum(props: SpinnerProps) {
  return (
    <Spinner
      name="pendulum"
      defaultDuration={1.4}
      css=".sk-pendulum .sk-a{animation-name:sk-pendulum;animation-timing-function:ease-in-out;transform-origin:12px 3px}@keyframes sk-pendulum{0%,100%{transform:rotate(-35deg)}50%{transform:rotate(35deg)}}"
      {...props}
    >
      <g className="sk-a">
        <line x1="12" y1="3" x2="12" y2="15" strokeWidth="1.5" {...stroke} />
        <circle cx="12" cy="18" r="3.5" fill="currentColor" />
      </g>
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
    </Spinner>
  );
}

const PETALS = Array.from({ length: 6 }, (_, i) => {
  const a = (i * Math.PI) / 3;
  return {
    cx: round(12 + 7.5 * Math.sin(a)),
    cy: round(12 - 7.5 * Math.cos(a)),
    o: ((6 - i) % 6) / 6,
  };
});

/** Six petals swelling and shrinking in turn. */
export function Bloom(props: SpinnerProps) {
  return (
    <Spinner
      name="bloom"
      defaultDuration={1.2}
      css=".sk-bloom .sk-a{animation-name:sk-bloom;animation-timing-function:ease-in-out}@keyframes sk-bloom{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.45)}}"
      {...props}
    >
      {PETALS.map(({ cx, cy, o }) => (
        <circle
          key={o}
          className="sk-a sk-f"
          cx={cx}
          cy={cy}
          r="2.5"
          fill="currentColor"
          style={phase(o)}
        />
      ))}
    </Spinner>
  );
}
