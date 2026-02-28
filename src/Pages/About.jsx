import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHeading from '../Components/AnimatedHeading.jsx';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const profileRef = useRef(null);
  const textBlockRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const detailRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(profileRef.current, 
        { scale: 0.8, opacity: 0, rotateX: -10 },
        { 
          scale: 1, opacity: 1, rotateX: 0, 
          duration: 1.2, ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: profileRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textBlockRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      });

      tl.fromTo(badgeRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo(headingRef.current, 
        { opacity: 0, y: 30, rotateX: 20 }, 
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8 }, "-=0.2"
      )
      .fromTo(introRef.current, 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 0.7 }, "-=0.3"
      )
      .fromTo(detailRef.current, 
        { opacity: 0, y: 30, scale: 0.98 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.9 }, "-=0.2"
      )
      .fromTo(ctaRef.current, 
        { opacity: 0, y: 40, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.4"
      );

      gsap.to(containerRef.current, {
        rotateX: 1,
        rotateY: -1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000"
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>

      <div ref={containerRef} className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="text-center mb-16">
          <AnimatedHeading 
            sentence="About Me"
            manualMode={false}
            blurAmount={5}
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light mt-6">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            ref={profileRef}
            className="flex items-center justify-center lg:justify-start"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative group">
              <motion.div 
                className="relative w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/20"
                animate={{ 
                  boxShadow: ["0 25px 50px -12px rgba(0,0,0,0.5)", "0 35px 60px -12px rgba(59,130,246,0.3)"]
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img 
                  src="/public/Images/Gemini_Generated_Image_4gzbth4gzbth4gzb.png" 
                  alt="Rutuja Patil"
                  className="w-full h-full object-cover rounded-[1.5rem]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>

          <div ref={textBlockRef} className="space-y-10">
            <motion.div 
              ref={badgeRef}
              initial={{ opacity: 0, y: 20 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg" />
              <span className="text-sm font-semibold text-gray-200 tracking-wide uppercase">About Rutuja</span>
            </motion.div>

            <motion.h2 
              ref={headingRef}
              className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-200 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight"
            >
              Everything About
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Rutuja Patil</span>
            </motion.h2>

            <motion.p 
              ref={introRef}
              className="text-xl text-gray-300 font-medium leading-relaxed max-w-lg"
            >
              Computer Engineering student specializing in full-stack development. 
              Building scalable MERN applications that solve real problems with elegant code.
            </motion.p>

            <motion.p 
              ref={detailRef}
              className="text-lg text-gray-400 leading-relaxed max-w-lg"
            >
              Passionate about creating intuitive digital experiences through clean architecture and modern technologies. 
              Always exploring new tools to deliver performant, user-centric solutions.
            </motion.p>

            <motion.div ref={ctaRef}>
              <motion.button 
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 overflow-hidden border-0"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 30px 60px rgba(59,130,246,0.4)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  View My Work
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default About;
