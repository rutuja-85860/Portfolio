import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Shield,
  BarChart3,
  Cloud,
  Database,
  Monitor,
  Layers,
  MessageSquare,
  ExternalLink,
  Award,
  Calendar,
  Building,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
} from "lucide-react";

const projects = [
  {
    name: "Investment Portal",
    type: "Finance Platform",
    description:
      "A comprehensive platform providing real-time investment analytics, AI-powered stock recommendations, and advanced financial insights with predictive modeling.",
    image: "/public/Images/investment.png",
    link: "https://github.com/rutuja-85860/Investment-Portal",
    tags: ["react.js", "tailwind", "api", "chart.js", "finance", "ai"],
    color: "text-blue-400",
    borderColor: "border-blue-400",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    align: "left",
    status: "Live",
    year: "2024",
  },
  {
    name: "Disaster Management System (MERN Stack)",
    type: "Disaster Platform",
    description:
      "A comprehensive real-time disaster management system built using the MERN stack ",
    image: "/public/Images/disateer.jpg",
    link: "https://github.com/rutuja-85860/Disaster-Management",
    tags: ["react.js", "MongoDB", "Express", "Node.js", "tailwind", "next.js", "api",],
    color: "text-emerald-400",
    borderColor: "border-emerald-400",
    bgGradient: "from-emerald-500/10 to-green-500/10",
    align: "right",
    status: "Beta",
    year: "2024",
  },
];

const certificates = [
  {
    name: "Software Engineering Job Simulation",
    issuer: "Accenture via Forage",
    date: "June 17, 2025",
    skills: ["Architecture", "Security", "Programming", "Testing", "Agile"],
    verificationCode: "qCKKZb582SgR2qjEe",
    color: "text-purple-400",
    borderColor: "border-purple-400",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    align: "left",
    icon: Code,
    certificateFile: "/public/Images/accenture.pdf",
    rating: 5,
  },
  {
    name: "Cybersecurity Analyst Job Simulation",
    issuer: "TATA via Forage",
    date: "June 17, 2025",
    skills: [
      "Identity and access management (IAM) fundamentals",
      "IAM strategy assessment",
      "Crafting custom IAM solutions",
      "Platform integration",
    ],
    verificationCode: "yD5PDx5v3Ep5Xv6gA",
    color: "text-yellow-400",
    borderColor: "border-yellow-400",
    bgGradient: "from-yellow-500/10 to-orange-500/10",
    align: "right",
    icon: Layers,
    certificateFile: "/public/Images/cybersecruity.pdf",
    rating: 5,
  },
  {
    name: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "TATA via Forage",
    date: "June 17, 2025",
    skills: [
      "Framing Business Scenario",
      "Choosing Right Visuals",
      "Creating Effective Visuals",
      "Communicating Insights",
    ],
    verificationCode: "qAHyPZgjqHgg39Aaa",
    color: "text-green-400",
    borderColor: "border-green-400",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    align: "left",
    icon: BarChart3,
    certificateFile: "/public/Images/data visualization.pdf",
    rating: 5,
  },
  {
    name: "Solutions Architecture Job Simulation",
    issuer: "AWS via Forage",
    date: "June 17, 2025",
    skills: ["Designing Scalable Hosting Architecture"],
    verificationCode: "83fwPBPFu8BfKKmWL",
    color: "text-orange-400",
    borderColor: "border-orange-400",
    bgGradient: "from-orange-500/10 to-red-500/10",
    align: "right",
    icon: Cloud,
    certificateFile: "/public/Images/AWS.pdf",
    rating: 5,
  },
  {
    name: "Data Analyst Certification",
    issuer: "One Roadmap",
    date: "July 27, 2025",
    skills: ["Data Analysis", "Statistical Analysis", "Data Visualization"],
    verificationCode: "CERT-CEE8C80B",
    verifyUrl: "https://oneroadmap.io/skills/da/certificate/CERT-CEE8C80B",
    color: "text-blue-400",
    borderColor: "border-blue-400",
    bgGradient: "from-blue-500/10 to-indigo-500/10",
    align: "left",
    icon: Database,
    certificateFile: "/public/Images/Data Analyst-Certificate.pdf",
    rating: 5,
  },
 
];

