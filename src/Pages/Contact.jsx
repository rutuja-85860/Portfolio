import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Floating code snippets ─────────────────────────────── */
const CODE_SNIPPETS = [
  "const hire = () => 'rutuja';",
  "git commit -m 'open to work'",
  "npm install rutuja-patil",
  "SELECT * FROM opportunities;",
  "import { talent } from './rutuja';",
  "while(!hired) { apply(); }",
  "return <FullStackDev />;",
  "curl -X GET /rutuja/cv",
];

const FloatingCode = () => {
  const [snippets] = useState(() =>
    CODE_SNIPPETS.map((text, i) => ({
      id: i,
      text,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      duration: Math.random() * 14 + 10,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.18 + 0.07,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {snippets.map((s) => (
        <motion.div
          key={s.id}
          className="absolute font-mono text-xs text-cyan-400/40 whitespace-nowrap"
          style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.opacity }}
          animate={{ y: [0, -18, 0], opacity: [s.opacity, s.opacity * 2.5, s.opacity] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {s.text}
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Ambient glow orbs ──────────────────────────────────── */
const GlowOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px]" />
    <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-indigo-600/6 blur-[140px]" />
    {/* Animated micro-orbs */}
    {[
      { x: "15%", y: "20%", color: "bg-violet-500/20", size: "w-2 h-2", dur: 4 },
      { x: "80%", y: "15%", color: "bg-cyan-400/25", size: "w-1.5 h-1.5", dur: 5.5 },
      { x: "70%", y: "75%", color: "bg-purple-400/20", size: "w-2 h-2", dur: 3.5 },
      { x: "25%", y: "80%", color: "bg-blue-400/20", size: "w-1 h-1", dur: 6 },
    ].map((orb, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${orb.color} ${orb.size} blur-sm`}
        style={{ left: orb.x, top: orb.y }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </div>
);

/* ─── Info card ──────────────────────────────────────────── */
const InfoCard = ({ icon, label, value, href, color = "text-cyan-400", delay = 0 }) => (
  <motion.a
    href={href || "#"}
    target={href ? "_blank" : undefined}
    rel="noopener noreferrer"
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ x: 4, scale: 1.01 }}
    className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.07]
               hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer group"
  >
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.06] border border-white/[0.08] group-hover:border-white/20 transition-all duration-300 flex-shrink-0 ${color}`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[11px] text-gray-500 font-medium uppercase tracking-widest leading-none mb-0.5">{label}</p>
      <p className="text-sm text-gray-200 font-medium truncate">{value}</p>
    </div>
    <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-400 ml-auto flex-shrink-0 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </motion.a>
);

/* ─── Stat card ──────────────────────────────────────────── */
const StatCard = ({ value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -3, scale: 1.03 }}
    className="flex-1 min-w-[80px] p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.07]
               hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 text-center"
  >
    <p className={`text-xl font-bold ${color} font-['Space_Grotesk',sans-serif] leading-none`}>{value}</p>
    <p className="text-[10px] text-gray-500 mt-1 leading-tight">{label}</p>
  </motion.div>
);

/* ─── Main component ─────────────────────────────────────── */
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | "success" | "sending"
  const [focused, setFocused] = useState(null);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(null), 4000);
    }, 1200);
  };

  const inputBase = (id) =>
    `w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none
     bg-white/[0.04] border transition-all duration-300 resize-none
     ${focused === id
       ? "border-purple-500/60 shadow-[0_0_0_3px_rgba(168,85,247,0.12)] bg-white/[0.07]"
       : "border-white/[0.08] hover:border-white/20"
     }`;

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-[#080c14] overflow-hidden flex items-center py-24"
    >
      <GlowOrbs />
      <FloatingCode />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
                       bg-purple-500/10 border border-purple-500/25 text-purple-400 mb-6 tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for Opportunities
          </motion.span>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text
                       bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 mb-4 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let's Build Something<br />Amazing Together
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Open to <span className="text-purple-400 font-medium">Full-Stack Development</span>,{" "}
            <span className="text-cyan-400 font-medium">MERN Stack</span>, AI Projects, Internships,
            and Full-Time Opportunities.
          </p>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-6 lg:gap-8 items-start">

          {/* ════ LEFT COLUMN ════ */}
          <div className="space-y-4">

            {/* Intro card */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]
                         backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-500/30"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    R
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#080c14]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Rutuja Patil</h3>
                  <p className="text-gray-400 text-sm">Full Stack Developer · ML Engineer</p>
                  <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                    Building scalable web apps & AI solutions. Always excited to collaborate on meaningful projects.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact info cards */}
            <div className="space-y-2">
              <InfoCard
                delay={0.1}
                color="text-purple-400"
                label="Email"
                value="rutujapatil8386@gmail.com"
                href="mailto:rutujapatil8386@gmail.com"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              <InfoCard
                delay={0.15}
                color="text-blue-400"
                label="LinkedIn"
                value="linkedin.com/in/rutuja-patil"
                href="https://www.linkedin.com/in/rutuja-patil-a70545262"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect width="4" height="12" x="2" y="9" strokeWidth={2} />
                    <circle cx="4" cy="4" r="2" strokeWidth={2} />
                  </svg>
                }
              />
              <InfoCard
                delay={0.2}
                color="text-gray-300"
                label="GitHub"
                value="github.com/rutuja-85860"
                href="https://github.com/rutuja-85860"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 22v-4a4.8 4.8 0 00-1-3.5c3.2-1 5.5-2.5 5.5-5.5 0-1.2-.5-2.4-1.2-3.4.5-1.2.5-2.3 0-3.4-.6-1.5-2.2-2.3-4.1-1.2-.8-.4-1.7-.6-2.6-.6s-1.8.2-2.6.6c-1.9-1.1-3.5-.3-4.1 1.2-.5 1.1-.5 2.2 0 3.4-.7 1-1.2 2.2-1.2 3.4 0 3 2.3 4.5 5.5 5.5-1.2.5-2 1.3-2 2.5v4" />
                  </svg>
                }
              />
              <InfoCard
                delay={0.25}
                color="text-emerald-400"
                label="Location"
                value="Navi Mumbai, Maharashtra, India"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />
            </div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex gap-2 flex-wrap"
            >
              <StatCard value="15+" label="Projects" color="text-purple-400" delay={0.25} />
              <StatCard value="3+" label="Hackathons" color="text-cyan-400" delay={0.3} />
              <StatCard value="8.04" label="CGPA" color="text-violet-400" delay={0.35} />
              <StatCard value="2026" label="Graduate" color="text-blue-400" delay={0.4} />
            </motion.div>

            {/* Resume download */}
            <motion.a
              href="/resume updated.pdf"
              download="Rutuja_Patil_Resume.pdf"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-semibold text-sm text-white
                         bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-600
                         hover:from-purple-500 hover:via-violet-500 hover:to-cyan-500
                         shadow-lg shadow-purple-500/25 transition-all duration-300
                         border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </motion.a>
          </div>

          {/* ════ RIGHT COLUMN — Contact Form ════ */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Card glow border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 p-[1px]">
              <div className="absolute inset-[1px] rounded-2xl bg-[#0c1220]" />
            </div>

            <div className="relative p-6 md:p-8 rounded-2xl bg-[#0c1220]/80 backdrop-blur-md border border-white/[0.08]">
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

              {/* Form header */}
              <div className="mb-7">
                <h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Send a Message
                </h3>
                <p className="text-gray-500 text-sm">I typically reply within 24 hours ⚡</p>
              </div>

              {/* Success toast */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-sm font-medium"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Rutuja Patil"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={inputBase("name")}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="hello@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={inputBase("email")}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    required
                    placeholder="Internship Opportunity / Project Collab / Hiring"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    className={inputBase("subject")}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Hi Rutuja, I'd love to discuss..."
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className={inputBase("message")}
                  />
                </div>

                {/* CTA button */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={status !== "sending" ? { scale: 1.02, y: -2 } : {}}
                  whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                  className="w-full py-4 rounded-xl font-semibold text-sm text-white relative overflow-hidden
                             bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-600
                             hover:from-purple-500 hover:via-violet-500 hover:to-cyan-500
                             disabled:opacity-60 disabled:cursor-not-allowed
                             shadow-xl shadow-purple-500/30 transition-all duration-300 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative flex items-center justify-center gap-2">
                    {status === "sending" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Footer note */}
                <p className="text-center text-xs text-gray-600 pt-1">
                  🔒 Your message is private and will only be seen by me.
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
