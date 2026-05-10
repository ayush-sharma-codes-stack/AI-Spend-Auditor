export interface ToolEntry {
  id: string;
  toolId: string;
  planName: string;
  seats: number;
  monthlySpend: number;
}

export interface FormData {
  teamSize: number;
  useCase: 'coding' | 'writing' | 'data' | 'research' | 'mixed';
  tools: ToolEntry[];
}
