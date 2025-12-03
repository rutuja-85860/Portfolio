import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Project from './Pages/Project';
import Contact from './Pages/Contact';
import Logo from './Pages/Logo'; // Assuming 'Logo' component is the Technical Stack/Skills section

// Define all section IDs that correspond to Navbar links
const sectionIds = ['home', 'about', 'skills', 'projects', 'contact']; 

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({}); 

  // --- Intersection Observer Logic ---
  useEffect(() => {
    // 1. Map section IDs to their corresponding DOM elements
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        sectionRefs.current[id] = element;
      }
    });

    // 2. Setup the Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Found the section that is currently visible
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null, 
        // Trigger when the section's center crosses the viewport center
        rootMargin: '-50% 0px -50% 0px', 
        threshold: 0,
      }
    );

    // 3. Start observing sections
    Object.values(sectionRefs.current).forEach(section => {
      observer.observe(section);
    });

    return () => {
      // 4. Cleanup observer on unmount
      Object.values(sectionRefs.current).forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []); 

  return (
    <>
      {/* Pass the dynamically tracked activeSection to the Navbar */}
      <Navbar activeSection={activeSection} />
      
      {/* Attach IDs to all sections for Intersection Observer to track */}
      <div id="home"><Home /></div>
      <div id="about"><About /></div>
      {/* IMPORTANT: Ensure this ID matches the ID in the Navbar's navItems array */}
      <div id="skills"><Logo /></div> 
      <div id="projects"><Project /></div>
      <div id="contact"><Contact /></div>
    </>
  );
}

export default App;