'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnimationWrapper from '../../components/AnimationWrapper';
import InteractiveContactForm from '../../components/InteractiveContactForm';
import ParticleBackground from '../../components/ParticleBackground';
import FloatingElements from '../../components/FloatingElements';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();
  const contactInfoRef = useRef();

  useEffect(() => {
    // Contact info animation
    gsap.from('.contact-info-item', {
      scrollTrigger: {
        trigger: contactInfoRef.current,
        start: 'top 80%',
      },
      x: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // Form animation
    gsap.from('.form-section', {
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 80%',
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
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

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email',
      value: 'your.email@example.com',
      description: 'Send me an email anytime'
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Call me for urgent matters'
    },
    {
      icon: MapPinIcon,
      title: 'Location',
      value: 'Your City, Country',
      description: 'Available for remote work'
    },
    {
      icon: ClockIcon,
      title: 'Response Time',
      value: 'Within 24 hours',
      description: 'I typically respond quickly'
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 relative overflow-hidden">
      <Header />
      
      {/* Interactive Background */}
      <ParticleBackground />
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimationWrapper className="text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold font-display mb-6"
              whileInView={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.6 }}
            >
              Get In <span className="gradient-text">Touch</span>
            </motion.h1>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto mb-8">
              Have a project in mind? Let's discuss how we can work together 
              to bring your ideas to life.
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div ref={contactInfoRef} className="space-y-8">
                <AnimationWrapper>
                  <h2 className="text-4xl font-bold font-display mb-6">
                    Let's <span className="gradient-text">Connect</span>
                  </h2>
                  <p className="text-lg text-base-content/70 mb-8">
                    I'm always interested in hearing about new projects and opportunities. 
                    Feel free to reach out using any of the methods below.
                  </p>
                </AnimationWrapper>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="contact-info-item bg-base-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                          <p className="text-primary font-medium mb-1">{info.value}</p>
                          <p className="text-base-content/70 text-sm">{info.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Interactive Contact Form */}
              <div ref={formRef} className="form-section">
                <InteractiveContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
