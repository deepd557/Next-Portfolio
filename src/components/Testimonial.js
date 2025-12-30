'use client';

import { motion } from 'framer-motion';
import { StarIcon, QuoteIcon } from '@heroicons/react/24/solid';

export default function Testimonial({ 
  name, 
  role, 
  company, 
  content, 
  avatar, 
  rating = 5 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-base-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Quote Icon */}
      <div className="mb-4">
        <QuoteIcon className="h-8 w-8 text-primary/20" />
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <StarIcon className="h-5 w-5 text-yellow-400" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-base-content/80 mb-6 italic leading-relaxed">
        "{content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-full overflow-hidden mr-4"
        >
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div>
          <h4 className="font-semibold text-base-content">{name}</h4>
          <p className="text-sm text-base-content/70">
            {role} at {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}



