import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Note: You must ensure GSAP and ScrollTrigger are installed (npm install gsap)
// and that './ScrollRevel.jsx' is the correct path in your project structure.

gsap.registerPlugin(ScrollTrigger);

const ScrollRevel = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    // Split by spaces, keeping the spaces as separate elements
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word; // Return spaces as is
      
      // Use 'inline-block' to prevent words from wrapping awkwardly during animation
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // --- 1. Container Rotation Animation ---
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

    // --- 2. Word Opacity Animation ---
    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity, filter' }, // Added filter to willChange
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

    // --- 3. Word Blur Animation (Optional) ---
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

    // Cleanup ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    // Applied professional font styling (size, weight) here, ensuring the container class is used
    // for the paragraph to inherit font properties from the parent
    <div ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`font-serif leading-[1.6] ${textClassName}`}>{splitText}</p>
    </div>
  );
};

export default ScrollRevel;