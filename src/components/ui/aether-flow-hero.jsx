"use client";

import React, { useEffect, useRef } from 'react';

// Make sure your index.html <head> has:
// <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />

const HeroSection = () => {
  const canvasRef  = useRef(null);
  const loaderRef  = useRef(null);
  const lLogoRef   = useRef(null);
  const lBarRef    = useRef(null);
  const lPctRef    = useRef(null);
  const badgeRef   = useRef(null);
  const titleRef   = useRef(null);
  const studioRef  = useRef(null);
  const vlRef      = useRef(null);
  const vrRef      = useRef(null);
  const taglineRef = useRef(null);
  const ruleRef    = useRef(null);
  const scrollRef  = useRef(null);
  const sfillRef   = useRef(null);
  const sarrRef    = useRef(null);

  // ── particle canvas ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let parts = [];
    const cols = ['#7f1d1d','#991b1b','#b91c1c','#dc2626','#ef4444'];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initP();
    };

    const initP = () => {
      parts = [];
      const n = Math.floor(canvas.width * canvas.height / 6000);
      for (let i = 0; i < n; i++) {
        parts.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          vx: (Math.random() - .5) * 1,
          vy: (Math.random() - .5) * 1,
          r:  Math.random() * 2.5 + .5,
          c:  cols[Math.floor(Math.random() * cols.length)],
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.fill();
      }

      const maxD = (canvas.width / 7) * (canvas.height / 7);
      for (let a = 0; a < parts.length; a++) {
        for (let b = a + 1; b < parts.length; b++) {
          const dx = parts[a].x - parts[b].x;
          const dy = parts[a].y - parts[b].y;
          const d  = dx * dx + dy * dy;
          if (d < maxD) {
            ctx.strokeStyle = `rgba(127,29,29,${(1 - d / maxD) * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(parts[a].x, parts[a].y);
            ctx.lineTo(parts[b].x, parts[b].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── loader + hero animation sequence ─────────────────────────────────────
  useEffect(() => {
    const wait = ms => new Promise(r => setTimeout(r, ms));

    const run = async () => {
      const loader  = loaderRef.current;
      const lLogo   = lLogoRef.current;
      const lBar    = lBarRef.current;
      const lPct    = lPctRef.current;
      const badge   = badgeRef.current;
      const title   = titleRef.current;
      const studio  = studioRef.current;
      const vl      = vlRef.current;
      const vr      = vrRef.current;
      const tagline = taglineRef.current;
      const rule    = ruleRef.current;
      const scroll  = scrollRef.current;
      const sfill   = sfillRef.current;
      const sarr    = sarrRef.current;

      if (!loader) return;

      // ── LOADER ──────────────────────────────────────────────────────────
      await wait(120);
      lLogo.style.transition = 'opacity .4s';
      lLogo.style.opacity    = '1';
      await wait(300);

      // progress bar
      await new Promise(resolve => {
        let p = 0;
        const iv = setInterval(() => {
          p += 2.5;
          lBar.style.transition = 'width .06s linear';
          lBar.style.width      = Math.min(p, 100) + '%';
          lPct.textContent      = Math.floor(Math.min(p, 100)) + '%';
          if (p >= 100) { clearInterval(iv); resolve(); }
        }, 30);
      });

      await wait(200);

      // ── WIPE LOADER OUT ──────────────────────────────────────────────────
      loader.style.transition      = 'transform 0.65s cubic-bezier(0.76,0,0.24,1)';
      loader.style.transformOrigin = 'top';
      loader.style.transform       = 'scaleY(0)';

      // ── HERO ANIMATIONS — fire immediately as wipe begins ────────────────

      // badge
      badge.style.transition = 'opacity .5s ease, transform .5s ease';
      badge.style.opacity    = '1';
      badge.style.transform  = 'translateY(0)';

      // vertical lines
      vl.style.transition = 'height .7s cubic-bezier(0.76,0,0.24,1)';
      vr.style.transition = 'height .7s cubic-bezier(0.76,0,0.24,1)';
      vl.style.height     = '90px';
      vr.style.height     = '90px';

      // title slides down
      await wait(200);
      title.style.transition = 'opacity .7s cubic-bezier(0.22,1,0.36,1), transform .7s cubic-bezier(0.22,1,0.36,1)';
      title.style.opacity    = '1';
      title.style.transform  = 'translateY(0)';

      // studio slides up
      await wait(180);
      studio.style.transition = 'opacity .6s cubic-bezier(0.22,1,0.36,1), transform .6s cubic-bezier(0.22,1,0.36,1)';
      studio.style.opacity    = '1';
      studio.style.transform  = 'translateY(0)';

      // tagline
      await wait(220);
      tagline.style.transition = 'opacity .6s ease, transform .6s ease';
      tagline.style.opacity    = '1';
      tagline.style.transform  = 'translateY(0)';

      // rule sweeps
      await wait(180);
      rule.style.transition = 'transform .9s cubic-bezier(0.76,0,0.24,1), opacity .3s';
      rule.style.opacity    = '1';
      rule.style.transform  = 'scaleX(1)';

      // scroll indicator
      await wait(300);
      scroll.style.transition = 'opacity .6s ease, transform .6s ease';
      scroll.style.opacity    = '1';
      scroll.style.transform  = 'translateY(0)';
      sfill.style.animation   = 'heroDropLine 2s ease-in-out infinite';
      sarr.style.animation    = 'heroBobArr 2s ease-in-out infinite';

      // hide loader DOM after wipe done
      setTimeout(() => { loader.style.display = 'none'; }, 700);
    };

    run();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
      />

      {/* Center dark vignette */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: `radial-gradient(ellipse 80% 70% at 50% 50%,
            rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 45%,
            rgba(0,0,0,0.1) 80%, transparent 100%)`,
        }}
      />

      {/* ── LOADER ── */}
      <div
        ref={loaderRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: '#000',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '18px',
          transformOrigin: 'top',
        }}
      >
        <div
          ref={lLogoRef}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '28px', letterSpacing: '.1em',
            color: '#fff', textAlign: 'center', opacity: 0,
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

        <div style={{ width: '140px', height: '1px', background: 'rgba(255,255,255,0.07)', borderRadius: '1px', overflow: 'hidden' }}>
          <div
            ref={lBarRef}
            style={{
              height: '100%', width: '0%',
              background: 'linear-gradient(to right, rgba(239,68,68,0.4), #ef4444)',
            }}
          />
        </div>

        <div
          ref={lPctRef}
          style={{ fontSize: '9px', letterSpacing: '.14em', color: 'rgba(255,255,255,0.2)' }}
        >
          0%
        </div>
      </div>

      {/* ── HERO ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
        }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '5px 16px', borderRadius: '100px',
            background: 'rgba(100,10,10,0.55)',
            border: '.5px solid rgba(239,68,68,0.45)',
            fontSize: '11px', color: '#fca5a5', letterSpacing: '.04em',
            backdropFilter: 'blur(12px)',
            marginBottom: '24px',
            opacity: 0, transform: 'translateY(10px)',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 6px rgba(239,68,68,0.9)', flexShrink: 0 }} />
          Cinematic Video Editor
        </div>

        {/* Split frame */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '960px' }}>

          {/* Left line */}
          <div
            ref={vlRef}
            style={{
              width: '1px', height: 0, flexShrink: 0,
              background: 'linear-gradient(to bottom, transparent, rgba(239,68,68,0.5), transparent)',
            }}
          />

          {/* Lockup */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 28px' }}>
            <h1
              ref={titleRef}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(52px, 9vw, 118px)',
                letterSpacing: '.06em', lineHeight: 1, color: '#fff',
                WebkitTextStroke: '1.5px rgba(0,0,0,0.5)',
                textShadow: '0 0 40px rgba(0,0,0,1), 0 0 80px rgba(0,0,0,1)',
                opacity: 0, transform: 'translateY(-40px)',
                whiteSpace: 'nowrap', margin: 0,
              }}
            >
              LIMITED EDITION
            </h1>

            <p
              ref={studioRef}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(20px, 3.2vw, 42px)',
                letterSpacing: '.6em', paddingLeft: '.6em',
                color: '#ef4444', lineHeight: 1, marginTop: '6px',
                textShadow: '0 0 25px rgba(239,68,68,0.85), 0 0 60px rgba(0,0,0,1)',
                WebkitTextStroke: '1px rgba(0,0,0,0.4)',
                opacity: 0, transform: 'translateY(30px)',
                whiteSpace: 'nowrap',
              }}
            >
              STUDIO
            </p>
          </div>

          {/* Right line */}
          <div
            ref={vrRef}
            style={{
              width: '1px', height: 0, flexShrink: 0,
              background: 'linear-gradient(to bottom, transparent, rgba(239,68,68,0.5), transparent)',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontSize: 'clamp(12px, 1.3vw, 15px)',
            color: 'rgba(255,255,255,0.42)',
            maxWidth: '480px', lineHeight: 1.8, fontWeight: 300,
            marginTop: '20px',
            textShadow: '0 0 30px rgba(0,0,0,1)',
            opacity: 0, transform: 'translateY(12px)',
          }}
        >
          Transforming raw footage into engaging, cinematic experiences
          that captivate audiences and bring your vision to life.
        </p>

        {/* Rule */}
        <div
          ref={ruleRef}
          style={{
            width: 'min(560px, 80vw)', height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(239,68,68,0.55), transparent)',
            boxShadow: '0 0 10px rgba(239,68,68,0.2)',
            marginTop: '16px',
            transform: 'scaleX(0)', transformOrigin: 'center', opacity: 0,
          }}
        />

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            marginTop: '40px', opacity: 0, transform: 'translateY(14px)',
          }}
        >
          <span style={{
            fontSize: '10px', letterSpacing: '.26em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)', marginBottom: '12px', fontWeight: 300,
          }}>
            Scroll
          </span>

          <div style={{
            width: '2px', height: '72px', borderRadius: '2px',
            background: 'rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden',
          }}>
            <div
              ref={sfillRef}
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '2px', borderRadius: '2px',
                background: 'linear-gradient(to bottom, transparent, #ef4444)',
                boxShadow: '0 0 10px rgba(239,68,68,0.9)',
              }}
            />
          </div>

          <span
            ref={sarrRef}
            style={{
              fontSize: '22px', color: 'rgba(239,68,68,0.75)',
              marginTop: '8px', lineHeight: 1,
              textShadow: '0 0 12px rgba(239,68,68,0.6)',
              display: 'block',
            }}
          >
            ↓
          </span>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes heroDropLine {
          0%  { height: 0;    opacity: 1; }
          65% { height: 72px; opacity: 1; }
          90% { height: 72px; opacity: 0; }
          100%{ height: 0;    opacity: 0; }
        }
        @keyframes heroBobArr {
          0%,100% { transform: translateY(0);   opacity: 0.4; }
          50%     { transform: translateY(8px);  opacity: 1;   }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;