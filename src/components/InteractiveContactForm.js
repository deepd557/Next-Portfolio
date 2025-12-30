'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendEmailAPI } from '../utils/emailService';
import { validateContactForm } from '../utils/formValidator';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function InteractiveContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await sendEmailAPI(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focused: { 
      scale: 1.02, 
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
      borderColor: "#3b82f6"
    },
    unfocused: { 
      scale: 1, 
      boxShadow: "0 0 0 0px rgba(59, 130, 246, 0)",
      borderColor: "#e5e7eb"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-base-100 to-base-200 p-8 rounded-2xl shadow-2xl border border-primary/10"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mb-4"
        >
          <PaperAirplaneIcon className="h-8 w-8 text-white" />
        </motion.div>
        <h3 className="text-3xl font-bold text-base-content mb-2">
          Let's <span className="gradient-text">Connect</span>
        </h3>
        <p className="text-base-content/70">
          Send me a message and I'll get back to you within 24 hours
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="p-4 bg-success/10 border border-success/20 rounded-lg flex items-center"
            >
              <CheckCircleIcon className="h-5 w-5 text-success mr-3" />
              <span className="text-success font-medium">
                Message sent successfully! I'll get back to you soon.
              </span>
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-center"
            >
              <ExclamationTriangleIcon className="h-5 w-5 text-error mr-3" />
              <span className="text-error font-medium">
                Failed to send message. Please try again or contact me directly.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={inputVariants}
            animate={focusedField === 'name' ? 'focused' : 'unfocused'}
            transition={{ duration: 0.2 }}
          >
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <motion.input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                errors.name ? 'border-error' : 'border-base-300'
              }`}
              placeholder="Your full name"
              whileFocus={{ scale: 1.02 }}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-error text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={inputVariants}
            animate={focusedField === 'email' ? 'focused' : 'unfocused'}
            transition={{ duration: 0.2 }}
          >
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 ${
                errors.email ? 'border-error' : 'border-base-300'
              }`}
              placeholder="your.email@example.com"
              whileFocus={{ scale: 1.02 }}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-error text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          variants={inputVariants}
          animate={focusedField === 'phone' ? 'focused' : 'unfocused'}
          transition={{ duration: 0.2 }}
        >
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <motion.input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all duration-200 ${
              errors.phone ? 'border-error' : 'border-base-300'
            }`}
            placeholder="+1 (555) 123-4567"
            whileFocus={{ scale: 1.02 }}
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-error text-sm mt-1"
              >
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={inputVariants}
          animate={focusedField === 'message' ? 'focused' : 'unfocused'}
          transition={{ duration: 0.2 }}
        >
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message *
          </label>
          <motion.textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none resize-none transition-all duration-200 ${
              errors.message ? 'border-error' : 'border-base-300'
            }`}
            placeholder="Tell me about your project..."
            whileFocus={{ scale: 1.02 }}
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-error text-sm mt-1"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 px-6 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
        >
          <motion.div
            className="flex items-center justify-center"
            animate={isSubmitting ? { opacity: 0.7 } : { opacity: 1 }}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                />
                Sending Message...
              </>
            ) : (
              <>
                <SparklesIcon className="h-5 w-5 mr-2" />
                Send Message
              </>
            )}
          </motion.div>
          
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </form>
    </motion.div>
  );
}



