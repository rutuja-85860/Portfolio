// NavIndicator.jsx (You may need to update the import path in Navbar.jsx if this is not the location)

import React, { useState, useEffect } from 'react';

const NavIndicator = ({ activeRef, activeSection }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    // Only calculate position if an active section is set
    if (activeRef.current && activeSection) {
      // Measure the active element's position and size
      const { offsetLeft, offsetWidth } = activeRef.current;
      
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth, // Use the actual width of the active item
        opacity: 1,
        // Move down slightly, adjusted for the parent's padding
        transform: 'translateY(18px)', 
      });
    } else {
      // Hide the indicator if no section is active or ref isn't ready
      setIndicatorStyle({
        width: '0px',
        opacity: 0,
      });
    }
  }, [activeRef, activeSection]);

  return (
    <div
      className="absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
      style={{ ...indicatorStyle }}
    />
  );
};

export default NavIndicator;