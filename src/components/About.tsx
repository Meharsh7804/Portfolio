'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChaos } from '@/context/ChaosContext';

type NodeID = 'frontend' | 'backend' | 'ai' | 'creative' | 'dsa' | null;

const SYSTEM_LOGS = [
  "Initializing Developer Mind...",
  "Loading Cognitive Modules...",
  "Skills Matrix Detected...",
  "Creativity Module: Overclocked",
  "UI Polish: Maximum Priority",
  "DSA Module: Running in Safe Mode",
  "Coffee Reserve: Depleted",
  "Background Thread: Daydreaming",
  "Logic Gates: Nominal",
  "Signal: Strong"
];

const FLOATING_DATA = [
  "0x00F8912", "SYS_REQ::OK", "MEM_ALLOC(2048)", "TENSORS_READY",
  "AWAITING_INPUT", "NODE_ACTIVE", "LATENCY: 12ms", "BUFFER_FLUSH",
  "0x11AB99C", "RENDER_PASS", "USE_EFFECT()", "PROMISE_RESOLVED",
  "01010011 01111001 01110011", "FETCH_DATA()", "SCALAR_FIELD", "VECTOR_MATH",
  "AWAITING_PROMISE", "await fetch('/api/brain')", "console.log('alive')",
  "while(true) { render() }", "const brain = new NeuralNet()", "import { motion } from 'framer'"
];

const CODE_SNIPPETS = [
`#include <iostream>
using namespace std;
int main(){
    cout << "Hello World" << endl;
    return 0;
}`
];

const NODES_DATA = [
  { id: 'frontend', label: 'FRONTEND', angle: -90, distance: 220 },
  { id: 'backend', label: 'BACKEND', angle: -18, distance: 240 },
  { id: 'ai', label: 'AI / ML', angle: 54, distance: 210 },
  { id: 'creative', label: 'CREATIVITY', angle: 126, distance: 230 },
  { id: 'dsa', label: 'DSA', angle: 198, distance: 200 },
];

const SKILLS_DATA: Record<string, { desc: string, items: { name: string, signal: string, status: string }[] }> = {
  frontend: {
    desc: 'Crafting immersive visual experiences and interactions.',
    items: [
      { name: 'React/Next.js', signal: 'Max', status: 'Stable Pulse' },
      { name: 'Tailwind CSS', signal: 'High', status: 'Synchronized' },
      { name: 'Framer Motion', signal: 'High', status: 'Fluid' },
      { name: 'Three.js', signal: 'Medium', status: 'Rendering' },
    ]
  },
  backend: {
    desc: 'Building robust, scalable logic and server architectures.',
    items: [
      { name: 'Node.js', signal: 'High', status: 'Routing' },
      { name: 'PostgreSQL', signal: 'High', status: 'Indexed' },
      { name: 'REST APIs', signal: 'Max', status: 'Connected' },
      { name: 'Docker', signal: 'Medium', status: 'Containerized' },
    ]
  },
  ai: {
    desc: 'Integrating and training machine learning models.',
    items: [
      { name: 'Python', signal: 'High', status: 'Executing' },
      { name: 'TensorFlow', signal: 'Medium', status: 'Learning' },
      { name: 'NLP', signal: 'High', status: 'Processing' },
    ]
  },
  creative: {
    desc: 'Blending engineering with cinematic aesthetics.',
    items: [
      { name: 'UI/UX Design', signal: 'Overclocked', status: 'Warning: High' },
      { name: 'Figma', signal: 'High', status: 'Pixel-Perfect' },
      { name: 'Animation', signal: 'Max', status: 'Smooth' },
    ]
  },
  dsa: {
    desc: 'Core logic, data structures, and algorithms.',
    items: [
      { name: 'Problem Solving', signal: 'Varies', status: 'Depends on Coffee' },
      { name: 'Graph Theory', signal: 'Low', status: 'Re-routing' },
      { name: 'Optimization', signal: 'Medium', status: 'Processing' },
    ]
  }
};

