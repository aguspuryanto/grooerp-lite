
import React from 'react';
import { ModuleType } from '../types';
import { Icons } from '../constants';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
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

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full hidden lg:flex">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">G</div>
          <h1 className="text-xl font-bold text-white tracking-tight">GrooERP</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.type}
            onClick={() => setActiveModule(item.type)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeModule === item.type
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon />
            <span className="font-medium whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
            <img src="https://picsum.photos/seed/admin/100" alt="Avatar" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">Budi Santoso</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
