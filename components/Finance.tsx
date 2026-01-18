
import React, { useState } from 'react';
import { PettyCashSystem } from '../types';

const Finance: React.FC = () => {
  const [pettyCashMode, setPettyCashMode] = useState<PettyCashSystem>(PettyCashSystem.IMPREST);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Monitoring Pajak Terotomasi (PPN 11%)</h3>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">Sesuai Regulasi 2024</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">PPN Keluaran (Penjualan)</p>
                <p className="text-xl font-black text-slate-800">Rp 46,250,000</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">PPN Masukan (Pembelian)</p>
                <p className="text-xl font-black text-slate-800">Rp 12,100,000</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex justify-between items-center">
              <span className="text-xs font-bold text-blue-700">Estimasi Kurang Bayar Pajak</span>
              <span className="text-lg font-black text-blue-900">Rp 34,150,000</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Ringkasan Buku Besar (GL)</h3>
              <button className="text-blue-600 text-sm font-bold hover:underline">Download Laporan Excel</button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Kas & Bank', amount: 'Rp 420.500.000', trend: 'up' },
                { label: 'Piutang Konsinyasi', amount: 'Rp 280.750.000', trend: 'up' },
                { label: 'Persediaan Barang Jadi', amount: 'Rp 1.250.000.000', trend: 'down' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <span className="text-sm font-bold text-slate-600">{item.label}</span>
                  <span className="text-sm font-black text-slate-900">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between h-fit">
            <div>
              <h3 className="text-xl font-black mb-2 tracking-tight">Sistem Kas Kecil</h3>
              <p className="text-slate-400 text-xs mb-6 uppercase font-bold tracking-widest">Digital Petty Cash Log</p>
              <div className="space-y-3">
                <button 
                  onClick={() => setPettyCashMode(PettyCashSystem.IMPREST)}
                  className={`w-full text-left px-4 py-3 rounded-2xl border-2 transition-all ${pettyCashMode === PettyCashSystem.IMPREST ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-600'}`}
                >
                  <span className="font-black text-sm">{PettyCashSystem.IMPREST}</span>
                  <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold">Saldo Tetap (Metode Homyped)</p>
                </button>
                <button 
                  onClick={() => setPettyCashMode(PettyCashSystem.FLUCTUATING)}
                  className={`w-full text-left px-4 py-3 rounded-2xl border-2 transition-all ${pettyCashMode === PettyCashSystem.FLUCTUATING ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-600'}`}
                >
                  <span className="font-black text-sm">{PettyCashSystem.FLUCTUATING}</span>
                  <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold">Saldo Berubah-ubah</p>
                </button>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800">
              <p className="text-[10px] text-slate-500 mb-1 font-black uppercase tracking-widest">SALDO SAAT INI</p>
              <p className="text-3xl font-black text-blue-400">Rp 5.000.000</p>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
            <h4 className="text-sm font-black text-orange-900 mb-2 uppercase">Tips Akuntansi</h4>
            <p className="text-xs text-orange-700 leading-relaxed italic">"Gunakan sistem Dana Tetap (Imprest) untuk kontrol pengeluaran outlet yang lebih disiplin."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
