'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && <Loader key="loader" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <SmoothScroll>{children}</SmoothScroll>
        </motion.div>
      )}
    </>
  );
}
