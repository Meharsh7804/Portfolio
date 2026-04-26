'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import AlterEgo from '@/components/AlterEgo';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Terminal from '@/components/Terminal';
import Lab from '@/components/Lab';
import Unfinished from '@/components/Unfinished';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Lab />
      <AlterEgo />
      <Terminal />
      <Unfinished />
      <Contact />
      <Footer />
    </main>
  );
}