const experiences = [
 
  {
    title: "Web Developer",
    company: " Prodigy InfoTech.",
    duration: "1st-oct-2024 - 31st-oct-2024",
    
    description:
      "Developed responsive web applications and improved user experience across multiple products. Collaborated with design teams to implement pixel-perfect interfaces.",
    skills: ["React", "MongoDB", "Git"],
    color: "text-emerald-400",
    borderColor: "border-emerald-400",
    bgGradient: "from-emerald-500/10 to-green-500/10",
    align: "right",
    icon: Monitor,
    image: "/public/Images/prodogy.jpeg",
  },
  
  {
    title: "Full Stack Java Training ",
    company: "  CNC Web World",
    duration: "Jan 2025 – July 2025",
    
    description:
      "This training helped me strengthen my skills in Java, backend development, frontend integration, and full-stack project implementation. ",
    skills: ["React", "MongoDB","Java","Fullstack Development", "Git","Github"],
    color: "text-emerald-400",
    borderColor: "border-emerald-400",
    bgGradient: "from-emerald-500/10 to-green-500/10",
    align: "right",
    icon: Monitor,
    image: "/public/Images/cnc.jpeg",
  },
];

// Floating particles background
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced section header
const SectionHeader = ({ title, subtitle, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <div className="flex justify-center items-center mb-4">
      <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
    </div>
    <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
      {title}
    </h2>
    <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
  </motion.div>
);

function Project() {
  const [activeSection, setActiveSection] = useState("projects");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredCertificate, setHoveredCertificate] = useState(null);
  const [hoveredExperience, setHoveredExperience] = useState(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // --- ADDED CONSTANT FOR RESUME FILE PATH ---
  // NOTE: You MUST place your 'Rutu Resume.pdf' file inside your project's 'public' folder.
  const RESUME_FILE_PATH = "/Rutu Resume.pdf";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section !== "certificates") {
      setShowAllCertificates(false);
    }
  };

  const handleViewMoreCertificates = () => {
    setShowAllCertificates(!showAllCertificates);
  };

  const handleCertificateClick = (certificateFile) => {
    if (certificateFile) {
      window.open(certificateFile, "_blank");
    }
  };

  const sectionConfig = {
    projects: {
      title: "My Projects",
      subtitle: "Innovative solutions crafted with passion and precision",
      icon: Code,
    },
    certificates: {
      title: "Certifications",
      subtitle: "Continuous learning and professional development",
      icon: Award,
    },
    experience: {
      title: "Experience",
      subtitle: "Professional journey and career milestones",
      icon: Building,
    },
  };

  return (
    <div className="bg-gradient-to-br  bg-gray-900 min-h-screen overflow-hidden relative">
      <FloatingParticles />

      {/* Cursor glow effect */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
      />

      <section
        id="project"
        className="max-w-screen-xl mx-auto px-4 sm:px-8 py-24 text-white relative z-10"
      >
        {/* Enhanced Navigation */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-16 relative">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "calc(100% + 60px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent hidden sm:block"
          />

          {Object.entries(sectionConfig).map(([key, config], index) => (
            <div
              key={key}
              className="relative w-full sm:w-1/3 flex justify-center"
            >
              {index === 0 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "calc(100% - 40px)" }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                  className="absolute top-1/2 right-full h-[1px] bg-gradient-to-r from-transparent to-blue-500/50 hidden sm:block"
                />
              )}

              {index === 2 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "calc(100% - 40px)" }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                  className="absolute top-1/2 left-full h-[1px] bg-gradient-to-l from-transparent to-blue-500/50 hidden sm:block"
                />
              )}

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSectionChange(key)}
                className={`relative px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-500 w-full sm:w-auto border backdrop-blur-sm overflow-hidden group ${
                  activeSection === key
                    ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-2xl shadow-blue-500/30 border-blue-400/50"
                    : "bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-600/60 hover:to-purple-600/60 hover:text-white hover:shadow-xl hover:shadow-blue-500/20 border-gray-700/50 hover:border-blue-400/30"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <config.icon className="w-5 h-5" />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader {...sectionConfig[activeSection]} />
          </motion.div>
        </AnimatePresence>

        {/* Timeline Container */}
        <div className="relative mt-16">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="absolute left-1/2 transform -translate-x-1/2 w-[1px] bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 hidden sm:block"
          />

          {/* Projects Section */}
          <AnimatePresence mode="wait">
            {activeSection === "projects" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`flex flex-col sm:flex-row items-center gap-8 sm:gap-16 my-20 relative ${
                      project.align === "right" ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Enhanced Connector */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 bg-gradient-to-r ${project.bgGradient} backdrop-blur-sm z-20 hidden sm:flex items-center justify-center ${project.borderColor}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${project.color.replace(
                          "text-",
                          "bg-"
                        )}`}
                      />
                    </motion.div>

                    {/* Enhanced Horizontal Line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 250 }}
                      transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      viewport={{ once: true }}
                      className={`absolute top-1/2 h-[1px] bg-gradient-to-r ${
                        project.align === "left"
                          ? "from-blue-500/50 to-transparent right-1/2"
                          : "from-transparent to-blue-500/50 left-1/2"
                      } hidden sm:block`}
                    />

                    {/* Enhanced Project Card */}
                    <motion.div
                      initial={{
                        x: project.align === "right" ? 100 : -100,
                        opacity: 0,
                      }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      viewport={{ once: true }}
                      className="w-full sm:w-1/2 flex justify-center relative"
                      onMouseEnter={() => setHoveredProject(index)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <div className="relative group overflow-hidden rounded-2xl">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${project.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                        />
                        <div className="relative p-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 group-hover:border-blue-400/50 transition-all duration-500">
                          <img
                            src={project.image}
                            alt={project.name}
                            className={`max-w-[400px] w-full rounded-xl shadow-2xl transition-all duration-700 ${
                              hoveredProject === index
                                ? "scale-105 shadow-blue-500/25"
                                : "scale-100"
                            }`}
                          />

                          {/* Status Badge */}
                          <div className="absolute top-4 right-4">
                            <span
                              className={`px-3 py-1 text-xs font-bold rounded-full ${
                                project.status === "Live"
                                  ? "bg-green-500/80 text-white"
                                  : "bg-yellow-500/80 text-black"
                              } backdrop-blur-sm`}
                            >
                              {project.status}
                            </span>
                          </div>

                          {/* Enhanced Hover Overlay */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: hoveredProject === index ? 1 : 0,
                              y: hoveredProject === index ? 0 : 20,
                            }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl flex items-center justify-center"
                          >
                            <div className="text-center space-y-4">
                              <motion.a
                                href={project.link}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                              >
                                <span>View Project</span>
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </motion.a>
                              <p className="text-sm text-gray-300">
                                Built in {project.year}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Enhanced Project Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                      viewport={{ once: true }}
                      className="w-full sm:w-1/2 space-y-4"
                    >
                      <div className="space-y-2">
                        <h3
                          className={`font-bold text-3xl md:text-5xl ${project.color} flex items-center gap-3`}
                        >
                          {project.name}
                          <Sparkles className="w-6 h-6" />
                        </h3>
                        <span
                          className={`${project.color} text-lg md:text-xl font-medium opacity-80`}
                        >
                          {project.type}
                        </span>
                      </div>

                      <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag, idx) => (
                          <motion.li
                            key={idx}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`list-none border rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm ${project.borderColor} ${project.color} bg-gradient-to-r ${project.bgGradient} hover:shadow-lg transition-all duration-300`}
                          >
                            #{tag}
                          </motion.li>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Certificates Section */}
          <AnimatePresence mode="wait">
            {activeSection === "certificates" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {certificates
                  .slice(0, showAllCertificates ? certificates.length : 3)
                  .map((certificate, index) => {
                    const IconComponent = certificate.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`flex flex-col sm:flex-row items-center gap-8 sm:gap-16 my-20 relative ${
                          certificate.align === "right"
                            ? "sm:flex-row-reverse"
                            : ""
                        }`}
                      >
                        {/* Enhanced Connector */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          viewport={{ once: true }}
                          className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 bg-gradient-to-r ${certificate.bgGradient} backdrop-blur-sm z-20 hidden sm:flex items-center justify-center ${certificate.borderColor}`}
                        >
                          <Award className="w-3 h-3 text-yellow-400" />
                        </motion.div>

                        {/* Enhanced Horizontal Line */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: 250 }}
                          transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                            delay: 0.5,
                          }}
                          viewport={{ once: true }}
                          className={`absolute top-1/2 h-[1px] bg-gradient-to-r ${
                            certificate.align === "left"
                              ? "from-purple-500/50 to-transparent right-1/2"
                              : "from-transparent to-purple-500/50 left-1/2"
                          } hidden sm:block`}
                        />

                        {/* Enhanced Certificate Icon */}
                        <motion.div
                          initial={{
                            x: certificate.align === "right" ? 100 : -100,
                            opacity: 0,
                          }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                          viewport={{ once: true }}
                          className="w-full sm:w-1/2 flex justify-center relative"
                          onMouseEnter={() => setHoveredCertificate(index)}
                          onMouseLeave={() => setHoveredCertificate(null)}
                        >
                          <div className="relative group">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className={`w-40 h-40 rounded-2xl border-4 ${certificate.borderColor} flex items-center justify-center bg-gradient-to-br ${certificate.bgGradient} backdrop-blur-sm transition-all duration-500 cursor-pointer shadow-2xl relative overflow-hidden`}
                              onClick={() =>
                                handleCertificateClick(
                                  certificate.certificateFile
                                )
                              }
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                              <IconComponent
                                className={`w-20 h-20 ${certificate.color} relative z-10`}
                              />

                              {/* Rating Stars */}
                              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                                {[...Array(certificate.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-3 h-3 text-yellow-400 fill-current"
                                  />
                                ))}
                              </div>
                            </motion.div>

                            {/* Enhanced Action Buttons */}
                            <AnimatePresence>
                              {hoveredCertificate === index && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex flex-col gap-2"
                                >
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      handleCertificateClick(
                                        certificate.certificateFile
                                      )
                                    }
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center text-sm shadow-lg backdrop-blur-sm"
                                  >
                                    <span>View Certificate</span>
                                    <ExternalLink className="w-3 h-3 ml-2" />
                                  </motion.button>

                                  {certificate.verifyUrl && (
                                    <motion.a
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      href={certificate.verifyUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center text-sm shadow-lg backdrop-blur-sm"
                                    >
                                      <span>Verify Online</span>
                                      <Shield className="w-3 h-3 ml-2" />
                                    </motion.a>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>

                        {/* Enhanced Certificate Details */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: 0.4,
                          }}
                          viewport={{ once: true }}
                          className="w-full sm:w-1/2 space-y-4"
                        >
                          <div className="space-y-2">
                            <h3
                              className={`font-bold text-2xl md:text-4xl ${certificate.color} flex items-center gap-3`}
                            >
                              {certificate.name}
                              <Zap className="w-5 h-5" />
                            </h3>
                            <div className="flex items-center gap-4 text-gray-400 text-sm md:text-base">
                              <div className="flex items-center gap-2">
                                <Building className="w-4 h-4" />
                                <span className="font-semibold">
                                  {certificate.issuer}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
                              <Calendar className="w-4 h-4" />
                              <span>{certificate.date}</span>
                            </div>
                            <p className="text-gray-400 text-xs md:text-sm font-mono bg-gray-800/50 px-3 py-1 rounded-md inline-block">
                              ID: {certificate.verificationCode}
                            </p>
                          </div>

                          {/* Enhanced Skills */}
                          <div className="space-y-3">
                            <p className="text-gray-300 text-sm font-semibold">
                              Skills Covered:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {certificate.skills.map((skill, idx) => (
                                <motion.li
                                  key={idx}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  className={`list-none border rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm ${certificate.borderColor} ${certificate.color} bg-gradient-to-r ${certificate.bgGradient} hover:shadow-lg transition-all duration-300`}
                                >
                                  {skill}
                                </motion.li>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Experience Section */}
          <AnimatePresence mode="wait">
            {activeSection === "experience" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {experiences.map((experience, index) => {
                  const IconComponent = experience.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className={`flex flex-col sm:flex-row items-center gap-8 sm:gap-16 my-20 relative ${
                        experience.align === "right"
                          ? "sm:flex-row-reverse"
                          : ""
                      }`}
                    >
                      {/* Enhanced Connector */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 bg-gradient-to-r ${experience.bgGradient} backdrop-blur-sm z-20 hidden sm:flex items-center justify-center ${experience.borderColor}`}
                      >
                        <Building className="w-3 h-3 text-blue-400" />
                      </motion.div>

                      {/* Enhanced Horizontal Line */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 250 }}
                        transition={{
                          duration: 1.2,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                        viewport={{ once: true }}
                        className={`absolute top-1/2 h-[1px] bg-gradient-to-r ${
                          experience.align === "left"
                            ? "from-green-500/50 to-transparent right-1/2"
                            : "from-transparent to-green-500/50 left-1/2"
                        } hidden sm:block`}
                      />

                      {/* Enhanced Experience Icon */}
                      <motion.div
                        initial={{
                          x: experience.align === "right" ? 100 : -100,
                          opacity: 0,
                        }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                        viewport={{ once: true }}
                        className="w-full sm:w-1/2 flex justify-center relative"
                        onMouseEnter={() => setHoveredExperience(index)}
                        onMouseLeave={() => setHoveredExperience(null)}
                      >
                        <div className="relative group">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className={`w-40 h-40 rounded-2xl border-4 ${experience.borderColor} flex items-center justify-center bg-gradient-to-br ${experience.bgGradient} backdrop-blur-sm transition-all duration-500 shadow-2xl relative overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                            <IconComponent
                              className={`w-20 h-20 ${experience.color} relative z-10`}
                            />

                            {/* Company Badge */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                              <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                                {experience.duration.split(" - ")[0]}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Enhanced Experience Details */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.4,
                        }}
                        viewport={{ once: true }}
                        className="w-full sm:w-1/2 space-y-4"
                      >
                        <div className="space-y-2">
                          <h3
                            className={`font-bold text-2xl md:text-4xl ${experience.color} flex items-center gap-3`}
                          >
                            {experience.title}
                            <Sparkles className="w-5 h-5" />
                          </h3>
                          <div className="flex flex-col gap-1 text-gray-400">
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              <span className="font-semibold text-lg">
                                {experience.company}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{experience.duration}</span>
                              </div>
                              <span>📍 {experience.location}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                          {experience.description}
                        </p>

                        {/* Enhanced Skills */}
                        <div className="space-y-3">
                          <p className="text-gray-300 text-sm font-semibold">
                            Technologies Used:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill, idx) => (
                              <motion.li
                                key={idx}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className={`list-none border rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm ${experience.borderColor} ${experience.color} bg-gradient-to-r ${experience.bgGradient} hover:shadow-lg transition-all duration-300`}
                              >
                                {skill}
                              </motion.li>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center mt-20"
          >
            {activeSection === "certificates" && (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewMoreCertificates}
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 rounded-xl shadow-lg shadow-purple-500/25 flex items-center gap-2 backdrop-blur-sm border border-purple-400/30"
              >
                <span>{showAllCertificates ? "View Less" : "View More"}</span>
                {showAllCertificates ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </motion.button>
            )}

            {activeSection === "projects" && (
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/rutuja-85860"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transition-all duration-300 rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2 backdrop-blur-sm border border-blue-400/30"
              >
                <span>View More Projects</span>
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}

            {activeSection === "experience" && (
              <motion.a // Changed to motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={RESUME_FILE_PATH} // Added href
                download="Rutuja_Patil_Resume.pdf" // Added download with suggested filename
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white transition-all duration-300 rounded-xl shadow-lg shadow-green-500/25 flex items-center gap-2 backdrop-blur-sm border border-green-400/30"
              >
                <span>Download Resume</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </motion.a> // Changed to motion.a
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Project;