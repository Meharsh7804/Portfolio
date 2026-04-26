'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CONTACT_DETAILS = [
  { label: 'NAME', value: 'MEHARSH M. CHANDURE' },
  { label: 'EMAIL', value: 'meharsh7804@gmail.com' },
  { label: 'PHONE', value: '(+91) 7219701494' },
  { label: 'LOCUS', value: 'Nagpur, Maharashtra, India' }
];

const SOCIALS = [
  { label: 'GITHUB', href: 'https://github.com/MeharshChandure' },
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/meharsh-chandure' },
  { label: 'TWITTER', href: '#' }
];

export default function ContactPage() {
  const [phase, setPhase] = useState<'intro' | 'reveal' | 'ready' | 'transmitting' | 'success'>('intro');
  const [expanded, setExpanded] = useState(false);
  const [inactivityCount, setInactivityCount] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Phase transitions
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('reveal'), 3000), // "Before you leave..." -> Details reveal
      setTimeout(() => setPhase('ready'), 6000)   // Details reveal -> Form ready
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Inactivity hook
  useEffect(() => {
    const timer = setInterval(() => {
      if (phase === 'ready') setInactivityCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setInactivityCount(0); // Reset on activity
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase('transmitting');
    setTimeout(() => setPhase('success'), 2500);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#050505] text-white overflow-hidden relative flex flex-col items-center justify-center font-sans select-none"
    >
      {/* ─── BACKGROUND EFFECTS ─────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle Ambient Glow that follows cursor */}
        <motion.div 
          animate={{ x: mousePos.x - 200, y: mousePos.y - 200 }}
          transition={{ type: 'spring', damping: 50, stiffness: 200 }}
          className="w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] absolute top-0 left-0"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
        
        {/* Cinematic Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* PHASE 1: INTRO */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div 
            key="intro"
            exit={{ opacity: 0, y: -20, filter: 'blur(20px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="z-50 text-center space-y-6"
          >
            <motion.p 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl font-light tracking-[0.4em] text-white/30 italic"
            >
              Before you leave...
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 1.2, duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-bold tracking-[0.2em] movie-title"
            >
              Let's <span className="text-amber-500">connect.</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2+: MAIN INTERFACE ────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        
        {/* Identity Reveal (Data Streams) */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10 w-full max-w-4xl">
          {CONTACT_DETAILS.map((detail, i) => (
            <AnimatePresence key={detail.label}>
              {(phase === 'reveal' || phase === 'ready' || phase === 'transmitting' || phase === 'success') && (
                <motion.div 
                  initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  <p className="text-[10px] uppercase tracking-[0.6em] text-white/20 mb-2 flex items-center gap-3">
                    <motion.span 
                      initial={{ width: 0 }} animate={{ width: 20 }} transition={{ delay: i * 0.15 + 0.5, duration: 1 }}
                      className="h-[1px] bg-amber-500/40" 
                    />
                    {detail.label}
                  </p>
                  <p className="text-sm md:text-xl tracking-[0.1em] font-mono group-hover:text-amber-500 transition-colors duration-500">
                    {detail.value}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {(phase === 'ready') && (
            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleTransmit}
              className="w-full max-w-xl space-y-6"
            >
              {!expanded ? (
                <motion.div 
                  layoutId="contact-form"
                  onClick={() => setExpanded(true)}
                  className="group cursor-text p-8 border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:border-amber-500/40 hover:bg-white/[0.04] transition-all duration-500 rounded-sm flex items-center justify-between"
                >
                  <span className="text-white/30 tracking-[0.4em] uppercase text-[10px]">Initiate Connection...</span>
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-amber-500/50" />
                </motion.div>
              ) : (
                <motion.div layoutId="contact-form" className="space-y-4 p-2">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.input 
                      autoFocus
                      required
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      placeholder="NAME"
                      className="bg-white/[0.03] border border-white/10 p-5 font-mono text-[10px] uppercase tracking-[0.3em] outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all duration-500"
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    />
                    <motion.input 
                      required
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      placeholder="EMAIL"
                      type="email"
                      className="bg-white/[0.03] border border-white/10 p-5 font-mono text-[10px] uppercase tracking-[0.3em] outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all duration-500"
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                  <motion.textarea 
                    required
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    placeholder="SIGNAL CONTENT / MESSAGE"
                    rows={5}
                    className="w-full bg-white/[0.03] border border-white/10 p-5 font-mono text-[10px] uppercase tracking-[0.3em] outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all duration-500 resize-none"
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  />
                  <motion.button
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    whileHover={{ scale: 1.01, letterSpacing: '0.6em', backgroundColor: '#f59e0b', color: '#000' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 border border-white/20 text-white font-bold uppercase tracking-[0.5em] text-[10px] transition-all duration-500"
                  >
                    Transmit Signal
                  </motion.button>
                </motion.div>
              )}
            </motion.form>
          )}

          {phase === 'transmitting' && (
            <motion.div 
              key="transmitting"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center space-y-8"
            >
              <div className="relative flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 10], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute w-20 h-20 bg-amber-500 rounded-full blur-xl"
                />
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_white]" />
              </div>
              <p className="text-amber-500 uppercase tracking-[0.8em] font-mono animate-pulse">Transmitting Signal...</p>
            </motion.div>
          )}

          {phase === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <h2 className="text-4xl movie-title text-green-500">Signal Received.</h2>
              <p className="text-white/40 tracking-widest text-sm italic">Usually replies faster than expected.</p>
              <motion.div 
                initial={{ width: 0 }} animate={{ width: 100 }} transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] bg-green-500/50 mx-auto"
              />
              <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] mt-10">
                Built with code, caffeine, and questionable sleep.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emotional Hook */}
        <AnimatePresence>
          {inactivityCount >= 15 && phase === 'ready' && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute -bottom-20 text-center space-y-2 pointer-events-none"
            >
              <p className="text-white/20 italic tracking-widest text-xs">Still here?</p>
              <p className="text-white/40 tracking-[0.3em] uppercase text-[10px]">Maybe we should build something together.</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Floating Socials (Orbiting) */}
      {(phase === 'ready' || phase === 'success') && (
        <div className="fixed bottom-12 left-12 flex flex-col gap-6">
          {SOCIALS.map((social, i) => (
            <motion.a 
              key={social.label}
              href={social.href}
              target="_blank"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.4, x: 0 }}
              whileHover={{ opacity: 1, x: 10, color: '#f59e0b' }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-[10px] font-mono tracking-[0.4em] uppercase"
            >
              {social.label}
            </motion.a>
          ))}
        </div>
      )}

      {/* Final Signature */}
      <AnimatePresence>
        {phase === 'success' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            className="fixed bottom-12 right-12 text-center"
          >
            <p className="font-serif italic text-2xl text-white/40">— Meharsh</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Homepage Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="fixed top-12 left-12 z-50"
      >
        <Link 
          href="/" 
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all duration-500"
        >
          <span className="w-5 h-5 border border-white/10 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/5 transition-all">
            ←
          </span>
          Back to Homepage
        </Link>
      </motion.div>

    </div>
  );
}
