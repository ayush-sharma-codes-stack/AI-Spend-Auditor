'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

interface Props {
  auditData: any;
}

export default function AISummary({ auditData }: Props) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await fetch('/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            teamSize: auditData.audit_input.teamSize,
            useCase: auditData.audit_input.useCase,
            totalSpend: auditData.total_spend,
            totalSavings: auditData.total_savings,
            toolList: auditData.audit_input.tools.map((t: any) => `${t.toolId} (${t.planName})`).join(', '),
            topRecommendations: auditData.audit_result.filter((r: any) => r.savings > 0).slice(0, 3),
          }),
        });
        const data = await response.json();
        setSummary(data.summary);
      } catch (error) {
        console.error('Failed to fetch AI summary', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [auditData]);

  if (loading) {
    return (
      <div className="space-y-4 py-8">
        <Skeleton className="h-4 w-full bg-white/5" />
        <Skeleton className="h-4 w-[90%] bg-white/5" />
        <Skeleton className="h-4 w-[95%] bg-white/5" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-8 text-xl leading-relaxed text-white/80 font-serif"
    >
      <div className="inline-block px-3 py-1 rounded bg-violet-accent/10 border border-violet-accent/20 text-violet-accent text-xs font-bold uppercase tracking-wider mb-4">
        AI Analysis
      </div>
      <p>{summary}</p>
    </motion.div>
  );
}
