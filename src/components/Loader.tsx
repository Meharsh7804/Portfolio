'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PERSONALIZED_LOGS = [
  "Initializing Meharsh_OS v3.0...",
  "Loading cinematic interfaces...",
  "Bypassing generic design patterns...",
  "Injecting coffee into neural engine...",
  "Synchronizing digital multiverse...",
  "Experience ready."
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete'>('loading');

  // Progress Counter
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 'loading') {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.floor(Math.random() * 3) + 2;
          if (next >= 100) {
            clearInterval(interval);
            setPhase('complete');
            return 100;
          }
          return next;
        });
      }, 40); // Faster count
    }
    return () => clearInterval(interval);
  }, [phase]);

  // Log Rotator
  useEffect(() => {
    if (phase === 'loading') {
      const interval = setInterval(() => {
        setLogIndex(prev => Math.min(prev + 1, PERSONALIZED_LOGS.length - 2));
      }, 400); // Change log every 0.4s
      return () => clearInterval(interval);
    } else if (phase === 'complete') {
      setLogIndex(PERSONALIZED_LOGS.length - 1); // Force last log "Experience ready."
    }
  }, [phase]);

  // Exit sequence
  useEffect(() => {
    if (phase === 'complete') {
      const timer = setTimeout(onComplete, 500); // Hold briefly, then unmount
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, y: '-100%' }} // Slides up to reveal site
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-mono select-none"
    >
      {/* Background Blueprint Grid (Interesting Element) */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative z-10 w-full max-w-3xl px-8 flex flex-col items-center">
        
        {/* Main 0-100 Counter */}
        <div className="relative mb-8 flex justify-center items-center">
          {/* Faint Outline Text */}
          <span className="absolute text-7xl md:text-9xl font-bold text-transparent opacity-20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
            {progress.toString().padStart(3, '0')}
          </span>
          {/* Solid Text over it (Opacity tied to progress) */}
          <motion.span 
            animate={{ 
              scale: phase === 'complete' ? 1.05 : 1,
              color: phase === 'complete' ? '#fff' : '#ffffff' 
            }}
            style={{ opacity: 0.1 + (progress / 100) * 0.9 }}
            className="text-6xl md:text-8xl font-bold text-white tracking-tighter movie-title z-10 transition-opacity duration-75"
          >
            {progress.toString().padStart(3, '0')}
          </motion.span>
          <span className="absolute bottom-2 md:bottom-4 -right-6 md:-right-8 text-lg md:text-2xl text-amber-500 font-bold">%</span>
        </div>

        {/* Loading Bar Line */}
        <div className="w-full max-w-md h-[2px] bg-white/5 relative overflow-hidden mb-6">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[var(--accent-warm)] shadow-[0_0_10px_var(--accent-warm)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>

        {/* Personalized Terminal Logs */}
        <div className="h-6 overflow-hidden flex justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={logIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`text-xs tracking-widest uppercase ${phase === 'complete' ? 'text-amber-500 font-bold' : 'text-white/50'}`}
            >
              {phase !== 'complete' && <span className="mr-2 text-white/30">sys_log:</span>}
              {PERSONALIZED_LOGS[logIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
