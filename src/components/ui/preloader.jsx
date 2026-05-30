import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Reset state on route change
    setLoading(true);
    setProgress(0);

    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Simulate real loading
      currentProgress += Math.floor(Math.random() * 20) + 10; // slightly faster for internal routing
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        // Wait a tiny bit at 100% before sliding up
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = 'auto';
        }, 200);
      }
      setProgress(currentProgress);
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          style={{ transformOrigin: 'top' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999999] bg-[#000] flex flex-col items-center justify-center gap-[18px]"
        >
          {/* Logo */}
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '28px', letterSpacing: '.1em',
              color: '#fff', textAlign: 'center',
            }}
          >
            LIMITED <span style={{ color: '#ef4444' }}>EDITION</span>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '11px', letterSpacing: '.5em',
              color: 'rgba(255,255,255,0.3)',
              display: 'block', marginTop: '3px',
            }}>
              STUDIO
            </span>
          </div>

          {/* Progress Bar Container */}
          <div style={{ width: '140px', height: '1px', background: 'rgba(255,255,255,0.07)', borderRadius: '1px', overflow: 'hidden' }}>
            <motion.div 
              style={{
                height: '100%',
                background: 'linear-gradient(to right, rgba(239,68,68,0.4), #ef4444)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          {/* Percentage */}
          <div style={{ fontSize: '9px', letterSpacing: '.14em', color: 'rgba(255,255,255,0.2)' }}>
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
