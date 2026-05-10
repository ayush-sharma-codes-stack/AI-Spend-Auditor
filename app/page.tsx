'use client';

import SpendForm from '@/components/SpendForm';
import { motion } from 'framer-motion';

const fadeInUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay }
});

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div {...fadeInUp(0)} className="inline-block px-4 py-1.5 rounded-full bg-violet-accent/10 border border-violet-accent/20 text-violet-accent text-sm font-medium mb-4">
            Free for Startups & Scaleups
          </motion.div>
          <motion.h1 {...fadeInUp(0.1)} className="text-5xl md:text-7xl font-serif leading-tight">
            Scan your AI spend. <br />
            <span className="text-violet-accent">Stop overpaying.</span>
          </motion.h1>
          <motion.p {...fadeInUp(0.2)} className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            A 2-minute audit that identifies redundant plans, over-provisioned seats, and cheaper vendor alternatives. Average saving: 24%.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-32">
        <SpendForm />
      </section>

      {/* Footer / Social Proof */}
      <section className="py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h3 className="text-white/40 uppercase tracking-widest text-sm font-medium">Powered by Audit Logic & Anthropic AI</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-30 grayscale">
            {/* Logos could go here */}
            <div className="flex items-center justify-center font-serif text-2xl">OpenAI</div>
            <div className="flex items-center justify-center font-serif text-2xl">Anthropic</div>
            <div className="flex items-center justify-center font-serif text-2xl">Google</div>
            <div className="flex items-center justify-center font-serif text-2xl">Microsoft</div>
          </div>
        </div>
      </section>
    </main>
  );
}
