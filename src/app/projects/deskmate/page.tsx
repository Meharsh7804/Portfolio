'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BsClock, BsCpu, BsLightning, BsGithub } from 'react-icons/bs';

const QUESTIONS = [
  "Bhai HOD ma’am kaha hai?",
  "Form kisko submit karu?",
  "Sir free hai kya?",
  "Class kaha hai?",
  "Attendance sheet kidhar hai?",
  "Next class cancel hai?",
  "Room 204 kidhar hai?",
  "Bhai signature chahiye tha",
  "HOD cabin shift hua?",
  "Break kab hai?",
  "Notes mile kya?",
  "Practical ka timing?",
  "Sir gussa hai kya?",
  "Submission date extend hui?",
  "Assignment me kya likhna hai?",
  "Bhai pls check group",
  "CR kaha ho tum??",
  "List me mera naam hai?",
  "Exam form kab aayega?",
  "Bhai help kardo urgent",
  "Syllabus change?",
  "Viva kab hai?",
  "Practical marks kab lagenge?",
  "Sir ka cabin change?",
  "Bhai pls help kardo",
  "Attendance check??",
  "Class 101 ya 102?",
  "Sir sign kab karenge?",
  "Lab open hai?",
  "Bhai notes pdf bhej"
];

const Stickman = ({ animation }: { animation: 'idle' | 'chaos' | 'shrug' }) => {
  return (
    <motion.svg 
      viewBox="0 0 100 150" 
      className="w-32 h-48 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
    >
      {/* Head */}
      <motion.circle 
        cx="50" cy="30" r="10" stroke="white" strokeWidth="3" fill="none" 
      />
      {/* Body */}
      <line x1="50" y1="40" x2="50" y2="90" stroke="white" strokeWidth="3" />
      {/* Arms */}
      <motion.path 
        d={animation === 'shrug' || animation === 'chaos' ? "M30 60 L50 50 L70 60" : "M30 70 L50 50 L70 70"} 
        stroke="white" strokeWidth="3" fill="none" 
      />
      {/* Legs */}
      <motion.path 
        d="M35 130 L50 90 L65 130" 
        stroke="white" strokeWidth="3" fill="none"
      />
    </motion.svg>
  );
};

