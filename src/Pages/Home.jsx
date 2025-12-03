import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import FloatingLines from '../Components/FloatingLines.jsx'; // ⭐ Make sure this line exists and points to the correct component path ⭐



// --- TypewriterText Component (No changes needed, it is fine) ---
const TypewriterText = ({ texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);


  useEffect(() => {
    let timeout;
    const targetText = texts[currentTextIndex];


    if (!isDeleting) {
      // Typing
      if (currentText.length < targetText.length) {
        timeout = setTimeout(() => {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Move to next text
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }


    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseTime]);


  useEffect(() => {
    // Cursor blinking logic
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);


    return () => clearInterval(cursorInterval);
  }, []);


  return (
    <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-300"> 
      {currentText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 font-normal`}> 
        |
      </span>
    </span>
  );
};

// --- Home Component (Modified) ---
export default function Home() {
  const roles = [
    'Full Stack Developer',
    'Web Developer', 
    'Frontend Developer',
    'Computer Engineer'
  ];


  const handleViewWork = () => {
    window.open('https://github.com/rutuja-85860', '_blank');
  };
  const handleResume = () => {
    const fileId = '1_V8sR5MFs5dOI0JLMLlKjOAnCrHp5IxF';
    const viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
    window.open(viewUrl, '_blank');
  };


  return (
    // REFINEMENT: Use min-h-[100dvh] for better mobile viewport height handling
    <div className="min-h-[100dvh] bg-gray-900 text-white flex items-center justify-center overflow-hidden relative" id="home">
        {/* ⭐ FLOATING LINES USAGE (REMAINS THE SAME) ⭐ */}
        <div className="absolute inset-0 z-0">
            <FloatingLines 
                enabledWaves={['top', 'middle', 'bottom']}
                lineCount={[10, 15, 20]}
                lineDistance={[8, 6, 4]}
                bendRadius={5.0}
                bendStrength={-0.5}
                interactive={true}
                parallax={true}
            />
        </div>
        {/* ⭐ END FLOATING LINES ADDITION ⭐ */}

    {/* REFINEMENT: Removed h-screen and changed to min-h-screen to allow proper flow on mobile */}
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen lg:h-screen py-20 lg:py-0 z-10">
        
        {/* Left Side - Text Content */}
    {/* REFINEMENT: Added lg:justify-start to align content to the top on desktop while preserving mobile centering via items-center on parent grid */}
        <div className="space-y-8 z-20 order-2 lg:order-1 pt-20 lg:pt-0 flex flex-col items-center text-center lg:items-start lg:text-left"> 
          <div className="space-y-6">
            
            {/* Greeting */}
            <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                Hello
              </h1>
            </div>
            
            {/* Name */}
            <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-black"> 
                I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-xl">Rutuja Patil</span> 
              </h2>
            </div>
            
            {/* Typing Animation */}
    {/* REFINEMENT: Increased min-h to ensure it doesn't jump during typing/deleting */}
            <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards] h-16 min-h-[4rem]"> 
              <TypewriterText texts={roles} typingSpeed={100} deletingSpeed={50} pauseTime={1500} />
            </div>
          </div>
          
          {/* Additional Info */}
    {/* REFINEMENT: Added mx-auto for mobile centering */}
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards] mx-auto lg:mx-0">
            <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed border-l-4 border-blue-500 pl-4 py-1 italic text-left"> 
              Aspiring Computer Engineer passionate about creating innovative digital solutions and bringing ideas to life through code. Specialized in MERN stack development with hands-on experience in full-stack projects.
            </p>
          </div>
          
          {/* Call to Action */}
          <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
    {/* REFINEMENT: Added justify-center for mobile button centering */}
            <div className="flex space-x-4 justify-center lg:justify-start">
              <button 
                onClick={handleViewWork}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.03] transition-all duration-300 shadow-xl shadow-purple-500/30 cursor-pointer"
              >
                View My Work
              </button>
              <button 
                onClick={handleResume}
                className="px-8 py-3 border-2 border-gray-600 rounded-full font-semibold text-gray-300 hover:border-blue-400 hover:text-blue-400 transform hover:scale-[1.03] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Resume
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Side - 3D Model */}
    {/* REFINEMENT: Gave a fixed aspect ratio for mobile and ensured it stretches on desktop. */}
        <div className="relative h-full w-full aspect-square lg:aspect-auto opacity-0 animate-[fadeIn_1.5s_ease-out_0.5s_forwards] order-1 lg:order-2 flex items-center justify-center z-10"> 
            <div className="spline-container w-full h-full max-h-[500px] lg:max-h-none lg:w-[120%] lg:-mr-[20%]"> 
                <Spline scene="https://prod.spline.design/AumRRd313EiV67lW/scene.splinecode" />
            </div>
        </div>
      </div>
      
      {/* Background Elements - Z-20 to be above FloatingLines (Z-0) but below content (Z-10/20) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20"> 
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>
      </div>
      
      {/* Bottom fade overlay - Z-30 to be on top of everything */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-30" />
      
      {/* Custom Styles - No changes needed here, as they handle animations and Spline cleanup */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        /* Spline container styling for proper background and fit */
        .spline-container {
          position: relative;
          width: 100%;
          height: 100%;
          /* Ensure the background of the spline canvas matches the body */
          background-color: #111827; /* Tailwind's gray-900 */
          overflow: hidden;
        }
        
        .spline-container canvas {
          width: 100% !important;
          height: 100% !important;
          /* Important: object-fit: contain can sometimes be better for 3D scenes */
          object-fit: contain; 
        }
        
        /* Hide Spline watermark */
        .spline-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background: linear-gradient(to top, #111827, transparent); /* Use gray-900 color here */
          pointer-events: none;
          z-index: 10;
        }
        
        /* Additional enhancement for name */
        .text-transparent {
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          /* Stronger shadow for floating effect */
          text-shadow: 0 0 40px rgba(168, 85, 247, 0.7); 
        }
        
        /* Responsive adjustments (Kept your original media query and added d-unit fix) */
        @media (max-width: 1024px) {
          .spline-container {
            height: 100%;
            min-height: 400px;
            width: 100% !important;
            margin-right: 0 !important;
            object-fit: cover;
          }
        }

        /* Modern mobile height fix for d-units */
        @supports (height: 100dvh) {
            .min-h-\[100dvh\] {
                min-height: 100dvh;
            }
        }
      `}</style>
    </div>
  );
}