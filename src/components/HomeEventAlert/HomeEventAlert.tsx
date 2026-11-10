import { motion } from 'framer-motion';
import { dayNames, events } from '../../data/content';
import { useNow } from '../../hooks/useNow';
import { nextOccurrence, splitDuration } from '../../utils/schedule';
import Button from '../ui/Button';
import ui from '../ui/ui.module.css';
import styles from './HomeEventAlert.module.css';

export default function HomeEventAlert() {
  const nowMs = useNow(1000);
  const now = new Date(nowMs);

  const upcoming = events
    .map((e) => ({ e, at: nextOccurrence(e, now) }))
    .sort((a, b) => a.at.getTime() - b.at.getTime());

  const next = upcoming[0];
  if (!next) return null;

  const t = splitDuration(next.at.getTime() - nowMs);
  const isImminent = t.d === 0 && t.h === 0 && t.m < 30;

  return (
    <section className={styles.section}>
      <div className={ui.container}>
        <motion.div
          className={`${ui.panel} ${styles.banner} ${isImminent ? styles.imminent : ''}`}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.left}>
            <div className={styles.tagRow}>
              <span className={styles.liveIndicator}>
                <span className={styles.dot} /> LIVE EVENT TIMETABLE
              </span>
              {isImminent && <span className={styles.warningTag}>STARTING SOON!</span>}
            </div>
            <h3 className={styles.eventName}>{next.e.name}</h3>
            <p className={styles.eventInfo}>
              Location: <strong>{next.e.place}</strong> • {dayNames[next.e.day]} at {next.e.time} UTC
            </p>
          </div>

          <div className={styles.middle}>
            <div className={styles.countdown}>
              <div className={styles.timeBox}>
                <span className={styles.digit}>{String(t.d).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>DAYS</span>
              </div>
              <span className={styles.colon}>:</span>
              <div className={styles.timeBox}>
                <span className={styles.digit}>{String(t.h).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>HRS</span>
              </div>
              <span className={styles.colon}>:</span>
              <div className={styles.timeBox}>
                <span className={styles.digit}>{String(t.m).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>MIN</span>
              </div>
              <span className={styles.colon}>:</span>
              <div className={styles.timeBox}>
                <span className={styles.digit}>{String(t.s).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>SEC</span>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <Button to="/schedule" variant="ghost">View Full Timetable</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

