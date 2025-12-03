
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHeading from '../Components/AnimatedHeading.jsx';




gsap.registerPlugin(ScrollTrigger);


// ScrollReveal Component
const ScrollRevel = ({ 
  children, 
  scrollContainerRef, 
  enableBlur = true, 
  baseOpacity = 0.1, 
  baseRotation = 2, 
  blurStrength = 3, 
  containerClassName = '', 
  textClassName = '', 
  rotationEnd = 'bottom bottom', 
  wordAnimationEnd = 'bottom bottom' 
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span key={index} className="word inline-block">
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current 
      ? scrollContainerRef.current 
      : window;

    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true
        }
      }
    );

    const wordElements = el.querySelectorAll('.word');
    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true
        }
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={containerClassName}>
      <p className={textClassName}>{splitText}</p>
    </div>
  );
};

// FloatingCard Component
const FloatingCard = ({ children, delay = 0 }) => {
  return (
    <div 
      className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-2xl hover:border-blue-500/50"
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// About Component (About.jsx)
export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const aboutText = `I'm Rutuja Patil, a passionate Computer Engineering student with a deep love for creating innovative digital solutions. My journey in tech began with curiosity and has evolved into a dedicated pursuit of excellence in full-stack development. Specializing in the MERN stack, I enjoy building applications that solve real-world problems and create meaningful user experiences. I'm always eager to learn new technologies and take on challenging projects that push my boundaries.`;
  
  const educationText = `Computer Engineering Student. Full Stack Development Focus. Continuous Learner & Problem Solver.`;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
        {/* Header Section with AnimatedHeading */}
        <div className="text-center mb-16 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Section - Professional Profile Image */}
          <div className="flex items-center justify-center lg:justify-start opacity-0 animate-[fadeInLeft_1s_ease-out_0.4s_forwards]">
            <div className="relative">
              {/* Profile Image Container */}
              <div className="relative w-[400px] h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/20">
                {/* Placeholder Image with Gradient Background */}
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gray-800/60 backdrop-blur-sm flex items-center justify-center border-2 border-gray-700/50">
                      <svg className="w-20 h-20 text-blue-400/60" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-white text-2xl font-semibold tracking-wide">Rutuja Patil</p>
                    <p className="text-gray-400 text-sm mt-2 font-light">Computer Engineering Student</p>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Right Section - About Info with ScrollReveal */}
          <div className="space-y-10 opacity-0 animate-[fadeInRight_1s_ease-out_0.6s_forwards]">
            
            {/* My Story Header */}
            <div className="bg-gray-800/50 rounded-2xl p-2 backdrop-blur-sm text-center">
              <h2 className="py-3 px-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                My Story
              </h2>
            </div>

            {/* Journey & Passion - Using ScrollReveal */}
            <FloatingCard>
              <h3 className="text-3xl font-extrabold text-white mb-6 border-b border-gray-700 pb-3 flex items-center gap-2">
                Journey & Passion <span className="text-3xl">🚀</span>
              </h3>
              <div className="text-gray-300 leading-relaxed">
                <ScrollRevel
                  baseOpacity={0.1}
                  enableBlur={true}
                  baseRotation={2}
                  blurStrength={3}
                  textClassName="font-medium text-white text-lg" 
                  containerClassName="text-lg"
                >
                  {aboutText}
                </ScrollRevel>
              </div>
            </FloatingCard>
            
            {/* Education & Background */}
            <FloatingCard delay={200}>
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                Education & Focus <span className="text-3xl">🎓</span>
              </h3>
              <div className="space-y-4">
                {educationText.split('.').filter(s => s.trim()).map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]" 
                    style={{animationDelay: `${600 + index * 200}ms`}}
                  >
                    <div className={`w-3 h-3 min-w-[12px] mt-2 rounded-full ${index % 3 === 0 ? 'bg-blue-500' : index % 3 === 1 ? 'bg-purple-500' : 'bg-pink-500'} shadow-lg`}></div>
                    <span className="text-gray-300 text-lg font-light leading-relaxed">{item.trim()}</span>
                  </div>
                ))}
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}