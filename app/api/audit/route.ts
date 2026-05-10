import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { runAudit } from '@/lib/auditEngine';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  try {
    const input = await req.json();
    const results = runAudit(input);
    
    const totalSpend = input.tools.reduce((acc: any, t: any) => acc + t.monthlySpend, 0);
    const totalSavings = results.reduce((acc, r) => acc + r.savings, 0);
    const slug = nanoid(10);

    const { data, error } = await supabase
      .from('audits')
      .insert({
        slug,
        audit_input: input,
        audit_result: results,
        total_spend: totalSpend,
        total_savings: totalSavings,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ slug });
  } catch (error: any) {
    console.error('Audit creation failed', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
