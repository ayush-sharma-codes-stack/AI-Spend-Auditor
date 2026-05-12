'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData, ToolEntry } from './types';
import Step1TeamInfo from './Step1TeamInfo';
import Step2Tools from './Step2Tools';
import Step3Review from './Step3Review';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'spendscan_form_data';

const initialData: FormData = {
  teamSize: 1,
  useCase: 'mixed',
  tools: [],
};

export default function SpendForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved form data', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  const updateData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const totalSpend = formData.tools.reduce((acc, t) => acc + t.monthlySpend, 0);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate audit');
      }

      if (result.slug) {
        localStorage.removeItem(STORAGE_KEY);
        router.push(`/results/${result.slug}`);
      } else {
        throw new Error('No slug returned from server');
      }
    } catch (error: any) {
      console.error('Submit failed:', error);
      alert(error.message || 'Something went wrong. Please check your connection and try again.');
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-12">
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2 opacity-60">
          <span>Step {step} of 3</span>
          <span>{Math.round((step / 3) * 100)}% Complete</span>
        </div>
        <Progress value={(step / 3) * 100} className="h-1 bg-white/10" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && <Step1TeamInfo data={formData} update={updateData} onNext={nextStep} />}
          {step === 2 && (
            <Step2Tools 
              data={formData} 
              update={updateData} 
              onNext={nextStep} 
              onBack={prevStep} 
            />
          )}
          {step === 3 && (
            <Step3Review 
              data={formData} 
              onBack={prevStep} 
              onSubmit={handleSubmit} 
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Sticky Footer */}
      {formData.tools.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/10 p-4 z-50"
        >
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <div>
              <span className="text-sm opacity-60">Running Total</span>
              <div className="text-xl font-mono text-green-savings">
                ${totalSpend.toLocaleString()}/mo
              </div>
            </div>
            {step < 3 && (
              <Button onClick={nextStep} className="bg-violet-accent hover:bg-violet-accent/90 text-white">
                Continue to {step === 1 ? 'Tools' : 'Review'} →
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
