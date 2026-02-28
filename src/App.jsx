import React, { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Project from './Pages/Project';
import Contact from './Pages/Contact';
import Logo from './Pages/Logo'; 

const sectionIds = ['home', 'about', 'skills', 'projects', 'contact']; 

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({});
  const lenisRef = useRef(null);

  // GLOBAL SMOOTH SCROLL
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    const raf = (time) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    
    requestAnimationFrame(raf);

    return () => lenisRef.current?.destroy();
  }, []);

  // NAVBAR ACTIVE SECTION TRACKING
  useEffect(() => {
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) sectionRefs.current[id] = element;
    });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      }),
      { rootMargin: '-25% 0px -50% 0px', threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach(section => observer.observe(section));

    return () => Object.values(sectionRefs.current).forEach(section => observer.unobserve(section));
  }, []); 

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Navbar activeSection={activeSection} />
      <div id="home"><Home /></div>
      <div id="about"><About /></div>
      <div id="skills"><Logo /></div>
      <div id="projects"><Project /></div>
      <div id="contact"><Contact /></div>
    </div>
  );
}

export default App;
