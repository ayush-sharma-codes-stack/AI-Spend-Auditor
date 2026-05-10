export interface Plan {
  name: string;
  pricePerUser?: number;
  flatPrice?: number;
  type: 'per-user' | 'flat' | 'variable' | 'custom';
}

export interface Tool {
  id: string;
  name: string;
  plans: Plan[];
}

export const TOOLS: Tool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    plans: [
      { name: 'Hobby', flatPrice: 0, type: 'flat' },
      { name: 'Pro', pricePerUser: 20, type: 'per-user' },
      { name: 'Business', pricePerUser: 40, type: 'per-user' },
      { name: 'Enterprise', type: 'custom' },
    ],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    plans: [
      { name: 'Individual', pricePerUser: 10, type: 'per-user' },
      { name: 'Business', pricePerUser: 19, type: 'per-user' },
      { name: 'Enterprise', pricePerUser: 39, type: 'per-user' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    plans: [
      { name: 'Free', flatPrice: 0, type: 'flat' },
      { name: 'Pro', flatPrice: 20, type: 'flat' },
      { name: 'Max', flatPrice: 100, type: 'flat' },
      { name: 'Team', pricePerUser: 30, type: 'per-user' },
      { name: 'Enterprise', type: 'custom' },
      { name: 'API Direct', type: 'variable' },
    ],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    plans: [
      { name: 'Plus', flatPrice: 20, type: 'flat' },
      { name: 'Team', pricePerUser: 30, type: 'per-user' },
      { name: 'Enterprise', type: 'custom' },
      { name: 'API Direct', type: 'variable' },
    ],
  },
  {
    id: 'anthropic-api',
    name: 'Anthropic API Direct',
    plans: [{ name: 'API Direct', type: 'variable' }],
  },
  {
    id: 'openai-api',
    name: 'OpenAI API Direct',
    plans: [{ name: 'API Direct', type: 'variable' }],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    plans: [
      { name: 'Pro', pricePerUser: 20, type: 'per-user' },
      { name: 'Ultra', pricePerUser: 30, type: 'per-user' },
      { name: 'API', type: 'variable' },
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    plans: [
      { name: 'Free', flatPrice: 0, type: 'flat' },
      { name: 'Pro', pricePerUser: 15, type: 'per-user' },
      { name: 'Teams', pricePerUser: 35, type: 'per-user' },
    ],
  },
];
