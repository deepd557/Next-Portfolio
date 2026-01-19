'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  CodeBracketIcon,
  RocketLaunchIcon,
  StarIcon,
  HeartIcon,
  FireIcon,
  BoltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function FloatingElements() {
  const [isMounted, setIsMounted] = useState(false);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    const icons = [
      CodeBracketIcon,
      RocketLaunchIcon,
      StarIcon,
      HeartIcon,
      FireIcon,
      BoltIcon,
      SparklesIcon
    ];

    const generatedElements = icons.map((Icon, index) => ({
      Icon,
      delay: index * 0.5,
      duration: 3 + Math.random() * 2,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));

    setElements(generatedElements);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map(({ Icon, delay, duration, initialX, initialY, targetX, targetY, left, top }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/20"
          initial={{
            x: initialX,
            y: initialY,
            rotate: 0,
            scale: 0.5
          }}
          animate={{
            x: targetX,
            y: targetY,
            rotate: 360,
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left,
            top,
          }}
        >
          <Icon className="h-8 w-8 md:h-12 md:w-12" />
        </motion.div>
      ))}
    </div>
  );
}



