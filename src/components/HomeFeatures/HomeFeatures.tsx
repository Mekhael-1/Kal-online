import { motion, type Variants } from 'framer-motion';
import { features } from '../../data/content';
import ui from '../ui/ui.module.css';
import styles from './HomeFeatures.module.css';

const featureIcons: Record<string, JSX.Element> = {
  'Guild Wars': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
      <path d="m13 19 6-6" />
      <path d="m16 16 4 4" />
      <path d="m19 21 2-2" />
      <path d="M9.5 6.5 21 18v3h-3L6.5 9.5" />
      <path d="m11 5-6 6" />
      <path d="m8 8-4-4" />
      <path d="m5 3-2 2" />
    </svg>
  ),
  'Open PvP': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Crafting: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 3.26-1.25-1.25a2.12 2.12 0 0 0-3 0l-1.25 1.25 4.24 4.24 1.26-1.24a2.12 2.12 0 0 0 0-3Z" />
      <path d="m15.5 8.5-3-3" />
    </svg>
  ),
  'Pet Companions': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 4.25-1.12 5.5.76 1.39 1.12 3.01.7 4.5-.68 2.4-2.87 4-5.5 4h-5c-2.63 0-4.82-1.6-5.5-4-.42-1.49-.06-3.11.7-4.5-.7-1.25-2.52-4.92-1.12-5.5C4.97 2.42 8.22 3.26 10 5.26c.65-.17 1.33-.26 2-.26z" />
      <path d="M9 14h.01" />
      <path d="M15 14h.01" />
      <path d="M10 18a2 2 0 0 0 4 0" />
    </svg>
  ),
  Dungeons: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6a3 3 0 0 1 6 0v6" />
      <path d="M9 9h.01" />
      <path d="M15 9h.01" />
    </svg>
  ),
  'Player Market': (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  ),
};

const featureBadges: Record<string, string> = {
  'Guild Wars': 'Massive PvP',
  'Open PvP': 'High Stakes',
  Crafting: 'Forging',
  'Pet Companions': 'Companions',
  Dungeons: 'Co-op Raids',
  'Player Market': 'Free Economy',
};

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomeFeatures() {
  return (
    <section id="features" className={`${ui.section} ${styles.section}`}>
      <div className={ui.container}>
        <div className={styles.head}>
          <motion.p
            className={styles.kicker}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            THE REALM AWAITS
          </motion.p>
          <motion.h2
            className={`${styles.title} ${ui.goldText}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Core Game Systems
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            From colossal castle sieges to deep crafting at the Ember Anvil, experience classic MMORPG depth refined for competitive gameplay.
          </motion.p>
        </div>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              variants={cardVariant}
              className={`${ui.panel} ${styles.card}`}
              whileHover={{
                y: -6,
                transition: { duration: 0.25 },
              }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap}>
                  {featureIcons[f.title] || featureIcons['Open PvP']}
                </div>
                <span className={styles.badge}>{featureBadges[f.title] || `0${i + 1}`}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardText}>{f.text}</p>
              <div className={styles.glowCorner} />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

