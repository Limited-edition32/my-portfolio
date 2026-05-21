"use client";

import React, { useEffect, useRef } from 'react';

// Add to index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />

const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];
    const mouse = { x: null, y: null, radius: 250 };
    const cols = ['#7f1d1d', '#991b1b', '#b91c1c', '#dc2626', '#ef4444'];

    // ── CRITICAL: set canvas size to match window ──
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const n = Math.floor((canvas.width * canvas.height) / 6000);
      for (let i = 0; i < n; i++) {
        particles.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          r:  Math.random() * 2.5 + 0.5,
          color: cols[Math.floor(Math.random() * cols.length)],
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // update + draw particles
      for (const p of particles) {
        // mouse repulsion
        if (mouse.x !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < mouse.radius) {
            const f = (mouse.radius - d) / mouse.radius;
            p.x -= (dx / d) * f * 6;
            p.y -= (dy / d) * f * 6;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      // connect lines
      const maxDist = (canvas.width / 7) * (canvas.height / 7);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist) {
            const op = 1 - d2 / maxDist;
            const near = mouse.x !== null && (() => {
              const mx = particles[a].x - mouse.x;
              const my = particles[a].y - mouse.y;
              return Math.sqrt(mx * mx + my * my) < mouse.radius;
            })();
            ctx.strokeStyle = near
              ? `rgba(239,68,68,${op * 0.8})`
              : `rgba(127,29,29,${op * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onOut  = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener('resize',    resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout',  onOut);

    resize(); // sets canvas size AND inits particles
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout',  onOut);
    };
  }, []);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">

      {/* ── Canvas — position absolute, full size ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          display: 'block',
          zIndex: 0,
        }}
      />

      {/* Center dark vignette so text is readable */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: `radial-gradient(ellipse 80% 70% at 50% 50%,
            rgba(0,0,0,0.85) 0%,
            rgba(0,0,0,0.6)  45%,
            rgba(0,0,0,0.15) 75%,
            transparent 100%)`,
        }}
      />

      {/* ── Hero content ── */}
      <div
        style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          width: '100%', maxWidth: '1100px',
          padding: '0 32px',
          marginTop: '64px',
        }}
      >

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 18px', borderRadius: '100px',
          background: 'rgba(100,10,10,0.55)',
          border: '0.5px solid rgba(239,68,68,0.5)',
          backdropFilter: 'blur(12px)',
          marginBottom: '32px',
          opacity: 0,
          animation: 'hFadeUp 0.5s ease forwards 0.1s',
        }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#ef4444', boxShadow: '0 0 6px rgba(239,68,68,0.9)',
            flexShrink: 0,
          }} />
          <span style={{ fontSize: '11px', color: '#fca5a5', letterSpacing: '0.05em', fontFamily: 'Inter,sans-serif' }}>
            Cinematic Video Editor
          </span>
        </div>

        {/* Title lockup */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

          {/* Glitch wrapper */}
          <div style={{ position: 'relative', display: 'inline-block' }}>

            {/* Main title */}
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(52px, 9.5vw, 128px)',
              letterSpacing: '0.06em', lineHeight: 1,
              color: '#fff', whiteSpace: 'nowrap', margin: 0,
              WebkitTextStroke: '2px rgba(0,0,0,0.55)',
              textShadow: '0 0 40px rgba(0,0,0,1), 0 0 80px rgba(0,0,0,1)',
              opacity: 0,
              animation: 'hGlitch 1.4s steps(1) forwards 0.5s',
            }}>
              LIMITED EDITION
            </h1>

            {/* Red ghost */}
            <span aria-hidden style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(52px, 9.5vw, 128px)',
              letterSpacing: '0.06em', lineHeight: 1,
              color: '#ef4444', whiteSpace: 'nowrap',
              clipPath: 'polygon(0 8%, 100% 8%, 100% 38%, 0 38%)',
              pointerEvents: 'none',
              opacity: 0,
              animation: 'hGhostR 1.4s steps(1) forwards 0.5s',
            }}>LIMITED EDITION</span>

            {/* Cyan ghost */}
            <span aria-hidden style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(52px, 9.5vw, 128px)',
              letterSpacing: '0.06em', lineHeight: 1,
              color: '#22d3ee', whiteSpace: 'nowrap',
              clipPath: 'polygon(0 58%, 100% 58%, 100% 85%, 0 85%)',
              pointerEvents: 'none',
              opacity: 0,
              animation: 'hGhostC 1.4s steps(1) forwards 0.5s',
            }}>LIMITED EDITION</span>
          </div>

          {/* STUDIO */}
          <p style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(20px, 3.4vw, 46px)',
            letterSpacing: '0.6em', paddingLeft: '0.6em',
            lineHeight: 1, marginTop: '6px', color: '#ef4444',
            whiteSpace: 'nowrap',
            WebkitTextStroke: '1px rgba(0,0,0,0.4)',
            textShadow: '0 0 25px rgba(239,68,68,0.9), 0 0 60px rgba(239,68,68,0.4), 0 0 60px rgba(0,0,0,1)',
            opacity: 0,
            animation: 'hStudio 0.9s steps(1) forwards 1.2s',
          }}>STUDIO</p>

          {/* Rule */}
          <div style={{
            width: 'min(600px, 85%)', height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(239,68,68,0.6), transparent)',
            boxShadow: '0 0 12px rgba(239,68,68,0.25)',
            marginTop: '16px',
            transformOrigin: 'center',
            transform: 'scaleX(0)', opacity: 0,
            animation: 'hRule 1s cubic-bezier(0.76,0,0.24,1) forwards 2s',
          }} />
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(13px, 1.4vw, 16px)',
          color: 'rgba(255,255,255,0.52)',
          maxWidth: '520px', lineHeight: 1.85, fontWeight: 300,
          marginTop: '22px', fontFamily: 'Inter,sans-serif',
          textShadow: '0 0 30px rgba(0,0,0,1)',
          opacity: 0,
          animation: 'hFadeUp 0.7s ease forwards 2.2s',
        }}>
          Transforming raw footage into engaging, cinematic experiences
          that captivate audiences and bring your vision to life.
        </p>

        {/* Scroll indicator */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          marginTop: '48px',
          opacity: 0,
          animation: 'hFadeUp 0.6s ease forwards 2.5s',
        }}>
          <span style={{
            fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', marginBottom: '14px',
            fontFamily: 'Inter,sans-serif', fontWeight: 300,
            textShadow: '0 0 20px rgba(0,0,0,1)',
          }}>Scroll</span>

          <div style={{
            width: '2px', height: '80px', borderRadius: '2px',
            background: 'rgba(255,255,255,0.07)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '2px',
              borderRadius: '2px',
              background: 'linear-gradient(to bottom, transparent, #ef4444)',
              boxShadow: '0 0 10px rgba(239,68,68,0.9)',
              animation: 'hDrop 2s ease-in-out infinite',
            }} />
          </div>

          <span style={{
            fontSize: '24px', color: 'rgba(239,68,68,0.75)',
            marginTop: '8px', lineHeight: 1,
            textShadow: '0 0 14px rgba(239,68,68,0.6)',
            animation: 'hBob 2s ease-in-out infinite',
            display: 'block',
          }}>↓</span>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes hFadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes hGlitch {
          0%   { opacity:0; transform:translateX(-14px) skewX(-7deg); filter:blur(12px) brightness(3); }
          7%   { opacity:1; transform:translateX(12px)  skewX(6deg);  filter:blur(3px)  brightness(4.5); }
          14%  { transform:translateX(-10px) skewX(-4deg); filter:blur(2px) brightness(2.5); }
          20%  { transform:translateX(14px)  skewX(5deg);  filter:blur(5px) brightness(3.5); }
          27%  { transform:translateX(-6px)  skewX(-2deg); filter:blur(1px); }
          34%  { transform:translateX(7px)   skewX(2deg);  filter:blur(2px); }
          42%  { transform:translateX(-3px);               filter:blur(0.5px); }
          54%  { transform:translateX(3px);                filter:blur(0); }
          65%  { transform:translateX(-1px); }
          78%  { transform:translateX(0.5px); }
          100% { opacity:1; transform:none; filter:none; }
        }
        @keyframes hGhostR {
          0%  { opacity:0; }
          7%  { opacity:1;    transform:translateX(20px); }
          14% { opacity:0.85; transform:translateX(-16px); }
          20% { opacity:1;    transform:translateX(22px); }
          27% { opacity:0.6;  transform:translateX(-10px); }
          34% { opacity:0.8;  transform:translateX(12px); }
          44% { opacity:0.3;  transform:translateX(-4px); }
          58% { opacity:0.1; }
          70% { opacity:0; }
          100%{ opacity:0; }
        }
        @keyframes hGhostC {
          0%  { opacity:0; }
          7%  { opacity:0.9;  transform:translateX(-22px); }
          14% { opacity:0.75; transform:translateX(18px); }
          20% { opacity:0.9;  transform:translateX(-20px); }
          27% { opacity:0.55; transform:translateX(10px); }
          34% { opacity:0.7;  transform:translateX(-8px); }
          44% { opacity:0.25; transform:translateX(3px); }
          58% { opacity:0.1; }
          70% { opacity:0; }
          100%{ opacity:0; }
        }
        @keyframes hStudio {
          0%   { opacity:0; transform:translateX(10px) skewX(4deg);  filter:blur(7px); }
          14%  { opacity:1; transform:translateX(-8px) skewX(-3deg); filter:blur(2px); }
          28%  { transform:translateX(6px)  skewX(2deg); filter:blur(3px); }
          42%  { transform:translateX(-4px);             filter:blur(1px); }
          58%  { transform:translateX(3px); }
          72%  { transform:translateX(-1px); }
          100% { opacity:1; transform:none; filter:none; }
        }
        @keyframes hRule {
          from { transform:scaleX(0); opacity:0; }
          to   { transform:scaleX(1); opacity:1; }
        }
        @keyframes hDrop {
          0%  { height:0;    opacity:1; }
          65% { height:80px; opacity:1; }
          90% { height:80px; opacity:0; }
          100%{ height:0;    opacity:0; }
        }
        @keyframes hBob {
          0%,100% { transform:translateY(0);  opacity:0.4; }
          50%     { transform:translateY(9px); opacity:1; }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;