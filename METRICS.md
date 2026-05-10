# Metrics & Instrumentation Plan

## North Star Metric
- **Total Savings Identified**: Sum of all `total_savings` across generated audits.

## Input Metrics
- **Conversion Rate**: Landing Page Visit -> Audit Submission.
- **Lead Quality**: Percentage of audits with >$500 savings.
- **Viral Coefficient**: Shares per audit (monitored via slug access counts).

## Instrumentation
- **Vercel Web Analytics**: For page views and performance monitoring.
- **Supabase Logs**: For submission success and API errors.
- **Resend Events**: To track email open rates for report delivery.
