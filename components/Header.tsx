
import React from 'react';
import { ModuleType } from '../types';
import { Icons } from '../constants';

interface HeaderProps {
  activeModule: ModuleType;
}

const Header: React.FC<HeaderProps> = ({ activeModule }) => {
  const getTitle = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD: return 'Beranda Dashboard';
      case ModuleType.CRM: return 'Manajemen Pelanggan (CRM)';
      case ModuleType.INVENTORY: return 'Manajemen Inventaris';
      case ModuleType.FINANCE: return 'Akuntansi & Keuangan';
      case ModuleType.SALES_PURCHASE: return 'Transaksi Pembelian & Penjualan';
      case ModuleType.PROJECT: return 'Pengelolaan Proyek';
      case ModuleType.MANUFACTURING: return 'Manufaktur Produksi';
      case ModuleType.ANALYTICS: return 'Pusat Analitik & KPI';
      case ModuleType.DICTIONARY: return 'Kamus Akuntansi';
      default: return 'GrooERP';
    }
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-slate-800">{getTitle()}</h2>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Icons.Search />
          </span>
          <input
            type="text"
            placeholder="Cari data atau modul..."
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <button className="text-slate-500 hover:text-blue-600 transition-colors relative">
          <Icons.Bell />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full cursor-pointer hover:bg-slate-200 transition-all">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-sm font-medium text-slate-700">Online</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
