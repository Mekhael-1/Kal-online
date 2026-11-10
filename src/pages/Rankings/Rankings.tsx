import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  classColor,
  players,
  guildRankings,
  type Player,
  type PlayerClass,
  type GuildRank,
} from '../../data/mock';
import PageHeader from '../../components/ui/PageHeader';
import Tabs from '../../components/ui/Tabs';
import ui from '../../components/ui/ui.module.css';
import styles from './Rankings.module.css';

type Metric = 'level' | 'pvp' | 'guilds';
type Ranked = Player & { rank: number };
type RankedGuild = GuildRank & { rank: number };
type ClassFilter = 'All' | PlayerClass;

const metricTabs: { id: Metric; label: string }[] = [
  { id: 'level', label: 'Top Level' },
  { id: 'pvp', label: 'Top PvP' },
  { id: 'guilds', label: 'Top Guilds' },
];

const classTabs: { id: ClassFilter; label: string }[] = [
  { id: 'All', label: 'All classes' },
  { id: 'Knight', label: 'Knights' },
  { id: 'Mage', label: 'Mages' },
  { id: 'Archer', label: 'Archers' },
  { id: 'Thief', label: 'Thief' },
];

function Avatar({ p, size = 56 }: { p: Player; size?: number }) {
  return (
    <span
      className={styles.avatar}
      style={{
        width: size,
        height: size,
        borderColor: classColor[p.cls],
        color: classColor[p.cls],
        boxShadow: `0 0 12px ${classColor[p.cls]}44`,
      }}
    >
      {p.name[0]}
    </span>
  );
}

function Crown({ place }: { place: number }) {
  const color = place === 1 ? '#f0c46a' : place === 2 ? '#d0d4dc' : '#cd7f32';
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={styles.crown}
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 400, delay: 0.2 }}
    >
      <path
        d="M3 18h18l-2-10-4.5 4.5L12 4l-2.5 8.5L5 8l-2 10Z"
        fill={color}
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="3" cy="8" r="1.5" fill={color} />
      <circle cx="12" cy="4" r="1.5" fill={color} />
      <circle cx="21" cy="8" r="1.5" fill={color} />
    </motion.svg>
  );
}

