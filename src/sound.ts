export type LoadingSound = "start" | "done" | "error";

export interface PlayOptions {
  /** Multiplier on the built-in loudness, 0–1. Default `1`. */
  volume?: number;
}

interface Click {
  /** Body pitch in Hz. */
  pitch: number;
  /** Time for the click to fall to roughly a third of its peak, in seconds. */
  decay: number;
  /** Length until it's inaudible, in seconds. */
  length: number;
  gain: number;
  /** Delay before the transient, in seconds. */
  delay?: number;
}

export const LOADING_SOUNDS: Record<LoadingSound, Click[]> = {
  start: [{ pitch: 880, decay: 0.006, length: 0.04, gain: 0.35 }],
  done: [
    { pitch: 660, decay: 0.01, length: 0.08, gain: 0.4 },
    { pitch: 990, decay: 0.012, length: 0.1, gain: 0.45, delay: 0.075 },
  ],
  error: [
    { pitch: 320, decay: 0.012, length: 0.09, gain: 0.45 },
    { pitch: 250, decay: 0.014, length: 0.1, gain: 0.45, delay: 0.09 },
  ],
};

let enabled = true;
let context: AudioContext | null = null;
let noise: AudioBuffer | null = null;

/** Turn every loading sound on or off, e.g. from a user preference. */
export function setLoadingSounds(on: boolean) {
  enabled = on;
}

export function loadingSoundsEnabled() {
  return enabled;
}

/**
 * Whether sounds can play here. Touch devices stay silent because phones pause
 * background audio to play UI sounds.
 */
export function canPlayLoadingSounds() {
  return (
    enabled &&
    typeof window !== "undefined" &&
    typeof window.AudioContext === "function" &&
    !window.matchMedia?.("(pointer: coarse)").matches
  );
}

function audio() {
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  if (!noise) {
    noise = context.createBuffer(1, Math.round(context.sampleRate * 0.06), context.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  }
  return { ctx: context, buffer: noise };
}

/**
 * Browsers only start audio after a user gesture. Call this in a click handler
 * if the first sound you play happens later, such as a `"done"` after a request.
 */
export function primeLoadingSounds() {
  if (canPlayLoadingSounds()) audio();
}

/** A tonal body plus a bright noise transient, both with a fast exponential decay. */
function click({ pitch, decay, length, gain, delay = 0 }: Click, volume: number) {
  const { ctx, buffer } = audio();
  const at = ctx.currentTime + 0.003 + delay;
  const peak = gain * volume;

  const body = ctx.createOscillator();
  body.type = "triangle";
  body.frequency.setValueAtTime(pitch * 1.25, at);
  body.frequency.exponentialRampToValueAtTime(pitch, at + 0.008);
  const bodyGain = ctx.createGain();
  bodyGain.gain.setValueAtTime(0, at);
  bodyGain.gain.linearRampToValueAtTime(peak, at + 0.0015);
  bodyGain.gain.setTargetAtTime(0, at + 0.0015, decay);
  body.connect(bodyGain).connect(ctx.destination);
  body.start(at);
  body.stop(at + length + 0.02);

  const snap = ctx.createBufferSource();
  snap.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = pitch * 4;
  filter.Q.value = 0.8;
  const snapGain = ctx.createGain();
  snapGain.gain.setValueAtTime(peak * 0.6, at);
  snapGain.gain.setTargetAtTime(0, at, decay * 0.4);
  snap.connect(filter).connect(snapGain).connect(ctx.destination);
  snap.start(at);
  snap.stop(at + length);
}

/** Play a short synthesized cue. Does nothing on the server, on touch devices, or when disabled. */
export function playLoadingSound(kind: LoadingSound, { volume = 1 }: PlayOptions = {}) {
  if (!canPlayLoadingSounds()) return;
  const v = Math.min(1, Math.max(0, volume));
  if (v === 0) return;
  for (const c of LOADING_SOUNDS[kind]) click(c, v);
}
