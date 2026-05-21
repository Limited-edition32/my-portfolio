import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const softwareLogos = [
  {
    name: 'Premiere Pro',
    highlight: '#E39CFF',
    delay: 0,
    icon: (
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" 
        alt="Premiere Pro" 
        className="w-12 h-12 md:w-16 md:h-16 drop-shadow-2xl" 
      />
    )
  },
  {
    name: 'After Effects',
    highlight: '#9999FF',
    delay: 0.1,
    icon: (
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/960px-Adobe_After_Effects_CC_icon.svg.png" 
        alt="After Effects" 
        className="w-12 h-12 md:w-16 md:h-16 drop-shadow-2xl" 
      />
    )
  },
  {
    name: 'Alight Motion',
    highlight: '#00FFAA',
    delay: 0.2,
    icon: (
      <img 
        src="https://alightpromodi.com/wp-content/uploads/2025/12/Alight-Motion-Logo-PNG-in-HD-512-by-512.png" 
        alt="Alight Motion" 
        className="w-12 h-12 md:w-16 md:h-16 drop-shadow-2xl" 
      />
    )
  },
  {
    name: 'CapCut',
    highlight: '#FFFFFF',
    delay: 0.3,
    icon: (
      <svg viewBox="-2 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16 drop-shadow-2xl">
        <rect x="-2" y="0" width="24" height="24" rx="5" fill="#050505"/>
        <path d="M9.998 12L2 16c0 1.886 0 2.328.586 2.914S4.114 19.5 6 19.5h8c1.886 0 2.828 0 3.414-.586S18 17.886 18 16m-8.002-4l11.998-6M9.998 12L2 8c0-1.386 0-2.328.586-2.914S4.114 4.5 6 4.5h8c1.886 0 2.828 0 3.414.586S18 6.614 18 8m-8.002 4l11.998 6" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    )
  }
];

const FloatingOrbs = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
      {/* Noise overlay for cinematic texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0"></div>
      
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-red-700/30 rounded-full blur-[100px]"
      />
      
      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 70, -50, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-red-800/30 rounded-full blur-[90px]"
      />
      
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, 30, -40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] md:w-[550px] md:h-[550px] bg-red-900/30 rounded-full blur-[110px]"
      />
      
      {/* Grid overlay for cinematic tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] z-0"></div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="bg-black text-white flex flex-col justify-center px-6 md:px-24 py-16 relative overflow-hidden">
      
      {/* Background Animations */}
      <FloatingOrbs />

      <div className="max-w-5xl w-full z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap items-center gap-4 mb-4"
        >
          <h2 className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-white pt-2">
            K.Sai Pavan
          </h2>
          <Link to="/about" className="h-12 w-12 md:h-16 md:w-16 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 flex-shrink-0 group cursor-pointer ml-auto md:ml-0">
            <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 group-hover:rotate-45 transition-transform duration-300" />
          </Link>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-lg md:text-2xl font-display text-red-500 mb-8 font-medium tracking-wide"
        >
          Visual Storyteller & Cinematic Editor
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-base md:text-lg text-gray-400 leading-relaxed max-w-3xl font-light"
        >
          I bridge the gap between imagination and reality through high-end mobile post-production. My focus is on crafting immersive, professional-grade content that prioritizes narrative depth and visual precision. Whether it's a brand story or a creative project, I deliver polished edits designed to leave a lasting impression.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16"
        >
          <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-8 font-semibold">Software Expertise</h3>
          
          {/* Animated Original Logos Grid */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            {softwareLogos.map((software, index) => (
              <motion.div
                key={software.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: software.delay }}
                whileHover={{ y: -10 }}
                className="group relative flex flex-col items-center gap-4 cursor-pointer"
              >
                {/* Float Animation Wrapper */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  className="relative"
                >
                  {/* The SVG Logo */}
                  <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    {software.icon}
                  </div>

                  {/* Hover Glow Behind Logo */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none -z-10"
                    style={{ backgroundColor: software.highlight, transform: 'scale(1.2)' }}
                  />
                </motion.div>

                {/* Software Name */}
                <span className="text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                  {software.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
