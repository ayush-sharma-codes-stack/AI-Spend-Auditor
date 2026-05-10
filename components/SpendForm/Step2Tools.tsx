'use client';

import { FormData, ToolEntry } from './types';
import { TOOLS } from '@/lib/pricing';
import ToolCard from './ToolCard';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { nanoid } from 'nanoid';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Props {
  data: FormData;
  update: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Tools({ data, update, onNext, onBack }: Props) {
  const addTool = (toolId: string) => {
    const tool = TOOLS.find((t) => t.id === toolId);
    if (!tool) return;

    const defaultPlan = tool.plans[0];
    const newEntry: ToolEntry = {
      id: nanoid(),
      toolId,
      planName: defaultPlan.name,
      seats: data.teamSize,
      monthlySpend: defaultPlan.pricePerUser ? defaultPlan.pricePerUser * data.teamSize : defaultPlan.flatPrice || 0,
    };

    update({ tools: [...data.tools, newEntry] });
  };

  const removeTool = (id: string) => {
    update({ tools: data.tools.filter((t) => t.id !== id) });
  };

  const updateTool = (id: string, updates: Partial<ToolEntry>) => {
    update({
      tools: data.tools.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    });
  };

  return (
    <div className="space-y-8 pb-32">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white/60">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="space-y-1">
          <h2 className="text-3xl font-serif">What's in your stack?</h2>
          <p className="text-white/60">Add all AI tools your team currently uses.</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.tools.map((entry) => (
          <ToolCard
            key={entry.id}
            entry={entry}
            update={(updates) => updateTool(entry.id, updates)}
            onRemove={() => removeTool(entry.id)}
          />
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-16 border-dashed border-white/20 hover:border-violet-accent/50 hover:bg-violet-accent/5 transition-all flex items-center justify-center gap-2 text-lg"
            >
              <Plus className="w-5 h-5" />
              Add AI Tool
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#0a0a0f] border-white/10 text-white w-[200px]">
            {TOOLS.map((tool) => (
              <DropdownMenuItem
                key={tool.id}
                onClick={() => addTool(tool.id)}
                className="hover:bg-white/5 cursor-pointer"
              >
                {tool.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {data.tools.length === 0 && (
        <div className="text-center py-12 opacity-40">
          No tools added yet. Start by adding a tool above.
        </div>
      )}
    </div>
  );
}
