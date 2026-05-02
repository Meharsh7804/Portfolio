'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BsGithub } from 'react-icons/bs';

const CHAT_MESSAGES = [
  { id: 1, text: "Bhai notes bhej na please, kal exam hai 😭", sender: "Aman", time: "11:02 PM", side: 'left' },
  { id: 2, text: "Bhai pls urgent", sender: "Rohit", time: "11:02 PM", side: 'left' },
  { id: 3, text: "Kal exam hai kya?", sender: "Sanket", time: "11:03 PM", side: 'left' },
  { id: 4, text: "PDF hai kya? ya kisi ne drive link banaya hai?", sender: "Unknown", time: "11:03 PM", side: 'left' },
  { id: 5, text: "Send fast", sender: "Tanmay", time: "11:04 PM", side: 'left' },
  { id: 6, text: "Bhai Unit 3 missing hai mere notes me 💀 pura blank hai", sender: "Group", time: "11:05 PM", side: 'left' },
  { id: 7, text: "Notes please!! kal ka paper bachana hai 🙏", sender: "Sneha", time: "11:05 PM", side: 'left' },
  { id: 8, text: "Help me out bhai kuch bhi bhej de jo hai", sender: "Yash", time: "11:06 PM", side: 'left' },
  { id: 9, text: "Practical viva me kya puchte hai generally?", sender: "Rahul", time: "11:06 PM", side: 'left' },
  { id: 10, text: "Check mail pls maine kuch bheja hai dekh ke bata", sender: "Meera", time: "11:07 PM", side: 'left' },
  { id: 11, text: "Link expired ho gaya kya? open nahi ho raha", sender: "Abhi", time: "11:07 PM", side: 'left' },
  { id: 12, text: "Pls bhej do notes koi bhi version chalega 😭", sender: "Isha", time: "11:08 PM", side: 'left' },
  { id: 13, text: "Is it tomorrow ya postpone hua hai? koi confirm karo yaar", sender: "Kunal", time: "11:08 PM", side: 'left' },
  { id: 14, text: "Notes group ka link hai kya kisi ke paas?", sender: "Siddhesh", time: "11:09 PM", side: 'left' },
  { id: 15, text: "Urgent help!! kuch important topics bata do bas", sender: "Priya", time: "11:10 PM", side: 'left' }, 
  { id: 16, text: "Syllabus change hua hai kya ya wahi purana hai?", sender: "Om", time: "11:10 PM", side: 'left' },
  { id: 17, text: "Bhai notes!! kuch bhi chalega bas pass kara de 🙏", sender: "Varun", time: "11:11 PM", side: 'left' },
  { id: 18, text: "Unit 5 pdf hai kya ya skip kar du usko? 😭", sender: "Aayush", time: "11:11 PM", side: 'left' },
  { id: 19, text: "Wait for me main bhi padh raha hu abhi ruk jao thoda", sender: "Riya", time: "11:12 PM", side: 'left' },
  { id: 20, text: "Send fast bro warna aaj fail pakka hai 💀", sender: "Tushar", time: "11:12 PM", side: 'left' },
];

