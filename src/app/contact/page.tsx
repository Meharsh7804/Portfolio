'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';

export default function ContactPage() {
  const [phase, setPhase] = useState(-1);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const boot = async () => {
      await new Promise(r => setTimeout(r, 2500));
      setPhase(0);
    };
    boot();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNext = () => {
    if (!inputValue.trim()) {
      setError('Silence is not an answer.');
      return;
    }
    
    if (phase === 0) {
      setFormData(p => ({ ...p, name: inputValue }));
      setPhase(1);
      setInputValue('');
      setError('');
    } else if (phase === 1) {
      if (!inputValue.includes('@')) {
        setError('A valid coordinate (email) is required.');
        return;
      }
      setFormData(p => ({ ...p, email: inputValue }));
      setPhase(2);
      setInputValue('');
      setError('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleKeyDownTextArea = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleTransmit();
    }
  };

  const handleTransmit = async () => {
    if (!inputValue.trim()) {
      setError('An empty vessel cannot be sent.');
      return;
    }
    
    const finalData = { ...formData, message: inputValue };
    setFormData(finalData);
    setPhase(3);
    
    try {
      const response = await fetch('https://formspree.io/f/meenqylq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        setPhase(4);
      } else {
        throw new Error('Transmission failed');
      }
    } catch (err) {
      console.error(err);
      setError('The ether is unstable. Please try again.');
      setPhase(2); // Go back to message phase
    }
  };

  return (
    <div className="w-full h-screen bg-[#030303] text-white overflow-hidden relative font-sans selection:bg-amber-500/30">
      {/* ─── BACKGROUND EFFECTS ─────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-80" />
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-screen" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
          }} 
        />
        
        {/* Dynamic Spotlight */}
        <motion.div 
          animate={{
            x: mousePos.x - 400,
            y: mousePos.y - 400,
            backgroundColor: phase === 4 ? 'rgba(16, 185, 129, 0.08)' : phase === 3 ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.03)',
            scale: phase === 3 ? 0.8 : 1,
          }}
          transition={{ 
            type: phase === 3 ? 'tween' : 'spring', 
            damping: 40, 
            stiffness: 50,
            duration: phase === 3 ? 1 : undefined,
          }}
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[150px]"
        />
      </div>

      {/* Back to Homepage Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed top-8 left-8 md:top-12 md:left-12 z-50"
      >
        <Link 
          href="/" 
          className="group flex items-center gap-4 text-[9px] uppercase tracking-[0.5em] text-white/30 hover:text-amber-500 transition-all duration-500"
        >
          <span className="w-8 h-8 border border-white/10 rounded-full flex items-center justify-center group-hover:border-amber-500/50 transition-all">
            ←
          </span>
          <span className="hidden sm:inline">Return to Hub</span>
        </Link>
      </motion.div>

      {/* ─── MAIN CONTENT ─────────────────────────────── */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          
          {/* PHASE -1: BOOTING */}
          {phase === -1 && (
            <motion.div 
              key="boot" 
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }} 
              transition={{ duration: 0.8 }} 
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
                className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b]" 
              />
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5 }}
                className="mt-6 text-[9px] tracking-[0.8em] uppercase font-mono text-white/30 ml-[0.8em]"
              >
                Initializing Link
              </motion.p>
            </motion.div>
          )}

          {/* PHASE 0: NAME */}
          {phase === 0 && (
            <motion.div 
              key="phase0" 
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }} 
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <motion.div initial={{ width: 0 }} animate={{ width: "80px" }} transition={{ delay: 0.5, duration: 1 }} className="h-[1px] bg-amber-500/50 mb-8" />
              <h1 className="text-3xl md:text-5xl font-serif italic text-white/90 mb-6 text-center leading-tight">
                You've traveled far across<br/>the digital expanse.
              </h1>
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase font-mono text-white/40 mb-16 text-center">
                By what name shall I know you?
              </p>
              <div className="w-full max-w-md relative">
                <input 
                  autoFocus
                  type="text"
                  value={inputValue}
                  onChange={e => { setInputValue(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-center text-2xl md:text-3xl font-light outline-none focus:border-amber-500 transition-colors placeholder:text-white/10 text-white"
                  placeholder="Your name..."
                />
                <AnimatePresence>
                  {error && (
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-8 left-0 right-0 text-red-400 text-[10px] tracking-widest uppercase text-center">
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* PHASE 1: EMAIL */}
          {phase === 1 && (
            <motion.div 
              key="phase1" 
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }} 
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <motion.div initial={{ width: 0 }} animate={{ width: "80px" }} transition={{ delay: 0.5, duration: 1 }} className="h-[1px] bg-amber-500/50 mb-8" />
              <h1 className="text-3xl md:text-5xl font-serif italic text-white/90 mb-6 text-center leading-tight">
                Welcome, <span className="text-amber-500/80">{formData.name}</span>.
              </h1>
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase font-mono text-white/40 mb-16 text-center">
                To what coordinates should I send my reply?
              </p>
              <div className="w-full max-w-md relative">
                <input 
                  autoFocus
                  type="email"
                  value={inputValue}
                  onChange={e => { setInputValue(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-center text-2xl md:text-3xl font-light outline-none focus:border-amber-500 transition-colors placeholder:text-white/10 text-white"
                  placeholder="Your email address..."
                />
                <AnimatePresence>
                  {error && (
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-8 left-0 right-0 text-red-400 text-[10px] tracking-widest uppercase text-center">
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* PHASE 2: MESSAGE */}
          {phase === 2 && (
            <motion.div 
              key="phase2" 
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }} 
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <motion.div initial={{ width: 0 }} animate={{ width: "80px" }} transition={{ delay: 0.5, duration: 1 }} className="h-[1px] bg-amber-500/50 mb-8" />
              <h1 className="text-3xl md:text-5xl font-serif italic text-white/90 mb-6 text-center leading-tight">
                Coordinates locked.
              </h1>
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase font-mono text-white/40 mb-12 text-center">
                The stage is yours. What message do you carry?
              </p>
              <div className="w-full max-w-2xl relative flex flex-col items-center">
                <textarea 
                  autoFocus
                  value={inputValue}
                  onChange={e => { setInputValue(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDownTextArea}
                  className="w-full h-[200px] md:h-[250px] bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-lg md:text-xl font-light outline-none focus:border-amber-500/50 focus:bg-white/[0.04] transition-all duration-500 resize-none leading-relaxed placeholder:text-white/10 text-white shadow-2xl"
                  placeholder="Speak, for the ether listens..."
                />
                <motion.button
                  onClick={handleTransmit}
                  whileHover={{ scale: 1.02, backgroundColor: '#f59e0b', borderColor: '#f59e0b' }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute -bottom-6 px-10 py-4 bg-white text-black border border-white text-[10px] tracking-[0.4em] uppercase font-mono rounded-full transition-all shadow-xl font-bold"
                >
                  Send Message
                </motion.button>
                
                <AnimatePresence>
                  {error && (
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-16 left-0 right-0 text-red-400 text-[10px] tracking-widest uppercase text-center">
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <p className="absolute bottom-12 text-[8px] text-white/20 uppercase tracking-[0.3em] font-mono hidden md:block">
                Or press <span className="text-white/40">Ctrl + Enter</span>
              </p>
            </motion.div>
          )}

          {/* PHASE 3: TRANSMITTING */}
          {phase === 3 && (
            <motion.div 
              key="phase3" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }} 
              transition={{ duration: 0.8 }} 
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <div className="relative flex items-center justify-center mb-16">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-20 h-20 border-t border-white/20 rounded-full" />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
              </div>
              <motion.p animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-[14px] tracking-[1em] uppercase font-mono text-amber-500 ml-[1em] text-center">
                Transmitting
              </motion.p>
            </motion.div>
          )}

          {/* PHASE 4: SUCCESS */}
          {phase === 4 && (
            <motion.div 
              key="phase4" 
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
              transition={{ duration: 1.5, ease: "easeOut" }} 
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <motion.div initial={{ height: 0 }} animate={{ height: "100px" }} transition={{ delay: 0.5, duration: 1 }} className="w-[1px] bg-gradient-to-b from-transparent to-green-500/50 mb-10" />
              <h1 className="text-4xl md:text-6xl font-serif italic text-white/90 mb-6 text-center">
                Your frequency has merged with mine.
              </h1>
              <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-mono text-green-400 mb-16 text-center">
                The signal resonates. I will find you when the time is right.
              </p>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} className="text-center space-y-4 mb-20">
                <p className="font-serif italic text-white/30 text-xl md:text-2xl">
                  "इब्तिदा-ए-इश्क़ है, रोता है क्या,
                  आगे-आगे देखिए होता है क्या।"
                </p>
                <p className="text-[8px] uppercase tracking-[0.6em] text-white/20 font-mono">— Mir Taqi Mir</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, duration: 1 }} className="flex gap-10">
                {[
                  { label: 'GITHUB', href: 'https://github.com/MeharshChandure', icon: BsGithub },
                  { label: 'LINKEDIN', href: 'https://linkedin.com/in/meharsh-chandure', icon: BsLinkedin },
                  { label: 'TWITTER', href: '#', icon: BsTwitter }
                ].map(social => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all duration-500">
                      <social.icon className="text-xl text-white/50 group-hover:text-amber-500 transition-colors duration-500" />
                    </div>
                    <span className="text-[9px] tracking-[0.3em] uppercase font-mono text-white/30 group-hover:text-white/80 transition-colors">{social.label}</span>
                  </a>
                ))}
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Persistent Helper Text for ENTER key */}
      <AnimatePresence>
        {(phase === 0 || phase === 1) && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed bottom-12 left-0 right-0 flex justify-center z-50"
          >
            <button 
              onClick={handleNext}
              className="text-[9px] uppercase tracking-[0.4em] font-mono text-white/30 hover:text-amber-500 flex items-center gap-3 transition-colors cursor-pointer group"
            >
              Press <span className="px-3 py-1.5 bg-white/5 group-hover:border-amber-500/50 rounded border border-white/10 text-white/50 group-hover:text-amber-500 font-sans transition-colors">ENTER</span> to continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
