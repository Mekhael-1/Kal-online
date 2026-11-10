import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { classes, skills, type ClassId } from '../../data/content';
import { classColor } from '../../data/mock';
import Button from '../ui/Button';
import ui from '../ui/ui.module.css';
import styles from './HomeClasses.module.css';

interface ClassData {
  title: string;
  role: string;
  weapon: string;
  summary: string;
  stats: { label: string; value: number }[];
}

const classDetails: Record<ClassId, ClassData> = {
  Knight: {
    title: 'The Unyielding Vanguard',
    role: 'Frontline Tank & Disruptor',
    weapon: 'Broadsword & Tower Shield',
    summary:
      'Clad in fortified plate, Knights withstand the heaviest assaults while commanding the battlefield with devastating stuns and morale-boosting rally cries.',
    stats: [
      { label: 'Defense', value: 95 },
      { label: 'Attack', value: 75 },
      { label: 'Mobility', value: 60 },
      { label: 'Difficulty', value: 45 },
    ],
  },
  Mage: {
    title: 'The Cataclysmic Sorcerer',
    role: 'Area Burst & Elemental Control',
    weapon: 'Arcane Staff & Enchanted Focus',
    summary:
      'Masters of fire and ice, Mages incinerate enemy battle lines and freeze opposing armies in place with devastating apocalyptic meteors.',
    stats: [
      { label: 'Attack', value: 98 },
      { label: 'Defense', value: 40 },
      { label: 'Range', value: 90 },
      { label: 'Difficulty', value: 80 },
    ],
  },
  Archer: {
    title: 'The Swift Marksman',
    role: 'Sustained Ranged DPS & Trapper',
    weapon: 'Recurve Bow & Piercing Arrows',
    summary:
      'Deadly from afar, Archers snare advancing foes in razor traps before unleashing burning rains of arrows that pierce straight through enemy ranks.',
    stats: [
      { label: 'Range', value: 95 },
      { label: 'Attack', value: 85 },
      { label: 'Mobility', value: 85 },
      { label: 'Difficulty', value: 65 },
    ],
  },
  Thief: {
    title: 'The Shadow Infiltrator',
    role: 'Stealth Executioner & Ambush',
    weapon: 'Dual Daggers & Toxic Blades',
    summary:
      'Emerging from shadows to strike down commanders and high-value targets, Thieves leverage stacking toxins, blinding smoke, and lethal death marks to secure swift finishes.',
    stats: [
      { label: 'Mobility', value: 98 },
      { label: 'Attack', value: 92 },
      { label: 'Stealth', value: 95 },
      { label: 'Difficulty', value: 85 },
    ],
  },
};

export default function HomeClasses() {
  const [selected, setSelected] = useState<ClassId>('Knight');
  const details = classDetails[selected];
  const classSkills = skills[selected];
  const color = classColor[selected];

  return (
    <section id="classes" className={`${ui.section} ${styles.section}`}>
      <div className={ui.container}>
        <div className={styles.head}>
          <motion.p
            className={styles.kicker}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            CHOOSE YOUR DESTINY
          </motion.p>
          <motion.h2
            className={`${styles.title} ${ui.goldText}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Four Iconic Disciplines
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Each class wields unique talent trees, weapon arts, and synergistic skills designed for both solo conquest and guild warfare.
          </motion.p>
        </div>

        {/* Class Selection Tabs */}
        <div className={styles.tabBar}>
          {classes.map((cls) => {
            const isSelected = selected === cls;
            return (
              <button
                key={cls}
                type="button"
                className={`${styles.tabBtn} ${isSelected ? styles.activeTab : ''}`}
                onClick={() => setSelected(cls)}
                style={{
                  borderColor: isSelected ? classColor[cls] : undefined,
                }}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeClassPill"
                    className={styles.tabHighlight}
                    style={{ background: `${classColor[cls]}20`, borderColor: classColor[cls] }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span className={styles.tabLabel} style={{ color: isSelected ? classColor[cls] : undefined }}>
                  {cls}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Class Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            className={`${ui.panel} ${styles.showcase}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.overview}>
              <div className={styles.classBadge} style={{ color, borderColor: `${color}60` }}>
                {details.role}
              </div>
              <h3 className={styles.className}>{selected}</h3>
              <p className={styles.classTitle}>{details.title}</p>
              <p className={styles.weaponRow}>
                <strong>Standard Armament:</strong> {details.weapon}
              </p>
              <p className={styles.desc}>{details.summary}</p>

              {/* Stat Bars */}
              <div className={styles.statsWrap}>
                {details.stats.map((st) => (
                  <div key={st.label} className={styles.statItem}>
                    <div className={styles.statLabelRow}>
                      <span>{st.label}</span>
                      <span style={{ color }}>{st.value}%</span>
                    </div>
                    <div className={styles.statTrack}>
                      <motion.div
                        className={styles.statFill}
                        style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${st.value}%` }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.ctaRow}>
                <Button to="/wiki">Explore Full Skill Tree</Button>
                <Button to="/download" variant="ghost">Play as {selected}</Button>
              </div>
            </div>

            {/* Signature Skills Column */}
            <div className={styles.skillsCol}>
              <h4 className={styles.skillsHeading}>Signature Skills</h4>
              <div className={styles.skillsGrid}>
                {classSkills.map((sk, idx) => (
                  <motion.div
                    key={sk.name}
                    className={styles.skillCard}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className={styles.skillTop}>
                      <span className={styles.skillName}>{sk.name}</span>
                      <span className={styles.skillType} style={{ color, borderColor: `${color}40` }}>
                        {sk.type}
                      </span>
                    </div>
                    <p className={styles.skillText}>{sk.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

