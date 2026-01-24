
import React from 'react';
import { ModuleType, User } from '../types';
import { Icons } from '../constants';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, isOpen, onClose, user }) => {
  const navItems = [
    { type: ModuleType.DASHBOARD, label: 'Dashboard', icon: Icons.Dashboard },
    { type: ModuleType.CRM, label: 'CRM & Pelanggan', icon: Icons.CRM },
    { type: ModuleType.INVENTORY, label: 'Produk & Stok', icon: Icons.Inventory },
    { type: ModuleType.FINANCE, label: 'Keuangan', icon: Icons.Finance },
    { type: ModuleType.SALES_PURCHASE, label: 'Pembelian & Penjualan', icon: Icons.Sales },
    { type: ModuleType.PROJECT, label: 'Manajemen Proyek', icon: Icons.Project },
    { type: ModuleType.MANUFACTURING, label: 'Manufaktur', icon: Icons.Manufacturing },
    { type: ModuleType.ANALYTICS, label: 'Analitik & Laporan', icon: Icons.Analytics },
    { type: ModuleType.DICTIONARY, label: 'Kamus Bisnis', icon: Icons.Dictionary },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col h-full 
    transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <aside className={sidebarClasses}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">G</div>
          <h1 className="text-xl font-bold text-white tracking-tight">GrooERP</h1>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.type}
            onClick={() => setActiveModule(item.type)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeModule === item.type
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className={`${activeModule === item.type ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`}>
              <item.icon />
            </div>
            <span className="font-medium whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => setActiveModule(ModuleType.PROFILE)}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all group ${
            activeModule === ModuleType.PROFILE ? 'bg-blue-600/10 border border-blue-600/20' : 'hover:bg-slate-800'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden ring-2 ring-slate-800 flex-shrink-0 group-hover:ring-blue-600/50 transition-all">
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="overflow-hidden text-left">
            <p className={`text-sm font-semibold truncate ${activeModule === ModuleType.PROFILE ? 'text-blue-400' : 'text-white'}`}>
              {user.name}
            </p>
            <p className="text-xs text-slate-500 truncate">{user.role}</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
