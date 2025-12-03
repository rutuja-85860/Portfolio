import React, { useState, useEffect, useRef } from 'react';
// Assuming NavIndicator is in the correct path
import NavIndicator from '../Components/NavIndicator.jsx'; 


const Navbar = ({ activeSection }) => { 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItemRefs = useRef({});
  const activeRef = useRef(null);

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Technical Stack', href: '#skills', id: 'skills' }, // ID must match App.jsx div ID
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    // 1. SCROLL EFFECT
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // 2. SET ACTIVE REF FOR INDICATOR
    activeRef.current = navItemRefs.current[activeSection];
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-700/30' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Centering the Desktop Nav, placing hamburger button absolutely on mobile */}
        <div className="flex justify-center items-center h-20 md:justify-center relative">
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-6 relative px-8 py-3 bg-gray-800/20 backdrop-blur-sm rounded-full border border-gray-700/30">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  ref={el => (navItemRefs.current[item.id] = el)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-white group ${
                    activeSection === item.id 
                      ? 'text-white' // Active link remains pure white
                      // ENHANCEMENT: Unique, subtle teal/cyan color for non-active links
                      : 'text-cyan-200/80' 
                  }`}
                >
                  {item.name}
                  
                  {/* Hover underline */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
              
              {/* Moving indicator line */}
              
            </div>
          </div>

          {/* Mobile Menu Button - Positioned absolutely to the right */}
          <button 
            className="md:hidden absolute right-6 top-6 w-8 h-8 flex flex-col justify-center items-center group z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* Hamburger to X transition */}
            <div className={`w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}`}></div>
            <div className={`w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-gray-900/95 backdrop-blur-lg`}>
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-4 py-3 text-lg font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-white' 
                      // ENHANCEMENT: Applying the same subtle color to mobile links
                    : 'text-cyan-200/80 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
                {activeSection === item.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full"></div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;