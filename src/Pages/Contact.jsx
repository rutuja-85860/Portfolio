import React, { useState, useRef } from 'react';  // ✅ NO GSAP
import { AnimatePresence, motion } from 'framer-motion';

const Particles = ({ particleColors, particleCount, particleSpread, speed, particleBaseSize, moveParticlesOnHover, alphaParticles, disableRotation }) => {
  return <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.1), transparent 70%)' }} />;
};

const list = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1
    }
  }
};

const item = {
  visible: { opacity: 1, x: 0, scale: 1 },
  hidden: { opacity: 0, x: -10, scale: 0.8 }
};

const btn = {
  visible: { rotate: '45deg' },
  hidden: { rotate: 0 }
};

function FloatingButton({ children, triggerContent }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-center relative">
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="flex flex-row items-center absolute left-24 gap-3 z-20"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={list}>
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
      <motion.div
        variants={btn}
        animate={isOpen ? 'visible' : 'hidden'}
        ref={ref}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer z-10">
        {triggerContent}
      </motion.div>
    </div>
  );
}

function FloatingButtonItem({ children }) {
  return <motion.li variants={item}>{children}</motion.li>;
}

const socialLinks = [
  { 
    id: 'instagram', 
    url: 'https://instagram.com/rutuja._67', 
    color: 'text-pink-400', 
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ) 
  },
  { 
    id: 'linkedin', 
    url: 'https://www.linkedin.com/in/rutuja-patil-a70545262', 
    color: 'text-blue-400', 
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ) 
  },
  { 
    id: 'github', 
    url: 'https://github.com/rutuja-85860', 
    color: 'text-cyan-300', 
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.2-1 5.5-2.5 5.5-5.5.0-1.2-.5-2.4-1.2-3.4.5-1.2.5-2.3.0-3.4-.6-1.5-2.2-2.3-4.1-1.2-.8-.4-1.7-.6-2.6-.6s-1.8.2-2.6.6c-1.9-1.1-3.5-.3-4.1 1.2-.5 1.1-.5 2.2 0 3.4-.7 1-1.2 2.2-1.2 3.4 0 3 2.3 4.5 5.5 5.5-1.2.5-2 1.3-2 2.5v4"/>
      </svg>
    ) 
  },
  { 
    id: 'whatsapp', 
    url: 'https://wa.me/7738558480', 
    color: 'text-green-500', 
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>
      </svg>
    ) 
  },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showStatus, setShowStatus] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', formData);
    setShowStatus(true);
    setTimeout(() => {
      setShowStatus(false);
    }, 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gray-900 p-4 font-sans overflow-hidden">
      <Particles
        particleColors={['#a78bfa', '#22d3ee', '#ffffff']}
        particleCount={150}
        particleSpread={15}
        speed={0.1}
        particleBaseSize={150}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
      />

      <div className="relative z-10 w-full flex flex-col justify-center items-center">
        <div className="text-center mb-10 mt-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 tracking-wider">
            Get in Touch();
          </h2>
        </div>

        <div className="w-full max-w-md bg-gray-900/95 p-6 md:p-8 rounded-xl shadow-2xl border border-indigo-700/50 mb-10 backdrop-blur-sm">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-1">
              Send a Message
            </h1>
            <p className="text-gray-400 italic text-sm">I'd love to hear from you!</p>
          </header>

          {showStatus && (
            <div className="mb-4 p-3 bg-cyan-900/50 text-cyan-300 rounded-lg text-center font-medium border border-cyan-700/50">
              Message sent successfully! We will get back to you.
            </div>
          )}

          <div className="space-y-6">
            {['name', 'email', 'message'].map(field => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-300 sr-only">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === 'message' ? (
                  <textarea
                    id={field}
                    rows={5}
                    placeholder={`Your ${field}`}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none placeholder-gray-500"
                  />
                ) : (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
                  />
                )}
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg font-bold text-lg text-white
                        bg-gradient-to-r from-indigo-600 to-purple-600
                        hover:from-indigo-700 hover:to-purple-700
                        transition duration-300 shadow-lg shadow-purple-600/30
                        active:scale-[0.98] cursor-pointer"
            >
              Send Secure Message
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center p-3 rounded-full 
                        bg-gray-800/90 border border-purple-500/50 shadow-lg shadow-purple-900/50 
                        transform transition duration-500 
                        hover:scale-110 hover:bg-gray-700/80 hover:shadow-cyan-400/40 
                        ${link.color}`}
              aria-label={`Link to my ${link.id}`}
            >
              <span className="w-6 h-6 md:w-8 md:h-8">
                {link.svg}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
