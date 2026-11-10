import { Link } from 'react-router-dom';
import { navLinks, site } from '../../config/site';
import Logo from '../Navbar/Logo';
import ui from '../ui/ui.module.css';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${ui.container} ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <div className={styles.logoRow}>
            <Logo size={28} />
            <span className={styles.brand}>{site.name}</span>
          </div>
          <p className={styles.tagline}>{site.tagline}</p>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} {site.name}. All game assets and trademarks belong to their respective creators.
          </p>
        </div>

        <div className={styles.navBlock}>
          <h4 className={styles.navHeading}>Navigation</h4>
          <nav className={styles.links} aria-label="Footer Navigation">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.communityBlock}>
          <h4 className={styles.navHeading}>Community & Support</h4>
          <div className={styles.links}>
            <a href={site.discordUrl} target="_blank" rel="noopener noreferrer">
              Join Discord Server
            </a>
            <Link to="/download">Installation Guide</Link>
            <Link to="/wiki">Kalypedia & Rules</Link>
            <Link to="/rankings">Hall of Champions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