export default function Rankings() {
  const [metric, setMetric] = useState<Metric>('level');
  const [classFilter, setClassFilter] = useState<ClassFilter>('All');
  const [query, setQuery] = useState('');

  const isGuilds = metric === 'guilds';

  // Ranked players
  const rankedPlayers: Ranked[] = useMemo(
    () =>
      [...players]
        .sort((a, b) => b[isGuilds ? 'level' : metric] - a[isGuilds ? 'level' : metric])
        .map((p, i) => ({ ...p, rank: i + 1 })),
    [metric, isGuilds],
  );

  // Ranked guilds
  const rankedGuilds: RankedGuild[] = useMemo(
    () => [...guildRankings].sort((a, b) => b.score - a.score).map((g, i) => ({ ...g, rank: i + 1 })),
    [],
  );

  const q = query.trim().toLowerCase();

  const playerRows = rankedPlayers.filter((p) => {
    const matchesClass = classFilter === 'All' || p.cls === classFilter;
    const matchesQuery = !q || `${p.name} ${p.guild} ${p.cls}`.toLowerCase().includes(q);
    return matchesClass && matchesQuery;
  });

  const guildRows = rankedGuilds.filter((g) => {
    return !q || `${g.name} ${g.leader} ${g.territory}`.toLowerCase().includes(q);
  });

  // Podium for players
  const playerPodium = [
    { p: rankedPlayers[1], place: 2 },
    { p: rankedPlayers[0], place: 1 },
    { p: rankedPlayers[2], place: 3 },
  ].filter((item): item is { p: Ranked; place: number } => Boolean(item.p));

  // Podium for guilds
  const guildPodium = [
    { g: rankedGuilds[1], place: 2 },
    { g: rankedGuilds[0], place: 1 },
    { g: rankedGuilds[2], place: 3 },
  ].filter((item): item is { g: RankedGuild; place: number } => Boolean(item.g));

  const valueLabel = metric === 'level' ? 'Level' : metric === 'pvp' ? 'PvP Kills' : 'Siege Score';

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="Hall of Champions"
        subtitle="The realm's fiercest warriors and dominant guilds, updated continuously from the live game server."
      />

      <section className={ui.section}>
        <div className={ui.container}>
          <div className={styles.bar}>
            <Tabs tabs={metricTabs} value={metric} onChange={setMetric} group="rank" />
            <input
              className={styles.search}
              type="search"
              placeholder={isGuilds ? 'Search guild, leader, territory...' : 'Search player, guild or class...'}
              aria-label="Search rankings"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {!isGuilds && (
            <div className={styles.subBar}>
              <Tabs tabs={classTabs} value={classFilter} onChange={setClassFilter} group="classFilter" />
              <span className={styles.countBadge}>{playerRows.length} Warriors</span>
            </div>
          )}

          {isGuilds && (
            <div className={styles.subBar}>
              <span className={styles.countBadge}>{guildRows.length} Active Guilds</span>
            </div>
          )}

          {/* Podium for Players */}
          {!isGuilds && playerPodium.length > 0 && !query && classFilter === 'All' && (
            <div className={styles.podium} key={metric}>
              {playerPodium.map(({ p, place }) => (
                <motion.div
                  key={p.name}
                  className={`${ui.panel} ${styles.step} ${styles[`p${place}`]}`}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: place === 1 ? 0.2 : place === 2 ? 0.35 : 0.45,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <Crown place={place} />
                  <span className={styles.place}>#{place}</span>
                  <Avatar p={p} size={place === 1 ? 76 : 58} />
                  <h3 className={styles.champName}>{p.name}</h3>
                  <p className={styles.meta}>
                    <span style={{ color: classColor[p.cls], fontWeight: 600 }}>{p.cls}</span> • {p.guild}
                  </p>
                  <p className={`${styles.score} ${ui.goldText}`}>{p[metric].toLocaleString('en-US')}</p>
                  <p className={styles.metaLabel}>{valueLabel}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Podium for Guilds */}
          {isGuilds && guildPodium.length > 0 && !query && (
            <div className={styles.podium} key="guildPodium">
              {guildPodium.map(({ g, place }) => (
                <motion.div
                  key={g.name}
                  className={`${ui.panel} ${styles.step} ${styles[`p${place}`]}`}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: place === 1 ? 0.2 : place === 2 ? 0.35 : 0.45,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <Crown place={place} />
                  <span className={styles.place}>#{place}</span>
                  <span className={styles.guildIcon}>{place === 1 ? '🏰' : '🛡️'}</span>
                  <h3 className={styles.champName}>{g.name}</h3>
                  <p className={styles.meta}>Leader: {g.leader} • Lv. {g.level}</p>
                  <p className={`${styles.score} ${ui.goldText}`}>{g.score.toLocaleString('en-US')}</p>
                  <p className={styles.metaLabel}>{g.territory !== 'None' ? `Holds: ${g.territory}` : 'Challenger'}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Player Table */}
          {!isGuilds && (
            <div className={`${ui.panel} ${styles.tableWrap}`}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Warrior</th>
                    <th>Class</th>
                    <th>Guild</th>
                    <th className={styles.num}>Level</th>
                    <th className={styles.num}>PvP Kills</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {playerRows.map((p, i) => (
                      <motion.tr
                        key={p.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: Math.min(i * 0.02, 0.4), duration: 0.3 }}
                        className={p.rank <= 3 ? styles.topRow : undefined}
                      >
                        <td className={styles.rank}>
                          {p.rank === 1 ? '🥇 1' : p.rank === 2 ? '🥈 2' : p.rank === 3 ? '🥉 3' : `#${p.rank}`}
                        </td>
                        <td className={styles.name}>
                          <Avatar p={p} size={32} />
                          <span className={styles.warriorName}>{p.name}</span>
                        </td>
                        <td>
                          <span
                            className={styles.classTag}
                            style={{
                              color: classColor[p.cls],
                              borderColor: `${classColor[p.cls]}55`,
                              backgroundColor: `${classColor[p.cls]}15`,
                            }}
                          >
                            {p.cls}
                          </span>
                        </td>
                        <td className={styles.guildName}>{p.guild}</td>
                        <td className={styles.num}>
                          <span className={styles.levelBadge}>Lv. {p.level}</span>
                        </td>
                        <td className={`${styles.num} ${styles.pvpCol}`}>{p.pvp.toLocaleString('en-US')}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {playerRows.length === 0 && (
                <motion.div className={styles.empty} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p>No warriors match "{query}".</p>
                  <button
                    type="button"
                    className={styles.resetBtn}
                    onClick={() => {
                      setQuery('');
                      setClassFilter('All');
                    }}
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* Guilds Table */}
          {isGuilds && (
            <div className={`${ui.panel} ${styles.tableWrap}`}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Guild</th>
                    <th>Guild Master</th>
                    <th>Controlled Territory</th>
                    <th className={styles.num}>Members</th>
                    <th className={styles.num}>Honor Score</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {guildRows.map((g, i) => (
                      <motion.tr
                        key={g.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: Math.min(i * 0.03, 0.4), duration: 0.3 }}
                        className={g.rank <= 3 ? styles.topRow : undefined}
                      >
                        <td className={styles.rank}>
                          {g.rank === 1 ? '🥇 1' : g.rank === 2 ? '🥈 2' : g.rank === 3 ? '🥉 3' : `#${g.rank}`}
                        </td>
                        <td className={styles.name}>
                          <span className={styles.guildBadgeIcon}>🛡️</span>
                          <div>
                            <strong className={styles.warriorName}>{g.name}</strong>
                            <span className={styles.guildLv}>Lv. {g.level}</span>
                          </div>
                        </td>
                        <td className={styles.guildName}>{g.leader}</td>
                        <td>
                          <span
                            className={styles.territoryTag}
                            style={{
                              borderColor: g.territory !== 'None' ? 'var(--c-gold)' : 'rgba(90, 58, 36, 0.4)',
                              color: g.territory !== 'None' ? 'var(--c-gold-bright)' : 'var(--c-text-dim)',
                            }}
                          >
                            {g.territory !== 'None' ? `🏰 ${g.territory}` : 'None'}
                          </span>
                        </td>
                        <td className={styles.num}>{g.members} / 50</td>
                        <td className={`${styles.num} ${styles.scoreCol}`}>{g.score.toLocaleString('en-US')}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {guildRows.length === 0 && (
                <motion.div className={styles.empty} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p>No guilds match "{query}".</p>
                  <button type="button" className={styles.resetBtn} onClick={() => setQuery('')}>
                    Clear search
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
