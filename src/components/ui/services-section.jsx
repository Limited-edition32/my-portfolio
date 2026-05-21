import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonitorPlay, Sparkles, Smartphone, Film } from 'lucide-react';

const services = [
  {
    icon: Film,
    title: "Cinematic Edits",
    description: "Transforming ordinary footage into compelling stories with pacing, sound design, and visual rhythm that keeps the audience hooked.",
    stat: "200+",
    statLabel: "Videos Edited"
  },
  {
    icon: Sparkles,
    title: "Color Grading",
    description: "Setting the mood and tone of your visuals. From moody cinematic styles to vibrant commercial looks, bringing out the best in every frame.",
    stat: "50+",
    statLabel: "Brands Served"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimization",
    description: "Expert level edits formatted specifically for TikTok, Reels, and Shorts using advanced techniques in Alight Motion and CapCut.",
    stat: "1M+",
    statLabel: "Views Generated"
  },
  {
    icon: MonitorPlay,
    title: "VFX & Compositing",
    description: "Seamless transitions, subtle visual effects, and text animations that elevate the production value of your content.",
    stat: "3+",
    statLabel: "Years Experience"
  }
];

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      data-cursor="view-service"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group bg-white/[0.02] border border-white/5 p-8 rounded-3xl overflow-hidden cursor-default transition-colors duration-500 hover:border-red-500/30 hover:bg-white/[0.04]"
    >
      {/* Animated background glow on hover */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent pointer-events-none rounded-3xl"
      />

      {/* Corner accent line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-red-500 via-red-400 to-transparent origin-left"
      />

      {/* Icon */}
      <div className="relative mb-8">
        <motion.div
          animate={{
            scale: hovered ? 1.15 : 1,
            backgroundColor: hovered ? 'rgba(239,68,68,0.25)' : 'rgba(239,68,68,0.1)',
          }}
          transition={{ duration: 0.4 }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
        >
          <Icon className="w-8 h-8 text-red-400" />
        </motion.div>

        {/* Glow pulse ring */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute inset-0 w-16 h-16 rounded-2xl border border-red-500/40"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Title */}
      <motion.h3
        animate={{ color: hovered ? '#fca5a5' : '#ffffff' }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-display mb-4"
      >
        {service.title}
      </motion.h3>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
        {service.description}
      </p>

      {/* Stat badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="mt-6 pt-6 border-t border-white/5 flex items-baseline gap-2"
      >
        <span className="text-3xl font-display font-semibold text-red-400">{service.stat}</span>
        <span className="text-xs uppercase tracking-widest text-gray-500">{service.statLabel}</span>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-[#050505] text-white relative border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-red-500 font-medium tracking-widest uppercase text-sm mb-4 block"
          >
            What I Do
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-display font-light mb-6">
            Elevating Your{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Visual Identity
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            I offer a full suite of post-production services to ensure your videos stand out in a crowded digital landscape.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
