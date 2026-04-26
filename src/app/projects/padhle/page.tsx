'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CHAT_MESSAGES = [
  { id: 1, text: "Bhai notes bhej", sender: "Aman", time: "11:02 PM", side: 'left' },
  { id: 2, text: "Bhai pls urgent", sender: "Rohit", time: "11:02 PM", side: 'left' },
  { id: 3, text: "Kal exam hai", sender: "Sanket", time: "11:03 PM", side: 'left' },
  { id: 4, text: "PDF hai kya?", sender: "Unknown", time: "11:03 PM", side: 'left' },
  { id: 5, text: "Send fast", sender: "Tanmay", time: "11:04 PM", side: 'left' },
  { id: 6, text: "Bhai Unit 3 missing hai", sender: "Group", time: "11:05 PM", side: 'left' },
  { id: 7, text: "Notes please!!", sender: "Sneha", time: "11:05 PM", side: 'left' },
  { id: 8, text: "Help me out", sender: "Yash", time: "11:06 PM", side: 'left' },
  { id: 9, text: "Practical viva?", sender: "Rahul", time: "11:06 PM", side: 'left' },
  { id: 10, text: "Check mail pls", sender: "Meera", time: "11:07 PM", side: 'left' },
  { id: 11, text: "Link expired?", sender: "Abhi", time: "11:07 PM", side: 'left' },
  { id: 12, text: "Pls bhej do notes", sender: "Isha", time: "11:08 PM", side: 'left' },
  { id: 13, text: "Is it tomorrow?", sender: "Kunal", time: "11:08 PM", side: 'left' },
  { id: 14, text: "Notes group link?", sender: "Siddhesh", time: "11:09 PM", side: 'left' },
  { id: 15, text: "Urgent help!!", sender: "Priya", time: "11:10 PM", side: 'left' },
  { id: 16, text: "Syllabus change?", sender: "Om", time: "11:10 PM", side: 'left' },
  { id: 17, text: "Bhai notes!!", sender: "Varun", time: "11:11 PM", side: 'left' },
  { id: 18, text: "Unit 5 pdf?", sender: "Aayush", time: "11:11 PM", side: 'left' },
  { id: 19, text: "Wait for me", sender: "Riya", time: "11:12 PM", side: 'left' },
  { id: 20, text: "Send fast bro", sender: "Tushar", time: "11:12 PM", side: 'left' },
];

