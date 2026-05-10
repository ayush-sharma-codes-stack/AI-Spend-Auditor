# SpendScan

SpendScan is a premium AI spend auditor designed for startups to optimize their AI tool stack and identify potential savings.

## Screenshots
[Screenshots Placeholder]

## Quick Start
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables in `.env.local`.
4. Run the development server: `npm run dev`.

## Decisions (5 Trade-offs)
1. **Next.js App Router**: Chosen for its robust routing and server-side capabilities, though it has a steeper learning curve than the Pages Router.
2. **Tailwind CSS + shadcn/ui**: Used for rapid, consistent UI development while maintaining full control over styling.
3. **Supabase**: Selected for its ease of use as a backend-as-a-service, providing database and lead storage without managing a full backend.
4. **Anthropic API (Claude 3.5 Sonnet)**: Chosen for its high-quality AI summaries and financial analysis capabilities.
5. **Vitest**: Used for testing due to its speed and compatibility with the Vite ecosystem, which aligns well with Next.js performance goals.
