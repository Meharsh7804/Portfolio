'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BsShieldCheck, BsChatRightDots, BsGeoAlt, BsTaxiFront, BsStarFill, BsGithub, BsCpu, BsHexagon, BsBuildings, BsMap } from 'react-icons/bs';

const NODES = [
  "Analyzing Route Safety Scores",
  "Evaluating Street Illumination",
  "Processing Intent Prompts",
  "Mapping Secure Vectors",
  "Initializing Saarthi Protocol"
];

const TRANSITION = { duration: 1.2, ease: [0.16, 1, 0.3, 1] } as const;

// Rich City Map with streets, zones, labels, and HUD chrome
const CityMap = ({ isSecure = false }: { isSecure?: boolean }) => {
  return (
    <>
    {/* --- SVG Background Map --- */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="grad-red" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="grad-orange" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="grad-green" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="grad-blue" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base background */}
      <rect width="1000" height="600" fill="#050a0f" />

      {/* Neighborhood fills */}
      <rect x="0" y="0" width="340" height="280" fill="#0d1117" rx="2" />
      <rect x="340" y="0" width="320" height="280" fill="#080d12" rx="2" />
      <rect x="660" y="0" width="340" height="280" fill="#0a0f15" rx="2" />
      <rect x="0" y="280" width="340" height="320" fill="#0a0f14" rx="2" />
      <rect x="340" y="280" width="320" height="320" fill="#0c1118" rx="2" />
      <rect x="660" y="280" width="340" height="320" fill="#080c11" rx="2" />

      {/* City blocks (buildings) — top area */}
      {[
        [60,40,80,50], [160,40,60,50], [260,40,70,50], [370,40,90,50], [490,40,80,50], [600,40,60,50], [700,40,90,50], [820,40,80,50], [920,40,60,50],
        [60,110,50,60], [140,110,90,40], [260,110,60,50], [360,110,80,60], [470,110,70,40], [580,110,90,60], [700,110,60,50], [800,110,80,40], [920,110,60,60],
        [60,200,90,60], [180,200,60,60], [280,200,80,60], [390,200,70,60], [490,200,90,50], [620,200,60,60], [720,200,80,50], [840,200,70,60],
        [60,360,70,60], [170,360,80,50], [290,360,60,60], [390,360,90,50], [510,360,70,60], [620,360,80,50], [740,360,60,60], [840,360,90,50], [940,360,50,60],
        [60,450,90,60], [190,450,60,60], [290,450,80,50], [400,450,70,60], [510,450,90,50], [630,450,60,60], [730,450,80,60], [850,450,70,50], [940,450,50,60],
        [60,540,80,50], [180,540,60,50], [280,540,90,50], [400,540,70,50], [510,540,80,50], [630,540,60,50], [730,540,90,50], [860,540,60,50],
      ].map(([x, y, w, h], i) => (
        <motion.rect key={i} x={x} y={y} width={w} height={h}
          fill={isSecure ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.025)'}
          stroke={isSecure ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.06)'}
          strokeWidth="0.5" rx="1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.015 }}
        />
      ))}

      {/* Major roads — horizontal */}
      <rect x="0" y="95" width="1000" height="10" fill="rgba(255,255,255,0.04)" />
      <rect x="0" y="175" width="1000" height="6" fill="rgba(255,255,255,0.03)" />
      <rect x="0" y="280" width="1000" height="12" fill="rgba(255,255,255,0.05)" />
      <rect x="0" y="350" width="1000" height="6" fill="rgba(255,255,255,0.03)" />
      <rect x="0" y="440" width="1000" height="10" fill="rgba(255,255,255,0.04)" />
      <rect x="0" y="530" width="1000" height="6" fill="rgba(255,255,255,0.03)" />

      {/* Major roads — vertical */}
      <rect x="95" y="0" width="10" height="600" fill="rgba(255,255,255,0.04)" />
      <rect x="170" y="0" width="6" height="600" fill="rgba(255,255,255,0.03)" />
      <rect x="340" y="0" width="12" height="600" fill="rgba(255,255,255,0.05)" />
      <rect x="490" y="0" width="6" height="600" fill="rgba(255,255,255,0.03)" />
      <rect x="660" y="0" width="12" height="600" fill="rgba(255,255,255,0.05)" />
      <rect x="840" y="0" width="8" height="600" fill="rgba(255,255,255,0.04)" />

      {/* Road centre-lines */}
      <line x1="0" y1="100" x2="1000" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="20 15" />
      <line x1="0" y1="285" x2="1000" y2="285" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="20 15" />
      <line x1="100" y1="0" x2="100" y2="600" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="20 15" />
      <line x1="345" y1="0" x2="345" y2="600" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="20 15" />
      <line x1="665" y1="0" x2="665" y2="600" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="20 15" />

      {/* Park / green space */}
      <motion.rect x="420" y="310" width="120" height="80" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.1)" strokeWidth="0.5" rx="4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
      <text x="442" y="358" fill="rgba(34,197,94,0.4)" fontSize="8" fontFamily="monospace">PARK</text>

      {/* Water body */}
      <motion.rect x="0" y="500" width="80" height="100" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.12)" strokeWidth="0.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
      <text x="10" y="555" fill="rgba(59,130,246,0.4)" fontSize="8" fontFamily="monospace">LAKE</text>

      {/* Danger / risk zones — positioned ON the unsafe route path */}
      {/* Unsafe route: (170,440)→(170,280)→(340,280)→(340,175)→(660,175) */}
      {!isSecure && (
        <>
          {/* Zone 1: on y=280 segment between x=170 and x=340 */}
          <motion.circle cx="255" cy="280" r="75" fill="url(#grad-red)" animate={{ opacity: [0.6, 1, 0.6], r: [72, 82, 72] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} />
          {/* Zone 2: on y=175 segment between x=340 and x=660 */}
          <motion.circle cx="500" cy="175" r="65" fill="url(#grad-red)" animate={{ opacity: [0.5, 0.9, 0.5], r: [62, 72, 62] }} transition={{ repeat: Infinity, duration: 4, delay: 0.8 }} />
          {/* Zone 3 (caution): on x=340 vertical between y=175 and y=280 — the sharp turn */}
          <motion.circle cx="340" cy="228" r="50" fill="url(#grad-orange)" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.4 }} />
          {/* Labels */}
          <text x="196" y="276" fill="rgba(220,38,38,0.75)" fontSize="8" fontFamily="monospace" fontWeight="bold">HIGH RISK</text>
          <text x="442" y="170" fill="rgba(220,38,38,0.75)" fontSize="8" fontFamily="monospace" fontWeight="bold">HIGH RISK</text>
          <text x="292" y="224" fill="rgba(249,115,22,0.75)" fontSize="8" fontFamily="monospace">CAUTION</text>
          {/* Broken street lamp indicators — on unsafe route segments */}
          {[[170,390],[210,280],[340,240],[430,175],[560,175]].map(([x,y],i)=>(
            <motion.circle key={i} cx={x} cy={y} r="3.5" fill="rgba(220,38,38,0.7)" animate={{ opacity:[0.3,1,0.3] }} transition={{ repeat:Infinity, duration:1.2, delay:i*0.25 }} />
          ))}
        </>
      )}

      {/* Safe corridor highlight — follows safe route: (170,440)→(490,440)→(490,350)→(660,350)→(660,175) */}
      {isSecure && (
        <>
          <motion.path
            d="M 170 440 L 490 440 L 490 350 L 660 350 L 660 175"
            fill="none" stroke="rgba(34,197,94,0.07)" strokeWidth="55" strokeLinecap="square"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5 }}
          />
          {/* Well-lit markers at intersections along safe route */}
          {[[170,440],[300,440],[490,440],[490,395],[490,350],[575,350],[660,350],[660,262],[660,175]].map(([x,y],i)=>(
            <motion.circle key={i} cx={x} cy={y} r="4" fill="rgba(34,197,94,0.6)" animate={{ opacity:[0.4,1,0.4], r:[3.5,5.5,3.5] }} transition={{ repeat:Infinity, duration:2.2, delay:i*0.3 }} />
          ))}
          <motion.circle cx="660" cy="280" r="55" fill="url(#grad-blue)" animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} />
          <text x="670" y="278" fill="rgba(59,130,246,0.45)" fontSize="7" fontFamily="monospace">CIVIC</text>
        </>
      )}

      {/* Neighborhood Labels */}
      <text x="20" y="25" fill="rgba(255,255,255,0.12)" fontSize="9" fontFamily="monospace" letterSpacing="2">DHARAVI</text>
      <text x="370" y="25" fill="rgba(255,255,255,0.12)" fontSize="9" fontFamily="monospace" letterSpacing="2">BANDRA</text>
      <text x="690" y="25" fill="rgba(255,255,255,0.12)" fontSize="9" fontFamily="monospace" letterSpacing="2">ANDHERI</text>
      <text x="20" y="310" fill="rgba(255,255,255,0.12)" fontSize="9" fontFamily="monospace" letterSpacing="2">KURLA</text>
      <text x="370" y="310" fill="rgba(255,255,255,0.12)" fontSize="9" fontFamily="monospace" letterSpacing="2">DADAR</text>
      <text x="690" y="310" fill="rgba(255,255,255,0.12)" fontSize="9" fontFamily="monospace" letterSpacing="2">POWAI</text>

      {/* Road name labels */}
      <text x="120" y="93" fill="rgba(255,255,255,0.15)" fontSize="7" fontFamily="monospace">LINK RD</text>
      <text x="380" y="278" fill="rgba(255,255,255,0.15)" fontSize="7" fontFamily="monospace">WESTERN EXPRESS HWY</text>
      <text x="680" y="275" fill="rgba(255,255,255,0.15)" fontSize="7" fontFamily="monospace">EASTERN FREEWAY</text>
    </svg>

    {/* Moving traffic dots along roads */}
    {[...Array(8)].map((_, i) => {
      const routes = [
        { x: [0, 1000], y: [100, 100] },
        { x: [1000, 0], y: [285, 285] },
        { x: [100, 100], y: [0, 600] },
        { x: [345, 345], y: [600, 0] },
        { x: [665, 665], y: [0, 600] },
        { x: [0, 1000], y: [440, 440] },
        { x: [840, 840], y: [600, 0] },
        { x: [1000, 0], y: [530, 530] },
      ];
      const r = routes[i];
      return (
        <motion.div key={i} className="absolute w-[5px] h-[5px] rounded-full pointer-events-none"
          style={{ left: r.x[0] / 10 + '%', top: r.y[0] / 6 + '%', backgroundColor: isSecure ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.35)' }}
          animate={{ left: r.x[1] / 10 + '%', top: r.y[1] / 6 + '%' }}
          transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'linear', delay: i * 0.7 }}
        />
      );
    })}

    {/* HUD Chrome — Compass */}
    <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <text x="18" y="10" fill="rgba(239,68,68,0.8)" fontSize="8" fontFamily="monospace" fontWeight="bold">N</text>
        <text x="18" y="36" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">S</text>
        <text x="4" y="23" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">W</text>
        <text x="30" y="23" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">E</text>
        <line x1="20" y1="14" x2="20" y2="20" stroke="rgba(239,68,68,0.7)" strokeWidth="1.5" />
        <line x1="20" y1="20" x2="20" y2="26" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      </svg>
    </div>

    {/* HUD Chrome — Scale bar */}
    <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
      <div className="flex items-center gap-1">
        <div className="w-14 h-[1px] bg-white/20" />
        <span className="text-[7px] font-mono text-white/25">500m</span>
      </div>
    </div>

    {/* HUD Chrome — Zoom */}
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
      <div className="w-6 h-6 border border-white/10 flex items-center justify-center text-white/20 text-sm cursor-pointer hover:border-white/30 transition-colors">+</div>
      <div className="w-6 h-6 border border-white/10 flex items-center justify-center text-white/20 text-sm cursor-pointer hover:border-white/30 transition-colors">−</div>
    </div>
  </>
  );
};

