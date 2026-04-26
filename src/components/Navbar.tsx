'use client'; 
import { useEffect, useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { useChaos } from '@/context/ChaosContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [ 
  { label: 'HOME', href: '/' },
  { label: 'ORIGINS', href: '/#about' }, 
  { label: 'THE REEL', href: '/#projects' }, 
  { label: 'RESUME', href: '/resume' },
  { label: 'FINALE', href: '/contact' }, 
]; 

export default function Navbar() { 
  const { isChaos } = useChaos();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);
  
  return (
    <nav className="fixed top-10 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className={`flex items-center justify-between transition-all duration-500 pointer-events-auto ${scrolled || isOpen
          ? 'w-full max-w-5xl py-5 px-8 md:px-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.8)] mx-4' 
          : 'w-full max-w-7xl py-6 px-6 md:px-4 bg-transparent border-transparent'
        }`}
      >
        {/* Logo */}
        <Link href="/" onClick={() => setIsOpen(false)} className="group flex items-center gap-4 z-50">
          <div className="w-7 h-7 rounded-full border border-amber-500/50 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
          </div>
          <span className="movie-title text-lg tracking-[0.2em] text-white group-hover:text-amber-500 transition-colors">
            {isChaos ? 'ERROR 404' : 'MEHARSH'}
          </span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.label}
                href={link.href}
                className={`text-[10px] font-bold tracking-[0.3em] transition-all duration-300 relative group ${
                  isActive ? 'text-amber-500' : 'text-white/70 hover:text-white'
                }`}
              >
                {isChaos ? (link.label === 'ORIGINS' ? 'NULL' : link.label === 'THE REEL' ? 'VOID' : 'TERMINATE') : link.label}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-amber-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}
        </div>
        
        {/* Status / Call to Action */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="h-4 w-px bg-white/10" />
          <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold animate-pulse">
            {isChaos ? 'SYSTEM CORRUPTED' : 'AVAILABLE FOR WORK'}
          </span>
        </div>
        
        {/* Mobile Menu Icon */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 z-50 relative p-2"
        >
          <motion.div 
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-6 h-[1px] bg-white" 
          />
          <motion.div 
            animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
            className="w-4 h-[1px] bg-white" 
          />
          <motion.div 
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-6 h-[1px] bg-white" 
          />
        </button>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-40 md:hidden flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center gap-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="movie-title text-4xl text-white hover:text-amber-500 transition-colors tracking-widest"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="absolute bottom-20 flex flex-col items-center gap-4">
                <div className="h-8 w-[1px] bg-amber-500/50" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-amber-500 font-bold animate-pulse">
                  {isChaos ? 'SYSTEM_OVERRIDE' : 'CONNECT_NOW'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}