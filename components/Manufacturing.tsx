
import React from 'react';

const Manufacturing: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold mb-6">Manajemen Produksi</h3>
        
        <div className="flex space-x-4 mb-8">
          <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
            <h4 className="text-3xl font-black text-slate-900 mb-1">154</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Unit Diproduksi</p>
          </div>
          <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
            <h4 className="text-3xl font-black text-blue-600 mb-1">98%</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Efisiensi Mesin</p>
          </div>
          <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
            <h4 className="text-3xl font-black text-red-500 mb-1">2</h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pesanan Terhambat</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">W/O</div>
              <div>
                <p className="font-bold text-slate-800">Production Order: #PO-MFG-902</p>
                <p className="text-xs text-slate-500">Produk: Panel Kontrol Listrik 3-Phase</p>
              </div>
            </div>
            <div className="flex items-center space-x-12">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Tahapan</p>
                <p className="text-sm font-black text-slate-700">Perakitan Akhir</p>
              </div>
              <button className="bg-white px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">Input Hasil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manufacturing;
