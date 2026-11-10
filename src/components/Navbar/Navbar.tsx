import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, site } from '../../config/site';
import Logo from './Logo';
import styles from './Navbar.module.css';

function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5.5C7.2 4.2 9.5 3.6 12 3.6s4.8.6 7 1.900c1.600 3 2.4 6.2 2.3 9.800-1.500 1.200-3.100 1.900-4.8 2.3l-1-1.600c.6-.2 1.200-.5 1.700-.9-2.900 1.200-6.300 1.200-9.200 0 .5.400 1.100.7 1.700.9l-1 1.600c-1.700-.4-3.300-1.100-4.8-2.3C2.600 11.700 3.400 8.500 5 5.500Z" fill="currentColor" />
      <circle cx="9" cy="11.5" r="1.400" fill="#14100d" />
      <circle cx="15" cy="11.5" r="1.400" fill="#14100d" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the mobile menu after navigating
  useEffect(() => setOpen(false), [pathname]);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <motion.header
      className={`${styles.header} ${scrolled || open ? styles.solid : ''}`}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <nav className={styles.nav} aria-label="Main">
        <Link to="/" className={styles.brand}>
          <motion.span whileHover={{ rotate: 12, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Logo />
          </motion.span>
          <span className={styles.brandText}>{site.name}</span>
          <span className={styles.serverPill}>
            <span className={styles.pulseDot} />
            {site.serverStatus}
          </span>
        </Link>

        <ul className={styles.links}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && <motion.span layoutId="nav-underline" className={styles.underline} />}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a href={site.discordUrl} target="_blank" rel="noopener noreferrer" className={styles.discord}>
            <DiscordIcon />
            <span>Discord</span>
          </a>
          <Link to="/login" className={styles.loginBtn}>
            <UserIcon />
            <span className={styles.loginText}>Log In</span>
          </Link>
          <Link to="/register" className={styles.register}>
            <span>Register</span>
          </Link>
        </div>

        <button className={styles.burger} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span className={`${styles.bar} ${open ? styles.b1 : ''}`} />
          <span className={`${styles.bar} ${open ? styles.b2 : ''}`} />
          <span className={`${styles.bar} ${open ? styles.b3 : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.drawer}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {navLinks.map(({ to, label }, i) => (
                <motion.li key={to} initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.07 * i + 0.1 }}>
                  <NavLink to={to} end={to === '/'} className={({ isActive }) => (isActive ? styles.mActive : '')}>{label}</NavLink>
                </motion.li>
              ))}
              <li>
                <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">Discord</a>
              </li>
            </ul>
            <div className={styles.drawerAuth}>
              <Link to="/login" className={styles.loginBtn}>
                <UserIcon />
                <span className={styles.loginText}>Log In</span>
              </Link>
              <Link to="/register" className={styles.register}>Register</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
