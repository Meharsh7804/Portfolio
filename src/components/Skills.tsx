'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const skillCategories = [
  {
    label: 'Frontend',
    color: '#00f5ff',
    skills: [
      { name: 'React / Next.js', level: 96 },
      { name: 'TypeScript', level: 92 },
      { name: 'CSS / Animation', level: 94 },
      { name: 'Three.js / WebGL', level: 85 },
    ],
  },
  {
    label: 'Backend',
    color: '#7c3aed',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python / FastAPI', level: 82 },
      { name: 'GraphQL', level: 80 },
      { name: 'PostgreSQL / Redis', level: 78 },
    ],
  },
  {
    label: 'Design & Tools',
    color: '#f43f5e',
    skills: [
      { name: 'Figma / Framer', level: 90 },
      { name: 'GSAP / Framer Motion', level: 93 },
      { name: 'AWS / Vercel', level: 82 },
      { name: 'Docker / CI-CD', level: 75 },
    ],
  },
];

const floatingTags = [
  'React', 'Next.js', 'Three.js', 'GSAP', 'TypeScript', 'Node.js',
  'Python', 'GraphQL', 'WebGL', 'GLSL', 'Figma', 'AWS',
  'Tailwind', 'Framer', 'Docker', 'PostgreSQL', 'Redis', 'Vercel',
];

function TagCloud() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
  });

  const colors = ['#00f5ff', '#7c3aed', '#f43f5e', '#f59e0b', '#10b981'];
  const positions: [number, number, number][] = floatingTags.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i) / floatingTags.length);
    const theta = Math.sqrt(floatingTags.length * Math.PI) * phi;
    const r = 3.5;
    return [
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    ];
  });

  return (
    <group ref={group}>
      {floatingTags.map((tag, i) => (
        <mesh key={tag} position={positions[i]}>
          <boxGeometry args={[0.8, 0.3, 0.05]} />
          <meshStandardMaterial
            color={colors[i % colors.length]}
            emissive={colors[i % colors.length]}
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function SkillBar({ name, level, color, inView, delay }: {
  name: string; level: number; color: string; inView: boolean; delay: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium" style={{ color: 'rgba(240,240,255,0.75)' }}>{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={ref} className="py-32 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-tag"><span>⬡</span> Skills & Expertise</span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none mt-4">
            My <span className="gradient-text">toolkit</span> <br />runs deep
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-80 lg:h-[480px] relative"
          >
            <Canvas camera={{ position: [0, 0, 7], fov: 55 }} dpr={[1, 2]}>
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={2} color="#00f5ff" />
              <pointLight position={[-5, -5, -5]} intensity={1} color="#7c3aed" />
              <TagCloud />
            </Canvas>
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(2,2,8,0.8) 100%)'
            }} />
          </motion.div>

          <div className="space-y-10">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + ci * 0.15 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color}` }} />
                  <h3 className="text-sm font-semibold tracking-widest uppercase" style={{ color: cat.color }}>
                    {cat.label}
                  </h3>
                </div>
                <div className="space-y-3">
                  {cat.skills.map((skill, si) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} color={cat.color} inView={inView} delay={0.4 + ci * 0.15 + si * 0.08} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 flex flex-wrap gap-2 justify-center"
        >
          {floatingTags.map((tag, i) => (
            <motion.span
              key={tag}
              className="skill-tag"
              animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
