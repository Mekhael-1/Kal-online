import { useId, useState, type InputHTMLAttributes } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Field.module.css';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Field({ label, error, type = 'text', id, ...rest }: FieldProps) {
  const [show, setShow] = useState(false);
  const uid = useId();
  const fid = id ?? uid;
  const isPassword = type === 'password';

  return (
    <div className={styles.field}>
      <label htmlFor={fid}>{label}</label>
      <div className={`${styles.wrap} ${error ? styles.bad : ''}`}>
        <input
          id={fid}
          type={isPassword && show ? 'text' : type}
          aria-invalid={!!error}
          aria-describedby={error ? `${fid}-err` : undefined}
          {...rest}
        />
        {isPassword && (
          <button type="button" className={styles.toggle} onClick={() => setShow((v) => !v)} aria-label={show ? 'Hide password' : 'Show password'}>
            {show ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p id={`${fid}-err`} className={styles.err} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
