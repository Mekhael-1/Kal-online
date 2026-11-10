import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './Embers.module.css';

interface Ember { x: number; y: number; r: number; vx: number; vy: number; a: number; phase: number; speed: number }

/** Canvas layer of rising embers. Skipped entirely when the visitor prefers reduced motion. */
export default function Embers({ count = 70 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    let embers: Ember[] = [];

    const spawn = (initial: boolean): Ember => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 10,
      r: Math.random() * 1.8 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: Math.random() * 0.55 + 0.2,
      a: Math.random() * 0.6 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.03 + 0.01,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 640 ? Math.round(count / 2) : count;
      embers = Array.from({ length: n }, () => spawn(true));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.phase += e.speed;
        e.x += e.vx + Math.sin(e.phase) * 0.35;
        e.y -= e.vy;
        const flicker = 0.6 + Math.sin(e.phase * 3) * 0.4;
        const alpha = e.a * flicker * Math.min(1, e.y / (h * 0.35));

        ctx.beginPath();
        ctx.fillStyle = `rgba(224, 112, 42, ${alpha * 0.18})`;
        ctx.arc(e.x, e.y, e.r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(240, 196, 106, ${alpha})`;
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();

        if (e.y < -10) embers[i] = spawn(false);
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [count, reduce]);

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
}
