'use client';

import { motion } from 'framer-motion';
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
  const elements = [
    { Icon: CodeBracketIcon, delay: 0, duration: 4 },
    { Icon: RocketLaunchIcon, delay: 0.5, duration: 5 },
    { Icon: StarIcon, delay: 1, duration: 3 },
    { Icon: HeartIcon, delay: 1.5, duration: 4.5 },
    { Icon: FireIcon, delay: 2, duration: 3.5 },
    { Icon: BoltIcon, delay: 2.5, duration: 4 },
    { Icon: SparklesIcon, delay: 3, duration: 3.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map(({ Icon, delay, duration }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/20"
          initial={{ 
            x: Math.random() * window?.innerWidth || 1000,
            y: Math.random() * window?.innerHeight || 800,
            rotate: 0,
            scale: 0.5
          }}
          animate={{
            x: Math.random() * (window?.innerWidth || 1000),
            y: Math.random() * (window?.innerHeight || 800),
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
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <Icon className="h-8 w-8 md:h-12 md:w-12" />
        </motion.div>
      ))}
    </div>
  );
}



