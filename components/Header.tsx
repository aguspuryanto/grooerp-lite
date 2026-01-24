
import React from 'react';
import { ModuleType } from '../types';
import { Icons } from '../constants';
import { isSupabaseConfigured } from '../supabase';

interface HeaderProps {
  activeModule: ModuleType;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeModule, onMenuClick }) => {
  const getTitle = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD: return 'Beranda Dashboard';
      case ModuleType.CRM: return 'Manajemen Pelanggan';
      case ModuleType.INVENTORY: return 'Inventaris';
      case ModuleType.FINANCE: return 'Keuangan';
      case ModuleType.SALES_PURCHASE: return 'Transaksi';
      case ModuleType.PROJECT: return 'Proyek';
      case ModuleType.MANUFACTURING: return 'Manufaktur';
      case ModuleType.ANALYTICS: return 'Analitik';
      case ModuleType.DICTIONARY: return 'Kamus Bisnis';
      default: return 'GrooERP';
    }
  };

  return (
    <header className="h-16 md:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
        </button>
        <h2 className="text-lg md:text-2xl font-bold text-slate-800 truncate max-w-[150px] md:max-w-none">
          {getTitle()}
        </h2>
      </div>

      <div className="flex items-center space-x-2 md:space-x-6">
        <div className="relative hidden xl:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Icons.Search />
          </span>
          <input
            type="text"
            placeholder="Cari data..."
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm w-48 xl:w-64 focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors relative">
          <Icons.Bell />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all ${isSupabaseConfigured ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
          <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
          <span className={`text-[10px] md:text-xs font-black uppercase tracking-tight ${isSupabaseConfigured ? 'text-green-700' : 'text-amber-700'}`}>
            {isSupabaseConfigured ? 'Cloud Live' : 'Demo Mode'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
