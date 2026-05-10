'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Props {
  totalSavings: number;
}

export default function CredexCTA({ totalSavings }: Props) {
  if (totalSavings <= 500) return null;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      className="relative p-8 rounded-2xl bg-gradient-to-br from-violet-accent/20 to-green-savings/10 border border-violet-accent/30 overflow-hidden group mt-12"
    >
      {/* Glow Effect */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-violet-accent/20 blur-[60px] pointer-events-none"
      />
      
      <div className="relative z-10 space-y-6 text-center max-w-xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-serif">
          You&apos;re leaving ${Math.round(totalSavings).toLocaleString()} on the table every month.
        </h3>
        <p className="text-white/60 text-lg">
          Credex helps startups unlock institutional-grade credits and volume discounts that are normally inaccessible.
        </p>
        <Button 
          size="lg"
          onClick={() => window.open('https://credex.rocks', '_blank')}
          className="bg-violet-accent hover:bg-violet-accent/90 text-white text-lg h-14 px-8 shadow-[0_0_30px_rgba(124,106,247,0.4)]"
        >
          Book a free Credex consultation →
        </Button>
      </div>

      <motion.div
        animate={{ borderOpacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 border border-violet-accent/40 rounded-2xl pointer-events-none"
      />
    </motion.div>
  );
}
