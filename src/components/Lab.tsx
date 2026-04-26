'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';

type Stage = 'prologue' | 'chaos' | 'structure' | 'synthesis' | 'opus' | 'epilogue';

export default function Lab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>('prologue');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [winSize, setWinSize] = useState({ w: 1000, h: 1000 });

  useEffect(() => {
    setWinSize({ w: window.innerWidth, h: window.innerHeight });
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextStage = (next: Stage) => setStage(next);

  // Dynamic Cursor Glow adapting to the story
  const glowColor = 
    stage === 'chaos' ? 'rgba(245, 158, 11, 0.05)' // accent-warm
    : stage === 'structure' ? 'rgba(16, 185, 129, 0.05)' // accent-cricket
    : stage === 'synthesis' ? 'rgba(6, 182, 212, 0.05)' // accent-cool
    : stage === 'opus' ? 'rgba(245, 158, 11, 0.08)' 
    : 'rgba(255, 255, 255, 0.03)';

  return (
    <section
      id="lab"
      ref={containerRef}
      className="relative w-full h-screen bg-[var(--bg-primary)] overflow-hidden flex items-center justify-center z-20"
      style={{ perspective: '1200px' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-primary)_100%)] z-10 pointer-events-none" />

      {/* Massive Reactive Glow */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full pointer-events-none blur-[150px] mix-blend-screen transition-colors duration-2000"
        animate={{ x: mousePos.x - 500, y: mousePos.y - 500, backgroundColor: glowColor }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.8 }}
      />

      <AnimatePresence mode="wait">
        {stage === 'prologue' && <Prologue onComplete={() => nextStage('chaos')} key="prologue" />}
        {stage === 'chaos' && <Chaos onComplete={() => nextStage('structure')} key="chaos" />}
        {stage === 'structure' && <Structure onComplete={() => nextStage('synthesis')} mousePos={mousePos} winSize={winSize} key="structure" />}
        {stage === 'synthesis' && <Synthesis onComplete={() => nextStage('opus')} mousePos={mousePos} winSize={winSize} key="synthesis" />}
        {stage === 'opus' && <Opus onComplete={() => nextStage('epilogue')} mousePos={mousePos} winSize={winSize} key="opus" />}
        {stage === 'epilogue' && <Epilogue onReset={() => nextStage('prologue')} key="epilogue" />}
      </AnimatePresence>
    </section>
  );
}

function Prologue({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 4000),
      setTimeout(() => setStep(3), 7000),
    ];
    return () => sequence.forEach(clearTimeout);
  }, []);

  // Fast-forward on click
  const handleFastForward = () => {
    if (step < 3) setStep(3);
    else onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="absolute inset-0 flex flex-col items-center justify-center z-20 cursor-pointer"
      onClick={handleFastForward}
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <div className="w-2 h-2 rounded-full bg-[var(--accent-warm)] shadow-[0_0_20px_var(--accent-warm)] animate-pulse" />
          </motion.div>
        )}
        {step === 1 && (
          <motion.h2 key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="movie-title text-4xl md:text-6xl text-[var(--accent-warm)] drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">
            The Blank Canvas
          </motion.h2>
        )}
        {step === 2 && (
          <motion.p key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="text-soulful text-2xl text-[var(--text-dim)]">
            Before code, there is only intent.
          </motion.p>
        )}
        {step === 3 && (
          <motion.button
            key="s3"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => { e.stopPropagation(); onComplete(); }}
            className="group relative px-12 py-4 mt-8 overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 border border-[var(--accent-warm)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[var(--accent-warm)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            <span className="relative z-10 movie-title text-xl tracking-[0.3em] text-[var(--accent-warm)] group-hover:text-[var(--bg-primary)] transition-colors duration-500">
              IGNITE
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      <div className="absolute bottom-10 text-[var(--text-dim)] text-xs tracking-widest opacity-30">Click to fast-forward</div>
    </motion.div>
  );
}

