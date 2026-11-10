import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { dayNames, events, type EventKind } from '../../data/content';
import { site } from '../../config/site';
import { useNow } from '../../hooks/useNow';
import { nextOccurrence, splitDuration } from '../../utils/schedule';
import PageHeader from '../../components/ui/PageHeader';
import Tabs from '../../components/ui/Tabs';
import ui from '../../components/ui/ui.module.css';
import styles from './Schedule.module.css';

const kindLabel: Record<EventKind, string> = { boss: 'World Boss', war: 'Guild War', event: 'Server Event' };

type FilterKind = 'all' | EventKind;
const filterTabs: { id: FilterKind; label: string }[] = [
  { id: 'all', label: 'All Events' },
  { id: 'war', label: 'Guild Wars' },
  { id: 'boss', label: 'World Bosses' },
  { id: 'event', label: 'Special Events' },
];

export default function Schedule() {
  const nowMs = useNow(1000);
  const now = new Date(nowMs);
  const [filter, setFilter] = useState<FilterKind>('all');

  const upcoming = events
    .map((e) => ({ e, at: nextOccurrence(e, now) }))
    .sort((a, b) => a.at.getTime() - b.at.getTime());

  const next = upcoming[0];
  const t = next ? splitDuration(next.at.getTime() - nowMs) : { d: 0, h: 0, m: 0, s: 0 };
  const today = now.getUTCDay();

  // Filtered schedule table
  const filteredEvents = events.filter((e) => filter === 'all' || e.kind === filter);
  const table = [...filteredEvents].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
  const parts = [
    { v: t.d, l: 'Days' },
    { v: t.h, l: 'Hours' },
    { v: t.m, l: 'Minutes' },
    { v: t.s, l: 'Seconds' },
  ];

  // Server time formatted
  const serverTimeStr = now.toUTCString().replace('GMT', 'UTC');

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="Battle Timetable"
        subtitle={`Scheduled sieges, boss encounters and realm events. All times aligned with Server Clock (${site.serverTime}).`}
      />

      <section className={ui.section}>
        <div className={`${ui.container} ${styles.top}`}>
          {/* Main live countdown card */}
          {next && (
            <motion.div
              className={`${ui.panel} ${styles.next}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.liveBadge}>
                <span className={styles.pulseDot} />
                NEXT IMMINENT BATTLE
              </div>
              <h2 className={`${styles.nextName} ${ui.goldText}`}>{next.e.name}</h2>
              <p className={styles.where}>
                <span className={`${ui.tag} ${styles[next.e.kind]}`}>{kindLabel[next.e.kind]}</span>
                &nbsp;at <strong>{next.e.place}</strong> — {dayNames[next.e.day]} at {next.e.time} UTC
              </p>

              <div className={styles.clock} role="timer" aria-label={`Time until ${next.e.name}`}>
                {parts.map((p) => (
                  <motion.div
                    key={p.l}
                    className={styles.cell}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <span className={`${styles.digit} ${ui.goldText}`}>
                      {String(p.v).padStart(2, '0')}
                    </span>
                    <span className={styles.unit}>{p.l}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Upcoming next 3 queue */}
          <motion.div
            className={`${ui.panel} ${styles.soon}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.soonHeader}>
              <h3>Following Encounters</h3>
              <span className={styles.serverClock}>{serverTimeStr.slice(17, 25)} UTC</span>
            </div>
            <ul>
              {upcoming.slice(1, 4).map(({ e, at }) => (
                <li key={e.name + e.day}>
                  <div>
                    <strong className={styles.queueName}>{e.name}</strong>
                    <span className={styles.queuePlace}>({e.place})</span>
                  </div>
                  <span className={styles.when}>
                    {dayNames[at.getUTCDay()].slice(0, 3)} {e.time}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className={ui.section}>
        <div className={ui.container}>
          <div className={styles.filterBar}>
            <Tabs tabs={filterTabs} value={filter} onChange={setFilter} group="eventFilter" />
            <span className={styles.todayIndicator}>
              Server Day: <strong>{dayNames[today]}</strong>
            </span>
          </div>

          <div className={`${ui.panel} ${styles.tableWrap}`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>UTC Time</th>
                  <th>Event</th>
                  <th>Category</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {table.map((e, i) => (
                    <motion.tr
                      key={e.name + e.day}
                      className={e.day === today ? styles.today : ''}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.4) }}
                    >
                      <td className={styles.dayCol}>
                        {dayNames[e.day]}
                        {e.day === today && <span className={styles.badge}>TODAY</span>}
                      </td>
                      <td className={styles.time}>{e.time}</td>
                      <td className={styles.evName}>{e.name}</td>
                      <td>
                        <span className={`${ui.tag} ${styles[e.kind]}`}>{kindLabel[e.kind]}</span>
                      </td>
                      <td className={styles.placeCol}>{e.place}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
