import { motion } from 'framer-motion';
import ui from './ui.module.css';
import styles from './PageHeader.module.css';

export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className={styles.head}>
      <div className={ui.container}>
        <h1 className={`${styles.title} ${ui.goldText}`}>{title}</h1>
        <motion.span
          className={styles.rule}
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {subtitle && <p className={styles.sub}>{subtitle}</p>}
      </div>
    </header>
  );
}