export default function SaarthiProject() {
  const [phase, setPhase] = useState<'chaos' | 'problem' | 'intro' | 'booking' | 'calculation' | 'motion' | 'arrival' | 'details'>('chaos');
  const [promptText, setPromptText] = useState("");
  const [activeNode, setActiveNode] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const skippedRef = useRef(false);

  const fullPrompt = "Book me a safe ride home";

  const skipStory = () => {
    skippedRef.current = true;
    setPhase('details');
  };

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 4000));
      if (skippedRef.current) return;
      setPhase('problem');
      await new Promise(r => setTimeout(r, 6000));
      if (skippedRef.current) return;
      setPhase('intro');
      await new Promise(r => setTimeout(r, 4000));
      if (skippedRef.current) return;
      setPhase('booking');
      for (let i = 0; i <= fullPrompt.length; i++) {
        if (skippedRef.current) return;
        setPromptText(fullPrompt.slice(0, i));
        await new Promise(r => setTimeout(r, 80));
      }
      await new Promise(r => setTimeout(r, 1000));
      if (skippedRef.current) return;
      setPhase('calculation');
      for(let i=0; i<NODES.length; i++) {
        if (skippedRef.current) return;
        setActiveNode(i);
        await new Promise(r => setTimeout(r, 1200));
      }
      if (skippedRef.current) return;
      setPhase('motion');
      await new Promise(r => setTimeout(r, 7000));
      if (skippedRef.current) return;
      setPhase('arrival');
      await new Promise(r => setTimeout(r, 4000));
      if (skippedRef.current) return;
      setPhase('details');
    };
    sequence();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-amber-500/30 overflow-x-hidden relative font-sans">
      
      <AnimatePresence mode="wait">
        {phase !== 'details' && (
          <motion.div 
            key={phase}
            initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={TRANSITION}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202] overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
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
            
            {/* SCENE 1: CHAOS */}
            {phase === 'chaos' && (
              <div className="z-10 text-center space-y-6">
                <div className="space-y-4">
                  <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl md:text-2xl font-light tracking-[0.5em] uppercase text-white/40">Midnight ∙ City Core</motion.h2>
                  <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }} className="text-3xl md:text-5xl font-light tracking-[0.2em] italic text-white/80">Alone. Unknown Streets.</motion.h2>
                  <motion.h2 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.5, type: 'spring' }} className="text-5xl md:text-7xl font-black tracking-tight text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase">Unsafe?</motion.h2>
                </div>
              </div>
            )}

            {/* SCENE 2: PROBLEM (HUD MAP) */}
            {phase === 'problem' && (
              <div className="w-full max-w-4xl px-8 flex flex-col items-center">
                <div className="relative w-full h-[48vh] border border-red-900/30 rounded-2xl overflow-hidden shadow-2xl">
                   <CityMap />
                   {/* Unsafe route: (170,440)→(170,280)→(340,280)→(340,175)→(660,175) */}
                   <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                      <motion.path
                        d="M 170,440 L 170,280 L 340,280 L 340,175 L 660,175"
                        fill="none" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="square" strokeDasharray="12 8"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3.5 }}
                        style={{ filter: 'drop-shadow(0 0 8px rgba(220,38,38,0.8))' }}
                      />
                      {/* Turn-point dots at intersections */}
                      {[[170,280],[340,280],[340,175]].map(([x,y],i)=>(
                        <motion.circle key={i} cx={x} cy={y} r="4" fill="rgba(220,38,38,0.8)"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.8 + i * 0.6, duration: 0.4 }}
                        />
                      ))}
                      {/* Pickup pin */}
                      <g transform="translate(170,440)">
                        <circle r="7" fill="#fff" />
                        <circle r="13" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <text x="14" y="5" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace">PICKUP</text>
                      </g>
                      {/* Destination pin */}
                      <g transform="translate(660,175)">
                        <circle r="7" fill="#dc2626" style={{ filter: 'drop-shadow(0 0 6px #dc2626)' }} />
                        <circle r="13" fill="none" stroke="rgba(220,38,38,0.4)" strokeWidth="1" />
                        <text x="14" y="5" fill="rgba(220,38,38,0.7)" fontSize="9" fontFamily="monospace">DEST</text>
                      </g>
                   </svg>
                   {/* Legend */}
                   <div className="absolute bottom-4 left-5 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2"><div className="w-6 h-[2px] bg-red-500 opacity-70" style={{borderTop:'2px dashed #dc2626'}} /><span className="text-[8px] font-mono text-red-400/70 tracking-widest">UNSAFE ROUTE</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/60" /><span className="text-[8px] font-mono text-red-400/60 tracking-widest">HIGH RISK ZONE</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500/30 border border-orange-500/50" /><span className="text-[8px] font-mono text-orange-400/60 tracking-widest">CAUTION ZONE</span></div>
                   </div>
                   {/* Status bar */}
                   <div className="absolute bottom-4 right-5 flex items-center gap-3 font-mono text-red-500/60 text-[8px] tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <p>RISK_SCAN: ACTIVE</p>
                   </div>
                </div>
                <div className="mt-7 text-center space-y-3">
                   <h3 className="text-2xl md:text-3xl font-light tracking-[0.1em] italic text-white/90">"Is the shortest route always the safest?"</h3>
                   <p className="text-[9px] uppercase tracking-[0.6em] text-white/20">1.4M safety vectors analyzed</p>
                </div>
              </div>
            )}

            {/* SCENE 3: INTRO */}
            {phase === 'intro' && (
              <div className="text-center space-y-10 px-8 max-w-3xl">
                 <motion.div 
                   initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                   className="w-20 h-20 border border-amber-500/40 rounded-full mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.1)]"
                 >
                    <BsHexagon className="text-2xl text-amber-500 animate-pulse" />
                 </motion.div>
                 <h2 className="text-3xl md:text-6xl font-bold tracking-[0.05em] movie-title leading-tight">
                   EVERY JOURNEY NEEDS <br/>
                   <span className="text-amber-500 uppercase">A True Guide.</span>
                 </h2>
                 <p className="text-lg md:text-2xl font-light tracking-[0.4em] text-white/30 italic">Beyond maps. Beyond rides.</p>
              </div>
            )}

            {/* SCENE 4: BOOKING */}
            {phase === 'booking' && (
              <div className="w-full max-w-xl px-8 flex flex-col items-center gap-12">
                 <div className="w-full bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-4 flex items-center gap-6 shadow-2xl relative group">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 text-2xl ml-2">
                       <BsChatRightDots />
                    </div>
                    <div className="flex-1 font-sans text-lg md:text-xl text-white/90 py-4">
                       <span>{promptText}</span>
                       <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-[2px] h-6 bg-amber-500 ml-1 translate-y-1" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-black text-xl mr-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                       <BsCpu />
                    </div>
                 </div>
                 <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">Saarthi Intelligence is listening...</p>
              </div>
            )}

            {/* SCENE 5: CALCULATION */}
            {phase === 'calculation' && (
              <div className="flex flex-col items-center gap-12">
                 <div className="relative w-64 h-64 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 border border-dashed border-amber-500/20 rounded-full" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-32 h-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.2),transparent_70%)] border border-amber-500/40 flex items-center justify-center relative shadow-[0_0_80px_rgba(245,158,11,0.2)]"
                    >
                       <BsCpu className="text-4xl text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                    </motion.div>
                 </div>
                 <div className="text-center min-h-[80px]">
                    <AnimatePresence mode="wait">
                      <motion.div key={activeNode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                        <p className="text-[11px] uppercase tracking-[1em] text-amber-500 font-bold">{NODES[activeNode]}</p>
                        <div className="flex justify-center gap-2">
                           {[...Array(3)].map((_, i) => (
                             <motion.div 
                              key={i} animate={{ opacity: [0.2, 1, 0.2] }} 
                              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                              className="w-1.5 h-1.5 rounded-full bg-amber-500" 
                             />
                           ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                 </div>
              </div>
            )}

            {/* SCENE 6: MOTION */}
            {phase === 'motion' && (
              <div className="w-full max-w-4xl px-8 flex flex-col items-center gap-8">
                <div className="relative w-full h-[48vh] border border-green-900/30 rounded-xl overflow-hidden shadow-2xl">
                    <CityMap isSecure />
                    {/* Safe route: (170,440)→(490,440)→(490,350)→(660,350)→(660,175) */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                       {/* Glow halo */}
                       <motion.path
                        d="M 170,440 L 490,440 L 490,350 L 660,350 L 660,175"
                        fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="18" strokeLinecap="square"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3 }}
                       />
                       {/* Sharp road-following green line */}
                       <motion.path
                        d="M 170,440 L 490,440 L 490,350 L 660,350 L 660,175"
                        fill="none" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="square"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3 }}
                        style={{ filter: 'drop-shadow(0 0 10px rgba(34,197,94,0.9))' }}
                       />
                       {/* Animated cab along road path */}
                       <motion.g
                         style={{ offsetPath: "path('M 170,440 L 490,440 L 490,350 L 660,350 L 660,175')", offsetRotate: '0deg' }}
                         animate={{ offsetDistance: ['0%','100%'] }}
                         transition={{ duration: 7, ease: 'linear', repeat: Infinity }}
                       >
                         <circle r="14" fill="rgba(34,197,94,0.15)" />
                         <circle r="7" fill="#22c55e" style={{ filter: 'drop-shadow(0 0 8px #22c55e)' }} />
                       </motion.g>
                       {/* Turn-point rings at road intersections */}
                       {[[490,440],[490,350],[660,350]].map(([x,y],i)=>(
                         <motion.circle key={i} cx={x} cy={y} r="5" fill="none" stroke="rgba(34,197,94,0.7)" strokeWidth="1.5"
                           animate={{ r:[5,8,5], opacity:[0.5,1,0.5] }} transition={{ repeat:Infinity, duration:2, delay:i*0.6 }}
                         />
                       ))}
                       {/* Pickup — same as unsafe scene */}
                       <g transform="translate(170,440)">
                         <circle r="7" fill="#fff" />
                         <circle r="13" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                         <text x="14" y="5" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">PICKUP</text>
                       </g>
                       {/* Destination — same coords as unsafe scene */}
                       <g transform="translate(660,175)">
                         <circle r="7" fill="#22c55e" style={{ filter:'drop-shadow(0 0 6px #22c55e)' }} />
                         <circle r="13" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
                         <text x="14" y="5" fill="rgba(34,197,94,0.75)" fontSize="9" fontFamily="monospace">DEST</text>
                       </g>
                    </svg>
                    {/* HUD top-left */}
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                       <BsShieldCheck className="text-green-400 text-sm animate-pulse" />
                       <span className="text-[8px] font-mono font-bold text-green-400 tracking-[0.2em] uppercase">Secure Path Active</span>
                    </div>
                    {/* Legend */}
                    <div className="absolute bottom-4 left-5 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2"><div className="w-6 h-[2px]" style={{background:'#22c55e', boxShadow:'0 0 6px #22c55e'}} /><span className="text-[8px] font-mono text-green-400/70 tracking-widest">SAARTHI ROUTE</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/60" /><span className="text-[8px] font-mono text-green-400/60 tracking-widest">WELL-LIT ZONE</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background:'rgba(59,130,246,0.3)',border:'1px solid rgba(59,130,246,0.5)'}} /><span className="text-[8px] font-mono text-blue-400/60 tracking-widest">CIVIC ZONE</span></div>
                    </div>
                    {/* Status bar */}
                    <div className="absolute bottom-4 right-5 text-right">
                      <p className="text-[8px] font-mono text-green-500/60 tracking-widest">ETA: 12 MIN</p>
                      <p className="text-[8px] font-mono text-green-500/40 tracking-widest">SAFETY_IDX: 0.98</p>
                    </div>
                 </div>

                 <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} className="px-8 py-4 border border-white/10 bg-white/[0.02] backdrop-blur-3xl rounded-full flex items-center gap-8">
                    <div className="flex items-center gap-4 border-r border-white/10 pr-8">
                       <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black text-xl">
                          <BsTaxiFront />
                       </div>
                       <div>
                          <p className="text-sm font-bold tracking-widest text-white/90">Rajesh Kumar</p>
                          <p className="text-[8px] uppercase tracking-widest text-amber-500 font-bold">Verified Captain</p>
                       </div>
                    </div>
                    <div className="text-center">
                       <p className="text-[7px] uppercase tracking-[0.4em] text-white/30">Journey Status</p>
                       <p className="text-[10px] font-mono text-green-500 uppercase">En_Route_Secure</p>
                    </div>
                 </motion.div>
              </div>
            )}

            {/* SCENE 7: ARRIVAL */}
            {phase === 'arrival' && (
              <div className="text-center space-y-10">
                 <div className="w-32 h-32 border-2 border-green-500 rounded-full mx-auto flex items-center justify-center text-green-500 text-5xl shadow-[0_0_80px_rgba(34,197,94,0.2)]">
                    <BsShieldCheck />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white uppercase leading-none">Safe Arrival.</h2>
                    <p className="text-lg md:text-xl font-light tracking-[0.6em] text-white/20 italic">"Journey Secured."</p>
                 </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FINAL REVEAL & DETAILS SECTION --- */}
      {phase === 'details' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={TRANSITION} className="w-full flex flex-col items-center">
          <div className="h-screen w-full flex flex-col items-center justify-center relative bg-[#020202]">
            <div className="text-center relative z-10 px-6">
              <motion.h1 
                initial={{ opacity: 0, letterSpacing: '1.5em', filter: 'blur(20px)' }}
                animate={{ opacity: 1, letterSpacing: '0.4em', filter: 'blur(0px)' }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-7xl md:text-[10rem] font-bold movie-title text-amber-500 leading-none mb-8"
              >
                SAARTHI
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.2 }}
                className="text-lg md:text-2xl font-light tracking-[0.6em] uppercase text-white/20"
              >
                Not just a Ride.
              </motion.p>
            </div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
              <span className="text-[9px] tracking-[1em] text-white/20 uppercase">Scroll to Explore</span>
              <div className="w-[1px] h-20 bg-gradient-to-b from-amber-500/60 to-transparent" />
            </motion.div>
          </div>

          <section className="w-full max-w-7xl px-8 py-40 space-y-40 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-10">
                <div className="inline-block px-4 py-1 border border-red-500/30 bg-red-500/5 rounded-full">
                  <span className="text-sm uppercase tracking-[0.5em] text-red-500 font-bold">The Problem</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-[1.1]">Shortest isn't safest.</h2>
                <p className="text-white/40 leading-relaxed font-mono text-xs uppercase tracking-widest">Traditional cab apps optimize for speed and cost, often ignoring the safety profile of the streets you travel. For many, nighttime travel remains an exercise in anxiety rather than a simple transit.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-10">
                <div className="inline-block px-4 py-1 border border-amber-500/30 bg-amber-500/5 rounded-full">
                  <span className="text-sm uppercase tracking-[0.5em] text-amber-500 font-bold">The Solution</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-[1.1]">The Intelligence.</h2>
                <p className="text-white/40 leading-relaxed font-mono text-xs uppercase tracking-widest">Saarthi analyzes real-time street illumination, historical safety scores, and user intent to provide routes that prioritize security. It's an intelligent companion that understands your need for peace of mind.</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "SAFETY ANALYTICS", desc: "Proprietary algorithms that calculate route safety scores based on lighting and local data.", icon: "🛡️" },
                { title: "PROMPT BOOKING", desc: "Book rides using natural language prompts—no more fumbling with complex menus.", icon: "💬" },
                { title: "INTELLIGENT ROUTE", desc: "Enhanced protocols designed specifically to ensure the safety and comfort of female passengers.", icon: "🤖" }
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

            <div className="flex flex-col items-center gap-16 pt-10">
              <div className="text-center space-y-6">
                <h4 className="text-[9px] uppercase tracking-[1em] text-white/20">The Intelligent Stack</h4>
                <p className="text-xl md:text-3xl font-light tracking-[0.4em] text-amber-500">MERN ∙ Python ∙ Google Maps ∙ Agentic AI</p>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                <button 
                  onClick={() => {
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 3000);
                  }}
                  className="px-12 py-4 bg-white text-black hover:bg-amber-500 font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 rounded-sm"
                >
                  Launch Saarthi
                </button>
                <a href="https://github.com/Meharsh7804/SAARTHI" className="px-12 py-4 border border-white/10 text-white hover:border-amber-500 hover:bg-white/5 font-bold uppercase tracking-[0.4em] text-[10px] transition-all duration-500 rounded-sm flex items-center gap-3">
                  <BsGithub className="text-lg" /> View Code
                </a>
              </div>
              <Link href="/" className="text-[9px] uppercase tracking-[1.5em] text-white/20 hover:text-white transition-all flex items-center gap-8 group">
                <motion.span animate={{ x: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 2 }} className="text-2xl">←</motion.span> 
                BACK TO SHOWCASE
              </Link>
            </div>
          </section>
        </motion.div>
      )}

      {/* Global Background Depth */}
      {/* Global Background Depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.02)_0%,transparent_80%)]" />
      </div>

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
