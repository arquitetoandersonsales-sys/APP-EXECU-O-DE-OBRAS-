
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
          <p className="text-slate-400 mt-1">Gerencie todo o seu portfólio de obras ativas e futuras.</p>
        </div>
        <button 
          onClick={() => onAddProject({})} // Real action triggered here
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-blue-900/40 transition-all active:scale-95"
        >
          <Plus size={20} />
          Nova Obra
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text" 
          placeholder="Buscar por nome, cliente ou local..."
          className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className="group bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all cursor-pointer relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${
               project.status === ProjectStatus.ACTIVE ? 'bg-emerald-500' : 'bg-blue-500'
            }`} />

            <div className="flex justify-between items-start mb-6">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg ${
                  project.status === ProjectStatus.ACTIVE ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {project.status}
                </span>
                <h3 className="text-xl font-bold mt-3 group-hover:text-blue-400 transition-colors">{project.name}</h3>
                <p className="text-slate-400 font-medium">{project.client}</p>
              </div>
              <button className="p-2 hover:bg-slate-700 rounded-xl transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin size={16} className="text-blue-500" />
                <span className="truncate">{project.address}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Calendar size={16} className="text-blue-500" />
                <span>Início: {new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <User size={16} className="text-blue-500" />
                <span>Lead: {project.technicalLead}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700/50 flex justify-between items-end">
              <div className="w-1/2">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500 font-bold uppercase tracking-tight">Progresso Físico</span>
                  <span className="text-white font-bold">45%</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[45%]" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Valor Total</p>
                <p className="text-lg font-mono font-bold">
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
