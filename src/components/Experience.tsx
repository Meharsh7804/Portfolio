'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    year: '2023 – Present',
    role: 'Senior Creative Developer',
    company: 'Luminary Studio',
    location: 'San Francisco, CA',
    description: 'Lead developer for award-winning web experiences. Built 3D interactive campaigns for Fortune 500 brands, achieving 40% higher engagement than industry average.',
    skills: ['React', 'Three.js', 'GSAP', 'WebGL'],
    color: '#00f5ff',
    icon: '◈',
  },
  {
    year: '2021 – 2023',
    role: 'Frontend Engineer',
    company: 'Nova Systems',
    location: 'New York, NY',
    description: 'Architected and shipped a real-time analytics platform serving 2M+ users. Reduced load time by 60% through code splitting and render optimizations.',
    skills: ['Next.js', 'TypeScript', 'GraphQL', 'Redis'],
    color: '#7c3aed',
    icon: '⬡',
  },
  {
    year: '2020 – 2021',
    role: 'UI/UX Engineer',
    company: 'Pixel Forge',
    location: 'Remote',
    description: 'Designed and developed interactive design systems for 15+ client products. Created motion guidelines used by a team of 20+ designers and developers.',
    skills: ['Figma', 'React', 'Framer Motion', 'Storybook'],
    color: '#f43f5e',
    icon: '✦',
  },
  {
    year: '2018 – 2020',
    role: 'Junior Developer',
    company: 'TechWave Agency',
    location: 'Boston, MA',
    description: 'Built and maintained 30+ client websites. Introduced modern React workflows that reduced development time by 35% across the team.',
    skills: ['JavaScript', 'React', 'Node.js', 'CSS'],
    color: '#f59e0b',
    icon: '◇',
  },
];

function TimelineItem({
  exp,
  index,
  isLeft,
}: {
  exp: typeof experiences[0];
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col items-center gap-6 md:gap-0`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-[calc(50%-40px)] glass-strong p-6 rounded-2xl card-hover"
        style={{ border: `1px solid ${exp.color}22` }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase mb-1 block" style={{ color: exp.color }}>
              {exp.year}
            </span>
            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(240,240,255,0.5)' }}>
              {exp.company} · {exp.location}
            </p>
          </div>
          <span className="text-2xl" style={{ color: exp.color }}>{exp.icon}</span>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(240,240,255,0.5)' }}>
          {exp.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {exp.skills.map((s) => (
            <span key={s} className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}>
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Center dot + line (desktop) */}
      <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-10 h-10 rounded-full flex items-center justify-center z-10"
          style={{
            background: `radial-gradient(circle, ${exp.color}44, ${exp.color}11)`,
            border: `2px solid ${exp.color}`,
            boxShadow: `0 0 20px ${exp.color}66`,
          }}
        >
          <div className="w-3 h-3 rounded-full" style={{ background: exp.color }} />
        </motion.div>
      </div>

      {/* Mobile dot */}
      <div className="md:hidden w-4 h-4 rounded-full" style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}` }} />
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start center', 'end center'] });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <span className="section-tag"><span>◇</span> Experience</span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none mt-4">
            My <span className="gradient-text">journey</span> <br />so far
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div className="w-full absolute top-0" style={{ height: lineH, background: 'linear-gradient(180deg, #00f5ff, #7c3aed, #f43f5e)' }} />
          </div>

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
