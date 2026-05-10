import { ImageResponse } from '@vercel/og';
import { supabase } from '@/lib/supabase';

export const runtime = 'edge';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { data: audit } = await supabase
      .from('audits')
      .select('total_savings')
      .eq('slug', params.slug)
      .single();

    const savings = audit ? Math.round(audit.total_savings) : 0;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0f',
            backgroundImage: 'radial-gradient(circle at top right, #7c6af722, transparent), radial-gradient(circle at bottom left, #22c97a11, transparent)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '60px',
              borderRadius: '30px',
            }}
          >
            <div style={{ fontSize: 32, color: '#7c6af7', fontWeight: 'bold', marginBottom: 20 }}>
              SPENDSCAN AUDIT
            </div>
            <div style={{ fontSize: 80, color: '#22c97a', fontWeight: 'bold' }}>
              ${savings.toLocaleString()}
            </div>
            <div style={{ fontSize: 40, color: 'white', opacity: 0.6 }}>
              Monthly Savings Identified
            </div>
            <div style={{ fontSize: 24, color: 'white', marginTop: 40, opacity: 0.4 }}>
              spendscan.app
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
