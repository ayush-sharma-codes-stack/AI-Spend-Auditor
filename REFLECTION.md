# Reflection

## 1. What was the most challenging part of this assignment?
The most challenging part was ensuring the audit engine logic remained pure and testable while still being flexible enough to suggest cross-vendor alternatives (like suggesting Claude Pro for coding-heavy ChatGPT teams). Balancing the complex pricing tiers of 8+ tools into a single normalized data structure required careful planning to avoid "if-else" hell.

## 2. If you had 7 more days, what features would you add?
- **Real-time Price Scraping**: Instead of hardcoded data, I'd build a small scraper or use an API to fetch live SaaS pricing to ensure the audit is never stale.
- **SSO/OAuth Integration**: Allow teams to sign in with GitHub or Google to automatically detect their current seat counts and tiers.
- **Export to PDF/CSV**: A more formal report generation feature for finance teams to present to their boards.
- **Historical Benchmarking**: Show how a startup's spend compares to other companies of similar size/funding stage.

## 3. Why did you choose the specific audit rules you implemented?
I focused on the highest-leverage savings: team-tier mismatches. Many small teams pay for "Team" plans with a 2-seat minimum when individual "Pro" plans offer the same features for less. I also prioritized the "Coding" use case as it's the most common AI spend for Credex's target audience (startups).

## 4. How did you ensure the application feels "premium"?
I focused on high-fidelity micro-interactions using Framer Motion (staggered reveals, glassmorphism, and smooth transitions). The use of high-quality typography (DM Serif Display) and a curated dark theme with gradient orbs creates a professional, "fintech-adjacent" aesthetic that builds trust.

## 5. What was your biggest learning from building SpendScan?
I learned how much hidden complexity exists in AI pricing models. The shift from seat-based pricing to token-based API pricing (and the hybrid models in between) makes manual auditing almost impossible for founders, highlighting the genuine market need for a tool like SpendScan.
