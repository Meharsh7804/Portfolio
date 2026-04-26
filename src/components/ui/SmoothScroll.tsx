'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useChaos } from '@/context/ChaosContext';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { isChaos } = useChaos();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (isChaos) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isChaos]);

  return <>{children}</>;
}
