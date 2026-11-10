import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Logo from '../components/Navbar/Logo';
import ui from '../components/ui/ui.module.css';

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="404 — Lost in the Nether"
        subtitle="The trail ends here, wanderer. The winds of the realm carry no path forward."
      />
      <div className={ui.container} style={{ textAlign: 'center', padding: '3rem 1rem 5rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'inline-block', marginBottom: '1.5rem' }}
        >
          <Logo size={80} />
        </motion.div>
        <p style={{ color: 'var(--c-text-dim)', maxWidth: '48ch', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
          This territory is unexplored or has fallen to ruin. Return to the capital or inspect the realm archives.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Button to="/">Return to Home</Button>
          <Button to="/download" variant="ghost">Download Game</Button>
          <Button to="/wiki" variant="ghost">Browse Kalypedia</Button>
        </div>
      </div>
    </>
  );
}
