'use client';

import { TOOLS, Tool, Plan } from '@/lib/pricing';
import { ToolEntry } from './types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  entry: ToolEntry;
  update: (updates: Partial<ToolEntry>) => void;
  onRemove: () => void;
}

export default function ToolCard({ entry, update, onRemove }: Props) {
  const tool = TOOLS.find((t) => t.id === entry.toolId);
  if (!tool) return null;

  const currentPlan = tool.plans.find((p) => p.name === entry.planName);

  const handlePlanChange = (planName: string) => {
    const plan = tool.plans.find((p) => p.name === planName);
    if (!plan) return;

    let spend = 0;
    if (plan.type === 'per-user' && plan.pricePerUser !== undefined) {
      spend = plan.pricePerUser * entry.seats;
    } else if (plan.type === 'flat' && plan.flatPrice !== undefined) {
      spend = plan.flatPrice;
    }

    update({ planName, monthlySpend: spend });
  };

  const handleSeatsChange = (seats: number) => {
    let spend = entry.monthlySpend;
    if (currentPlan?.type === 'per-user' && currentPlan.pricePerUser !== undefined) {
      spend = currentPlan.pricePerUser * seats;
    }
    update({ seats, monthlySpend: spend });
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass-card rounded-xl p-6 relative group"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="absolute top-4 right-4 text-white/40 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
              {entry.toolId === 'cursor' && '🚀'}
              {entry.toolId === 'github-copilot' && '🐙'}
              {entry.toolId === 'claude' && '🧠'}
              {entry.toolId === 'chatgpt' && '🤖'}
              {entry.toolId === 'gemini' && '✨'}
              {entry.toolId.includes('api') && '🔌'}
              {!['cursor', 'github-copilot', 'claude', 'chatgpt', 'gemini'].some(id => entry.toolId.includes(id)) && '🛠️'}
            </div>
            <h3 className="text-xl font-medium">{tool.name}</h3>
          </div>

          <div className="space-y-2">
            <Label>Plan</Label>
            <Select value={entry.planName} onValueChange={handlePlanChange}>
              <SelectTrigger className="bg-white/5 border-white/10 h-10">
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0f] border-white/10 text-white">
                {tool.plans.map((p) => (
                  <SelectItem key={p.name} value={p.name}>
                    {p.name} {p.pricePerUser ? `($${p.pricePerUser}/user)` : p.flatPrice ? `($${p.flatPrice})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Seats</Label>
            <Input
              type="number"
              min={1}
              value={entry.seats}
              onChange={(e) => handleSeatsChange(parseInt(e.target.value) || 1)}
              className="bg-white/5 border-white/10 h-10 font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label>Monthly Spend</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">$</span>
              <Input
                type="number"
                value={entry.monthlySpend}
                onChange={(e) => update({ monthlySpend: parseFloat(e.target.value) || 0 })}
                className="bg-white/5 border-white/10 h-10 pl-7 font-mono text-green-savings"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
