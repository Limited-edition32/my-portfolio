import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Recreation of fire text animation from OG movie",
    category: "Cinematic Edit",
    video: "/videos/Main Comp.mp4",
    image: null,
    link: "#"
  },
  {
    id: 2,
    title: "Urban Flow | Streetwear Brand",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 3,
    title: "The Escape | Short Film Trailer",
    category: "Narrative",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 4,
    title: "Rhythm & Soul | Music Video",
    category: "Music Video",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  }
];

// ── Video Lightbox Modal ──────────────────────────────────────────────────────
const VideoModal = ({ project, onClose }) => {
  const videoRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-black shadow-[0_0_80px_rgba(239,68,68,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video */}
        {project.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            title={project.title}
            className="w-full aspect-video bg-black border-none"
          />
        ) : (
          <video
            ref={videoRef}
            src={project.video}
            controls
            autoPlay
            className="w-full aspect-video bg-black"
          />
        )}

        {/* Title bar */}
        <div className="px-6 py-4 bg-black/80 border-t border-white/10 flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-red-500 font-medium">{project.category}</span>
          <span className="text-white/30">·</span>
          <span className="text-white font-medium">{project.title}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Video Thumbnail (auto-generates first frame) ──────────────────────────────
const VideoThumbnail = ({ src, isHovered }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [thumb, setThumb] = useState(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = src;
    video.crossOrigin = 'anonymous';
    video.preload = 'metadata';
    video.muted = true;
    video.onloadeddata = () => {
      video.currentTime = 1;
    };
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      setThumb(canvas.toDataURL('image/jpeg'));
    };
  }, [src]);

  return (
    <>
      {thumb ? (
        <motion.img
          src={thumb}
          alt="Video thumbnail"
          animate={{ scale: isHovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full h-full object-cover opacity-80"
        />
      ) : (
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-red-500/40 border-t-red-500 animate-spin" />
        </div>
      )}
    </>
  );
};

// ── Magnetic Play Button ──────────────────────────────────────────────────────
const MagneticPlayButton = ({ isHovered, x, y }) => {
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-white shadow-[0_0_40px_rgba(225,29,72,0.6)] backdrop-blur-sm">
        <Play fill="currentColor" className="w-7 h-7 ml-1" />
      </div>
    </motion.div>
  );
};

// ── Project Card ──────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, onVideoClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const playX = useMotionValue(0);
  const playY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 8);
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    
    // Magnetic play button math
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    playX.set((e.clientX - centerX) * 0.35);
    playY.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    rotateX.set(0); 
    rotateY.set(0); 
    playX.set(0); 
    playY.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    if (project.video || project.youtubeId) onVideoClick(project);
  };

  return (
    <motion.div
      data-cursor="view-projects"
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-50px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative cursor-pointer ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gray-900" style={{ transformStyle: 'preserve-3d' }}>
        <div className="aspect-video overflow-hidden relative">

          {/* Thumbnail — always shows static image/frame */}
          {project.youtubeId ? (
            <motion.img
              src={`https://i.ytimg.com/vi/${project.youtubeId}/maxresdefault.jpg`}
              alt={project.title}
              animate={{ scale: isHovered ? 1.07 : 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full h-full object-cover opacity-80"
              onError={(e) => { e.target.src = `https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg`; e.target.onerror = null; }}
            />
          ) : project.video ? (
            <VideoThumbnail src={project.video} isHovered={isHovered} />
          ) : (
            <motion.img
              src={project.image}
              alt={project.title}
              animate={{ scale: isHovered ? 1.07 : 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full h-full object-cover opacity-80"
            />
          )}

          {/* Dark gradient overlay */}
          <motion.div
            animate={{ opacity: isHovered ? 0.85 : 0.5 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"
          />

          {/* Red scan line */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: isHovered ? '200%' : '-100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
          />

          {/* Magnetic Play Button */}
          <MagneticPlayButton isHovered={isHovered} x={playX} y={playY} />

          {/* Corner arrow */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10, y: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        {/* Card info */}
        <div className="p-6">
          <motion.p
            animate={{ color: isHovered ? '#f87171' : '#ef4444' }}
            className="text-sm font-medium tracking-wide uppercase mb-2"
          >
            {project.category}
          </motion.p>
          <h3 className="text-2xl font-display text-white group-hover:text-red-100 transition-colors duration-300">
            {project.title}
          </h3>
          <motion.div
            animate={{ width: isHovered ? '100%' : '0%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-px bg-gradient-to-r from-red-500 to-transparent mt-3"
          />
        </div>
      </div>
    </motion.div>
  );
};

// ── Projects Section ──────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="works" className="py-24 bg-black text-white relative">

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal project={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-red-500 font-medium tracking-widest uppercase text-xs mb-4 block"
            >
              Selected Works
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-display font-light mb-4">
              Featured <span className="font-semibold">Works</span>
            </h2>
            <p className="text-gray-400 max-w-lg text-lg">
              A curated selection of my latest edits, color grading projects, and cinematic visual stories.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm uppercase tracking-widest text-red-400 hover:text-white transition-colors border-b border-red-400/30 hover:border-white pb-1 self-start md:self-auto"
          >
            View All Projects
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onVideoClick={setActiveVideo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
