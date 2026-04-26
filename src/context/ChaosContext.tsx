'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ChaosContextType = {
  isChaos: boolean;
  setIsChaos: (value: boolean) => void;
};

const ChaosContext = createContext<ChaosContextType | undefined>(undefined);

export function ChaosProvider({ children }: { children: React.ReactNode }) {
  const [isChaos, setIsChaos] = useState(false);

  useEffect(() => {
    if (isChaos) {
      document.body.classList.add('chaos-active');
      
      const preventScroll = (e: Event) => e.preventDefault();
      const preventKeyScroll = (e: KeyboardEvent) => {
        if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
          e.preventDefault();
        }
      };

      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventKeyScroll, { passive: false });

      return () => {
        document.body.classList.remove('chaos-active');
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('keydown', preventKeyScroll);
      };
    } else {
      document.body.classList.remove('chaos-active');
    }
  }, [isChaos]);

  return (
    <ChaosContext.Provider value={{ isChaos, setIsChaos }}>
      {children}
    </ChaosContext.Provider>
  );
}

export function useChaos() {
  const context = useContext(ChaosContext);
  if (context === undefined) {
    throw new Error('useChaos must be used within a ChaosProvider');
  }
  return context;
}
