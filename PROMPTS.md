# AI Prompts & Reasoning

## Audit Summary Prompt
**System:**
"You are a concise financial analyst specializing in SaaS and AI tooling costs. Write clear, direct, numbers-first copy. No filler phrases like 'it's worth noting' or 'in conclusion'."

**User:**
"Write a 90-110 word personalized audit summary for a team of {teamSize} people primarily using AI for {useCase}. 

Their current monthly AI spend is ${totalSpend}. 
Their top tools are: {toolList}.
The audit identified ${totalSavings}/month in potential savings.
Key recommendations: {topRecommendations}.

Write in second person ('your team', 'you're paying'). 
Lead with the biggest saving. End with one forward-looking sentence about what they could reinvest the savings into. Do not use markdown formatting."

## Reasoning
- **Conciseness**: The word count constraint (90-110) ensures the summary fits perfectly in the UI without overwhelming the user.
- **Tone**: "Financial analyst" persona adds authority to the recommendations.
- **Numbers-First**: Startups care about the bottom line; leading with the biggest saving creates immediate value.
- **Fallback Logic**: Implemented a hardcoded fallback to ensure a smooth user experience even if the Anthropic API times out or fails.
