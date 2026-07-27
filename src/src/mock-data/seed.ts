/**
 * Fixed seed and deterministic PRNG (plan §11.2, PD-01). Same seed →
 * byte-identical dataset on every load and reset. `Math.random()` is never
 * used anywhere in mock-data generation.
 */
export const MOCK_DATA_SEED = 20260727

/** mulberry32 — small, fast, deterministic 32-bit PRNG. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Seeded random helper used by all volume generators. */
export class SeededRandom {
  private readonly next: () => number

  constructor(seed: number = MOCK_DATA_SEED) {
    this.next = mulberry32(seed)
  }

  /** Uniform float in [0, 1). */
  float(): number {
    return this.next()
  }

  /** Uniform integer in [min, max] inclusive. */
  int(min: number, max: number): number {
    return min + Math.floor(this.next() * (max - min + 1))
  }

  /** Deterministic pick from a non-empty array. */
  pick<T>(items: readonly T[]): T {
    const index = this.int(0, items.length - 1)
    const item = items[index]
    if (item === undefined) {
      throw new Error('SeededRandom.pick called with an empty array')
    }
    return item
  }

  /** True with the given probability. */
  chance(probability: number): boolean {
    return this.next() < probability
  }

  /** Value snapped to a step, e.g. rates in 0.05 increments. */
  step(min: number, max: number, step: number): number {
    const steps = Math.round((max - min) / step)
    return Math.round((min + this.int(0, steps) * step) * 100) / 100
  }
}
