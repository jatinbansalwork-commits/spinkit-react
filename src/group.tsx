import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

const GROUP_CSS =
  ".sk-group{display:inline-flex;align-items:center;gap:var(--sk-gap,.5em);line-height:1.2;vertical-align:middle}" +
  ".sk-group>.sk{flex:none}";

export interface SpinnerGroupProps extends HTMLAttributes<HTMLSpanElement> {
  /** Space between spinner and label. Numbers are pixels. Default `"0.5em"`. */
  gap?: number | string;
  children: ReactNode;
}

/**
 * Layout helper for a spinner beside a label — buttons, inline status, Suspense copy.
 * Put the spinner and text as children; no extra wrapper styles required.
 */
export function SpinnerGroup({ gap = "0.5em", className, style, children, ...rest }: SpinnerGroupProps) {
  const vars = {
    "--sk-gap": typeof gap === "number" ? `${gap}px` : gap,
  } as CSSProperties;

  return (
    <span
      {...rest}
      className={className ? `sk-group ${className}` : "sk-group"}
      style={{ ...vars, ...style }}
    >
      <style href="sk-group" precedence="sk">
        {GROUP_CSS}
      </style>
      {children}
    </span>
  );
}
