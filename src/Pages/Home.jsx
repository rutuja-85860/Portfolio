import React, {
  useState,
  useCallback,
  memo,
  lazy,
  Suspense,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingLines from '../Components/FloatingLines.jsx';

/* ── Lazy-load Spline (keeps it out of the main bundle) ────── */
const Spline = lazy(() => import('@splinetool/react-spline'));

/* ═══════════════════════════════════════════════════════════════
   TypewriterText  — fully memoised, zero upstream re-renders
═══════════════════════════════════════════════════════════════ */
const TypewriterText = memo(({ texts, typingSpeed = 90, deletingSpeed = 45, pauseTime = 1800 }) => {
  const [idx,      setIdx]      = React.useState(0);
  const [current,  setCurrent]  = React.useState('');
  const [deleting, setDeleting] = React.useState(false);
  const [cursor,   setCursor]   = React.useState(true);

  React.useEffect(() => {
    const target = texts[idx];
    let t;
    if (!deleting) {
      if (current.length < target.length)
        t = setTimeout(() => setCurrent(target.slice(0, current.length + 1)), typingSpeed);
      else
        t = setTimeout(() => setDeleting(true), pauseTime);
    } else {
      if (current.length > 0)
        t = setTimeout(() => setCurrent(current.slice(0, -1)), deletingSpeed);
      else { setDeleting(false); setIdx((p) => (p + 1) % texts.length); }
    }
    return () => clearTimeout(t);
  }, [current, idx, deleting, texts, typingSpeed, deletingSpeed, pauseTime]);

  React.useEffect(() => {
    const iv = setInterval(() => setCursor((p) => !p), 530);
    return () => clearInterval(iv);
  }, []);

  return (
    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-300 tracking-wide">
      {current}
      <span className="font-light ml-0.5" style={{ opacity: cursor ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
    </span>
  );
});

/* ═══════════════════════════════════════════════════════════════
   Holographic loader shown while Spline scene downloads
═══════════════════════════════════════════════════════════════ */
const SplineLoader = memo(() => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
    <div className="relative w-20 h-20">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-full border border-blue-400/30"
          style={{ animation: `spline-ping 1.9s ease-out ${i * 0.52}s infinite` }}
        />
      ))}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse shadow-lg shadow-blue-500/50" />
      </span>
    </div>
    <p className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-blue-300/50 font-mono animate-pulse">
      Loading 3D Scene…
    </p>
  </div>
));

