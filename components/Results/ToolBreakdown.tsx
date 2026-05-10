'use client';

import { AuditResult } from '@/lib/auditEngine';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  results: AuditResult[];
}

export default function ToolBreakdown({ results }: Props) {
  return (
    <div className="space-y-4">
      {results.map((result, index) => {
        const isOptimal = result.recommendedAction === 'optimal';
        const isSaving = result.savings > 0;
        
        return (
          <motion.div
            key={result.tool}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08 }}
            className="glass-card rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 min-w-[200px]">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-2xl">
                {result.tool === 'Cursor' && '🚀'}
                {result.tool === 'GitHub Copilot' && '🐙'}
                {result.tool === 'Claude' && '🧠'}
                {result.tool === 'ChatGPT' && '🤖'}
                {result.tool === 'Gemini' && '✨'}
                {result.tool.includes('API') && '🔌'}
                {result.tool.includes('Credex') && '💎'}
                {!['Cursor', 'GitHub Copilot', 'Claude', 'ChatGPT', 'Gemini'].some(id => result.tool.includes(id)) && '🛠️'}
              </div>
              <div>
                <h4 className="font-serif text-xl">{result.tool}</h4>
                <p className="text-sm text-white/40 font-mono">${result.currentSpend}/mo</p>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-4">
              <ArrowRight className="w-5 h-5 text-white/20 hidden md:block" />
              <div className={clsx(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                result.recommendedAction === 'downgrade' && "bg-amber-500/10 text-amber-500 border border-amber-500/20",
                result.recommendedAction === 'switch' && "bg-violet-accent/10 text-violet-accent border border-violet-accent/20",
                result.recommendedAction === 'remove' && "bg-red-500/10 text-red-500 border border-red-500/20",
                result.recommendedAction === 'optimal' && "bg-green-savings/10 text-green-savings border border-green-savings/20",
                result.recommendedAction === 'credits' && "bg-violet-accent/20 text-violet-accent border border-violet-accent/30 shadow-[0_0_15px_rgba(124,106,247,0.2)]",
              )}>
                {result.recommendedAction}
              </div>
              <p className="text-sm text-white/80">{result.reason}</p>
            </div>

            {isSaving && (
              <div className="text-right min-w-[120px]">
                <div className="text-green-savings font-mono text-xl font-bold">
                  -${result.savings.toLocaleString()}
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Monthly Saving</div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
