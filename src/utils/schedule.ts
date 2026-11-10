import type { GameEvent } from '../data/content';

/** Next UTC date this weekly event happens, strictly in the future. */
export function nextOccurrence(e: GameEvent, now: Date): Date {
  const [h, m] = e.time.split(':').map(Number);
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), h, m));
  d.setUTCDate(d.getUTCDate() + ((e.day - now.getUTCDay() + 7) % 7));
  if (d.getTime() <= now.getTime()) d.setUTCDate(d.getUTCDate() + 7);
  return d;
}

export function splitDuration(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}
