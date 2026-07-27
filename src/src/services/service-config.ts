/**
 * Central mock-service behavior (Step 07 prompt §5): one configurable
 * latency for loading states, plus a limited one-shot error simulation for
 * development — off by default so demonstrations are never disrupted.
 * No real network requests exist anywhere in the prototype.
 */

let latencyMs = 300

export function getServiceLatency(): number {
  return latencyMs
}

/** Adjust the simulated latency (0 disables the delay, e.g. in tests). */
export function setServiceLatency(value: number): void {
  latencyMs = Math.max(0, value)
}

let pendingErrorMessage: string | null = null

/**
 * Arms a one-shot simulated failure: the next service call rejects with
 * this Arabic message, then behavior returns to normal.
 */
export function simulateNextError(messageAr: string): void {
  pendingErrorMessage = messageAr
}

export class MockServiceError extends Error {
  constructor(messageAr: string) {
    super(messageAr)
    this.name = 'MockServiceError'
  }
}

/** Applied by every service method: waits, then throws any armed error. */
export async function serviceDelay(): Promise<void> {
  if (latencyMs > 0) {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, latencyMs)
    })
  }
  if (pendingErrorMessage !== null) {
    const message = pendingErrorMessage
    pendingErrorMessage = null
    throw new MockServiceError(message)
  }
}
