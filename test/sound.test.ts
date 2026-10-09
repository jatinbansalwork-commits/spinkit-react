import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const param = () => ({
  setValueAtTime: vi.fn(),
  linearRampToValueAtTime: vi.fn(),
  exponentialRampToValueAtTime: vi.fn(),
  setTargetAtTime: vi.fn(),
  value: 0,
});

const node = () => {
  const n = { connect: vi.fn(() => n), start: vi.fn(), stop: vi.fn() };
  return n;
};

let oscillators = 0;

class FakeAudioContext {
  state = "running";
  currentTime = 0;
  sampleRate = 48000;
  destination = {};
  resume = vi.fn();
  createBuffer = () => ({ getChannelData: () => new Float32Array(10) });
  createOscillator = () => {
    oscillators += 1;
    return { ...node(), type: "", frequency: param() };
  };
  createGain = () => ({ ...node(), gain: param() });
  createBufferSource = () => ({ ...node(), buffer: null });
  createBiquadFilter = () => ({ ...node(), type: "", frequency: param(), Q: param() });
}

const matchMedia = (coarse: boolean) =>
  vi.fn(() => ({ matches: coarse }) as unknown as MediaQueryList);

async function load() {
  vi.resetModules();
  return import("../src/sound");
}

beforeEach(() => {
  oscillators = 0;
  vi.stubGlobal("AudioContext", FakeAudioContext);
  window.matchMedia = matchMedia(false);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("playLoadingSound", () => {
  it.each([
    ["start", 1],
    ["done", 2],
    ["error", 2],
  ] as const)("plays %s as %i click(s)", async (kind, clicks) => {
    const { playLoadingSound } = await load();
    playLoadingSound(kind);
    expect(oscillators).toBe(clicks);
  });

  it("stays silent when disabled", async () => {
    const { playLoadingSound, setLoadingSounds, loadingSoundsEnabled } = await load();
    setLoadingSounds(false);
    expect(loadingSoundsEnabled()).toBe(false);
    playLoadingSound("done");
    expect(oscillators).toBe(0);
  });

  it("stays silent on touch devices", async () => {
    window.matchMedia = matchMedia(true);
    const { playLoadingSound, canPlayLoadingSounds } = await load();
    expect(canPlayLoadingSounds()).toBe(false);
    playLoadingSound("start");
    expect(oscillators).toBe(0);
  });

  it("stays silent at zero volume", async () => {
    const { playLoadingSound } = await load();
    playLoadingSound("done", { volume: 0 });
    expect(oscillators).toBe(0);
  });

  it("is a no-op without Web Audio", async () => {
    vi.stubGlobal("AudioContext", undefined);
    const { playLoadingSound, primeLoadingSounds } = await load();
    expect(() => {
      primeLoadingSounds();
      playLoadingSound("error");
    }).not.toThrow();
  });
});
