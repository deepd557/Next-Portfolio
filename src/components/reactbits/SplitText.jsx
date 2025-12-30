'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

// SplitText component from ReactBits - https://www.reactbits.dev/
export default function SplitText({
  text = '',
  className = '',
  delay = 0,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'easeOut',
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) {
  const letters = useMemo(() => {
    const words = text.split(' ');
    let letterIndex = 0;
    
    return words.map((word, wordIndex) => ({
      word,
      letters: word.split('').map((letter) => ({
        letter,
        index: letterIndex++,
      })),
      hasSpace: wordIndex < words.length - 1,
    }));
  }, [text]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: animationFrom,
    visible: {
      ...animationTo,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };

  return (
    <motion.span
      className={className}
      style={{ 
        display: 'inline-flex', 
        flexWrap: 'wrap', 
        justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
        overflow: 'hidden',
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: rootMargin }}
    >
      {letters.map(({ word, letters: wordLetters, hasSpace }, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-flex', whiteSpace: 'pre' }}>
          {wordLetters.map(({ letter, index }) => (
            <motion.span
              key={index}
              variants={letterVariants}
              onAnimationComplete={() => {
                if (onLetterAnimationComplete && index === text.replace(/\s/g, '').length - 1) {
                  onLetterAnimationComplete();
                }
              }}
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
          {hasSpace && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

