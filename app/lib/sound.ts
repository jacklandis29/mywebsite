"use client";

// Audio synthesis adapted from Cuelume 0.1.0. See THIRD_PARTY_NOTICES.md.

type ToneLayer = {
  kind: "tone";
  waveform: OscillatorType;
  frequency: number;
  attack: number;
  decay: number;
  peak: number;
  offset?: number;
  detune?: number;
  glideTo?: number;
  glideTime?: number;
};

type NoiseLayer = {
  kind: "noise";
  filterType: BiquadFilterType;
  filterFrequency: number;
  filterQ?: number;
  attack: number;
  decay: number;
  peak: number;
  offset?: number;
};

type SoundLayer = ToneLayer | NoiseLayer;

type SoundRecipe = {
  masterGain: number;
  layers: SoundLayer[];
  shimmer?: {
    delay: number;
    feedback: number;
    wet: number;
    lowpass: number;
  };
};

const RECIPES = {
  bloom: {
    masterGain: 0.5,
    layers: [
      { kind: "tone", waveform: "sine", frequency: 528, attack: 0.06, decay: 0.32, peak: 0.06 },
      { kind: "tone", waveform: "sine", frequency: 528, detune: 12, attack: 0.06, decay: 0.34, peak: 0.05 },
    ],
    shimmer: { delay: 0.15, feedback: 0.2, wet: 0.12, lowpass: 2500 },
  },
  droplet: {
    masterGain: 0.55,
    layers: [
      {
        kind: "tone",
        waveform: "sine",
        frequency: 1200,
        glideTo: 550,
        glideTime: 0.14,
        attack: 0.004,
        decay: 0.2,
        peak: 0.075,
      },
    ],
    shimmer: { delay: 0.09, feedback: 0.2, wet: 0.15, lowpass: 3000 },
  },
  press: {
    masterGain: 0.4,
    layers: [
      {
        kind: "noise",
        filterType: "bandpass",
        filterFrequency: 1700,
        filterQ: 1.4,
        attack: 0.001,
        decay: 0.02,
        peak: 0.13,
      },
    ],
  },
  shelfTick: {
    masterGain: 0.2,
    layers: [
      {
        kind: "noise",
        filterType: "bandpass",
        filterFrequency: 4400,
        filterQ: 2.4,
        attack: 0.001,
        decay: 0.014,
        peak: 0.09,
      },
    ],
  },
  tick: {
    masterGain: 0.4,
    layers: [
      {
        kind: "noise",
        filterType: "bandpass",
        filterFrequency: 5400,
        filterQ: 1.8,
        attack: 0.001,
        decay: 0.018,
        peak: 0.14,
      },
      { kind: "tone", waveform: "sine", frequency: 2600, attack: 0.001, decay: 0.012, peak: 0.018 },
    ],
  },
} as const satisfies Record<string, SoundRecipe>;

export type SoundName = keyof typeof RECIPES;

type AudioContextConstructor = new (options?: AudioContextOptions) => AudioContext;

const SOURCE_STOP_PADDING = 0.05;
const CLEANUP_MARGIN = 0.05;
const INAUDIBLE_GAIN = 0.001;

let sharedContext: AudioContext | null = null;
let unlockPromise: Promise<boolean> | null = null;

function createContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  const audioWindow = window as typeof window & {
    webkitAudioContext?: AudioContextConstructor;
  };
  const AudioContextClass = audioWindow.AudioContext ?? audioWindow.webkitAudioContext;
  if (!AudioContextClass) return null;

  try {
    return new AudioContextClass();
  } catch {
    return null;
  }
}

function getContext(): AudioContext | null {
  if (sharedContext?.state === "closed") sharedContext = null;
  sharedContext ??= createContext();
  return sharedContext;
}

function renderTone(
  context: AudioContext,
  destination: AudioNode,
  layer: ToneLayer,
  startTime: number,
) {
  const oscillator = context.createOscillator();
  oscillator.type = layer.waveform;
  oscillator.frequency.setValueAtTime(layer.frequency, startTime);
  if (layer.detune) oscillator.detune.value = layer.detune;
  if (layer.glideTo !== undefined) {
    const glideTime = layer.glideTime ?? layer.attack + layer.decay;
    oscillator.frequency.exponentialRampToValueAtTime(layer.glideTo, startTime + glideTime);
  }

  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(layer.peak, startTime + layer.attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + layer.attack + layer.decay);

  oscillator.connect(gain).connect(destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + layer.attack + layer.decay + SOURCE_STOP_PADDING);
}

