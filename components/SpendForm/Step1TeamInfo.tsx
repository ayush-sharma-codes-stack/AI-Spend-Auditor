'use client';

import { FormData } from './types';
import { Input as UiInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface Props {
  data: FormData;
  update: (updates: Partial<FormData>) => void;
  onNext: () => void;
}

export default function Step1TeamInfo({ data, update, onNext }: Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-serif">Tell us about your team</h2>
        <p className="text-white/60">We use this to identify the best plan tiers for your size.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="teamSize">Total Team Size</Label>
          <UiInput
            id="teamSize"
            type="number"
            min={1}
            value={data.teamSize}
            onChange={(e) => update({ teamSize: parseInt(e.target.value) || 1 })}
            className="bg-white/5 border-white/10 h-12 text-lg font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="useCase">Primary Use Case</Label>
          <Select
            value={data.useCase}
            onValueChange={(val: any) => update({ useCase: val })}
          >
            <SelectTrigger className="bg-white/5 border-white/10 h-12 text-lg">
              <SelectValue placeholder="Select use case" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0f] border-white/10 text-white">
              <SelectItem value="coding">Coding & Development</SelectItem>
              <SelectItem value="writing">Writing & Content</SelectItem>
              <SelectItem value="data">Data Analysis & Math</SelectItem>
              <SelectItem value="research">Research & Strategy</SelectItem>
              <SelectItem value="mixed">Mixed / General Purpose</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={onNext}
        className="w-full h-12 bg-violet-accent hover:bg-violet-accent/90 text-white text-lg"
      >
        Next: Tool Selection →
      </Button>
    </div>
  );
}
