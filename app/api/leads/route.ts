import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

// Simple in-memory rate limiting (use Upstash for production)
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

export async function POST(req: Request) {
  try {
    const { email, company, role, teamSize, auditId, slug, totalSavings, website } = await req.json();

    // Honeypot
    if (website) {
      return NextResponse.json({ success: true }); // Silently drop
    }

    // Basic Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip);

    if (rateLimit && now < rateLimit.resetTime) {
      if (rateLimit.count >= 3) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      }
      rateLimit.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 });
    }

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const highSavings = totalSavings > 500;

    // Save to Supabase
    const { error: supabaseError } = await supabase
      .from('leads')
      .insert({
        audit_id: auditId,
        email,
        company,
        role,
        team_size: teamSize,
        high_savings: highSavings,
      });

    if (supabaseError) throw supabaseError;

    // Send Email
    const emailBody = `
      Your SpendScan AI Audit Report is ready.
      
      You could save $${totalSavings}/month ($${totalSavings * 12}/year) by optimizing your AI stack.
      
      View your full report here: https://spendscan.app/results/${slug}
      
      ${highSavings ? '\nA Credex advisor will reach out within 2 business days to help you source these credits at 20-40% below retail.' : ''}
      
      Best,
      The SpendScan Team
    `;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'audit@spendscan.app',
      to: email,
      subject: 'Your SpendScan AI Audit Report',
      text: emailBody,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Lead capture failed', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
