import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import { site } from '../../config/site';
import Button from '../ui/Button';
import Embers from '../Embers/Embers';
import styles from './Hero.module.css';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Parallax: video drifts slower than the page, content fades as you scroll away
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="home" ref={ref} className={styles.hero}>
      <motion.div className={styles.media} style={{ y: videoY }}>
        {!videoFailed && (
          <video
            className={`${styles.video} ${videoReady ? styles.videoOn : ''}`}
            src={site.heroVideo}
            poster={site.heroPoster || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
          />
        )}
      </motion.div>

      <div className={styles.tint} />
      <div className={styles.vignette} />
      <div className={styles.fade} />
      <Embers />

      <motion.div className={styles.content} style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div variants={container} initial="hidden" animate="show" className={styles.stack}>
          <motion.div variants={rise} className={styles.statusPill}>
            <span className={styles.statusDot} />
            <span>Realm Online • Over 1,200 Warriors in Battle</span>
          </motion.div>

          <motion.h1 variants={rise} className={styles.title}>
            <span className={styles.titleText}>{site.name}</span>
          </motion.h1>

          <motion.span variants={rise} className={styles.rule} aria-hidden="true" />

          <motion.p variants={rise} className={styles.tagline}>{site.tagline}</motion.p>
          <motion.p variants={rise} className={styles.desc}>{site.description}</motion.p>

          <motion.div variants={rise} className={styles.actions}>
            <Button to="/download">Download client</Button>
            <Button to="/register" variant="ghost">Play now</Button>
          </motion.div>

          <motion.div variants={rise} className={styles.highlights}>
            <span className={styles.highlightItem}>⚔️ Open PvP & Castle Sieges</span>
            <span className={styles.highlightDot}>•</span>
            <span className={styles.highlightItem}>🛡️ Active Anti-Cheat</span>
            <span className={styles.highlightDot}>•</span>
            <span className={styles.highlightItem}>⚡ Balanced Progressive Economy</span>
          </motion.div>
        </motion.div>
      </motion.div>

      <a href="#stats" className={styles.scroll} aria-label="Scroll to server stats">
        <motion.span
          className={styles.scrollDot}
          animate={reduce ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </a>
    </section>
  );
}
