'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BsGithub, BsBoxArrowUpRight, BsX } from 'react-icons/bs';
import { useChaos } from '@/context/ChaosContext';

const projects = [
  {
    id: 'padhle',
    title: 'PADHLE',
    subtitle: 'Academic Repository',
    category: 'Ed-Tech / Web',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
    description: 'A centralized note-sharing platform for college students, designed to eliminate the chaos of group chats and dead links.',
    microcopy: "The struggle was real. The solution was simple.",
    tech: ['React', 'Firebase', 'Next.js', 'Tailwind'],
    color: 'from-orange-500 to-amber-600',
    slug: '/projects/padhle'
  },
  {
    id: 'saarthi',
    title: 'SAARTHI AI',
    subtitle: 'A Digital Companion',
    category: 'Agentic AI / NLP',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    description: 'Directed a system that understands human intent better than most humans do. By leveraging deep NLP and agentic workflows, it acts as a true digital companion rather than just a chatbot.',
    microcopy: "Built this at 2AM. Worth it.",
    tech: ['Python', 'NLP', 'React', 'FastAPI'],
    color: 'from-amber-500 to-red-600',
    slug: '/projects/saarthi'
  },
  {
    id: 'deskmate',
    title: 'DESKMATE',
    subtitle: 'Automated Academic Assistant',
    category: 'AI / Automation',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    description: 'A Streamlit-based intelligence node designed to automate the repetitive queries of college life, from teacher availability to room locations.',
    microcopy: "Because repetitive questions are the enemy of productivity.",
    tech: ['Streamlit', 'Python', 'NLP'],
    color: 'from-amber-600 to-yellow-500',
    slug: '/projects/deskmate'
  },
  {
    id: 'quickride',
    title: 'QUICKRIDE',
    subtitle: 'The Urban Narrative',
    category: 'Logistics / UX',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
    description: 'A story of mobility, where every ride is a scene of efficiency. Built to handle complex routing algorithms while presenting a hyper-minimalist, cinematic UI to the end user.',
    microcopy: "This one nearly broke me.",
    tech: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Google Maps API'],
    color: 'from-blue-500 to-cyan-400',
  },
];

