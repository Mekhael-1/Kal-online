import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import ui from '../ui/ui.module.css';
import styles from './HomeNews.module.css';

interface NewsItem {
  id: string;
  category: 'Update' | 'Event' | 'Community' | 'Maintenance';
  date: string;
  title: string;
  snippet: string;
  content: string[];
}

const newsData: NewsItem[] = [
  {
    id: 'patch-241',
    category: 'Update',
    date: 'Nov 8, 2026',
    title: 'Patch 2.4.1: Ashen Citadel & Ember Forge Awakened',
    snippet:
      'The gates of Ashen Citadel have unlocked! Experience revamped castle siege tax mechanics, new Ember Anvil crafts, and enhanced drop tables.',
    content: [
      'Castle Siege mechanics reworked with destructible inner courtyard gates and guild flag capture points.',
      'Ember Anvil now accepts Ancient Relic Shards to craft Tier 6 weapons and armor sets with custom maker marks.',
      'Optimized network packets during 100+ player open-world guild skirmishes.',
      'Fixed minor cooldown discrepancies on Assassin Shadow Step and Mage Frost Veil.',
    ],
  },
  {
    id: 'double-exp-weekend',
    category: 'Event',
    date: 'Nov 6, 2026',
    title: 'Weekend Bloodlust: 2x EXP & +50% Drop Boost',
    snippet:
      'Prepare your party! From Friday 18:00 UTC through Sunday midnight, all open world zones and timed dungeons yield double experience.',
    content: [
      '200% base Monster EXP across all server territories.',
      '+50% drop rate multiplier on Boss Chests and Dungeon End-Treasures.',
      'Double Guild Contribution points gained during castle siege patrols.',
      'Special merchant appearing in the capital selling temporary stat elixirs.',
    ],
  },
  {
    id: 'season-2-rankings',
    category: 'Community',
    date: 'Nov 2, 2026',
    title: 'Season II Hall of Champions Rewards Revealed',
    snippet:
      'The top 10 PvP warriors and castle-holding guilds this season will claim exclusive golden cloaks, server titles, and guild banner totems.',
    content: [
      'Rank #1 PvP Player receives the legendary "Warlord of the Ash" title and glowing golden aura.',
      'Top 3 Guilds receive permanent guild hideout monuments and custom realm broadcast horns.',
      'All accounts with a Level 70+ character receive commemorative Season II participation medals.',
    ],
  },
];

const categoryColors: Record<NewsItem['category'], string> = {
  Update: '#f0c46a',
  Event: '#ff9d66',
  Community: '#8aa66a',
  Maintenance: '#a05a7a',
};

export default function HomeNews() {
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  return (
    <section id="news" className={`${ui.section} ${styles.section}`}>
      <div className={ui.container}>
        <div className={styles.head}>
          <motion.p
            className={styles.kicker}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            DISPATCHES FROM THE FRONT
          </motion.p>
          <motion.h2
            className={`${styles.title} ${ui.goldText}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Latest News & Announcements
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Stay updated with patch releases, weekly server events, and community tournaments.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {newsData.map((item, idx) => (
            <motion.article
              key={item.id}
              className={`${ui.panel} ${styles.card}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={styles.metaRow}>
                <span
                  className={styles.category}
                  style={{
                    color: categoryColors[item.category],
                    borderColor: `${categoryColors[item.category]}55`,
                    background: `${categoryColors[item.category]}18`,
                  }}
                >
                  {item.category}
                </span>
                <span className={styles.date}>{item.date}</span>
              </div>
              <h3 className={styles.articleTitle}>{item.title}</h3>
              <p className={styles.snippet}>{item.snippet}</p>
              <button
                type="button"
                className={styles.readMore}
                onClick={() => setActiveArticle(item)}
              >
                Read patch details &rarr;
              </button>
            </motion.article>
          ))}
        </div>

        {/* Modal for Reading Full Article */}
        <AnimatePresence>
          {activeArticle && (
            <div className={styles.overlay} onClick={() => setActiveArticle(null)}>
              <motion.div
                className={`${ui.panel} ${styles.modal}`}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.modalHeader}>
                  <div className={styles.metaRow}>
                    <span
                      className={styles.category}
                      style={{
                        color: categoryColors[activeArticle.category],
                        borderColor: `${categoryColors[activeArticle.category]}55`,
                        background: `${categoryColors[activeArticle.category]}18`,
                      }}
                    >
                      {activeArticle.category}
                    </span>
                    <span className={styles.date}>{activeArticle.date}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={() => setActiveArticle(null)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>

                <h3 className={styles.modalTitle}>{activeArticle.title}</h3>
                <p className={styles.modalSnippet}>{activeArticle.snippet}</p>

                <div className={styles.bulletList}>
                  <h4 className={styles.bulletHead}>Highlights & Notes:</h4>
                  <ul>
                    {activeArticle.content.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.modalActions}>
                  <Button onClick={() => setActiveArticle(null)}>Close</Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

