import { Component, type ErrorInfo, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught a runtime error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <section className={styles.container}>
          <div className={styles.card}>
            <div className={styles.riftIcon}>⚔️</div>
            <h1 className={styles.title}>A Rift in the Realm</h1>
            <p className={styles.subtitle}>
              An unexpected disturbance occurred while rendering this territory. The archives remain safe.
            </p>

            {this.state.error && (
              <div className={styles.errorBox}>
                <code>{this.state.error.message || 'Unknown runtime anomaly'}</code>
              </div>
            )}

            <div className={styles.actions}>
              <button type="button" className={styles.primaryBtn} onClick={this.handleReload}>
                Reload Realm
              </button>
              <button type="button" className={styles.ghostBtn} onClick={this.handleHome}>
                Return to Capital
              </button>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