export default function DeskMateProject() {
  const [phase, setPhase] = useState<'intro' | 'flood' | 'freeze' | 'realization' | 'transformation' | 'details'>('intro');
  const [visibleCount, setVisibleCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const skippedRef = useRef(false);

  const skipStory = () => {
    skippedRef.current = true;
    setPhase('details');
  };

  // Story Sequencing
  useEffect(() => {
    let timer = 0;

    // Phase 1: Intro (0-1.2s)
    timer = 1200;
    
    // Phase 2: Systematic Flood (Accelerated)
    setTimeout(() => {
      if (skippedRef.current) return;
      setPhase('flood');
      
      const revealNext = (index: number) => {
        if (skippedRef.current) return;
        if (index >= QUESTIONS.length) {
          // Chaos ends -> Freeze
          setTimeout(() => { if (!skippedRef.current) setPhase('freeze'); }, 1000);
          setTimeout(() => { if (!skippedRef.current) setPhase('realization'); }, 2000);
          setTimeout(() => { if (!skippedRef.current) setPhase('transformation'); }, 4000);
          setTimeout(() => { if (!skippedRef.current) setPhase('details'); }, 5500);
          return;
        }

        setVisibleCount(index + 1);

        // Accelerated delay logic: 1st question: 400ms, then drops fast
        const delay = Math.max(400 - index * 40, 20);
        setTimeout(() => revealNext(index + 1), delay);
      };

      revealNext(0);
    }, timer);

  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 overflow-hidden relative font-sans">
      
      <AnimatePresence mode="wait">
        
        {/* STORY OVERLAY */}
        {(phase !== 'details') && (
          <motion.div 
            key="story-container"
            exit={{ opacity: 0, filter: 'blur(30px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

            {/* Skip Story Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={skipStory}
              className="absolute bottom-8 right-8 z-[60] px-6 py-2.5 border border-white/10 bg-white/[0.03] backdrop-blur-md text-[9px] uppercase tracking-[0.5em] text-white/30 hover:text-white hover:border-white/30 transition-all duration-500 rounded-full"
            >
              Skip Story →
            </motion.button>

            {/* Stickman Center (STATIONARY) */}
            <div className="relative flex flex-col items-center gap-12 z-20">
              <Stickman animation={
                phase === 'flood' ? 'chaos' : 
                phase === 'realization' ? 'shrug' : 'idle'
              } />
              
              <AnimatePresence>
                {phase === 'intro' && (
                  <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-lg md:text-2xl font-light tracking-[0.4em] text-white/40 italic text-center"
                  >
                    Being a CR sounds easy...
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Questions Flood Area */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {QUESTIONS.map((q, i) => {
                if (i >= visibleCount) return null;

                // Distribution logic: Orbital but avoiding center
                const angle = (i * 137.5) * (Math.PI / 180); // Sunflower spiral pattern for systematic feel
                const minRadius = 250; 
                const radius = minRadius + (i * 15); 
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={
                      phase === 'transformation' ? { 
                        x: 0, y: 0, opacity: 0, scale: 0, 
                        transition: { duration: 0.8, delay: i * 0.01 } 
                      } :
                      phase === 'freeze' ? { 
                        opacity: 1, scale: 1,
                        x: Math.cos(angle) * radius, 
                        y: Math.sin(angle) * radius 
                      } :
                      { 
                        opacity: 0.7, scale: 1, 
                        x: Math.cos(angle) * radius, 
                        y: Math.sin(angle) * radius,
                        // Subtle systematic orbit
                        rotate: [0, 5, -5, 0],
                        transition: { duration: 2, repeat: Infinity }
                      }
                    }
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 border border-white/10 bg-white/[0.03] backdrop-blur-md rounded-full text-[9px] md:text-[11px] tracking-widest uppercase font-mono text-white/80 whitespace-nowrap"
                  >
                    {q}
                  </motion.div>
                );
              })}
            </div>

            {/* Realization Overlay */}
            {phase === 'realization' && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-6 z-30 backdrop-blur-md"
              >
                <p className="text-3xl md:text-5xl font-light tracking-[0.4em] movie-title text-white">This isn't scalable.</p>
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                  className="text-lg md:text-2xl font-light tracking-[0.4em] text-white/40 italic"
                >
                  "There has to be a better way."
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* DETAILS SECTION (Merged Reveal) */}
        {(phase === 'details') && (
          <motion.div 
            key="details-section"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center"
          >
            {/* Cinematic Reveal Hero */}
            <div className="h-screen w-full flex flex-col items-center justify-center relative bg-[#050505]">
              <div className="text-center">
                <motion.h1 
                  initial={{ opacity: 0, letterSpacing: '1.5em', filter: 'blur(10px)' }}
                  animate={{ opacity: 1, letterSpacing: '0.5em', filter: 'blur(0px)' }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-7xl md:text-[10rem] font-bold movie-title text-amber-500 leading-none mb-8"
                >
                  DESKMATE
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1.2 }}
                  className="text-lg md:text-2xl font-light tracking-[0.6em] uppercase text-white/20"
                >
                  Ask once. Get answers anytime.
                </motion.p>
              </div>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
              >
                <span className="text-[10px] tracking-[0.8em] text-white/20 uppercase">Scroll to Explore</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-amber-500 to-transparent" />
              </motion.div>
            </div>

            {/* Content Breakdown */}
            <section className="w-full max-w-7xl px-8 py-40 space-y-40 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-12">
                  <div className="inline-block px-6 py-2 border border-red-500/20 bg-red-500/5 rounded-full">
                    <span className="text-[10px] uppercase tracking-[0.6em] text-red-500 font-bold">The Problem</span>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-serif italic text-white/90 leading-[1.1]">The CR's nightmare.</h2>
                  <p className="text-white/40 leading-loose font-mono text-xs uppercase tracking-[0.2em]">Repeatedly answering the same queries for 60+ students manually was impossible to scale. The information existed, but it was trapped in static PDFs or professor's emails.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-12">
                  <div className="inline-block px-6 py-2 border border-amber-500/20 bg-amber-500/5 rounded-full">
                    <span className="text-[10px] uppercase tracking-[0.6em] text-amber-500 font-bold">The Solution</span>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-serif italic text-white/90 leading-[1.1]">An automated intelligence node.</h2>
                  <p className="text-white/40 leading-loose font-mono text-xs uppercase tracking-[0.2em]">DeskMate centralizes department data and uses NLP logic to provide verified, instant answers to anyone, anytime.</p>
                </motion.div>
              </div>

              {/* Functional Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { title: "INTEGRATED FLOW", desc: "Live professor availability and classroom shifts.", icon: "⏱️" },
                  { title: "AI RESOLVER", desc: "Understands natural language academic queries.", icon: "🤖" },
                  { title: "SCALABLE ANSWERS", desc: "One knowledge base serving hundreds of students.", icon: "⚡" }
                ].map((feat, i) => (
                  <motion.div key={feat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="p-12 border border-white/5 bg-white/[0.01] backdrop-blur-3xl hover:border-amber-500/20 transition-all rounded-sm group relative overflow-hidden">
                    <div className="relative mb-12 flex items-center justify-start group">
                      <motion.div initial={{ scale: 0, opacity: 0 }} whileHover={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="absolute -inset-4 bg-amber-500/40 rounded-full blur-3xl pointer-events-none" />
                      <motion.div className="text-6xl relative z-10 text-amber-500 transition-all duration-700 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(245,158,11,1)]">
                        {feat.icon}
                      </motion.div>
                    </div>
                    <h3 className="text-sm font-bold tracking-[0.4em] uppercase mb-6 text-white/80">{feat.title}</h3>
                    <p className="text-[11px] leading-loose text-white/30 uppercase tracking-widest">{feat.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="flex flex-col items-center gap-16 pt-20">
                <div className="text-center space-y-6">
                   <h4 className="text-[10px] uppercase tracking-[0.8em] text-white/20">Engineered with</h4>
                   <p className="text-2xl tracking-[0.4em] text-amber-500">Streamlit ∙ Python ∙ NLP Logic</p>
                </div>
                <div className="flex flex-wrap justify-center gap-10">
                  <button 
                    onClick={() => {
                      setShowNotification(true);
                      setTimeout(() => setShowNotification(false), 3000);
                    }}
                    className="px-16 py-6 bg-white text-black hover:bg-amber-500 font-black uppercase tracking-[0.4em] text-[12px] transition-all duration-500 rounded-sm shadow-xl"
                  >
                    Try DeskMate
                  </button>
                  <a href="https://github.com/Meharsh7804/DeskMate" target="_blank" className="px-16 py-6 border border-white/10 text-white hover:border-amber-500 hover:bg-white/5 font-bold uppercase tracking-[0.4em] text-[12px] transition-all duration-500 rounded-sm flex items-center gap-3">
                    <BsGithub className="text-lg" /> View Engine
                  </a>
                </div>
                <Link href="/" className="text-[10px] uppercase tracking-[1em] text-white/20 hover:text-white transition-all flex items-center gap-6">
                  <span className="text-xl">←</span> BACK TO SHOWCASE
                </Link>
              </div>
            </section>
          </motion.div>
        )}

      </AnimatePresence>
      {/* Coming Soon Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-full flex items-center gap-4"
          >
            <BsCpu className="text-lg animate-spin" />
            Deployment in Progress... Stay Tuned!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
