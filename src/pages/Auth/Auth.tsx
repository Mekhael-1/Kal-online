import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Field from '../../components/ui/Field';
import Logo from '../../components/Navbar/Logo';
import ui from '../../components/ui/ui.module.css';
import styles from './Auth.module.css';

type Mode = 'login' | 'register';
interface Values {
  username: string;
  email: string;
  password: string;
  confirm: string;
  agree: boolean;
  remember: boolean;
}
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  username: '',
  email: '',
  password: '',
  confirm: '',
  agree: false,
  remember: true,
};

function validate(mode: Mode, v: Values): Errors {
  const e: Errors = {};
  if (v.username.trim().length < 3) e.username = 'Enter a username with at least 3 characters.';
  if (mode === 'register') {
    if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address (e.g. warrior@domain.com).';
    if (v.password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (v.confirm !== v.password) e.confirm = 'The passwords do not match.';
    if (!v.agree) e.agree = 'You must accept the server rules to create an account.';
  } else if (!v.password) {
    e.password = 'Enter your password.';
  }
  return e;
}

export default function Auth({ mode }: { mode: Mode }) {
  const isRegister = mode === 'register';
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  // Reset form states when switching between login and register
  useEffect(() => {
    setValues(empty);
    setErrors({});
    setDone(false);
  }, [mode]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const found = validate(mode, values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    // Simulate auth network response
    await new Promise((r) => setTimeout(r, 850));
    setBusy(false);
    setDone(true);
  }

  // Password strength score
  const passLen = values.password.length;
  const passStrength = passLen >= 12 ? 'Strong' : passLen >= 8 ? 'Fair' : 'Weak';

  return (
    <section className={styles.page}>
      <div className={`${ui.container} ${styles.layout}`}>
        <aside className={styles.side}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Logo size={76} />
          </motion.div>
          <h2 className={ui.goldText}>{isRegister ? 'Begin Your Legend' : 'Welcome Back'}</h2>
          <p>
            {isRegister
              ? 'Create your free account to enter the realm, claim keeps in Castle Sieges, and climb the Hall of Champions.'
              : 'Log in to manage your character credentials, security keys, and server privileges.'}
          </p>
          <div className={styles.sidePills}>
            <span>🛡️ Anti-DDoS Protection</span>
            <span>⚡ Instant Account Activation</span>
            <span>🔒 256-bit Encrypted</span>
          </div>
        </aside>

        <motion.div
          className={`${ui.panel} ${styles.card}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1>{isRegister ? 'Create Account' : 'Log In'}</h1>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                className={styles.done}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles.successIcon}>✓</div>
                <h3>{isRegister ? 'Account Registered!' : 'Login Succeeded!'}</h3>
                <p>
                  {isRegister
                    ? 'Your credentials are authenticated. Launch Kal Online and log in with your new username to choose your class.'
                    : 'Credentials validated. You may now return to the launcher or browse the realm rankings.'}
                </p>
                <div className={styles.doneActions}>
                  <Link to="/download" className={styles.dlLink}>
                    Download Client
                  </Link>
                  <button type="button" className={styles.link} onClick={() => setDone(false)}>
                    Back to form
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                className={styles.form}
                exit={{ opacity: 0 }}
              >
                <Field
                  label="Username"
                  autoComplete="username"
                  placeholder="e.g. IronVanguard"
                  value={values.username}
                  error={errors.username}
                  onChange={(e) => set('username', e.target.value)}
                />

                {isRegister && (
                  <Field
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    placeholder="warrior@example.com"
                    value={values.email}
                    error={errors.email}
                    onChange={(e) => set('email', e.target.value)}
                  />
                )}

                <Field
                  label="Password"
                  type="password"
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  placeholder="••••••••"
                  value={values.password}
                  error={errors.password}
                  onChange={(e) => set('password', e.target.value)}
                />

                {isRegister && values.password.length > 0 && (
                  <div className={styles.strengthRow}>
                    <span>Password Strength:</span>
                    <strong
                      style={{
                        color:
                          passStrength === 'Strong'
                            ? '#38d39f'
                            : passStrength === 'Fair'
                            ? '#f0c46a'
                            : '#ff9d66',
                      }}
                    >
                      {passStrength}
                    </strong>
                  </div>
                )}

                {isRegister && (
                  <Field
                    label="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={values.confirm}
                    error={errors.confirm}
                    onChange={(e) => set('confirm', e.target.value)}
                  />
                )}

                {!isRegister && (
                  <label className={styles.check}>
                    <input
                      type="checkbox"
                      checked={values.remember}
                      onChange={(e) => set('remember', e.target.checked)}
                    />
                    <span>Remember this machine for 30 days</span>
                  </label>
                )}

                {isRegister && (
                  <div>
                    <label className={styles.check}>
                      <input
                        type="checkbox"
                        checked={values.agree}
                        onChange={(e) => set('agree', e.target.checked)}
                      />
                      <span>I accept the server rules and code of conduct.</span>
                    </label>
                    {errors.agree && <p className={styles.err}>{errors.agree}</p>}
                  </div>
                )}

                <motion.button
                  type="submit"
                  className={styles.submit}
                  disabled={busy}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {busy ? 'Verifying...' : isRegister ? 'Create Account' : 'Log In'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className={styles.alt}>
            {isRegister ? 'Already have an account?' : 'New to the realm?'}{' '}
            <Link to={isRegister ? '/login' : '/register'}>
              {isRegister ? 'Log in here' : 'Create a free account'}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
