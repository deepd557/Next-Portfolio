'use client';

import { motion } from 'framer-motion';

// GradientText component from ReactBits - https://www.reactbits.dev/
export default function GradientText({
  children,
  className = '',
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
  animationSpeed = 8,
  showBorder = false,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    backgroundSize: '300% 100%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={gradientStyle}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: animationSpeed,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      {showBorder && (
        <span
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to right, ${colors.join(', ')})`,
            backgroundSize: '300% 100%',
            padding: '2px',
            zIndex: -1,
          }}
        />
      )}
      {children}
    </motion.span>
  );
}

