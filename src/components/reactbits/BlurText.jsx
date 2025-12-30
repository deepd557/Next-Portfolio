'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

// BlurText component from ReactBits - https://www.reactbits.dev/
export default function BlurText({
  text = '',
  className = '',
  delay = 0,
  direction = 'top',
  animateBy = 'words', // 'words' or 'letters'
  threshold = 0.1,
  rootMargin = '-100px',
  onAnimationComplete,
}) {
  const elements = useMemo(() => {
    if (animateBy === 'words') {
      return text.split(' ').map((word, index) => ({
        text: word,
        index,
      }));
    }
    return text.split('').map((letter, index) => ({
      text: letter === ' ' ? '\u00A0' : letter,
      index,
    }));
  }, [text, animateBy]);

  const getInitialY = () => {
    switch (direction) {
      case 'top':
        return -20;
      case 'bottom':
        return 20;
      default:
        return 0;
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: animateBy === 'words' ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const elementVariants = {
    hidden: {
      opacity: 0,
      y: getInitialY(),
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.span
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap' }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: rootMargin }}
      onAnimationComplete={onAnimationComplete}
    >
      {elements.map(({ text: elementText, index }) => (
        <motion.span
          key={index}
          variants={elementVariants}
          style={{ 
            display: 'inline-block',
            marginRight: animateBy === 'words' ? '0.3em' : '0',
          }}
        >
          {elementText}
        </motion.span>
      ))}
    </motion.span>
  );
}

