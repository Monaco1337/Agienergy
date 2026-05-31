// Token-Bucket pro Schlüssel, in-memory. Reicht für Single-Instance Dev/Pro.
type Bucket = { tokens: number; lastRefill: number };

const buckets = new Map<string, Bucket>();

interface Limit {
  capacity: number;
  refillPerMinute: number;
}

const LIMITS: Record<string, Limit> = {
  default: { capacity: 60, refillPerMinute: 60 },
  funnel: { capacity: 8, refillPerMinute: 4 }, // strenger
  /** Landing-Lead-Formular (Hero / Themen-Seiten) */
  lead: { capacity: 8, refillPerMinute: 4 },
  events: { capacity: 240, refillPerMinute: 240 },
  /** FAQ-Kontakt & ähnliche Formulare */
  contact: { capacity: 10, refillPerMinute: 6 },
  login: { capacity: 6, refillPerMinute: 3 },
};

export function rateLimit(key: string, kind: keyof typeof LIMITS = 'default'): { allowed: boolean; retryAfterSec: number } {
  const cfg = LIMITS[kind] ?? LIMITS.default!;
  const now = Date.now();
  const refillPerMs = cfg.refillPerMinute / 60_000;

  const k = `${kind}:${key}`;
  const b = buckets.get(k) ?? { tokens: cfg.capacity, lastRefill: now };
  const elapsed = now - b.lastRefill;
  b.tokens = Math.min(cfg.capacity, b.tokens + elapsed * refillPerMs);
  b.lastRefill = now;

  if (b.tokens >= 1) {
    b.tokens -= 1;
    buckets.set(k, b);
    return { allowed: true, retryAfterSec: 0 };
  }
  buckets.set(k, b);
  const retryAfterSec = Math.ceil((1 - b.tokens) / refillPerMs / 1000);
  return { allowed: false, retryAfterSec };
}

export function getClientKeyFromHeaders(h: Headers): string {
  // Best-effort. Wir hashen niemals die echte IP in den Speicher; für
  // den Bucket-Key reicht ein gehashter Wert.
  const fwd = h.get('x-forwarded-for') ?? '';
  const real = h.get('x-real-ip') ?? '';
  const ip = (fwd.split(',')[0] || real || 'unknown').trim();
  return ip;
}
