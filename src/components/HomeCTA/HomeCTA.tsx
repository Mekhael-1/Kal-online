import { motion } from 'framer-motion';
import { site } from '../../config/site';
import Button from '../ui/Button';
import ui from '../ui/ui.module.css';
import styles from './HomeCTA.module.css';

export default function HomeCTA() {
  return (
    <section className={styles.section}>
      <div className={ui.container}>
        <motion.div
          className={`${ui.panel} ${styles.card}`}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.decorLeft} />
          <div className={styles.decorRight} />

          <div className={styles.content}>
            <span className={styles.kicker}>THE REALM CALLS</span>
            <h2 className={`${styles.title} ${ui.goldText}`}>
              Are You Ready to Write Your Legend?
            </h2>
            <p className={styles.desc}>
              Download the game client in seconds, join thousands of active warriors, and claim your place in the Hall of Champions.
            </p>

            <div className={styles.steps}>
              <div className={styles.step}>
                <span className={styles.stepNum}>1</span>
                <div>
                  <strong>Get the Client</strong>
                  <p>Download our patched full game installer.</p>
                </div>
              </div>
              <div className={styles.stepDivider} />
              <div className={styles.step}>
                <span className={styles.stepNum}>2</span>
                <div>
                  <strong>Create Account</strong>
                  <p>Instant free signup with no email wait.</p>
                </div>
              </div>
              <div className={styles.stepDivider} />
              <div className={styles.step}>
                <span className={styles.stepNum}>3</span>
                <div>
                  <strong>Join Guilds</strong>
                  <p>Connect with veteran players on Discord.</p>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Button to="/download">Download Client Now</Button>
              <Button to="/register" variant="ghost">Create Free Account</Button>
              <Button href={site.discordUrl} variant="ghost">Join Discord</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

