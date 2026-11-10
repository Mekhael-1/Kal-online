import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ui from '../ui/ui.module.css';
import styles from './HomeGallery.module.css';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  gradient: string;
  symbol: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'siege',
    title: 'Ashen Citadel Siege',
    category: 'Guild Warfare',
    caption: 'Over 200 warriors clashing at the citadel gates under catapult barrage and guild rallying flags.',
    gradient: 'linear-gradient(135deg, #4a1e12 0%, #1a0f0a 100%)',
    symbol: '⚔️',
  },
  {
    id: 'boss',
    title: 'Gravemaw World Raid',
    category: 'World Bosses',
    caption: 'Server-wide hunting parties assembling at the Sunken Throne for the midnight world boss spawn.',
    gradient: 'linear-gradient(135deg, #1b382b 0%, #0d1712 100%)',
    symbol: '🐲',
  },
  {
    id: 'pvp',
    title: 'Contested Zone Skirmish',
    category: 'Open PvP',
    caption: 'High-stakes duels in neutral territory where victorious combatants claim raw honor tokens.',
    gradient: 'linear-gradient(135deg, #3d172e 0%, #150910 100%)',
    symbol: '🛡️',
  },
  {
    id: 'forge',
    title: 'The Ember Anvil',
    category: 'Legendary Crafting',
    caption: 'Master artisans forging Tier 6 armor sets engraved with their permanent maker marks.',
    gradient: 'linear-gradient(135deg, #4a3412 0%, #161008 100%)',
    symbol: '🔨',
  },
  {
    id: 'crypt',
    title: 'Webbed Crypt Dungeon',
    category: 'Timed Instances',
    caption: 'Four-player co-op party battling through poisonous depths against time-attack leaderboards.',
    gradient: 'linear-gradient(135deg, #1d2538 0%, #090c14 100%)',
    symbol: '🗝️',
  },
  {
    id: 'mounts',
    title: 'Divine Companion Beasts',
    category: 'Companions & Pets',
    caption: 'Ancient winged dragons and spirit beasts raised to assist combatants in active PvP skirmishes.',
    gradient: 'linear-gradient(135deg, #382c16 0%, #110d06 100%)',
    symbol: '🦅',
  },
];

export default function HomeGallery() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className={`${ui.section} ${styles.section}`}>
      <div className={ui.container}>
        <div className={styles.head}>
          <motion.p
            className={styles.kicker}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            GLIMPSES OF THE CONQUEST
          </motion.p>
          <motion.h2
            className={`${styles.title} ${ui.goldText}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Realm Chronicles & Showcase
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Witness the dark fantasy landscapes, brutal open combat, and monumental victories forged across the server.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              className={`${ui.panel} ${styles.card}`}
              style={{ background: item.gradient }}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
              onClick={() => setSelected(item)}
            >
              <div className={styles.cardSymbol}>{item.symbol}</div>
              <div className={styles.cardContent}>
                <span className={styles.category}>{item.category}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <span className={styles.viewPrompt}>Click to enlarge &rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selected && (
            <div className={styles.lightbox} onClick={() => setSelected(null)}>
              <motion.div
                className={`${ui.panel} ${styles.lightboxCard}`}
                style={{ background: selected.gradient }}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={() => setSelected(null)}
                  aria-label="Close image"
                >
                  &times;
                </button>
                <div className={styles.bigSymbol}>{selected.symbol}</div>
                <span className={styles.category}>{selected.category}</span>
                <h3 className={styles.lightboxTitle}>{selected.title}</h3>
                <p className={styles.caption}>{selected.caption}</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