function Chaos({ onComplete }: { onComplete: () => void }) {
  const [fragments, setFragments] = useState<number[]>([]);
  const totalFragments = 15;
  const [forceComplete, setForceComplete] = useState(false); // Used to fast-forward

  useEffect(() => {
    const interval = setInterval(() => {
      setFragments(prev => {
        if (prev.length >= totalFragments) {
          clearInterval(interval);
          return prev;
        }
        return [...prev, prev.length];
      });
    }, 40); 
    return () => clearInterval(interval);
  }, []);

  const [stabilizedCount, setStabilizedCount] = useState(0);

  useEffect(() => {
    if (stabilizedCount === totalFragments || forceComplete) {
      setTimeout(onComplete, 800); // Super fast transition
    }
  }, [stabilizedCount, forceComplete, onComplete]);

  const handleFastForward = () => {
    setForceComplete(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(30px)', z: 500 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
      onClick={handleFastForward}
    >
      <div className="absolute top-20 text-center pointer-events-none">
        <motion.h3 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="movie-title text-3xl text-[var(--accent-warm)] opacity-80">
          Act I: The First Draft
        </motion.h3>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-soulful text-lg text-[var(--text-dim)] mt-2">
          Hover to align, or click to force order.
        </motion.p>
      </div>

      {fragments.map(id => (
        <ChaosFragment 
          key={id} id={id} total={totalFragments} 
          onStabilize={() => setStabilizedCount(p => p + 1)}
          isComplete={stabilizedCount === totalFragments || forceComplete}
        />
      ))}
    </motion.div>
  );
}

function ChaosFragment({ id, total, onStabilize, isComplete }: { id: number, total: number, onStabilize: () => void, isComplete: boolean }) {
  const [stabilized, setStabilized] = useState(false);
  
  useEffect(() => {
    if (isComplete && !stabilized) setStabilized(true);
  }, [isComplete, stabilized]);

  const handleHover = () => {
    if (!stabilized && !isComplete) {
      setStabilized(true);
      onStabilize();
    }
  };

  // Pre-defined identifiable shape: A perfect Circle
  const angle = (id / total) * Math.PI * 2;
  const radius = 120;
  const targetX = Math.cos(angle) * radius;
  const targetY = Math.sin(angle) * radius;
  const targetZ = 0;

  return (
    <motion.div
      onHoverStart={handleHover}
      onTap={handleHover}
      animate={stabilized || isComplete ? {
        x: targetX, y: targetY, z: targetZ,
        rotateX: 0, rotateY: 0, rotateZ: (angle * 180 / Math.PI) + 90,
        scale: 1,
        borderColor: isComplete ? 'var(--accent-warm)' : 'rgba(245,158,11,0.5)',
        backgroundColor: isComplete ? 'rgba(245,158,11,0.1)' : 'transparent',
      } : {
        x: [Math.random() * 800 - 400, Math.random() * 800 - 400],
        y: [Math.random() * 800 - 400, Math.random() * 800 - 400],
        z: [Math.random() * 600 - 300, Math.random() * 600 - 300],
        rotateX: [0, 360], rotateY: [0, 360],
        scale: [Math.random() + 0.5, Math.random() + 1],
      }}
      transition={stabilized || isComplete
        ? { type: 'spring', stiffness: 60, damping: 12 } 
        : { duration: Math.random() * 4 + 4, repeat: Infinity, ease: 'linear' }
      }
      className={`absolute left-1/2 top-1/2 -ml-6 -mt-6 w-12 h-12 border ${stabilized || isComplete ? 'border-[var(--accent-warm)] shadow-[0_0_15px_var(--accent-warm)]' : 'border-[var(--text-dim)] border-dashed'} flex flex-col items-center justify-center cursor-crosshair`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`w-1 h-1 rounded-full ${stabilized || isComplete ? 'bg-[var(--accent-warm)]' : 'bg-transparent'}`} />
    </motion.div>
  );
}

function Structure({ onComplete, mousePos, winSize }: { onComplete: () => void; mousePos: { x: number; y: number }; winSize: { w: number, h: number } }) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const requiredNodes = 6; // Hexagon

  const handleClick = () => {
    if (nodeIndex < requiredNodes) {
      setNodeIndex(p => p + 1);
      if (nodeIndex === requiredNodes - 1) {
        setTimeout(onComplete, 1500); // Faster exit
      }
    }
  };

  // Predefine Hexagon coordinates relative to screen center
  const radius = 180;
  const predefinedNodes = Array.from({ length: requiredNodes }).map((_, i) => {
    const angle = (i / requiredNodes) * Math.PI * 2 - Math.PI / 2; // start from top
    return {
      x: Math.cos(angle) * radius + winSize.w / 2,
      y: Math.sin(angle) * radius + winSize.h / 2
    };
  });

  const visibleNodes = predefinedNodes.slice(0, nodeIndex);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 1 }}
      className="absolute inset-0 cursor-crosshair z-20"
      onClick={handleClick}
    >
      <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none">
        <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="movie-title text-3xl text-[var(--accent-cricket)] opacity-80">
          Act II: Architecture
        </motion.h3>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-soulful text-lg text-[var(--text-dim)] mt-2">
          Click anywhere to form the structure ({nodeIndex}/{requiredNodes}).
        </motion.p>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_10px_var(--accent-cricket)]">
        {/* Draw lines between visible nodes */}
        {visibleNodes.map((node, i) => {
          if (i === 0) return null;
          return (
            <motion.line
              key={`line-${i}`} x1={visibleNodes[i-1].x} y1={visibleNodes[i-1].y} x2={node.x} y2={node.y}
              stroke="var(--accent-cricket)" strokeWidth="2" strokeDasharray="8,8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }}
            />
          );
        })}
        {/* Line following mouse from last node */}
        {nodeIndex > 0 && nodeIndex < requiredNodes && (
          <line x1={visibleNodes[nodeIndex - 1].x} y1={visibleNodes[nodeIndex - 1].y} x2={mousePos.x} y2={mousePos.y} stroke="var(--accent-cricket)" strokeWidth="1" strokeDasharray="4,12" opacity={0.5} />
        )}
        {/* Close the shape when complete */}
        {nodeIndex === requiredNodes && (
          <motion.line x1={visibleNodes[requiredNodes - 1].x} y1={visibleNodes[requiredNodes - 1].y} x2={visibleNodes[0].x} y2={visibleNodes[0].y} stroke="var(--accent-cricket)" strokeWidth="2" strokeDasharray="8,8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
        )}
      </svg>

      {/* Render all predefined nodes as faint targets */}
      {predefinedNodes.map((node, i) => (
        <div key={`target-${i}`} className={`absolute w-4 h-4 border border-[var(--accent-cricket)] rounded-full -ml-2 -mt-2 pointer-events-none opacity-${i < nodeIndex ? '0' : '20'}`} style={{ left: node.x, top: node.y }} />
      ))}

      {/* Render filled nodes */}
      {visibleNodes.map((node, i) => (
        <motion.div key={`node-${i}`} initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 45 }} className="absolute w-6 h-6 border border-[var(--accent-cricket)] bg-[var(--bg-secondary)] shadow-[0_0_20px_var(--accent-cricket)] flex items-center justify-center -ml-3 -mt-3 pointer-events-none" style={{ left: node.x, top: node.y }}>
          <div className="w-1 h-1 bg-[var(--accent-cricket)] rounded-full" />
        </motion.div>
      ))}

      {nodeIndex === requiredNodes && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 bg-[var(--accent-cricket)] mix-blend-overlay opacity-10 pointer-events-none" />
      )}
    </motion.div>
  );
}

