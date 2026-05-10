'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  slug: string;
}

export default function ShareButton({ slug }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/results/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <Button
        onClick={handleShare}
        className="glass-card h-12 px-6 rounded-full text-white hover:bg-white/10 transition-all shadow-2xl flex items-center gap-2 border border-white/10"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-green-savings" />
              <span>Link Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share My Results</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}
