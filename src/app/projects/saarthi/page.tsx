'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const NODES = [
  "Mapping Intent Vectors",
  "Resolving Temporal Constraints",
  "Negotiating Service APIs",
  "Synthesizing Strategic Path",
  "Finalizing Autonomous Protocol"
];

// Particle Component for "The Dissolve"
const Particle = ({ i }: { i: number }) => {
  const angle = (i / 50) * Math.PI * 2;
  const radius = 200 + Math.random() * 300;
  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        scale: [0, 1.5, 0]
      }}
      transition={{ duration: 3, delay: Math.random() * 2, repeat: Infinity }}
      className="absolute w-1 h-1 bg-amber-500 rounded-full"
    />
  );
};

export default function SaarthiProject() {
  const [phase, setPhase] = useState<'primitive' | 'prison' | 'dissolve' | 'intent' | 'execution' | 'outcome' | 'philosophy' | 'details'>('primitive');
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 2000));
      setPhase('prison');
      await new Promise(r => setTimeout(r, 3000));
      setPhase('dissolve');
      await new Promise(r => setTimeout(r, 2500));
      setPhase('intent');
      await new Promise(r => setTimeout(r, 4000));
      setPhase('execution');
      for(let i=0; i<NODES.length; i++) {
        setActiveNode(i);
        await new Promise(r => setTimeout(r, 900));
      }
      setPhase('outcome');
      await new Promise(r => setTimeout(r, 3000));
      setPhase('philosophy');
      await new Promise(r => setTimeout(r, 5000));
      setPhase('details');
    };
    sequence();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-amber-500/30 overflow-x-hidden relative font-sans">
      
      <AnimatePresence mode="wait">
        {phase !== 'details' && (
          <motion.div 
            key="story-container"
            exit={{ opacity: 0, filter: 'blur(50px)', scale: 1.1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]"
          >
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0%,transparent_70%)]" />
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            {/* PHASE 1: PRIMITIVE (THE VOID) */}
            {phase === 'primitive' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-8">
                <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
                <div className="font-mono text-[10px] md:text-xs text-amber-500/40 uppercase tracking-[0.8em] text-center space-y-4">
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>System Initializing</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>Scanning Legacy Paradigms</motion.p>
                </div>
              </motion.div>
            )}

            {/* PHASE 2: PRISON (THE DEPTH GRID) */}
            {phase === 'prison' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="perspective-1000">
                <motion.div 
                  initial={{ rotateX: 20, rotateY: -20 }}
                  animate={{ rotateX: 0, rotateY: 0 }}
                  transition={{ duration: 3, ease: "easeOut" }}
                  className="grid grid-cols-3 gap-6 p-12 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-3xl shadow-[0_0_100px_rgba(255,255,255,0.02)]"
                >
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-16 h-16 md:w-28 md:h-28 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/[0.03] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <div className="text-[8px] md:text-[10px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">MODULE_{i+1}</div>
                    </div>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-16 text-center space-y-4">
                  <p className="text-xl md:text-3xl font-light tracking-[0.6em] text-white/90">The era of the worker.</p>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/20 italic">A world trapped in buttons and menus.</p>
                </motion.div>
              </motion.div>
            )}

            {/* PHASE 3: DISSOLVE (THE SINGULARITY) */}
            {phase === 'dissolve' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex items-center justify-center">
                 {[...Array(60)].map((_, i) => <Particle key={i} i={i} />)}
                 <motion.div 
                    initial={{ scale: 0, filter: 'blur(20px)' }}
                    animate={{ scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, type: 'spring', stiffness: 100 }}
                    className="w-40 h-40 md:w-64 md:h-64 rounded-full border border-amber-500/40 bg-gradient-to-tr from-amber-500/30 to-transparent relative"
                 >
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-amber-500/20 blur-2xl"
                    />
                 </motion.div>
                 <motion.p 
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                    className="absolute top-[120%] text-2xl md:text-4xl font-light tracking-[0.6em] text-amber-500/60 uppercase"
                 >
                    The Shift.
                 </motion.p>
              </motion.div>
            )}

            {/* PHASE 4: INTENT (THE DIALOGUE) */}
            {phase === 'intent' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl px-8 text-center space-y-16">
                 <motion.p 
                   initial={{ filter: 'blur(10px)', opacity: 0 }}
                   animate={{ filter: 'blur(0px)', opacity: 1 }}
                   transition={{ duration: 2 }}
                   className="text-3xl md:text-6xl font-light tracking-tight leading-[1.1] italic text-white/95"
                 >
                    "I need to be in Mumbai by tomorrow evening. Optimize for comfort and notify the core team."
                 </motion.p>
                 <div className="flex justify-center gap-4">
                    {[...Array(3)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ scaleY: [1, 2, 1] }}
                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                        className="w-[2px] h-8 bg-amber-500/40"
                      />
                    ))}
                 </div>
              </motion.div>
            )}

            {/* PHASE 5: EXECUTION (NEURAL WEB) */}
            {phase === 'execution' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-16">
                 <div className="relative w-64 h-64 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full opacity-20">
                      {[...Array(8)].map((_, i) => (
                        <motion.line
                          key={i}
                          x1="50%" y1="50%"
                          x2={`${50 + Math.cos(i * Math.PI / 4) * 45}%`}
                          y2={`${50 + Math.sin(i * Math.PI / 4) * 45}%`}
                          stroke="white" strokeWidth="0.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: i * 0.1 }}
                        />
                      ))}
                    </svg>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                      className="w-8 h-8 rounded-full border-2 border-amber-500 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    </motion.div>
                 </div>
                 <div className="space-y-6 text-center">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={activeNode}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="space-y-2"
                      >
                        <p className="text-[10px] md:text-xs uppercase tracking-[1em] text-amber-500 font-bold">{NODES[activeNode]}</p>
                        <div className="w-32 h-[1px] bg-amber-500/20 mx-auto overflow-hidden">
                           <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 0.8 }} className="w-full h-full bg-amber-500" />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                 </div>
              </motion.div>
            )}

            {/* PHASE 6: OUTCOME */}
            {phase === 'outcome' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-12 text-center">
                 <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="w-24 h-24 rounded-full border border-amber-500/40 flex items-center justify-center text-amber-500 text-4xl shadow-[0_0_50px_rgba(245,158,11,0.1)]"
                 >
                    ✓
                 </motion.div>
                 <div className="space-y-4">
                    <p className="text-4xl md:text-8xl font-light tracking-[0.4em] text-white uppercase">Outcome Locked.</p>
                    <p className="text-sm md:text-xl font-light tracking-[0.8em] text-white/30 italic">"The invisible hand has resolved."</p>
                 </div>
              </motion.div>
            )}

            {/* PHASE 7: PHILOSOPHY */}
            {phase === 'philosophy' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-24 px-6">
                 <div className="space-y-8">
                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-5xl font-light tracking-[0.3em] text-white/20 italic">Doing is a relic of the past.</motion.p>
                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="text-3xl md:text-6xl font-light tracking-[0.3em] text-white">Delegation is the new command.</motion.p>
                 </div>
                 <motion.div 
                    initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 3, duration: 2 }}
                    className="space-y-8"
                 >
                    <h1 className="text-8xl md:text-[16rem] font-bold movie-title text-amber-500 leading-none drop-shadow-[0_0_80px_rgba(245,158,11,0.2)]">SAARTHI</h1>
                    <div className="flex items-center justify-center gap-8">
                       <div className="h-[1px] w-20 bg-amber-500/40" />
                       <p className="text-[10px] md:text-xl font-light tracking-[1.2em] uppercase text-white/20 whitespace-nowrap">Agentic Orchestration</p>
                       <div className="h-[1px] w-20 bg-amber-500/40" />
                    </div>
                 </motion.div>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FINAL DETAILS SECTION --- */}
      {phase === 'details' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
          
          <div className="h-screen w-full flex flex-col items-center justify-center relative bg-[#020202]">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, letterSpacing: '2em', filter: 'blur(20px)' }}
                animate={{ opacity: 1, letterSpacing: '0.6em', filter: 'blur(0px)' }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[12rem] font-bold movie-title text-amber-500 leading-none mb-8 drop-shadow-[0_0_100px_rgba(245,158,11,0.3)]"
              >
                SAARTHI
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1.5 }}
                className="text-lg md:text-3xl font-light tracking-[0.8em] uppercase text-white/20"
              >
                Don’t use apps. Command outcomes.
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
            >
              <span className="text-[10px] tracking-[1em] text-white/20 uppercase">Explore the Paradigm</span>
              <div className="w-[1px] h-24 bg-gradient-to-b from-amber-500/60 to-transparent" />
            </motion.div>
          </div>

          {/* Details Content */}
          <section className="w-full max-w-7xl px-8 py-40 space-y-48 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-40">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-12">
                <div className="inline-block px-8 py-2 border border-red-500/20 bg-red-500/5 rounded-full">
                  <span className="text-[10px] uppercase tracking-[0.8em] text-red-500 font-bold">The Problem</span>
                </div>
                <h2 className="text-4xl md:text-8xl font-serif italic text-white/90 leading-[1.05]">The relic of manual labor.</h2>
                <p className="text-white/40 leading-loose font-mono text-xs uppercase tracking-[0.3em]">Modern computing is a fragmentation of tools. We spend 80% of our time navigating UI mazes just to perform 20% of actual work. Saarthi aims to eliminate the "Interface Tax" entirely.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-12">
                <div className="inline-block px-8 py-2 border border-amber-500/20 bg-amber-500/5 rounded-full">
                  <span className="text-[10px] uppercase tracking-[0.8em] text-amber-500 font-bold">The Solution</span>
                </div>
                <h2 className="text-4xl md:text-8xl font-serif italic text-white/90 leading-[1.05]">Autonomous Delegation.</h2>
                <p className="text-white/40 leading-loose font-mono text-xs uppercase tracking-[0.3em]">By merging high-reasoning LLMs with a cross-app execution fabric, Saarthi resolves complex human intent into verified outcomes. It doesn't ask how—it delivers what.</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { title: "AGENTIC FABRIC", desc: "A layer that interacts with services directly, bypassing the need for manual UI navigation.", icon: "🌌" },
                { title: "REASONING ENGINE", desc: "Decomposes complex multi-step goals into small, executable atomic tasks.", icon: "💠" },
                { title: "ZERO UI", desc: "A paradigm where the interface is a single line of intent, and the output is the reality.", icon: "✨" }
              ].map((feat, i) => (
                <motion.div key={feat.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="p-20 border border-white/5 bg-white/[0.01] backdrop-blur-3xl hover:border-amber-500/20 transition-all rounded-sm group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-4xl opacity-10 group-hover:opacity-40 transition-opacity">{feat.icon}</div>
                  <h3 className="text-sm font-bold tracking-[0.6em] uppercase mb-10 text-white/80">{feat.title}</h3>
                  <p className="text-[11px] leading-relaxed text-white/30 uppercase tracking-[0.2em]">{feat.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-24 pt-20">
              <div className="text-center space-y-8">
                <h4 className="text-[10px] uppercase tracking-[1em] text-white/20">The Stack of the Future</h4>
                <p className="text-3xl font-light tracking-[0.6em] text-amber-500">FastAPI ∙ LangGraph ∙ GPT-4o ∙ React</p>
              </div>
              <div className="flex flex-wrap justify-center gap-12">
                <a href="#" className="px-20 py-10 bg-white text-black hover:bg-amber-500 font-black uppercase tracking-[0.6em] text-[13px] transition-all duration-500 rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.1)]">View Architecture</a>
                <a href="#" className="px-20 py-10 border border-white/10 text-white hover:border-amber-500 hover:bg-white/5 font-bold uppercase tracking-[0.6em] text-[13px] transition-all duration-500 rounded-sm">View Source</a>
              </div>
              <Link href="/" className="text-[10px] uppercase tracking-[1.5em] text-white/20 hover:text-white transition-all flex items-center gap-8 group">
                <motion.span animate={{ x: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-2xl">←</motion.span> 
                BACK TO SHOWCASE
              </Link>
            </div>
          </section>
        </motion.div>
      )}

      {/* Global Background Depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.02)_0%,transparent_80%)]" />
      </div>

    </div>
  );
}