export default function Projects() {
  const { isChaos } = useChaos();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isAnySelected = selectedId !== null;

  return (
    <section id="projects" className="h-screen w-full bg-[#020202] relative flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Absolute Title Overlay (Hidden when a project is selected) */}
      <AnimatePresence>
        {!isAnySelected && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="absolute top-16 left-10  z-50 pointer-events-none"
          >
            <span className="text-xs uppercase tracking-[0.6em] text-amber-500 mb-4 block font-bold font-sans drop-shadow-lg">
              {isChaos ? 'FATAL ERROR' : 'Module 03'}
            </span>
            <h2 className="movie-title text-5xl md:text-7xl text-white tracking-widest uppercase drop-shadow-2xl">
              {isChaos ? 'Data ' : 'Project '}<span className="text-amber-500">{isChaos ? 'Leak' : 'Timeline'}</span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {projects.map((project) => {
        const isSelected = selectedId === project.id;
        const isHovered = hoveredId === project.id;
        
        // Calculate flex sizes
        let flexValue = 1;
        if (isAnySelected) {
          flexValue = isSelected ? 100 : 0;
        } else if (hoveredId) {
          flexValue = isHovered ? 3 : 1;
        }

        return (
          <motion.div
            key={project.id}
            layout
            onMouseEnter={() => !isAnySelected && setHoveredId(project.id)}
            onMouseLeave={() => !isAnySelected && setHoveredId(null)}
            onClick={() => !isAnySelected && setSelectedId(project.id)}
            className={`relative overflow-hidden cursor-pointer min-w-0 min-h-0 border-r border-white/10 last:border-r-0 md:border-b-0 border-b ${isAnySelected && !isSelected ? 'border-none' : ''}`}
            style={{ flex: flexValue }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
          >
            {/* Background Image Container */}
            <motion.div 
              className="absolute inset-0 w-full h-full"
              animate={{ 
                scale: isHovered || isSelected ? 1.05 : 1,
                filter: isSelected ? "brightness(0.3) grayscale(0.2)" : isHovered ? "brightness(0.6) grayscale(0)" : "brightness(0.2) grayscale(0.8)"
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Cinematic Gradient Overlays */}
            <div className={`absolute inset-0 bg-gradient-to-t ${project.color} mix-blend-overlay ${isHovered || isSelected ? 'opacity-40' : 'opacity-10'} transition-opacity duration-700`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-90" />

            {/* Slice Content (Hidden when Selected) */}
            <AnimatePresence>
              {!isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none"
                >
                  <motion.div layout="position" className="origin-bottom-left">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-amber-500 block mb-2 font-mono drop-shadow-md">
                      {project.category}
                    </span>
                    <h3 className={`text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none transition-all duration-700 drop-shadow-2xl ${isHovered ? 'opacity-100' : 'opacity-40'}`}>
                      {project.title}
                    </h3>
                  </motion.div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/80 text-sm max-w-xs md:max-w-sm drop-shadow-md">
                          {project.subtitle}
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-xs text-amber-500 uppercase tracking-widest font-bold">
                          <span>Enter Scene</span>
                          <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>→</motion.span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded Cinematic Detail View */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20 lg:px-32 max-w-[1400px] mx-auto w-full h-full overflow-y-auto pt-20 pb-20 no-scrollbar"
                >
                  {/* Close Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(null);
                    }}
                    className="fixed top-8 right-8 md:top-12 md:right-12 w-14 h-14 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all group z-50 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                  >
                    <BsX className="text-4xl group-hover:rotate-90 transition-transform duration-300" />
                  </button>

                  <div className="max-w-4xl pt-10">
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xs md:text-sm font-mono text-amber-500 uppercase tracking-[0.5em] mb-6 block"
                    >
                      {project.category}
                    </motion.span>
                    
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-6xl md:text-8xl lg:text-[8rem] font-black text-white uppercase tracking-tighter mb-4 leading-none"
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-2xl md:text-3xl text-white/40 uppercase tracking-widest mb-12 font-light"
                    >
                      {project.subtitle}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 80 }}
                      transition={{ delay: 0.7 }}
                      className="h-[2px] bg-amber-500 mb-12" 
                    />
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-xl md:text-2xl text-white/80 leading-relaxed mb-10 max-w-2xl font-light"
                    >
                      {project.description}
                    </motion.p>

                    {/* Microcopy Personality */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="bg-black/40 backdrop-blur-md border-l-2 border-amber-500 p-6 mb-16 inline-block shadow-[0_0_30px_rgba(245,158,11,0.05)]"
                    >
                      <p className="text-base md:text-lg font-mono text-amber-500/90 italic">
                        "{project.microcopy}"
                      </p>
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="mb-16"
                    >
                      <h4 className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6 font-bold">Tech Stack</h4>
                      <div className="flex flex-wrap gap-4">
                        {project.tech.map(t => (
                          <span key={t} className="px-5 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs text-white/80 uppercase tracking-widest">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className="flex flex-wrap gap-6 pb-20"
                    >
                      {project.slug ? (
                        <Link href={project.slug} className="px-10 py-5 bg-amber-500 text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 flex items-center gap-3 rounded-sm shadow-[0_0_40px_rgba(245,158,11,0.4)]">
                          Experience Story <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>→</motion.span>
                        </Link>
                      ) : (
                        <a href="#" className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-amber-500 hover:text-black hover:scale-105 transition-all duration-300 flex items-center gap-3 rounded-sm shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]">
                          Launch Project <BsBoxArrowUpRight className="text-lg" />
                        </a>
                      )}
                      <a href="#" className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center gap-3 rounded-sm">
                        View Source <BsGithub className="text-lg" />
                      </a>
                    </motion.div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}

    </section>
  );
}
