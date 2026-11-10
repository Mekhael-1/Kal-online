import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

const MotionLink = motion.create(Link);

interface ButtonProps {
  to?: string;    // internal route
  href?: string;  // external link
  variant?: 'primary' | 'ghost';
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const motionProps = {
  whileHover: { y: -3 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring' as const, stiffness: 380, damping: 22 },
};

export default function Button({
  to,
  href,
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`.trim();
  const inner = <span className={styles.label}>{children}</span>;

  if (to) {
    return (
      <MotionLink to={to} className={cls} onClick={onClick} {...motionProps}>
        {inner}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cls}
      onClick={onClick}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
