import { motion } from 'framer-motion';
import ui from './ui.module.css';

interface TabsProps<T extends string> {
  tabs: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  group: string; // unique per tab bar so the sliding pill doesn't jump between bars
}

export default function Tabs<T extends string>({ tabs, value, onChange, group }: TabsProps<T>) {
  return (
    <div className={ui.tabs} role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={value === t.id}
          className={`${ui.tab} ${value === t.id ? ui.tabOn : ''}`}
          onClick={() => onChange(t.id)}
        >
          {value === t.id && (
            <motion.span layoutId={`pill-${group}`} className={ui.pill} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
          )}
          <span className={ui.tabLabel}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
