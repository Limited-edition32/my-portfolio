import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '#services' },
  ];

  const isActive = (href) => {
    if (href.startsWith('#')) return false;
    return location.pathname === href;
  };

  const menuVariants = {
    closed: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    open: {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)',
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 30 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.07, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed z-50 left-0 right-0 mx-auto w-[90%] max-w-5xl transition-all duration-500 rounded-[2.5rem] ${scrolled
            ? 'top-4 bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] py-2 px-6 md:px-8'
            : 'top-6 md:top-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl py-3 px-6 md:px-8'
          }`}
      >
        <div className="w-full flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png?v=3"
              alt="Limited Edition Studios Logo"
              className="w-auto object-contain h-8 md:h-10 scale-[1.75] md:scale-[2.25] origin-left"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium transition-colors relative group"
                >
                  <span className={isActive(link.href) ? 'text-white' : 'text-gray-400 hover:text-white'}>
                    {link.name}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-red-500"
                    initial={false}
                    animate={{ width: isActive(link.href) ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500/50 group-hover:w-full transition-all duration-300" />
                </Link>
              )
            ))}
            <a
              href="#contact"
              className="px-5 py-2 text-sm font-medium text-white bg-red-600/20 border border-red-500/50 rounded-full hover:bg-red-600/40 hover:border-red-400 transition-all duration-300"
            >
              Let's Talk
            </a>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden text-white w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-[60]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-px bg-white origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-px bg-white origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
          >
            {/* Red glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />

            <nav className="flex flex-col items-center gap-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} custom={i} variants={linkVariants} initial="closed" animate="open">
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-5xl font-display font-light text-white hover:text-red-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={`text-5xl font-display font-light transition-colors ${isActive(link.href) ? 'text-red-400' : 'text-white hover:text-red-400'
                        }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div custom={navLinks.length} variants={linkVariants} initial="closed" animate="open">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 px-8 py-3 text-base font-medium text-white bg-red-600/20 border border-red-500/50 rounded-full hover:bg-red-600/40 transition-all"
                >
                  Let's Talk
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
