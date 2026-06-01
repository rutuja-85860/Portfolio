import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home',            href: '#home',     id: 'home'     },
  { name: 'About',           href: '#about',    id: 'about'    },
  { name: 'Technical Stack', href: '#skills',   id: 'skills'   },
  { name: 'Projects',        href: '#projects', id: 'projects' },
  { name: 'Contact',         href: '#contact',  id: 'contact'  },
];

/* ── Sliding underline indicator (desktop) ──────────────────── */
const ActiveIndicator = memo(({ activeId, refs }) => {
  const [style, setStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const el = refs.current[activeId];
    if (!el) return;
    setStyle({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  }, [activeId, refs]);

  return (
    <motion.span
      className="absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 pointer-events-none"
      animate={style}
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
    />
  );
});

/* ── Navbar ──────────────────────────────────────────────────── */
const Navbar = ({ activeSection }) => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [progress,  setProgress]  = useState(0);
  const itemRefs = useRef({});
  const rafRef   = useRef(null);

  /* Throttled scroll handler */
  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const y    = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 50);
      setProgress(docH > 0 ? Math.min(y / docH, 1) : 0);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  /* Close mobile menu on resize → desktop */
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  /* Smooth scroll helper */
  const goTo = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* ── Glass backdrop ─────────────────────────────────────
            Key fix: we use a TRUE glassmorphism approach —
            a semi-transparent white/dark tinted blur, NOT solid black.
            opacity & blur both increase on scroll.
        ─────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background: 'transparent',
            backdropFilter:       'none',
            WebkitBackdropFilter: 'none',
            borderBottom:         'none',
            boxShadow:            'none',
          }}
        />

        {/* ── Desktop row ─────────────────────────────────────── */}
        <div className="w-full px-5 sm:px-10 lg:px-16">
          <div className="relative flex items-center justify-center h-[72px] sm:h-[80px]">

            {/* Pill nav links — desktop */}
            <div className="hidden md:flex items-center relative">
              <div
                className="flex items-center gap-2 px-8 py-3 rounded-full relative transition-all duration-500"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: scrolled
                    ? '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)'
                    : '0 2px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                {navItems.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      ref={(el) => (itemRefs.current[item.id] = el)}
                      onClick={(e) => goTo(e, item.href)}
                      className="relative px-6 py-2.5 text-[13px] font-semibold tracking-widest uppercase rounded-full select-none group"
                      style={{
                        color: active ? '#ffffff' : 'rgba(186,230,253,0.82)',
                        transition: 'color 0.2s',
                      }}
                    >
                      {/* Active background pill */}
                      {active && (
                        <motion.span
                          layoutId="desk-pill"
                          className="absolute inset-0 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.10)' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}

                      <span className="relative z-10 group-hover:text-white transition-colors duration-200">
                        {item.name}
                      </span>

                      {/* Hover underline */}
                      <span
                        className="absolute bottom-1.5 left-5 right-5 h-[1.5px] rounded-full bg-gradient-to-r from-blue-400 to-purple-500 origin-left transition-transform duration-300"
                        style={{ transform: active ? 'scaleX(1)' : 'scaleX(0)' }}
                      />
                    </a>
                  );
                })}

                {/* Sliding underline */}
                <ActiveIndicator activeId={activeSection} refs={itemRefs} />
              </div>
            </div>

            {/* ── Hamburger (mobile) ──────────────────────────── */}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px]"
            >
              {[
                menuOpen ? { rotate: 45,  y:  7 } : { rotate: 0, y: 0 },
                menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 },
                menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 },
              ].map((anim, i) => (
                <motion.span
                  key={i}
                  className="block w-6 h-[2px] rounded-full bg-gradient-to-r from-blue-400 to-purple-500 origin-center"
                  animate={anim}
                  transition={{ duration: 0.24 }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ──────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mob-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
              style={{
                /* Glass — consistent with desktop, NOT solid black */
                background: 'rgba(10, 14, 26, 0.82)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="container mx-auto px-5 py-4 flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const active = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => goTo(e, item.href)}
                      initial={{ x: -18, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.055, duration: 0.22 }}
                      className="relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-colors duration-200"
                      style={{
                        color:           active ? '#ffffff' : 'rgba(186,230,253,0.82)',
                        background:      active ? 'rgba(99,102,241,0.12)' : 'transparent',
                      }}
                    >
                      {active && (
                        <motion.span
                          layoutId="mob-bar"
                          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-blue-400 to-purple-500"
                        />
                      )}
                      {item.name}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Scroll progress bar ──────────────────────────────── */}
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pointer-events-none"
          style={{ scaleX: progress, transformOrigin: 'left', width: '100%' }}
        />
      </motion.nav>
    </>
  );
};

export default memo(Navbar);