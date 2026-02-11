
import React, { useState } from 'react';
import { Plus, Search, MapPin, Calendar, User, MoreVertical } from 'lucide-react';
import { Project, ProjectStatus } from '../types';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
  onAddProject: (project: any) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject, onAddProject }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Obras e Projetos</h1>
          <p className="text-neutral-400 mt-1">Gerencie todo o seu portfólio de obras ativas e futuras.</p>
        </div>
        <button 
          onClick={() => onAddProject({})}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-orange-900/40 transition-all active:scale-95"
        >
          <Plus size={20} />
          Nova Obra
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
        <input 
          type="text" 
          placeholder="Buscar por nome, cliente ou local..."
          className="w-full bg-neutral-900/50 border border-neutral-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all text-white placeholder-neutral-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className="group bg-neutral-900/40 border border-neutral-800 rounded-3xl p-6 hover:border-orange-500/50 hover:bg-neutral-900/60 transition-all cursor-pointer relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${
               project.status === ProjectStatus.ACTIVE ? 'bg-orange-500' : 'bg-neutral-500'
            }`} />

            <div className="flex justify-between items-start mb-6">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg border ${
                  project.status === ProjectStatus.ACTIVE ? 'border-orange-500/20 bg-orange-500/10 text-orange-500' : 'border-neutral-700 bg-neutral-800/50 text-neutral-400'
                }`}>
                  {project.status}
                </span>
                <h3 className="text-xl font-bold mt-3 group-hover:text-orange-400 transition-colors">{project.name}</h3>
                <p className="text-neutral-400 font-medium">{project.client}</p>
              </div>
              <button className="p-2 hover:bg-neutral-800 rounded-xl transition-colors text-neutral-500">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <MapPin size={16} className="text-orange-500" />
                <span className="truncate">{project.address}</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <Calendar size={16} className="text-orange-500" />
                <span>Início: {new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <User size={16} className="text-orange-500" />
                <span>Lead: {project.technicalLead}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 flex justify-between items-end">
              <div className="w-1/2">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-neutral-500 font-bold uppercase tracking-tight">Progresso Físico</span>
                  <span className="text-white font-bold">45%</span>
                </div>
                <div className="h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                  <div className="h-full bg-orange-600 rounded-full w-[45%]" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-tight">Valor Total</p>
                <p className="text-lg font-mono font-bold text-orange-500">
                  {project.contractValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
