'use client';

import { useChaos } from '@/context/ChaosContext';

export default function Footer() {
  const { isChaos } = useChaos();
  return (
    <footer className="py-20 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="text-center md:text-left">
            <p className="movie-title text-2xl text-white tracking-[0.2em]">{isChaos ? 'SYSTEM OVERRIDE' : 'MEHARSH'}</p>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 mt-2">{isChaos ? '© 2026 / Destroyed & Rebuilt' : '© 2026 / Directed & Developed'}</p>
          </div>

          <div className="flex gap-8">
            <a href="https://www.instagram.com/_meharssh/" className="text-[9px] font-bold tracking-[0.3em] text-white/30 hover:text-amber-500 transition-colors uppercase">Instagram</a>
            <a href="https://www.linkedin.com/in/meharsh-chandure/" className="text-[9px] font-bold tracking-[0.3em] text-white/30 hover:text-amber-500 transition-colors uppercase">LinkedIn</a>
            <a href="https://github.com/Meharsh7804" className="text-[9px] font-bold tracking-[0.3em] text-white/30 hover:text-amber-500 transition-colors uppercase">GitHub</a>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-[9px] font-bold tracking-[0.3em] text-white/20 uppercase">{isChaos ? 'Corruption Stack' : 'Production Stack'}</p>
            <p className="text-[9px] font-bold tracking-[0.3em] text-white/60 uppercase">{isChaos ? 'Glitch / Distortion / Chaos' : 'React / Framer Motion / Cinematic CSS'}</p>
          </div>

        </div>
      </div>

      {/* Decorative Film Edge */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_20px,rgba(255,255,255,0.05)_20px,rgba(255,255,255,0.05)_40px)]" />
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_20px,rgba(255,255,255,0.05)_20px,rgba(255,255,255,0.05)_40px)]" />
    </footer>
  );
}

