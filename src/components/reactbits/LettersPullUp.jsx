'use client';

import { motion } from 'framer-motion';

// LettersPullUp component from ReactBits - https://www.reactbits.dev/
export default function LettersPullUp({
  text = '',
  className = '',
  delay = 0,
}) {
  const letters = text.split('');

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: delay + i * 0.05,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      },
    }),
  };

  return (
    <span className={`inline-flex ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={pullupVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={i}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
}

