'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const GRAVEYARD = [
  {
    id: 1,
    title: 'Neural Path Visualizer',
    state: 'FAILED',
    icon: '💀',
    color: 'border-red-500/30 text-red-500',
    glow: 'rgba(239, 68, 68, 0.15)',
    tagline: '"Seemed easy. It wasn\'t."',
    intended: 'Visualize forward propagation of a complex Multi-Layer Perceptron in real-time 3D.',
    wentWrong: 'The matrix math collapsed. It basically just flashes random numbers and eats 4GB of RAM.',
    learned: 'Sometimes relying on libraries is better than writing your own tensor logic from scratch.',
    bugs: 47,
    timeWasted: '3 straight weeks',
    confBefore: '100%',
    confAfter: '12%',
  },
  {
    id: 2,
    title: 'WebGL Fluid Sim',
    state: 'IN PROGRESS',
    icon: '⚙️',
    color: 'border-amber-500/30 text-amber-500',
    glow: 'rgba(245, 158, 11, 0.15)',
    tagline: '"Paused. Not dead."',
    intended: 'A beautiful fluid simulation that realistically reacts to cursor velocity.',
    wentWrong: 'Particles render correctly, but performance violently drops to 12fps after exactly 14 seconds.',
    learned: 'Memory leaks in WebGL shaders are a special kind of hell to debug.',
    bugs: 14,
    timeWasted: 'Too much',
    confBefore: '80%',
    confAfter: '40%',
  },
  {
    id: 3,
    title: 'Recursive Mirror',
    state: 'ABANDONED',
    icon: '💤',
    color: 'border-purple-500/30 text-purple-500',
    glow: 'rgba(168, 85, 247, 0.15)',
    tagline: '"This one humbled me."',
    intended: 'An infinitely recursive CSS 3D transform experiment creating a deep tunnel.',
    wentWrong: 'It worked perfectly. But scrolling it caused severe motion sickness for anyone testing it.',
    learned: 'Just because you *can* build it, doesn\'t mean human eyes are ready for it.',
    bugs: 0,
    timeWasted: '4 days',
    confBefore: '90%',
    confAfter: 'Sick',
  },
  {
    id: 4,
    title: 'Genetic Pathfinding',
    state: 'WILL REVISIT',
    icon: '🔁',
    color: 'border-cyan-500/30 text-cyan-500',
    glow: 'rgba(6, 182, 212, 0.15)',
    tagline: '"Still thinking about a comeback."',
    intended: 'Tiny agents evolving a path through an invisible maze using neural evolution.',
    wentWrong: 'Instead of finding the goal, they evolved to just spin in tight circles collectively. Artificial stupidity.',
    learned: 'Reward functions shape everything. I accidentally rewarded them for surviving, not winning.',
    bugs: 'Uncountable',
    timeWasted: '1 month',
    confBefore: '95%',
    confAfter: '20%',
  }
];

