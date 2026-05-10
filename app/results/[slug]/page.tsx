import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import HeroSavings from '@/components/Results/HeroSavings';
import ToolBreakdown from '@/components/Results/ToolBreakdown';
import AISummary from '@/components/Results/AISummary';
import CredexCTA from '@/components/Results/CredexCTA';
import LeadCapture from '@/components/Results/LeadCapture';
import ShareButton from '@/components/Results/ShareButton';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

async function getAudit(slug: string) {
  const { data, error } = await supabase
    .from('audits')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const audit = await getAudit(params.slug);
  if (!audit) return { title: 'Audit Not Found' };

  const savings = Math.round(audit.total_savings);
  return {
    title: `SpendScan: I could save $${savings}/mo on AI tools`,
    description: 'Free AI spend audit — see if your stack is optimized.',
    openGraph: {
      title: `SpendScan: I could save $${savings}/mo on AI tools`,
      description: 'Free AI spend audit — see if your stack is optimized.',
      images: [`/api/og/${params.slug}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `SpendScan: I could save $${savings}/mo on AI tools`,
      images: [`/api/og/${params.slug}`],
    },
  };
}

export default async function ResultsPage({ params }: Props) {
  const audit = await getAudit(params.slug);

  if (!audit) notFound();

  const isEfficient = audit.total_savings < 100;

  return (
    <main className="min-h-screen pb-32">
      <div className="max-w-4xl mx-auto px-4">
        <HeroSavings totalSavings={audit.total_savings} />
        
        <AISummary auditData={audit} />
        
        <div className="mt-12 space-y-4">
          <h3 className="text-2xl font-serif">Tool-by-Tool Breakdown</h3>
          <ToolBreakdown results={audit.audit_result} />
        </div>

        {isEfficient && (
          <div className="mt-12 text-center p-8 glass-card rounded-2xl">
            <h3 className="text-2xl font-serif text-green-savings">You&apos;re spending well!</h3>
            <p className="text-white/60 mt-2">
              Your AI stack is highly optimized. We&apos;ll notify you if new optimization rules apply to your stack in the future.
            </p>
          </div>
        )}

        <CredexCTA totalSavings={audit.total_savings} />

        <LeadCapture 
          auditId={audit.id} 
          slug={params.slug} 
          totalSavings={audit.total_savings} 
        />
      </div>

      <ShareButton slug={params.slug} />
    </main>
  );
}
