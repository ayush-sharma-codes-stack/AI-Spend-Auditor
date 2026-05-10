'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

interface Props {
  totalSavings: number;
}

export default function HeroSavings({ totalSavings }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, totalSavings, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (value) => setCount(value),
    });
    return () => controls.stop();
  }, [totalSavings]);

  return (
    <div className="text-center space-y-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white/60 text-lg uppercase tracking-widest font-medium"
      >
        Potential Monthly Savings
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-7xl md:text-9xl font-serif text-green-savings"
      >
        ${Math.round(count).toLocaleString()}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-2xl text-white/40 font-serif"
      >
        That&apos;s ${Math.round(totalSavings * 12).toLocaleString()} per year
      </motion.div>
    </div>
  );
}
