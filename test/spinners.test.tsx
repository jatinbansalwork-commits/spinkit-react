import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import * as Spinners from "../src";

afterEach(cleanup);

const entries = Object.entries(Spinners) as [string, (typeof Spinners)["Spin"]][];

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
  render(<Spinners.Spin easing="ease-in" thickness={3} cap="butt" playState="paused" />);
  const el = screen.getByRole("status");
  expect(el.style.getPropertyValue("--sk-ease")).toBe("ease-in");
  expect(el.style.getPropertyValue("--sk-thickness")).toBe("3");
  expect(el.style.getPropertyValue("--sk-cap")).toBe("butt");
  expect(el.style.getPropertyValue("--sk-state")).toBe("paused");
});

it.each([
  ["Dots", <Spinners.Dots count={5} />, "circle", 5],
  ["Typing", <Spinners.Typing count={99} />, "circle", 7],
  ["Bars", <Spinners.Bars count={6} />, "rect", 6],
  ["Radial", <Spinners.Radial spokes={12} />, "line", 12],
  ["Bloom", <Spinners.Bloom petals={4} />, "circle", 4],
] as const)("%s respects its element count prop", (_, element, tag, expected) => {
  render(element);
  expect(screen.getByRole("status").querySelectorAll(tag).length).toBe(expected);
});

it("injects each stylesheet only once", () => {
  render(
    <>
      <Spinners.Spin />
      <Spinners.Spin />
      <Spinners.Dots />
    </>,
  );
  expect(document.querySelectorAll('style[data-href="sk-base"]').length).toBe(1);
  expect(document.querySelectorAll('style[data-href="sk-spin"]').length).toBe(1);
});