export default function Unfinished() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20% 0px" });
  const [selected, setSelected] = useState<typeof GRAVEYARD[0] | null>(null);

  return (
    <section 
      id="unfinished" 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#030303] overflow-hidden py-32 flex flex-col items-center justify-center z-10"
    >
      {/* --- GRAVEYARD ATMOSPHERE --- */}
      {/* Base darkness gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303] to-[#010101] pointer-events-none z-0" />
      
      {/* Ground Mist */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#050505] to-transparent z-0 opacity-80 mix-blend-multiply" />
      <div 
        className="absolute bottom-0 left-0 w-full h-[50vh] opacity-20 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center bottom, rgba(255,255,255,0.1) 0%, transparent 60%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Floating Dust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * 800 + 400 
            }}
            animate={{ 
              y: -100, 
              x: `+=${Math.random() * 100 - 50}`,
              opacity: [0, Math.random() * 0.5 + 0.1, 0] 
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10 
            }}
          />
        ))}
      </div>

      {/* --- ENTRY HEADER --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mb-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="inline-block"
        >
          <h2 className="movie-title text-4xl md:text-6xl text-white/80 uppercase tracking-[0.3em] mb-4">
            The Graveyard
          </h2>
          <div className="h-[1px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
          <p className="text-soulful text-[var(--text-dim)] italic text-lg md:text-xl">
            "Not everything ships. Some things break. <br className="hidden md:block" /> Some things are still becoming."
          </p>
        </motion.div>
      </div>

      {/* --- STRUCTURED MONOLITH LAYOUT --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-32 perspective-1000">
        {GRAVEYARD.map((item, i) => (
          <MonolithCard 
            key={item.id} 
            item={item} 
            index={i} 
            isInView={isInView}
            onClick={() => setSelected(item)} 
          />
        ))}
      </div>

      {/* --- DETAIL MODAL (The Autopsy) --- */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelected(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 100 }}
              className="relative w-full max-w-3xl bg-[#080808] border border-white/5 p-8 md:p-12 shadow-2xl overflow-hidden cursor-default"
              onClick={e => e.stopPropagation()}
            >
              {/* Ethereal modal glow */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${selected.glow.replace('0.15', '1')}, transparent 50%)` }}
              />

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <div className={`inline-flex items-center gap-2 px-4 py-1 text-xs font-mono tracking-widest uppercase border ${selected.color} bg-black/50 backdrop-blur-md mb-6 rounded-full`}>
                    <span className="text-base">{selected.icon}</span> {selected.state}
                  </div>
                  <h3 className="text-3xl md:text-5xl movie-title tracking-widest text-white mb-4 uppercase">
                    {selected.title}
                  </h3>
                  <p className="text-soulful text-[var(--text-dim)] italic text-xl border-l-2 border-white/10 pl-4">{selected.tagline}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest border-b border-transparent hover:border-white">
                  [ Close ]
                </button>
              </div>

              <div className="space-y-8 font-mono text-sm border-t border-white/5 pt-8 relative z-10">
                <div>
                  <p className="text-white/30 uppercase text-xs tracking-[0.2em] mb-3">The Vision</p>
                  <p className="text-white/80 leading-relaxed text-base">{selected.intended}</p>
                </div>
                
                <div className="p-6 bg-red-950/5 border-l border-red-500/20 relative">
                  <p className="text-red-400/60 uppercase text-xs tracking-[0.2em] mb-3">Cause of Death</p>
                  <p className="text-white/90 leading-relaxed text-base">{selected.wentWrong}</p>
                </div>

                <div>
                  <p className="text-emerald-500/40 uppercase text-xs tracking-[0.2em] mb-3">Autopsy Findings</p>
                  <p className="text-white/70 leading-relaxed text-base">→ {selected.learned}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/5">
                  <div>
                    <p className="text-white/30 uppercase text-[10px] tracking-widest mb-2">Bugs Faced</p>
                    <p className="text-white font-light text-2xl">{selected.bugs}</p>
                  </div>
                  <div>
                    <p className="text-white/30 uppercase text-[10px] tracking-widest mb-2">Time Lost</p>
                    <p className="text-white font-light text-2xl">{selected.timeWasted}</p>
                  </div>
                  <div>
                    <p className="text-white/30 uppercase text-[10px] tracking-widest mb-2">Conf Before</p>
                    <p className="text-white font-light text-2xl">{selected.confBefore}</p>
                  </div>
                  <div>
                    <p className="text-white/30 uppercase text-[10px] tracking-widest mb-2">Conf After</p>
                    <p className="text-red-400 font-light text-2xl">{selected.confAfter}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function MonolithCard({ item, index, isInView, onClick }: { item: any, index: number, isInView: boolean, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, delay: index * 0.2, ease: [0.25, 1, 0.5, 1] }}
      className="relative group cursor-pointer h-[400px] flex flex-col justify-end"
      onClick={onClick}
    >
      {/* Monolith Body */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-[#121212] border border-white/5 rounded-t-md transition-all duration-500 group-hover:border-white/10 group-hover:translate-y-[-10px] overflow-hidden">
        
        {/* Ethereal Glow from bottom (wakes up on hover) */}
        <div 
          className="absolute bottom-0 left-0 w-full h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
          style={{ background: `linear-gradient(to top, ${item.glow}, transparent)` }}
        />

        {/* Chiseled Top Edge highlight */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="flex flex-col items-center text-center opacity-40 group-hover:opacity-100 transition-opacity duration-500 pt-8">
            <span className="text-4xl mb-6 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{item.icon}</span>
            <h4 className="movie-title text-xl text-white uppercase tracking-[0.2em] leading-snug">
              {item.title}
            </h4>
          </div>
          
          <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
            <p className="font-mono text-[10px] text-white/50 tracking-[0.2em] uppercase border-b border-white/10 pb-2 inline-block">
              {item.state}
            </p>
          </div>
        </div>
      </div>
      
      {/* Shadow underneath */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black blur-[10px] opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
    </motion.div>
  );
}