function Synthesis({ onComplete, mousePos, winSize }: { onComplete: () => void; mousePos: { x: number; y: number }; winSize: { w: number, h: number } }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= 4) {
      setTimeout(onComplete, 1500); // Faster exit
    }
  }, [step, onComplete]);

  const rx = useTransform(useSpring(mousePos.y, { stiffness: 50 }), [0, winSize.h], [20, -20]);
  const ry = useTransform(useSpring(mousePos.x, { stiffness: 50 }), [0, winSize.w], [-30, 30]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }} transition={{ duration: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-20 cursor-pointer"
      onClick={() => setStep(p => Math.min(p + 1, 4))}
    >
      <div className="absolute top-20 text-center pointer-events-none">
        <motion.h3 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="movie-title text-3xl text-[var(--accent-cool)] opacity-80">
          Act III: Synthesis
        </motion.h3>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-soulful text-lg text-[var(--text-dim)] mt-2">
          Click rapidly to construct the modules.
        </motion.p>
      </div>

      <motion.div className="relative w-full h-[600px] mt-20 pointer-events-none" style={{ transformStyle: 'preserve-3d', rotateX: rx, rotateY: ry }}>
        <AnimatePresence>
          {step > 0 && (
             <motion.div 
               key="step-1"
               initial={{ opacity: 0, y: 200, z: -500 }} 
               animate={{ opacity: 1, y: 0, z: -200 }} 
               transition={{ duration: 0.5 }} 
               className="absolute left-1/4 top-1/4 w-[500px] h-[300px] cinematic-card p-8 border-l-4 border-l-[var(--accent-cool)]"
             >
                <div className="h-6 w-1/3 bg-[var(--accent-cool)] opacity-20 mb-6" />
                <div className="flex gap-4 h-32">
                  <div className="flex-1 bg-[var(--text-dim)] opacity-10 rounded-sm" />
                  <div className="flex-1 bg-[var(--text-dim)] opacity-10 rounded-sm" />
                  <div className="flex-1 bg-[var(--accent-cool)] opacity-30 shadow-[0_0_30px_var(--accent-cool)] rounded-sm" />
                </div>
             </motion.div>
          )}
          {step > 1 && (
             <motion.div 
               key="step-2"
               initial={{ opacity: 0, x: -300, z: 200 }} 
               animate={{ opacity: 1, x: 0, z: 100 }} 
               transition={{ duration: 0.5 }} 
               className="absolute right-1/4 top-10 w-[300px] h-[400px] cinematic-card p-8 border-t-4 border-t-[var(--accent-cool)]"
             >
                <svg className="w-full h-40 opacity-50" viewBox="0 0 100 50">
                  <path d="M0,50 L20,30 L40,40 L60,10 L80,20 L100,0" fill="none" stroke="var(--accent-cool)" strokeWidth="2" />
                  <path d="M0,50 L20,30 L40,40 L60,10 L80,20 L100,0 L100,50 L0,50 Z" fill="var(--accent-cool)" opacity="0.1" />
                </svg>
                <div className="mt-8 space-y-4">
                  <div className="h-2 w-full bg-[var(--text-dim)] opacity-20" />
                  <div className="h-2 w-4/5 bg-[var(--text-dim)] opacity-20" />
                  <div className="h-2 w-full bg-[var(--text-dim)] opacity-20" />
                </div>
             </motion.div>
          )}
          {step > 2 && (
             <motion.div 
               key="step-3"
               initial={{ opacity: 0, scale: 0, z: 500 }} 
               animate={{ opacity: 1, scale: 1, z: 300 }} 
               transition={{ duration: 0.5 }} 
               className="absolute left-[40%] top-1/3 w-[400px] h-[200px] cinematic-card p-6 border border-[var(--accent-cool)] flex items-center gap-6 shadow-[0_0_50px_rgba(6,182,212,0.2)]"
             >
                <div className="w-24 h-24 rounded-full border-4 border-dashed border-[var(--accent-cool)] animate-[spin_10s_linear_infinite] flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-cool)] opacity-20" />
                </div>
                <div className="flex-1 space-y-3">
                   <div className="h-4 w-1/2 bg-[var(--accent-cool)]" />
                   <div className="h-2 w-full bg-white opacity-20" />
                   <div className="h-2 w-3/4 bg-white opacity-20" />
                </div>
             </motion.div>
          )}
          {step > 3 && (
             <motion.div key="step-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 bg-[var(--accent-cool)] mix-blend-overlay opacity-10 pointer-events-none" />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Opus({ onComplete, mousePos, winSize }: { onComplete: () => void; mousePos: { x: number; y: number }; winSize: { w: number, h: number } }) {
  const smoothX = useSpring(mousePos.x, { damping: 30, stiffness: 80 });
  const smoothY = useSpring(mousePos.y, { damping: 30, stiffness: 80 });
  
  // Interaction states for side elements
  const [rotationMultiplier, setRotationMultiplier] = useState(1);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(onComplete, 8000); // reduced from 12s
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(30px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
      className="absolute inset-0 z-20 overflow-hidden flex items-center justify-center cursor-pointer"
      onClick={onComplete} // Fast forward on click
    >
      <div className="absolute top-1/4 text-center z-50 pointer-events-none mix-blend-difference">
        <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="movie-title text-5xl md:text-8xl text-white drop-shadow-[0_0_20px_white]">
          The Opus
        </motion.h3>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="text-soulful text-2xl text-white mt-4 italic opacity-80">
          And then, the system breathes.
        </motion.p>
      </div>

      <motion.div
        style={{ x: useTransform(smoothX, [0, winSize.w], [100, -100]), y: useTransform(smoothY, [0, winSize.h], [100, -100]) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div animate={{ rotate: 360 * rotationMultiplier }} transition={{ duration: 100 / Math.max(0.5, rotationMultiplier), repeat: Infinity, ease: 'linear' }} className="relative w-[150vw] h-[150vw] max-w-[2000px] max-h-[2000px]">
          <div className={`absolute inset-0 border border-[var(--accent-warm)] rounded-full transition-opacity duration-500 ${activeNode !== null ? 'opacity-30' : 'opacity-10'}`} />
          <div className="absolute inset-[10%] border border-[var(--accent-cool)] rounded-full opacity-20" />
          <div className={`absolute inset-[20%] border border-[var(--accent-cricket)] rounded-full transition-opacity duration-500 ${activeNode !== null ? 'opacity-30' : 'opacity-10'}`} />
          
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full blur-[1px] ${i % 3 === 0 ? 'bg-[var(--accent-warm)]' : i % 3 === 1 ? 'bg-[var(--accent-cool)]' : 'bg-[var(--accent-cricket)]'}`}
              style={{
                width: Math.random() * 6 + 2 + 'px',
                height: Math.random() * 6 + 2 + 'px',
                left: `${50 + Math.cos(i * 13) * (Math.random() * 40 + 10)}%`,
                top: `${50 + Math.sin(i * 13) * (Math.random() * 40 + 10)}%`,
                opacity: Math.random() * 0.5 + 0.2,
                boxShadow: '0 0 10px currentColor'
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x: useTransform(smoothX, [0, winSize.w], [-50, 50]), y: useTransform(smoothY, [0, winSize.h], [-50, 50]) }}
        className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none mix-blend-overlay"
      >
        <div className="w-[800px] h-[800px] bg-[conic-gradient(from_0deg,transparent,var(--accent-warm),transparent,var(--accent-cool),transparent)] animate-[spin_20s_linear_infinite] opacity-30 blur-3xl rounded-full" />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-10 text-white opacity-40 text-sm tracking-[0.4em] uppercase z-40 movie-title pointer-events-none">
        Click background to complete
      </motion.div>

      {/* Interactive Side Elements */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-12 z-50">
        {[0, 1, 2].map(i => (
          <motion.div 
            key={`left-${i}`}
            onHoverStart={() => setActiveNode(i)}
            onHoverEnd={() => setActiveNode(null)}
            onClick={(e) => {
              e.stopPropagation();
              setRotationMultiplier(p => p * 1.5);
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            className={`w-4 h-16 border ${i === 0 ? 'border-[var(--accent-warm)]' : i === 1 ? 'border-[var(--accent-cool)]' : 'border-[var(--accent-cricket)]'} cursor-pointer flex items-center justify-center group`}
          >
            <div className={`w-1 h-full bg-current opacity-20 group-hover:opacity-100 transition-opacity duration-300 ${i === 0 ? 'text-[var(--accent-warm)]' : i === 1 ? 'text-[var(--accent-cool)]' : 'text-[var(--accent-cricket)]'}`} />
          </motion.div>
        ))}
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-12 z-50">
        {[3, 4, 5].map(i => (
          <motion.div 
            key={`right-${i}`}
            onHoverStart={() => setActiveNode(i)}
            onHoverEnd={() => setActiveNode(null)}
            onClick={(e) => {
              e.stopPropagation();
              setRotationMultiplier(p => Math.max(0.5, p * 0.5));
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            className={`w-4 h-16 border ${i === 3 ? 'border-[var(--accent-warm)]' : i === 4 ? 'border-[var(--accent-cool)]' : 'border-[var(--accent-cricket)]'} cursor-pointer flex items-center justify-center group`}
          >
            <div className={`w-1 h-full bg-current opacity-20 group-hover:opacity-100 transition-opacity duration-300 ${i === 3 ? 'text-[var(--accent-warm)]' : i === 4 ? 'text-[var(--accent-cool)]' : 'text-[var(--accent-cricket)]'}`} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Epilogue({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[var(--bg-primary)] text-center cursor-pointer"
      onClick={onReset} // Fast forward reset
    >
      <div className="space-y-8 max-w-4xl px-6 relative z-10 pointer-events-none">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.5 }} className="text-soulful text-2xl md:text-3xl text-[var(--text-dim)] italic">
          "Great engineering is not just logic. <br className="hidden md:block"/> It is poetry written in the architecture of systems."
        </motion.p>
        <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 1.5 }} className="movie-title text-5xl md:text-7xl text-[var(--text-main)] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Let's build something <span className="text-[var(--accent-warm)]">unforgettable.</span>
        </motion.h1>
      </div>

      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1 }}
        onClick={onReset}
        className="mt-20 movie-title text-xl text-[var(--text-dim)] hover:text-[var(--accent-warm)] tracking-[0.3em] transition-colors duration-500 relative group"
      >
        <span>Experience Again</span>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[var(--accent-warm)] group-hover:w-full transition-all duration-500" />
      </motion.button>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05)_0%,transparent_60%)] pointer-events-none" />
    </motion.div>
  );
}
