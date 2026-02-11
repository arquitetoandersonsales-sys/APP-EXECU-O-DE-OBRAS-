
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import ProjectList from './views/ProjectList';
import BudgetMaterials from './views/BudgetMaterials';
import { AppState, ProjectStatus } from './types';
import { MOCK_PROJECTS } from './constants';
import { ArrowLeft, ChevronRight, Plus } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    projects: MOCK_PROJECTS,
    activeProjectId: null
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeProject = state.projects.find(p => p.id === state.activeProjectId);

  const handleSelectProject = (id: string) => {
    setState(prev => ({ ...prev, activeProjectId: id }));
    setActiveTab('projectDetail');
  };

  const handleUpdateMaterials = (materials: any[]) => {
    if (!state.activeProjectId) return;
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => 
        p.id === state.activeProjectId ? { ...p, materials } : p
      )
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard projects={state.projects} />;
      case 'projects':
        return (
          <ProjectList 
            projects={state.projects} 
            onSelectProject={handleSelectProject} 
            onAddProject={() => alert('Abrindo formulário de cadastro de obra...')}
          />
        );
      case 'budget':
        if (!activeProject) {
          return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-in fade-in">
              <div className="bg-neutral-900 p-8 rounded-full border border-neutral-800">
                <ChevronRight className="text-neutral-600" size={48} />
              </div>
              <h2 className="text-2xl font-bold">Nenhuma Obra Selecionada</h2>
              <p className="text-neutral-500 max-w-md">Para acessar o orçamento, por favor selecione uma obra na listagem de projetos.</p>
              <button 
                onClick={() => setActiveTab('projects')}
                className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-2xl font-bold shadow-lg shadow-orange-900/40 transition-all"
              >
                Ir para Projetos
              </button>
            </div>
          );
        }
        return <BudgetMaterials project={activeProject} onUpdateMaterials={handleUpdateMaterials} />;
      
      case 'projectDetail':
        if (!activeProject) return null;
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <button 
              onClick={() => setActiveTab('projects')}
              className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest"
            >
              <ArrowLeft size={16} /> Voltar para Listagem
            </button>
            
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-orange-600/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">{activeProject.type}</span>
                  <span className="bg-neutral-800 text-neutral-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase border border-neutral-700">{activeProject.status}</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter text-white">{activeProject.name}</h1>
                <p className="text-neutral-400 text-lg flex items-center gap-2 mt-1">
                  {activeProject.client} • <span className="text-neutral-600">{activeProject.address}</span>
                </p>
              </div>
              <div className="flex gap-3">
                <button className="bg-neutral-900 px-6 py-3 rounded-2xl font-bold hover:bg-neutral-800 transition-all border border-neutral-800 text-neutral-300">Relatório PDF</button>
                <button 
                  onClick={() => setActiveTab('budget')}
                  className="bg-orange-600 px-6 py-3 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/40 text-white"
                >
                  Gestão Financeira
                </button>
              </div>
            </header>

            {/* Quick Detail Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-900/40 p-6 rounded-3xl border border-neutral-800">
                <p className="text-xs font-bold text-neutral-500 uppercase mb-1">Área Construída</p>
                <p className="text-2xl font-black text-white">{activeProject.area} m²</p>
              </div>
              <div className="bg-neutral-900/40 p-6 rounded-3xl border border-neutral-800">
                <p className="text-xs font-bold text-neutral-500 uppercase mb-1">Data de Entrega</p>
                <p className="text-2xl font-black text-white">{new Date(activeProject.endDate).toLocaleDateString()}</p>
              </div>
              <div className="bg-neutral-900/40 p-6 rounded-3xl border border-neutral-800">
                <p className="text-xs font-bold text-neutral-500 uppercase mb-1">Responsável Técnico</p>
                <p className="text-2xl font-black truncate text-white">{activeProject.technicalLead}</p>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-neutral-900/40 p-8 rounded-3xl border border-neutral-800">
              <h3 className="text-xl font-bold mb-8 text-white">Cronograma de Execução</h3>
              <div className="space-y-8">
                {activeProject.stages.map(stage => (
                  <div key={stage.id} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div>
                        <h4 className="font-bold text-lg text-white">{stage.name}</h4>
                        <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Custo: R$ {stage.actualCost.toLocaleString()} / R$ {stage.estimatedCost.toLocaleString()}</p>
                      </div>
                      <span className="text-xl font-black text-orange-500">{stage.progress}%</span>
                    </div>
                    <div className="h-4 bg-neutral-950 rounded-full overflow-hidden flex border border-neutral-800">
                      <div className="h-full bg-orange-600 transition-all duration-1000 shadow-[0_0_15px_rgba(234,88,12,0.3)]" style={{ width: `${stage.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-neutral-600">
             <div className="p-12 border-4 border-dashed border-neutral-900 rounded-3xl opacity-50 text-center">
                <h3 className="text-2xl font-bold text-neutral-400">Módulo em Desenvolvimento</h3>
                <p>Esta funcionalidade estará disponível na próxima atualização.</p>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />
      
      <main className={`
        flex-1 transition-all duration-300 p-4 lg:p-10
        ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20 xl:ml-64'}
      `}>
        <div className="max-w-7xl mx-auto pt-12 lg:pt-0">
          {renderContent()}
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden z-50">
        <button className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-900/50 ring-4 ring-neutral-950 active:scale-90 transition-transform">
          <Plus size={32} />
        </button>
      </div>
    </div>
  );
};

export default App;
