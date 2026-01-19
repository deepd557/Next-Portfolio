'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnimationWrapper from '../../components/AnimationWrapper';
import { 
  UserIcon, 
  AcademicCapIcon, 
  BriefcaseIcon,
  CodeBracketIcon,
  HeartIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const timelineRef = useRef();
  const skillsRef = useRef();
  const valuesRef = useRef();

  useEffect(() => {
    // Timeline animation
    gsap.from('.timeline-item', {
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 80%',
      },
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Skills animation
    gsap.from('.skill-badge', {
      scrollTrigger: {
        trigger: skillsRef.current,
        start: 'top 80%',
      },
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    });

    // Values animation
    gsap.from('.value-card', {
      scrollTrigger: {
        trigger: valuesRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const timeline = [
    {
      year: '2020',
      title: 'Started Web Development',
      description: 'Began my journey into web development with HTML, CSS, and JavaScript.',
      icon: CodeBracketIcon
    },
    {
      year: '2021',
      title: 'React & Node.js',
      description: 'Dived deep into React ecosystem and backend development with Node.js.',
      icon: AcademicCapIcon
    },
    {
      year: '2022',
      title: 'Full-Stack Projects',
      description: 'Built several full-stack applications and started freelancing.',
      icon: BriefcaseIcon
    },
    {
      year: '2023',
      title: 'Advanced Technologies',
      description: 'Mastered Next.js, TypeScript, and modern development practices.',
      icon: LightBulbIcon
    }
  ];

  const skills = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'MongoDB',
    'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Docker', 'AWS'
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'I believe in writing clean, maintainable code that stands the test of time.',
      icon: HeartIcon
    },
    {
      title: 'Continuous Learning',
      description: 'Always staying updated with the latest technologies and best practices.',
      icon: AcademicCapIcon
    },
    {
      title: 'User-Centric',
      description: 'Every decision is made with the end user in mind for the best experience.',
      icon: UserIcon
    }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimationWrapper className="text-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                {/* Outer glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Image container with filters */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl mx-auto group">
                  {/* Image with filters */}
                  <motion.img
                    src="/images/profile.jpg"
                    alt="Profile Photo"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    style={{
                      filter: 'brightness(1.05) contrast(1.1) saturate(1.15)',
                    }}
                    whileHover={{
                      filter: 'brightness(1.1) contrast(1.15) saturate(1.2)',
                    }}
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
                    }}
                  />
                  
                  {/* Overlay gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                
                {/* Decorative animated ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Inner decorative dots */}
                <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full animate-pulse" />
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto mb-8">
              I'm a passionate full-stack developer with a love for creating 
              beautiful, functional, and user-friendly web applications.
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimationWrapper className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                My <span className="gradient-text">Story</span>
              </h2>
            </AnimationWrapper>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <p className="text-lg text-base-content/80 leading-relaxed">
                  My journey into web development started with curiosity about how websites work. 
                  What began as a hobby quickly became a passion that drives me to create 
                  exceptional digital experiences.
                </p>
                <p className="text-lg text-base-content/80 leading-relaxed">
                  I specialize in modern web technologies and have a particular love for 
                  React, Next.js, and the entire JavaScript ecosystem. I believe in writing 
                  clean, maintainable code and always strive to learn new technologies.
                </p>
                <p className="text-lg text-base-content/80 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, 
                  contributing to open source projects, or sharing knowledge with the 
                  developer community.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Profile Image in Story Section */}
                <div className="relative group">
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.4, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Image container */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
                    <motion.img
                      src="/images/profile.jpg"
                      alt="About Me"
                      className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                      style={{
                        filter: 'brightness(1.05) contrast(1.1) saturate(1.1)',
                      }}
                      whileHover={{
                        filter: 'brightness(1.08) contrast(1.15) saturate(1.15)',
                      }}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop";
                      }}
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-primary/30 rounded-lg rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-accent/30 rounded-lg rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative lg:col-span-2 mt-8"
              >
                <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-2xl">
                  <div className="bg-base-100 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Years of Experience</span>
                        <span className="font-bold text-primary">3+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Projects Completed</span>
                        <span className="font-bold text-primary">10+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Happy Clients</span>
                        <span className="font-bold text-primary">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coffee Consumed</span>
                        <span className="font-bold text-primary">∞</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20">
        <div className="container mx-auto px-4">
          <AnimationWrapper className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              My <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              A timeline of my professional development and key milestones.
            </p>
          </AnimationWrapper>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="timeline-item relative flex items-center mb-12"
                >
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-base-100 shadow-lg" />
                  <div className="ml-16 bg-base-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center mb-3">
                      <item.icon className="h-6 w-6 text-primary mr-3" />
                      <span className="text-primary font-bold text-lg">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-base-content/70">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <AnimationWrapper className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life.
            </p>
          </AnimationWrapper>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="skill-badge bg-primary text-primary-content px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20">
        <div className="container mx-auto px-4">
          <AnimationWrapper className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              My <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              The principles that guide my work and approach to development.
            </p>
          </AnimationWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="value-card bg-base-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-base-content/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}



