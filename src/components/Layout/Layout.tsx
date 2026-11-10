import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import BackToTop from '../BackToTop/BackToTop';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

/** Shared shell: navbar + page outlet + footer. Reliable instant navigation without stalled transitions. */
export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top immediately on route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh', background: 'var(--c-void)' }}>
      <Navbar />
      <main style={{ flex: 1, width: '100%', minHeight: '100svh', position: 'relative' }}>
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
