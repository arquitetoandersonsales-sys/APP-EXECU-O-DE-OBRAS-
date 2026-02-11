
import React from 'react';
import { 
  LayoutDashboard, 
  HardHat, 
  BarChart3, 
  Calculator, 
  Wallet, 
  FileText, 
  Settings, 
  Menu,
  X,
  Plus
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'projects', label: 'Obras', icon: <HardHat size={20} /> },
    { id: 'planning', label: 'Planejamento', icon: <BarChart3 size={20} /> },
    { id: 'budget', label: 'Orçamento', icon: <Calculator size={20} /> },
    { id: 'financial', label: 'Financeiro', icon: <Wallet size={20} /> },
    { id: 'docs', label: 'Documentos', icon: <FileText size={20} /> },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-neutral-800 rounded-lg text-white shadow-lg border border-neutral-700"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-screen bg-neutral-900 border-r border-neutral-800 z-40 transition-all duration-300
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20 xl:w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-900/40">
              EP
            </div>
            <div className={`font-bold text-xl tracking-tight transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:hidden xl:opacity-100'}`}>
              Engenharia<span className="text-orange-500">Pro</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 space-y-1 mt-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group
                  ${activeTab === item.id 
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/30' 
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}
                `}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className={`font-medium transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:hidden xl:opacity-100'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* User Profile / Settings */}
          <div className="p-4 border-t border-neutral-800">
            <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-neutral-800 transition-colors">
              <img 
                src="https://picsum.photos/id/64/100/100" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-neutral-700"
              />
              <div className={`text-left overflow-hidden transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'lg:hidden xl:opacity-100'}`}>
                <p className="text-sm font-semibold truncate">Eng. Carlos Lima</p>
                <p className="text-xs text-neutral-500 truncate">Sócio Diretor</p>
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
