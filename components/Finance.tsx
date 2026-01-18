
import React, { useState } from 'react';
import { PettyCashSystem } from '../types';

const Finance: React.FC = () => {
  const [pettyCashMode, setPettyCashMode] = useState<PettyCashSystem>(PettyCashSystem.IMPREST);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Ringkasan Buku Besar (General Ledger)</h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">Lihat Detail →</button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Kas & Bank</p>
                <p className="text-lg font-bold">Rp 420.500.000</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-bold uppercase">Piutang Usaha</p>
                <p className="text-lg font-bold">Rp 150.250.000</p>
              </div>
            </div>
            <div className="flex justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Utang Usaha</p>
                <p className="text-lg font-bold text-red-600">Rp 85.000.000</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-bold uppercase">Modal</p>
                <p className="text-lg font-bold text-green-600">Rp 485.750.000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Sistem Kas Kecil</h3>
            <p className="text-slate-400 text-sm mb-6">Kelola metode pencatatan petty cash perusahaan Anda.</p>
            <div className="space-y-3">
              <button 
                onClick={() => setPettyCashMode(PettyCashSystem.IMPREST)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${pettyCashMode === PettyCashSystem.IMPREST ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-600'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{PettyCashSystem.IMPREST}</span>
                  {pettyCashMode === PettyCashSystem.IMPREST && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500"></div>}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Saldo Tetap</p>
              </button>
              <button 
                onClick={() => setPettyCashMode(PettyCashSystem.FLUCTUATING)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${pettyCashMode === PettyCashSystem.FLUCTUATING ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-600'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{PettyCashSystem.FLUCTUATING}</span>
                  {pettyCashMode === PettyCashSystem.FLUCTUATING && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500"></div>}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Saldo Berubah</p>
              </button>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-xs text-slate-500 mb-1 font-bold">SALDO SAAT INI</p>
            <p className="text-3xl font-black">Rp 5.000.000</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Entri Jurnal Penutup (Closing Entries)</h3>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-500/20">Proses Tutup Buku</button>
        </div>
        <p className="text-slate-500 text-sm mb-6 max-w-2xl">
          Lakukan pemindahan saldo dari akun pendapatan, biaya, dan dividen ke saldo laba ditahan untuk memulai periode fiskal yang bersih.
        </p>
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 bg-slate-50 p-3 font-bold text-xs uppercase text-slate-400 tracking-wider">
            <div>Kode Akun</div>
            <div>Nama Akun</div>
            <div>Debit</div>
            <div>Kredit</div>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="grid grid-cols-4 p-4 text-sm">
              <div className="font-mono text-slate-500">4-1000</div>
              <div className="font-medium">Pendapatan Jasa</div>
              <div className="text-slate-900 font-bold">Rp 75.000.000</div>
              <div className="text-slate-300">-</div>
            </div>
            <div className="grid grid-cols-4 p-4 text-sm">
              <div className="font-mono text-slate-500">3-3000</div>
              <div className="font-medium">Ikhtisar Laba Rugi</div>
              <div className="text-slate-300">-</div>
              <div className="text-slate-900 font-bold">Rp 75.000.000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
