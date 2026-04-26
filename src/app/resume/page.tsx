'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';

const RECONSTRUCTION_LOGS = [
  "Initializing Document Reconstruction...",
  "Loading neural memory blocks...",
  "Scanning 9.54 CGPA... (Confirmed: High performance detected)",
  "Bypassing generic resume templates...",
  "Optimizing for maximum visual impact...",
  "Injecting personality into static text...",
  "Finalizing assembly sequence."
];

export default function ResumePage() {
  const [phase, setPhase] = useState<'boot' | 'parsing' | 'assembly' | 'complete'>('boot');
  const [logs, setLogs] = useState<string[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const docRef = useRef<HTMLDivElement>(null);

  // Sequence timings
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('parsing'), 1000),
      setTimeout(() => setPhase('assembly'), 2500),
      setTimeout(() => setPhase('complete'), 6000) 
    ];

    // Log typing simulation
    RECONSTRUCTION_LOGS.forEach((log, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, 500 + i * 800);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!docRef.current) return;
    const rect = docRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative selection:bg-amber-500/30">
      <Navbar />

      {/* Ambient Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <main className="relative z-10 pt-40 pb-20 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-12 max-w-7xl mx-auto">
        
        {/* --- LEFT PANEL: THE SYSTEM DASHBOARD --- */}
        <aside className="space-y-8 h-fit lg:sticky lg:top-40">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] text-amber-500 font-bold block">
              System Interface
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase movie-title leading-tight">
              MEHARSH <br/><span className="text-white/20">DOCUMENT_01</span>
            </h1>
          </motion.div>

          {/* Quirky Stats / Mechanics */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Creativity', value: 'OVERLOADED', color: 'text-amber-500' },
              { label: 'HR Bypass', value: 'ACTIVE', color: 'text-green-500' },
              { label: 'Coffee Level', value: 'CRITICAL', color: 'text-red-500' },
              { label: 'Vibe Check', value: 'CINEMATIC', color: 'text-blue-500' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="p-4 border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-sm"
              >
                <p className="text-[8px] uppercase tracking-[0.3em] text-white/30 mb-1">{stat.label}</p>
                <p className={`text-[10px] font-bold tracking-widest ${stat.color}`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Real-time Reconstruction Logs */}
          <div className="p-6 border border-white/10 bg-black/40 rounded-sm font-mono text-[10px] space-y-3 min-h-[250px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-500/20 animate-scan pointer-events-none" />
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-white/40 uppercase tracking-widest">Live_Reconstruction_Logs</span>
            </div>
            <div className="space-y-2">
              {logs.map((log, i) => (
                <motion.p 
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-white/60 leading-relaxed"
                >
                  <span className="text-amber-500/50 mr-2">[{new Date().toLocaleTimeString()}]</span> {log}
                </motion.p>
              ))}
              {phase !== 'complete' && (
                <motion.div 
                  animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-3 bg-white/20 inline-block align-middle ml-1"
                />
              )}
            </div>
          </div>

          {/* Quirky Quote Box */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}
            className="text-[11px] italic text-white/30 font-serif border-l-2 border-white/5 pl-4 py-2"
          >
            "I don't just write code. I build worlds where code happens to be the gravity."
          </motion.div>

          {/* --- DOWNLOAD BUTTON (MOVED HERE) --- */}
          <AnimatePresence>
            {phase === 'complete' && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="pt-4"
              >
                <a 
                  href="/MeharshChandureAI.pdf" 
                  download="Meharsh_Chandure_Resume.pdf"
                  className="inline-flex items-center gap-4 px-8 py-4 border border-white/20 text-white/70 hover:text-white hover:border-amber-500 hover:bg-amber-500/5 transition-all font-mono text-[9px] uppercase tracking-[0.3em] group rounded-sm"
                >
                  <span className="w-5 h-5 border border-current flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
                    ↓
                  </span>
                  Download_Official_PDF
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>


        {/* --- RIGHT PANEL: THE DOCUMENT PANEL --- */}
        <section className="relative min-h-[1200px]" onMouseMove={handleMouseMove}>
          
          <AnimatePresence mode="wait">
            {(phase === 'boot' || phase === 'parsing') && (
              <motion.div 
                key="parsing-ui"
                exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 border border-white/5 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center justify-center font-mono rounded-sm z-20"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="w-32 h-32 border-2 border-dashed border-amber-500/30 rounded-full flex items-center justify-center"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-amber-500 text-[10px] tracking-[0.4em] uppercase animate-pulse">Scanning</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {(phase === 'assembly' || phase === 'complete') && (
            <motion.div 
              ref={docRef}
              initial={{ opacity: 0, y: 100, rotateX: 5, rotateY: -5 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#f2f2f2] text-black shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group rounded-sm"
              style={{ minHeight: '1100px' }}
            >
              {/* Interactive Scanner Line (Subtle) */}
              <motion.div 
                className="absolute left-0 right-0 h-[1px] bg-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.3)] z-50 pointer-events-none opacity-0 group-hover:opacity-100 mix-blend-multiply"
                animate={{ top: mousePos.y }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              />

              {/* Static Scanner (Background) */}
              {phase === 'assembly' && (
                <motion.div 
                  initial={{ top: 0 }} animate={{ top: '100%' }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 w-full h-[4px] bg-amber-500/10 z-40 pointer-events-none"
                />
              )}

              {/* Paper texture overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }} />

              <div className="p-10 md:p-14 relative z-10 flex flex-col gap-10">
                
                {/* --- RESUME HEADER --- */}
                <motion.div 
                  initial={{ opacity: 0, filter: 'blur(10px)' }} 
                  animate={{ opacity: 1, filter: 'blur(0px)' }} 
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-center border-b border-black/5 pb-8"
                >
                  <h2 className="text-4xl font-serif font-bold tracking-tight mb-3">Meharsh M. Chandure</h2>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[9px] uppercase tracking-widest text-black/50 font-sans">
                    <span>Nagpur, Maharashtra</span>
                    <span>(+91) 7219701494</span>
                    <span>meharsh7804@gmail.com</span>
                    <span className="text-amber-600 font-bold underline cursor-pointer">linkedin.com/in/meharsh-chandure</span>
                  </div>
                </motion.div>

                {/* --- PROJECTS --- */}
                <motion.section 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="grid grid-cols-[100px_1fr] gap-8"
                >
                  <h3 className="font-bold text-[10px] tracking-[0.4em] text-black/30 h-fit uppercase pt-1">Projects</h3>
                  <div className="space-y-6">
                    {[
                      { title: "PADHLE", role: "Developer & Designer", desc: "Developed an educational platform allowing RCOEM students to access notes organized by subject and semester." },
                      { title: "NAGPLORE", role: "Developer & Designer", desc: "Designed a Nagpur Tourism guide as my 1st ever front-end project." },
                      { title: "SAARTHI", role: "Developer", desc: "Cab booking assistant that enables smart ride scheduling." },
                      { title: "DESKMATE", role: "Python Developer", desc: "Developed this chatbot to help students locate their professors throughout the university." },
                      { title: "SPLENDORA", role: "UI Designer", desc: "Designed the UI for the Splendora app, focusing on simplifying the booking process." }
                    ].map((proj, i) => (
                      <motion.div key={proj.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.1 }}>
                        <div className="flex justify-between items-baseline mb-1.5">
                          <h4 className="font-bold text-xs uppercase tracking-widest">{proj.title}</h4>
                          <span className="text-[9px] italic text-black/40">{proj.role}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-black/70 font-sans">{proj.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* --- EDUCATION --- */}
                <motion.section 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="grid grid-cols-[100px_1fr] gap-8"
                >
                  <h3 className="font-bold text-[10px] tracking-[0.4em] text-black/30 h-fit uppercase pt-1">Education</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-xs uppercase tracking-wider">SHRI RAMDEOBABA COLLEGE OF ENGINEERING</h4>
                        <span className="text-[9px]">2022 - PRESENT</span>
                      </div>
                      <p className="text-[10px] font-bold italic text-black/60 mb-2">B.Tech in Artificial Intelligence & Machine Learning</p>
                      <ul className="text-[10px] list-disc pl-4 space-y-1.5 text-black/70">
                        <li>CGPA: 9.54 (Till 6th Semester)</li>
                        <li>Lead at AIML Community, CDPC Coordinator.</li>
                      </ul>
                    </div>
                  </div>
                </motion.section>

                {/* --- SKILLS --- */}
                <motion.section 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 2, duration: 0.6 }}
                  className="grid grid-cols-[100px_1fr] gap-8"
                >
                  <h3 className="font-bold text-[10px] tracking-[0.4em] text-black/30 h-fit uppercase pt-1">Tech_Stack</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[10px] leading-relaxed">
                    <div>
                      <p className="font-bold text-black/40 uppercase tracking-widest mb-1 text-[8px]">Languages</p>
                      <p>C, C++, Python, JavaScript</p>
                    </div>
                    <div>
                      <p className="font-bold text-black/40 uppercase tracking-widest mb-1 text-[8px]">Web</p>
                      <p>React, Next.js, HTML, CSS</p>
                    </div>
                    <div>
                      <p className="font-bold text-black/40 uppercase tracking-widest mb-1 text-[8px]">Design</p>
                      <p>Figma, Adobe Xd, GSAP</p>
                    </div>
                    <div>
                      <p className="font-bold text-black/40 uppercase tracking-widest mb-1 text-[8px]">Data</p>
                      <p>MySQL, MongoDB</p>
                    </div>
                  </div>
                </motion.section>

              </div>
            </motion.div>
          )}
        </section>
      </main>

      {/* Decorative System Elements */}
      <div className="fixed bottom-10 left-10 pointer-events-none opacity-20 hidden xl:block">
        <div className="w-40 h-40 border border-white/5 rounded-full animate-spin-slow" />
      </div>

    </div>
  );
}
