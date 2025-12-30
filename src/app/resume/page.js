'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnimationWrapper from '../../components/AnimationWrapper';
import { ArrowDownTrayIcon, DocumentIcon } from '@heroicons/react/24/outline';

export default function ResumePage() {
  const viewerRef = useRef();

  useEffect(() => {
    // Ensure the container adapts to viewport height on mobile address bar changes
    const handleResize = () => {
      if (viewerRef.current) {
        viewerRef.current.style.height = `${window.innerHeight - 200}px`;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <Header />

      <section className="relative py-12 md:py-16">
        <div className="container mx-auto px-4">
          <AnimationWrapper className="text-center mb-8">
            <motion.h1
              className="text-4xl md:text-5xl font-bold font-display mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              My <span className="gradient-text">Resume</span>
            </motion.h1>
            <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
              View or download my latest resume. Drop your PDF as <code>public/resume.pdf</code>.
            </p>
          </AnimationWrapper>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <DocumentIcon className="h-5 w-5 mr-2" /> Open in new tab
            </a>
            <a
              href="/resume.pdf"
              download
              className="btn btn-outline"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" /> Download PDF
            </a>
          </div>

          <div className="bg-base-200 rounded-xl shadow-lg overflow-hidden">
            {/* Embedded PDF viewer (works in most browsers) */}
            <div ref={viewerRef} className="w-full" style={{ height: '70vh' }}>
              <object data="/resume.pdf" type="application/pdf" className="w-full h-full">
                <iframe src="/resume.pdf" className="w-full h-full" title="Resume PDF" />
              </object>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}




