'use client';

import { FormData } from './types';
import { Button } from '@/components/ui/button';
import { TOOLS } from '@/lib/pricing';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  data: FormData;
  onBack: () => void;
  onSubmit: () => void;
}

export default function Step3Review({ data, onBack, onSubmit }: Props) {
  const totalSpend = data.tools.reduce((acc, t) => acc + t.monthlySpend, 0);

  return (
    <div className="space-y-8 pb-32">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white/60">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="space-y-1">
          <h2 className="text-3xl font-serif">Review & Confirm</h2>
          <p className="text-white/60">One last look before we run the audit.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-card rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <span className="text-white/60">Team Info</span>
            <span className="font-medium">{data.teamSize} people · {data.useCase}</span>
          </div>
          
          <div className="space-y-4 pt-2">
            {data.tools.map((t) => {
              const tool = TOOLS.find(tool => tool.id === t.toolId);
              return (
                <div key={t.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{tool?.name}</div>
                    <div className="text-sm text-white/40">{t.planName} · {t.seats} seats</div>
                  </div>
                  <div className="font-mono text-green-savings">${t.monthlySpend}</div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center border-t border-white/5 pt-4 text-xl">
            <span className="font-serif">Total Monthly Spend</span>
            <span className="font-mono text-green-savings">${totalSpend.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-violet-accent/10 border border-violet-accent/20 rounded-xl p-6 flex gap-4">
          <CheckCircle2 className="w-6 h-6 text-violet-accent shrink-0" />
          <p className="text-sm text-white/80">
            By clicking "Run Audit", our engine will analyze your stack against 40+ pricing rules and vendor alternatives to find your maximum savings.
          </p>
        </div>

        <Button 
          onClick={onSubmit}
          className="w-full h-14 bg-violet-accent hover:bg-violet-accent/90 text-white text-xl shadow-[0_0_20px_rgba(124,106,247,0.3)]"
        >
          Generate My Audit →
        </Button>
      </div>
    </div>
  );
}
