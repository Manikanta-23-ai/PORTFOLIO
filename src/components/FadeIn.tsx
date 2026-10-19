import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  once?: boolean;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 28,
  once = true,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [forceVisible, setForceVisible] = useState(false);

  // Safety fallback for cross-origin preview iframes where IntersectionObserver
  // may be delayed or throttled when the iframe is initially hidden/resized.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setForceVisible(true);
    }, Math.max(600, (delay + duration) * 1000 + 250));
    return () => window.clearTimeout(timer);
  }, [delay, duration]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      animate={forceVisible ? { opacity: 1, x: 0, y: 0 } : undefined}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.08 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
