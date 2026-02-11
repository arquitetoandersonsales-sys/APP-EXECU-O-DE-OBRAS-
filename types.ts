
export enum ProjectStatus {
  PLANNING = 'Planejamento',
  ACTIVE = 'Em Execução',
  PAUSED = 'Pausada',
  COMPLETED = 'Finalizada'
}

export interface Material {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Measurement {
  id: string;
  date: string;
  physicalProgress: number;
  financialValue: number;
  description: string;
  photos: string[];
}

export interface FinancialEntry {
  id: string;
  date: string;
  description: string;
  type: 'INCOME' | 'EXPENSE';
  value: number;
  category: string;
}

export interface ProjectStage {
  id: string;
  name: string;
  progress: number;
  estimatedCost: number;
  actualCost: number;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  address: string;
  type: string;
  area: number;
  contractValue: number;
  technicalLead: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  stages: ProjectStage[];
  materials: Material[];
  measurements: Measurement[];
  financials: FinancialEntry[];
  documents: Array<{ id: string; name: string; type: string; url: string }>;
}

export interface AppState {
  projects: Project[];
  activeProjectId: string | null;
}
