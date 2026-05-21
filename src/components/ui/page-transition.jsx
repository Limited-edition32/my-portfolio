// page-transition.jsx
// Wrap each page with this component for smooth route transitions

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// ─── Page Transition Wrapper ───────────────────────────────────────────────
export const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Cinematic wipe overlay */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ originX: 1 }}
          className="fixed inset-0 z-[100] bg-red-900 pointer-events-none"
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Usage in App.jsx ──────────────────────────────────────────────────────
// Wrap your <Routes> like this:
//
// import { PageTransition } from '@/components/ui/page-transition';
//
// <PageTransition>
//   <Routes>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/about" element={<AboutPage />} />
//   </Routes>
// </PageTransition>


// ─── Typewriter Hook ───────────────────────────────────────────────────────
// Add this to your hero to animate "limited edition" letter by letter
import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed = 80, startDelay = 800) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
};

// ─── Usage in aether-flow-hero.jsx ────────────────────────────────────────
// Replace your static h1 with:
//
// import { useTypewriter } from '@/components/ui/page-transition';
//
// const { displayed, done } = useTypewriter('limited edition', 90, 600);
//
// <h1 className="text-6xl md:text-9xl font-semibold tracking-tighter mb-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
//   {displayed}
//   {!done && (
//     <motion.span
//       animate={{ opacity: [1, 0] }}
//       transition={{ duration: 0.5, repeat: Infinity }}
//       className="inline-block w-1 h-[0.85em] bg-red-500 ml-1 align-middle"
//     />
//   )}
// </h1>


// ─── Text Scramble Hook ────────────────────────────────────────────────────
// Alternative: scramble effect (like a hacker glitch). Great for section headings.
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

export const useScramble = (finalText, duration = 1200, startDelay = 0) => {
  const [text, setText] = useState('');

  useEffect(() => {
    let startTime = null;
    let rafId;
    let started = false;

    const start = () => {
      started = true;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const resolvedCount = Math.floor(progress * finalText.length);
        let result = '';
        for (let i = 0; i < finalText.length; i++) {
          if (finalText[i] === ' ') {
            result += ' ';
          } else if (i < resolvedCount) {
            result += finalText[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setText(result);

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        } else {
          setText(finalText);
        }
      };
      rafId = requestAnimationFrame(animate);
    };

    const timeout = setTimeout(start, startDelay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, [finalText, duration, startDelay]);

  return text;
};

// ─── Usage example ─────────────────────────────────────────────────────────
// import { useScramble } from '@/components/ui/page-transition';
//
// In your About section heading:
// const scrambled = useScramble('K.Sai Pavan', 1000, 300);
// <h2 className="text-6xl md:text-8xl font-normal tracking-tight font-display">
//   {scrambled}
// </h2>
