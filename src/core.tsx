import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color" | "children"> {
  /** Width and height. Numbers are pixels. Default `24`. */
  size?: number | string;
  /** Any CSS color. Defaults to `currentColor`. */
  color?: string;
  /** Length of one animation cycle, in seconds. */
  duration?: number;
  /** Freeze the animation in place. */
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
  paused = false,
  label = "Loading",
  motion = "reduce",
  className,
  style,
  ...rest
}: SpinnerBaseProps) {
  const dimension = typeof size === "number" ? `${size}px` : size;
  const vars = {
    width: dimension,
    height: dimension,
    "--sk-duration": `${duration ?? defaultDuration}s`,
    "--sk-state": paused ? "paused" : "running",
    ...(color ? { "--sk-color": color } : null),
    ...style,
  } as CSSProperties;

  return (
    <span
      role="status"
      aria-label={label}
      data-motion={motion}
      {...rest}
      className={className ? `sk sk-${name} ${className}` : `sk sk-${name}`}
      style={vars}
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

/** Sets the phase offset (0–1) of an animated element within the cycle. */
export const phase = (o: number) => ({ "--o": o }) as CSSProperties;

export const round = (n: number) => Math.round(n * 100) / 100;
