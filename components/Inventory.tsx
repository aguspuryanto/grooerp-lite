
import React, { useState } from 'react';
import { InventoryItem } from '../types';

const mockInventory: InventoryItem[] = [
  { id: 'PRD-001', name: 'Semen Padang 50kg', category: 'Material', stock: 450, unit: 'Zak', price: 65000, status: 'In Stock' },
  { id: 'PRD-002', name: 'Besi Beton 10mm', category: 'Material', stock: 12, unit: 'Batang', price: 95000, status: 'Low Stock' },
  { id: 'PRD-003', name: 'Cat Tembok Putih 25kg', category: 'Chemical', stock: 85, unit: 'Pail', price: 450000, status: 'In Stock' },
  { id: 'PRD-004', name: 'Pipa PVC 4 Inch', category: 'Plumbing', stock: 0, unit: 'Batang', price: 125000, status: 'Out of Stock' },
];

const Inventory: React.FC = () => {
  const [items] = useState<InventoryItem[]>(mockInventory);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200 gap-4">
        <div className="flex space-x-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            + Produk
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
            Import
          </button>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="hidden md:inline text-xs text-slate-500 font-bold uppercase tracking-wider">Industri:</span>
          <select className="w-full sm:w-auto bg-slate-100 border-none rounded-xl text-xs font-bold px-4 py-2 outline-none cursor-pointer">
            <option>Semua Industri</option>
            <option>Trading & Distribusi</option>
            <option>Retail</option>
            <option>Kontraktor</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">SKU</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Nama Produk</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest hidden md:table-cell">Kategori</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Stok</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Harga</th>
                <th className="px-4 md:px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-4 md:px-6 py-4 text-xs font-mono text-slate-500">{item.id}</td>
                  <td className="px-4 md:px-6 py-4 min-w-[150px]">
                    <p className="text-sm font-bold text-slate-800">{item.name}</p>
                    <span className="text-[10px] text-slate-400 font-medium md:hidden">{item.category}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{item.category}</td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-900 font-black">{item.stock} {item.unit}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-tight ${
                        item.status === 'In Stock' ? 'text-green-600' :
                        item.status === 'Low Stock' ? 'text-orange-500' : 'text-red-500'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-slate-900 font-bold whitespace-nowrap">Rp {item.price.toLocaleString()}</td>
                  <td className="px-4 md:px-6 py-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                    </button>
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

export default Inventory;
