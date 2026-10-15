import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import * as Kit from "../src";

afterEach(cleanup);

const entries = Object.entries(Kit).filter(
  ([name, value]) => typeof value === "function" && name !== "SpinnerGroup",
) as [string, (typeof Kit)["Spin"]][];

describe.each(entries)("%s", (_, Component) => {
  it("renders an accessible status with a default label", () => {
    render(<Component />);
    const el = screen.getByRole("status", { name: "Loading" });
    expect(el.querySelector("svg")).not.toBeNull();
    expect(el.style.width).toBe("24px");
  });

  it("applies size, color, duration, paused and label", () => {
    render(<Component size="3rem" color="red" duration={2} paused label="Saving" />);
    const el = screen.getByRole("status", { name: "Saving" });
    expect(el.style.width).toBe("3rem");
    expect(el.style.height).toBe("3rem");
    expect(el.style.getPropertyValue("--sk-color")).toBe("red");
    expect(el.style.getPropertyValue("--sk-duration")).toBe("2s");
    expect(el.style.getPropertyValue("--sk-state")).toBe("paused");
  });

  it("merges className, style and extra attributes", () => {
    render(<Component className="extra" style={{ opacity: 0.5 }} data-testid="s" motion="always" />);
    const el = screen.getByTestId("s");
    expect(el.className).toMatch(/^sk sk-\w+ extra$/);
    expect(el.style.opacity).toBe("0.5");
    expect(el.dataset.motion).toBe("always");
  });
});

it("maps easing, thickness, cap and playState to CSS variables", () => {
  render(<Kit.Spin easing="ease-in" thickness={3} cap="butt" playState="paused" />);
  const el = screen.getByRole("status");
  expect(el.style.getPropertyValue("--sk-ease")).toBe("ease-in");
  expect(el.style.getPropertyValue("--sk-thickness")).toBe("3");
  expect(el.style.getPropertyValue("--sk-cap")).toBe("butt");
  expect(el.style.getPropertyValue("--sk-state")).toBe("paused");
});

it.each([
  ["button", "16px", "2"],
  ["inline", "1em", "2"],
  ["page", "36px", "2.25"],
] as const)("intent %s sets size and thickness presets", (intent, size, thickness) => {
  render(<Kit.Spin intent={intent} />);
  const el = screen.getByRole("status");
  expect(el.style.width).toBe(size);
  expect(el.style.getPropertyValue("--sk-thickness")).toBe(thickness);
});

it("lets explicit size win over intent", () => {
  render(<Kit.Spin intent="button" size={40} />);
  expect(screen.getByRole("status").style.width).toBe("40px");
});

it.each([
  ["Dots", <Kit.Dots count={5} />, "circle", 5],
  ["Typing", <Kit.Typing count={99} />, "circle", 7],
  ["Bars", <Kit.Bars count={6} />, "rect", 6],
  ["Radial", <Kit.Radial spokes={12} />, "line", 12],
  ["Bloom", <Kit.Bloom petals={4} />, "circle", 4],
] as const)("%s respects its element count prop", (_, element, tag, expected) => {
  render(element);
  expect(screen.getByRole("status").querySelectorAll(tag).length).toBe(expected);
});

it("Track and Progress honor determinate value", () => {
  const { rerender } = render(<Kit.Track value={0.5} />);
  expect(screen.getByRole("status").querySelector("rect:last-of-type")?.getAttribute("width")).toBe("10");
  rerender(<Kit.Progress value={0.25} />);
  expect(screen.getByRole("status").querySelector("circle.sk-s:not(.sk-t)")?.getAttribute("stroke-dashoffset")).toBe(
    "75",
  );
});

it("SpinnerGroup lays out children with a gap token", () => {
  render(
    <Kit.SpinnerGroup gap={12} data-testid="group">
      <Kit.Spin intent="button" />
      <span>Saving</span>
    </Kit.SpinnerGroup>,
  );
  const group = screen.getByTestId("group");
  expect(group.className).toContain("sk-group");
  expect(group.style.getPropertyValue("--sk-gap")).toBe("12px");
});

it("injects each stylesheet only once", () => {
  render(
    <>
      <Kit.Spin />
      <Kit.Spin />
      <Kit.Dots />
    </>,
  );
  expect(document.querySelectorAll('style[data-href="sk-base"]').length).toBe(1);
  expect(document.querySelectorAll('style[data-href="sk-spin"]').length).toBe(1);
});