export default function PadhleProject() {
  const [phase, setPhase] = useState<'chat' | 'chaos' | 'pause' | 'idea' | 'build' | 'reveal' | 'details'>('chat');
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const skippedRef = useRef(false);

  const skipStory = () => {
    skippedRef.current = true;
    setPhase('details');
  };

  // Story Sequencing
  useEffect(() => {
    let timer = 1000;
    
    // 1. Initial calm messages
    CHAT_MESSAGES.slice(0, 4).forEach((msg, i) => {
      setTimeout(() => {
        if (skippedRef.current) return;
        setVisibleMessages(prev => [...prev, msg.id]);
      }, timer);
      timer += 800;
    });

    // 2. Chaos phase (Total Flood)
    setTimeout(() => {
      if (skippedRef.current) return;
      setPhase('chaos');
      CHAT_MESSAGES.slice(4).forEach((msg, i) => {
        setTimeout(() => {
          if (skippedRef.current) return;
          setVisibleMessages(prev => [...prev, msg.id]);
        }, i * 150);
      });
    }, timer + 400);

    // 3. Transitions
    setTimeout(() => { if (!skippedRef.current) setPhase('pause'); }, timer + 4500);
    setTimeout(() => { if (!skippedRef.current) setPhase('idea'); }, timer + 9500); 
    setTimeout(() => { if (!skippedRef.current) setPhase('build'); }, timer + 15500);
    setTimeout(() => { if (!skippedRef.current) setPhase('reveal'); }, timer + 18000);
    setTimeout(() => { if (!skippedRef.current) setPhase('details'); }, timer + 20000);

  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 overflow-hidden relative">
      
      {/* Skip Story Button */}
      {phase !== 'details' && phase !== 'reveal' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={skipStory}
          className="fixed bottom-8 right-8 z-[60] px-6 py-2.5 border border-white/10 bg-white/[0.03] backdrop-blur-md text-[9px] uppercase tracking-[0.5em] text-white/30 hover:text-white hover:border-white/30 transition-all duration-500 rounded-full"
        >
          Skip Story →
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        
        {/* --- PHASE 1 & 2: CHAT & CHAOS --- */}
        {(phase === 'chat' || phase === 'chaos') && (
          <motion.div 
            key="chat-phase"
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(30px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-[#0b141a]"
          >
            {/* The Central Mobile Container */}
            <motion.div 
              animate={phase === 'chaos' ? { 
                x: [-1, 1, -1, 1, 0], 
                y: [-0.5, 0.5, -0.5, 0.5, 0],
                scale: 1.05 
              } : { scale: 1 }}
              transition={phase === 'chaos' ? { 
                x: { repeat: Infinity, duration: 0.2 }, 
                y: { repeat: Infinity, duration: 0.15 },
                scale: { duration: 0.8 }
              } : { duration: 0.8 }}
              className="w-full max-w-[350px] h-[85vh] border border-white/10 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative z-40 border-[8px] border-[#1f2c34]"
              style={{ 
                backgroundImage: 'url(https://wallpaperaccess.com/full/3411242.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundClip: 'padding-box'
              }}
            >
              {/* WhatsApp Header */}
              <div className="pt-4 pb-4 px-6 bg-[#030303] flex items-center gap-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black font-bold">M</div>
                <div className="flex-1">
                  <p className="font-bold text-sm tracking-tight text-white/90">Meharsh</p>
                  <p className="text-[10px] text-green-500 animate-pulse font-medium">online</p>
                </div>
                <div className="flex gap-5 items-center">
                  <Image src="/assets/video.png" alt="Video Call" width={18} height={18} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
                  <Image src="/assets/call.png" alt="Call" width={16} height={16} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
                  <span className="text-lg text-white/40 ml-1 cursor-pointer">⋮</span>
                </div>
              </div>

              {/* Chat Content (Internal) */}
              <div className="flex-1 p-4 space-y-3 overflow-y-hidden relative bg-transparent">
                 {/* Internal messages only show up to a point */}
                 {CHAT_MESSAGES.slice(0, 8).map((msg) => (
                    <AnimatePresence key={msg.id}>
                      {visibleMessages.includes(msg.id) && (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                          className="w-fit max-w-[80%] px-3 py-1.5 rounded-xl rounded-tl-none bg-[#1f2c34] text-white/90 shadow-sm leading-snug"
                        >
                          <p className="font-bold text-[11px] text-[#25D366]/80 mb-0.5">{msg.sender}</p>
                          <div className="text-[13px] text-white/90">{msg.text}</div>
                          <div className="mt-0.5 flex justify-end">
                             <span className="text-[8px] text-white/30">{msg.time}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 ))}
              </div>

              {/* Fake Input Area */}
              <div className="p-4 flex bg-transparent items-center gap-2">
                <div className="flex-1 h-10 bg-white/10 backdrop-blur-md border border-white/5 rounded-full px-4 flex items-center text-white/30 text-[15px]">
                  Type a message...
                </div>
                <div className="bg-[#25D366] rounded-full h-10 w-10 flex items-center justify-center shadow-lg">
                  <Image src="/assets/mic.png" alt="mic" width={18} height={18} className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
              </div>
            </motion.div>
            
            {/* --- THE EXTERNAL FLOOD CHAOS --- */}
            {phase === 'chaos' && (
              <>
                {/* Background Rain of Messages */}
                <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
                  {[...Array(40)].map((_, i) => (
                    <motion.div
                      key={`rain-${i}`}
                      initial={{ y: -200, x: Math.random() * 2000 - 1000, opacity: 0 }}
                      animate={{ 
                        y: 1400, 
                        opacity: [0, 0.8, 0] 
                      }}
                      transition={{ 
                        duration: 2 + Math.random() * 3, 
                        repeat: Infinity, 
                        delay: Math.random() * 2, // Quick staggered start
                        ease: "linear"
                      }}
                      className="absolute p-4 bg-white/[0.05] border border-white/10 rounded-xl blur-[1.5px] min-w-[150px]"
                    >
                      <div className="h-2 w-12 bg-white/10 rounded-full mb-2" />
                      <div className="h-1.5 w-full bg-white/5 rounded-full" />
                    </motion.div>
                  ))}
                </div>

                {/* Primary Flood Messages */}
                <div className="absolute inset-0 pointer-events-none z-50">
                  {CHAT_MESSAGES.slice(4).map((msg, i) => (
                    <AnimatePresence key={`flood-${msg.id}`}>
                      {visibleMessages.includes(msg.id) && (
                        <motion.div 
                          initial={{ 
                            opacity: 0, 
                            scale: 0.5,
                            x: (Math.random() - 0.5) * 100,
                            y: (Math.random() - 0.5) * 100
                          }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            x: (Math.random() - 0.5) * 1400,
                            y: (Math.random() - 0.5) * 900,
                            rotate: (Math.random() - 0.5) * 20
                          }}
                          transition={{ 
                            type: 'spring', 
                            damping: 20, 
                            stiffness: 80,
                            mass: 0.5
                          }}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1f2c34] border border-white/10 rounded-xl rounded-tl-none shadow-xl min-w-[120px] max-w-[220px]"
                        >
                          <p className="font-bold text-[10px] text-[#25D366] mb-0.5 uppercase tracking-widest">{msg.sender}</p>
                          <p className="text-[12px] text-white/90 leading-snug">{msg.text}</p>
                          <div className="mt-1 flex justify-end">
                             <span className="text-[8px] text-white/20">{msg.time}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* --- PHASE 3: PAUSE MOMENT --- */}
        {phase === 'pause' && (
          <motion.div 
            key="pause-phase"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black"
          >
            <motion.p 
              className="text-2xl md:text-4xl font-light tracking-[0.4em] text-white/40 italic text-center px-8"
            >
              {'"There has to be a better way."'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 1 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        )}

        {/* --- PHASE 4: IDEA TRANSITION --- */}
        {phase === 'idea' && (
          <motion.div 
            key="idea-phase"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-[#050505]"
          >
            <div className="text-4xl md:text-3xl font-bold tracking-widest movie-title text-center px-4 leading-tight">
              <div className="block text-amber-500">
                {'What if ..'.split('').map((char, i) => (
                  <motion.span
                    key={`what-if-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.1 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="block text-white/90">
                {'notes were always available?'.split('').map((char, i) => (
                  <motion.span
                    key={`notes-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 + i * 0.08, duration: 0.1 }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                    {i === 10 && <br className="md:hidden" />}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PHASE 5+: BUILD & DETAILS --- */}
        {(phase === 'build' || phase === 'reveal' || phase === 'details') && (
           <motion.div 
             key="final-reveal"
             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
             className="w-full flex flex-col items-center"
           >
              {/* Build Animation */}
              {phase === 'build' && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#050505]">
                  <div className="relative w-full max-w-5xl h-[600px]">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ 
                          opacity: 0, 
                          x: (Math.random() - 0.5) * 1500, 
                          y: (Math.random() - 0.5) * 1500, 
                          rotate: (Math.random() - 0.5) * 180 
                        }}
                        animate={{ x: 0, y: 0, rotate: 0, opacity: 0.05 }}
                        transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                        className="absolute inset-0 border border-white/20 rounded-xl bg-white/[0.01]"
                        style={{ scale: 1.2 - i * 0.08 }}
                      />
                    ))}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1, duration: 3 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                    >
                      <p className="text-[10px] tracking-[1.5em] uppercase text-amber-500/40 animate-pulse">Reconstructing_Academic_Flow</p>
                      <div className="w-48 h-[1px] bg-white/10 overflow-hidden">
                         <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1/2 h-full bg-amber-500/50" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Main Reveal */}
              {(phase === 'reveal' || phase === 'details') && (
                <div className="w-full flex flex-col items-center">
                   <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-[#050505]">
                      <motion.div 
                        className="text-center"
                      >
                        <motion.h1 
                          initial={{ opacity: 0, letterSpacing: '1.5em', filter: 'blur(10px)' }}
                          animate={{ opacity: 1, letterSpacing: '0.4em', filter: 'blur(0px)' }}
                          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                          className="text-7xl md:text-[10rem] font-bold movie-title text-amber-500 leading-none mb-8"
                        >
                          PADHLE
                        </motion.h1>
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.5, duration: 1.2 }}
                          className="text-lg md:text-2xl font-light tracking-[0.6em] uppercase text-white/20"
                        >
                          Notes. Anytime. Anywhere.
                        </motion.p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
                      >
                        <span className="text-[10px] tracking-[0.8em] uppercase text-white/20">The Solution Unveiled</span>
                        <div className="w-[1px] h-20 bg-gradient-to-b from-amber-500 to-transparent" />
                      </motion.div>
                   </div>

                   {/* Project Details */}
                   <section id="project-info" className="w-full max-w-7xl px-8 py-40 space-y-40 relative z-10">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                        <motion.div 
                          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                          className="space-y-10"
                        >
                          <div className="inline-block px-4 py-1 border border-red-500/30 bg-red-500/5 rounded-full">
                            <span className="text-sm uppercase tracking-[0.5em] text-red-500 font-bold">The Problem</span>
                          </div>
                          <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-[1.1]">
                            The night before every exam.
                          </h2>
                          <p className="text-white/40 leading-relaxed font-mono text-xs uppercase tracking-widest">
                            Panic kicks in. WhatsApp groups flood with messages. Everyone’s asking for the same notes, the same PDFs, the same answers. Students spend more time searching than studying, jumping between chats, broken links, and half-complete notes, hoping to find something useful before it’s too late.
                          </p>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                          className="space-y-10"
                        >
                          <div className="inline-block px-4 py-1 border border-amber-500/30 bg-amber-500/5 rounded-full">
                            <span className="text-sm uppercase tracking-[0.5em] text-amber-500 font-bold">The Solution</span>
                          </div>
                          <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-[1.1]">
                            Everything you need. One place. Instantly.
                          </h2>
                          <p className="text-white/40 leading-relaxed font-mono text-xs uppercase tracking-widest">
                            I built Padhle to be more than just a site; it’s a permanent home for our academics. I wanted a seamless interface where every semester’s notes are sorted and verified, finally moving us away from the chaos of hunting through group chats. And this is just the beginning, there’s a lot more packed into this. Take a look around and explore for yourself.
                          </p>
                        </motion.div>
                      </div>

                      {/* Feature Showcase */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                          { title: "ZERO FRICTION", desc: "Access the entire library in under 5 seconds. No logins, no hurdles.", icon: "⚡" },
                          { title: "OFFLINE SYNC", desc: "Download high-compression PDFs designed for quick offline access.", icon: "📥" },
                          { title: "CURATED FLOW", desc: "A navigation system built specifically for the chaos of exam nights.", icon: "📂" }
                        ].map((feat, i) => (
                          <motion.div 
                            key={feat.title}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                            className="p-12 border border-white/5 bg-white/[0.01] backdrop-blur-3xl hover:border-amber-500/20 transition-all rounded-sm group"
                          >
                            <div className="relative mb-12 flex items-center justify-start group">
                              {/* The Aura - Hidden by default, pulses on hover */}
                              <motion.div 
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [0.1, 0.3, 0.1],
                                }}
                                transition={{ 
                                  repeat: Infinity, 
                                  duration: 2,
                                  ease: "easeInOut"
                                }}
                                className="absolute -inset-4 bg-amber-500/40 rounded-full blur-3xl pointer-events-none"
                              />
                              
                              {/* The Icon - Stationary with enhanced internal glow */}
                              <motion.div 
                                className="text-6xl relative z-10 transition-all duration-700 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(245,158,11,1)]"
                              >
                                {feat.icon}
                              </motion.div>
                            </div>
                            <h3 className="text-sm font-bold tracking-[0.4em] uppercase mb-6 text-white/80">{feat.title}</h3>
                            <p className="text-[11px] leading-loose text-white/30 uppercase tracking-widest">{feat.desc}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Evolutionary Actions */}
                      <div className="flex flex-col items-center gap-24 pt-20 w-full">
                        <div className="text-center space-y-4">
                          <h4 className="text-[10px] uppercase tracking-[1em] text-white/20">The Evolution of Padhle</h4>
                          <p className="text-3xl tracking-[0.4em] text-amber-500 font-bold uppercase">Choose Your Interface</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-4">
                          {/* Padhle 1.0 - The OG */}
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="p-10 border border-white/5 bg-white/[0.01] backdrop-blur-3xl rounded-sm flex flex-col items-center gap-8 group hover:border-white/20 transition-all duration-700"
                          >
                            <div className="text-center">
                              <h5 className="text-[10px] uppercase tracking-[0.6em] text-white/40 mb-2">Padhle 1.0</h5>
                              <p className="text-xl tracking-widest text-white/80 font-light">THE OG CLASSIC</p>
                            </div>
                            <div className="flex flex-col w-full gap-4">
                              <a href="https://meharsh7804.github.io/Padhle/" className="w-full py-5 text-center border border-white/10 text-white hover:bg-white hover:text-black font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500">
                                Launch Classic
                              </a>
                              <a href="https://github.com/Meharsh7804/Padhle" className="w-full py-5 text-center border border-white/5 text-white/40 hover:text-white font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 flex items-center justify-center gap-3">
                                <BsGithub className="text-sm" /> View Code
                              </a>
                            </div>
                          </motion.div>

                          {/* Padhle 2.0 - Animated */}
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="p-10 border border-amber-500/10 bg-amber-500/[0.02] backdrop-blur-3xl rounded-sm flex flex-col items-center gap-8 group hover:border-amber-500/30 transition-all duration-700 relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 p-2 bg-amber-500 text-black text-[8px] font-bold tracking-widest uppercase">Latest</div>
                            <div className="text-center">
                              <h5 className="text-[10px] uppercase tracking-[0.6em] text-amber-500/60 mb-2">Padhle 2.0</h5>
                              <p className="text-xl tracking-widest text-white/90 font-bold">ANIMATED ENGINE</p>
                            </div>
                            <div className="flex flex-col w-full gap-4">
                              <a href="https://meharsh7804.github.io/Padhle2_0/" target="_blank" className="w-full py-5 text-center bg-amber-500 text-black hover:bg-white font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                                Launch Interface
                              </a>
                              <a href="https://github.com/Meharsh7804/Padhle2_0" className="w-full py-5 text-center border border-white/10 text-white/80 hover:border-amber-500 hover:bg-white/5 font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-500 flex items-center justify-center gap-3">
                                <BsGithub className="text-sm" /> View Code
                              </a>
                            </div>
                          </motion.div>
                        </div>

                        <Link href="/" className="text-[10px] uppercase tracking-[0.8em] text-white/20 hover:text-white transition-all flex items-center gap-4 py-20">
                          <span className="text-lg">←</span> BACK TO SHOWCASE
                        </Link>
                      </div>
                   </section>
                </div>
              )}
           </motion.div>
        )}

      </AnimatePresence>

      {/* Background Decorative Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.01)_0%,transparent_80%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

    </div>
  );
}
