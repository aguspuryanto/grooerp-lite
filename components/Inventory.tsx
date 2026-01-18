
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
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all">+ Produk Baru</button>
          <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all">Import Excel</button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-500 font-medium">Filter Industri:</span>
          <select className="bg-slate-100 border-none rounded-lg text-sm px-3 py-2">
            <option>Semua</option>
            <option>Trading & Distribusi</option>
            <option>Retail</option>
            <option>Kontraktor</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Produk</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stok</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Harga Satuan</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.id}</td>
                <td className="px-6 py-4 text-sm text-slate-600 font-semibold">{item.name}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{item.category}</td>
                <td className="px-6 py-4 text-sm text-slate-900 font-bold">{item.stock} {item.unit}</td>
                <td className="px-6 py-4 text-sm text-slate-900">Rp {item.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                    item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
