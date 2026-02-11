
import React, { useState } from 'react';
import { Calculator, Package, Plus, Save, Trash2 } from 'lucide-react';
import { Material, Project } from '../types';

interface BudgetMaterialsProps {
  project: Project;
  onUpdateMaterials: (materials: Material[]) => void;
}

const BudgetMaterials: React.FC<BudgetMaterialsProps> = ({ project, onUpdateMaterials }) => {
  const [materials, setMaterials] = useState<Material[]>(project.materials || []);
  const [newItem, setNewItem] = useState({ name: '', unit: '', quantity: 0, unitPrice: 0 });

  const totalBudget = materials.reduce((acc, curr) => acc + curr.total, 0);

  const addMaterial = () => {
    if (!newItem.name || newItem.quantity <= 0) return;
    const newMaterial: Material = {
      id: Date.now().toString(),
      name: newItem.name,
      unit: newItem.unit,
      quantity: newItem.quantity,
      unitPrice: newItem.unitPrice,
      total: newItem.quantity * newItem.unitPrice
    };
    const updated = [...materials, newMaterial];
    setMaterials(updated);
    onUpdateMaterials(updated);
    setNewItem({ name: '', unit: '', quantity: 0, unitPrice: 0 });
  };

  const removeMaterial = (id: string) => {
    const updated = materials.filter(m => m.id !== id);
    setMaterials(updated);
    onUpdateMaterials(updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Orçamento e Quantitativos</h2>
          <p className="text-neutral-400">Detalhamento técnico de materiais e custos unitários.</p>
        </div>
        <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 text-right">
          <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest">Total Estimado</p>
          <p className="text-2xl font-mono font-bold text-orange-500">
            {totalBudget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </header>

      {/* Quick Calc Tool */}
      <div className="bg-neutral-900 border border-orange-500/20 p-6 rounded-3xl">
        <h4 className="font-bold flex items-center gap-2 mb-4 text-orange-500">
          <Calculator size={18} />
          Calculadora Rápida de Alvenaria
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">Área Total (m²)</label>
            <input type="number" placeholder="0.00" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-500 uppercase">Tijolo (tipo)</label>
            <select className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none">
              <option>9x19x19 (furo)</option>
              <option>14x19x29 (bloco)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-orange-600 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-900/20">Gerar Quantitativo</button>
          </div>
        </div>
      </div>

      {/* Form to Add New Material */}
      <div className="bg-neutral-900/40 p-6 rounded-3xl border border-neutral-800">
        <h3 className="font-bold mb-6 flex items-center gap-2 text-white"><Plus size={18} className="text-orange-500" /> Adicionar Insumo</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            placeholder="Nome do Material" 
            className="md:col-span-1 bg-neutral-950 border border-neutral-800 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
          />
          <input 
            placeholder="Unidade (ex: m³, kg)" 
            className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            value={newItem.unit}
            onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
          />
          <input 
            type="number" 
            placeholder="Qtd" 
            className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            value={newItem.quantity || ''}
            onChange={(e) => setNewItem({...newItem, quantity: parseFloat(e.target.value)})}
          />
          <input 
            type="number" 
            placeholder="R$ Unitário" 
            className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            value={newItem.unitPrice || ''}
            onChange={(e) => setNewItem({...newItem, unitPrice: parseFloat(e.target.value)})}
          />
        </div>
        <button 
          onClick={addMaterial}
          className="mt-4 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-white shadow-lg shadow-orange-900/20"
        >
          <Save size={18} /> Confirmar Lançamento
        </button>
      </div>

      {/* Materials Table */}
      <div className="bg-neutral-900/30 rounded-3xl border border-neutral-800 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-neutral-950 text-neutral-500 text-[10px] uppercase font-bold tracking-widest">
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Und</th>
              <th className="px-6 py-4">Qtd</th>
              <th className="px-6 py-4">Preço Unit.</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {materials.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-neutral-600 italic">
                  Nenhum material cadastrado nesta obra.
                </td>
              </tr>
            ) : materials.map(item => (
              <tr key={item.id} className="hover:bg-neutral-800/20 transition-colors">
                <td className="px-6 py-4 font-semibold text-white">{item.name}</td>
                <td className="px-6 py-4 text-neutral-400">{item.unit}</td>
                <td className="px-6 py-4 font-mono text-neutral-300">{item.quantity}</td>
                <td className="px-6 py-4 font-mono text-neutral-300">R$ {item.unitPrice.toFixed(2)}</td>
                <td className="px-6 py-4 font-mono font-bold text-orange-500">R$ {item.total.toFixed(2)}</td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => removeMaterial(item.id)}
                    className="text-neutral-500 hover:text-rose-500 hover:bg-rose-500/10 p-2 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetMaterials;