/* ═══════════════════════════════════════════════════════════════
   Framer-motion variants
═══════════════════════════════════════════════════════════════ */
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};
const heroItem = {
  hidden:  { opacity: 0, y: 26 },
  show:    { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};
const modelVariant = {
  hidden:  { opacity: 0, scale: 0.96 },
  show:    { opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
};

/* ═══════════════════════════════════════════════════════════════
   Home
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const roles = ['Full Stack Developer', 'Web Developer', 'Frontend Developer', 'Computer Engineer'];

  const [splineReady, setSplineReady] = useState(false);

  const onSplineLoad  = useCallback(() => setTimeout(() => setSplineReady(true), 280), []);
  const onViewWork    = useCallback(() => window.open('https://github.com/rutuja-85860', '_blank', 'noopener,noreferrer'), []);
  const onResume      = useCallback(() => window.open('/resume iupdated.pdf', '_blank', 'noopener,noreferrer'), []);

  return (
    <div
      id="home"
      className="relative min-h-[100dvh] bg-gray-900 text-white overflow-hidden"
    >
      {/* ── Floating lines (decorative bg) ─────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[8, 12, 16]}
          lineDistance={[8, 6, 4]}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={false}
          parallax={false}
        />
      </div>

      {/* ── Ambient colour blobs ───────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-[15%]  left-[10%]  w-64  h-64  sm:w-80  sm:h-80  bg-blue-500/10   rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] right-[8%]  w-80  h-80  sm:w-96  sm:h-96  bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1.4s]" />
        <div className="absolute top-[50%]  right-[30%] w-40  h-40                       bg-pink-500/8    rounded-full blur-2xl animate-pulse [animation-delay:2.5s]" />
      </div>

      {/* ══════════════════════════════════════════════════════════
          LAYOUT — stacked on mobile, side-by-side on desktop.
          The 3D model takes the FULL right column on desktop and
          becomes a tall block ABOVE the text on mobile.
      ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col lg:flex-row lg:items-center">

        {/* ── 3D MODEL (top on mobile / right on desktop) ──────── */}
        <motion.div
          variants={modelVariant}
          initial="hidden"
          animate="show"
          /* Mobile: full-width block above text, fixed height.
             Desktop: takes ~55% of the width, full viewport height */
          className="
            w-full
            h-[55vw] min-h-[260px] max-h-[440px]
            sm:h-[48vw] sm:max-h-[520px]
            lg:absolute lg:inset-y-0 lg:right-0 lg:w-[58%] lg:h-full lg:max-h-none
            relative flex-shrink-0
          "
        >
          {/* Spline wrapper — transparent bg so model floats freely */}
          <div className="spline-wrap absolute inset-0">

            {/* Holographic loader */}
            <AnimatePresence>
              {!splineReady && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className="absolute inset-0 z-20 flex items-center justify-center"
                  style={{ background: 'rgba(17,24,39,0.85)' }}
                >
                  <SplineLoader />
                </motion.div>
              )}
            </AnimatePresence>

            {/* The actual 3D scene */}
            <Suspense fallback={null}>
              <Spline
                scene="https://prod.spline.design/AumRRd313EiV67lW/scene.splinecode"
                onLoad={onSplineLoad}
                style={{ width: '100%', height: '100%', background: 'transparent' }}
              />
            </Suspense>
          </div>

        </motion.div>

        {/* ── HERO TEXT (bottom on mobile / left on desktop) ───── */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="
            relative z-20
            w-full
            px-5 sm:px-8
            pt-6 pb-16
            sm:pt-8 sm:pb-20
            lg:w-[50%] lg:pl-12 lg:pr-4 lg:py-0 lg:min-h-screen
            flex flex-col justify-center
            items-center text-center
            lg:items-start lg:text-left
          "
        >
          {/* Greeting */}
          <motion.div variants={heroItem}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent leading-none mb-3">
              Hello
            </h1>
          </motion.div>

          {/* Name */}
          <motion.div variants={heroItem}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-4">
              I'm{' '}
              <span className="name-gradient">
                Rutuja Patil
              </span>
            </h2>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={heroItem} className="h-10 sm:h-12 flex items-center mb-4">
            <TypewriterText texts={roles} />
          </motion.div>

          {/* Description */}
          <motion.div variants={heroItem} className="max-w-md w-full mx-auto lg:mx-0 mb-7">
            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed border-l-[3px] border-blue-500 pl-4 py-0.5 italic text-left">
              Aspiring Computer Engineer passionate about building innovative digital
              solutions. Specialised in MERN stack development with hands-on experience
              in full-stack projects.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={heroItem}>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">

              {/* View My Work ─ filled primary */}
              <motion.button
                id="btn-view-work"
                onClick={onViewWork}
                whileHover={{ scale: 1.055, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 340, damping: 22 }}
                className="relative group px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base tracking-wide text-white overflow-hidden cursor-pointer"
                style={{
                  background:  'linear-gradient(135deg,#3b82f6,#7c3aed)',
                  boxShadow:   '0 0 28px rgba(99,102,241,0.38)',
                }}
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 rounded-full ring-2 ring-purple-400/0 group-hover:ring-purple-400/50 transition-all duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.button>

              {/* Resume ─ outlined secondary */}
              <motion.button
                id="btn-resume"
                onClick={onResume}
                whileHover={{ scale: 1.055, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 340, damping: 22 }}
                className="relative group px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base tracking-wide cursor-pointer border-2 border-gray-600/80 text-gray-300 overflow-hidden"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/12 group-hover:to-purple-500/12 transition-all duration-300" />
                <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-400/55 transition-all duration-300" />
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: '0 0 22px rgba(96,165,250,0.22)' }}
                />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-blue-300 transition-colors duration-300">
                  Resume
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom fade to blend into next section ─────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none z-30"
        style={{ background: 'linear-gradient(to top, #111827 0%, rgba(17,24,39,0.5) 60%, transparent 100%)' }}
      />

      {/* ── Component-scoped keyframes ─────────────────────────── */}
      <style>{`
        /* Spline canvas — fully transparent bg so the model floats */
        .spline-wrap canvas {
          width:  100% !important;
          height: 100% !important;
          background: transparent !important;
        }

        /* Hide the "Built with Spline" watermark tag injected by Spline */
        .spline-wrap a[href*="spline"],
        .spline-wrap a[href*="spline.design"],
        a[href*="spline.design"],
        [class*="spline"] a,
        canvas + a,
        canvas ~ a {
          display: none !important;
          pointer-events: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }

        /* Flowing name gradient */
        .name-gradient {
          background: linear-gradient(
            90deg,
            #f472b6,
            #a78bfa,
            #60a5fa,
            #34d399,
            #fbbf24,
            #f472b6
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: name-flow 5s linear infinite;
        }
        @keyframes name-flow {
          0%   { background-position: 0%   center; }
          100% { background-position: 250% center; }
        }

        /* Loader ring pulse */
        @keyframes spline-ping {
          0%   { transform: scale(0.55); opacity: 0.75; }
          80%  { transform: scale(2.1);  opacity: 0;    }
          100% { transform: scale(2.1);  opacity: 0;    }
        }

        /* dvh fallback */
        @supports (height: 100dvh) {
          .min-h-\\[100dvh\\] { min-height: 100dvh; }
        }
      `}</style>
    </div>
  );
}