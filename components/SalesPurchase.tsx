
import React from 'react';

const SalesPurchase: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold">Manajemen Pesanan Pembelian (PO)</h3>
            <p className="text-slate-500 text-sm mt-1">Buat dan lacak pesanan ke supplier otomatis.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center space-x-2">
            <span>Buat PO Baru</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Menunggu Persetujuan</p>
            <p className="text-2xl font-black text-slate-800">5 <span className="text-xs font-normal text-slate-400">PO</span></p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dalam Pengiriman</p>
            <p className="text-2xl font-black text-slate-800">12 <span className="text-xs font-normal text-slate-400">PO</span></p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Selesai Bulan Ini</p>
            <p className="text-2xl font-black text-green-600">45 <span className="text-xs font-normal text-slate-400">PO</span></p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-y border-slate-100">
                <th className="px-6 py-4">No. PO</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4">Tgl Order</th>
                <th className="px-6 py-4">Total Nilai</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3].map(i => (
                <tr key={i} className="hover:bg-slate-50 transition-all">
                  <td className="px-6 py-4 font-mono text-sm font-bold text-blue-600">PO-2023-10{i}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">PT Bangun Jaya Perkasa</p>
                    <p className="text-xs text-slate-400">Jakarta Pusat</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">12 Okt 2023</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">Rp 45.200.000</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full uppercase tracking-widest">Diproses</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-xs font-bold text-slate-400 hover:text-blue-600">DETAIL</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesPurchase;
