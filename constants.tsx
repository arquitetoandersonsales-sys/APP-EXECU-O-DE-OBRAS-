
import { Project, ProjectStatus } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Edifício Horizonte',
    client: 'Construtora Alpha',
    address: 'Av. Paulista, 1000 - SP',
    type: 'Residencial Vertical',
    area: 4500,
    contractValue: 12500000,
    technicalLead: 'Eng. Roberto Silva',
    startDate: '2023-01-15',
    endDate: '2025-06-30',
    status: ProjectStatus.ACTIVE,
    stages: [
      { id: 's1', name: 'Fundação', progress: 100, estimatedCost: 1500000, actualCost: 1550000 },
      { id: 's2', name: 'Estrutura', progress: 65, estimatedCost: 4000000, actualCost: 2800000 },
      { id: 's3', name: 'Alvenaria', progress: 10, estimatedCost: 2000000, actualCost: 150000 },
    ],
    materials: [
      { id: 'm1', name: 'Cimento CP-II', unit: 'Saco 50kg', quantity: 5000, unitPrice: 35.00, total: 175000 },
      { id: 'm2', name: 'Aço CA-50 10mm', unit: 'kg', quantity: 12000, unitPrice: 8.50, total: 102000 },
    ],
    measurements: [
      { id: 'meas1', date: '2024-03-01', physicalProgress: 35, financialValue: 4375000, description: 'Conclusão da laje do 4º pavimento', photos: [] },
    ],
    financials: [
      { id: 'f1', date: '2024-03-05', description: 'Pagamento Fornecedor Aço', type: 'EXPENSE', value: 85000, category: 'Materiais' },
      { id: 'f2', date: '2024-03-10', description: 'Medição Março/24', type: 'INCOME', value: 450000, category: 'Receita Obra' },
    ],
    documents: [
      { id: 'd1', name: 'ART_Execucao.pdf', type: 'ART', url: '#' },
    ]
  },
  {
    id: '2',
    name: 'Casa Vale Verde',
    client: 'Família Oliveira',
    address: 'Condomínio Vale Verde, Casa 42',
    type: 'Residencial Unifamiliar',
    area: 350,
    contractValue: 850000,
    technicalLead: 'Arq. Mariana Costa',
    startDate: '2024-02-01',
    endDate: '2024-12-15',
    status: ProjectStatus.PLANNING,
    stages: [
      { id: 's1', name: 'Terraplenagem', progress: 0, estimatedCost: 45000, actualCost: 0 },
    ],
    materials: [],
    measurements: [],
    financials: [],
    documents: []
  }
];
