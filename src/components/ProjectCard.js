'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { 
  EyeIcon, 
  CodeBracketIcon, 
  ArrowTopRightOnSquareIcon,
  TagIcon 
} from '@heroicons/react/24/outline';

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies, 
  liveUrl, 
  githubUrl,
  featured = false 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const tl = gsap.timeline({ paused: true });
    
    tl.to(card, {
      y: -10,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });

    const handleMouseEnter = () => {
      setIsHovered(true);
      tl.play();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      tl.reverse();
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative group cursor-pointer ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Overlay Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center space-x-4"
          >
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-primary/90 text-primary-content rounded-full hover:bg-primary transition-colors duration-200"
              >
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </motion.a>
            )}
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-base-content/90 text-base-100 rounded-full hover:bg-base-content transition-colors duration-200"
              >
                <CodeBracketIcon className="h-5 w-5" />
              </motion.a>
            )}
          </motion.div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-accent text-accent-content px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-base-content/70 mb-4 line-clamp-3">
            {description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md"
              >
                <TagIcon className="h-3 w-3 mr-1" />
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-primary text-primary-content px-4 py-2 rounded-lg text-center font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                <EyeIcon className="h-4 w-4 inline mr-2" />
                View Live
              </motion.a>
            )}
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 border border-primary text-primary px-4 py-2 rounded-lg text-center font-medium hover:bg-primary hover:text-primary-content transition-colors duration-200"
              >
                <CodeBracketIcon className="h-4 w-4 inline mr-2" />
                Code
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
