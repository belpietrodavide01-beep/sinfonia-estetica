import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollReveal = ({
  children,
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