function LiveCodeStream({ booted }: { booted: boolean }) {
  const [codeText, setCodeText] = useState("");
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!booted) return;
    const currentSnippet = CODE_SNIPPETS[snippetIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && codeText === currentSnippet) {
      timeout = setTimeout(() => setIsDeleting(true), 4000); // Pause before delete
    } else if (isDeleting && codeText === "") {
      setIsDeleting(false);
      setSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
    } else {
      const nextCharLength = isDeleting ? codeText.length - 1 : codeText.length + 1;
      const speed = isDeleting ? 20 : Math.random() * 40 + 20; // Type fast, delete faster
      timeout = setTimeout(() => {
        setCodeText(currentSnippet.substring(0, nextCharLength));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [codeText, isDeleting, snippetIndex, booted]);

  return (
    <div className="p-4 border border-amber-500/20 bg-black/40 backdrop-blur-md rounded-lg shadow-[0_0_30px_rgba(245,158,11,0.05)] relative overflow-hidden h-48 w-72 transform -translate-x-12 -translate-y-8 will-change-transform">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-amber-500/40" />
      <div className="flex items-center gap-2 mb-3 opacity-50">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
        <span className="ml-2 text-[9px] uppercase tracking-widest text-amber-500 font-bold">Runtime Engine</span>
      </div>
      
      <pre className="text-[10px] text-amber-500/70 leading-relaxed font-mono whitespace-pre-wrap">
        {codeText}
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1.5 h-3 bg-amber-500 align-middle ml-1"
        />
      </pre>
    </div>
  );
}

function SystemLogsPanel({ booted }: { booted: boolean }) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!booted) return;
    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLogs = [...prev, SYSTEM_LOGS[i]];
        if (newLogs.length > 5) newLogs.shift();
        return newLogs;
      });
      i = (i + 1) % SYSTEM_LOGS.length;
    }, 2000);
    return () => clearInterval(interval);
  }, [booted]);

  return (
    <div className="p-4 border border-white/10 bg-black/50 backdrop-blur-md rounded-lg h-48 w-72 flex flex-col justify-end overflow-hidden relative shadow-[0_0_30px_rgba(245,158,11,0.05)] transform -translate-x-12 translate-y-8 will-change-transform">
      <div className="absolute top-3 left-4 text-[9px] text-amber-500/50 uppercase tracking-[0.3em] font-bold">System Log</div>
      <div className="space-y-2 mt-6">
        {logs.map((log, index) => (
          <motion.div 
            key={log + index}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[11px] text-amber-500/80 flex font-mono items-center gap-2 tracking-wide"
          >
            <span className="text-white/20">{`>`}</span> {log}
          </motion.div>
        ))}
        {!booted && <div className="text-[11px] font-mono text-white/40 animate-pulse tracking-wide">{`> Awaiting boot...`}</div>}
      </div>
    </div>
  );
}

