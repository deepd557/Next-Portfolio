'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProjectCard from '../../components/ProjectCard';
import AnimationWrapper from '../../components/AnimationWrapper';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const projectsRef = useRef();

  const categories = ['all', 'web', 'mobile', 'fullstack', 'design'];

  // Demo project data - Replace images and URLs with your own
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A comprehensive e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, inventory management, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop', // DEMO: Replace with your project screenshot
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      category: 'fullstack',
      liveUrl: '#', // DEMO: Add your live URL
      githubUrl: '#', // DEMO: Add your GitHub URL
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop', // DEMO: Replace with your project screenshot
      technologies: ['Next.js', 'Socket.io', 'PostgreSQL', 'Prisma'],
      category: 'web',
      liveUrl: '#', // DEMO: Add your live URL
      githubUrl: '#', // DEMO: Add your GitHub URL
      featured: false
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Modern portfolio website with smooth animations, responsive design, and optimized performance using Next.js and Framer Motion.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop', // DEMO: Replace with your project screenshot
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'GSAP'],
      category: 'web',
      liveUrl: '#', // DEMO: Add your live URL
      githubUrl: '#', // DEMO: Add your GitHub URL
      featured: false
    },
    {
      id: 4,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication, transaction history, and real-time notifications.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop', // DEMO: Replace with your project screenshot
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT'],
      category: 'mobile',
      liveUrl: '#', // DEMO: Add your live URL
      githubUrl: '#', // DEMO: Add your GitHub URL
      featured: true
    },
    {
      id: 5,
      title: 'UI/UX Design System',
      description: 'Comprehensive design system with reusable components, style guide, and design tokens for consistent user experiences.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop', // DEMO: Replace with your project screenshot
      technologies: ['Figma', 'Storybook', 'React', 'TypeScript'],
      category: 'design',
      liveUrl: '#', // DEMO: Add your live URL
      githubUrl: '#', // DEMO: Add your GitHub URL
      featured: false
    },
    {
      id: 6,
      title: 'Real-time Chat App',
      description: 'Real-time messaging application with file sharing, emoji reactions, and group chat functionality.',
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop', // DEMO: Replace with your project screenshot
      technologies: ['React', 'Socket.io', 'Express', 'MongoDB'],
      category: 'web',
      liveUrl: '#', // DEMO: Add your live URL
      githubUrl: '#', // DEMO: Add your GitHub URL
      featured: false
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    // Projects animation
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: projectsRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, [filteredProjects]);

  return (
    <div className="min-h-screen bg-base-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimationWrapper className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto mb-8">
              A collection of my recent work showcasing different technologies, 
              design patterns, and problem-solving approaches.
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-base-100"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                      filter === category
                        ? 'bg-primary text-primary-content'
                        : 'bg-base-100 text-base-content hover:bg-primary/10'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="project-card"
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      technologies={project.technologies}
                      liveUrl={project.liveUrl}
                      githubUrl={project.githubUrl}
                      featured={project.featured}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <AnimationWrapper className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <FunnelIcon className="h-16 w-16 text-base-content/30 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">No projects found</h3>
                  <p className="text-base-content/70">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                </div>
              </AnimationWrapper>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimationWrapper className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                Project <span className="gradient-text">Statistics</span>
              </h2>
              <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                Numbers that reflect my dedication and experience in web development.
              </p>
            </AnimationWrapper>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: '50+', label: 'Projects Completed' },
                { number: '30+', label: 'Happy Clients' },
                { number: '15+', label: 'Technologies Used' },
                { number: '100%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center bg-base-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-base-content/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <AnimationWrapper>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">
              Interested in Working Together?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how we can bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-white btn-lg px-8 py-3 text-lg font-semibold"
              >
                <ArrowTopRightOnSquareIcon className="h-6 w-6 mr-2" />
                Start a Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline btn-white btn-lg px-8 py-3 text-lg font-semibold"
              >
                <CodeBracketIcon className="h-6 w-6 mr-2" />
                View Code
              </motion.button>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      <Footer />
    </div>
  );
}
