import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Randomly increase progress to simulate real loading
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        // Wait a tiny bit at 100% before sliding up
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = 'auto';
        }, 400);
      }
      setProgress(currentProgress);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999999] bg-[#0a0a0a] flex flex-col items-center justify-center text-white"
        >
          {/* Logo or Brand Name */}
          <div className="overflow-hidden mb-12">
            <motion.h1 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-4xl md:text-7xl font-display uppercase tracking-[0.2em] font-bold text-center"
            >
              Limited<br/><span className="text-red-600">Edition</span>
            </motion.h1>
          </div>

          {/* Progress Bar Container */}
          <div className="w-64 md:w-96 h-[2px] bg-white/10 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-red-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>

          {/* Percentage */}
          <div className="mt-6 font-mono text-xs tracking-[0.3em] text-white/50 flex w-64 md:w-96 justify-between">
            <span>LOADING EXPERIENCE</span>
            <span>{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