export default function About() {
  // Stabilize random values so they don't recalculate on every re-render (typing effect)
  const floatingDataElements = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      text: FLOATING_DATA[i % FLOATING_DATA.length],
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 20
    }));
  }, []);

  const [booted, setBooted] = useState(false);
  const [activeNode, setActiveNode] = useState<NodeID>(null);
  const [coreClicks, setCoreClicks] = useState(0);
  const { isChaos } = useChaos();

  const overload = coreClicks >= 7;

  // System Boot Sequence
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !booted) {
          setBooted(true);
        }
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById('neural-scan');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [booted]);

  // Reset Overload
  useEffect(() => {
    if (overload) {
      const timer = setTimeout(() => {
        setCoreClicks(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [overload]);

  return (
    <section id="neural-scan" className="min-h-screen bg-[#020202] relative overflow-hidden flex items-center justify-center font-sans select-none py-20">
      
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none z-50 opacity-10 mix-blend-overlay" />
      
      {/* Floating Background Data Streams (Smoother & Subtle) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {floatingDataElements.map((data) => (
          <motion.div
            key={data.id}
            initial={{ y: '-10vh', opacity: 0 }}
            animate={{ 
              y: ['-10vh', '110vh'],
              opacity: [0, 0.3, 0.3, 0]
            }}
            transition={{ 
              duration: data.duration,
              repeat: Infinity,
              delay: data.delay,
              ease: "linear",
              times: [0, 0.2, 0.8, 1]
            }}
            className="absolute text-xs md:text-sm text-amber-500/40 font-bold whitespace-nowrap blur-[1px]"
            style={{ 
              left: data.left,
              willChange: "transform, opacity"
            }}
          >
            {data.text}
          </motion.div>
        ))}
      </div>

      {/* Overload Overlay */}
      <AnimatePresence>
        {overload && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-900/20 z-40 pointer-events-none flex items-center justify-center mix-blend-screen"
          >
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-red-500 text-7xl md:text-9xl font-black uppercase tracking-[0.5em] text-center opacity-20"
            >
              CRITICAL <br/> OVERLOAD
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full relative z-10 pl-8 pr-12 lg:pr-24 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center h-full pt-40">
        
        {/* Section Heading */}
        <div className="absolute top-16 left-0 right-0 text-center z-50 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.6em] text-amber-500 mb-4 block font-bold font-sans drop-shadow-lg">
              {isChaos ? 'Module 00' : 'Module 02'}
            </span>
            <h2 className="movie-title text-5xl md:text-7xl text-white tracking-widest uppercase">
              {isChaos ? 'Memory ' : 'What I Think '}<span className="text-amber-500">{isChaos ? 'Leak' : 'I Know'}</span>
            </h2>
          </motion.div>
        </div>

        {/* Left: Interactive Code Stream & Terminal Logs */}
        <div className="hidden lg:flex flex-col h-full justify-between pb-20 pt-10 relative">
          <LiveCodeStream booted={booted} />
          <SystemLogsPanel booted={booted} />
        </div>

        {/* Center: Neural Core System */}
        <div className="relative h-[500px] md:h-[700px] flex items-center justify-center col-span-1 lg:-translate-x-12">
          {booted && (
            <>
              {/* Outer Rings */}
              <motion.div 
                animate={{ rotate: overload ? 360 : 360 }}
                transition={{ duration: overload ? 2 : 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px] rounded-full border border-white/5 border-dashed"
              />
              <motion.div 
                animate={{ rotate: overload ? -360 : -360 }}
                transition={{ duration: overload ? 3 : 35, repeat: Infinity, ease: "linear" }}
                className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border border-amber-500/10"
              />

              {/* Glowing Core */}
              <motion.div 
                className="relative z-20 cursor-pointer group flex items-center justify-center"
                onClick={() => setCoreClicks(c => c + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div 
                  animate={{ 
                    scale: overload ? [1, 1.5, 1] : [1, 1.1, 1],
                    opacity: overload ? [0.8, 1, 0.8] : [0.4, 0.7, 0.4]
                  }}
                  transition={{ duration: overload ? 0.2 : 2, repeat: Infinity }}
                  className={`absolute w-40 h-40 rounded-full blur-[50px] ${overload ? 'bg-red-500' : 'bg-amber-500'}`}
                />
                <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center backdrop-blur-xl transition-colors duration-300 ${overload ? 'bg-red-950/80 border-red-500 shadow-[0_0_60px_rgba(239,68,68,0.5)]' : 'bg-black/80 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.3)]'}`}>
                  <span className={`text-sm font-bold tracking-[0.4em] uppercase ${overload ? 'text-red-500' : 'text-amber-500'}`}>
                    {overload ? 'OVERLOAD' : 'CORE'}
                  </span>
                </div>
              </motion.div>

              {/* Orbiting Nodes */}
              {NODES_DATA.map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const isHovered = activeNode === node.id;
                
                // Adjust distance for smaller screens
                const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
                const isSmallMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
                const distMultiplier = isSmallMobile ? 0.6 : (isMobile ? 0.75 : 1);
                const currentDist = node.distance * distMultiplier;

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      x: Math.cos(rad) * currentDist, 
                      y: Math.sin(rad) * currentDist,
                    }}
                    transition={{ 
                      delay: i * 0.1, 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15,
                      mass: 0.8
                    }}
                    className="absolute z-30"
                  >
                    <motion.button
                      onMouseEnter={() => setActiveNode(node.id as NodeID)}
                      onClick={() => setActiveNode(node.id === activeNode ? null : node.id as NodeID)}
                      whileHover={{ scale: 1.2 }}
                      className={`relative flex items-center justify-center w-16 h-16 rounded-full border backdrop-blur-md transition-colors ${isHovered ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)]' : 'bg-black/60 border-white/20 hover:border-amber-500/50'}`}
                    >
                      <div className={`w-3 h-3 rounded-full ${isHovered ? 'bg-amber-500 animate-none' : 'bg-white/50 animate-pulse'}`} />
                      
                      {/* Node Label */}
                      <div className="absolute top-full mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 whitespace-nowrap">
                        {node.label}
                      </div>
                    </motion.button>

                    {/* Connection Line to Core */}
                    <svg className="absolute top-1/2 left-1/2 -z-10 pointer-events-none" style={{ overflow: 'visible' }}>
                      <motion.line 
                        x1="0" y1="0" 
                        x2={-Math.cos(rad) * (currentDist - 64)} y2={-Math.sin(rad) * (currentDist - 64)} 
                        stroke={isHovered ? 'rgba(245,158,11,0.6)' : 'rgba(255,255,255,0.15)'} 
                        strokeWidth={isHovered ? "3" : "1"}
                        strokeDasharray={isHovered ? "0" : "4 4"}
                      />
                    </svg>
                  </motion.div>
                );
              })}
            </>
          )}
        </div>

        {/* Right: Active Node Data Panel */}
        <div className="flex flex-col h-auto lg:h-full w-full lg:w-[25vw] justify-center lg:translate-x-16 mt-8 lg:mt-0 z-50">
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 border border-amber-500/30 bg-black/60 backdrop-blur-xl rounded-xl shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden"
              >

                <h3 className="text-3xl font-black text-amber-500 tracking-[0.2em] uppercase mb-2">
                  Domain: {activeNode}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-8">
                  {SKILLS_DATA[activeNode].desc}
                </p>

                <div className="space-y-6">
                  {SKILLS_DATA[activeNode].items.map((item, i) => (
                    <div key={item.name} className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="text-lg text-white font-bold tracking-wider">{item.name}</span>
                        <span className="text-[10px] uppercase tracking-widest text-amber-500/80">{item.status}</span>
                      </div>
                      <div className="flex gap-1 h-1.5">
                        {[...Array(5)].map((_, idx) => {
                          let active = false;
                          if (item.signal === 'Max' || item.signal === 'Overclocked') active = true;
                          else if (item.signal === 'High' && idx < 4) active = true;
                          else if (item.signal === 'Medium' && idx < 3) active = true;
                          else if (item.signal === 'Low' && idx < 1) active = true;
                          else if (item.signal === 'Varies' && Math.random() > 0.5) active = true;

                          return (
                            <motion.div 
                              key={idx} 
                              className={`flex-1 rounded-full ${active ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'bg-white/10'}`}
                              animate={item.signal === 'Varies' || item.signal === 'Overclocked' ? { opacity: [0.5, 1, 0.5] } : {}}
                              transition={{ duration: Math.random() * 0.5 + 0.5, repeat: Infinity }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[300px] flex items-center justify-center"
              >
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mx-auto bg-white/5">
                    <div className="w-3 h-3 bg-white/20 rounded-full animate-pulse" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.4em] text-white/30 font-bold">
                    Select a node to scan
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
