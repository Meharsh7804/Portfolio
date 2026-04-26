'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useChaos } from '@/context/ChaosContext';

export default function AlterEgo() {
  const { isChaos, setIsChaos } = useChaos();
  const [toggleCount, setToggleCount] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (countdown === 0) {
      setIsChaos(false);
    }
  }, [countdown, setIsChaos]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isChaos) {
      setCountdown(7);
      timer = setInterval(() => {
        setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      }, 1000);
    } else {
      setCountdown(null);
    }
    return () => clearInterval(timer);
  }, [isChaos]);

  const handleToggle = () => {
    setIsChaos(!isChaos);
    
    // Glitch effect on switch
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 150);

    // Secret feature logic
    setToggleCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 8) {
        setSecretUnlocked(true);
      }
      return newCount;
    });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setToggleCount(0);
    }, 2000);
  };

  return (
    <section 
      id="alter-ego"
      className={`min-h-screen relative flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${
        isChaos ? 'bg-[#030000]' : 'bg-[#020202]'
      }`}
    >
      {/* Glitch Overlay */}
      {isGlitching && (
        <div className="absolute inset-0 z-50 pointer-events-none mix-blend-difference bg-white opacity-50" style={{ filter: 'invert(1)' }} />
      )}

      {/* Chaotic Background Noise & Scanlines */}
      <AnimatePresence>
        {isChaos && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay animate-pulse" />
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.1)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none z-50" />
            <motion.div 
              animate={{ 
                x: [0, -10, 10, -5, 5, 0],
                y: [0, 5, -5, 10, -10, 0]
              }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
              className="absolute inset-0 shadow-[inset_0_0_150px_rgba(255,0,0,0.3)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Site Damage Overlay */}
      {isChaos && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 99999 }}
        >
          {/* Corrupt the color palette of the entire site below */}
          <div 
            className="absolute inset-0 transition-all duration-1000 mix-blend-color"
            style={{ backdropFilter: 'hue-rotate(320deg) saturate(3) contrast(1.2)' }}
          />
          {/* Scanlines over the whole site */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{
            background: 'repeating-linear-gradient(0deg, rgba(255,0,0,0.15), rgba(255,0,0,0.15) 2px, transparent 2px, transparent 4px)',
            animation: 'scanlineScroll 10s linear infinite'
          }} />
          {/* Deep red vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(255,0,0,0.5)]" />

          {/* Countdown Timer */}
          <AnimatePresence>
            {countdown !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="absolute top-10 right-10 text-red-500 movie-title text-6xl md:text-8xl drop-shadow-[0_0_20px_rgba(255,0,0,0.8)] mix-blend-screen z-[100000]"
              >
                00:0{countdown}
              </motion.div>
            )}
          </AnimatePresence>
        </div>,
        document.body
      )}

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
        
        {/* Toggle Switch Container */}
        <div className="mb-20 flex flex-col items-center">
          <p className={`text-xs uppercase tracking-[0.4em] mb-6 font-bold transition-colors duration-700 ${isChaos ? 'text-red-600' : 'text-white/40'}`}>
            System Override
          </p>
          
          <div 
            onClick={handleToggle}
            className={`w-40 h-16 md:w-56 md:h-20 rounded-full p-2 cursor-pointer shadow-inner transition-all duration-700 flex items-center relative ${
              isChaos ? 'bg-red-950/40 border border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.3)]' : 'bg-white/5 border border-white/10 shadow-md'
            }`}
          >
            {/* The Knob */}
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center absolute shadow-lg ${
                isChaos ? 'bg-red-600 left-[calc(100%-4rem)] md:left-[calc(100%-4.5rem)]' : 'bg-amber-500 left-2'
              }`}
            >
              <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${isChaos ? 'text-black' : 'text-black'}`}>
                {isChaos ? 'Chaos' : 'Norm'}
              </span>
            </motion.div>
            
            {/* Background Labels */}
            <div className="w-full flex justify-between px-6 md:px-8 pointer-events-none absolute inset-0 items-center">
              <span className={`text-xs font-bold tracking-widest uppercase transition-opacity duration-300 ${isChaos ? 'opacity-0' : 'opacity-30 text-white ml-16'}`}>
                Alter Ego
              </span>
              <span className={`text-xs font-bold tracking-widest uppercase transition-opacity duration-300 ${isChaos ? 'opacity-50 text-red-500 mr-16' : 'opacity-0'}`}>
                Normal
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center relative h-64 w-full flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isChaos ? (
              <motion.div
                key="normal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-medium text-white tracking-tight leading-none mb-6 font-sans">
                  Clean. Scalable.
                </h2>
                <p className="text-xl md:text-2xl text-white/50 font-light tracking-wide max-w-2xl">
                  I build scalable, professional web applications with precision and a focus on user experience.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="chaos"
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Glitch Text Effect */}
                <div className="relative">
                  <motion.h2 
                    animate={{ x: [-2, 2, -2], opacity: [1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 0.1 }}
                    className="absolute inset-0 text-5xl md:text-7xl lg:text-[6rem] font-black text-red-500/50 translate-x-1 translate-y-1 tracking-tighter leading-none uppercase mix-blend-screen"
                  >
                    I BREAK THINGS
                  </motion.h2>
                  <motion.h2 
                    animate={{ x: [2, -2, 2], opacity: [1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 0.15 }}
                    className="absolute inset-0 text-5xl md:text-7xl lg:text-[6rem] font-black text-cyan-500/50 -translate-x-1 -translate-y-1 tracking-tighter leading-none uppercase mix-blend-screen"
                  >
                    I BREAK THINGS
                  </motion.h2>
                  <h2 className="relative text-5xl md:text-7xl lg:text-[6rem] font-black text-red-600 tracking-tighter leading-none mb-6 uppercase">
                    I BREAK THINGS
                  </h2>
                </div>

                <motion.p 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="text-xl md:text-3xl text-red-400 font-mono tracking-widest max-w-2xl uppercase mt-4"
                >
                  UNTIL THEY WORK.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Secret Feature */}
        <AnimatePresence>
          {secretUnlocked && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="mt-20 px-8 py-4 bg-red-900/30 border border-red-500 rounded-sm backdrop-blur-md"
            >
              <p className="text-red-400 font-mono text-sm tracking-[0.3em] uppercase animate-pulse">
                &gt; SYSTEM BREACHED. THE VOID WELCOMES YOU.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
