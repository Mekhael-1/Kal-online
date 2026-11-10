import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { bosses, classes, features, skills, type ClassId } from '../../data/content';
import PageHeader from '../../components/ui/PageHeader';
import Tabs from '../../components/ui/Tabs';
import ui from '../../components/ui/ui.module.css';
import styles from './Wiki.module.css';

type Section = 'features' | 'skills' | 'bosses' | 'faq';

const sections: { id: Section; label: string }[] = [
  { id: 'features', label: 'Systems' },
  { id: 'skills', label: 'Class Skills' },
  { id: 'bosses', label: 'World Bosses' },
  { id: 'faq', label: 'Realm FAQ' },
];

const classTabs = classes.map((c) => ({ id: c, label: c }));

const faqs = [
  {
    q: 'How do I start leveling effectively?',
    a: 'Complete the introductory militia quests at Narootuh Castle. Once you reach Level 25, group up for the Webbed Crypt dungeon and take advantage of the Double EXP hours scheduled on Tuesday and Friday evenings.',
  },
  {
    q: 'How does Castle Siege tax distribution work?',
    a: 'The guild occupying Ashen Citadel or Ember Keep automatically collects a 5% trade tax on all marketplace transactions and NPC sales in that territory. Taxes can be claimed weekly by the Guild Master from the Territory Vault.',
  },
  {
    q: 'How does open world PvP flagging work?',
    a: 'In neutral zones (outside cities and starter areas), toggle PvP mode (Ctrl + X) to duel other flagged players. Defeating players awards Honor Points and PvP ranking score. Dying to rivals carries a minor EXP debt that can be cleansed at the temple.',
  },
  {
    q: 'Can gear break when enhancing at the Ember Anvil?',
    a: 'Enhancements from +1 to +5 have a 100% success rate. Enhancing beyond +5 requires Protection Talismans to prevent item destruction upon failure. Maker marks remain engraved permanently regardless of attempts.',
  },
];

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function Wiki() {
  const [section, setSection] = useState<Section>('features');
  const [cls, setCls] = useState<ClassId>('Knight');
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const filteredFeatures = useMemo(
    () => features.filter((f) => !q || `${f.title} ${f.text}`.toLowerCase().includes(q)),
    [q],
  );

  const filteredSkills = useMemo(
    () => skills[cls].filter((s) => !q || `${s.name} ${s.type} ${s.text}`.toLowerCase().includes(q)),
    [cls, q],
  );

  const filteredBosses = useMemo(
    () =>
      bosses.filter(
        (b) =>
          !q ||
          `${b.name} ${b.zone} ${b.drops.join(' ')} ${b.text}`.toLowerCase().includes(q),
      ),
    [q],
  );

  const filteredFaqs = useMemo(
    () => faqs.filter((f) => !q || `${f.q} ${f.a}`.toLowerCase().includes(q)),
    [q],
  );

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="Kalypedia"
        subtitle="The definitive codex of the realm: game systems, complete class disciplines, world boss encounters, and survival guides."
      />

      <section className={ui.section}>
        <div className={ui.container}>
          <div className={styles.topBar}>
            <Tabs tabs={sections} value={section} onChange={setSection} group="wiki" />
            <input
              type="search"
              placeholder="Search codex, skills, loot, bosses..."
              className={styles.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search Kalypedia"
            />
          </div>

          <div className={styles.body}>
            <AnimatePresence mode="wait">
              {section === 'features' && (
                <motion.div key="f" className={ui.grid} {...fade} transition={{ duration: 0.35 }}>
                  {filteredFeatures.map((f, i) => (
                    <motion.article
                      key={f.title}
                      className={`${ui.panel} ${ui.panelHover} ${styles.card}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <h3 className={styles.h3}>{f.title}</h3>
                      <p className={styles.text}>{f.text}</p>
                    </motion.article>
                  ))}
                  {filteredFeatures.length === 0 && (
                    <p className={styles.empty}>No game systems match "{query}".</p>
                  )}
                </motion.div>
              )}

              {section === 'skills' && (
                <motion.div key="s" {...fade} transition={{ duration: 0.35 }}>
                  <div className={styles.classNav}>
                    <Tabs tabs={classTabs} value={cls} onChange={setCls} group="class" />
                  </div>
                  <div className={`${ui.grid} ${styles.gap}`} key={cls}>
                    {filteredSkills.map((s, i) => (
                      <motion.article
                        key={s.name}
                        className={`${ui.panel} ${ui.panelHover} ${styles.card}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <div className={styles.row}>
                          <h3 className={styles.h3}>{s.name}</h3>
                          <span className={ui.tag}>{s.type}</span>
                        </div>
                        <p className={styles.text}>{s.text}</p>
                      </motion.article>
                    ))}
                  </div>
                  {filteredSkills.length === 0 && (
                    <p className={styles.empty}>No {cls} skills match "{query}".</p>
                  )}
                </motion.div>
              )}

              {section === 'bosses' && (
                <motion.div key="b" className={ui.grid} {...fade} transition={{ duration: 0.35 }}>
                  {filteredBosses.map((b, i) => (
                    <motion.article
                      key={b.name}
                      className={`${ui.panel} ${ui.panelHover} ${styles.bossCard}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <div className={styles.row}>
                        <h3 className={styles.h3}>{b.name}</h3>
                        <span className={`${ui.tag} ${styles.bossLv}`}>Level {b.level}</span>
                      </div>
                      <p className={styles.text}>{b.text}</p>
                      <dl className={styles.facts}>
                        <div>
                          <dt>Zone</dt>
                          <dd><strong>{b.zone}</strong></dd>
                        </div>
                        <div>
                          <dt>Spawns</dt>
                          <dd>{b.respawn}</dd>
                        </div>
                        <div>
                          <dt>Loot Drops</dt>
                          <dd className={styles.dropsList}>
                            {b.drops.map((drop) => (
                              <span key={drop} className={styles.dropTag}>
                                💎 {drop}
                              </span>
                            ))}
                          </dd>
                        </div>
                      </dl>
                    </motion.article>
                  ))}
                  {filteredBosses.length === 0 && (
                    <p className={styles.empty}>No world bosses match "{query}".</p>
                  )}
                </motion.div>
              )}

              {section === 'faq' && (
                <motion.div key="faq" className={styles.faqList} {...fade} transition={{ duration: 0.35 }}>
                  {filteredFaqs.map((faq, i) => (
                    <motion.article
                      key={faq.q}
                      className={`${ui.panel} ${styles.faqCard}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <h3 className={styles.faqQuestion}>
                        <span className={styles.qMarker}>Q.</span> {faq.q}
                      </h3>
                      <p className={styles.faqAnswer}>{faq.a}</p>
                    </motion.article>
                  ))}
                  {filteredFaqs.length === 0 && (
                    <p className={styles.empty}>No guide entries match "{query}".</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
