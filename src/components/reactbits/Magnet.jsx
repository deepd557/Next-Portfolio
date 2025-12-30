'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Magnet component from ReactBits - https://www.reactbits.dev/
export default function Magnet({
  children,
  className = '',
  padding = 100,
  disabled = false,
  magnetStrength = 0.5,
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (disabled) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({
      x: middleX * magnetStrength,
      y: middleY * magnetStrength,
    });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
      style={{ padding }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

