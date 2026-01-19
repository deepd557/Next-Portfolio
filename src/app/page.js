'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimationWrapper from '../components/AnimationWrapper';
import ParticleBackground from '../components/ParticleBackground';
import FloatingElements from '../components/FloatingElements';
import InteractiveContactForm from '../components/InteractiveContactForm';

// ReactBits Animation Components - https://www.reactbits.dev/
import { 
  SplitText, 
  BlurText, 
  GradientText, 
  DecryptedText,
  RotatingText,
  Aurora,
  SpotlightCard,
  Magnet,
  TiltCard,
  LettersPullUp,
  WordsPullUp
} from '../components/reactbits';

import { 
  CodeBracketIcon, 
  RocketLaunchIcon, 
  ChevronDownIcon,
  PlayIcon,
  SparklesIcon,
  HeartIcon,
  FireIcon,
  BoltIcon,
  ArrowDownTrayIcon,
  LinkIcon,
  ClipboardDocumentIcon,
  ShareIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef();
  const skillsRef = useRef();
  const projectsRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Mouse tracking for interactive effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Hero animation with enhanced effects
    const tl = gsap.timeline();
    tl.from('.hero-title', { 
      y: 100, 
      opacity: 0, 
      duration: 1.2, 
      ease: 'power3.out',
      rotationX: 15
    })
    .from('.hero-subtitle', { 
      y: 50, 
      opacity: 0, 
      duration: 1, 
      ease: 'power3.out' 
    }, '-=0.8')
    .from('.hero-buttons', { 
      y: 30, 
      opacity: 0, 
      duration: 0.8, 
      ease: 'power3.out' 
    }, '-=0.5')
    .from('.floating-elements', {
      scale: 0,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.3');

    // Enhanced skills animation
    gsap.from('.skill-item', {
      scrollTrigger: {
        trigger: skillsRef.current,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // Enhanced projects animation
    gsap.from('.project-item', {
      scrollTrigger: {
        trigger: projectsRef.current,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      rotationY: 15,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const skills = [
    { name: 'React', level: 95, color: 'bg-blue-500' },
    { name: 'Next.js', level: 90, color: 'bg-gray-800' },
    { name: 'TypeScript', level: 85, color: 'bg-blue-600' },
    { name: 'Tailwind CSS', level: 92, color: 'bg-cyan-500' },
    { name: 'Node.js', level: 88, color: 'bg-green-600' },
    { name: 'Python', level: 80, color: 'bg-yellow-500' },
  ];

  // Demo project data - Replace images with your own project screenshots
  const projects = [
    {
      title: 'IronTrac - Asset Lifecycle Management Platform',
      description: 'Enterprise-grade platform managing the complete iron asset lifecycle from creation to NDT recertification. Built with Angular and .NET, featuring asset tracking, digital certifications, field operations management, and real-time inventory control. Integrated QR code tagging, mobile app, and comprehensive reporting system.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      technologies: ['Angular', '.NET Core', 'SQL Server', 'REST APIs', 'Mobile App', 'QR Code Integration', 'Entity Framework'],
      featured: true,
      liveUrl: 'https://www.irontrac.com',
      githubUrl: null,
    },
    {
      title: 'AMPVIDA - AI-Powered Personal Health Coach',
      description: 'AI-based personal healthcare assistant service with intelligent wellness coaching. Built with Next.js and AWS services, featuring real-time health tracking (sleep, heart rate, steps, calories, water intake), interactive AI chat interface, personalized health insights, and comprehensive wellness dashboard. Integrated AWS Cognito for secure authentication and GraphQL API for efficient data management.',
      image: '/images/healtech.png',
      technologies: ['Next.js', 'AWS Cognito', 'GraphQL', 'AWS Services', 'AI/ML', 'Health Tracking', 'Real-time Data'],
      featured: true,
      liveUrl: null,
      githubUrl: null,
    },
    {
      title: 'FixeMotor - Vehicle Garage Management ERP',
      description: 'End-to-end ERP solution for complete vehicle garage management flow. Built with React.js and .NET Core, featuring service center management, customer booking system, location-based service search, digital workshop management (FixoPro), real-time service tracking, and comprehensive garage operations dashboard. Integrated SQL database for efficient data management and scalable architecture.',
      image: '/images/fixomotor.png',
      technologies: ['React.js', '.NET Core', 'SQL Server', 'REST APIs', 'ERP System', 'Location Services', 'Service Management'],
      featured: true,
      liveUrl: 'https://fixomotor.in/',
      githubUrl: null,
    },
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      featured: false,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      technologies: ['Next.js', 'Socket.io', 'PostgreSQL'],
      featured: false,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
    },
    {
      title: 'Portfolio Website',
      description: 'Modern portfolio website with animations and responsive design',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
      featured: false,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
    }
  ];

  // Copy and Share functionality state
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [showCopyPopup, setShowCopyPopup] = useState(false);

  const handleCopyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setShowCopyPopup(true);
      setTimeout(() => {
        setShowCopyPopup(false);
        setCopiedUrl(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async (project) => {
    const shareData = {
      title: project.title,
      text: project.description,
      url: project.liveUrl || project.githubUrl,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to copy
        handleCopyUrl(shareData.url);
      }
    } catch (err) {
      // User cancelled or error occurred, fallback to copy
      if (err.name !== 'AbortError') {
        handleCopyUrl(shareData.url);
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-100 relative overflow-hidden">
      <Header />
      
      {/* Interactive Background */}
      <ParticleBackground />
      <FloatingElements />
      
      {/* Ultra-Modern Hero Section */}
      <motion.section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y, opacity }}
      >
        {/* Sophisticated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        
        {/* Animated Geometric Shapes */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 border border-blue-400/30 rotate-45"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-32 w-40 h-40 border-2 border-cyan-400/40 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Glassmorphism Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10" />
        
        {/* Mouse-following glow effect */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 15
          }}
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Modern Typography */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title"
          >
            <motion.div
              className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="text-sm font-medium text-white/80">Available for work</span>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold font-display mb-6 leading-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Full Stack
              </motion.span>
              <br />
              <motion.span 
                className="text-white"
                whileHover={{ color: "#60a5fa" }}
                transition={{ duration: 0.3 }}
              >
                Developer
              </motion.span>
            </motion.h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            <motion.p
              className="text-white mb-3 font-medium"
              style={{
                textShadow: '0 2px 15px rgba(0, 0, 0, 0.6), 0 4px 25px rgba(0, 0, 0, 0.4)'
              }}
            >
              Building{' '}
              <motion.span
                className="text-blue-300 font-semibold"
                whileHover={{ 
                  color: "#60a5fa",
                  textShadow: '0 0 15px rgba(96, 165, 250, 0.6)'
                }}
                transition={{ duration: 0.3 }}
              >
                end-to-end solutions
              </motion.span>
              {' '}with modern{' '}
              <motion.span
                className="text-purple-300 font-semibold"
                whileHover={{ 
                  color: "#a78bfa",
                  textShadow: '0 0 15px rgba(167, 139, 250, 0.6)'
                }}
                transition={{ duration: 0.3 }}
              >
                frontend and backend
              </motion.span>
              {' '}technologies.
            </motion.p>
            <br className="hidden md:block" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white font-medium"
              style={{
                textShadow: '0 2px 15px rgba(0, 0, 0, 0.6), 0 4px 25px rgba(0, 0, 0, 0.4)'
              }}
            >
              <motion.span
                className="text-cyan-300 font-semibold"
                whileHover={{ 
                  color: "#22d3ee",
                  textShadow: '0 0 15px rgba(34, 211, 238, 0.6)'
                }}
                transition={{ duration: 0.3 }}
              >
                Full stack development expertise
              </motion.span>
              {' '}to bring your ideas to life.
            </motion.p>
          </motion.div>
          
          {/* Modern Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              />
              <span className="relative z-10 flex items-center text-lg">
                <RocketLaunchIcon className="h-6 w-6 mr-3" />
                View My Work
              </span>
            </motion.button>
            
            {/* <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)",
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-semibold rounded-2xl border border-white/20 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              />
              <span className="relative z-10 flex items-center text-lg">
                <PlayIcon className="h-6 w-6 mr-3" />
                Watch Demo
              </span>
            </motion.button> */}

            <motion.button
              onClick={(e) => {
                e.preventDefault();
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              whileHover={{ 
                scale: 1.05,
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-transparent text-white/80 font-semibold rounded-2xl border border-white/30 hover:border-white/60 transition-all duration-300"
            >
              <span className="flex items-center text-lg">
                <ArrowDownTrayIcon className="h-6 w-6 mr-3" />
                Download Resume
              </span>
            </motion.button>
          </motion.div>
        </div>
        
        {/* Modern Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white/60 cursor-pointer group"
            whileHover={{ scale: 1.1, color: "#60a5fa" }}
          >
            <span className="text-sm mb-3 font-medium">Scroll to explore</span>
            <motion.div
              className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
              whileHover={{ borderColor: "#60a5fa" }}
            >
              <motion.div
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Ultra-Modern Skills Section with ReactBits */}
      <section ref={skillsRef} className="py-32 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimationWrapper className="text-center mb-20">
            <motion.div
              className="inline-block mb-6 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full border border-blue-200/50 shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <DecryptedText 
                text="Technical Expertise" 
                className="text-sm font-semibold text-blue-600"
                speed={40}
              />
            </motion.div>
            
            {/* ReactBits LettersPullUp Animation */}
            <h2 className="text-5xl md:text-7xl font-bold font-display mb-8">
              <GradientText 
                colors={['#2563eb', '#7c3aed', '#db2777', '#2563eb']}
                animationSpeed={5}
              >
                <LettersPullUp text="Skills" delay={0.2} />
              </GradientText>
              <span className="text-slate-800 ml-4">
                <LettersPullUp text="& Expertise" delay={0.5} />
              </span>
            </h2>
            <div className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              <WordsPullUp 
                text="Mastering the latest technologies to deliver exceptional digital experiences that push the boundaries of what's possible."
                delay={0.3}
              />
            </div>
          </AnimationWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <TiltCard 
                key={skill.name}
                className="skill-item"
                tiltAmount={10}
                glareEnable={true}
                glareMaxOpacity={0.2}
              >
                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/50 overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                  
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ padding: '2px' }}
                  >
                    <div className="w-full h-full bg-white/80 backdrop-blur-xl rounded-3xl" />
                  </motion.div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                      <motion.h3 
                        className="text-2xl font-bold text-slate-800"
                        whileHover={{ color: "#3b82f6" }}
                        transition={{ duration: 0.3 }}
                      >
                        {skill.name}
                      </motion.h3>
                      <motion.div
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold rounded-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {skill.level}%
                      </motion.div>
                    </div>
                    
                    {/* Modern progress bar */}
                    <div className="relative w-full bg-slate-200 rounded-full h-4 overflow-hidden mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 2, delay: index * 0.1, ease: "easeOut" }}
                        className={`h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 relative overflow-hidden`}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ 
                            duration: 2, 
                            delay: 2 + index * 0.1,
                            repeat: Infinity,
                            repeatDelay: 4
                          }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Skill level indicators */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 font-medium">Proficiency</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < Math.floor(skill.level / 20) 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                                : 'bg-slate-300'
                            }`}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2.5 + index * 0.1 + i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Modern Projects Section with ReactBits */}
      <section ref={projectsRef} className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* ReactBits Aurora Background */}
        <Aurora 
          colorStops={['#1e40af', '#7c3aed', '#be185d']} 
          blend={0.2} 
          amplitude={0.8} 
          speed={0.3}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M20 20c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        {/* Floating Geometric Shapes */}
        <motion.div 
          className="absolute top-20 left-20 w-16 h-16 border border-blue-400/30 rotate-45"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimationWrapper className="text-center mb-20">
            <motion.div
              className="inline-block mb-6 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <DecryptedText 
                text="Featured Work" 
                className="text-sm font-semibold text-white/80"
                speed={40}
              />
            </motion.div>
            
            {/* ReactBits SplitText Animation */}
            <h2 className="text-5xl md:text-7xl font-bold font-display mb-8">
              <span className="text-white">
                <SplitText 
                  text="Featured" 
                  delay={0.2}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                />
              </span>
              <GradientText 
                colors={['#60a5fa', '#a855f7', '#ec4899', '#60a5fa']}
                animationSpeed={4}
                className="ml-4"
              >
                <SplitText 
                  text="Projects" 
                  delay={0.5}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                />
              </GradientText>
            </h2>
            <div className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              <BlurText 
                text="A showcase of innovative projects that demonstrate my expertise in modern web development and creative problem-solving."
                delay={0.6}
                animateBy="words"
              />
            </div>
          </AnimationWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`project-item group relative ${project.featured ? 'md:col-span-2' : ''}`}
              >
                {/* ReactBits SpotlightCard */}
                <SpotlightCard 
                  className="h-full"
                  spotlightColor="rgba(99, 102, 241, 0.4)"
                >
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500">
                    {/* Project Image */}
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Overlay Content */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex space-x-4">
                          <Magnet padding={20} magnetStrength={0.2}>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="px-6 py-3 bg-white/20 backdrop-blur-xl text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300"
                            >
                              View Project
                            </motion.button>
                          </Magnet>
                          <Magnet padding={20} magnetStrength={0.2}>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="px-6 py-3 bg-transparent text-white font-semibold rounded-xl border border-white/50 hover:bg-white/10 transition-all duration-300"
                            >
                              View Code
                            </motion.button>
                          </Magnet>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Content */}
                    <div className="p-8">
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            className="px-4 py-2 bg-white/10 backdrop-blur-xl text-white/80 text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center justify-center gap-3">
                        {/* URL/Open Link Button */}
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                            title="Open URL"
                          >
                            <LinkIcon className="h-5 w-5" />
                          </motion.a>
                        )}

                        {/* Copy URL Button */}
                        {project.liveUrl && (
                          <motion.button
                            onClick={() => handleCopyUrl(project.liveUrl)}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300"
                            title="Copy URL"
                          >
                            {copiedUrl === project.liveUrl ? (
                              <CheckIcon className="h-5 w-5 text-green-400" />
                            ) : (
                              <ClipboardDocumentIcon className="h-5 w-5" />
                            )}
                          </motion.button>
                        )}

                        {/* Share Button */}
                        {(project.liveUrl || project.githubUrl) && (
                          <motion.button
                            onClick={() => handleShare(project)}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300"
                            title="Share"
                          >
                            <ShareIcon className="h-5 w-5" />
                          </motion.button>
                        )}

                        {/* View Code Button */}
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300"
                            title="View Code"
                          >
                            <CodeBracketIcon className="h-5 w-5" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimationWrapper className="text-center mb-16">
            <motion.div
              className="inline-block mb-6 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full border border-purple-200/50 shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-semibold text-purple-600">Client Testimonials</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-bold font-display mb-8">
              <span className="text-slate-800">What People</span>
              <GradientText 
                colors={['#7c3aed', '#db2777', '#2563eb', '#7c3aed']}
                animationSpeed={4}
                className="ml-4"
              >
                Say
              </GradientText>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take my word for it. Here's what clients and colleagues have to say.
            </p>
          </AnimationWrapper>
          
          {/* Demo Testimonials - Replace with your real testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Product Manager',
                company: 'TechCorp',
                content: 'Working with this developer was an absolute pleasure. They delivered beyond our expectations with clean code and beautiful design.',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', // DEMO: Replace with real client photo
                rating: 5
              },
              {
                name: 'Michael Chen',
                role: 'CEO',
                company: 'StartupXYZ',
                content: 'Exceptional technical skills combined with great communication. Our project was delivered on time and exceeded all requirements.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', // DEMO: Replace with real client photo
                rating: 5
              },
              {
                name: 'Emily Davis',
                role: 'Design Lead',
                company: 'CreativeStudio',
                content: 'The attention to detail and understanding of modern UI/UX principles made this collaboration incredibly smooth and successful.',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', // DEMO: Replace with real client photo
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="text-4xl text-purple-300 mb-4">"</div>
                
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-slate-600 mb-6 leading-relaxed italic">
                  {testimonial.content}
                </p>
                
                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-purple-200">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Modern Contact Section with ReactBits */}
      <section className="py-32 bg-gradient-to-br from-white via-slate-50 to-blue-50 relative overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <AnimationWrapper className="text-center mb-20">
              <motion.div
                className="inline-block mb-6 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full border border-blue-200/50 shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <DecryptedText 
                  text="Let's Connect" 
                  className="text-sm font-semibold text-blue-600"
                  speed={40}
                />
              </motion.div>
              
              {/* ReactBits LettersPullUp for Contact Title */}
              <h2 className="text-5xl md:text-7xl font-bold font-display mb-8">
                <span className="text-slate-800">
                  <LettersPullUp text="Ready to" delay={0.2} />
                </span>
                <GradientText 
                  colors={['#2563eb', '#7c3aed', '#db2777', '#2563eb']}
                  animationSpeed={4}
                  className="mx-4"
                >
                  {/* ReactBits RotatingText for dynamic words */}
                  <RotatingText 
                    texts={['Start', 'Build', 'Create', 'Launch']}
                    rotationInterval={2500}
                    className="font-bold"
                  />
                </GradientText>
                <span className="text-slate-800">
                  <LettersPullUp text="Your Project?" delay={0.6} />
                </span>
              </h2>
              <div className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
                <WordsPullUp 
                  text="Let's work together to bring your ideas to life with cutting-edge web technologies."
                  delay={0.3}
                />
                <br className="hidden md:block" />
                <span className="text-slate-500 block mt-2">
                  <BlurText 
                    text="Send me a message and I'll get back to you within 24 hours."
                    delay={0.8}
                    animateBy="words"
                  />
                </span>
              </div>
            </AnimationWrapper>
            
            <InteractiveContactForm />
          </div>
        </div>
      </section>

      {/* Copy URL Popup Notification */}
      <AnimatePresence>
        {showCopyPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border border-white/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckIcon className="h-6 w-6" />
            </motion.div>
            <div>
              <p className="font-semibold">URL Copied!</p>
              <p className="text-sm text-white/90">Link copied to clipboard</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
