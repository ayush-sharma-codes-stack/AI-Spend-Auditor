import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  const { teamSize, useCase, totalSpend, totalSavings, toolList, topRecommendations } = await req.json();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  const fallback = `Your team of ${teamSize} is spending $${totalSpend}/month on AI tools. Our audit found $${totalSavings}/month in potential savings — $${totalSavings * 12}/year. The biggest opportunity is ${topRecommendations[0]?.reason || 'optimizing your plan selection'}. Reallocating this spend could meaningfully extend your runway or fund your next hire.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 200,
      system: "You are a concise financial analyst specializing in SaaS and AI tooling costs. Write clear, direct, numbers-first copy. No filler phrases like 'it's worth noting' or 'in conclusion'.",
      messages: [
        {
          role: 'user',
          content: `Write a 90-110 word personalized audit summary for a team of ${teamSize} people primarily using AI for ${useCase}. 

Their current monthly AI spend is $${totalSpend}. 
Their top tools are: ${toolList}.
The audit identified $${totalSavings}/month in potential savings.
Key recommendations:
${topRecommendations.map((r: any) => `- ${r.reason}`).join('\n')}

Write in second person ('your team', 'you're paying'). 
Lead with the biggest saving. End with one forward-looking sentence about what they could reinvest the savings into. Do not use markdown formatting.`
        }
      ]
    }, { signal: controller.signal });

    clearTimeout(timeoutId);
    
    const content = response.content[0].type === 'text' ? response.content[0].text : fallback;
    return NextResponse.json({ summary: content });
  } catch (error) {
    console.error('Anthropic API error or timeout', error);
    return NextResponse.json({ summary: fallback });
  }
}
