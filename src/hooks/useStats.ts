import { useEffect, useState } from 'react';
import { mockStats, type ServerStats } from '../data/mock';

const USE_API = import.meta.env.VITE_USE_API === 'true';

/**
 * Local mode (default): mock data with a small random drift so the counter feels live.
 * API mode (VITE_USE_API=true): polls GET /api/stats and falls back to mock if it fails.
 */
export function useStats(): ServerStats {
  const [stats, setStats] = useState<ServerStats>(mockStats);

  useEffect(() => {
    let alive = true;

    const drift = () =>
      setStats((s) => ({
        ...s,
        online: Math.min(1500, Math.max(1100, s.online + Math.round((Math.random() - 0.5) * 24))),
      }));

    const load = async () => {
      if (!USE_API) return drift();
      try {
        const res = await fetch('/api/stats');
        if (!res.ok) throw new Error('stats unavailable');
        const data: ServerStats = await res.json();
        if (alive) setStats(data);
      } catch {
        if (alive) drift();
      }
    };

    const id = setInterval(load, 6000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  return stats;
}
