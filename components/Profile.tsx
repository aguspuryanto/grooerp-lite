
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'prefs'>('info');

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Profile */}
      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="px-8 pb-8">
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-12">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] bg-white p-2 shadow-xl">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover rounded-[1.5rem]" 
              />
            </div>
            <div className="mt-4 sm:mt-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 leading-tight">{user.name}</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{user.role}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Aktif</span>
                    </span>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">
                  Edit Profil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation Tabs */}
        <div className="md:col-span-1 space-y-1">
          <button 
            onClick={() => setActiveTab('info')}
            className={`w-full text-left px-5 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'info' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
          >
            Informasi Pribadi
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-5 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'security' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
          >
            Keamanan
          </button>
          <button 
            onClick={() => setActiveTab('prefs')}
            className={`w-full text-left px-5 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'prefs' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
          >
            Preferensi
          </button>
        </div>

        {/* Tab Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            {activeTab === 'info' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-black text-slate-800 mb-4">Detail Akun Bisnis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alamat Email</p>
                    <p className="text-sm font-bold text-slate-700">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nomor Telepon</p>
                    <p className="text-sm font-bold text-slate-700">+62 812-3456-7890</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Departemen</p>
                    <p className="text-sm font-bold text-slate-700">Administrasi & Keuangan</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tanggal Bergabung</p>
                    <p className="text-sm font-bold text-slate-700">12 Januari 2023</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4">Bio Singkat</h4>
                  <p className="text-sm text-slate-500 leading-relaxed italic">
                    "Fokus pada efisiensi operasional dan integritas data keuangan perusahaan melalui sistem ERP yang terintegrasi."
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-black text-slate-800 mb-4">Keamanan Akun</h3>
                <div className="space-y-4">
                  <div className="p-5 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-blue-200 transition-colors">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Kata Sandi</p>
                      <p className="text-xs text-slate-400">Terakhir diubah 3 bulan yang lalu</p>
                    </div>
                    <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Ubah</button>
                  </div>
                  <div className="p-5 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-blue-200 transition-colors">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Autentikasi Dua Faktor (2FA)</p>
                      <p className="text-xs text-slate-400">Tingkatkan keamanan login Anda</p>
                    </div>
                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-not-allowed">Segera Hadir</button>
                  </div>
                  <div className="p-5 border border-red-50 bg-red-50/10 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-red-700">Sesi Aktif</p>
                      <p className="text-xs text-red-500">Anda login di 2 perangkat berbeda</p>
                    </div>
                    <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">Putus Semua</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'prefs' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-black text-slate-800 mb-4">Preferensi Aplikasi</h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Bahasa Sistem</p>
                      <p className="text-xs text-slate-400">Bahasa utama dashboard</p>
                    </div>
                    <select className="bg-slate-100 border-none rounded-xl text-xs font-bold px-4 py-2 outline-none">
                      <option>Bahasa Indonesia</option>
                      <option>English (US)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Notifikasi Email</p>
                      <p className="text-xs text-slate-400">Terima laporan mingguan</p>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
