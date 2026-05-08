export function trackEvent(name: string, payload: Record<string, any> = {}) {
  try {
    // Emit to window.dataLayer if present for analytics integrations
    // and always console.log for dev / instrumentation.
    if (typeof window !== "undefined") {
      // push to datalayer
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.dataLayer.push({ event: name, ...payload });
    }
  } catch (e) {
    // ignore
  }

  // Always log to console for visibility in this frontend-only app
  // Keep logs concise.
  // eslint-disable-next-line no-console
  console.log("analytics:event", name, payload);
}

export function selectABVariant(variants: string[], weights: number[]): string {
  // Deterministic variant selection based on session/page or random.
  // For this frontend-only app, use sessionStorage for consistency within a session.
  const key = "__ab_variant_hsr";
  let stored = sessionStorage?.getItem?.(key);
  if (!stored) {
    // Weighted random selection
    const rand = Math.random();
    let cumulative = 0;
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (rand <= cumulative) {
        stored = variants[i];
        break;
      }
    }
    stored = stored || variants[0];
    sessionStorage?.setItem?.(key, stored);
  }
  return stored;
}
