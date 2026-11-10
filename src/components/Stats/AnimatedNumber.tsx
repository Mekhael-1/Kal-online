import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface Props { value: number; decimals?: number; suffix?: string }

/** Counts up when scrolled into view, and tweens smoothly whenever `value` changes. */
export default function AnimatedNumber({ value, decimals = 0, suffix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const last = useRef(0);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    const controls = animate(last.current, value, {
      duration: reduce ? 0 : last.current === 0 ? 2 : 1,
      ease: 'easeOut',
      onUpdate: (v) => {
        last.current = v;
        node.textContent = v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, suffix, reduce]);

  return <span ref={ref}>{(0).toFixed(decimals)}{suffix}</span>;
}
