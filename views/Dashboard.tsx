
import React from 'react';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Project } from '../types';

const data = [
  { name: 'Jan', previsto: 4000, realizado: 4200 },
  { name: 'Fev', previsto: 3000, realizado: 2800 },
  { name: 'Mar', previsto: 2000, realizado: 2400 },
  { name: 'Abr', previsto: 2780, realizado: 2600 },
  { name: 'Mai', previsto: 1890, realizado: 1900 },
  { name: 'Jun', previsto: 2390, realizado: 2800 },
];

const Dashboard: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const activeProjectsCount = projects.filter(p => p.status === 'Em Execução').length;
  const totalValue = projects.reduce((acc, p) => acc + p.contractValue, 0);
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Painel de Controle</h1>
        <p className="text-slate-400 mt-1 text-lg">Visão consolidada das suas operações e performance financeira.</p>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          title="Obras Ativas" 
          value={activeProjectsCount.toString()} 
          icon={<HardHat className="text-blue-500" />} 
          trend="+2 este mês" 
          trendUp={true}
        />
        <StatCard 
          title="Faturamento Total" 
          value={`R$ ${(totalValue / 1000000).toFixed(1)}M`} 
          icon={<DollarSign className="text-emerald-500" />} 
          trend="+12% vs. ano anterior" 
          trendUp={true}
        />
        <StatCard 
          title="Avanço Físico Médio" 
          value="42%" 
          icon={<TrendingUp className="text-purple-500" />} 
          trend="-3% do cronograma" 
          trendUp={false}
        />
        <StatCard 
          title="Alertas de Desvio" 
          value="4" 
          icon={<AlertCircle className="text-amber-500" />} 
          trend="2 críticos" 
          trendUp={false}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Custo Previsto x Realizado</h3>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Previsto</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Realizado</div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="previsto" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPrev)" strokeWidth={3} />
                <Area type="monotone" dataKey="realizado" stroke="#10b981" fillOpacity={1} fill="url(#colorReal)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
          <h3 className="font-bold text-lg mb-6">Avanço das Obras</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projects.map(p => ({ name: p.name.split(' ')[1], progress: p.stages[0]?.progress || 0 }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                />
                <Bar dataKey="progress" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Projects Table Preview */}
      <div className="bg-slate-800/50 rounded-3xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
          <h3 className="font-bold text-lg">Obras em Destaque</h3>
          <button className="text-sm text-blue-500 font-semibold hover:underline">Ver todas</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Nome da Obra</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Progresso</th>
                <th className="px-6 py-4 font-semibold text-right">Valor Contratado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      p.status === 'Em Execução' ? 'bg-emerald-500/10 text-emerald-500' : 
                      p.status === 'Planejamento' ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-500/10 text-slate-500'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-xs text-slate-400">45%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-sm">
                    {p.contractValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend: string; trendUp: boolean }> = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm group hover:border-blue-500/50 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-900 rounded-2xl group-hover:bg-blue-600/10 transition-colors">
        {icon}
      </div>
      <span className={`text-xs font-bold flex items-center gap-1 ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </span>
    </div>
    <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">{title}</p>
    <h4 className="text-2xl font-extrabold mt-1 tracking-tight">{value}</h4>
  </div>
);

const HardHat: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"></path>
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"></path>
    <path d="M4 15v-3a6 6 0 0 1 12 0v3"></path>
  </svg>
);

export default Dashboard;
