import { TOOLS } from './pricing';

export interface AuditInput {
  teamSize: number;
  useCase: 'coding' | 'writing' | 'data' | 'research' | 'mixed';
  tools: {
    toolId: string;
    planName: string;
    seats: number;
    monthlySpend: number;
  }[];
}

export interface AuditResult {
  tool: string;
  currentSpend: number;
  recommendedAction: 'downgrade' | 'switch' | 'remove' | 'credits' | 'optimal';
  recommendedPlan?: string;
  projectedSpend: number;
  savings: number;
  reason: string;
}

export function runAudit(inputs: AuditInput): AuditResult[] {
  const { teamSize, useCase, tools } = inputs;
  const results: AuditResult[] = [];
  let totalSpend = tools.reduce((acc, t) => acc + t.monthlySpend, 0);

  // Helper to find a tool by ID
  const findTool = (id: string) => TOOLS.find((t) => t.id === id);

  for (const entry of tools) {
    const tool = findTool(entry.toolId);
    if (!tool) continue;

    let result: AuditResult = {
      tool: tool.name,
      currentSpend: entry.monthlySpend,
      recommendedAction: 'optimal',
      projectedSpend: entry.monthlySpend,
      savings: 0,
      reason: 'Your current plan is optimized for your team and use case.',
    };

    // CHECK 1 — Wrong plan for team size
    if (entry.toolId === 'claude' && entry.planName === 'Team' && teamSize <= 2) {
      const savings = (30 - 20) * entry.seats;
      result = {
        ...result,
        recommendedAction: 'downgrade',
        recommendedPlan: 'Pro',
        projectedSpend: entry.monthlySpend - savings,
        savings,
        reason: 'Claude Team is overkill for 2 or fewer users; Pro provides identical features for less.',
      };
    } else if (entry.toolId === 'chatgpt' && entry.planName === 'Team' && teamSize <= 2) {
      if (useCase === 'coding') {
        const savings = (30 - 20) * entry.seats;
        result = {
          ...result,
          recommendedAction: 'switch',
          recommendedPlan: 'Claude Pro',
          projectedSpend: entry.monthlySpend - savings,
          savings,
          reason: 'For coding teams of 2, Claude Pro ($20) offers superior technical performance than ChatGPT Team.',
        };
      } else {
        const savings = (30 - 20) * entry.seats;
        result = {
          ...result,
          recommendedAction: 'downgrade',
          recommendedPlan: 'Plus',
          projectedSpend: entry.monthlySpend - savings,
          savings,
          reason: 'ChatGPT Team minimum seats make it inefficient for small teams compared to Plus.',
        };
      }
    } else if (entry.toolId === 'github-copilot' && entry.planName === 'Business' && teamSize <= 3) {
      const savings = (19 - 10) * entry.seats;
      result = {
        ...result,
        recommendedAction: 'downgrade',
        recommendedPlan: 'Individual',
        projectedSpend: entry.monthlySpend - savings,
        savings,
        reason: 'For teams under 3, Copilot Individual offers the same core coding features at nearly half the cost.',
      };
    } else if (entry.toolId === 'cursor' && entry.planName === 'Business' && teamSize <= 2) {
      const savings = (40 - 20) * entry.seats;
      result = {
        ...result,
        recommendedAction: 'downgrade',
        recommendedPlan: 'Pro',
        projectedSpend: entry.monthlySpend - savings,
        savings,
        reason: 'Cursor Pro covers all essential features for individuals and tiny teams at $20/user.',
      };
    }

    // CHECK 2 — Cheaper same-vendor plan fits use case (only if not already downgraded)
    if (result.recommendedAction === 'optimal') {
      if (entry.toolId === 'claude' && entry.planName === 'Max' && (useCase === 'writing' || useCase === 'research')) {
        const savings = (100 - 20) * entry.seats;
        result = {
          ...result,
          recommendedAction: 'downgrade',
          recommendedPlan: 'Pro',
          projectedSpend: entry.monthlySpend - savings,
          savings,
          reason: 'Claude Max is designed for heavy technical workflows; Pro is sufficient for writing and research.',
        };
      } else if (entry.toolId === 'gemini' && entry.planName === 'Ultra' && teamSize <= 5) {
        const savings = (30 - 20) * entry.seats;
        result = {
          ...result,
          recommendedAction: 'downgrade',
          recommendedPlan: 'Pro',
          projectedSpend: entry.monthlySpend - savings,
          savings,
          reason: 'Gemini Pro offers similar performance to Ultra for most general tasks at a lower price point.',
        };
      } else if (entry.toolId === 'github-copilot' && entry.planName === 'Enterprise' && teamSize <= 50) {
        const savings = (39 - 19) * entry.seats;
        result = {
          ...result,
          recommendedAction: 'downgrade',
          recommendedPlan: 'Business',
          projectedSpend: entry.monthlySpend - savings,
          savings,
          reason: 'Copilot Enterprise features are typically only necessary for organizations with 50+ developers.',
        };
      }
    }

    // CHECK 3 — Alternative tool for use case
    if (result.recommendedAction === 'optimal') {
      if (entry.toolId === 'github-copilot' && tools.some(t => t.toolId === 'cursor' && t.planName === 'Pro')) {
        result = {
          ...result,
          recommendedAction: 'remove',
          projectedSpend: 0,
          savings: entry.monthlySpend,
          reason: 'Cursor Pro includes built-in Copilot-like features, making a standalone Copilot sub redundant.',
        };
      } else if (entry.toolId === 'chatgpt' && entry.planName === 'Plus' && tools.some(t => t.toolId === 'claude' && t.planName === 'Pro') && useCase === 'coding') {
        result = {
          ...result,
          recommendedAction: 'remove',
          projectedSpend: 0,
          savings: entry.monthlySpend,
          reason: 'For coding-heavy teams, Claude Pro is often superior; you can likely consolidate here.',
        };
      } else if (entry.toolId === 'claude' && entry.planName === 'Pro' && tools.some(t => t.toolId === 'chatgpt' && t.planName === 'Plus') && useCase === 'writing') {
        result = {
          ...result,
          recommendedAction: 'remove',
          projectedSpend: 0,
          savings: entry.monthlySpend,
          reason: 'For writing-focused teams, ChatGPT Plus is highly efficient; Claude Pro may be redundant.',
        };
      } else if (entry.toolId === 'openai-api' && entry.monthlySpend > 200) {
        const savings = entry.monthlySpend * 0.2; // 20% savings
        result = {
          ...result,
          recommendedAction: 'switch',
          recommendedPlan: 'Anthropic API',
          projectedSpend: entry.monthlySpend - savings,
          savings,
          reason: 'Anthropic API can be 15-30% more cost-effective for similar token volumes in technical tasks.',
        };
      } else if (entry.toolId === 'gemini' && useCase === 'coding') {
        result = {
          ...result,
          recommendedAction: 'switch',
          recommendedPlan: 'Cursor',
          projectedSpend: entry.monthlySpend,
          savings: 0,
          reason: 'Gemini is capable, but Cursor is purpose-built for coding and may improve team velocity.',
        };
      }
    }

    results.push(result);
  }

  // CHECK 4 — Credits opportunity (Post-processing)
  if (totalSpend > 500) {
    // Add a separate Credex entry or modify the total savings logic in the UI.
    // For now, I'll add a virtual tool result as per the prompt's "add a Credex note".
    const creditSavings = totalSpend * 0.25;
    results.push({
      tool: 'Credex Optimization',
      currentSpend: 0,
      recommendedAction: 'credits',
      projectedSpend: -creditSavings,
      savings: creditSavings,
      reason: `Credex can source these credits at 20-40% below retail. Estimated credit savings: $${creditSavings.toFixed(2)}/mo`,
    });
  }

  return results;
}
