'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// DecryptedText component from ReactBits - https://www.reactbits.dev/
export default function DecryptedText({
  text = '',
  className = '',
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  revealDirection = 'start',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view',
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  const getRandomChar = () => {
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const animate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            let shouldReveal;
            if (revealDirection === 'start') {
              shouldReveal = index < iteration;
            } else if (revealDirection === 'end') {
              shouldReveal = index >= text.length - iteration;
            } else {
              const center = text.length / 2;
              shouldReveal = Math.abs(index - center) > (text.length / 2) - (iteration / 2);
            }

            if (shouldReveal || letter === ' ') {
              return letter;
            }
            return getRandomChar();
          })
          .join('')
      );

      iteration += 1 / maxIterations;

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
        setHasAnimated(true);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'view' && !hasAnimated) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate();
          }
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [animateOn, hasAnimated]);

  return (
    <motion.span
      ref={containerRef}
      className={parentClassName}
      onMouseEnter={() => animateOn === 'hover' && animate()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className={`${className} ${isAnimating ? encryptedClassName : ''}`}>
        {displayText}
      </span>
    </motion.span>
  );
}

