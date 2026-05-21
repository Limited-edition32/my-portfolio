import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [onCard, setOnCard]         = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [pillLabel, setPillLabel]   = useState('View Project');

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // dot — instantaneous (most accurate)
  const dotX = mouseX;
  const dotY = mouseY;

  // ring — snappier lag
  const ringX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.1 });

  // pill — smooth but fast follow
  const pillX = useSpring(mouseX, { stiffness: 400, damping: 30, mass: 0.15 });
  const pillY = useSpring(mouseY, { stiffness: 400, damping: 30, mass: 0.15 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const over = (e) => {
      const t = e.target;

      // project card
      const projectCard = t.closest('[data-cursor="view-projects"]');
      if (projectCard) {
        setOnCard(true);
        setIsHovering(false);
        setPillLabel('View Project');
        return;
      }

      // service card
      const serviceCard = t.closest('[data-cursor="view-service"]');
      if (serviceCard) {
        setOnCard(true);
        setIsHovering(false);
        setPillLabel('Learn More');
        return;
      }

      setOnCard(false);

      // normal hover (links / buttons)
      const hoverable =
        t.tagName?.toLowerCase() === 'a'      ||
        t.tagName?.toLowerCase() === 'button' ||
        t.closest('a')                        ||
        t.closest('button')                   ||
        t.classList.contains('cursor-pointer');

      setIsHovering(!!hoverable);
    };

    const down = () => setIsClicking(true);
    const up   = () => setIsClicking(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup',   up);

    const style = document.createElement('style');
    style.innerHTML = '* { cursor: none !important; }';
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup',   up);
      document.head.removeChild(style);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* ── White outer ring ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999998] rounded-full border border-white/50"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width:       onCard ? 0     : isHovering ? '40px' : '26px',
          height:      onCard ? 0     : isHovering ? '40px' : '26px',
          opacity:     onCard ? 0     : 1,
          scale:       isClicking ? 0.75 : 1,
          borderColor: isHovering
            ? 'rgba(255,255,255,0.85)'
            : 'rgba(255,255,255,0.45)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />

      {/* ── Red center dot ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999999] rounded-full bg-red-500"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width:   onCard ? 0   : isHovering ? '6px' : '5px',
          height:  onCard ? 0   : isHovering ? '6px' : '5px',
          opacity: onCard ? 0   : 1,
          scale:   isClicking ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />

      {/* ── Liquid glass pill ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[1000000] flex items-center justify-center gap-[6px] overflow-hidden rounded-full"
        style={{
          x: pillX,
          y: pillY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '0.5px solid rgba(255,255,255,0.2)',
          boxShadow: '0 2px 32px rgba(0,0,0,0.45), inset 0 0.5px 0 rgba(255,255,255,0.22)',
        }}
        animate={{
          width:   onCard ? 148 : 10,
          height:  onCard ? 40  : 10,
          opacity: onCard ? 1   : 0,
          scale:   isClicking ? 0.94 : 1,
        }}
        transition={{
          width:   { type: 'spring', stiffness: 320, damping: 28 },
          height:  { type: 'spring', stiffness: 320, damping: 28 },
          opacity: { duration: 0.2 },
          scale:   { type: 'spring', stiffness: 400, damping: 25 },
        }}
      >
        <AnimatePresence>
          {onCard && (
            <motion.div
              className="flex items-center gap-[6px] whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.18, duration: 0.18 }}
            >
              <span className="w-[6px] h-[6px] rounded-full bg-red-500 flex-shrink-0" />
              <span
                className="text-white font-medium tracking-wide"
                style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif' }}
              >
                {pillLabel}
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>↗</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;
