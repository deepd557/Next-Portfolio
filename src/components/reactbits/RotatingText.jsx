'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// RotatingText component from ReactBits - https://www.reactbits.dev/
export default function RotatingText({
  texts = ['Hello', 'World'],
  className = '',
  mainClassName = '',
  staggerFrom = 'last', // 'first', 'last', 'center'
  initial = { y: '100%', opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: '-100%', opacity: 0 },
  staggerDuration = 0.025,
  splitLevelClassName = '',
  transition = { type: 'spring', damping: 30, stiffness: 400 },
  rotationInterval = 2000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const getStaggerDelay = (index, total) => {
    switch (staggerFrom) {
      case 'first':
        return index * staggerDuration;
      case 'center':
        return Math.abs(index - Math.floor(total / 2)) * staggerDuration;
      case 'last':
      default:
        return (total - index - 1) * staggerDuration;
    }
  };

  return (
    <span className={`inline-flex overflow-hidden ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className={`inline-flex ${className}`}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {texts[currentIndex].split('').map((char, index) => (
            <motion.span
              key={index}
              className={splitLevelClassName}
              variants={{
                initial,
                animate: {
                  ...animate,
                  transition: {
                    ...transition,
                    delay: getStaggerDelay(index, texts[currentIndex].length),
                  },
                },
                exit: {
                  ...exit,
                  transition: {
                    ...transition,
                    delay: getStaggerDelay(index, texts[currentIndex].length),
                  },
                },
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

