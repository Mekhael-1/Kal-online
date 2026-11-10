import { motion, type Variants } from 'framer-motion';
import { useStats } from '../../hooks/useStats';
import ui from '../ui/ui.module.css';
import AnimatedNumber from './AnimatedNumber';
import styles from './Stats.module.css';

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Stats() {
  const s = useStats();
  const boxes = [
    { label: 'Players online', node: <AnimatedNumber value={s.online} />, live: true },
    { label: 'Registered accounts', node: <AnimatedNumber value={s.accounts} /> },
    { label: 'Server uptime', node: <AnimatedNumber value={s.uptime} decimals={2} suffix="%" /> },
    { label: 'Active guilds', node: <AnimatedNumber value={s.guilds} /> },
  ];

  return (
    <section id="stats" className={styles.stats}>
      <motion.div className={`${ui.container} ${styles.grid}`} variants={list} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        {boxes.map((b) => (
          <motion.div key={b.label} variants={item} className={`${ui.panel} ${ui.panelHover} ${styles.box}`}>
            <p className={`${styles.value} ${ui.goldText}`}>{b.node}</p>
            <p className={styles.label}>
              {b.live && <span className={styles.pulse} aria-hidden="true" />}
              {b.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
