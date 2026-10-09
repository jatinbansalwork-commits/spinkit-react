import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type PlayState = "running" | "paused";
export type StrokeCap = "round" | "butt" | "square";

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color" | "children"> {
  /** Width and height. Numbers are pixels. Default `24`. */
  size?: number | string;
  /** Any CSS color. Defaults to `currentColor`. */
  color?: string;
  /** Length of one animation cycle, in seconds. */
  duration?: number;
  /** Any CSS timing function, e.g. `"linear"` or `"cubic-bezier(.6,0,.4,1)"`. */
  easing?: string;
  /** Stroke width in units of the 24×24 grid. Only affects stroked spinners. */
  thickness?: number;
  /** Stroke line cap. Only affects stroked spinners. Default `"round"`. */
  cap?: StrokeCap;
  /** Animation play state. Default `"running"`. */
  playState?: PlayState;
  /** Shorthand for `playState="paused"`. */
  paused?: boolean;
  /** Accessible label announced by screen readers. Default `"Loading"`. */
  label?: string;
  /**
   * `"reduce"` (default) slows the animation down for users who prefer reduced motion.
   * `"always"` ignores that preference.
   */
  motion?: "reduce" | "always";
}

interface SpinnerBaseProps extends SpinnerProps {
  name: string;
  css: string;
  defaultDuration: number;
  children: ReactNode;
}

const BASE_CSS =
  ".sk{display:inline-flex;flex:none;line-height:0;vertical-align:middle;color:var(--sk-color,currentColor);--sk-speed:1}" +
  ".sk>svg{display:block;width:100%;height:100%;overflow:visible}" +
  ".sk .sk-a{animation-duration:calc(var(--sk-duration) * var(--sk-speed));" +
  "animation-delay:calc(var(--sk-duration) * var(--sk-speed) * var(--o,0) * -1);" +
  "animation-iteration-count:infinite;animation-play-state:var(--sk-state,running);" +
  "transform-box:view-box;transform-origin:50% 50%}" +
  ".sk .sk-f{transform-box:fill-box;transform-origin:center}" +
  ".sk .sk-s{stroke:currentColor;stroke-linecap:var(--sk-cap,round);stroke-linejoin:round;stroke-width:var(--sk-thickness,var(--sk-tw,2))}" +
  ".sk .sk-t{opacity:.2}" +
  "@keyframes sk-rotate{to{transform:rotate(360deg)}}" +
  "@media (prefers-reduced-motion:reduce){.sk:not([data-motion=always]){--sk-speed:3}}";

export function Spinner({
  name,
  css,
  defaultDuration,
  children,
  size = 24,
  color,
  duration,
  easing,
  thickness,
  cap,
  playState = "running",
  paused = false,
  label = "Loading",
  motion = "reduce",
  className,
  style,
  ...rest
}: SpinnerBaseProps) {
  const dimension = typeof size === "number" ? `${size}px` : size;
  const vars: Record<string, string | number> = {
    width: dimension,
    height: dimension,
    "--sk-duration": `${duration ?? defaultDuration}s`,
    "--sk-state": paused ? "paused" : playState,
  };
  if (color) vars["--sk-color"] = color;
  if (easing) vars["--sk-ease"] = easing;
  if (thickness != null) vars["--sk-thickness"] = thickness;
  if (cap) vars["--sk-cap"] = cap;

  return (
    <span
      role="status"
      aria-label={label}
      data-motion={motion}
      {...rest}
      className={className ? `sk sk-${name} ${className}` : `sk sk-${name}`}
      style={{ ...(vars as CSSProperties), ...style }}
    >
      <style href="sk-base" precedence="sk">
        {BASE_CSS}
      </style>
      <style href={`sk-${name}`} precedence="sk">
        {css}
      </style>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        {children}
      </svg>
    </span>
  );
}

/** Sets how far ahead (0–1 of a cycle) an animated element starts. */
export const phase = (o: number) => ({ "--o": o }) as CSSProperties;

export const round = (n: number) => Math.round(n * 100) / 100;

export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Math.round(n)));

/** Point on a circle centred in the grid; angle in degrees, 0 = top, clockwise. */
export const polar = (r: number, deg: number, cx = 12, cy = 12) => {
  const a = (deg * Math.PI) / 180;
  return [round(cx + r * Math.sin(a)), round(cy - r * Math.cos(a))] as const;
};

/**
 * Animation rule for a spinner, with `easing` able to override the default timing.
 * Without `part` it targets every `.sk-a`; with it, elements classed `sk-{name}-{part}`.
 */
export const anim = (name: string, keyframes: string, ease: string, part?: string) => {
  const id = part ? `sk-${name}-${part}` : `sk-${name}`;
  const selector = part ? `.${id}` : ".sk-a";
  return `.sk-${name} ${selector}{animation-name:${id};animation-timing-function:var(--sk-ease,${ease})}@keyframes ${id}{${keyframes}}`;
};

export const spinCss = (name: string, ease = "linear") =>
  `.sk-${name} .sk-a{animation-name:sk-rotate;animation-timing-function:var(--sk-ease,${ease})}`;
