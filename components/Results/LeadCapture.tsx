'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  auditId: string;
  slug: string;
  totalSavings: number;
}

export default function LeadCapture({ auditId, slug, totalSavings }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    role: '',
    website: '', // Honeypot
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, auditId, slug, totalSavings }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Lead capture failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 py-16 border-t border-white/5">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-xl mx-auto space-y-8"
          >
            <div className="text-center space-y-2">
              <h3 className="text-3xl font-serif">Get your full savings report</h3>
              <p className="text-white/60 text-lg">We'll send a PDF summary and optimization roadmap to your inbox.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Startup Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-white/5 border-white/10 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    placeholder="CTO / Founder"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="bg-white/5 border-white/10 h-12"
                  />
                </div>
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 bg-white text-black hover:bg-white/90 text-lg"
              >
                {loading ? 'Sending...' : 'Get My Full Report →'}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-4"
          >
            <div className="w-20 h-20 bg-green-savings/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-10 h-10 bg-green-savings rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-serif">Report sent!</h3>
            <p className="text-white/60 text-lg max-w-md mx-auto">
              Check your inbox. Your full audit summary and roadmap should arrive in the next 2 minutes.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
