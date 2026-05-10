# Testing Guide

## Test Suite: Vitest
The application uses Vitest for unit and integration testing of the core logic.

### Running Tests
```bash
npm test
# or
npx vitest run
```

### Test Coverage
- **`auditEngine.test.ts`**: Validates all 4 core check types:
  - Team size vs. Plan efficiency.
  - Redundant tool detection (e.g., Cursor + Copilot).
  - Use-case based downgrades (e.g., Claude Max for writing).
  - High-spend credit opportunities (Credex triggers).

### Manual QA Checklist
- [ ] Multi-step form persistence (refresh page mid-form).
- [ ] Mobile responsive layout for tool selection.
- [ ] Email delivery on lead capture.
- [ ] OG image preview on social platforms.
- [ ] Clipboard "Copy Link" toast notification.