function renderNoise(
  context: AudioContext,
  destination: AudioNode,
  layer: NoiseLayer,
  startTime: number,
) {
  const duration = layer.attack + layer.decay + SOURCE_STOP_PADDING;
  const buffer = context.createBuffer(1, Math.max(1, Math.floor(duration * context.sampleRate)), context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) data[index] = 2 * Math.random() - 1;

  const source = context.createBufferSource();
  source.buffer = buffer;

  const filter = context.createBiquadFilter();
  filter.type = layer.filterType;
  filter.frequency.value = layer.filterFrequency;
  if (layer.filterQ !== undefined) filter.Q.value = layer.filterQ;

  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(layer.peak, startTime + layer.attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + layer.attack + layer.decay);

  source.connect(filter).connect(gain).connect(destination);
  source.start(startTime);
  source.stop(startTime + duration);
}

function renderRecipe(context: AudioContext, recipe: SoundRecipe) {
  const master = context.createGain();
  master.gain.value = recipe.masterGain;
  master.connect(context.destination);

  const shimmerNodes: AudioNode[] = [];
  if (recipe.shimmer) {
    const delay = context.createDelay(1);
    delay.delayTime.value = recipe.shimmer.delay;
    const feedbackFilter = context.createBiquadFilter();
    feedbackFilter.type = "lowpass";
    feedbackFilter.frequency.value = recipe.shimmer.lowpass;
    const feedbackGain = context.createGain();
    feedbackGain.gain.value = recipe.shimmer.feedback;
    const wetGain = context.createGain();
    wetGain.gain.value = recipe.shimmer.wet;

    master.connect(delay);
    delay.connect(feedbackFilter);
    feedbackFilter.connect(feedbackGain);
    feedbackGain.connect(delay);
    feedbackFilter.connect(wetGain);
    wetGain.connect(context.destination);
    shimmerNodes.push(delay, feedbackFilter, feedbackGain, wetGain);
  }

  const now = context.currentTime;
  for (const layer of recipe.layers) {
    const startTime = now + (layer.offset ?? 0);
    if (layer.kind === "tone") renderTone(context, master, layer, startTime);
    else renderNoise(context, master, layer, startTime);
  }

  const sourceEnd = Math.max(
    ...recipe.layers.map((layer) => (layer.offset ?? 0) + layer.attack + layer.decay + SOURCE_STOP_PADDING),
  );
  const shimmerTail = recipe.shimmer
    ? recipe.shimmer.delay *
      (1 + Math.ceil(Math.log(INAUDIBLE_GAIN) / Math.log(recipe.shimmer.feedback)))
    : 0;

  window.setTimeout(() => {
    master.disconnect();
    for (const node of shimmerNodes) node.disconnect();
  }, (sourceEnd + shimmerTail + CLEANUP_MARGIN) * 1000);
}

/** Call from a trusted input event so the browser can start Web Audio. */
export function unlockAudio(): Promise<boolean> {
  const context = getContext();
  if (!context) return Promise.resolve(false);
  if (context.state === "running") return Promise.resolve(true);
  if (unlockPromise) return unlockPromise;

  const pending = context
    .resume()
    .then(() => context.state === "running")
    .catch(() => false);
  unlockPromise = pending;
  void pending.finally(() => {
    if (unlockPromise === pending) unlockPromise = null;
  });
  return pending;
}

/** Plays now when ready, or queues once while the first unlock is resolving. */
export function playSound(sound: SoundName): boolean {
  const context = sharedContext;
  if (context?.state === "running") {
    renderRecipe(context, RECIPES[sound]);
    return true;
  }

  const pending = unlockPromise;
  if (!context || !pending) return false;

  void pending.then((ready) => {
    if (ready && context.state === "running") renderRecipe(context, RECIPES[sound]);
  });
  return true;
}
