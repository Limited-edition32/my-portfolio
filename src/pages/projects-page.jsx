import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────
   Scoped CSS — all classes prefixed pw- to avoid leaks.
───────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

  .pw-hero {
    position: relative;
    padding: 110px 48px 56px;
    border-bottom: .5px solid rgba(255,255,255,0.05);
    overflow: hidden;
  }
  .pw-hero::before {
    content: 'PROJECTS';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -52%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(80px, 14vw, 200px);
    color: rgba(255,255,255,0.025);
    letter-spacing: .1em;
    pointer-events: none;
    white-space: nowrap;
    user-select: none;
  }
  .pw-hero-inner { position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; }
  .pw-hero-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
  .pw-tag { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: #ef4444; margin-bottom: 14px; display: block; }
  .pw-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px,8vw,100px); letter-spacing: .05em; line-height: .95; color: #fff; }
  .pw-title span { color: #ef4444; }
  .pw-desc { font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.8; font-weight: 300; max-width: 320px; }
  .pw-stats { display: flex; align-items: center; gap: 0; margin-top: 48px; border-top: .5px solid rgba(255,255,255,0.05); padding-top: 32px; }
  .pw-stat { display: flex; flex-direction: column; gap: 5px; padding-right: 40px; margin-right: 40px; border-right: .5px solid rgba(255,255,255,0.06); }
  .pw-stat:last-child { border-right: none; }
  .pw-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 40px; color: #fff; letter-spacing: .04em; line-height: 1; }
  .pw-stat-label { font-size: 9px; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,0.28); }

  /* Grid */
  .pw-grid { padding: 48px 48px 80px; max-width: 1200px; margin: 0 auto; }
  .pw-masonry { columns: 3; column-gap: 16px; }
  @media (max-width: 900px) { .pw-masonry { columns: 2; } }
  @media (max-width: 560px) {
    .pw-masonry { columns: 1; }
    .pw-hero { padding: 90px 24px 40px; }
    .pw-grid { padding: 32px 24px 60px; }
    .pw-stats { flex-wrap: wrap; gap: 20px; }
    .pw-stat { border-right: none; padding-right: 0; margin-right: 0; }
  }

  /* Card */
  .pw-card {
    break-inside: avoid;
    margin-bottom: 16px;
    border-radius: 16px;
    overflow: hidden;
    background: #0d0d0d;
    border: .5px solid rgba(255,255,255,0.05);
    cursor: pointer;
    position: relative;
    transition: border-color .35s, transform .35s;
  }
  .pw-card:hover { border-color: rgba(239,68,68,0.25); transform: translateY(-4px); }

  /* Featured card accent */
  .pw-card.featured { border-color: rgba(239,68,68,0.2); }
  .pw-card.featured:hover { border-color: rgba(239,68,68,0.5); }

  .pw-thumb { width: 100%; position: relative; overflow: hidden; }
  .pw-ratio-16-9 { aspect-ratio: 16/9; }
  .pw-ratio-9-16 { aspect-ratio: 9/16; }

  /* Canvas thumbnail */
  .pw-thumb-canvas {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    opacity: .72;
    transition: opacity .4s, transform .55s ease;
    display: block;
  }
  .pw-card:hover .pw-thumb-canvas { opacity: .92; transform: scale(1.04); }

  /* Loading shimmer */
  .pw-thumb-shimmer {
    position: absolute; inset: 0;
    background: linear-gradient(110deg, #111 30%, #1e1e1e 50%, #111 70%);
    background-size: 200% 100%;
    animation: pw-shimmer 1.4s infinite;
  }
  @keyframes pw-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

  /* Gradient thumb fallback */
  .pw-thumb-grad {
    width: 100%; height: 100%;
    position: absolute; inset: 0;
  }

  /* Scan line */
  .pw-scan { position: absolute; inset-x: 0; top: -2px; height: 1.5px; background: linear-gradient(to right, transparent, #ef4444, transparent); transition: top .55s ease; pointer-events: none; box-shadow: 0 0 8px rgba(239,68,68,0.5); z-index: 4; }
  .pw-card:hover .pw-scan { top: calc(100% + 2px); }

  /* Play */
  .pw-play {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%) scale(0) rotate(-10deg);
    width: 52px; height: 52px; border-radius: 50%;
    background: rgba(220,38,38,0.95);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 35px rgba(239,68,68,0.55);
    transition: transform .35s cubic-bezier(.34,1.56,.64,1);
    z-index: 3;
  }
  .pw-card:hover .pw-play { transform: translate(-50%,-50%) scale(1) rotate(0deg); }
  .pw-play::after { content: '▶'; font-size: 15px; color: #fff; margin-left: 3px; }

  /* Badges */
  .pw-portrait-badge, .pw-landscape-badge {
    position: absolute; top: 10px; left: 10px; z-index: 3;
    display: flex; align-items: center; gap: 4px;
    padding: 4px 9px; border-radius: 6px;
    background: rgba(0,0,0,0.65); backdrop-filter: blur(8px);
    border: .5px solid rgba(255,255,255,0.12);
    font-size: 8px; color: rgba(255,255,255,0.6); letter-spacing: .06em; text-transform: uppercase;
  }
  .pw-portrait-badge::before { content: ''; width: 5px; height: 9px; border-radius: 2px; border: 1px solid rgba(239,68,68,0.7); flex-shrink: 0; }
  .pw-landscape-badge::before { content: ''; width: 9px; height: 5px; border-radius: 2px; border: 1px solid rgba(255,255,255,0.4); flex-shrink: 0; }

  /* Featured badge */
  .pw-featured-badge {
    position: absolute; top: 10px; right: 10px; z-index: 3;
    padding: 4px 10px; border-radius: 6px;
    background: rgba(220,38,38,0.85); backdrop-filter: blur(8px);
    border: .5px solid rgba(239,68,68,0.5);
    font-size: 8px; color: #fff; letter-spacing: .1em; text-transform: uppercase; font-weight: 600;
  }

  /* Duration */
  .pw-dur {
    position: absolute; bottom: 10px; right: 10px; z-index: 3;
    font-size: 9px; color: rgba(255,255,255,0.65);
    background: rgba(0,0,0,0.6); backdrop-filter: blur(6px);
    padding: 3px 8px; border-radius: 5px; letter-spacing: .04em;
  }

  /* Progress */
  .pw-progress { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: rgba(255,255,255,0.04); z-index: 3; }
  .pw-progress-fill { height: 100%; width: 0%; background: #ef4444; box-shadow: 0 0 8px rgba(239,68,68,0.7); transition: width .45s ease; }
  .pw-card:hover .pw-progress-fill { width: 28%; }

  /* Card info */
  .pw-info { padding: 14px 16px 16px; }
  .pw-info-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
  .pw-card-title { font-family: 'Bebas Neue', sans-serif; font-size: 18px; color: #fff; letter-spacing: .04em; line-height: 1.15; flex: 1; }
  .pw-arrow { font-size: 16px; color: rgba(255,255,255,0.15); transition: all .3s; flex-shrink: 0; margin-top: 2px; }
  .pw-card:hover .pw-arrow { color: #ef4444; transform: translate(3px,-3px); }
  .pw-meta { font-size: 10px; color: rgba(255,255,255,0.22); margin-top: 6px; display: flex; gap: 10px; }

  /* ── Modal ── */
  .pw-overlay {
    position: fixed; inset: 0; z-index: 100;
    background: rgba(0,0,0,0.93); backdrop-filter: blur(24px);
    display: flex; align-items: center; justify-content: center; padding: 20px;
    opacity: 0; pointer-events: none; transition: opacity .3s;
  }
  .pw-overlay.open { opacity: 1; pointer-events: all; }
  .pw-modal {
    position: relative;
    transform: scale(0.94); transition: transform .35s cubic-bezier(.34,1.56,.64,1);
  }
  .pw-overlay.open .pw-modal { transform: scale(1); }
  .pw-modal.portrait { width: min(380px, 90vw); }
  .pw-modal.portrait .pw-modal-video { aspect-ratio: 9/16; border-radius: 16px; }
  .pw-modal.landscape { width: min(860px, 95vw); }
  .pw-modal.landscape .pw-modal-video { aspect-ratio: 16/9; border-radius: 16px; }

  .pw-modal-video {
    width: 100%;
    background: #000;
    border: .5px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; color: rgba(255,255,255,0.25);
  }
  .pw-modal-video video {
    width: 100%; height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 16px;
  }
  .pw-modal-placeholder {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 10px; width: 100%; height: 100%;
    font-size: 13px; color: rgba(255,255,255,0.25);
    padding: 40px;
  }
  .pw-modal-placeholder span { font-size: 32px; }

  .pw-modal-close {
    position: absolute; top: -14px; right: -14px; z-index: 10;
    width: 36px; height: 36px; border-radius: 50%;
    background: #1a1a1a; border: .5px solid rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; color: #fff; cursor: pointer;
    transition: background .2s, border-color .2s;
  }
  .pw-modal-close:hover { background: rgba(239,68,68,0.25); border-color: rgba(239,68,68,0.5); }
  .pw-modal-footer { padding: 16px 2px 0; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
  .pw-modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: .05em; color: #fff; }
  .pw-modal-meta { font-size: 11px; color: rgba(255,255,255,0.28); margin-top: 3px; }
  .pw-modal-actions { display: flex; gap: 8px; }
  .pw-modal-btn { padding: 8px 18px; border-radius: 100px; font-size: 11px; font-weight: 500; cursor: pointer; letter-spacing: .04em; transition: all .2s; }
  .pw-modal-btn.primary { background: #dc2626; border: .5px solid rgba(239,68,68,0.5); color: #fff; }
  .pw-modal-btn.primary:hover { background: #ef4444; }
  .pw-modal-btn.sec { background: rgba(255,255,255,0.06); border: .5px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); }
  .pw-modal-btn.sec:hover { background: rgba(255,255,255,0.1); color: #fff; }
`;

/* ─────────────────────────────────────────────────────
   Data — set videoSrc for cards that have real footage.
───────────────────────────────────────────────────── */
const PROJECTS = [
  {
    title: 'Final Client Work',
    meta: '2025 · Client Project',
    views: 'Client Project',
    year: '2025',
    type: 'portrait',
    dur: null,
    gradient: 'linear-gradient(160deg,#1a0505,#0a0a0a)',
    videoSrc: '/final-client-work.mp4',
    featured: true,
  },
  {
    title: 'Final Cut',
    meta: '2025 · Edit',
    views: 'Personal Edit',
    year: '2025',
    type: 'landscape',
    dur: null,
    gradient: 'linear-gradient(160deg,#0a0a1a,#0a0a0a)',
    videoSrc: '/final-cut.mp4',
  },
  {
    title: 'Street Reel',
    meta: '2026 · Short Form',
    views: 'Short Form',
    year: '2026',
    type: 'landscape',
    dur: null,
    gradient: 'linear-gradient(160deg,#0f1a05,#0a0a0a)',
    videoSrc: '/lv_0_20260315184440.mp4',
  },
  {
    title: 'Project Pavan',
    meta: '2025 · Brand Film',
    views: 'Brand Film',
    year: '2025',
    type: 'landscape',
    dur: null,
    gradient: 'linear-gradient(160deg,#1a0505,#0a0a0a)',
    videoSrc: '/project-1.mp4',
  },
  {
    title: 'Sequence 01',
    meta: '2025 · Cinematic',
    views: 'Cinematic',
    year: '2025',
    type: 'landscape',
    dur: null,
    gradient: 'linear-gradient(160deg,#05101a,#0a0a0a)',
    videoSrc: '/sequence-01.mp4',
  },
];

/* ── Canvas thumbnail hook ── */
function useVideoThumbnail(videoSrc, seekFraction = 0.15) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!videoSrc) return;
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = videoSrc;

    const onMeta = () => {
      video.currentTime = video.duration * seekFraction;
    };
    const onSeeked = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width  = video.videoWidth  || 640;
      canvas.height = video.videoHeight || 360;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setReady(true);
      video.src = '';
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('seeked', onSeeked);
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('seeked', onSeeked);
      video.src = '';
    };
  }, [videoSrc, seekFraction]);

  return { canvasRef, ready };
}

/* ── Card component ── */
function ProjectCard({ project, onOpen }) {
  const isPortrait = project.type === 'portrait';
  const { canvasRef, ready } = useVideoThumbnail(project.videoSrc);
  const [playPos, setPlayPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Magnetic pull ratio
    setPlayPos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPlayPos({ x: 0, y: 0 });
  };

  return (
    <div className={`pw-card${project.featured ? ' featured' : ''}`} onClick={() => onOpen(project)}>
      <div 
        className={`pw-thumb ${isPortrait ? 'pw-ratio-9-16' : 'pw-ratio-16-9'}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        {/* Gradient base — always shown */}
        <div className="pw-thumb-grad" style={{ background: project.gradient }} />

        {/* Real frame thumbnail via canvas */}
        {project.videoSrc && (
          <>
            {!ready && <div className="pw-thumb-shimmer" />}
            <canvas
              ref={canvasRef}
              className="pw-thumb-canvas"
              style={{ opacity: ready ? undefined : 0 }}
            />
          </>
        )}

        <div className="pw-scan" />
        <div 
          className="pw-play" 
          style={{
            transform: isHovered 
              ? `translate(calc(-50% + ${playPos.x}px), calc(-50% + ${playPos.y}px)) scale(1) rotate(0deg)`
              : `translate(-50%, -50%) scale(0) rotate(-10deg)`
          }}
        />

        {isPortrait
          ? <div className="pw-portrait-badge">9:16 · Short</div>
          : <div className="pw-landscape-badge">16:9</div>}

        {project.featured && <div className="pw-featured-badge">★ Featured</div>}
        {project.dur && <div className="pw-dur">{project.dur}</div>}
        <div className="pw-progress"><div className="pw-progress-fill" /></div>
      </div>

      <div className="pw-info">
        <div className="pw-info-top">
          <div className="pw-card-title">{project.title}</div>
          <div className="pw-arrow">↗</div>
        </div>
        <div className="pw-meta">
          <span>{project.year}</span>
          <span>{project.views}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function ProjectsPage() {
  const overlayRef  = useRef(null);
  const modalRef    = useRef(null);
  const videoRef    = useRef(null);
  const titleRef    = useRef(null);
  const metaRef     = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  // Inject scoped styles once
  useEffect(() => {
    let tag = document.getElementById('pw-styles');
    if (!tag) {
      tag = document.createElement('style');
      tag.id = 'pw-styles';
      document.head.appendChild(tag);
    }
    tag.textContent = styles;
  }, []);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const openModal = (project) => {
    setActiveProject(project);
    titleRef.current.textContent = project.title;
    metaRef.current.textContent  = project.meta;
    modalRef.current.className   = `pw-modal ${project.type}`;
    overlayRef.current.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    // Pause video if playing
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    overlayRef.current.classList.remove('open');
    document.body.style.overflow = '';
    setActiveProject(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) closeModal();
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <div className="pw-hero">
        <div className="pw-hero-inner">
          <div className="pw-hero-top">
            <div>
              <span className="pw-tag">Limited Edition Studio</span>
              <div className="pw-title">Selected<br /><span>Projects.</span></div>
            </div>
            <p className="pw-desc">Every project is a story told through motion, color, and rhythm. From viral short-form to cinematic brand films.</p>
          </div>
          <div className="pw-stats">
            <div className="pw-stat"><div className="pw-stat-num">50+</div><div className="pw-stat-label">Projects Done</div></div>
            <div className="pw-stat"><div className="pw-stat-num">1M+</div><div className="pw-stat-label">Total Views</div></div>
            <div className="pw-stat"><div className="pw-stat-num">3+</div><div className="pw-stat-label">Years Exp.</div></div>
            <div className="pw-stat"><div className="pw-stat-num">20+</div><div className="pw-stat-label">Clients</div></div>
          </div>
        </div>
      </div>

      {/* ── MASONRY GRID ── */}
      <div className="pw-grid">
        <div className="pw-masonry">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} onOpen={openModal} />
          ))}
        </div>
      </div>

      {/* ── MODAL ── */}
      <div className="pw-overlay" ref={overlayRef} onClick={handleOverlayClick}>
        <div className="pw-modal landscape" ref={modalRef}>
          <button className="pw-modal-close" onClick={closeModal}>✕</button>

          <div className="pw-modal-video">
            {activeProject?.videoSrc ? (
              <video
                ref={videoRef}
                src={activeProject.videoSrc}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <div className="pw-modal-placeholder">
                <span>🎬</span>
                Video coming soon
              </div>
            )}
          </div>

          <div className="pw-modal-footer">
            <div>
              <div className="pw-modal-title" ref={titleRef}>Title</div>
              <div className="pw-modal-meta"  ref={metaRef}>meta</div>
            </div>
            <div className="pw-modal-actions">
              <button className="pw-modal-btn sec" onClick={closeModal}>Close</button>
              {activeProject?.videoSrc && (
                <a
                  className="pw-modal-btn primary"
                  href={activeProject.videoSrc}
                  download
                  style={{ textDecoration: 'none' }}
                >
                  Download ↓
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
