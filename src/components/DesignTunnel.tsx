'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { BsX, BsArrowsAngleExpand } from 'react-icons/bs';

const DESIGNS = [
  { id: 1, src: '/assets/25designs/1.png' },
  { id: 2, src: '/assets/25designs/2.png' },
  { id: 3, src: '/assets/25designs/3.png' },
  { id: 4, src: '/assets/25designs/4.png' },
  { id: 5, src: '/assets/25designs/5.png' },
  { id: 6, src: '/assets/25designs/6.png' },
  { id: 7, src: '/assets/25designs/7.png' },
  { id: 8, src: '/assets/25designs/8.png' },
  { id: 9, src: '/assets/25designs/9.png' },
  { id: 10, src: '/assets/25designs/10.jpg' },
  { id: 11, src: '/assets/25designs/11.jpg' },
  { id: 12, src: '/assets/25designs/12.jpg' },
  { id: 13, src: '/assets/25designs/13.png' },
  { id: 14, src: '/assets/25designs/14.png' },
  { id: 15, src: '/assets/25designs/15.png' },
  { id: 16, src: '/assets/25designs/16.png' },
  { id: 17, src: '/assets/25designs/17.jpg' },
  { id: 18, src: '/assets/25designs/18.png' },
  { id: 19, src: '/assets/25designs/19.jpg' },
  { id: 20, src: '/assets/25designs/20.png' },
  { id: 21, src: '/assets/25designs/21.png' },
  { id: 22, src: '/assets/25designs/22.png' },
  { id: 23, src: '/assets/25designs/23.png' },
  { id: 24, src: '/assets/25designs/24.png' },
  { id: 25, src: '/assets/25designs/25.png' },
];

export default function DesignTunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll tracking for the tunnel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  // Mouse move for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (selectedDesign) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 50;
      const y = (clientY / window.innerHeight - 0.5) * 50;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [selectedDesign]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[800vh] bg-[#020202] overflow-visible z-10"
      id="designs"
    >
      {/* Fixed Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-2000">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[#020202] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] z-0" />
        
        {/* The Tunnel Contents */}
        <motion.div 
          style={{ 
            x: mousePos.x, 
            y: mousePos.y,
            transition: { type: 'spring', stiffness: 20, damping: 10 }
          }}
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
        >
          {DESIGNS.map((design, index) => (
            <DesignCard 
              key={design.id} 
              design={design} 
              index={index} 
              total={DESIGNS.length}
              scrollProgress={smoothProgress}
              onSelect={() => setSelectedDesign(design.src)}
            />
          ))}
        </motion.div>

        {/* Section Header (Fades as you scroll) */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
          className="absolute top-20 left-10 z-50 pointer-events-none"
        >
          <span className="text-xs uppercase tracking-[0.8em] text-white/20 mb-4 block font-bold">Archives</span>
          <h2 className="movie-title text-5xl md:text-8xl text-white tracking-widest uppercase">
            Visual <span className="text-white/40">Vault</span>
          </h2>
          <p className="text-white/20 text-sm mt-6 tracking-[0.4em] uppercase font-light">Scroll to descend into the abyss</p>
        </motion.div>

        {/* Scroll Progress Indicator (Vertical line) */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-white/10 z-50 overflow-hidden">
          <motion.div 
            style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
            className="w-full h-full bg-white/60 shadow-[0_0_10px_white]"
          />
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-20"
            onClick={() => setSelectedDesign(null)}
          >
            {/* Close Button */}
            <motion.button 
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedDesign(null)}
            >
              <BsX className="text-6xl" />
            </motion.button>

            <motion.div 
              layoutId={selectedDesign}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedDesign} 
                alt="Selected UI Design" 
                fill 
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DesignCard({ design, index, total, scrollProgress, onSelect }: { 
  design: any, 
  index: number, 
  total: number, 
  scrollProgress: any,
  onSelect: () => void
}) {
  // Each card covers a range of the scroll progress
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  
  // Z-axis movement: Starts far back (-3000), moves forward to user (1000)
  // We want the card to be visible even before its "active" scroll range
  const z = useTransform(scrollProgress, [start - step * 2, start, end, end + step * 2], [-5000, -2000, 1000, 3000]);
  
  // Opacity: Fades in, reaches 1 at its peak, fades out as it passes user
  const opacity = useTransform(scrollProgress, [start - step * 2, start, start + step * 0.5, end, end + step * 2], [0, 0, 1, 1, 0]);
  
  // Scale: Subtle zoom as it approaches
  const scale = useTransform(scrollProgress, [start - step * 2, start, end], [0.5, 1, 1.5]);
  
  // Depth Blur: Blur far away designs
  const blur = useTransform(scrollProgress, [start - step * 2, start, start + step * 0.1, end - step * 0.1, end, end + step * 2], [20, 10, 0, 0, 5, 20]);

  return (
    <motion.div
      style={{ 
        z, 
        opacity, 
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        pointerEvents: useTransform(scrollProgress, (v) => v >= start && v <= end ? 'auto' : 'none')
      }}
      className="absolute w-[80vw] md:w-[60vw] max-w-[1200px] aspect-video z-10 cursor-pointer group"
      onClick={onSelect}
    >
      <div className="relative w-full h-full border border-white/5 bg-white/[0.02] backdrop-blur-3xl overflow-hidden rounded-sm transition-all duration-700 group-hover:border-white/20 group-hover:bg-white/[0.05] shadow-2xl">
        
        {/* Design Image */}
        <Image 
          src={design.src} 
          alt={`UI Design ${design.id}`} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 1200px"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
              <BsArrowsAngleExpand className="text-white text-2xl" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-white font-bold">Inspect Artifact</span>
          </motion.div>
        </div>

        {/* Card Metadata */}
        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
           <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1 block">Entry #{design.id.toString().padStart(2, '0')}</span>
                <h4 className="text-xl font-bold tracking-widest text-white">SYSTEM_INTERFACE_{design.id}</h4>
              </div>
              <div className="text-[10px] font-mono text-white/30 tracking-widest">
                 RCOEM // PARADIGM_SHIFT
              </div>
           </div>
        </div>
      </div>
      
      {/* Outer Glow (Reactive) */}
      <div className="absolute -inset-10 bg-white/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </motion.div>
  );
}
