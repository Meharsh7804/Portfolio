'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import ParticleField from '@/components/ui/ParticleField';
import { useChaos } from '@/context/ChaosContext';

const videos = ['/assets/1.mp4', '/assets/4.mp4'];

export default function Hero() {
  const { isChaos } = useChaos();
  const [phase, setPhase] = useState(0); // 0: Intro, 1: Visual Reveal, 2: Name Reveal, 3: Video/Interactive
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  
  const [videoIndex, setVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    if (videoIndex < videos.length - 1) {
      setVideoIndex(v => v + 1);
    }
  };
  
  // Mouse interaction for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    if (phase >= 1) {
      if (videoIndex === 0 && videoRef1.current) {
        videoRef1.current.play().catch(console.error);
      } else if (videoIndex === 1 && videoRef2.current) {
        videoRef2.current.play().catch(console.error);
      }
    }
  }, [videoIndex, phase]);

  useEffect(() => {
    // Phase Timings
    const timers = [
      setTimeout(() => setPhase(1), 2500), // Visual Reveal at 2.5s
      setTimeout(() => setPhase(2), 5500), // Name Reveal at 5.5s
      setTimeout(() => setPhase(3), 8500), // Video & CTA at 8.5s
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      
      {/* ─── VIDEO BACKGROUND (PHASE 1+) ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase >= 1 ? 1 : 0 
        }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center"
      >
        {phase >= 1 && (
          <>
            {/* First Video */}
            <video
              ref={videoRef1}
              src={videos[0]}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              loop={false}
              className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-1000 ${videoIndex === 0 ? 'opacity-40' : 'opacity-0'}`}
            />
            {/* Second Video */}
            <video
              ref={videoRef2}
              src={videos[1]}
              muted
              playsInline
              loop={false}
              className={`absolute inset-0 w-full h-full object-cover object-[50%_25%] transition-opacity duration-1000 ${videoIndex === 1 ? 'opacity-80' : 'opacity-0'}`}
            />
          </>
        )}
        
        {/* Gradients tailored to each video */}
        {phase >= 1 && (
          <>
            <div className={`absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] transition-opacity duration-1000 ${videoIndex === 0 ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute inset-0 bg-black/5 transition-opacity duration-1000 pointer-events-none ${videoIndex === 1 ? 'opacity-100' : 'opacity-0'}`} />
          </>
        )}
      </motion.div>

      {/* ─── PHASE 1 & 2: BACKGROUND PARTICLES ────────────────────── */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <ParticleField />
            
            {/* Particle Overlay: Dynamic based on video index */}
            {videoIndex === 0 ? (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 0 & 1: INTRO TEXTS ────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="intro-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1.5 }}
              className="z-50 text-center"
            >
              <p className="text-white/40 text-lg md:text-2xl tracking-[0.2em] font-light italic">
                {isChaos ? '"Every system breaks eventually..."' : '"Every story begins somewhere..."'}
              </p>
            </motion.div>
          )}

          {phase === 1 && (
            <motion.div
              key="reveal-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)"}}
              transition={{ duration: 2.5 }}
              className="z-50 text-center"
            >
              <p className="text-white/60 text-xl md:text-3xl tracking-[0.1em] font-light italic">
                {isChaos ? 'Mine broke right here.' : 'Mine began with watching them.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── PHASE 2 & 3: NAME & CTA ─────────────────────────────── */}
      {phase >= 2 && (
        <motion.div
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="z-40 text-center px-6 mt-[20vh] md:mt-[25vh]"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 3.5 }
              }
            }}
          >
            <h1 className="movie-title text-5xl md:text-[8vw] lg:text-[10vw] font-bold text-white mt-2 relative drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] flex justify-center">
              {(isChaos ? "SYSTEM FAILURE" : "MEHARSH CHANDURE").split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -40, filter: "blur(10px)" },
                    visible: { opacity: 1, x: 0, filter: "blur(0px)" }
                  }}
                  transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
                  className={char === " " ? "w-[3vw]" : "inline-block"}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 5 },
                visible: { opacity: 0.6, y: 0, transition: { delay: 5, duration: 1 } }
              }}
              className="text-[10px] md:text-sm uppercase tracking-[0.8em] text-white font-medium mb-10px"
            >
              {isChaos ? 'Crafting chaos through code.' : 'Crafting stories through code.'}
            </motion.p>
          </motion.div>

          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay:4 }}
                className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-10"
              >
                <Link href="/designs" className="block">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(245,158,11,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-16 py-5 bg-white text-black text-[11px] font-bold uppercase tracking-[0.4em] rounded-sm transition-all"
                  >
                    {isChaos ? 'Execute Override' : 'Explore My Works'}
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-16 py-5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.4em] rounded-sm transition-all backdrop-blur-md"
                >
                  {isChaos ? 'Enter The Void' : 'Enter My World'}
                </motion.button>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── WITTY LINE ─────────────────────────────────────────── */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            className="absolute bottom-8 right-8 z-50 hidden md:block"
          >
            <p className="text-[10px] italic text-white tracking-widest">
              {isChaos ? '(There is no escape from the void.)' : '(Yes, this site is a little extra.)'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}