export default function PadhleProject() {
  const [phase, setPhase] = useState<'chat' | 'chaos' | 'pause' | 'idea' | 'build' | 'reveal' | 'details'>('chat');
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  // Story Sequencing
  useEffect(() => {
    let timer = 0;
    
    // 1. Initial calm messages
    CHAT_MESSAGES.slice(0, 4).forEach((msg, i) => {
      setTimeout(() => setVisibleMessages(prev => [...prev, msg.id]), timer);
      timer += 800;
    });

    // 2. Chaos phase (Total Flood)
    setTimeout(() => {
      setPhase('chaos');
      CHAT_MESSAGES.slice(4).forEach((msg, i) => {
        setTimeout(() => setVisibleMessages(prev => [...prev, msg.id]), i * 150);
      });
    }, timer + 400);

    // 3. Transitions
    setTimeout(() => setPhase('pause'), timer + 4500);
    setTimeout(() => setPhase('idea'), timer + 6500);
    setTimeout(() => setPhase('build'), timer + 9000);
    setTimeout(() => setPhase('reveal'), timer + 11500);
    setTimeout(() => setPhase('details'), timer + 13500);

  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 overflow-hidden relative">
      
      <AnimatePresence mode="wait">
        
        {/* --- PHASE 1 & 2: CHAT & CHAOS --- */}
        {(phase === 'chat' || phase === 'chaos') && (
          <motion.div 
            key="chat-phase"
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(30px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-[#050505]"
          >
            {/* The Central Mobile Container */}
            <motion.div 
              animate={phase === 'chaos' ? { x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0] } : {}}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="w-full max-w-[380px] h-[700px] bg-[#0b141a] border border-white/10 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative z-20 border-[8px] border-[#1f2c34]"
            >
              {/* WhatsApp Header */}
              <div className="pt-10 pb-4 px-6 bg-[#1f2c34] flex items-center gap-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black font-bold">M</div>
                <div className="flex-1">
                  <p className="font-bold text-sm tracking-tight text-white/90">Meharsh</p>
                  <p className="text-[10px] text-green-500 animate-pulse font-medium">online</p>
                </div>
                <div className="flex gap-4 text-white/40">
                  <span className="text-lg">⋮</span>
                </div>
              </div>

              {/* Chat Content (Internal) */}
              <div className="flex-1 p-4 space-y-3 overflow-y-hidden relative bg-[#0b141a]">
                 {/* Internal messages only show up to a point */}
                 {CHAT_MESSAGES.slice(0, 8).map((msg) => (
                    <AnimatePresence key={msg.id}>
                      {visibleMessages.includes(msg.id) && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          className="max-w-[85%] p-3 rounded-2xl rounded-tl-none bg-[#1f2c34] text-white/90 shadow-lg text-[11px] leading-relaxed"
                        >
                          <p className="font-bold text-[9px] text-amber-500/80 mb-1">{msg.sender}</p>
                          {msg.text}
                        </motion.div>
                      )}
                    </AnimatePresence>
                 ))}
              </div>

              {/* Fake Input Area */}
              <div className="p-4 bg-[#1f2c34] flex items-center gap-2 mb-2">
                <div className="flex-1 h-10 bg-[#2a3942] rounded-full px-4 flex items-center text-white/20 text-[10px]">
                  Type a message...
                </div>
              </div>
            </motion.div>

            {/* --- THE EXTERNAL FLOOD CHAOS --- */}
            {phase === 'chaos' && (
              <div className="absolute inset-0 pointer-events-none z-30">
                {CHAT_MESSAGES.slice(4).map((msg, i) => (
                  <AnimatePresence key={`flood-${msg.id}`}>
                    {visibleMessages.includes(msg.id) && (
                      <motion.div 
                        initial={{ 
                          opacity: 0, 
                          scale: 0.5,
                          x: (Math.random() - 0.5) * 200,
                          y: (Math.random() - 0.5) * 200
                        }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          x: (Math.random() - 0.5) * window.innerWidth * 0.8,
                          y: (Math.random() - 0.5) * window.innerHeight * 0.8,
                          rotate: (Math.random() - 0.5) * 30
                        }}
                        transition={{ 
                          type: 'spring', 
                          damping: 12, 
                          stiffness: 100,
                          duration: 0.8
                        }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-[#1f2c34] border border-white/10 rounded-2xl rounded-tl-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[150px] max-w-[250px]"
                      >
                        <p className="font-bold text-[9px] text-amber-500 mb-1 uppercase tracking-widest">{msg.sender}</p>
                        <p className="text-xs text-white/90">{msg.text}</p>
                        <div className="mt-2 flex justify-end">
                           <span className="text-[8px] text-white/20">{msg.time}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* --- PHASE 3: PAUSE MOMENT --- */}
        {phase === 'pause' && (
          <motion.div 
            key="pause-phase"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="text-2xl md:text-4xl font-light tracking-[0.4em] text-white/40 italic text-center px-8"
            >
              "There has to be a better way."
            </motion.p>
          </motion.div>
        )}

        {/* --- PHASE 4: IDEA TRANSITION --- */}
        {phase === 'idea' && (
          <motion.div 
            key="idea-phase"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-50"
          >
            <motion.p 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-bold tracking-widest movie-title text-center px-4 leading-tight"
            >
              What if notes were <br/><span className="text-amber-500">always available?</span>
            </motion.p>
          </motion.div>
        )}

        {/* --- PHASE 5+: BUILD & DETAILS --- */}
        {(phase === 'build' || phase === 'reveal' || phase === 'details') && (
           <motion.div 
             key="final-reveal"
             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
             className="w-full flex flex-col items-center"
           >
              {/* Build Animation */}
              {phase === 'build' && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#050505]">
                  <div className="relative w-full max-w-5xl h-[600px]">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ 
                          opacity: 0, 
                          x: (Math.random() - 0.5) * 1500, 
                          y: (Math.random() - 0.5) * 1500, 
                          rotate: (Math.random() - 0.5) * 180 
                        }}
                        animate={{ x: 0, y: 0, rotate: 0, opacity: 0.05 }}
                        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                        className="absolute inset-0 border border-white/20 rounded-xl bg-white/[0.01]"
                        style={{ scale: 1.2 - i * 0.08 }}
                      />
                    ))}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                    >
                      <p className="text-[10px] tracking-[1.5em] uppercase text-amber-500/40 animate-pulse">Reconstructing_Academic_Flow</p>
                      <div className="w-48 h-[1px] bg-white/10 overflow-hidden">
                         <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1/2 h-full bg-amber-500/50" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Main Reveal */}
              {(phase === 'reveal' || phase === 'details') && (
                <div className="w-full flex flex-col items-center">
                   <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-[#050505]">
                      <motion.div 
                        className="text-center"
                      >
                        <motion.h1 
                          initial={{ opacity: 0, letterSpacing: '1.5em', filter: 'blur(10px)' }}
                          animate={{ opacity: 1, letterSpacing: '0.4em', filter: 'blur(0px)' }}
                          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                          className="text-7xl md:text-[10rem] font-bold movie-title text-amber-500 leading-none mb-8"
                        >
                          PADHLE
                        </motion.h1>
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.5, duration: 1.2 }}
                          className="text-lg md:text-2xl font-light tracking-[0.6em] uppercase text-white/20"
                        >
                          Notes. Anytime. Anywhere.
                        </motion.p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
                      >
                        <span className="text-[10px] tracking-[0.8em] uppercase text-white/20">The Solution Unveiled</span>
                        <div className="w-[1px] h-20 bg-gradient-to-b from-amber-500 to-transparent" />
                      </motion.div>
                   </div>

                   {/* Project Details */}
                   <section id="project-info" className="w-full max-w-7xl px-8 py-40 space-y-40 relative z-10">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                        <motion.div 
                          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                          className="space-y-10"
                        >
                          <div className="inline-block px-4 py-1 border border-red-500/30 bg-red-500/5 rounded-full">
                            <span className="text-[10px] uppercase tracking-[0.5em] text-red-500 font-bold">The Problem</span>
                          </div>
                          <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-[1.1]">
                            When urgent needs meet fragmented sources.
                          </h2>
                          <p className="text-white/40 leading-relaxed font-mono text-xs uppercase tracking-widest">
                            The academic ecosystem was broken. Students were trapped in a cycle of begging for notes across endless WhatsApp threads, only to receive low-quality images or expired links.
                          </p>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                          className="space-y-10"
                        >
                          <div className="inline-block px-4 py-1 border border-amber-500/30 bg-amber-500/5 rounded-full">
                            <span className="text-[10px] uppercase tracking-[0.5em] text-amber-500 font-bold">The Solution</span>
                          </div>
                          <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-[1.1]">
                            Centralized intelligence, accessible instantly.
                          </h2>
                          <p className="text-white/40 leading-relaxed font-mono text-xs uppercase tracking-widest">
                            We architected Padhle to be a permanent academic repository. A seamless web interface that houses every semester's notes, sorted and verified—eliminating chat-dependency forever.
                          </p>
                        </motion.div>
                      </div>

                      {/* Feature Showcase */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                          { title: "ZERO FRICTION", desc: "Access the entire library in under 5 seconds. No logins, no hurdles.", icon: "⚡" },
                          { title: "OFFLINE SYNC", desc: "Download high-compression PDFs designed for quick offline access.", icon: "📥" },
                          { title: "CURATED FLOW", desc: "A navigation system built specifically for the chaos of exam nights.", icon: "📂" }
                        ].map((feat, i) => (
                          <motion.div 
                            key={feat.title}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                            className="p-12 border border-white/5 bg-white/[0.01] backdrop-blur-3xl hover:border-amber-500/20 transition-all rounded-sm group"
                          >
                            <div className="text-5xl mb-8 group-hover:scale-125 transition-transform duration-500">{feat.icon}</div>
                            <h3 className="text-sm font-bold tracking-[0.4em] uppercase mb-6 text-white/80">{feat.title}</h3>
                            <p className="text-[11px] leading-loose text-white/30 uppercase tracking-widest">{feat.desc}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-center gap-16 pt-20">
                        <div className="text-center space-y-6">
                          <h4 className="text-[10px] uppercase tracking-[0.8em] text-white/20">Engineered with</h4>
                          <p className="text-2xl tracking-[0.4em] text-amber-500">HTML ∙ CSS ∙ Javascript</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-10">
                          <a href="https://padhle-rcoem.vercel.app/" target="_blank" className="px-14 py-7 bg-white text-black hover:bg-amber-500 font-bold uppercase tracking-[0.4em] text-[11px] transition-all duration-500 rounded-sm">
                            Launch Interface
                          </a>
                          <a href="#" className="px-14 py-7 border border-white/10 text-white hover:border-amber-500 hover:bg-white/5 font-bold uppercase tracking-[0.4em] text-[11px] transition-all duration-500 rounded-sm">
                            View Engine
                          </a>
                        </div>
                        <Link href="/" className="text-[10px] uppercase tracking-[0.8em] text-white/20 hover:text-white transition-all flex items-center gap-4">
                          <span className="text-lg">←</span> BACK TO SHOWCASE
                        </Link>
                      </div>
                   </section>
                </div>
              )}
           </motion.div>
        )}

      </AnimatePresence>

      {/* Background Decorative Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.01)_0%,transparent_80%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

    </div>
  );
}
