'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsGithub, BsLinkedin, BsInstagram } from 'react-icons/bs';
import { useChaos } from '@/context/ChaosContext';

export default function Contact() {
  const { isChaos } = useChaos();
  const [isExpanded, setIsExpanded] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [formState, setFormState] = useState<'idle' | 'transmitting' | 'success'>('idle');
  const [isInactive, setIsInactive] = useState(false);

  // Inactivity Timer for "Still here?" moment
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const resetTimer = () => {
      setIsInactive(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsInactive(true), 10000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState !== 'idle') return;
    
    setFormState('transmitting');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/meenqylq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState('success');
      } else {
        throw new Error('Failed to transmit');
      }
    } catch (error) {
      console.error(error);
      setFormState('idle');
      alert("Transmission failed. Please try again.");
    }
  };

  // Background glow intensity based on typing length (subtle effect)
  const glowIntensity = Math.min(typingText.length * 2, 150);

  return (
    <section 
      id="contact" 
      className="min-h-screen bg-[#020202] relative flex flex-col items-center justify-center py-32 px-4 overflow-hidden"
    >
      {/* Background Reaction to typing */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(245,158,11,${glowIntensity / 1000}) 0%, transparent 70%)`
        }}
      />
      
      {/* Subtle Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] pointer-events-none mix-blend-overlay" />

      <div className="max-w-2xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Cinematic Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 block mb-4 font-mono">
            {isChaos ? 'Fatal Exception' : 'End of Transmission'}
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest uppercase">
            {isChaos ? 'No ' : 'Before You '}<span className="text-amber-500 font-bold">{isChaos ? 'Escape...' : 'Go...'}</span>
          </h2>
        </motion.div>

        {/* Interactive Form */}
        <div className="w-full relative z-20">
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center py-16 border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-xl shadow-[0_0_50px_rgba(245,158,11,0.05)]"
              >
                <h3 className="text-2xl md:text-3xl text-amber-500 tracking-[0.3em] uppercase font-light mb-4">Message Received.</h3>
                <p className="text-white/40 tracking-widest uppercase text-xs md:text-sm font-mono">See you in the next build.</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className={`relative mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'max-w-xl' : 'max-w-md'}`}
              >
                <div 
                  onClick={() => !isExpanded && setIsExpanded(true)}
                  className={`border bg-black/40 backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-500 ${isExpanded ? 'p-8 md:p-10 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)]' : 'p-4 md:p-5 border-white/10 cursor-text hover:border-white/30 hover:bg-white/[0.05]'}`}
                >
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="space-y-6 mb-8"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="relative">
                            <input 
                              type="text" 
                              name="name"
                              required
                              placeholder="NAME" 
                              className="w-full bg-transparent border-b border-white/10 pb-2 text-white text-xs md:text-sm tracking-widest placeholder-white/20 focus:border-amber-500 focus:outline-none transition-colors"
                            />
                          </div>
                          <div className="relative">
                            <input 
                              type="email" 
                              name="email"
                              required
                              placeholder="EMAIL" 
                              className="w-full bg-transparent border-b border-white/10 pb-2 text-white text-xs md:text-sm tracking-widest placeholder-white/20 focus:border-amber-500 focus:outline-none transition-colors"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <textarea
                    name="message"
                    value={typingText}
                    onChange={(e) => {
                      setTypingText(e.target.value);
                      if (!isExpanded && e.target.value.length > 0) setIsExpanded(true);
                    }}
                    onFocus={() => !isExpanded && setIsExpanded(true)}
                    placeholder={isExpanded ? "YOUR MESSAGE..." : "SAY SOMETHING..."}
                    rows={isExpanded ? 4 : 1}
                    className={`w-full bg-transparent text-white tracking-widest focus:outline-none transition-all resize-none placeholder-white/40 ${isExpanded ? 'text-xs md:text-sm leading-relaxed' : 'text-center text-xs md:text-sm'}`}
                    style={{ minHeight: isExpanded ? '100px' : '24px' }}
                  />

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.1 }}
                        className="mt-8 flex justify-end"
                      >
                        <button 
                          disabled={formState === 'transmitting' || typingText.length === 0}
                          className={`group relative overflow-hidden px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-[10px] md:text-xs rounded-sm transition-all ${formState === 'transmitting' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-500 hover:text-black hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-105'}`}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {formState === 'transmitting' ? (
                              <>
                                Transmitting <span className="flex gap-1"><span className="animate-bounce">.</span><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span></span>
                              </>
                            ) : (
                              'Send Transmission'
                            )}
                          </span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Witty Personal Microcopy */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          viewport={{ once: true }}
          className="mt-24 space-y-3 text-center"
        >
          <p className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono">
            Built with obsession and a questionable sleep schedule.
          </p>
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-mono italic">
            Some bugs were features. Some still are.
          </p>
        </motion.div>

        {/* Orbiting / Floating Social Links */}
        <div className="flex gap-8 mt-16 relative z-10">
          {[
            { Icon: BsGithub, href: 'https://github.com/Meharsh7804' },
            { Icon: BsLinkedin, href: 'https://www.linkedin.com/in/meharsh-chandure/' },
            { Icon: BsInstagram, href: 'https://www.instagram.com/_meharssh/' }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.2, y: -5, transition: { duration: 0.2 } }}
              className="text-white/40 hover:text-amber-500 transition-colors drop-shadow-[0_0_15px_rgba(245,158,11,0)] hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]"
            >
              <social.Icon className="text-2xl md:text-3xl" />
            </motion.a>
          ))}
        </div>

        {/* Final Signature */}
        <motion.div 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 1, duration: 2 }}
          viewport={{ once: true }}
          className="mt-32 opacity-60 hover:opacity-100 transition-opacity duration-700 cursor-default"
        >
          <span className="font-serif italic text-4xl md:text-6xl text-white font-light tracking-wider drop-shadow-2xl">
            — Meharsh
          </span>
        </motion.div>

      </div>

      {/* Exit Moment (Inactivity Trigger) */}
      <AnimatePresence>
        {isInactive && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none z-50 mix-blend-difference"
          >
            <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.4em] font-mono">Still here?</p>
            <p className="text-amber-500 text-xs md:text-sm uppercase tracking-[0.3em] mt-2 font-light drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">Maybe we should build something together.</p>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
